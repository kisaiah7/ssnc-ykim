import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  fundsControl = new FormControl([]);
  fundsList: string[] = [
    'Onshore growth fund LP',
    'Offshore Growth Funds LLC',
    'Event Driven Fund UK LLC',
    'Event Driven Fund US LP',
    'Opportunistic Fund LP',
    'What the Fund LP',
    'Statistical Arb Fund LP',
    'Venator Fund LP',
    'Venless LLC',
    'VenRad LP',
    'Infiltrator Fund LLC',
    'Supremacy fund LLC',
    'Tantive IV Fund LP',
    'Tydirium Fund LLC',
    'Razor Crest Fund LP',
    'Corvus Fund LP'
  ];

  constructor() {}

  onFundRemoved(fund: string) {
    const funds = this.fundsControl.value as never[];
    this.removeFirst(funds, fund);
    this.fundsControl.setValue(funds); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
