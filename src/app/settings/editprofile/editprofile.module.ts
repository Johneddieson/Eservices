import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditprofileRoutingModule } from './editprofile-routing.module';
import { EditprofileComponent } from './editprofile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AlertModule } from 'ngx-alerts';


@NgModule({
  declarations: [
    EditprofileComponent
  ],
  imports: [
    CommonModule,
    EditprofileRoutingModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot({ timeout: 5000, positionX: 'right', positionY: 'top'})
  ]
})
export class EditprofileModule { }
