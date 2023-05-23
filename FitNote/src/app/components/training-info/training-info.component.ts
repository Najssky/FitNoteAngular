
import { TrainingService } from './../../services/training.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IExerciseSet } from '../../services/training.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../calendar/calendar.component';
import { ExerciseService, ExerciseType } from 'src/app/services/exercise.service';
    
    @Component({
      selector: 'app-training-info',
      templateUrl: './training-info.component.html',
      styleUrls: ['./training-info.component.scss']
    })
    export class TrainingInfoComponent implements OnInit {
      public isResponsive = false;
      public hasTraining = false;
      public exercisesList: ExerciseType[] = [];
      public userTraining: any;
      public formTitle = "Enter your workout details:";
      public exercises :Array<IExerciseSet>= [
        {Exercise: '', Reps:0, Weight:0}
      ];
      constructor(
        public dialogRef: MatDialogRef<TrainingInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _ts:TrainingService,
        private _es:ExerciseService
      ){}  
      ngOnInit() {
        this.getExercises()
        this.getTraining();
        
      }
      addNewExercise(){
        this.exercises.push({Exercise:'',Reps:0,Weight:0});  
      }
    
      removeExercise(idx:number):void{
        this.exercises.splice(idx,1);  
      }
      onSubmit(): void {
        const postExercises = this.exercises.map((item:any) => ({
          Exercises: item.Exercise,
          Reps: item.Reps,
          Weight: item.Weight
      })).join(', ')
        this._ts.postTraining({"training_details": JSON.stringify(this.exercises),
          "training_user_id": '7046dd17-0b7b-4db2-256d-08db59e269e4',
          "training_date": this.data.Date});
      }
    onNoClick() {
      this.dialogRef.close();

    }
    getExercises() {
      this._es.getExercises().subscribe((res) => {
        this.exercisesList = res;
        console.log(this.exercisesList);
      });

    }
    getTraining() {
      let id = '7046dd17-0b7b-4db2-256d-08db59e269e4';
      this._ts.getTrainingByUserAndDate(id, this.data.Date).subscribe((res: any) => {
        this.userTraining = res;
        console.log(this.userTraining.length)
      });
    }
  }