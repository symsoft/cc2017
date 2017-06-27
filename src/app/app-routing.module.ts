import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SideBarComponent} from "./sidebar.component";


const routes: Routes = [
  {path: 'entities/cluster', loadChildren: './entities/cluster/cluster.module#ClusterModule'},
  {path: 'entities/host', loadChildren: './entities/host/host.module#HostModule'},
  {path: 'sidebar', component: SideBarComponent},


  // {path: 'home', loadChildren: './home/home.module#HomeModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
