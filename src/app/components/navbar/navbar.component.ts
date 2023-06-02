import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router, public dialog: MatDialog) {}
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
  openDialog(): void {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      minWidth: window.innerWidth <= 600 ? '100vw' : '40vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
