import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearMedicoPage } from './crear-medico.page';

const routes: Routes = [
  {
    path: '',
    component: CrearMedicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearMedicoPage]
})
export class CrearMedicoPageModule {}
