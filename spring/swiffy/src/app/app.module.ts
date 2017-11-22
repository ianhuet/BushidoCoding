import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';

// import { HttpParams }    from '@angular/common/http';

import { AppComponent }  from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
