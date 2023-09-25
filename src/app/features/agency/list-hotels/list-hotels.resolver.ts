import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelService } from '../../../services/hotel.service';
import { ResolveFn } from '@angular/router';

export const resolveGetHotelsByUser: ResolveFn<any> = (): Observable<any> => {
    const hotelService= inject(HotelService);
    return hotelService.getHotelsByUser();
}
