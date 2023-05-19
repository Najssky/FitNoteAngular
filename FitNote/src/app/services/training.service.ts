import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TRAINING_API = 'https://localhost:44369/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:44369/api/Training';
  postTraining(training: TrainingType): Observable<any> {
    return this.http.post(TRAINING_API + 'Training', training);
  }

  getTrainingByUserAndDate(userId: string, date: string) {
    const requestOptions = {
      params: new HttpParams().set('', userId).set('Training_date', date),
    };

    return this.http.get(
      'https://localhost:44369/api/Training/byUserIdAndDate/63f551c5-b58b-4ad4-8f73-67948a47d8bf?Training_date=2023-05-15'
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
