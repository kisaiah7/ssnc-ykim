import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent {
  @Input() item: Item;

  constructor() {
    this.item = {
      "id": 1,
      "fund": "KOVJEFD",
      "pending_actions": null,
      "daily_book_pl": "JASH6ECAYY",
      "mtd_book_pl": "152,054,870",
      "ytd_book_pl": "639,442,456",
      "end_book_nav": "309,513,627",
      "client": "OVAN2XSQFI"
    }
  }
}
