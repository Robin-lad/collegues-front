import { MatEtPhotos } from './../models/MatEtPhotos';
import { Collegue } from '../models/Collegue';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UpdateColEmailPhoto } from '../models/UpdateColEmailPhoto';
import { NewCollegue } from '../models/NewCollegue';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subjectColSelectionne = new Subject<Collegue>();

  constructor(private http: HttpClient) { }

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

  creationCollegue(newCollegue: NewCollegue): Observable<Collegue> {
    return this.http.post<Collegue>(`https://robin-collegue-app.herokuapp.com/collegues`, newCollegue, httpOptions);
  }

  updateCollegue(updateColValues: UpdateColEmailPhoto): Observable<void> {
    return this.http.patch<void>(`https://robin-collegue-app.herokuapp.com/collegues`, updateColValues, httpOptions);
  }

  addListPhotos(): Observable<MatEtPhotos[]> {
    return this.http.get<MatEtPhotos[]>(`https://robin-collegue-app.herokuapp.com/collegues/photos`);
  }
}
