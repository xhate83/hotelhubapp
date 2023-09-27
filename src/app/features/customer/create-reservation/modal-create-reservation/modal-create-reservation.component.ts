import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFilterRooms } from '../../../../models/filter-rooms';
import { IRoom } from '../../../../models/room.model';
import { IReservation } from '../../../../models/reservation.model';
import { generateId } from '../../../../shared/utilities/static-functions';
import { AuthService } from '../../../../core/auth.service';
import { GENDER, DOCUMENT_TYPES } from '../../../../core/master-data';
import { IGender } from '../../../../models/reservation.model';
import { IDocumentType } from '../../../../models/reservation.model';


@Component({
  selector: 'app-modal-create-reservation',
  templateUrl: './modal-create-reservation.component.html',
})
export class ModalCreateReservationComponent {
  
  dialogRef = inject(MatDialogRef<ModalCreateReservationComponent>);
  reservationForm!: FormGroup;
  genders: IGender[] = [...GENDER];
  documentTypes: IDocumentType[] = [...DOCUMENT_TYPES];
  totalPrice!: number;
  maxDate = new Date();
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {room: IRoom, initalDataReservation: IFilterRooms, reservations: IReservation[]})
  {}

  get guestsArray(): FormArray {
    return this.reservationForm.get('guests') as FormArray;
  }

  ngOnInit(): void {
    this._createReservationForm();
    this.totalPrice = this._calculateTotalPrice(this.data.room);
  }

  createReservation(): void {

    const newRervation: IReservation = {
      ...this.reservationForm.value,
      id: generateId(this.data.reservations),
      createdBy: this._authService.getUser()?.email,
      roomId: this.data.room.id,
      hotelId: this.data.room.hotelId,
      taxes: this.data.room.taxes,
      totalPrice: this.totalPrice,
      dateEnd: this.data.initalDataReservation.dateEnd,
      dateStart: this.data.initalDataReservation.dateStart,
    }
    this.dialogRef.close(newRervation);
  }

  private _createReservationForm(): void {
    this.reservationForm = this._formBuilder.group({
        guests: this._formBuilder.array(
            Array(this.data.initalDataReservation.countGuest ?? 0)
                .fill(null)
                .map(() => this._createGuestForm())
        ),
        emergencyContact: this._formBuilder.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            contactPhone: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[0-9]*')]]
        })
    });
  }

  private _createGuestForm(): FormGroup {
    return this._formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[0-9]*')]]
    });
  }

  private _calculateTotalPrice(room: IRoom): number {
    let taxesTotal = 0;
    
    room.taxes.forEach(tax => {
        taxesTotal += room.cost * tax.percentage;
    });

    return room.cost + taxesTotal;
}
 
}
