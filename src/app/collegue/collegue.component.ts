import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../models/Collegue';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css'],
  providers: [
    DataService
  ]
})
export class CollegueComponent implements OnInit {

  col: Collegue;
  textShow = true;
  newEmail: string;
  newImgUrl: string;

  constructor(private dataServ: DataService) { }

  ngOnInit(): void {
    this.col = this.dataServ.recupererCollegueCourant();
  }

  modif(): void {
    this.textShow = false;
  }

  tmpEmail(newEmail: HTMLInputElement): void {
    this.newEmail = newEmail.value;
  }

  tmpImgUrl(newImgUrl: HTMLInputElement): void {
    this.newImgUrl = newImgUrl.value;
  }

  valider(): void {
    if (this.newEmail !== undefined) {
      this.col.email = this.newEmail;
    }

    if (this.newImgUrl !== undefined) {
      this.col.photoUrl = this.newImgUrl;
    }
    this.textShow = true;
  }

  afficheConsoleCreer(): void {
    console.log('Création d\'un collegue');
  }
}
