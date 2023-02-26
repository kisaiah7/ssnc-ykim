import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FUNDS } from 'src/app/models/Funds';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fundCtrl = new FormControl('');
  filteredFunds: Observable<Array<string>>;
  selectedFunds: Array<string> = [];
  allFunds: Array<string> = FUNDS;
  @Output() selectFundsEvent = new EventEmitter<Array<string>>();
  @ViewChild('fundInput') fundInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredFunds = this.fundCtrl.valueChanges.pipe(
      startWith(null),
      map((fund: string | null) => 
        (fund ? this._filter(fund) : this.allFunds.slice(0, 5))
      ),
    );
  }

  private _filter(value: string): Array<string> {
    const filterValue = value.toLowerCase();
    return this.allFunds.filter(fund => fund.toLowerCase().includes(filterValue)).splice(0, 5);
  }

  add(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedFunds.includes(event.option.viewValue)) {
      this.remove(event.option.viewValue);
    } else {
      this.selectedFunds.push(event.option.viewValue);
    }
    this.fundInput.nativeElement.value = '';
    this.fundCtrl.setValue(null);

    this.selectFundsEvent.emit([...this.selectedFunds]);
  }

  remove(fund: string): void {
    const index = this.selectedFunds.indexOf(fund);
    if (index >= 0) {
      this.selectedFunds.splice(index, 1);

      this.selectFundsEvent.emit([...this.selectedFunds]);
    }
  }

}
