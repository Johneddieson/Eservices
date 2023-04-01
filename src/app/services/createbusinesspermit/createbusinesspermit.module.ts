import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatebusinesspermitRoutingModule } from './createbusinesspermit-routing.module';
import { CreatebusinesspermitComponent } from './createbusinesspermit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { ViewChild } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-alerts';
@NgModule({
  declarations: [
    CreatebusinesspermitComponent,
  ],
  imports: [
    AlertModule.forRoot({ timeout: 5000, positionX: 'right', positionY: 'top'}),
    AngularSignaturePadModule,
    CommonModule,
    CreatebusinesspermitRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class CreatebusinesspermitModule {
 }
