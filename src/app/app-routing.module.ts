import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard, notAuthenticationGuard, userTypeGuard } from './core/guards';
import { LayoutComponent } from './layout/layout.component';
import { UserRedirectComponent } from './core/redirect.component';
import { resolveInitialData } from './app.resolver';


const routes: Routes = [
  {
    path: 'login',
    canActivate: [notAuthenticationGuard()],
    resolve: {
      initialData: resolveInitialData
    },
    loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'redirect',
    component: UserRedirectComponent,
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
        redirectTo: 'list-hotels' 
      },
      {
        path: 'list-hotels',
        loadChildren: () => import('./features/agency/list-hotels/list-hotels.module').then(m => m.ListHotelsModule)
      },
      {
        path: 'create-update-hotel',
        loadChildren: () => import('./features/agency/create-update-hotel/create-update-hotel.module').then(m => m.CreateUpdateHotelModule)
      },
      {
        path: 'list-rooms',
        loadChildren: () => import('./features/agency/list-rooms/list-rooms.module').then(m => m.ListRoomsModule)
      },
      {
        path: 'create-update-room',
        loadChildren: () => import('./features/agency/create-update-room/create-update-room.module').then(m => m.CreateUpdateRoomModule)
      },
      {
        path: 'list-reservations',
        loadChildren: () => import('./features/agency/list-reservations/list-reservations.module').then(m => m.ListReservationsModule)
      }
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
