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
import { SharedModule } from 'src/app/shared/shared.module';
import { ModeAppComponent } from 'src/app/shared/mode-app/mode-app.component';

const routes: Route[] = [
  {
    path: '',
    component: CreateUpdateHotelComponent
  },
  {
    path: ':id',
    component: CreateUpdateHotelComponent
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
    ModeAppComponent,
    SharedModule
  ]
})
export class CreateUpdateHotelModule { }
