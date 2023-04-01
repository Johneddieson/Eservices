import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenewbusinesspermitRoutingModule } from './renewbusinesspermit-routing.module';
import { RenewbusinesspermitComponent } from './renewbusinesspermit.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    RenewbusinesspermitComponent
  ],
  imports: [
    RenewbusinesspermitRoutingModule,
    AlertModule.forRoot({ timeout: 5000, positionX: 'right', positionY: 'top'}),
    AngularSignaturePadModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class RenewbusinesspermitModule { }
