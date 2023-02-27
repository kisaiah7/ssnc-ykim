import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent {
  @Input() selectedFunds: Array<string> = [];
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() exportCSV: boolean = false;
  @Input() addItem: boolean = false;
}

