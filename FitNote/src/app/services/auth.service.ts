import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AngularMaterialModule } from '../modules/angular-material.module';
const AUTH_API = 'https://localhost:44369/api/Authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private material: AngularMaterialModule,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}
  public isLogged: any = true;
  login(email: string, password: string) {
    this.http
      .post(AUTH_API + 'login', {
        email,
        password,
      })
      .subscribe(
        (response: any) => {
          console.log('Response:', response);
          this.material.showAlert('Login successfully');
          sessionStorage.setItem('access_token', response.data.accessToken);
          console.log(response.data.accessToken);
          if (response.data.accessToken) {
            const decodedToken = this.jwtHelper.decodeToken(
              response.data.accessToken
            );
            console.log(decodedToken);
            sessionStorage.setItem('userId', decodedToken.User_id);
            sessionStorage.setItem('email', decodedToken.Email);
            sessionStorage.setItem('name', decodedToken.Name);
            sessionStorage.setItem('lastname', decodedToken.Lastname);
            sessionStorage.setItem('isLogged', this.isLogged);
            //{User_id: 'efd498a5-5625-4d3a-6dc8-08db50b9f449', Email: 'admin@fitnote.pl', Name: 'Admin', Lastname: 'Admin', Role: 'Admin', …}
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.error('Error:', error);
          this.material.showAlert('Something goes wrong! Error: ' + error);
        }
      );
  }

  register(
    email: string,
    password: string,
    name: any,
    lastname: any,
    phone_number: any
  ) {
    this.http
      .post(
        AUTH_API + 'register',
        {
          email,
          password,
          name,
          lastname,
          phone_number,
        },
        httpOptions
      )
      .subscribe(
        (response) => {
          console.log('Response:', response);
          this.material.showAlert(
            'Register successfully! You can sign in now.'
          );
        },
        (error) => {
          console.error('Error:', error);
          this.material.showAlert('Something goes wrong! Error: ' + error);
        }
      );
  }
}
