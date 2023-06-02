import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { environment } from 'src/environments/environments.prod';
const AUTH_API = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(
    private http: HttpClient,
    private material: AngularMaterialModule
  ) {}
  public httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
  postTraining(training: TrainingType) {
    console.log(training);
    this.http
      .post(AUTH_API + 'Training', training, { headers: this.httpOptions })
      .subscribe(
        (response) => {
          this.material.showAlert('Training added successfully');
        },
        (error) => {
          this.material.showAlert('Something goes wrong! Error: ' + error);
        }
      );
  }
  putTraining(trainingId: any, training: EditedTrainingType) {
    return this.http
      .put(AUTH_API + 'Training?Training_id=' + trainingId, training)
      .subscribe(
        (response) => {
          this.material.showAlert('Training edited successfully');
        },
        (error) => {
          this.material.showAlert('Something goes wrong! Error: ' + error);
        }
      );
  }
  getTrainingByUserAndDate(userId: any, date: string) {
    return this.http.get(
      AUTH_API + 'Training/byUserIdAndDate/' + userId + '?Training_date=' + date
    );
  }
}
export type TrainingDetailsType = {
  Exercise: string;
  Reps: string;
  Weight: string;
};
export interface TrainingType {
  training_details: string;
  training_user_id: any;
  training_date: string;
}
export interface EditedTrainingType {
  training_id: string;
  training_details: any;
  training_user_id: string;
  training_date: string;
}
export interface IExerciseSet {
  Exercise: string;
  Reps: number;
  Weight: number;
}
