import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { AlertModule } from 'ngx-alerts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    AlertModule.forRoot({ timeout: 1000, positionX: 'right', positionY: 'top'}),
    AngularSignaturePadModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC5Ld66WFLsZscDZnozvMly2fAJ5uPh7jo',
      authDomain: 'alcalaeservices-26dd2.firebaseapp.com',
      projectId: 'alcalaeservices-26dd2',
      storageBucket: 'alcalaeservices-26dd2.appspot.com',
      messagingSenderId: '99391754045',
      appId: '1:99391754045:web:b726544dcd176b306cff54',
      measurementId: 'G-BCW75EBM4V',
    }),
    AngularFirestoreModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
