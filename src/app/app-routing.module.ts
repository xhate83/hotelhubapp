import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard, notAuthenticationGuard } from './core/guards';



const routes: Routes = [
  {
    path: '', pathMatch : 'full', redirectTo: 'login'
  },
  {
    path: 'login', canActivate: [notAuthenticationGuard()], loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule)
  },

  { path: '**',  redirectTo: 'login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
