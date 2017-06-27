import {Component, Input, OnInit} from '@angular/core';
import {Host} from './host';
import {Observable} from "rxjs/Observable";
import {LocalIpAddress} from "./local-ip-address";
import {LocalIpAddressService} from "./local-ip-address.service";

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.css']
})
export class HostDetailComponent implements OnInit {
  private localIpAddresses: Observable<LocalIpAddress[]>;
  private _host: Host;

  constructor(private localIpAddressService: LocalIpAddressService) { }

  ngOnInit() {
  }

  @Input()
  set host(host: Host) {
    console.log('Host: ', host);
    if (host) {
      this._host = host;
      this.localIpAddresses = this.localIpAddressService.findByHost(host.uuid);
    }
  }

  get host(): Host {
    return this._host;
  }

}
