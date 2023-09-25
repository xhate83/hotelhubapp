import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CreateUpdateRoomComponent } from './create-update-room.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { resolveGetRooms, resolveGetRoomByID, resolveGetHotels } from './create-update-room.resolver';

const routes: Route[] = [
  {
    path: '',
    component: CreateUpdateRoomComponent,
    resolve: {
      roomsData: resolveGetRooms,
      hotelsData: resolveGetHotels
    },
  },
  {
    path: ':hotelId/:id',
    component: CreateUpdateRoomComponent,
    resolve: {
      roomIdData: resolveGetRoomByID,
      roomsData: resolveGetRooms,
      hotelsData: resolveGetHotels
    },
  },
]


@NgModule({
  declarations: [
    CreateUpdateRoomComponent
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
export class CreateUpdateRoomModule { }
