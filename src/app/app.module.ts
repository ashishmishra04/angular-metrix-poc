import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "@auth0/auth0-angular";
import {NgxJsonViewerModule} from "ngx-json-viewer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxJsonViewerModule,
    AuthModule.forRoot({
      domain: 'dev-krux.us.auth0.com',
      clientId: 'TCikfPsnU1dFxGonhqLChizj3Gdy5kMS',
      authorizationParams: {
        redirect_uri: window.location.origin,
        userAuthProfile:'http://s-kruxmetrix.kruxanalytics.com/auth0/GetUserAuthProfile'
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
