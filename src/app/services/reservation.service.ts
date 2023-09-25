import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { IHotel } from '../models/hotel.model';
import { DataBaseService } from '../core/data-base.service';
import { AuthService } from '../core/auth.service';
import { IReservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private _authService: AuthService = inject(AuthService);
  private _dataBaseService: DataBaseService = inject(DataBaseService);
  private _reservations: BehaviorSubject<any> = new BehaviorSubject([]);

  get reservations$(): Observable<IReservation[]>
  {
    return this._reservations.asObservable();
  }


  public reserveRoom(hotelId: number, roomId: number, reservation: IReservation): Observable<boolean> {
    return this._dataBaseService.getData().pipe(
      mergeMap((data: IHotel[]) => {
        const hotel = data.find(h => h.id === hotelId);

        if (hotel?.rooms) {
            const room = hotel.rooms.find(r => r.id === roomId);

            if (room) {
                if (!room.reservations) {
                    room.reservations = [];
                }
                room.reservations.push(reservation);

                return this._dataBaseService.setData(data).pipe(
                    map(() => {
                        const allReservations = data
                            .filter(hotel => hotel.createdBy === this._authService.getUser()?.email)
                            .flatMap(hotel => hotel.rooms)
                            .flatMap(room => room.reservations || []);

                        this._reservations.next(allReservations);
                        return true;
                    }),
                    catchError(error => {
                        console.error("Error al hacer la reserva:", error);
                        return of(false);
                    })
                );
            } else {
                console.error("Habitación no encontrada con el ID:", roomId);
                return of(false);
            }
        } else {
            console.error("Hotel no encontrado con el ID:", hotelId);
            return of(false);
        }
      })
    );
  }

  public getReservationsByAgency(): Observable<IReservation[]> {
    return this._dataBaseService.getData().pipe(
      map((hotels: IHotel[]) => {
        const filteredHotels = hotels.filter(hotel => hotel.createdBy === this._authService.getUser()?.email);
        return filteredHotels.flatMap(hotel => 
            hotel.rooms.flatMap(room => room.reservations ?? [])
        );
      }),
      tap((reservations: IReservation[]) => {
        this._reservations.next(reservations);
      }),
      catchError(error => {
        console.error("Error al obtener reservaciones por agencia:", error);
        return of([]);
      })
    );
  }

  public getReservationsByClient(): Observable<IReservation[]> {
    return this._dataBaseService.getData().pipe(
      map((hotels: IHotel[]) => {
        return hotels.flatMap(hotel => 
            hotel.rooms.flatMap(room => 
                (room.reservations ?? []).filter(reservation => reservation.createdBy === this._authService.getUser()?.email)
            )
        );
      }),
      tap((reservations: IReservation[]) => {
        this._reservations.next(reservations);
      }),
      catchError(error => {
        console.error("Error al obtener reservaciones por cliente:", error);
        return of([]);
      })
    );
  } 
  
}
