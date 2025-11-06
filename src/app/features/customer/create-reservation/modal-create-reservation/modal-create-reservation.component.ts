import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFilterRooms } from '../../../../models/filter-rooms';
import { IRoom } from '../../../../models/room.model';
import { generateId } from '../../../../shared/utilities/static-functions';
import { AuthService } from '../../../../core/auth.service';
import { GENDER, DOCUMENT_TYPES } from '../../../../core/master-data';
import { IDocumentType, IGender, IReservation } from '../../../../models/reservation.model';
import { SnackBarService } from '../../../../shared/utilities/snack-bak.service';



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
  perNightWithTaxes!: number;
  nights!: number; 
  maxDate = new Date();
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _snackBarService = inject(SnackBarService);
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: {room: IRoom, initalDataReservation: IFilterRooms, reservations: IReservation[]})
  {}

  get guestsArray(): FormArray {
    return this.reservationForm.get('guests') as FormArray;
  }

  ngOnInit(): void {
    this._createReservationForm();

    const dateStart: Date | string = this.data.initalDataReservation.dateStart;
    const dateEnd: Date | string = this.data.initalDataReservation.dateEnd;
    const guests = this.data.initalDataReservation.countGuest ?? 1;
    

    this.nights = this._nightsBetween(dateStart, dateEnd);
    this.perNightWithTaxes = this._pricePerNightWithTaxes(this.data.room.cost, this.data.room.taxes);

    this.totalPrice = this.perNightWithTaxes * this.nights * guests;
  }

  createReservation(): void {
    const dateStart: Date = new Date(this.data.initalDataReservation.dateStart);
    const dateEnd: Date= new Date(this.data.initalDataReservation.dateEnd);
    if (this._overlaps(this.data.reservations, this.data.room.id, dateStart, dateEnd)) {
      this._snackBarService.openSnackBar('Ya existe una reserva en ese rango de fechas', '⛔');
      this.dialogRef.close();
      return;
    }


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
    this.dialogRef.close(this._sanitizeReservation(newRervation));
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


  private _nightsBetween(start: Date | string, end: Date | string): number {
    const floor = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diffMs = Math.ceil((floor(new Date(end)) - floor(new Date(start))) / 86400000);
    return Math.max(diffMs, 1);
  }

  private _pricePerNightWithTaxes(cost: number, taxes: { percentage: number }[]): number {
    const taxesSum = (taxes ?? []).reduce((acc, t) => acc + cost * t.percentage, 0);
    return cost + taxesSum;
  }

  private _overlaps(
    reservations: IReservation[],
    roomId: number,
    start: Date | string,
    end: Date | string
  ): boolean {
    const s = this._midnightLocalMs(start);
    const e = this._midnightLocalMs(end);

    return reservations.some(r => {
      if (r.roomId !== roomId) return false;
      const rs = this._midnightLocalMs(r.dateStart);
      const re = this._midnightLocalMs(r.dateEnd);
      return s < re && e > rs;
    });
  }

  private _sanitize(s: string): string {
    return (s ?? '').replace(/<[^>]*>/g, '').trim();
  }

  private _sanitizeReservation(r: IReservation): IReservation {
    return {
      ...r,
      emergencyContact: {
        fullName: this._sanitize(r.emergencyContact.fullName),
        contactPhone: this._sanitize(r.emergencyContact.contactPhone),
      },
      guests: r.guests.map(g => ({
        ...g,
        fullName: this._sanitize(g.fullName),
        documentNumber: this._sanitize(g.documentNumber),
        email: this._sanitize(g.email),
        phoneNumber: this._sanitize(g.phoneNumber),
      }))
    };
  }

  private _midnightLocalMs(x: Date | string): number {
    const d = new Date(x);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
 
}
