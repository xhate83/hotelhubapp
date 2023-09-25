import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomService  } from '../../../services/room.service';
import { ResolveFn } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';

export const resolveGetRoomsByUser: ResolveFn<any> = (): Observable<any> => {
    const roomService= inject(RoomService);
    return roomService.getRoomsByUser();
}

export const resolveGetHotelsByUser: ResolveFn<any> = (): Observable<any> => {
    const hotelService= inject(HotelService);
    return hotelService.getHotelsByUser();
}
