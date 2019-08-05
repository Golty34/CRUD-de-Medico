import { MedicoService } from './../../services/perfil/medico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico-page',
  templateUrl: './medico-page.page.html',
  styleUrls: ['./medico-page.page.scss'],
})
export class MedicoPagePage implements OnInit {

  public listaMedicos: Array<any>;

  constructor( private medicoService: MedicoService,) { }

  ngOnInit() {
    this.medicoService
      .listaMedico()
        .on("value", listaSnap => {
          this.listaMedicos = [];
          listaSnap.forEach(snap => {
            this.listaMedicos.push({
              id: snap.child,
              cod: snap.val().iD 
            });
            return false;
          });
        });
  }

}
