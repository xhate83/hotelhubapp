import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedInSubject.asObservable();

  constructor() { 
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      this._isLoggedInSubject.next(true)
    }
  }
  
  
  public login(user: IUser): Observable<any> {

    this._setSession({token: 'token_quemado'}, user)
    return of(true)
  }

  public logout(): Observable<any> {

    this._deleteSession()
    return of(true);

  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  public getUser(): IUser | null {

    const userString = localStorage.getItem('user');
    if(userString) {
      return JSON.parse(atob(userString)) as IUser;
    }
    return null
  }

  private _setSession(authResult: any, user: any) {
    localStorage.setItem('token', btoa(authResult.token));
    localStorage.setItem('user', btoa(JSON.stringify(user)));
    this._isLoggedInSubject.next(true);
  }

  private _deleteSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isLoggedInSubject.next(false);
  }
  
}
