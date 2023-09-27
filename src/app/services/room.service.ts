import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { IHotel } from '../models/hotel.model';
import { DataBaseService } from '../core/data-base.service';
import { IState } from '../models/state.model';
import { IRoom } from '../models/room.model';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private _authService: AuthService = inject(AuthService);
  private _dataBaseService: DataBaseService = inject(DataBaseService);
  private _rooms: BehaviorSubject<any> = new BehaviorSubject([]);
  private _roomById: BehaviorSubject<any> = new BehaviorSubject(null);


  get rooms$(): Observable<IRoom[]>
  {
    return this._rooms.asObservable();
  }

  get roomById$(): Observable<IRoom>
  {
    return this._roomById.asObservable();
  }

  public cleanRoomById(): void {
    this._roomById.next(null);
  }

  public createRoom(hotelId: number, newRoom: IRoom): Observable<boolean> {
    return this._dataBaseService.getData().pipe(
      mergeMap((data: IHotel[]) => {
        const hotel = data.find(h => h.id === hotelId);

        if (!hotel) {
            console.error("Hotel no encontrado con el ID:", hotelId);
            return of(false);
        }

        hotel.rooms = hotel.rooms || [];
        hotel.rooms.push(newRoom);

        return this._dataBaseService.setData(data).pipe(
          map(() => {
            const allRooms = data
              .filter(hotel => hotel.createdBy === this._authService.getUser()?.email)
              .flatMap(hotel => hotel.rooms || []);
              
            this._rooms.next(allRooms);
            return true;
          })
        );
      }),
      catchError(error => {
          console.error("Error al guardar la habitación:", error);
          return of(false);
      })
    );
  }

  public getAllRooms(): Observable<IRoom[]> {
    return this._dataBaseService.getData().pipe(
      map((hotels: IHotel[]) => {
        const allRooms = hotels.flatMap(hotel => hotel.rooms || []);
        this._rooms.next(allRooms);
        return allRooms;
      })
    );
}

  public getRoomsByUser(): Observable<IHotel[]> {
    return this._dataBaseService.getData().pipe(
      tap((hotels: IHotel[]) => {
        const userRooms = hotels
          .filter(hotel => hotel.createdBy === this._authService.getUser()?.email)
          .flatMap(hotel => hotel.rooms || []);
          
        this._rooms.next(userRooms);
      })
    );
  }

  public updateRoom(hotelId: number, updatedRoom: IRoom): Observable<boolean> {
    return this._dataBaseService.getData().pipe(
        mergeMap((data: IHotel[]) => {
            
            const existingHotel = data.find(hotel => 
                hotel.rooms?.some(room => room.id === updatedRoom.id)
            );

            if (existingHotel?.rooms) {
                const existingRoomIndex = existingHotel.rooms.findIndex(room => room.id === updatedRoom.id);
                if (existingHotel.id !== hotelId) {
                    existingHotel.rooms.splice(existingRoomIndex, 1);
                    const targetHotel = data.find(hotel => hotel.id === hotelId);
                    if (targetHotel) {
                        if (targetHotel.rooms) {
                            targetHotel.rooms.push(updatedRoom);
                        } else {
                            targetHotel.rooms = [updatedRoom];
                        }
                    }
                } else {
                    existingHotel.rooms[existingRoomIndex] = updatedRoom;
                }
            } else {
                console.error("Habitación no encontrada para actualizar.");
                return of(false);
            }

            return this._dataBaseService.setData(data).pipe(
                map(() => {
                  const userRooms = data
                    .filter(hotel => hotel.createdBy === this._authService.getUser()?.email)
                    .flatMap(hotel => hotel.rooms || []);
                  this._rooms.next(userRooms);
                  return true;
                }),
                catchError(error => {
                    console.error("Error al actualizar la habitación:", error);
                    return of(false);
                })
            );
        })
    );
  }


  public updateRoomStatus(hotelId: number, roomId: number, newState: IState): Observable<boolean> {
    return this._dataBaseService.getData().pipe(
        mergeMap((data: IHotel[]) => {
            const hotel = data.find(h => h.id === hotelId);
            const room = hotel?.rooms?.find(r => r.id === roomId);

            if (room) {
                room.state = newState;
            } else {
                console.error("Hotel o habitación no encontrados para actualizar el estado.");
                return of(false);
            }

            return this._dataBaseService.setData(data).pipe(
                map(() => {
                    const userRooms = data
                        .filter(hotel => hotel.createdBy === this._authService.getUser()?.email)
                        .flatMap(hotel => hotel.rooms || []);
                    this._rooms.next(userRooms);
                    return true;
                }),
                catchError(error => {
                    console.error("Error al actualizar el estado de la habitación:", error);
                    return of(false);
                })
            );
        })
    );
  }

  public getRoomById(hotelId: number, roomId: number): Observable<IRoom | null> {
    return this._dataBaseService.getData().pipe(
        map((data: IHotel[]) => {
            const hotel = data.find(h => h.id === hotelId);
            const room = hotel?.rooms?.find(r => r.id === roomId);
            return room ?? null;
        }),
        tap((response) => {
            if(response) {
                this._roomById.next(response);
            }
        }),
        catchError(error => {
            console.error("Error al obtener la habitación por ID:", error);
            return of(null);
        })
    );
  }
  
}
