import { CitasService } from './../../services/citas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historial-citas-m',
  templateUrl: './historial-citas-m.page.html',
  styleUrls: ['./historial-citas-m.page.scss'],
})
export class HistorialCitasMPage implements OnInit {

  public listaCitas: Array<any>;

  constructor(
    private citasService: CitasService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    const medicoID: string = this.route.snapshot.paramMap.get('id');
    this.citasService
      .listaHistorialMedico( medicoID )
      .on( "value", snapList =>  {
        this.listaCitas = [];
        snapList.forEach(snap=>{
          this.listaCitas.push({
            medicoID: snap.val().medicoID,
            citaID :snap.val().citaID,
            fecha: snap.val().fechaCita,
            hora: snap.val().horaCita
          });
        });
      });
  }

}
