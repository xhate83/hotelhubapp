import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';4
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/core/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from '../utilities/snack-bak.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { ModeAppComponent } from 'src/app/shared/mode-app/mode-app.component';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, SharedModule, MatMenuModule, MatDividerModule, ModeAppComponent],
})
export class NavigationBarComponent implements OnInit, OnDestroy {


  user: IUser | null = null;
  isLogged = false;
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
    if(this.user?.type.id === 'agency') {
      this._router.navigate(['/agency/list-hotels']);
    } else if(this.user?.type.id === 'client') {
      this._router.navigate(['/client/list-hotels']);
    }
  }

  goToReservations(): void {
    if(this.user?.type.id === 'agency') {
      this._router.navigate(['/agency/resevations']);
    } else if(this.user?.type.id === 'client') {
      this._router.navigate(['/client/resevations']);
    }
  }

  goToRooms(): void {
    this._router.navigate(['/agency/list-rooms']);
  }

  logOut(): void{ 
    this._authService.logout().pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: () => {
        this._snackBarService.openSnackBar('Salida satisfactoria', '✅');
        this._router.navigate(['/']);
      },
      error: () => {this._snackBarService.openSnackBar('No se pudo salir', '⛔')}
    })
  }
    
}