import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListHotelsComponent } from './list-hotels.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderFeatureComponent } from '../../../shared/header-feature/header-feature.component';
import { resolveGetHotelsByUser } from './list-hotels.resolver';

const routes: Route[] = [
  {
    path: '',
    component: ListHotelsComponent,
    resolve: {
      hotelsData: resolveGetHotelsByUser
    },
  }
]


@NgModule({
  declarations: [
    ListHotelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    SharedModule,
    HeaderFeatureComponent
  ]
})
export class ListHotelsModule { }
