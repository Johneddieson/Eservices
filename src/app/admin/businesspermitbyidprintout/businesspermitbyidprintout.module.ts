import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesspermitbyidprintoutRoutingModule } from './businesspermitbyidprintout-routing.module';
import { BusinesspermitbyidprintoutComponent } from './businesspermitbyidprintout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    BusinesspermitbyidprintoutComponent
  ],
  imports: [
    // CommonModule,
    // BusinesspermitbyidprintoutRoutingModule
    CommonModule,
    BusinesspermitbyidprintoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot({ timeout: 5000, positionX: 'right', positionY: 'top'})
  ]
})
export class BusinesspermitbyidprintoutModule { }
