import { Subscription } from 'rxjs';
import { MatEtPhotos } from './../models/MatEtPhotos';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from '../models/Collegue';

@Component({
  selector: 'app-modal-zoom-photo',
  template: `
  <div id="bodySansPadding" class="modal-body">
    <div *ngIf="col" class="card">
      <img id="imgPasTropGrande" class="card-img-top" src="{{col.photoUrl}}" alt="photo">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><span class="colgauche">Matricule </span> <br/> {{col.matricule}}</li>
        <li class="list-group-item"><span class="colgauche">Nom </span> <br/> {{col.nom}}</li>
        <li class="list-group-item"><span class="colgauche">Prénom </span> <br/> {{col.prenoms}}</li>
        <li class="list-group-item"><span class="colgauche">Date de Naissance </span> <br/> {{col.dateDeNaissance}}</li>
        <li class="list-group-item"><span class="colgauche">Email </span> <br/> {{col.email}} <span class="coldroite"><button id="btnCom" type="button" class="btn btn-primary"> Commentaires </button></span></li>
      </ul>
    </div>
  </div>
    `,
  styles: ['#bodySansPadding { padding: 0px; } #imgPasTropGrande { max-height: 34rem; } .colgauche { font-weight: bold; } .coldroite { float:right; } #btnCom { float: right; };']
})
export class ModalZoomPhotoComponent implements OnInit, OnDestroy {

  collegueSelectionne: Subscription;
  col: Collegue;

  constructor(public activeModal: NgbActiveModal, private dataServ: DataService) { }

  ngOnInit(): void {
    this.collegueSelectionne = this.dataServ.sabonnerAColSelect().subscribe(
      v => this.col = v,
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.collegueSelectionne.unsubscribe();
  }
}

@Component({
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit {

  listePhoto: MatEtPhotos[];

  constructor(private dataServ: DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dataServ.addListPhotos().subscribe(
      v => this.listePhoto = v,
      err => { },
      () => { }
    );
  }

  select2(mat: string): void {
    this.dataServ.selectionner(mat).subscribe(
      () => { },
      err => { }
    );

    const modalRef = this.modalService.open(ModalZoomPhotoComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'zoomPhoto';
  }
}
