import { Component, OnInit } from '@angular/core';
import {ClusterService} from "./cluster.service";
import {Observable} from "rxjs/Observable";
import { DialogService } from "ng2-bootstrap-modal";
import {Cluster} from "./cluster";
import {ClusterCreateComponent} from "./create-cluster.component";

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {
  private clusters: Observable<Cluster[]>;
  private selectedCluster: Cluster;

  constructor(private service: ClusterService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.clusters = this.service.findAll();
  }

  onSelect(cluster: Cluster) {
    console.log('Cluster: ', cluster);
    this.selectedCluster = cluster;
  }
  onChecked(cluster: Cluster) {
    console.log('checked: ', cluster);

    return true;
  }

  showEdit() {
    const disposable = this.dialogService.addDialog(ClusterCreateComponent, this.service.clone(this.selectedCluster))
      .subscribe((cluster) => {
        if (cluster) {
          // We get dialog result
          console.log('modal result', cluster);
          this.update(cluster);
        }
      });
  }

  showCreate() {
    const disposable = this.dialogService.addDialog(ClusterCreateComponent, new Cluster())
      .subscribe((cluster) => {
        // We get dialog result
        if (cluster) {
          console.log('modal result', cluster);
          this.create(cluster);
        }
      });
  }

  update(cluster: Cluster) {
    this.service.update(cluster).subscribe(() => this.clusters = this.service.findAll(),
      error => alert(error));
  }

  create(cluster: Cluster) {
    this.service.create(cluster).subscribe(() => this.clusters = this.service.findAll(),
      error => alert(error));
  }

  isSelected() {
    return this.selectedCluster;
  }
}
