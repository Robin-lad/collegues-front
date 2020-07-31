import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, interval, Subject } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

import { Collegue } from '../models/Collegue';
import { creationCol } from '../mock/collegue.mock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subjectColSelectionne = new Subject<Collegue>();

  constructor(private http: HttpClient) { }

  selectionner(colSelect: Collegue): void {
    this.subjectColSelectionne.next(colSelect);
  }

  sabonnerAColSelect(): Observable<Collegue> {
    return this.subjectColSelectionne.asObservable();
  }

  rechercherParNom(nom: string): Observable<string[]> {
    return this.http.get<string[]>(`https://robin-collegue-app.herokuapp.com/collegues?nom=${nom}`);
  }

  /*
  rechercherParNom(nom: string): string[] {
    let listTmp = [];

    if (creation().has(nom)) {
      listTmp.push(creation().get(nom));
    }

    if (nom === '') {
      listTmp = Array.from(creation().values());
    }

    return listTmp;
  }
*/
  recupererCollegueCourant(): Collegue {
    return creationCol();
  }

}
