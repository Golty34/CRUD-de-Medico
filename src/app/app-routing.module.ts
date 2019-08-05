import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'paciente-page', loadChildren: './pages/paciente-page/paciente-page.module#PacientePagePageModule' },
  { path: 'medico-page', loadChildren: './pages/medico-page/medico-page.module#MedicoPagePageModule' },
  { path: 'detalle-paciente/:id', loadChildren: './pages/detalle-paciente/detalle-paciente.module#DetallePacientePageModule' },
  { path: 'detalle-medico/:id', loadChildren: './pages/detalle-medico/detalle-medico.module#DetalleMedicoPageModule' },
  { path: 'crear-paciente', loadChildren: './pages/crear-paciente/crear-paciente.module#CrearPacientePageModule' },
  { path: 'crear-medico', loadChildren: './pages/crear-medico/crear-medico.module#CrearMedicoPageModule' },
  { path: 'crear-cita/:id', loadChildren: './pages/crear-cita/crear-cita.module#CrearCitaPageModule' },
  { path: 'historial-citas/:id', loadChildren: './pages/historial-citas/historial-citas.module#HistorialCitasPageModule' },
  { path: 'detalle-cita/:id1/:id2/:id3', loadChildren: './pages/detalle-cita/detalle-cita.module#DetalleCitaPageModule' },
  { path: 'historial-citas-m/:id', loadChildren: './pages/historial-citas-m/historial-citas-m.module#HistorialCitasMPageModule' },
  { path: 'citas-paciente/:id', loadChildren: './pages/citas-paciente/citas-paciente.module#CitasPacientePageModule' },
  { path: 'citas-medico/:id', loadChildren: './pages/citas-medico/citas-medico.module#CitasMedicoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
