import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from '../models/Collegue';

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css']
})
export class CollegueComponent implements OnInit {

  @Input()
  col: Collegue;
  textShow = true;
  newEmail: string;
  newImgUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

  modif(): void {
    this.textShow = false;
    console.log('Modification du collegue');
  }

  tmpEmail(newEmail: HTMLInputElement): void {
    this.newEmail = newEmail.value;
  }

  tmpImgUrl(newImgUrl: HTMLInputElement): void {
    this.newImgUrl = newImgUrl.value;
  }

  valider(): void {
    console.log(this.newEmail);
    if (this.newEmail !== undefined) {
      this.col.email = this.newEmail;
    }

    if (this.newImgUrl !== undefined) {
      this.col.photoUrl = this.newImgUrl;
    }
    console.log('Validation modif du collegue');
    this.textShow = true;
  }

  afficheConsoleCreer(): void {
    console.log('Création d\'un collegue');
  }
}