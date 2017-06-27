import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClusterRoutingModule } from './cluster-routing.module';
import { ClusterComponent } from './cluster.component';
import {ClusterService} from './cluster.service';
import { ClusterDetailComponent } from './cluster-detail.component';
import {ClusterCreateComponent} from './create-cluster.component';



@NgModule({
  imports: [
    CommonModule,
    ClusterRoutingModule,
    FormsModule,
  ],
  declarations: [
    ClusterComponent,
    ClusterDetailComponent,
    ClusterCreateComponent
  ],
  entryComponents: [
    ClusterCreateComponent
  ],
  providers: [
    ClusterService
  ]
})
export class ClusterModule { }
