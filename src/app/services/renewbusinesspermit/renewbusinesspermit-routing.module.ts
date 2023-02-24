import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenewbusinesspermitComponent } from './renewbusinesspermit.component';

const routes: Routes = [{ path: '', component: RenewbusinesspermitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewbusinesspermitRoutingModule { }
