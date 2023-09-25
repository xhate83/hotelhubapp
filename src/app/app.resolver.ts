import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { DataBaseService } from './core/data-base.service';

export const resolveInitialData: ResolveFn<any> = (): Observable<any> => {
    const dataBaseService: DataBaseService = inject(DataBaseService);
    return dataBaseService.setInitialData();
}
