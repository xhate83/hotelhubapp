import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil  } from 'rxjs';
import { SnackBarService } from '../../../shared/utilities/snack-bak.service';
import { AuthService } from '../../../core/auth.service';
import { STATES } from '../../../core/master-data';
import { IHotel } from '../../../models/hotel.model';
import { generateId } from '../../../shared/utilities/static-functions';
import { HotelService } from '../../../services/hotel.service';


@Component({
  selector: 'app-create-update-hotel',
  templateUrl: './create-update-hotel.component.html'
})
export class CreateUpdateHotelComponent implements OnDestroy, OnInit {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _snackBarService = inject(SnackBarService);
  private _hotelService = inject(HotelService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  mode = 'create';
  textButton = 'Crear';
  textTitle = 'Crear Hotel';
  hotels: IHotel[] = [];
  hotelStates = [...STATES];
  hotelForm!: FormGroup;
  hotelUpdating!: IHotel;

  ngOnInit(): void {
    this._createHotelForm();

    this._hotelService.hotels$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      hotels => {
        this.hotels = hotels;
      }
    );

    this._hotelService.hotelById$.pipe(takeUntil(this._unsubscribeAll)).subscribe(hotel => {
      if(hotel) {
        this.mode = 'update';
        this.textButton = 'Actualizar';
        this.textTitle = 'Actualizar Hotel';
        const matchingState = this.hotelStates.find(state => state.id === hotel.state.id);
        this.hotelForm.patchValue({
          name: hotel.name,
          state: matchingState
        });
        this.hotelUpdating = hotel;
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this._hotelService.cleanHotelById();
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    if(this.mode === 'create') {
      this._createHotel();
    }else {
      this._updateHotel();
    }
    
  }

  private _createHotelForm(): void {
    this.hotelForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      state: [null, Validators.required]
    });
  }

  private _createHotel(): void {
    const hotel: IHotel = {
      ...this.hotelForm.value,
      createdBy: this._authService.getUser()?.email,
      id: generateId(this.hotels)
    }
    this._hotelService.createHotel(hotel).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      if(res) {
        this._createHotelForm();
        this._snackBarService.openSnackBar('Hotel creado', '✅')
      }else {
        this._snackBarService.openSnackBar('No se pudo crear el hotel', '⛔')
      }
    });
  }

  private _updateHotel(): void {
    const hotel: IHotel = {
      ...this.hotelUpdating,
      ...this.hotelForm.value
    }
    this._hotelService.updateHotel(hotel).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      if(res) {
        this._snackBarService.openSnackBar('Hotel actualizado', '✅')
      }else {
        this._snackBarService.openSnackBar('No se pudo actualizar el hotel', '⛔')
      }
    });
  }
}