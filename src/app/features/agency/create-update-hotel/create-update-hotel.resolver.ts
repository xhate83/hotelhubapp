import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HotelService } from '../../../services/hotel.service';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

export const resolveGetHotels: ResolveFn<any> = (): Observable<any> => {
    const hotelService= inject(HotelService)
    return hotelService.getAllHotels();
}

export const resolveGetHotelByID: ResolveFn<any> = (route: ActivatedRouteSnapshot): Observable<any> => {
    const hotelService= inject(HotelService);
    const id = route.paramMap.get('id');
    if(id) {
        return hotelService.getHotelById(parseInt(id))
    } else {
        return of(false)
    }
}