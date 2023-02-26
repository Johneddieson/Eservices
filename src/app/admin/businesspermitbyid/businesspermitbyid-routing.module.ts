import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinesspermitbyidComponent } from './businesspermitbyid.component';

const routes: Routes = [{ path: '', component: BusinesspermitbyidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesspermitbyidRoutingModule { }
