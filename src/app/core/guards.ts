import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { tap } from "rxjs";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const _authService: AuthService = inject(AuthService);
      const _router: Router = inject(Router);
      return _authService.isLoggedIn$.pipe(
        tap((isLoggedIn) => {
          if (!isLoggedIn) {
            _router.navigate(['/login']);
          }
        })
      );
    };
}

export function notAuthenticationGuard(): CanActivateFn {
  return () => {
    const _authService: AuthService = inject(AuthService);
    const _router: Router = inject(Router);
    return _authService.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          _router.navigate(['/']);
        }
      })
    );
  };
}