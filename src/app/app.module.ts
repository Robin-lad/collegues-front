import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CollegueComponent, NgbdModalContentComponent } from './collegue/collegue.component';
import { RechercheCollegueParNomComponent } from './recherche-collegue-par-nom/recherche-collegue-par-nom.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GalerieComponent, ModalZoomPhotoComponent } from './galerie/galerie.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { AproposComponent } from './apropos/apropos.component';

const ROUTES: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'apropos', component: AproposComponent },
  { path: '', pathMatch: 'full', redirectTo: '/accueil' },
];

@NgModule({
  declarations: [
    AppComponent,
    CollegueComponent,
    RechercheCollegueParNomComponent,
    NgbdModalContentComponent,
    ModalZoomPhotoComponent,
    NavbarComponent,
    AccueilComponent,
    GalerieComponent,
    ScrollTopComponent,
    AproposComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
