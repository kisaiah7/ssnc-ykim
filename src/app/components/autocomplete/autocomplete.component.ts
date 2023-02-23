import { Component } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  fundsList: Array<string> = [];

  constructor() {
    this.fundsList = ['asdf', 'asdf','asdf'];
  }
}
