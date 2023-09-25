import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { Subject, takeUntil  } from 'rxjs';
import { SnackBarService } from '../../../shared/utilities/snack-bak.service';
import { STATES } from '../../../core/master-data';
import { IHotel } from '../../../models/hotel.model';
import { HotelService } from '../../../services/hotel.service';
import { IState } from '../../../models/state.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
})
export class ListHotelsComponent implements OnDestroy, OnInit {

  private _router = inject(Router);
  private _snackBarService = inject(SnackBarService);
  private _hotelService = inject(HotelService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  hotels: IHotel[] = [];
  hotelStates = [...STATES];

  ngOnInit(): void {

    this._hotelService.hotels$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      hotels => {
        this.hotels = hotels;
      }
    )

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onToggleChangeState(event: any, hotelId: number): void {

    let state!: IState | null
    
    if(event.checked){
      state = this.hotelStates.find(state => state.id === 'available') ?? null;
    } else { 
      state = this.hotelStates.find(state => state.id === 'unavailable') ?? null;
    }

    if(state) {
      this._updateHotelStatus(hotelId, state);
    }
  
  }

  goToCreateHotel(): void {
    this._router.navigate(['/agency/create-update-hotel']);
  }

  goToUpdateHotel(id: number): void {
    this._router.navigate(['/agency/create-update-hotel/' + id]);
  }

  private _updateHotelStatus(hotelId: number, state: IState): void {
   
    this._hotelService.updateHotelStatus(hotelId, state).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      if(res) {
        this._snackBarService.openSnackBar('Hotel actualizado', '✅')
      }else {
        this._snackBarService.openSnackBar('No se pudo actualizar el hotel', '⛔')
      }
    });
  }
}