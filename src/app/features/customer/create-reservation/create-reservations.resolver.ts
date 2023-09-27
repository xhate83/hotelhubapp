import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationService  } from '../../../services/reservation.service';
import { ResolveFn } from '@angular/router';

export const resolveGetAllReservations: ResolveFn<any> = (): Observable<any> => {
    const reservationService= inject(ReservationService);
    return reservationService.getAllReservations();
}

