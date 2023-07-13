import { AuthStorageService } from './auth-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_URLS } from '../constants/api-url.const';
import { SkillProfileStorageService } from './skill-profile-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router, private httpClient: HttpClient, private authStorageService: AuthStorageService, private skillProfileStorage: SkillProfileStorageService) { }

  login(userName: any, password: any): Observable<any> {
    console.log(userName +':'+ password);

    const httpOptions = new HttpHeaders({
      authorization: 'Basic ' + btoa(userName +':'+ password)
    });

    return this.httpClient.post(AUTH_URLS.LOGIN, {}, {headers: httpOptions});
  }

  logout(): void {
    console.log('logout');
    const role: any = this.authStorageService.getRole();
    this.authStorageService.clear();

    console.log('Role: '+role);

    if(role === 'Admin') {
      this.skillProfileStorage.resetSkillProfiles();
    }
  }

  public isLoggedIn() {
    return this.authStorageService.getRole() && this.authStorageService.getToken();
  }

  public roleMatch(allowedRole: string): boolean {
    let isMatch = false;

    const role: any = this.authStorageService.getRole();

    if(role) {
      if(role === allowedRole) {
        isMatch = true;
    }
  }
  return isMatch;
 }
}
