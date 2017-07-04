import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Identifiable} from './Identifiable';
import { environment } from '../../../environments/environment';

export class NobillRestService<T extends Identifiable> {
  private url;
  private headers;
  private collection: BehaviorSubject<T[]>;
  protected dataStore: T[] = null;
  private httpService: Http;

  constructor(path: string, http: Http) {
    this.url = environment.restServerBaseUrl + path;
    this.headers = new Headers({'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic ' + btoa( environment.restServerUserPass )});
    this.httpService = http;
    this.collection = new BehaviorSubject(<T[]>[]);
  }


  findAll(): Observable<T[]> {
    this.loadAll(false);
    return this.collection;
  }

  loadAll(refresh: boolean): Observable<any> {
    const completion = new ReplaySubject(1);
    if (!this.dataStore || refresh) {
      console.log('load all: ', this.headers);
      this.httpService.get(this.url, {headers: this.headers})
        .subscribe((res: Response) => {
          const data = res.json() as T[];
          this.dataStore = data;
          this.collection.next(this.dataStore);
          completion.next(null);
        }, error => console.log('Error: ', error));
      /*
        .map((res: Response) => {console.log('test', res); return res.json() as T[]; })
        .subscribe(data => {
          console.log('Data: ', data);
          this.dataStore = data;
          this.collection.next(this.dataStore);
          completion.next(null);
        }, error => console.log(error));
        */

    } else {
      completion.next(null);
    }
    return completion;
  }

  refresh(): void {
    this.loadAll(true);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  findById(id: string): Observable<T> {
    console.log('findById: ' + id);
    const completion = new ReplaySubject(1);
    if (!this.dataStore) {
      this.loadAll(false).subscribe(() => {
        completion.next(this.dataStore.find(item => item._id === id));
        completion.complete();
      });
    } else {
      completion.next(this.dataStore.find(item => item._id === id));
      completion.complete();
    }
    return completion;
  }

  update(data: T): Observable<T> {
    const completion = new ReplaySubject(1);
    const url = `${this.url}/${data._id}`;
    this.httpService
      .put(url, JSON.stringify(data), {headers: this.headers, search: {oca: data.oca}})
      .map((res: Response) => res.json() as T)
      .subscribe(d => {
        this.dataStore = Object.assign([], this.dataStore.map(item => item._id === d._id ? d : item));
        this.collection.next(this.dataStore);
        completion.next(d);
        completion.complete();
      }, error => completion.error(error));
    return completion;
  }

  create(data: T): Observable<T> {
    const completion = new ReplaySubject(1);
    this.httpService
      .post(this.url, JSON.stringify(data), {headers: this.headers})
      .map((res: Response) => res.json() as T)
      .subscribe(createdData => {
        console.log('data: ' + createdData);
        this.dataStore.push(createdData);
        this.collection.next(this.dataStore);
        completion.next(this.clone(createdData));
        completion.complete();
      }, error => console.log(error));
    return completion;

  }
  delete(id: string): Observable<T> {
    const completion = new ReplaySubject(1);
    const url = `${this.url}/${id}`;
    console.log(url);
    this.httpService.delete(url, {headers: this.headers})
      .subscribe(() => {
        console.log('delete');
        this.dataStore = Object.assign([], this.dataStore.filter(item => item._id !== id));
        console.log(this.dataStore);
        this.collection.next(this.dataStore);
        completion.next(null);
        completion.complete();
      }, error => console.log(error));
    return completion;
  }

  clone(obj) {
    let copy;

    if (null === obj || 'object' !== typeof obj) {
      return obj;
    }

    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.clone(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy');
  }
}
