import { MedicoService } from './../../services/perfil/medico.service';
import { Component, OnInit } from '@angular/core';
import { CitasService } from './../../services/citas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.page.html',
  styleUrls: ['./citas-medico.page.scss'],
})
export class CitasMedicoPage implements OnInit {

  public listaCitas: Array<any>;
  public medicoActual: any = {};

  constructor(
    private citasService: CitasService,
    private route: ActivatedRoute,
    private medicoService: MedicoService 
  ) { }

  ngOnInit() {
    const medicoID: string = this.route.snapshot.paramMap.get('id');

    this.citasService
      .listaCitasMedico( medicoID )
      .on( "value", snapList =>  {
        this.listaCitas = [];
        snapList.forEach(snap=>{
          this.listaCitas.push({
            citaID:snap.val().citaID,
            medicoID: snap.val().medicoID,
            fecha: snap.val().fechaCita,
            hora: snap.val().horaCita
          });
        });
      });
      
  }

}
