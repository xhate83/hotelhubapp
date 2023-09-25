import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { Subject, takeUntil  } from 'rxjs';
import { SnackBarService } from '../../../shared/utilities/snack-bak.service';
import { STATES } from '../../../core/master-data';
import { IRoom } from '../../../models/room.model';
import { RoomService } from '../../../services/room.service';
import { HotelService } from '../../../services/hotel.service';
import { IState } from '../../../models/state.model';
import { Router } from '@angular/router';
import { IHotel } from 'src/app/models/hotel.model';


@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
})
export class ListRoomsComponent implements OnDestroy, OnInit {

  private _router = inject(Router);
  private _snackBarService = inject(SnackBarService);
  private _roomService = inject(RoomService);
  private _hotelService = inject(HotelService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  rooms: IRoom[] = [];
  hotels: IHotel[] = [];
  roomsStates = [...STATES];

  ngOnInit(): void {

    this._hotelService.hotels$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      hotels => {
        this.hotels = hotels;
      }
    )

    this._roomService.rooms$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      rooms => {
        this.rooms = rooms.map(room => {
          const hotel = this.hotels.find(hotel => hotel.id === room.hotelId) ?? null;
          if(hotel) {
            room.hotel = hotel;
          }
          return room;
        }).sort((a, b) => {
          if (a.hotel?.name && b.hotel?.name) {
            return a.hotel.name.localeCompare(b.hotel.name);
          }
          return 0;
        });

      }
    )

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onToggleChangeState(event: any, hotelId: number, id: number): void {

    let state!: IState | null
    
    if(event.checked){
      state = this.roomsStates.find(state => state.id === 'available') ?? null;
    } else { 
      state = this.roomsStates.find(state => state.id === 'unavailable') ?? null;
    }

    if(state) {
      this._updateRoomStatus(hotelId, id, state);
    }
  
  }

  goToCreateRoom(): void {
    this._router.navigate(['/agency/create-update-room']);
  }

  goToUpdateRoom(hotelId: number, id: number): void {
    this._router.navigate([`/agency/create-update-room/${hotelId}/${id}`]);
  }

  private _updateRoomStatus(hotelId: number, roomId: number, state: IState): void {
   
    this._roomService.updateRoomStatus(hotelId, roomId, state).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      if(res) {
        this._snackBarService.openSnackBar('Habitación actualizada', '✅')
      }else {
        this._snackBarService.openSnackBar('No se pudo actualizar la habitación', '⛔')
      }
    });
  }
}