import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard, notAuthenticationGuard, userTypeGuard } from './core/guards';
import { LayoutComponent } from './layout/layout.component';
import { UserRedirectComponent } from './core/redirect.component';


const routes: Routes = [
  {
    path: 'login',
    canActivate: [notAuthenticationGuard()],
    loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'redirect',
    component: UserRedirectComponent
  },
  {
    path: 'agency',
    canActivate: [authenticationGuard(), userTypeGuard()],
    component: LayoutComponent,
    data: { userType: 'agency' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create-update-hotel' 
      },
      // {
      //   path: 'list-hotels',
      // },
      {
        path: 'create-update-hotel',
        loadChildren: () => import('./features/agency/create-update-hotel/create-update-hotel.module').then(m => m.CreateUpdateHotelModule)
      },
      // {
      //   path: 'list-rooms',
      // },
      // {
      //   path: 'create-update-room',
      // },
      // {
      //   path: 'reservations',
      // }
    ]
  },

  {
    path: 'client',
    canActivate: [authenticationGuard(), userTypeGuard()],
    component: LayoutComponent,
    data: { userType: 'client' },
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'list-hotels' 
      // },
      // {
      //   path: 'list-hotels'
      // },
      // {
      //   path: 'create-reservation',
      // },
      // {
      //   path: 'reservations',
      // }
    ]
  },
  {
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'redirect',
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
