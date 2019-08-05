import { MedicoPagePage } from './../medico-page/medico-page.page';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from './../../services/perfil/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.page.html',
  styleUrls: ['./detalle-paciente.page.scss'],
})
export class DetallePacientePage implements OnInit {

  public detalle = {
    Nombre: null,
    Apellido: null,
    fechaNacimiento: Date,
    iD: null,
    Cuota: null,
    tratamiento: null,
    medico: null,
    fechaCita: null,
    Citas: {Programadas: null, Historial: null}
  }
  public citas ={
    Programadas: null,
    Historial: null
  }

  public pacienteActual: any = {};

  constructor(
    private pacienteService: PacienteService, 
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router,
    ) { }

  ngOnInit() {

    const pacienteID: string = this.route.snapshot.paramMap.get('id');

    this.pacienteService.detallePaciente( pacienteID )
    .on( "value", snap => {
      this.pacienteActual = snap.val();
    });
    
    if (this.pacienteActual.Citas != null) {
      //Tiene Citas
      if(this.pacienteActual.Citas.Programadas != null){
       this.citas.Programadas = this.pacienteActual.Citas.Programadas;
       this.citas.Historial = this.pacienteActual.Citas.Historial;
      }else if(this.pacienteActual.Citas.Historial != null){
        this.citas.Historial = this.pacienteActual.Citas.Historial;
        this.citas.Programadas = this.pacienteActual.Citas.Programadas;
      }
    }
    
  }

  async editarPaciente(): Promise<void> {
    
    const alert = await this.alertCtrl.create({
      subHeader: 'Editar datos del paciente',
      inputs: [
        {
          type: 'text',
          name: 'nombrePaciente',
          placeholder: 'Nombre',
          value: this.pacienteActual.Nombre
        },
        {
          type: 'text',
          name: 'apellidoPaciente',
          placeholder: 'Apellido',
          value: this.pacienteActual.Apellido
        },
        {
          type: 'date',
          name: 'fechaNacimiento',
          placeholder: 'Fecha de nacimiento',
          value: this.pacienteActual.fechaNacimiento
        },
        {
          type: 'number',
          name: 'nID',
          placeholder: 'Identificación',
          value: this.pacienteActual.iD
        },
        {
          type: 'number',
          name: 'valorCuota',
          placeholder: 'Cuota',
          value: this.pacienteActual.Cuota
        },
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar Cambios',
          handler: data => {
          
          this.detalle.Nombre = data.nombrePaciente ;
          this.detalle.Apellido = data.apellidoPaciente;
          this.detalle.fechaNacimiento = data.fechaNacimiento;
          this.detalle.iD = data.nID;
          this.detalle.Cuota = data.valorCuota;
          this.detalle.tratamiento = this.pacienteActual.tratamiento;
          
          if (this.pacienteActual.medico == null) {
            this.detalle.medico = null;
          } else {
            this.detalle.medico = this.pacienteActual.medico;
          }

          if (this.pacienteActual.fechaCita == null) {
            this.detalle.fechaCita = null;
          } else {
            this.detalle.fechaCita = this.pacienteActual.fechaCita;
          }

          if (this.pacienteActual.Citas == null) {
            this.detalle.Citas = null;
          } else {
            this.detalle.Citas = this.pacienteActual.Citas;
          }
      
          if (data.nID != this.pacienteActual.iD) {
            this.pacienteService.crearPaciente( this.detalle );
            this.router.navigateByUrl('/detalle-paciente/' + this.detalle.iD);
            this.pacienteService.eliminarPaciente( this.pacienteActual );
          }
          else{
            var update = {};
            update[ '/ListaPacientes/' + this.pacienteActual.iD ] = this.detalle;
            this.pacienteService.editarPaciente( update );
          }
         
          
           
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarPaciente(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '¿Deseas eliminar este paciente?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'OK',
          handler: () => {         
            this.pacienteService.eliminarPaciente( this.pacienteActual )
            this.router.navigateByUrl('/paciente-page');       
          }
        }
      ]
    });
    await alert.present();
  }

  


}
