import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { pairs } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  public dataBase: firebase.database.Reference;

  
  constructor( ) {

  }
 
  public crearPaciente( detalle ){
    
    this.dataBase = firebase.database().ref(`ListaPacientes`);
    return this.dataBase.child( detalle.iD ).set( detalle )
  }

  public listaPacientes(){
    
    this.dataBase = firebase.database().ref(`ListaPacientes`);
    return this.dataBase;
  }

  public detallePaciente( pacienteID ){
    
    this.dataBase = firebase.database().ref(`/ListaPacientes/`+ pacienteID);
    return this.dataBase;
  }

  public editarPaciente ( detalle ){
    
    this.dataBase = firebase.database().ref(`ListaPacientes`);
    return firebase.database().ref().update( detalle );
  }

  public eliminarPaciente ( detalle ){
    
    this.dataBase = firebase.database().ref(`ListaPacientes`);
    return this.dataBase.child( detalle.iD ).remove();
  }

  public crearCitaPaciente ( detalle ){
    this.dataBase = firebase.database().ref( `ListaPacientes/`+ detalle.pacienteID +`/Citas/Programadas`);
    return this.dataBase.child(detalle.citaID).set( detalle );
  }
}

