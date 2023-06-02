import { Component, EventEmitter, Output } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private _ts: TrainingService) {}
  ngOnInit() {
    this.getTrainings();
  }
  @Output() eventData = new EventEmitter<any>();
  public isDarkmode: boolean = false;
  public userEmail = sessionStorage.getItem('email');
  public userName = sessionStorage.getItem('name');
  public userLastname = sessionStorage.getItem('lastname');
  public userId = sessionStorage.getItem('userId');
  public userTrainings = [];
  darkmodeHandle(data: any) {
    this.isDarkmode = data;
  }
  getTrainings() {
    this._ts.getTrainingByUser(this.userId).subscribe((res: any) => {
      this.userTrainings = res;
      console.log(this.userTrainings);
    });
  }
}
