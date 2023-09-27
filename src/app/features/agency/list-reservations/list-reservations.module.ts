import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListReservationsComponent } from './list-reservations.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { resolveGetReservationsByAgency, resolveGetHotels } from './list-reservations.resolver';
import { ReservationDetailComponent } from '../../shared/reservation-detail/reservation-detail.component';


const routes: Route[] = [
  {
    path: '',
    component: ListReservationsComponent,
    resolve: {
      reservationsData: resolveGetReservationsByAgency,
      hotelsData: resolveGetHotels
    },
  }
]


@NgModule({
  declarations: [
    ListReservationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    HeaderFeatureComponent,
    MatRippleModule,
    ReservationDetailComponent
  ]
})
export class ListReservationsModule { }
