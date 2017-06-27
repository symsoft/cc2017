import {NobillRestService} from '../../shared/rest/nobill-rest.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Host} from './host';

@Injectable()
export class HostService extends NobillRestService<Host> {

  constructor(private http: Http) {
    super('hosts', http);
  }

}
