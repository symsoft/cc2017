import {Component, ViewChild} from '@angular/core';
import {SideBarComponent} from './sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SideBarComponent) sidebar: SideBarComponent;
  title = 'Nobill';

  toggleSideBar() {
    console.log('toggle');
    console.log(this.sidebar.sidenav);
    this.sidebar.sidenav.collapse();
  }
}
