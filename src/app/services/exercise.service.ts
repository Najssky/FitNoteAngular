import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';
import { AngularMaterialModule } from '../modules/angular-material.module';

const AUTH_API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(
    private http: HttpClient,
    private material: AngularMaterialModule
  ) {}
  public httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
  postExercise(exercise: any) {
    this.http
      .post(AUTH_API + 'Exercise', exercise, { headers: this.httpOptions })
      .subscribe(
        (response) => {
          this.material.showAlert('Training added successfully');
        },
        (error) => {
          this.material.showAlert('Something goes wrong! Error: ' + error);
        }
      );
  }
  getExercises() {
    return this.http.get<ExerciseType[]>(AUTH_API + 'Exercise');
  }
}
export type ExerciseType = {
  exercise_id: string;
  exercise_name: string;
};
