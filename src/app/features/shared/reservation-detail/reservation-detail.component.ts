import { Component, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ModeAppComponent } from '../../../shared/mode-app/mode-app.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IReservation } from '../../../models/reservation.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, CommonModule, MatStepperModule, ModeAppComponent],
})
export class ReservationDetailComponent {

  dialogRef = inject(MatDialogRef<ReservationDetailComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public reservation: IReservation)
  {}
 
}
