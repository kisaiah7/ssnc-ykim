import { Component } from '@angular/core';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent {
  selectedFunds: Array<string> = [];
  startDate: string = '';
  endDate: string = '';
}
