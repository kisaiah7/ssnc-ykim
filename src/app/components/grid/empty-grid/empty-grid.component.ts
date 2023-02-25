import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-grid',
  templateUrl: './empty-grid.component.html',
  styleUrls: ['./empty-grid.component.scss']
})
export class EmptyGridComponent {
  @Input() text: string = '';
  closed: boolean = true;
  closing: boolean = false;
  opening: boolean = false;

  setClosedGridStatus(status: any) {
    this.closed = status;
  }
  setClosingGridStatus(status: any) {
    this.closing = status;
  }
  setOpeningGridStatus(status: any) {
    this.opening = status;
  }
}
