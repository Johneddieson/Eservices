import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageRoutingModule } from './mainpage-routing.module';
import { MainpageComponent } from './mainpage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainpageComponent
  ],
  imports: [
    CommonModule,
    MainpageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainpageModule { }
