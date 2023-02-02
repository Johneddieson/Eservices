import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
// import { SignupComponent } from '/Users/Vfam/tuguegaraocityhall/eservices/';
import {AlreadyloggedinComponent} from 'src/app/error/alreadyloggedin/alreadyloggedin.component'

@NgModule({
  declarations: [
    SignupComponent,
    AlreadyloggedinComponent
  ],
  imports: [
    NgxCaptchaModule,
    ReactiveFormsModule,
    CommonModule,
    SignupRoutingModule,
    FormsModule
  ]
})
export class SignupModule { }
