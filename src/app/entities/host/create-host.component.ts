import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {Host} from './host';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-host-create',
  template: `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" (click)="close()" >&times;</button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body">
        <form ngForm="host">
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" placeholder="Name" id="name" name="name" [(ngModel)]="host.name">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="confirm()">Save</button>
        <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
      </div>
    </div>
  </div>`
})
export class HostCreateComponent extends DialogComponent<Host, Host> {
  EDIT_TITLE = 'Edit Host';
  CREATE_TITLE = 'Create Host';

  title: string;
  host: Host;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = this.host;
    this.close();
  }

  fillData(host: Host): Observable<Host> {
    const o = super.fillData(host);
    this.host = host;
    if (host._id) {
      this.title = this.EDIT_TITLE;
    } else {
      this.title = this.CREATE_TITLE;
    }
    return o;
  }
}
