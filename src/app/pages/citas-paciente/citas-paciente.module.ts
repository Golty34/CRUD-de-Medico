import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitasPacientePage } from './citas-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: CitasPacientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CitasPacientePage]
})
export class CitasPacientePageModule {}
