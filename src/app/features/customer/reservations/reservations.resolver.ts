import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationService  } from '../../../services/reservation.service';
import { ResolveFn } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';


export const resolveGetReservationsByCustomer: ResolveFn<any> = (): Observable<any> => {
    const reservationService= inject(ReservationService);
    return reservationService.getReservationsByCustomer();
}

export const resolveGetAllHotels: ResolveFn<any> = (): Observable<any> => {
    const hotelService= inject(HotelService)
    return hotelService.getAllHotels();   
}
