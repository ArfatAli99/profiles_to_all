import { Component, OnInit } from '@angular/core';
import { TableData } from './table-data';
import { ViewEncapsulation } from '@angular/core';
import { SsoService } from '../../../../services/sso/sso.service';
// import {ButtonsPage} from './buttons/buttons.page';
// import { Ng2TableModule } from 'ngx-datatable';


@Component({
  selector: 'app-sso',
  templateUrl: './sso.page.html',
  styleUrls: ['./sso.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SsoPage implements OnInit {
  rows:Array<any> = [];
  data: any;
  columns:Array<any> = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Active', name: 'isActive'},
    {title: 'Hidden', name: 'isHidden'},
    {title: 'Deleted', name: 'isDeleted'},
    {title: 'Created at', name: 'created_at'},
    {title: 'Created By', name: 'created_by'},
    {title: 'Updated at', name: 'updated_at'},
    {title: 'Updatd by', name: 'updated_by'},
    // {
    //   title: 'Position',
    //   name: 'position',
    //   sort: false,
    //   filtering: {filterString: '', placeholder: 'Filter by position'}
    // },
    // {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
    // {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    // {title: 'Start date', className: 'text-warning', name: 'startDate'},
    // {title: 'Salary ($)', name: 'salary'}
  ];
  page:number = 1;
  itemsPerPage:number = 10;
  maxSize:number = 5;
  numPages:number = 1;
  length:number = 0;

  config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  // private data:Array<any> = [];
  constructor(
    private ssoService: SsoService,
  ) { }

  async ngOnInit() {
    
    await this.ssoService.get().subscribe(res =>{
      this.data = res;
      console.log(this.data);
      this.onChangeTable(this.config);
      // loading.dismiss()
    });
    
  }

  changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  onCellClick(data: any): any {
    console.log(data);
  }

}
