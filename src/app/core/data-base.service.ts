import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INITIAL_DATA } from '../core/master-data';
import { IHotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {


  public setInitialData(): Observable<boolean> {

    if(!localStorage.getItem('data')) {
      localStorage.setItem('data', JSON.stringify(INITIAL_DATA))
    }
    return of(true);
  }

  public getData(): Observable<IHotel[]> {

    return of(JSON.parse(localStorage.getItem('data') ?? '[]'));
  
  }

  public setData(data: IHotel[]): Observable<boolean> {

    localStorage.setItem('data', JSON.stringify(data));
    return of(true);
  
  }
  
}
