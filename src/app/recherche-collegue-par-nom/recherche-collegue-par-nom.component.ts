import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit {

  listRecherche: string[];

  constructor(private dataServ: DataService) { }

  ngOnInit(): void {
    this.listRecherche = [];
  }

  rechercher(nomRecherche: HTMLInputElement): void {
    this.dataServ.rechercherParNom(nomRecherche.value).subscribe(
      v => this.listRecherche = v,
      err => { },
      () => { }
    );
  }
}
