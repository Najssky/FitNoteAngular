import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = 'https://localhost:44369/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  getExercises() {
    console.log(AUTH_API + 'Exercise');
    return this.http.get<ExerciseType[]>(AUTH_API + 'Exercise');
  }
}
export type ExerciseType = {
  exercise_id: string;
  exercise_name: string;
};
