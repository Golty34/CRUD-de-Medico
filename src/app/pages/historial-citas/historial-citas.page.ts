import { CitasService } from './../../services/citas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.page.html',
  styleUrls: ['./historial-citas.page.scss'],
})
export class HistorialCitasPage implements OnInit {

  public listaCitas: Array<any>;

  constructor( 
    private citasService: CitasService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {

    const pacienteID: string = this.route.snapshot.paramMap.get('id');
    
    this.citasService
      .listaHistorialPaciente( pacienteID )
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
