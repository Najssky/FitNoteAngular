import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}


  isAuthenticated(): boolean {
    const token: any = sessionStorage.getItem('access_token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
