import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoomService } from '../../../services/room.service';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';

export const resolveGetRooms: ResolveFn<any> = (): Observable<any> => {
    const roomService= inject(RoomService)
    return roomService.getAllRooms();
}

export const resolveGetHotels: ResolveFn<any> = (): Observable<any> => {
    const hotelService= inject(HotelService)
    return hotelService.getHotelsByUser();   
}

export const resolveGetRoomByID: ResolveFn<any> = (route: ActivatedRouteSnapshot): Observable<any> => {
    const roomService= inject(RoomService)
    const hotelId = route.paramMap.get('hotelId');
    const roomId = route.paramMap.get('id');
    if(hotelId && roomId) {
        return roomService.getRoomById(parseInt(hotelId), parseInt(roomId))
    } else {
        return of(false)
    }
}