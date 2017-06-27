import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Cluster} from "./cluster";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-cluster-create',
  template: `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" (click)="close()" >&times;</button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body">
        <form ngForm="cluster">
            <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" placeholder="Name" id="name" name="name" [(ngModel)]="cluster.name">
            </div>
            <div class="form-group">
              <label for="prefix">Default file prefix</label>
              <input class="form-control" placeholder="/usr/nobill_data/nobill4/" id="prefix" name="prefix" 
                     [(ngModel)]="cluster.defaultFilePrefix">
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
export class ClusterCreateComponent extends DialogComponent<Cluster, Cluster> {
  EDIT_TITLE = 'Edit Cluster';
  CREATE_TITLE = 'Create Cluster';

  title: string;
  cluster: Cluster;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = this.cluster;
    this.close();
  }

  fillData(cluster: Cluster): Observable<Cluster> {
    const o = super.fillData(cluster);
    this.cluster = cluster;
    if (cluster._id) {
      this.title = this.EDIT_TITLE;
    } else {
      this.title = this.CREATE_TITLE;
    }
    return o;
  }
}
