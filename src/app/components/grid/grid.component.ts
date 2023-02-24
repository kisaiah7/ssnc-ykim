import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, FirstDataRenderedEvent, ColumnApi } from 'ag-grid-community';
import "ag-grid-enterprise";

import {ItemService} from '../../services/item.service';
import {Item} from '../../models/Item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  private gridColumnApi!: ColumnApi;
  closed: boolean = false;
  closing: boolean = false;
  opening: boolean = false;

  toggleGrid() {
    if (this.closed) {
      this.opening = true;
      this.closed = false;

      setTimeout(()=>{
        this.opening = false;
      },500)
    } else {
      this.closing = true;
      setTimeout(()=>{
        this.closing = false;
        this.closed = true;
      },500)
    }
  }
  
  // Each Column Definition results in one Column.
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

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

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
