import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { resolveGetReservationsByCustomer, resolveGetAllHotels } from './reservations.resolver';
import { ReservationDetailComponent } from '../../shared/reservation-detail/reservation-detail.component';


const routes: Route[] = [
  {
    path: '',
    component: ReservationsComponent,
    resolve: {
      reservationsData: resolveGetReservationsByCustomer,
      hotelsData: resolveGetAllHotels
    },
  }
]


@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    HeaderFeatureComponent,
    ReservationDetailComponent
  ]
})
export class ReservationsModule { }
