import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, NgFor } from '@angular/common';

import { BusinesspermitlistRoutingModule } from './businesspermitlist-routing.module';
import { BusinesspermitlistComponent } from './businesspermitlist.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    BusinesspermitlistComponent
  ],
  imports: [
    CommonModule,
    BusinesspermitlistRoutingModule,
    DecimalPipe, 
    NgFor, 
    FormsModule, 
    NgbTypeaheadModule, 
    NgbPaginationModule,
    NgxSpinnerModule
  ]
})
export class BusinesspermitlistModule { }
