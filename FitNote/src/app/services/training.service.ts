import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = 'https://localhost:44369/api/Authentication/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  getTrainingByUserAndDate(userId: string, trainingDate: string) {
    console.log(userId, trainingDate);
    const getTraining = this.http.get(AUTH_API + 'Training', {
      //userId,
      //trainingDate,
    });
  }
}
