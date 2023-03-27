import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinesspermitbyidprintoutComponent } from './businesspermitbyidprintout.component';

const routes: Routes = [{ path: '', component: BusinesspermitbyidprintoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesspermitbyidprintoutRoutingModule { }
