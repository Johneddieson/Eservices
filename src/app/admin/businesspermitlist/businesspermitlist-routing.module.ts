import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinesspermitlistComponent } from './businesspermitlist.component';

const routes: Routes = [{ path: '', component: BusinesspermitlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesspermitlistRoutingModule { }
