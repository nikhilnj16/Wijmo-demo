

import '@angular/compiler';
import { Component, enableProdMode, NgModule, OnInit, ViewChild } from '@angular/core';

import * as wjcGrid from '@mescius/wijmo.grid';
import * as wjcGridFilter from '@mescius/wijmo.grid.filter';
import { isNumber, changeType, DataType } from '@mescius/wijmo';
import '@mescius/wijmo.input';
import { CollectionView, SortDescription }  from '@mescius/wijmo';
import { GroupSummaryPosition } from '@mescius/wijmo.grid';
import { HttpClient } from '@angular/common/http';
import * as wjcCore from '@mescius/wijmo';
import { consumerAfterComputation } from '@angular/core/primitives/signals';
@Component({
  selector: 'app-google-sheets',
  templateUrl: './google-sheets.component.html',
  styleUrl: './google-sheets.component.css'
})
export class GoogleSheetsComponent implements OnInit {
edit(e: any) {

}







    
   
    
// }

    
    quickEdit: boolean = true;
    countries = ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'];
    data!: CollectionView<{ id: number; country: string; sales: number; expenses: number; overdue: boolean; }>
    
    groupSummaryPosition= GroupSummaryPosition.Top;
    groupSummaryPositionOptions = 'Top,Bottom,Auto'.split(',');

   
    
    // DataSvc will be passed by derived classes
    constructor(private http: HttpClient) {
       
    }

   
    
    ngOnInit(): void {
        this._getData();
       
        
    }
   
    test(grid: wjcGridFilter.FlexGridFilter,e:any){
        console.log("fiter",grid.defaultFilterType)
    }
    filterInit(filter: wjcGridFilter.FlexGridFilter){
        console.log("fitervzv",filter.defaultFilterType)
      
    }
    setgroupSummaryPosition(value: number) {
        this.groupSummaryPosition = value;
    }
    
    @ViewChild('filter', { static: true })
    filters!: wjcGridFilter.FlexGridFilter;

    // ngAfterViewInit() {
    //     this.filters.defaultFilterType = wjcGridFilter.FilterType.Value;
    //     this.filters.showSortButtons = true;
    //     this.filters._addFilterButton.apply
        
        
    // }
    @ViewChild('flex', { static: true }) flex!: wjcGrid.FlexGrid;
    filter(e: any) {
        let filter = (<HTMLInputElement>e.target).value.toLowerCase();
        this.flex.collectionView.filter = (item: any) => {
            return filter.length == 0 || item.country.toLowerCase().indexOf(filter) > -1
        }
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.beginningEdit.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            let item = e.getRow().dataItem,
                binding = e.getColumn().binding;
            if (item.overdue && binding != 'overdue') { // prevent editing overdue items
                e.cancel = true;
            }
            if (e.data && e.data.type == 'keypress' && !this.quickEdit) {
                e.cancel = true;
                this.quickEdit = false;
            }
        });
        flex.cellEditEnding.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellEditEndingEventArgs) => {
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = changeType(s.activeEditor.value, DataType.Number, col.format!);
                if (!isNumber(value) || value < 0) {
                    e.cancel = true;
                    // e.stayInEditMode = true;
                    alert('Please enter a valid and positive amount.')
                }
            }
        });

        // flex.columnHeaders.hostElement.addEventListener("click",(e:MouseEvent)=>{
        //     console.log(e);
        //    const data= flex.hitTest(e);
        // //    console.log(data);
        // //   console.log(flex.columns[data._col]._binding)
        //   console.log(flex.columns[data._col].currentSort)
        //   this.sort=!flex.columns[data._col].currentSort
        //   this.column=flex.columns[data._col]._binding
        //   this.applyHierarchicalFilter(this.column,this.sort)
        // //  
        // }, )
    }
    customSort(e: any) {
        e.cancel = true; // Cancel the built-in sort


     
    }

    

    sortData(col: any, ascending: any) {
        console.log(col._binding&&col._binding._key?col._binding._key:col,ascending);
        this.http.get<any[]>(`http://localhost:8081/getDataInOrder?column=${col}&ascending=${ascending}`).subscribe((response) => {
            console.log(response)
            this.data = new CollectionView(response, {
                pageSize: 6
            });
        }, error => {
            console.error('Error fetching data:', error);
        });


    }

    onSortedColumn(grid: wjcGrid.FlexGrid, e: any) {

        const sortInfo = grid.collectionView.sortDescriptions;

        console.log(sortInfo)
        if (sortInfo.length > 0) {
          const sortColumn = sortInfo[0].property;
          const sortDirection = sortInfo[0].ascending ? true : false;
          console.log(sortInfo[0].ascending)
          console.log(sortInfo[0])
        console.log(sortDirection)
        this.sortData(sortColumn, sortDirection);
        }
      }
    


    private _getData() {

        this.http.get<any[]>('http://localhost:8081/getAllData').subscribe((response) => {
            this.data = new CollectionView(response, {
                pageSize: 6
            });
        }, error => {
            console.error('Error fetching data:', error);
        });

       
    }

}
