import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaxeasyRoutingModule } from './vaxeasy-routing.module';
import { VaxeasyComponent } from './vaxeasy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VaxeasyComponent
  ],
  imports: [
    CommonModule,
    VaxeasyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VaxeasyModule { }
