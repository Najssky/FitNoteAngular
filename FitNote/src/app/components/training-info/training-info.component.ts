import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ExerciseService,
  ExerciseType,
} from 'src/app/services/exercise.service';
import { IExerciseSet } from '../../services/training.service';
import { DialogData } from '../calendar/calendar.component';
import {
  TrainingService,
  TrainingType,
} from './../../services/training.service';

@Component({
  selector: 'app-training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.scss'],
})
export class TrainingInfoComponent implements OnInit {
  public isResponsive = false;
  public isEditing = false;
  public hasTraining = false;
  public trainingSubmited = false;
  public exercisesList: ExerciseType[] = [];
  public userTraining: Array<TrainingType> = [];
  public userTrainingDetails: any[] = [];
  public mappedTraining: any;
  public userId = sessionStorage.getItem('userId');
  public formTitle = 'Enter your workout details:';
  public exercises: Array<IExerciseSet> = [
    { Exercise: '', Reps: 0, Weight: 0 },
  ];
  constructor(
    public dialogRef: MatDialogRef<TrainingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _ts: TrainingService,
    private _es: ExerciseService
  ) {}
  ngOnInit() {
    this.getExercises();
    this.getTraining();
  }
  addNewExercise() {
    this.exercises.push({ Exercise: '', Reps: 0, Weight: 0 });
  }

  removeExercise(idx: number): void {
    this.exercises.splice(idx, 1);
  }
  onSubmit() {
    const postExercises = this.exercises
      .map((item: any) => ({
        Exercises: item.Exercise,
        Reps: item.Reps,
        Weight: item.Weight,
      }))
      .join(', ');
    this._ts.postTraining({
      training_details: JSON.stringify(this.exercises),
      training_user_id: this.userId,
      training_date: this.data.Date,
    });
    this.onNoClick();
  }
  onNoClick() {
    this.dialogRef.close();
  }
  getExercises() {
    this._es.getExercises().subscribe((res) => {
      this.exercisesList = res;
    });
  }
  getTraining() {
    this._ts
      .getTrainingByUserAndDate(this.userId, this.data.Date)
      .subscribe((res: any) => {
        this.userTraining = res;
        this.mappedTraining = this.userTraining.map((item: any) => ({
          training_id: item.training_id,
          training_details: item.training_details,
          training_user_id: item.training_user_id,
          training_date: item.training_date,
        }));
        this.mappedTraining.forEach((item: any) => {
          const parsedDetails = JSON.parse(item.training_details);
          this.userTrainingDetails.push(parsedDetails);
        });
      });
  }

  saveChanges() {
    const postExercises = this.exercises
      .map((item: any) => ({
        Exercises: item.Exercise,
        Reps: item.Reps,
        Weight: item.Weight,
      }))
      .join(', ');
    this._ts.putTraining(this.mappedTraining[0].training_id, {
      training_id: this.mappedTraining[0].training_id,
      training_details: JSON.stringify(this.userTrainingDetails[0]),
      training_user_id: this.mappedTraining[0].training_user_id,
      training_date: this.mappedTraining[0].training_date,
    });
    this.isEditing = false;
  }
}
