import { Injectable } from '@angular/core';

const AUTH_TOKEN = 'auth-token';
const AUTH_USER = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor() { }

  public setToken(jwtToken: string) {
    window.sessionStorage.removeItem(AUTH_TOKEN);
    window.sessionStorage.setItem(AUTH_TOKEN, jwtToken);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(AUTH_TOKEN);
  }

  public setAuthenticatedUser(user: any) {
    window.sessionStorage.removeItem(AUTH_USER);
    window.sessionStorage.setItem(AUTH_USER, JSON.stringify(user));
  }

  public getAuthenticatedUser(): any {
    const user = window.sessionStorage.getItem(AUTH_USER);
    if(user) {
      return JSON.parse(user);
    }
    return {}
  }

  public getRole(): string {
    const user = window.sessionStorage.getItem(AUTH_USER);
    if(user) {
      return JSON.parse(user).userRole;
    }
    return '';
  }

  public isLoggedIn() {
    return this.getToken();
  }

  public clear() {
    window.sessionStorage.clear();
  }
}
