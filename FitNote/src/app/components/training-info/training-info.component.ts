import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ExerciseService,
  ExerciseType,
} from 'src/app/services/exercise.service';
import { DialogData } from '../calendar/calendar.component';

@Component({
  selector: 'app-training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.scss'],
})
export class TrainingInfoComponent implements OnInit {
  public hasTraining = false;
  public trainingForm: FormGroup | any;
  public exercisesList: ExerciseType[] = [];
  public selectedExercise = '';
  constructor(
    public dialogRef: MatDialogRef<TrainingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private Exercise: ExerciseService
  ) {}
  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      exercises: this.formBuilder.array([this.createExcersiseFormGroup()]),
    });
    this.getExercises();
  }
  addExceriseFormGroup() {
    const exercises = this.trainingForm.get('exercises') as FormArray;
    exercises.push(this.createExcersiseFormGroup());
  }
  removeOrClearExcersise(i: number) {
    const exercises = this.trainingForm.get('exercises') as FormArray;
    if (exercises.length > 1) {
      exercises.removeAt(i);
    } else {
      exercises.reset();
    }
  }
  createExcersiseFormGroup() {
    return new FormGroup({
      Exercise: new FormControl(''),
      Reps: new FormControl(''),
      Weight: new FormControl(''),
    });
  }
  addTraining() {
    console.log(this.trainingForm.controls.exercises.controls);
    const mappedExercises = this.trainingForm.controls.exercises.controls.map(
      (item: any) => ({
        Exercises: item.controls.Exercise.value,
        Reps: item.controls.Reps.value,
        Weight: item.controls.Weight.value,
      })
    );
    console.log(mappedExercises);
  }
  onNoClick() {
    this.dialogRef.close();
    console.log(this.selectedExercise);
  }
  getExercises() {
    this.Exercise.getExercises().subscribe((res) => {
      this.exercisesList = res;
      console.log(this.exercisesList);
    });
  }
}
