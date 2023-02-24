import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  visibleTab: string = 'dashboard';

  changeView($event: any) {
    this.visibleTab = $event;
  }
}
