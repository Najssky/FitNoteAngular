import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ExerciseService,
  ExerciseType,
} from 'src/app/services/exercise.service';
import { TrainingService } from 'src/app/services/training.service';
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
  public userTaining: any = [];
  public selectedExercises = this.exercisesList.map((_) => 0);
  constructor(
    public dialogRef: MatDialogRef<TrainingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private Exercise: ExerciseService,
    private Training: TrainingService
  ) {
    this.trainingForm = this.formBuilder.group({
      Exercises: this.formBuilder.array([]),
      Reps: ['', Validators.required],
      Weight: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getExercises();
    this.getTraining();
  }
  get ExerciseFields() {
    return this.trainingForm.get('Exercises') as FormArray;
  }

  addExercise(): void {
    const exerciseField = this.formBuilder.control('', Validators.required);
    this.ExerciseFields.push(exerciseField);
  }

  removeExercise(index: number): void {
    this.ExerciseFields.removeAt(index);
  }
  addTraining() {
    // const mappedExercises = this.trainingForm.controls.exercises.controls.map(
    //   (item: any) => ({
    //     Exercises: item.controls.Exercise.value,
    //     Reps: item.controls.Reps.value,
    //     Weight: item.controls.Weight.value,
    //   })
    // );
    // const training: TrainingType = {
    //   training_details: JSON.stringify(mappedExercises),
    //   training_user_id: '063b027c-fa72-43d4-aca1-10b8a2a05123',
    //   training_date: '2023-05-16',
    // };
    if (this.trainingForm.valid) {
      const mappedExercises = {
        Exercises: this.ExerciseFields.value,
        Reps: this.trainingForm.get('Reps').value,
        Weight: this.trainingForm.get('Weight').value,
      };
      let training = {
        training_details: JSON.stringify(mappedExercises),
        training_user_id: '063b027c-fa72-43d4-aca1-10b8a2a05123',
        training_date: '2023-05-16',
      };
      this.Training.postTraining(training).subscribe(
        (response) => {
          console.log('Success', response);
          // Tutaj możesz obsłużyć odpowiedź serwera
        },
        (error) => {
          console.error('Error', error);
          // Tutaj możesz obsłużyć błąd
        }
      );
    }
    console.log('dupa');
  }
  onNoClick() {
    this.dialogRef.close();
    console.log(this.selectedExercises);
  }
  getExercises() {
    this.Exercise.getExercises().subscribe((res) => {
      this.exercisesList = res;
      console.log(this.exercisesList);
    });
  }
  getTraining() {
    let id = '63f551c5-b58b-4ad4-8f73-67948a47d8bf';
    let date = '2023-05-15';
    this.Training.getTrainingByUserAndDate(id, date).subscribe((res) => {
      this.userTaining = res;
      console.log(this.userTaining);
      console.log(res);
    });
  }
}
