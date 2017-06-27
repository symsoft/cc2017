import {NobillRestService} from '../../shared/rest/nobill-rest.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Cluster} from './cluster';

@Injectable()
export class ClusterService extends NobillRestService<Cluster> {

  constructor(private http: Http) {
    super('clusters', http);
  }

}
