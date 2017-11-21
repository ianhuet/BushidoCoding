import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Gif } from './gif';

@Injectable()
export class HeroService {
  private giffyApiUrl = 'http://api.giphy.com/v1/gifs/search';
  private giffyApiKey = 'ADzCz2YNl7jYztX9tx3sdAKE9X8IoHd9';


  constructor(private http: Http) { }

  getGifsSearch(q: string): Promise<Array<Gif>> {
    return this.http
      .get(this.giffyApiUrl + "?api_key=" + this.giffyApiKey + "&q=" + q)
      .toPromise()
      .then((response) => {
        console.log( response.json().data );
        return response.json().data as Gif[];
      })
      .catch(this.handleError);
  }

  // TODO: abstract search parameter to interface
  getGif(id: number): Promise<Gif> {
    return this.getGifsSearch('cats')
      .then(gifs => gifs.find(gif => gif.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
