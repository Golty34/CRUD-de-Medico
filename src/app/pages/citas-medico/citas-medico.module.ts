import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitasMedicoPage } from './citas-medico.page';

const routes: Routes = [
  {
    path: '',
    component: CitasMedicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CitasMedicoPage]
})
export class CitasMedicoPageModule {}
