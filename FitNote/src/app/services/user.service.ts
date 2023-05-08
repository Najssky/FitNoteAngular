import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44369/api/Authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log(email, password);
    const login = this.http.post(AUTH_API + 'login', {
      email,
      password,
    });
  }

  register(
    email: string,
    password: string,
    name: string,
    lastname: string,
    phone_number: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        email,
        password,
        name,
        lastname,
        phone_number,
      },
      httpOptions
    );
  }
}
