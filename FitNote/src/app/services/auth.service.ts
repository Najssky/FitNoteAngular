import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environments.prod';
import { AngularMaterialModule } from '../modules/angular-material.module';
const AUTH_API = environment.apiUrl;

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
      .post(AUTH_API + 'Authentication/login', {
        email,
        password,
      })
      .subscribe(
        (response: any) => {
          this.material.showAlert('Login successfully');
          sessionStorage.setItem('access_token', response.data.accessToken);
          if (response.data.accessToken) {
            const decodedToken = this.jwtHelper.decodeToken(
              response.data.accessToken
            );
            sessionStorage.setItem('userId', decodedToken.User_id);
            sessionStorage.setItem('email', decodedToken.Email);
            sessionStorage.setItem('name', decodedToken.Name);
            sessionStorage.setItem('lastname', decodedToken.Lastname);
            sessionStorage.setItem('isLogged', this.isLogged);
            this.router.navigate(['home']);
          }
        },
        (error) => {
          const errorResponse = error.error;
          const startIndex = errorResponse.indexOf(':') + 1;
          const endIndex =
            errorResponse.indexOf(
              'at FitNote_API.Core.Repositories.AuthenticationRepository'
            ) - 1;
          const errorMessage = errorResponse
            .substring(startIndex, endIndex)
            .trim();
          this.material.showAlert('Something goes wrong! ' + errorMessage);
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
        AUTH_API + 'Authentication/register',
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
          this.material.showAlert(
            'Register successfully! You can sign in now.'
          );
        },
        (error) => {
          const errorResponse = error.error.title;
          this.material.showAlert('Something goes wrong! ' + errorResponse);
        }
      );
  }
}
