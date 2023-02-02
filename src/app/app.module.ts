import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxCaptchaModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAAhuh4ZX2LOD_Ew-lp-w6zabaVKgpsFzM",
      authDomain: "tugegaraoeservices.firebaseapp.com",
      projectId: "tugegaraoeservices",
      storageBucket: "tugegaraoeservices.appspot.com",
      messagingSenderId: "636186004701",
      appId: "1:636186004701:web:939b622ad15c4dcb40df34",
      measurementId: "G-VRMS674SWP"
    }),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
