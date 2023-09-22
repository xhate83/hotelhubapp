import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

    private _matSnackBar = inject(MatSnackBar);

    public openSnackBar(message: string, action: string) {
        this._matSnackBar.open(message, action, {
            duration: 4000, 
            verticalPosition: 'top', 
            horizontalPosition: 'center',
        });
    }

}