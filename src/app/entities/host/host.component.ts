import { Component, OnInit } from '@angular/core';
import {HostService} from "./host.service";
import {Observable} from "rxjs/Observable";
import { DialogService } from "ng2-bootstrap-modal";
import {Host} from "./host";
import {HostCreateComponent} from "./create-host.component";

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  private hosts: Observable<Host[]>;
  private selectedHost: Host;

  constructor(private service: HostService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.hosts = this.service.findAll();
  }

  onSelect(host: Host) {
    this.selectedHost = host;
  }

  showEdit() {
    const disposable = this.dialogService.addDialog(HostCreateComponent, this.service.clone(this.selectedHost))
      .subscribe((host) => {
        // We get dialog result
        if (host) {
          console.log('modal result', host);
          this.update(host);
        }
      });
  }

  showCreate() {
    const disposable = this.dialogService.addDialog(HostCreateComponent, new Host())
      .subscribe((host) => {
        if (host) {
          // We get dialog result
          console.log('modal result', host);
          this.create(host);
        }
      });
  }

  update(host: Host) {
    this.service.update(host).subscribe(() => this.hosts = this.service.findAll(),
      error => alert(error));
  }

  create(host: Host) {
    this.service.create(host).subscribe(() => this.hosts = this.service.findAll(),
      error => alert(error));
  }

  delete(host: Host) {
    this.service.delete(this.selectedHost._id);
  }

  isSelected() {
    return this.selectedHost;
  }
}
