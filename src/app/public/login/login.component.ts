import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, finalize  } from 'rxjs';
import { SnackBarService } from '../../shared/snack-bak.service';
import { IUser, IUserType } from '../../models/user.model';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { USER_TYPES } from '../../core/master-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _snackBarService = inject(SnackBarService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  userTypes = [...USER_TYPES];
  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    userType: [{}, Validators.required]
  });


  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const user: IUser = {
      ...this.loginForm.value,
    }
    this._authService.login(user).pipe(
      takeUntil(this._unsubscribeAll),
      finalize(() => {
        this.loginForm.enable();
      }))
    .subscribe({
      next: () => {
        this._snackBarService.openSnackBar('Ingreso satisfactorio', '✅');
        this.loginForm.disable();
        this._router.navigate(['/']);
      },
      error: () => {this._snackBarService.openSnackBar('No se pudo ingresar', '⛔')}
    })
   
  }
}
