import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from '../models/Collegue';
import { NewCollegue } from '../models/NewCollegue';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { UpdateColEmailPhoto } from '../models/UpdateColEmailPhoto';

@Component({
  selector: 'app-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Création d'un Collègue</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form #etatForm="ngForm">
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" class="form-control" placeholder="Entrer un nom" #etatNom="ngModel" name="nom" [(ngModel)]="newCollegue.nom" required minlength="2">

          <div *ngIf="etatNom.invalid && (etatNom.dirty || etatNom.touched)" class="alert alert-danger">
            <div *ngIf="etatNom.errors.required"> Le nom est requis. </div>
            <div *ngIf="etatNom.errors.minlength"> Le nom doit posséder 2 caractères au minimum</div>
          </div>
        </div>

        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input type="text" class="form-control" placeholder="Entrer un prénom" #etatPrenom="ngModel" name="prenom" [(ngModel)]="newCollegue.prenoms" required minlength="2">

          <div *ngIf="etatPrenom.invalid && (etatPrenom.dirty || etatPrenom.touched)" class="alert alert-danger">
            <div *ngIf="etatPrenom.errors.required"> Le prénom est requis. </div>
            <div *ngIf="etatPrenom.errors.minlength"> Le prénom doit posséder 2 caractères au minimum</div>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" placeholder="Entrer un email" #etatEmail="ngModel" name="email" [(ngModel)]="newCollegue.email" required>
        </div>

        <div class="form-group">
          <label for="naissance">Date de naissance</label>
          <input type="date" class="form-control" placeholder="Entrer une date de naissance" #etatNaiss="ngModel" name="naissance" [(ngModel)]="newCollegue.dateDeNaissance" required>
        </div>

        <div class="form-group">
          <label for="url">PhotoUrl</label>
          <input type="text" class="form-control" placeholder="Entrer une url" #etatUrl="ngModel" name="url" [(ngModel)]="newCollegue.photoUrl" required minlength="7">

          <div *ngIf="etatUrl.invalid && (etatUrl.dirty || etatUrl.touched)" class="alert alert-danger">
            <div *ngIf="etatUrl.errors.required"> L'url est requise. </div>
            <div *ngIf="etatUrl.errors.minlength"> L'url doit posséder 7 caractères au minimum</div>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button *ngIf="etatForm.valid" type="button" ngbAutofocus class="btn btn-outline-dark" (click)="creerCollegue();">Créer</button>
    </div>
  `,
  styles: ['.alert-danger { margin-top: 6px; padding-top: 6px; padding-bottom: 6px; padding-left: 12px; padding-right:12px}']
})
export class NgbdModalContentComponent implements OnInit {

  newCollegue: NewCollegue;

  ngOnInit(): void {
    this.newCollegue = {};
  }

  constructor(public activeModal: NgbActiveModal, private dataServ: DataService) { }

  creerCollegue(): void {
    this.dataServ.creationCollegue(this.newCollegue).subscribe(
      err => { },
      () => { }
    );
  }
}

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css'],
  providers: []
})
export class CollegueComponent implements OnInit, OnDestroy {

  collegueSelectionne: Subscription;

  col: Collegue;
  textShow = true;
  newEmail: string;
  newImgUrl: string;

  newValues: UpdateColEmailPhoto = {};

  constructor(private dataServ: DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.collegueSelectionne = this.dataServ.sabonnerAColSelect().subscribe(
      v => this.col = v,
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.collegueSelectionne.unsubscribe();
  }

  open(): void {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.name = 'CreationCollegue';
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

  updateCol(): void {
    this.newValues.matricule = this.col.matricule;
    this.newValues.email = this.col.email;
    this.newValues.photoUrl = this.col.photoUrl;

    this.dataServ.updateCollegue(this.newValues).subscribe(
      err => { },
      () => { }
    );
  }

  valider(): void {
    if (this.newEmail !== undefined) {
      this.col.email = this.newEmail;
    }

    if (this.newImgUrl !== undefined) {
      this.col.photoUrl = this.newImgUrl;
    }

    this.updateCol();

    this.textShow = true;
  }
}
