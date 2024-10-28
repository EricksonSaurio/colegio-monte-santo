import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { NavbarProfesorComponent } from '../navbar-profesor/navbar-profesor.component';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component'; // Importa el componente que quieres abrir
import { EditarActividadComponent } from '../editar-actividad/editar-actividad.component';
import { EliminarActividadComponent } from '../eliminar-actividad/eliminar-actividad.component';

@Component({
  selector: 'app-profesor-actividades',
  templateUrl: './profesoractividades.component.html',
  styleUrls: ['./profesoractividades.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Añadir aquí
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    NavbarProfesorComponent
  ]
})
export class ProfesorActividadesComponent {
  actividades = [
    { nombre: 'Actividad 1', estado: 'Asignado' },
    { nombre: 'Actividad 2', estado: 'En progreso' },
  ];

  constructor(public dialog: MatDialog) {}




  
  openCreateActivityDialog(): void {
    const dialogRef = this.dialog.open(CrearActividadComponent, {
      width: '400px',
      disableClose: true // Evita que se cierre el diálogo al hacer clic fuera del mismo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre && result.estado) {
        // Aquí agregas la lógica para añadir la nueva actividad a la lista solo si se ingresaron datos válidos
        this.actividades.push(result);
      }
    });
  }
  editActivity(actividad: any): void {
    const dialogRef = this.dialog.open(EditarActividadComponent, {
      width: '400px',
      disableClose: true,
      data: actividad // Pasamos la actividad actual al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar los datos de la actividad con la información editada
        const index = this.actividades.findIndex((a) => a.nombre === actividad.nombre);
        if (index !== -1) {
          this.actividades[index] = result;
        }
      }
    });
  }
  deleteActivity(actividad: any): void {
    const dialogRef = this.dialog.open(EliminarActividadComponent, {
      width: '400px',
      disableClose: true,
      data: actividad // Pasamos la actividad actual al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Eliminar la actividad de la lista
        this.actividades = this.actividades.filter(a => a !== actividad);
      }
    });
  } 
}
