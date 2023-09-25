import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil  } from 'rxjs';
import { SnackBarService } from '../../../shared/utilities/snack-bak.service';
import { AuthService } from '../../../core/auth.service';
import { STATES, ROOM_TYPES, CITIES, TAXES } from '../../../core/master-data';
import { IHotel } from '../../../models/hotel.model';
import { generateId } from '../../../shared/utilities/static-functions';
import { RoomService } from '../../../services/room.service';
import { IRoom } from 'src/app/models/room.model';
import { HotelService } from 'src/app/services/hotel.service';


@Component({
  selector: 'app-create-update-room',
  templateUrl: './create-update-room.component.html'
})
export class CreateUpdateRoomComponent implements OnDestroy, OnInit {

  private _formBuilder = inject(FormBuilder);
  private _snackBarService = inject(SnackBarService);
  private _roomService = inject(RoomService);
  private _hotelsService = inject(HotelService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  mode = 'create';
  textButton = 'Crear';
  textTitle = 'Crear Habitación';
  rooms: IRoom[] = [];
  hotels: IHotel[] = [];
  roomStates = [...STATES];
  roomTypes = [...ROOM_TYPES];
  roomCities = [...CITIES];
  roomTaxes = [...TAXES];
  roomForm!: FormGroup;
  roomUpdating!: IRoom;

  ngOnInit(): void {
    this._createRoomForm();

    this._hotelsService.hotels$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      hotels => {
        this.hotels = hotels;
      }
    );

    this._roomService.rooms$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      rooms => {
        this.rooms = rooms;
      }
    );

    this._roomService.roomById$.pipe(takeUntil(this._unsubscribeAll)).subscribe(room => {
      if(room) {
        this.mode = 'update';
        this.textButton = 'Actualizar';
        this.textTitle = 'Actualizar Habitación';
        const matchingState = this.roomStates.find(state => state.id === room.state.id);
        const matchingType = this.roomTypes.find(type => type.id === room.type.id);
        const matchingCity = this.roomCities.find(city => city.id === room.ubication.id);
        const roomTaxIds = room.taxes.map(tax => tax.id);
        const matchingTaxes = this.roomTaxes.filter(tax => roomTaxIds.includes(tax.id));

        this.roomForm.patchValue({
          ...room,
          state: matchingState,
          type: matchingType,
          ubication: matchingCity,
          taxes: matchingTaxes
        });
        this.roomUpdating = room;
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this._roomService.cleanRoomById();
  }

  onSubmit(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    if(this.mode === 'create') {
      this._createRoom();
    }else {
      this._updateRoom();
    }
    
  }

  private _createRoomForm(): void {
    this.roomForm = this._formBuilder.group({
      cost: [null, [Validators.required, Validators.min(0)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      state: [null, Validators.required],
      type: [null, Validators.required],
      ubication: [null, Validators.required],
      taxes: [[], Validators.required],
      hotelId: [null, Validators.required]
    });
  }

  private _createRoom(): void {
    const room: IRoom = {
      ...this.roomForm.value,
      id: generateId(this.rooms)
    }

    this._roomService.createRoom(this.roomForm.value.hotelId, room).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      if(res) {
        this._createRoomForm();
        this._snackBarService.openSnackBar('Habitación creado', '✅')
      }else {
        this._snackBarService.openSnackBar('No se pudo crear la habitación', '⛔')
      }
    });
  }

  private _updateRoom(): void {
    const room: IRoom = {
      ...this.roomUpdating,
      ...this.roomForm.value
    }

    this._roomService.updateRoom(room.hotelId, room).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      if(res) {
        this._snackBarService.openSnackBar('Habitación actualizado', '✅')
      }else {
        this._snackBarService.openSnackBar('No se pudo actualizar la habitación', '⛔')
      }
    });
  }
}