import {Component, OnInit} from '@angular/core';
import {TableService} from './app.table.service';
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 })
 export class AppComponent implements OnInit {
  title = 'Capco-app';
  maxRows;
  orgTabledata: any;
  tableData;
  selectedRows: any;
  prevtable = [];
  index = 0;
  rows = 0;
  nextRows = 0;
  maxDisplayedRows = 0;
  isNextDisaplayed = true;
  constructor(private tableService: TableService) {}
  ngOnInit() {
   this.tableService.getCapcoTable().subscribe(data => {
    this.orgTabledata = data;
    this.tableData = this.orgTabledata;
    this.maxRows = this.tableData.length;
   });
  }
  RowSelected(tabselectedRow) {
   this.tableService.setPostcall(tabselectedRow);
  }
  noOfRowsDisplayed(data) {
   this.selectedRows = 0;
   this.index = 0;
   this.rows = 0;
   this.nextRows = 0;
   this.selectedRows = data.target.value;
   this.tableData = [];
   for (let i = 0; i <= this.selectedRows - 1; i++) {
    this.tableData.push(this.orgTabledata[i]);
   }
  }
  prevPage() {
   this.tableData = [];
   for (let i = this.index - this.selectedRows; i <= this.index - 1; i++) {
    this.tableData.push(this.orgTabledata[i]);
   }
   this.index = this.index - this.selectedRows;
   this.rows = 0;
  }
  nextPage() {
   const val = parseInt(this.selectedRows, 10);
   this.prevtable = this.tableData;
   this.tableData = [];
   if (this.rows === 0) {
    this.index = val;
    this.rows = val + val;
    this.nextRows = 1;
   } else {
    this.index = (this.rows - this.nextRows) + 1;
    this.rows = val + this.rows + 1;
    this.nextRows = this.nextRows + 1;
    if (this.nextRows > 2) {
     this.index = this.index;
    }
   }
   for (let i = this.index; i <= this.rows - this.nextRows; i++) {
    this.tableData.push(this.orgTabledata[i]);
   }
   this.maxDisplayedRows = this.rows - this.nextRows;
   this.isNextDisaplayed = this.maxDisplayedRows < this.maxRows ? true : false;
  }
 }
 