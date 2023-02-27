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
  selectedTab: string = 'fund';

  @Output() changeViewEvent = new EventEmitter<string>();

  // Precise class changes for smooth accordion animations
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

  // Change views when selecting a tab
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.changeViewEvent.emit(tab);
  }
}
