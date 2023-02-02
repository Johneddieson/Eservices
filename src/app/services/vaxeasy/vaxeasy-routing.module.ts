import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaxeasyComponent } from './vaxeasy.component';

const routes: Routes = [{ path: '', component: VaxeasyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaxeasyRoutingModule { }
