import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private Auth: AuthService) {}
  hide = true;

  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  name = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  lastname = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  number = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
  ]);
  register() {
    if (this.email.value && this.password.value) {
      this.Auth.register(
        this.email.value,
        this.password.value,
        this.name.value,
        this.lastname.value,
        this.number.value
      );
    }
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Enter a password';
    }

    return this.password.hasError('email') ? 'Not a valid password' : '';
  }
  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Enter a name';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }
  getLastnameErrorMessage() {
    if (this.lastname.hasError('required')) {
      return 'Enter a lastname';
    }

    return this.lastname.hasError('lastname') ? 'Not a valid lastname' : '';
  }
  getNumberErrorMessage() {
    if (this.number.hasError('required')) {
      return 'Enter a phone number';
    }

    return this.number.hasError('number') ? 'Not a valid phone number' : '';
  }
}
