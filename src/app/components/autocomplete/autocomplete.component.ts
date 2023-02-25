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
  funds: Array<string> = [];
  allFunds: Array<string> = FUNDS;
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
    if (this.funds.includes(event.option.viewValue)) {
      this.remove(event.option.viewValue);
    } else {
      this.funds.push(event.option.viewValue);
    }
    // this.fundInput.nativeElement.value = '';
    this.fundCtrl.setValue(null);
  }

  remove(fund: string): void {
    const index = this.funds.indexOf(fund);
    if (index >= 0) {
      this.funds.splice(index, 1);
    }
  }


  // onFundRemoved(fund: string) {
  //   const funds = this.fundsControl.value as never[];
  //   this.removeFirst(funds, fund);
  //   this.fundsControl.setValue(funds); // To trigger change detection
  // }

  // private removeFirst<T>(array: T[], toRemove: T): void {
  //   const index = array.indexOf(toRemove);
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }

  // onFundChanged() {
  //   console.log('asfd');
  //   const funds = this.fundsControl.value as never[];
  //   this.changeFilterEvent.emit(funds.toString());
  // }
}
