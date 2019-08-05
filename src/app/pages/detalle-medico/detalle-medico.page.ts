import { MedicoService } from './../../services/perfil/medico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-medico',
  templateUrl: './detalle-medico.page.html',
  styleUrls: ['./detalle-medico.page.scss'],
})
export class DetalleMedicoPage implements OnInit {

 
  public detalle = {
    iD: null,
    Especialidad: null,
    Exp: null,
    Consultorio: null,
    Domicilio: null,
    Citas: null
  }
  public citas ={
    Programadas: null,
    Historial: null
  }

  public detalleCita = {
    citaID: Date.now(),
    pacienteID: null,
    nombrePaciente: null,
    medicoID: null,
    Consultorio:null,
    fechaCita: Date,
    horaCita: Date,
    registro:null,
    URL:null
  }
  
  public medicoActual: any = {};

  constructor( 
    private medicoService: MedicoService, 
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router 
    ) {}

  ngOnInit() {

   const medicoID: string = this.route.snapshot.paramMap.get('id');

   this.medicoService.detalleMedico( medicoID )
    .on( "value", snap => {
      this.medicoActual = snap.val();
    });
 
    if (this.medicoActual.Citas != null) {
      //Tiene Citas
      if(this.medicoActual.Citas.Programadas != null){
       this.citas.Programadas = this.medicoActual.Citas.Programadas;
       this.citas.Historial = this.medicoActual.Citas.Historial;
      }else if(this.medicoActual.Citas.Historial != null){
        this.citas.Historial = this.medicoActual.Citas.Historial;
        this.citas.Programadas = this.medicoActual.Citas.Programadas;
      }
    }

  }

  async editarMedico(): Promise<void>{
    const alert = await this.alertCtrl.create({
      subHeader: 'Editar datos del Medico',
      inputs:[
        {
          type: 'number',
          name: 'cod',
          placeholder: 'Codigo Tarjeta Profesional',
          value: this.medicoActual.iD
        },
        {
          type: 'text',
          name: 'especialidad',
          placeholder: 'Especialidad',
          value: this.medicoActual.Especialidad
        },
        {
          type: 'number',
          name: 'exp',
          placeholder: 'Años de experiencia',
          value: this.medicoActual.Exp
        },
        {
          type: 'text',
          name: 'consultorio',
          placeholder: 'Consultorio',
          value: this.medicoActual.Consultorio
        },

        {
          type: 'text',
          name: 'domicilio',
          placeholder: '¿Atiende a domicilio?',
          value: this.medicoActual.Domicilio
        },
      ],

      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Guardar Cambios',
          handler: data => {
           
          this.detalle.iD = data.cod;
          this.detalle.Especialidad = data.especialidad;
          this.detalle.Exp =  data.exp;
          this.detalle.Consultorio = data.consultorio;
          this.detalle.Domicilio = data.domicilio;
          
          if ( this.medicoActual.Citas == null ) {
            this.detalle.Citas = null;
          }else{
            this.detalle.Citas = this.medicoActual.Citas;
          }

           if ( data.cod != this.medicoActual.iD ) {
            this.medicoService.crearMedico( this.detalle );
            this.router.navigateByUrl('/detalle-medico/'+ this.detalle.iD );

            this.medicoService.eliminarMedico( this.medicoActual );
            
          }   
          else{
            var update = {};
            update['/ListaMedicos/' + this.medicoActual.iD] = this.detalle;
            this.medicoService.editarMedico( update );
          }
             
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarMedico(): Promise<void> {
    if (this.medicoActual.Citas != null) {
      if ( this.medicoActual.Citas.Programadas != null ) {
        const alert = await this.alertCtrl.create({
          header: 'No puedes eliminar este medico!!!!',
          subHeader:'Este medico tiene citas programadas',
          buttons: [
          { text: 'Cancelar' },
          ]
        });await alert.present();

      }else if( this.medicoActual.Citas.Historial != null  ){
        
        const alert = await this.alertCtrl.create({
          header: '¿Deseas eliminar este medico?',
          subHeader:'Su HISTORIAL de citas se borrara tambien!!!!',
          buttons: [
            { text: 'Cancelar' },
            {
              text: 'OK',
              handler: () => {         
                this.medicoService.eliminarMedico( this.medicoActual )
                this.router.navigateByUrl('/medico-page');       
              }
            }
          ]
        });await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: '¿Deseas eliminar este medico?',
        buttons: [
          { text: 'Cancelar' },
          {
            text: 'OK',
            handler: () => {         
              this.medicoService.eliminarMedico( this.medicoActual )
              this.router.navigateByUrl('/medico-page');       
            }
          }
        ]
      });await alert.present();
    }
  }


}
