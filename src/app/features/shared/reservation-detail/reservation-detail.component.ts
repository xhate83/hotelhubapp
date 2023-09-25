import { Component, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IReservation } from 'src/app/models/reservation.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, CommonModule],
})
export class ReservationDetailComponent {

  dialogRef = inject(MatDialogRef<ReservationDetailComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public reservation: IReservation)
  {}
 
}
