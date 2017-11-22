// import { Injectable } from '@angular/core';
// // import {Component, OnInit} from '@angular/core';

// import { Observable } from "rxjs/Observable";
// import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

// import { Gif } from './gif';

// @Injectable()
// export class SwiffyService {
//   private giffyApiUrl = 'http://api.giphy.com/v1/gifs/search';
//   private giffyApiKey = 'ADzCz2YNl7jYztX9tx3sdAKE9X8IoHd9';


//   constructor(private http: HttpClient) { }


  
//   // getGifsSearch(q: string): Promise<Array<Gif>> {

//     const params = new HttpParams()
//       .set('api_key', this.giffyApiKey)
//       .set('q', q);

//     return this.http
//       .get(this.giffyApiUrl, {params})
//        .do(console.log);

//        // .map(data => _.values(data));

//     // return this.http
//     //   .get(this.giffyApiUrl, {params})
//     //   .toPromise()
//     //   .then((response) => {
//     //     // console.log( response.json().data );
//     //     return response.json().data as Gif[];
//     //   })
//     //   .catch(this.handleError);

//     return 'bob';
//   }
  

//   // TODO: abstract search parameter to interface
//   // getGif(id: string): Promise<Gif> {
//     // return this.getGifsSearch('cats')
//     //   .then(gifs => gifs.find(gif => gif.id === id));
//   // }

//   private handleError(error: any): Promise<any> {
//     console.error('An error occurred', error);
//     return Promise.reject(error.message || error);
//   }
// }
