import { HomeComponent } from './../views/home/home.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}
  public httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
  private apiUrl = 'https://localhost:44369/api/Training/';
  postTraining(training:TrainingType){
    console.log(training)
       this.http.post(this.apiUrl, training, { headers: this.httpOptions }).subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  getTrainingByUserAndDate(userId: string, date: string) {
     return this.http.get(this.apiUrl + "byUserIdAndDate/" + userId + "?Training_date=" + date
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
  training_user_id: string;
  training_date: string;
}
export interface IExerciseSet{
  Exercise: string;
  Reps: number;
  Weight: number;
};
