import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatebusinesspermitComponent } from './createbusinesspermit.component';

const routes: Routes = [{ path: '', component: CreatebusinesspermitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatebusinesspermitRoutingModule { }
