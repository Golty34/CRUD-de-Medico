import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public dataBase: firebase.database.Reference;

  constructor() {
    this.dataBase = firebase.database().ref(`ListaMedicos`);
   }

   public crearMedico( detalle ){
    this.dataBase = firebase.database().ref(`ListaMedicos`);
    return this.dataBase.child( detalle.iD ).set( detalle )
  }

  public listaMedico(){
    this.dataBase = firebase.database().ref(`ListaMedicos`);
    return this.dataBase;
  }

  public detalleMedico( medicoID ){
    this.dataBase = firebase.database().ref(`/ListaMedicos/`+ medicoID);
    return this.dataBase;
  }

  public editarMedico ( detalle ){
    this.dataBase = firebase.database().ref(`/ListaMedicos`);
    return firebase.database().ref().update( detalle );
  }

  public eliminarMedico ( detalle ){
    this.dataBase = firebase.database().ref(`ListaMedicos`);
    return this.dataBase.child( detalle.iD ).remove();
  }

  public crearCitaMedico ( detalle ){
    this.dataBase = firebase.database().ref( `ListaMedicos/`+ detalle.medicoID +`/Citas/Programadas`);
    return this.dataBase.child(detalle.citaID).set( detalle );
  }

}
