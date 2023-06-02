import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private Auth: AuthService) {}
  hide = true;

  email = new FormControl<string | null>('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl<string | null>('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  login() {
    if (this.email.value && this.password.value) {
      this.Auth.login(this.email.value, this.password.value);
    } else {
      console.log('You must enter email and pasword');
    }
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.password.hasError('email') ? 'Not a valid password' : '';
  }
}
