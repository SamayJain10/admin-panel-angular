import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let currentUser = null;
    try {
      if (isPlatformBrowser(this.platformId)) {
        const currentUserString = localStorage.getItem('currentUser');
        currentUser = currentUserString ? JSON.parse(currentUserString) : null;
      }
    } catch (e) {
      console.warn('Error accessing localStorage', e);
    }
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/login', { username, password })
      .pipe(map(user => {
        try {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        } catch (e) {
          console.warn('Error setting localStorage', e);
        }
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('currentUser');
      }
    } catch (e) {
      console.warn('Error removing from localStorage', e);
    }
    this.currentUserSubject.next(null);
  }

  register(user: any) {
    return this.http.post('/api/register', user);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
