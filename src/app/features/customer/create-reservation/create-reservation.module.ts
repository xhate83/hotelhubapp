import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { ModalCreateReservationComponent } from './modal-create-reservation/modal-create-reservation.component';
import { FilterRoomsComponent } from './filter-rooms/filter-rooms.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { ReservationDetailComponent } from '../../shared/reservation-detail/reservation-detail.component';
import { resolveGetAllReservations } from './create-reservations.resolver';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import localeEsCo from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCo, 'es-CO');

const routes: Route[] = [
  {
    path: '',
    component: ListRoomsComponent,
    resolve: {
      reservations: resolveGetAllReservations
    }
  }
]


@NgModule({
  declarations: [
    ListRoomsComponent,
    FilterRoomsComponent,
    ModalCreateReservationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    SharedModule,
    HeaderFeatureComponent,
    ReservationDetailComponent,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-CO' }],
})
export class CreateReservationModule { }
