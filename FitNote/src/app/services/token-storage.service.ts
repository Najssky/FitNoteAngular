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
    // Check if the token exists and is not expired
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}

// const TOKEN_KEY = 'auth-token';
// const USER_KEY = 'auth-user';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenStorageService {
//   constructor() { }

//   signOut(): void {
//     window.sessionStorage.clear();
//   }

//   public saveToken(token: string): void {
//     window.sessionStorage.removeItem(TOKEN_KEY);
//     window.sessionStorage.setItem(TOKEN_KEY, token);
//   }

//   public getToken(): string | null {
//     return window.sessionStorage.getItem(TOKEN_KEY);
//   }

//   public saveUser(user: any): void {
//     window.sessionStorage.removeItem(USER_KEY);
//     window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
//   }

//   public getUser(): any {
//     const user = window.sessionStorage.getItem(USER_KEY);
//     if (user) {
//       return JSON.parse(user);
//     }

//     return {};
//   }
// }
