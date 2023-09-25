import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationService  } from '../../../services/reservation.service';
import { ResolveFn } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';


export const resolveGetReservationsByAgency: ResolveFn<any> = (): Observable<any> => {
    const reservationService= inject(ReservationService);
    return reservationService.getReservationsByAgency();
}

export const resolveGetHotels: ResolveFn<any> = (): Observable<any> => {
    const hotelService= inject(HotelService)
    return hotelService.getHotelsByUser();   
}
