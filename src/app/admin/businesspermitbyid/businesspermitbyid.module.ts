import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesspermitbyidRoutingModule } from './businesspermitbyid-routing.module';
import { BusinesspermitbyidComponent } from './businesspermitbyid.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BusinesspermitbyidComponent
  ],
  imports: [
    CommonModule,
    BusinesspermitbyidRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   
  ]
})
export class BusinesspermitbyidModule { }
