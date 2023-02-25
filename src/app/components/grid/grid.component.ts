import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, FirstDataRenderedEvent, IRowNode, GridApi } from 'ag-grid-community';
import "ag-grid-enterprise";

import {ItemService} from '../../services/item.service';
import {Item} from '../../models/Item';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  private gridApi!: GridApi<Item>;
  closed: boolean = false;
  closing: boolean = false;
  opening: boolean = false;
  rowData$!: Item[];
  @Input() selectedFunds: Array<string> = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  setClosedGridStatus(status: any) {
    this.closed = status;
  }
  setClosingGridStatus(status: any) {
    this.closing = status;
  }
  setOpeningGridStatus(status: any) {
    this.opening = status;
  }

  // ag-grid default properties for columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: 'agSetColumnFilter',
    flex: 1,
  };
  
  // ag-grid properties by column
  public columnDefs: ColDef[] = [
    { headerName: 'Fund', field: 'fund', cellStyle: {color: '#0985C7'}, width: 150 },
    { 
      headerName: 'Pending Actions', 
      field: 'pending_actions', 
      cellStyle: {
        backgroundImage: "url('/assets/pending_actions_black_24dp.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "invert(40%) sepia(99%) saturate(2488%) hue-rotate(176deg) brightness(88%) contrast(93%)"
      },
      width: 185
    },
    { headerName: 'Daily Book P&L', field: 'daily_book_pl', type: 'rightAligned', width: 185 },
    { headerName: 'MTD Book P&L', field: 'mtd_book_pl', type: 'rightAligned', width: 185 },
    { headerName: 'YTD Book P&L', field: 'ytd_book_pl', type: 'rightAligned', width: 185 },
    { headerName: 'End Book NAV', field: 'end_book_nav', type: 'rightAligned', width: 185 },
    { headerName: 'Client', field: 'client', width: 185 },
    { field: 'fund_client', hide: true },
    { field: 'date', hide: true}
  ];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['selectedFunds'].currentValue);
    if (changes['selectedFunds'].currentValue.length > 0) {
      let externalFilter = {
        fund_client: {
          type: 'set',
          values: changes['selectedFunds'].currentValue,
        },
        // date: {
        //   type: 'inRange',
        //   filter: changes['selectedFunds'].currentValue,
        //   filterTo: changes['selectedFunds'].currentValue,
        // }
      }
      this.gridApi.setFilterModel(externalFilter);
    } else if (changes['selectedFunds'].currentValue.length === 0) {
      this.gridApi.setFilterModel(null);
    }
  }

  constructor(private itemService: ItemService) {} 

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  // load grid data from server
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.itemService.getItems().subscribe((items) => {this.rowData$ = items});
  }
}
