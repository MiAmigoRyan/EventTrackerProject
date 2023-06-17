import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  exerciseList: Exercise[] =[];
  newExercise: Exercise = new Exercise();
  selected: Exercise|null=null;
  isUpdatingExercise: Exercise|null=null;

  constructor(
    private exerciseService: ExerciseService
  ){}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(){
    this.exerciseService.index().subscribe({
      next: (exerciseList) => {
        this.exerciseList = exerciseList
      },
      error: (error) => {
        console.error('error loading exercise list'+ error)
      }
    })
  }

  createExercise(newExercise: Exercise){
    console.log(newExercise);
    this.exerciseService.add(newExercise).subscribe({
      next:(exercises)=>{
        this.loadExercises();
        this.newExercise = new Exercise;
      },
      error:(err)=>{
        console.error('exercise component.createExercise(): error creating'+err)
      }
    });
  }

  removeExercise(id: number){
    this.exerciseService.delete(id).subscribe({
      next:(exercise)=>{
        this.loadExercises();
      },
      error:(err)=>{
        console.error('exerciseComponent.removeExercise(): error removing exercise'+err)
      }
    })
  }

  setUpdateExercise(){
    this.isUpdatingExercise = Object.assign({}, this.selected);
  }

  displayTable(){
    this.selected=null;
  }

  displaySingleExercise(exercise: Exercise){
    this.selected = exercise;
  }

  updateExercise(exercise: Exercise, goToDetails:boolean=true){
    this.exerciseService.update(exercise).subscribe({
      next:(updatedExercise)=>{
        if(goToDetails){
          this.selected=updatedExercise;
        }
        this.isUpdatingExercise = null;
        this.loadExercises;
      },
      error:(err)=>{
        console.error('exerciseComponent.updateExercise() : error updating exercise'+ err)
      }
    })

  }
}
