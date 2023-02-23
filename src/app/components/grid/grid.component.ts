import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';

import {ItemService} from '../../services/item.service';
import {Item} from '../../models/Item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
   // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'Fund', field: 'fund', type: 'leftAligned', cellStyle: {color: '#0985C7'}, filter: 'agTextColumnFilter' },
    { 
      headerName: 'Pending Actions', 
      field: 'pending_actions', 
      type: 'centerAligned', 
      cellStyle: {
        backgroundImage: "url('/assets/pending_actions_black_24dp.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "invert(40%) sepia(99%) saturate(2488%) hue-rotate(176deg) brightness(88%) contrast(93%)"
      } 
    },
    { headerName: 'Daily Book P&L', field: 'daily_book_pl', type: 'rightAligned', filter: 'agTextColumnFilter' },
    { headerName: 'MTD Book P&L', field: 'mtd_book_pl', type: 'rightAligned', filter: 'agNumberColumnFilter' },
    { headerName: 'YTD Book P&L', field: 'ytd_book_pl', type: 'rightAligned', filter: 'agNumberColumnFilter' },
    { headerName: 'End Book NAV', field: 'end_book_nav', type: 'rightAligned', filter: 'agNumberColumnFilter' },
    { headerName: 'Client', field: 'client', type: 'leftAligned', filter: 'agTextColumnFilter' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: 'agSetColumnFilter',
  };

  rowData$!: Item[];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private itemService: ItemService) {} 

  ngOnInit(): void {}

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.itemService.getItems().subscribe((items) => {this.rowData$ = items});
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
