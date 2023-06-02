import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  @Output() eventData = new EventEmitter<any>();
  public isDarkmode: boolean = false;
  public userName = sessionStorage.getItem('name');
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  turnDarkmode() {
    if (this.isDarkmode === false) {
      this.isDarkmode = true;
    } else {
      this.isDarkmode = false;
    }
  }
  sendDataToHome() {
    this.turnDarkmode();
    this.eventData.emit(this.isDarkmode);
  }
}
