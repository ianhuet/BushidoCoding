import { Component }  from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

// import { HttpParams } from "@angular/common/http";

import 'rxjs/Rx';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  private giffyApiUrl = 'http://api.giphy.com/v1/gifs/search';
  private giffyApiKey = 'ADzCz2YNl7jYztX9tx3sdAKE9X8IoHd9';

  private title    = 'Swiffy';
  private subTitle = 'giving Giffy Cats & Dogs a new home at Swrve';

  protected gifs  : any = null;



  constructor(private _http: Http) {
    this.getGiffySearch('cats', 0);
  }


  ngOnInit() {
    // $('.gallery').isotope();
      // itemSelector: '.gif',
      // masonry: { columnWidth: 100 }
    
    var elem = document.querySelector('.gallery');
    var iso = new Isotope( elem, {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });
  }

  goMotion(event : MouseEvent) : void {
    console.log(event);
    // let gif = getGif(this.id);

    // event.src = "https://media3.giphy.com/media/Ov5NiLVXT8JEc/200w.gif";
  }



  private getGiffySearch(q: string, offset: number) {
    let limit = 25;

    return this._http.get(this.giffyApiUrl + "?api_key=" + this.giffyApiKey + "&q=" + q + "&limit=" + limit + "&offset=" + offset)
      .map((res: Response) => res.json())
      .subscribe(data => {
        this.gifs = data.data;
        console.log('Gifs', this.gifs);
      });
  }

  // private getGif(id: string) {
  //   let gif = this.gifs.filter(n => n.id === id);
  //   return gif;
  // }

}

