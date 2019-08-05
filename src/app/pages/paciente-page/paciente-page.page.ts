import { Component, OnInit } from '@angular/core';
import { PacienteService } from './../../services/perfil/paciente.service';


@Component({
  selector: 'app-paciente-page',
  templateUrl: './paciente-page.page.html',
  styleUrls: ['./paciente-page.page.scss'],
})
export class PacientePagePage implements OnInit {

  public listaPacientes: Array<any>;

  constructor( private pacienteService: PacienteService ) { }

  ngOnInit() {

    this.pacienteService
      .listaPacientes()
      .on( "value", listaSnap =>{
        this.listaPacientes = [];
        listaSnap.forEach(snap => {
          this.listaPacientes.push({
            id: snap.child,
            nID: snap.val().iD,
            nombre: snap.val().Nombre,
            apellido: snap.val().Apellido
          });
          return false;
        });
      });
  }


}
