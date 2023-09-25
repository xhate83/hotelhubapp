import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { IHotel } from '../models/hotel.model';
import { DataBaseService } from '../core/data-base.service';
import { IState } from '../models/state.model';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private _authService: AuthService = inject(AuthService);
  private _dataBaseService: DataBaseService = inject(DataBaseService);
  private _hotels: BehaviorSubject<any> = new BehaviorSubject([]);
  private _hotelById: BehaviorSubject<any> = new BehaviorSubject(null);


  get hotels$(): Observable<IHotel[]>
  {
    return this._hotels.asObservable();
  }

  get hotelById$(): Observable<IHotel>
  {
    return this._hotelById.asObservable();
  }


  public cleanHotelById(): void {
    this._hotelById.next(null);
  }

  public createHotel(hotel: IHotel): Observable<boolean> {
    return this._dataBaseService.getData().pipe(
        mergeMap((data: IHotel[]) => {
            data.push(hotel);
            return this._dataBaseService.setData(data).pipe(
                map(() => {
                  this._hotels.next(data.filter(hotel => hotel.createdBy === this._authService.getUser()?.email));
                  return true
                }), 
                catchError(error => {
                    console.error("Error al guardar el hotel:", error);
                    return of(false);
                })
            );
        })
    );
    
  }

  public getAllHotels(): Observable<IHotel[]> {
    return this._dataBaseService.getData().pipe(
      tap((response: any) => {
          this._hotels.next(response);
      })
    );
  }

  public getHotelsByUser(): Observable<IHotel[]> {
    return this._dataBaseService.getData().pipe(
      tap((hotels: IHotel[]) => {
        this._hotels.next(hotels.filter(hotel => hotel.createdBy === this._authService.getUser()?.email))
      })
    );
  }

  public updateHotel(hotel: IHotel): Observable<boolean> {

    return this._dataBaseService.getData().pipe(
        mergeMap((data: IHotel[]) => {
            const hotelIndex = data.findIndex(h => h.id === hotel.id);
            if (hotelIndex > -1) {
                data[hotelIndex] = hotel;
            } else {
              console.error("Hotel no encontrado para actualizar.");
              return of(false);
            }

            return this._dataBaseService.setData(data).pipe(
                map(() => {
                  this._hotels.next(data.filter(hotel => hotel.createdBy === this._authService.getUser()?.email));
                  return true
                }),
                catchError(error => {
                    console.error("Error al actualizar el hotel:", error);
                    return of(false);
                })
            );
        })
    );
  }

  public updateHotelStatus(hotelId: number, newState: IState): Observable<boolean> {
    return this._dataBaseService.getData().pipe(
        mergeMap((data: IHotel[]) => {

            const hotelIndex = data.findIndex(h => h.id === hotelId);

            if (hotelIndex > -1) {
                data[hotelIndex].state = newState;
            } else {
                console.error("Hotel no encontrado para actualizar el estado.");
                return of(false); 
            }
            return this._dataBaseService.setData(data).pipe(
                map(() => {
                  this._hotels.next(data.filter(hotel => hotel.createdBy === this._authService.getUser()?.email));
                  return true
                }),
                catchError(error => {
                    console.error("Error al actualizar el estado del hotel:", error);
                    return of(false);
                })
            );
        })
    );
  }

  public getHotelById(hotelId: number): Observable<IHotel | null> {
    return this._dataBaseService.getData().pipe(
        map((data: IHotel[]) => {
            const hotel = data.find(h => h.id === hotelId);
            return hotel ?? null;
        }),
        tap((response) => {
          if(response) {
            this._hotelById.next(response);
          }
        }),
        catchError(error => {
            console.error("Error al obtener el hotel por ID:", error);
            return of(null);
        })
    );
  }
  
}
