import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MMM-YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class DatePickerComponent implements OnInit {
  date = new FormControl(moment());
  start = new FormControl();
  end = new FormControl();

  @Output() startDateEvent = new EventEmitter<string>;
  @Output() endDateEvent = new EventEmitter<string>;

  ngOnInit(): void {
    this.start.valueChanges.subscribe(value => {
      if (value) {
        this.startDateEvent.emit(value._d.toISOString().split('T')[0]);
      } else {
        this.startDateEvent.emit('');
      }
    });

    this.end.valueChanges.subscribe(value => {
      if (value) {
        this.endDateEvent.emit(value._d.toISOString().split('T')[0]);
      } else {
        this.endDateEvent.emit('');
      }
    });
  }

}
