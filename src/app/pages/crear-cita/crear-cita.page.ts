import { Component, OnInit } from '@angular/core';
import { MedicoService } from './../../services/perfil/medico.service';
import { PacienteService } from './../../services/perfil/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {

  public listaMedicos: Array<any>;
  public pacienteActual: any = {};
  public medicoActual: any = {};
  public medicoID:any;

  public detallePaciente = {
    Nombre: null,
    Apellido: null,
    fechaNacimiento: Date,
    iD: null,
    Cuota: null,
    tratamiento: null,
    medico: null,
    fechaCita: null,
    Citas: null
  }

  public detalleMedico = {
    iD: null,
    Especialidad: null,
    Exp: null,
    Consultorio: null,
    Domicilio: null,
    Citas: null
  }

  public detalleCita = {
    citaID: Date.now(),
    pacienteID: null,
    nombrePaciente: null,
    medicoID: null,
    Consultorio:null,
    fechaCita: null,
    horaCita: null
  }

  constructor( 
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

    const pacienteID: string = this.route.snapshot.paramMap.get('id');
    
    this.pacienteService.detallePaciente( pacienteID )
    .on( "value", snap => {
      this.pacienteActual = snap.val();
    });
    
    this.medicoService
      .listaMedico()
        .on("value", listaSnap => {
          this.listaMedicos = [];
          listaSnap.forEach(snap => {
            this.listaMedicos.push({
              medicoID:snap.val().iD, 
            });
            return false;
          });
        });
    
  }

  crearCita(){

    if ( 
      this.detallePaciente.medico == null ||
      this.detallePaciente.fechaCita == Date ||
      this.detalleCita.horaCita == Date
    ) {
      this.alertaCampos();
      return;
    }

    this.detallePaciente.fechaCita = formatDate( this.detallePaciente.fechaCita, 'yyyy/MM/dd','en' );
    this.detalleCita.horaCita = formatDate( this.detalleCita.horaCita , 'hh:mm', 'en' );
    //ACTUALIZA DATOS DEL PACIENTE
    this.detallePaciente.Nombre = this.pacienteActual.Nombre;
    this.detallePaciente.Apellido = this.pacienteActual.Apellido;
    this.detallePaciente.fechaNacimiento = this.pacienteActual.fechaNacimiento;
    this.detallePaciente.iD = this.pacienteActual.iD;
    this.detallePaciente.Cuota = this.pacienteActual.Cuota;
    this.detallePaciente.tratamiento = "Si";
    if( this.pacienteActual.Citas == null ){
      this.detallePaciente.Citas = null
    }
    else{
      this.detallePaciente.Citas = this.pacienteActual.Citas;
    }

    this.confirmar();

  }


  async confirmar(): Promise<void>{
    const alert = await this.alertCtrl.create({
      header: '¿Programar Cita?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar',
          handler: () => {
                
          var update = {};
          update[ '/ListaPacientes/' + this.pacienteActual.iD ] = this.detallePaciente;
          this.pacienteService.editarPaciente( update );

             //ACTUALIZA DATOS DEL MEDICO
            this.medicoService.detalleMedico( this.detallePaciente.medico )
              .on( "value", snap => {
              this.medicoActual = snap.val();
            });
            
            this.detalleMedico.iD = this.medicoActual.iD;
            this.detalleMedico.Especialidad = this.medicoActual.Especialidad;
            this.detalleMedico.Exp = this.medicoActual.Exp;
            this.detalleMedico.Consultorio = this.medicoActual.Consultorio;
            this.detalleMedico.Domicilio = this.medicoActual.Domicilio;

            if ( this.medicoActual.Citas == null ) {
              this.detalleMedico.Citas = null
            } else {
              this.detalleMedico.Citas = this.medicoActual.Citas;
            }

            var updateM = {};
            updateM[ '/ListaMedicos/' + this.medicoActual.iD ] = this.detalleMedico;
            this.medicoService.editarMedico( updateM );

            //CREA LA NUEVA CITA
            this.detalleCita.citaID = Date.now();
            this.detalleCita.pacienteID = this.pacienteActual.iD;
            this.detalleCita.medicoID = this.pacienteActual.medico;
            this.detalleCita.fechaCita = this.detallePaciente.fechaCita;
            this.detalleCita.nombrePaciente = this.pacienteActual.Nombre + ' ' + this.pacienteActual.Apellido;
            this.detalleCita.Consultorio = this.medicoActual.Consultorio;

            this.pacienteService.crearCitaPaciente( this.detalleCita );
            this.medicoService.crearCitaMedico( this.detalleCita )
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  async alertaCampos() {
    const alert = await this.alertCtrl.create({
      header: 'Falta algo!',
      subHeader: 'Todos los campos deben estar completos para registrar una cita nueva',
      buttons: ['OK']
    });

    await alert.present();
  }

}
