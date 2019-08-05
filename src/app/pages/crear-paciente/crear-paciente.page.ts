import { PacienteService } from './../../services/perfil/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.page.html',
  styleUrls: ['./crear-paciente.page.scss'],
})
export class CrearPacientePage implements OnInit {
  
  
  public detalle = {
    Nombre: null,
    Apellido: null,
    fechaNacimiento: Date,
    iD: null,
    Cuota: null,
    tratamiento: null,
    medico: null,
    fechaCita: null
  }
  
  constructor( private router: Router, private pacienteService: PacienteService,  public alertController: AlertController ) { }

  ngOnInit() {
    
  }

  crearPaciente(){
    this.detalle.tratamiento = "No";
    
    if( this.detalle.Nombre == null || 
        this.detalle.Apellido == null ||
        this.detalle.iD == null ||
        this.detalle.Cuota == null ||
        this.detalle.fechaNacimiento == Date
      ){

        this.alertaCampos();
        return
      }

    this.pacienteService.crearPaciente(this.detalle);
    this.router.navigateByUrl('/detalle-paciente/'+ this.detalle.iD);
  }

  async alertaCampos() {
    const alert = await this.alertController.create({
      header: 'Falta algo!',
      subHeader: 'Todos los campos deben estar completos para registrar un paciente',
      buttons: ['OK']
    });

    await alert.present();
  }
}
