import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  getExercises() {
    return this.http.get<ExerciseType[]>(AUTH_API + 'Exercise');
  }
}
export type ExerciseType = {
  exercise_id: string;
  exercise_name: string;
};
