import { PacienteService } from './../../services/perfil/paciente.service';
import { Component, OnInit } from '@angular/core';
import { CitasService } from './../../services/citas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-citas-paciente',
  templateUrl: './citas-paciente.page.html',
  styleUrls: ['./citas-paciente.page.scss'],
})
export class CitasPacientePage implements OnInit {

  public listaCitas: Array<any>;
  public pacienteActual: any = {};
  
  constructor(
    private citasService: CitasService,
    private route: ActivatedRoute,
    private pacienteService: PacienteService 
  ) { }

  ngOnInit() {
    const pacienteID: string = this.route.snapshot.paramMap.get('id');
   
    this.citasService
      .listaCitasPaciente( pacienteID )
      .on( "value", listaSpanp =>{
        this.listaCitas = [];
        listaSpanp.forEach(snap =>{
          this.listaCitas.push({
            medicoID: snap.val().medicoID,
            citaID :snap.val().citaID,
            fecha: snap.val().fechaCita,
            hora: snap.val().horaCita,
          })
        });
      });
 
  }

}
