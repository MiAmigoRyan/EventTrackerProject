import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
 url: string = environment.baseUrl + 'api/exercises'

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(this.url).pipe(
      catchError( (err:any) => {
        console.error('error fetching exercise list');
         return throwError(
          ()=>
           new Error('todoService.index(): error creating index'+ err )
        )
      })
    );
  }

  add(exercise: Exercise): Observable<Exercise>{
    return this.http.post<Exercise>(this.url, exercise).pipe(
      catchError((err:any)=>{
        console.log(err);
        return throwError(
          ()=> new Error("ExerciseService.add(): error adding Exercise"+err)
        )
      })
    )
  }

  delete(id: number): Observable<Exercise>{
    const deletePath = `${this.url}/${id}`;
    return this.http.delete<Exercise>(deletePath).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError(
          ()=> new Error('exerciseService.delete(): error deleting exercise'+err)
        )
      })
    )
  }

  update(exercise:Exercise): Observable<Exercise>{
    const updatePath = `${this.url}/${exercise.id}`;
    return this.http.put<Exercise>(updatePath, exercise).pipe(
      catchError((err:any)=>{
        return throwError(
          ()=> new Error('exerciseService.update(): error updating exercise'+err)
        )
      })
    )
  }
}
