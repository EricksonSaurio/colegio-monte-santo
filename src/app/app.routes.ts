import { Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumnocomponents/alumno/alumno.component';
import { ActividadesComponent } from './components/alumnocomponents/actividades/actividades.component';
import { MateriasComponent } from './components/alumnocomponents/materias/materias.component';
import { NotasComponent } from './components/alumnocomponents/notas/notas.component';
import { CalificacionesComponent } from './components/alumnocomponents/calificaciones/calificaciones.component';
import { CardsComponent } from './components/alumnocomponents/cards/cards.component';
import { MenuProfesorComponent } from './components/profesor/menu-profesor/menu-profesor.component';
import { ProfesorActividadesComponent } from './components/profesor/profesoractividades/profesoractividades.component';
import { GestionarMateriasComponent } from './components/profesor/gestionar-materias/gestionar-materias.component';
import { ProfesorComponent } from './components/profesor/profesor/profesor.component';
import { ListarEvaluacionesComponent } from './components/profesor/evaluaciones/listar-evaluaciones/listar-evaluaciones.component';
import { LoginComponent } from './components/login/login.component'; 
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'alumno',
    component: AlumnoComponent,
    canActivate: [RoleGuard],
    data: { role: 'Estudiante' },
    children: [
      { path: 'inicio', component: CardsComponent },
      { path: 'actividades', component: ActividadesComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'notas', component: NotasComponent },
      { path: 'calificaciones', component: CalificacionesComponent }
    ]
  },
  {
    path: 'profesor',
    component: ProfesorComponent,
    canActivate: [RoleGuard],
    data: { role: 'Profesor' },
    children: [
      { path: 'inicio', component: MenuProfesorComponent },
      { path: 'actividades', component: ProfesorActividadesComponent },
      { path: 'materias', component: GestionarMateriasComponent },
      { path: 'evaluaciones', component: ListarEvaluacionesComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
