import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { Subject, takeUntil  } from 'rxjs';
import { HotelService } from '../../../services/hotel.service';
import { IHotel } from '../../../models/hotel.model';
import { ReservationService } from '../../../services/reservation.service';
import { IReservation } from '../../../models/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDetailComponent } from '../../shared/reservation-detail/reservation-detail.component';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
})
export class ReservationsComponent implements OnDestroy, OnInit {

  private _matDialog: MatDialog = inject(MatDialog);
  private _reservatioService = inject(ReservationService);
  private _hotelService = inject(HotelService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  reservations: IReservation[] = [];
  hotels: IHotel[] = [];

  ngOnInit(): void {

    this._hotelService.hotels$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      hotels => {
        this.hotels = hotels;
      }
    )

    this._reservatioService.reservations$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      reservations => {
        this.reservations = reservations.map(reservation => {
          const hotel = this.hotels.find(hotel => hotel.id === reservation.hotelId) ?? null;
          if (hotel) {
            reservation.hotel = hotel;
            const room = hotel.rooms?.find(room => room.id === reservation.roomId) ?? null;
            if (room) {
              reservation.room = room;
              reservation.room.reservations = [];
            }
          }
          return reservation;
        }).sort((a, b) => {
          if (a.hotel?.name && b.hotel?.name) {
            if (a.hotel.name !== b.hotel.name) {
              return a.hotel.name.localeCompare(b.hotel.name);
            } else if (a.room?.id && b.room?.id) {
              return a.room.id - b.room.id;
            }
          }
          return 0;
        });
        this.reservations.map(reservation => { 
          if(reservation.hotel) {
            reservation.hotel.rooms = []}
          }
        );
      }
    )
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openReservationDetail(reservation: IReservation): void {
    this._matDialog.open(ReservationDetailComponent, {
      autoFocus: false,
      data: reservation
    })
  }

}