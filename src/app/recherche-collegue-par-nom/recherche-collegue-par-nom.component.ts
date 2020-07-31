import { Component, OnInit } from '@angular/core';
import { Collegue } from '../models/Collegue';
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
    if (nomRecherche.value !== '') {
      this.dataServ.rechercherParNom(nomRecherche.value).subscribe(
        v => this.listRecherche = v,
        err => { },
        () => { }
      );
    }
  }

  select(matricule: string): void {

    /*
    const collegue: Collegue = {
      matricule: '17471658426595',
      nom: 'Chat',
      prenoms: 'Tropchou',
      email: 'chat@email.com',
      dateDeNaissance: new Date('2015-05-08'),
      photoUrl: './assets/chat-trop-chou.jpg'
    };*/
    this.dataServ.selectionner(matricule).subscribe(
      () => { },
      err => { }
    );
  }
}
