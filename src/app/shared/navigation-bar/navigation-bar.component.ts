import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';4
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../core/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from '../utilities/snack-bak.service';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { ModeAppComponent } from '../../shared/mode-app/mode-app.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../utilities/confirmation/confirmation.component';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, SharedModule, MatDividerModule, ModeAppComponent],
})
export class NavigationBarComponent implements OnInit, OnDestroy {


  user: IUser | null = null;
  isLogged = false;
  private _matDialog = inject(MatDialog);
  private _authService = inject(AuthService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _snackBarService = inject(SnackBarService);
  private _router = inject(Router);

  ngOnInit(): void {
    this._authService.isLoggedIn()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(isLoggedIn => {
        this.isLogged = isLoggedIn;
        this.user = isLoggedIn ? this._authService.getUser() : null;
    }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goToHotels(): void {
    this._router.navigate(['/agency/list-hotels']);
  }

  goToReservations(): void {
    if(this.user?.type.id === 'agency') {
      this._router.navigate(['/agency/list-reservations']);
    } else if(this.user?.type.id === 'customer') {
      this._router.navigate(['/customer/list-reservations']);
    }
  }

  goToRooms(): void {
    if(this.user?.type.id === 'agency') {
      this._router.navigate(['/agency/list-rooms']);
    } else if(this.user?.type.id === 'customer') {
      this._router.navigate(['/customer/create-reservation']);
    }

  }

  logOut(): void{ 

    const dialog  = this._matDialog.open(ConfirmationComponent, {
      autoFocus: false,
      data: '¿Estas seguro que quieres salir de la app?'
   })

   dialog.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
    if (res) {
      this._authService.logout().pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this._snackBarService.openSnackBar('Salida satisfactoria', '✅');
          this._router.navigate(['/']);
        },
        error: () => {this._snackBarService.openSnackBar('No se pudo salir', '⛔')}
      })
    }
   })

  }
}