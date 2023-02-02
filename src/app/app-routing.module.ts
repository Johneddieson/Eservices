import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
const routes: Routes = [
  {
    path: 'none',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./mainpage/mainpage.module').then((m) => m.MainpageModule),
  },
  {
    path: 'termsofservice',
    loadChildren: () =>
      import('./info/termsofservice/termsofservice.module').then(
        (m) => m.TermsofserviceModule
      ),
  },
  {
    path: 'privacypolicy',
    loadChildren: () =>
      import('./info/privacypolicy/privacypolicy.module').then(
        (m) => m.PrivacypolicyModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./credential/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./citizen/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'adminhome',
    loadChildren: () =>
      import('./admin/adminhome/adminhome.module').then(
        (m) => m.AdminhomeModule
      ),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'vaxeasy',
    loadChildren: () =>
      import('./services/vaxeasy/vaxeasy.module').then((m) => m.VaxeasyModule),
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
