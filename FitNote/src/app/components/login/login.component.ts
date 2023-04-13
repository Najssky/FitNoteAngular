import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //   providers: [
  //     {
  //       provide: NG_VALUE_ACCESSOR,
  //       useExisting: forwardRef(() => LoginComponent), // replace name as appropriate
  //       multi: true,
  //     },
  //   ],
})
export class LoginComponent implements OnInit {
  constructor(private Auth: AuthService) {}
  ngOnInit(): void {}
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  login() {
    this.Auth.login(this.email.value, this.password.value);
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
