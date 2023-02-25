import { Component } from '@angular/core';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent {
  fundClientFilters: Array<string> = [];

  changeFundClientFilter($event: any) {
    this.fundClientFilters = $event;
    console.log(this.fundClientFilters);
  }
}
