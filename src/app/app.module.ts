import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClusterModule } from './entities/cluster/cluster.module';


import { AppComponent } from './app.component';
import {SideBarComponent} from "./sidebar.component";
import {HostModule} from "./entities/host/host.module";

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BootstrapModalModule,
    ClusterModule,
    HostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
