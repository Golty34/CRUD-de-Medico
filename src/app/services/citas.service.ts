import { DetalleCitaPage } from './../pages/detalle-cita/detalle-cita.page';
import { CitasPacientePage } from './../pages/citas-paciente/citas-paciente.page';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  public citaPaciente: firebase.database.Reference;
  public citaMedico: firebase.database.Reference;

  constructor() { 
    
    
  }
  //---------
  public listaCitasPaciente( id ){
    this.citaPaciente = firebase.database().ref(`/ListaPacientes/`+ id + `/Citas/Programadas`);
    return this.citaPaciente;
  }

  public listaCitasMedico( id ){
    this.citaMedico = firebase.database().ref(`/ListaMedicos/`+ id + `/Citas/Programadas`);
    return this.citaMedico;
  }
  //---------
  public detalleCita(id, id2) {
    this.citaMedico = firebase.database().ref(`/ListaMedicos/`+ id+ `/Citas/Programadas`);
    return this.citaMedico.child(id2);
  }
  public detalleCitaH(id, id2) {
    this.citaMedico = firebase.database().ref(`/ListaMedicos/`+ id+ `/Citas/Historial`);
    return this.citaMedico.child(id2);
  }
  
  public listaHistorialPaciente(id) {
    this.citaPaciente = firebase.database().ref(`/ListaPacientes/`+ id + `/Citas/Historial`);
    return this.citaPaciente;
  }

  public listaHistorialMedico(id) {
    this.citaMedico = firebase.database().ref(`/ListaMedicos/`+ id + `/Citas/Historial`);
    return this.citaMedico;
  }

  public eliminarCita(detalle){
    this.citaPaciente = firebase.database().ref(`/ListaPacientes/`+ detalle.pacienteID + `/Citas/Programadas`);
    this.citaMedico = firebase.database().ref(`/ListaMedicos/`+ detalle.medicoID + `/Citas/Programadas`);
    return this.citaPaciente.child( detalle.citaID ).remove()
      .then(()=>{
        return this.citaMedico.child( detalle.citaID ).remove();
      });
  }

  //---
  public guardarImagen( imagen, detalleCita ){
    const storageRef = firebase
      .storage()
      .ref('/firmas/'+ detalleCita.pacienteID +'/'+detalleCita.citaID+'.png');

    const firmaP = firebase.database().ref(`/ListaPacientes/`+ detalleCita.pacienteID + `/Citas/Historial/`+ detalleCita.citaID);
    const firmaM = firebase.database().ref(`/ListaMedicos/`+ detalleCita.medicoID + `/Citas/Historial/`+ detalleCita.citaID);
    console.log(firmaP)
    
    return storageRef
      .putString( imagen, 'data_url',{
        contentType: 'image/png'
    })
    .then(() =>{
      return storageRef.getDownloadURL().then( url => {
        detalleCita.URL = url;
        return firmaP.set(detalleCita)
          .then(()=>{
            return firmaM.set(detalleCita)
          });
      });
    });
    
  }

  crearHistorial(detalleCita){
    const firmaP = firebase.database().ref(`/ListaPacientes/`+ detalleCita.pacienteID + `/Citas/Historial/`+ detalleCita.citaID);
    const firmaM = firebase.database().ref(`/ListaMedicos/`+ detalleCita.medicoID + `/Citas/Historial/`+ detalleCita.citaID);

    return firmaP.set(detalleCita)
          .then(()=>{
            return firmaM.set(detalleCita)
          });

  }
}
