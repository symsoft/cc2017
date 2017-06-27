import {Injectable} from '@angular/core';
import {NobillRestService} from '../../shared/rest/nobill-rest.service';
import {LocalIpAddress} from './local-ip-address';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
@Injectable()
export class LocalIpAddressService extends NobillRestService<LocalIpAddress> {

  constructor(private http: Http) {
    super('https://10.151.0.101:8080/api/local-ip-addresses', http);
  }

  findByHost(hostUuid: string): Observable<LocalIpAddress[]> {
    const completion = new ReplaySubject(1);
    if (!this.dataStore) {
      this.loadAll(false).subscribe(() => {
        completion.next(this.dataStore.filter(item => {console.log('ip', item); return item.parentHostUuid === hostUuid}));
        completion.complete();
      });
    } else {
      completion.next(this.dataStore.filter(item => {console.log('ip', item); return item.parentHostUuid === hostUuid}));
      completion.complete();
    }
    return completion;
  }

}
