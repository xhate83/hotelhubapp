import { Component, OnDestroy, inject, OnInit, ViewChild  } from '@angular/core';
import { Subject, takeUntil  } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../shared/utilities/snack-bak.service';
import { STATES } from '../../../../core/master-data';
import { IRoom } from '../../../../models/room.model';
import { ReservationService } from '../../../../services/reservation.service';
import { IFilterRooms } from '../../../../models/filter-rooms';
import { IReservation } from '../../../../models/reservation.model';
import { ModalCreateReservationComponent } from '../modal-create-reservation/modal-create-reservation.component';
import { FilterRoomsComponent } from '../filter-rooms/filter-rooms.component';



@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
})
export class ListRoomsComponent implements OnDestroy, OnInit {

  @ViewChild(FilterRoomsComponent) filterRoomsComponent!: FilterRoomsComponent;
  private _snackBarService = inject(SnackBarService);
  private _matDialog = inject(MatDialog);
  private _reservationService = inject(ReservationService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  rooms: IRoom[] = [];
  allReservations: IReservation[] = [];
  roomsStates = [...STATES];
  initalDataReservation!: IFilterRooms | null;
  filterActive = false;
  isSaving = false;

  ngOnInit(): void {
      this._reservationService.reservations$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(reservations => {
        this.allReservations = reservations;
      })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onFilterChange(filterData: IFilterRooms) {
   
    this.initalDataReservation = {...filterData}
    this._getRoomsByFilter(filterData.ubicationIds, filterData.countGuest);
  }

  onFilterCleaned(e:boolean) {
    this.rooms = [];
    this.initalDataReservation = null;
    this.filterActive = false;
  }

  openModalCreateRervation(room: IRoom): void {
    const dialog = this._matDialog.open(ModalCreateReservationComponent, {
      autoFocus: false,
      data: {
        initalDataReservation: this.initalDataReservation,
        room: room,
        reservations: this.allReservations
      },
      maxHeight: '95vh',
      maxWidth: '95vw',
    });

    dialog.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe((reservation :IReservation) => {
      if (reservation) {
        this._reserveRoom(room,reservation);
      }
    })
  }

  private _getRoomsByFilter(ubicationIds: number[], capacity: number): void {
    this._reservationService.getAvailableRooms(ubicationIds, capacity).pipe(takeUntil(this._unsubscribeAll))
    .subscribe(rooms => {
      this.rooms = rooms;
      this.filterActive = true;
    })
  }

  private _reserveRoom(room: IRoom, reservation: IReservation ): void {
    this.isSaving = true;   
    this._reservationService.reserveRoom(room.hotelId, room.id, reservation).pipe(takeUntil(this._unsubscribeAll))
    .subscribe(res => {
      if(res) {
        this._snackBarService.openSnackBar('Reserva creada', '✅');
        this.filterRoomsComponent.clearFormFilter();
      }else {
        this._snackBarService.openSnackBar('No se pudo crear la reserva', '⛔');
      }
      this.isSaving = false;
    })
  }

}