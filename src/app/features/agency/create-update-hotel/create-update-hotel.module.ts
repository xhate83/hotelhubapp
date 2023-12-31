import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CreateUpdateHotelComponent } from './create-update-hotel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { resolveGetHotels, resolveGetHotelByID } from './create-update-hotel.resolver';

const routes: Route[] = [
  {
    path: '',
    component: CreateUpdateHotelComponent,
    resolve: {
      hotelsData: resolveGetHotels
    },
  },
  {
    path: ':id',
    component: CreateUpdateHotelComponent,
    resolve: {
      hotelIdData: resolveGetHotelByID,
      hotelsData: resolveGetHotels
    },
  },
]


@NgModule({
  declarations: [
    CreateUpdateHotelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderFeatureComponent
  ]
})
export class CreateUpdateHotelModule { }
