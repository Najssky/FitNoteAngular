import { Component } from '@angular/core';

@Component({
  selector: 'app-unlogged-home',
  templateUrl: './unlogged-home.component.html',
  styleUrls: ['./unlogged-home.component.scss'],
})
export class UnloggedHomeComponent {
  showLogin: boolean = true;
  setLogin(): void {
    this.showLogin = true;
  }
  setRegister(): void {
    this.showLogin = false;
  }
}
