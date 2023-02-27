import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesspermitbyidRoutingModule } from './businesspermitbyid-routing.module';
import { BusinesspermitbyidComponent } from './businesspermitbyid.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-alerts';


@NgModule({
  declarations: [
    BusinesspermitbyidComponent
  ],
  imports: [
    CommonModule,
    BusinesspermitbyidRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot({ timeout: 5000, positionX: 'right', positionY: 'top'})
  ]
})
export class BusinesspermitbyidModule { }
