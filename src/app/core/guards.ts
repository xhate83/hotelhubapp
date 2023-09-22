import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const _authService: AuthService = inject(AuthService);
      const _router: Router = inject(Router);
      return _authService.isLoggedIn$.pipe(
        take(1),
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
      take(1),
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          _router.navigate(['/redirect']);
        }
      }),
      map((isLoggedIn) => !isLoggedIn)
   );
  };
}

export function userTypeGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const _authService: AuthService = inject(AuthService);
    const _router: Router = inject(Router);
    const requiredUserType = route.data["userType"];
    if (_authService.getUser()?.type.id !== requiredUserType) {
      _router.navigate(['/redirect']);
      return false;
    }

    return true;
  };
}
