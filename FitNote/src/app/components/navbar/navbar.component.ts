import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  active = 1;
  userName = sessionStorage.getItem('name');
  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
