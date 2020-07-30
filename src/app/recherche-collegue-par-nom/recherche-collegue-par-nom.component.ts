import { Component, OnInit } from '@angular/core';
import { creation } from '../mock/matricule.mock';

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit {

  listRecherche: string[];
  fullList: Map<string, string>;

  constructor() { }

  ngOnInit(): void {
    this.fullList = creation();
    this.listRecherche = Array.from(this.fullList.values());
  }

  rechercher(nomRecherche: HTMLInputElement): void {
    if (this.fullList.has(nomRecherche.value)) {
      this.listRecherche = [];
      this.listRecherche.push(this.fullList.get(nomRecherche.value));
    }

    if (nomRecherche.value === '') {
      this.listRecherche = Array.from(this.fullList.values());
    }
  }
}
