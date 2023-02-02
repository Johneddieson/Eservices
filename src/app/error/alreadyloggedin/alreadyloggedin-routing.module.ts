import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyloggedinComponent } from './alreadyloggedin.component';

const routes: Routes = [{ path: '', component: AlreadyloggedinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlreadyloggedinRoutingModule { }
