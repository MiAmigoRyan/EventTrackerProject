import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://localhost:8086/';
  private url = this.baseUrl + 'api/exercises';

  constructor(private http: HttpClient) { }
}
