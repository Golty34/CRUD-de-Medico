import { MedicoService } from './../../services/perfil/medico.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.page.html',
  styleUrls: ['./crear-medico.page.scss'],
})
export class CrearMedicoPage implements OnInit {

  public detalle = {
    iD: null,
    Especialidad: null,
    Exp: null,
    Consultorio: null,
    Domicilio: null
  }

  constructor( private router: Router, private medicoService: MedicoService, public alertController: AlertController ) {}

  ngOnInit() {
  }

  crearMedico(){
    if( 
      this.detalle.iD == null || 
      this.detalle.Especialidad == null || 
      this.detalle.Exp == null ||
      this.detalle.Domicilio == null
    ){
      this.alertaCampos();
      console.log(this.detalle);
      return;
    }
    console.log(this.detalle);
    
    this.medicoService.crearMedico(this.detalle);
    this.router.navigateByUrl('/detalle-medico/'+ this.detalle.iD);
  }

  async alertaCampos() {
    const alert = await this.alertController.create({
      header: 'Falta algo!',
      subHeader: 'Todos los campos deben estar completos para registrar un medico',
      buttons: ['OK']
    });

    await alert.present();
  }

}
