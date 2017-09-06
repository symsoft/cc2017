import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';
import { FormsModule } from '@angular/forms';
import {HostService} from './host.service';
import { HostDetailComponent } from './host-detail.component';
import {HostCreateComponent} from "./create-host.component";
import {LocalIpAddressService} from "./local-ip-address.service";
import {DataTableComponent} from '../../shared/components/data-table/data-table.component';


@NgModule({
  imports: [
    CommonModule,
    HostRoutingModule,
    FormsModule
  ],
  declarations: [
    HostComponent,
    HostDetailComponent,
    HostCreateComponent
    /** DataTableComponent */
  ],
  entryComponents: [
    HostCreateComponent
  ],
  providers: [
    HostService,
    LocalIpAddressService
  ]
})
export class HostModule { }
