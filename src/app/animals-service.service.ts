import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Animal } from './animal.model';

@Injectable()
export class AnimalsService {

  private animalsUrl = 'http://strikersoft.github.io/strikersoft-frontend-test-assignment/data.json';  // URL to ss data

  constructor (private http: Http) {}

  getAnimals (): Observable<[Animal]> {
    return this.http.get(this.animalsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
