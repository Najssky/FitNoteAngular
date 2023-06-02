import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddExerciseComponent>,
    private _es: ExerciseService
  ) {}
  public exerciseName: any;
  exercise = new FormControl<string | null>('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  onNoClick() {
    this.dialogRef.close();
  }
  submitExercise() {
    this._es.postExercise({ exercise_name: this.exerciseName });
    this.dialogRef.close();
  }
}
