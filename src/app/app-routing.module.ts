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
  { 
    path: 'ApplyBusinessPermit', 
    loadChildren: () => 
    import('./services/createbusinesspermit/createbusinesspermit.module')
    .then(m => m.CreatebusinesspermitModule),
    canActivate: [AuthguardGuard], 
  
  },
  { path: 'RenewBusinessPermit', 
  loadChildren: () => 
  import('./services/renewbusinesspermit/renewbusinesspermit.module').then(m => m.RenewbusinesspermitModule), 
  canActivate: [AuthguardGuard],
},
  { 
    path: 'businesspermit/list', 
    loadChildren: () => import('./admin/businesspermitlist/businesspermitlist.module').then(m => m.BusinesspermitlistModule),
    canActivate: [AuthguardGuard],
  },
  { 
    path: 'businesspermit/:id', 
    loadChildren: () => import('./admin/businesspermitbyid/businesspermitbyid.module').then(m => m.BusinesspermitbyidModule), 
    canActivate: [AuthguardGuard],
  },
  { 
    path: 'changepassword', 
    loadChildren: () => import('./settings/changepassword/changepassword.module').then(m => m.ChangepasswordModule), 
    canActivate: [AuthguardGuard],
  },
  { 
    path: 'editprofile', 
    loadChildren: () => import('./settings/editprofile/editprofile.module').then(m => m.EditprofileModule), 
    canActivate: [AuthguardGuard],
  },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
