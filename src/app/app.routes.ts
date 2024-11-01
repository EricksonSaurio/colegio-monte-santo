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
import { AdminComponent } from './components/administrador/admin/admin.component';
import { InicioComponent } from './components/administrador/inicio/inicio.component';
import { ListarUsuariosComponent } from './components/administrador/listar-usuarios/listar-usuarios.component';
import { ListarProfesorComponent } from './components/administrador/profesor/listar-profesor/listar-profesor.component';
import { ListarAlumnosComponent } from './components/administrador/alumno/listar-alumnos/listar-alumnos.component';
import { ListarMateriasComponent } from './components/administrador/materia/listar-materias/listar-materias.component';
import { ListarAulasComponent } from './components/administrador/aulas/listar-aulas/listar-aulas.component';
import { ListarGradosComponent } from './components/administrador/grado/listar-grados/listar-grados.component';


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
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { role: 'Administrador' },
    children: [
      { path: 'inicio', component: InicioComponent },
      {path: 'usuarios', component: ListarUsuariosComponent},
      {path: 'profesores', component: ListarProfesorComponent},
      {path: 'alumnos', component: ListarAlumnosComponent},
      {path: 'materias', component: ListarMateriasComponent},
      {path: 'aulas', component: ListarAulasComponent},
      {path: 'grados', component: ListarGradosComponent}
     
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
