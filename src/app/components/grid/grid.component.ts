import { Component, input } from '@angular/core';
import { CollectionView } from '@mescius/wijmo';
import '@mescius/wijmo.styles/wijmo.css';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  data: CollectionView;
  rawData: any[];  


  constructor() {
    this.rawData = this._getData();
    this.data = new CollectionView(this.rawData, {
      refreshOnEdit: false 
    });
  }

  private _getData() {
    const employees = [
      { id: 1, name: 'John', department: 'HR', salary: 50000 },
      { id: 2, name: 'Jack', department: 'Finance', salary: 60000 },
      { id: 3, name: 'Bharath', department: 'IT', salary: 70000 },
      { id: 4, name: 'Lukesh', department: 'Finance', salary: 60000 },
      { id: 5, name: 'Lukesh', department: 'Finance', salary: 60000 },
      { id: 6, name: 'Lukesh', department: 'Finance', salary: 60000 },
      { id: 7, name: 'John', department: 'Finance', salary: 60000 }
    ];
    return employees;
  }

  private _removeDuplicates(data: any[]): any[] {
    const uniqueEmployees = new Set();
    return data.filter(item => {
      const identifier = `${item.name}`;
      if (uniqueEmployees.has(identifier)) {
        return false;
      } else {
        uniqueEmployees.add(identifier);
        return true;
      }
    });
  }

  removeDuplicates() {
    const currentData = this.data.sourceCollection.slice();
    const uniqueData = this._removeDuplicates(currentData); 
    this.data.sourceCollection = uniqueData; 
  
  }

  filterData(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
   
    if (!searchTerm) {
      this.data.sourceCollection = this.rawData;
    } else {
      const filteredData = this.rawData.filter(item => 
        item.name.includes(searchTerm)
        );
      this.data.sourceCollection = filteredData;
    }
   }
}
