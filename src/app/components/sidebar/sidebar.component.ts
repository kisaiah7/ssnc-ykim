import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  closed: boolean = false;
  closing: boolean = false;
  opening: boolean = false;
  selectedTab: string = 'dashboard';

  @Output() changeViewEvent = new EventEmitter<string>();

  toggleSidebar() {
    if (this.closed) {
      this.opening = true;
      this.closed = false;

      setTimeout(()=>{
        this.opening = false;
      },500)
    } else {
      this.closing = true;
      setTimeout(()=>{
        this.closing = false;
        this.closed = true;
      },500)
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.changeViewEvent.emit(tab);
  }
}
