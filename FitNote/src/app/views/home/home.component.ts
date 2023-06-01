import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Output() eventData = new EventEmitter<any>();
  public isDarkmode: boolean = false;

  darkmodeHandle(data: any) {
    this.isDarkmode = data;
  }
}
