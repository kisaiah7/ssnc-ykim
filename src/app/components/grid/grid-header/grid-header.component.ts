import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss']
})
export class GridHeaderComponent {
  @Input() text!: String;
  @Input() closed: boolean = false;
  @Input() closing: boolean = false;
  @Input() opening: boolean = false;
  @Output() closedGridEvent = new EventEmitter<boolean>();
  @Output() closingGridEvent = new EventEmitter<boolean>();
  @Output() openingGridEvent = new EventEmitter<boolean>();

  toggleGrid() {
    if (this.closed) {
      this.opening = true;
      this.closed = false;
      this.closedGridEvent.emit(this.closed);
      this.openingGridEvent.emit(this.opening);
      setTimeout(()=>{
        this.opening = false;
        this.openingGridEvent.emit(this.opening);
      },500)
    } else {
      this.closing = true;
      this.closingGridEvent.emit(this.closing);
      setTimeout(()=>{
        this.closing = false;
        this.closed = true;
        this.closedGridEvent.emit(this.closed);
        this.closingGridEvent.emit(this.closing);
      },500)
    }
  }
}
