import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Collegue } from '../models/Collegue';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subjectColSelectionne = new Subject<Collegue>();

  constructor(private http: HttpClient) {
    console.log('test');
  }

  selectionner(mat: string): Observable<Collegue> {
    return this.collegueSelectionneInfo(mat).pipe(
      tap(col => this.subjectColSelectionne.next(col))
    );
  }

  sabonnerAColSelect(): Observable<Collegue> {
    return this.subjectColSelectionne.asObservable();
  }

  collegueSelectionneInfo(mat: string): Observable<Collegue> {
    return this.http.get<Collegue>(`https://robin-collegue-app.herokuapp.com/collegues/${mat}`);
  }

  rechercherParNom(nom: string): Observable<string[]> {
    return this.http.get<string[]>(`https://robin-collegue-app.herokuapp.com/collegues?nom=${nom}`);
  }


}
