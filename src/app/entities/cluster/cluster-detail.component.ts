import {Component, Input, OnInit} from '@angular/core';
import {Cluster} from './cluster';

@Component({
  selector: 'app-cluster-detail',
  templateUrl: './cluster-detail.component.html',
  styleUrls: ['./cluster-detail.component.css']
})
export class ClusterDetailComponent implements OnInit {
  @Input() cluster: Cluster;

  constructor() { }

  ngOnInit() {
  }

}
