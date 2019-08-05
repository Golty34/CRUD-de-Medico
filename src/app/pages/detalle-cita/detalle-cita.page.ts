import { MedicoService } from './../../services/perfil/medico.service';
import { Platform } from '@ionic/angular';
import { CitasService } from './../../services/citas.service';
import { PacienteService } from './../../services/perfil/paciente.service';
import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.page.html',
  styleUrls: ['./detalle-cita.page.scss'],
})
export class DetalleCitaPage implements OnInit {

  //CANVAS
  @ViewChild("myCanvas",{static: false}) canvas:any;
  canvasElement: any;
  lastX: number;
  lastY: number;
  
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
  }

  public citaActual: any = {};
  public iD:any;
  public pacienteActual: any = {};
  public fechaActual;
  public horaActual;

  public detallePaciente = {
    Nombre: null,
    Apellido: null,
    fechaNacimiento: Date,
    iD: null,
    Cuota: null,
    tratamiento: null,
    medico: null,
    fechaCita: Date,
    Citas: null
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
  
  public citas ={
    Programadas: null,
    Historial: null
  }

  constructor(
    public citasService: CitasService,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    public plataform: Platform,
    public renderer: Renderer,
    public medicoService: MedicoService
  ) {  }

  ngOnInit() {

    const id: string = this.route.snapshot.paramMap.get('id1');
    const medicoID: string = this.route.snapshot.paramMap.get('id2');
    const citaID: string = this.route.snapshot.paramMap.get('id3');    
    this.iD = id;

    if (this.iD == "cita_programada") {
      
      this.citasService.detalleCita( medicoID, citaID ) 
        .on("value", snap => {
          this.citaActual = snap.val();
        
        })

    }else if (this.iD == "historial") {
      this.citasService.detalleCitaH( medicoID, citaID ) 
      .on("value", snap => {
        this.citaActual = snap.val();
      }) 
    }
    
  }

  ngAfterContentInit() {
    if (this.iD == "cita_programada") {
      setTimeout(() => {
        this.chequearFecha();
      }, 1500);
    } 
  }

 
 public chequearFecha(){

  this.fechaActual =  formatDate(new Date(), 'yyyy/MM/dd', 'en');
  this.horaActual = formatDate( new Date(), 'hh:mm' , 'en');

  if( this.fechaActual >= this.citaActual.fechaCita && this.horaActual > this.citaActual.horaCita){
    console.log( "Fecha de la cita paso" );
    this.detalleCita = this.citaActual;
    this.detalleCita.registro = "No";
    this.detalleCita.URL = "assets/icon/favicon.png";
    console.log( this.detalleCita);

    //REGISTRAR HISTORIAL
    this.citasService.crearHistorial(this.detalleCita );

    //ELIMINAR LAS CITAS PROGRAMADAS
    this.citasService.eliminarCita( this.citaActual );
    this.router.navigateByUrl('/home');

    setTimeout(() => {
      this.actualizarPaciente();
    }, 1000);

  }else{
    console.log( "Nada" );
  }
 }
  public registrarLlegada(){
    //CREA EL HISTORIAL
    this.detalleCita = {
      citaID: this.citaActual.citaID,
      pacienteID: this.citaActual.pacienteID,
      nombrePaciente: this.citaActual.nombrePaciente,
      medicoID: this.citaActual.medicoID,
      Consultorio:this.citaActual.Consultorio,
      fechaCita: this.citaActual.fechaCita,
      horaCita: this.citaActual.horaCita,
      registro: "Si",
      URL: null
    }
    
    //ELIMINAR LAS CITAS PROGRAMADAS
    this.citasService.eliminarCita( this.citaActual )
 
    this.guardarCanvas();

    this.router.navigateByUrl('/home');
    setTimeout(() => {
      this.actualizarPaciente();
    }, 1000);
  }

  public actualizarPaciente(){
    console.log( this.detalleCita.pacienteID );

    this.pacienteService.detallePaciente( this.detalleCita.pacienteID  )
    .on( "value", snap => {
      this.pacienteActual = snap.val();
    });
    console.log( this.pacienteActual.Citas )
    //ACTUALIZA DATOS DEL PACIENTE
    this.detallePaciente = this.pacienteActual;

    if( this.pacienteActual.Citas != null ){
      if(this.pacienteActual.Citas.Programadas != null){
        this.detallePaciente.Citas = this.pacienteActual.Citas;
        this.detallePaciente.medico = this.pacienteActual.medico;
        this.detallePaciente.tratamiento = "Si";
        this.detallePaciente.fechaCita = this.pacienteActual.fechaCita;
      }else{
        this.detallePaciente.Citas = this.pacienteActual.Citas;
        this.detallePaciente.medico = null;
        this.detallePaciente.fechaCita = null;
        this.detallePaciente.tratamiento = "No";
      }
    }else{
        this.detallePaciente.Citas = this.pacienteActual.Citas;
        this.detallePaciente.medico = null;
        this.detallePaciente.fechaCita = null;
        this.detallePaciente.tratamiento = "No";
    }

    console.log( this.pacienteActual )

    var update = {};
      update[ '/ListaPacientes/' + this.pacienteActual.iD ] = this.detallePaciente;
      this.pacienteService.editarPaciente( update );
  }

  //CANVAS
  public handleStart(ev){
    //console.log(ev);
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    this.lastX = ev.touches[0].pageX - canvasPosition.x ;
    this.lastY = ev.touches[0].pageY - canvasPosition.y;
  }
  public handleMove(ev){
    //console.log(ev);
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = "#000";
    ctx.lineWidth =5;

    ctx.beginPath();
    ctx.moveTo(this.lastX,this.lastY);
    ctx.lineTo(currentX,currentY);
    ctx.closePath();
    
    
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }
  public handleEnd(ev){
    //console.log(ev);
  }

  public guardarCanvas(){
   
    var dataUrl = this.canvasElement.toDataURL();
    
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.citasService.guardarImagen( dataUrl, this.detalleCita );
  }

  public repetirFirma(){
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  
}
