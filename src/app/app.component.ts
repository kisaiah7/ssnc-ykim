import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  visibleTab: string = 'fund';
  switchingTabs: boolean = false;

  changeView($event: any) {
    this.visibleTab = $event;
  }
}
