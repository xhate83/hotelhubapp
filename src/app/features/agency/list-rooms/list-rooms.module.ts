import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListRoomsComponent } from './list-rooms.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { resolveGetRoomsByUser, resolveGetHotelsByUser } from './list-rooms.resolver';


const routes: Route[] = [
  {
    path: '',
    component: ListRoomsComponent,
    resolve: {
      roomsData: resolveGetRoomsByUser,
      hotelsData: resolveGetHotelsByUser
    },
  }
]


@NgModule({
  declarations: [
    ListRoomsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatIconModule,
    SharedModule,
    HeaderFeatureComponent
  ]
})
export class ListRoomsModule { }
