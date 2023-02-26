import { Component, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, FirstDataRenderedEvent, IRowNode, GridApi, IDateFilterParams } from 'ag-grid-community';
import "ag-grid-enterprise";

import {ItemService} from '../../services/item.service';
import {Item} from '../../models/Item';
import { FUNDS } from 'src/app/models/Funds';
import { ITEMS } from 'src/app/models/mock-items';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  private gridApi!: GridApi<Item>;
  closed: boolean;
  closing: boolean;
  opening: boolean;
  gridData$: Item[] = ITEMS;
  displayedRowCount: number = 0;
  @Input() selectedFunds: Array<string> = [];
  @Input() startDate: string | null = '';
  @Input() endDate: string | null = '';
  @Input() exportCVS: boolean = false;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private itemService: ItemService) {
    this.closed = false;
    this.closing = false;
    this.opening = false;
  } 

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

  public filterParams: IDateFilterParams = {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
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
    { headerName: 'MTD Book P&L', field: 'mtd_book_pl', filter: 'agNumberColumnFilter', type: 'rightAligned', width: 185 },
    { headerName: 'YTD Book P&L', field: 'ytd_book_pl', filter: 'agNumberColumnFilter', type: 'rightAligned', width: 185 },
    { headerName: 'End Book NAV', field: 'end_book_nav', filter: 'agNumberColumnFilter', type: 'rightAligned', width: 185 },
    { headerName: 'Client', field: 'client', width: 185 },
    { field: 'fund_client', hide: true },
    { field: 'date', filter: 'agDateColumnFilter', filterParams: this.filterParams, hide: true }
  ];

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.itemService.getItems().subscribe((items) => {this.gridData$ = items});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridApi) {
      let dateSortType = 'greaterThan';
      let dateFrom, dateTo;
      
      if (changes['selectedFunds'] && changes['selectedFunds'].currentValue.length > 0) {
        this.selectedFunds = changes['selectedFunds'].currentValue;
      } 

      if (changes['startDate'] && changes['startDate'].currentValue.length > 0) {
        this.startDate = changes['startDate'].currentValue;
      }

      if (changes['endDate'] && changes['endDate'].currentValue.length > 0) {
        this.endDate = changes['endDate'].currentValue;
      }

      if (this.startDate && this.endDate) {
        dateSortType = 'inRange';
        dateFrom = this.startDate;
        dateTo = this.endDate;
      } else if (this.startDate) {
        dateSortType = 'greaterThan';
        dateFrom = this.startDate;
      } else if (this.endDate) {
        dateSortType = 'lessThan';
        dateFrom = this.endDate;
      }

      if (this.selectedFunds.length == 0) {
        this.selectedFunds = FUNDS;
      }

      let externalFilter = {
        fund_client: {
          type: 'set',
          values: this.selectedFunds,
        },
        date: {
          filterType: 'date',
          type: dateSortType,
          dateFrom: dateFrom,
          dateTo: dateTo,
        }
      }

      this.gridApi.setFilterModel(externalFilter);

      if (changes['exportCVS']) {
        this.gridApi.exportDataAsCsv();
      }
    }
  }  
}
