import { Component, inject, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    template: `
    <div class="flex items-center justify-center w-full h-full min-h-screen bg-gray-900">
    <div class="w-full flex flex-row items-center justify-center p-8">
        <div class="text-4xl text-white">
            Loading... 
        </div>
        <mat-spinner class="ml-4"></mat-spinner></div>
    </div>
    `,
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
})
export class UserRedirectComponent implements OnInit, OnDestroy {

    private _authService: AuthService = inject(AuthService);
    private _router: Router = inject(Router);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnInit() {
        this.redirectUser();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }

    redirectUser() {
        this._authService.isLoggedIn().pipe(takeUntil(this._unsubscribeAll))
        .subscribe(isLoggedIn => {
            if (!isLoggedIn) {
                this._router.navigate(['/login']);
                return;
            }
            const userType = this._authService.getUser()?.type.id;
            if (userType === 'agency') {
                this._router.navigate(['/agency']);
            } else if (userType === 'client') {
               this._router.navigate(['/client']);
            }
        });
    }
} 
   
