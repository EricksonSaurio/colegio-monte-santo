import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavbarProfesorComponent } from '../navbar-profesor/navbar-profesor.component';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from '../editar-actividad/editar-actividad.component';
import { ActividadService } from '../../../services/actividad.service';
import Swal from 'sweetalert2';

interface Actividad {
  actividad_id: number;
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-profesor-actividades',
  templateUrl: './profesoractividades.component.html',
  styleUrls: ['./profesoractividades.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    NavbarProfesorComponent
  ]
})
export class ProfesorActividadesComponent implements OnInit {
  actividades: Actividad[] = [];

  constructor(
    public dialog: MatDialog,
    private actividadService: ActividadService
  ) {}

  ngOnInit(): void {
    this.obtenerActividades();
  }

  obtenerActividades(): void {
    this.actividadService.getActividades().subscribe(
      (data) => {
        this.actividades = data.map((actividad: any) => ({
          actividad_id: actividad.actividad_id,
          nombre: actividad.nombre_actividad,
          estado: actividad.estado === 0 ? 'Inactivo' : 'Activo'
        }));
      },
      (error) => {
        console.error('Error al obtener las actividades:', error);
      }
    );
  }

  openCreateActivityDialog(): void {
    const dialogRef = this.dialog.open(CrearActividadComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actividades.push({
          actividad_id: result.actividad_id,
          nombre: result.nombre_actividad,
          estado: result.estado === 1 ? 'Activo' : 'Inactivo'
        });
      }
    });
  }

  editActivity(actividad: Actividad): void {
    const dialogRef = this.dialog.open(EditarActividadComponent, {
      width: '400px',
      disableClose: true,
      data: actividad
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.actividades.findIndex(a => a.actividad_id === result.actividad_id);
        if (index !== -1) {
          this.actividades[index] = result;
        }
      }
    });
  }

  deleteActivity(actividad: Actividad): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la actividad permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.eliminarActividad(actividad.actividad_id).subscribe(
          () => {
            this.actividades = this.actividades.filter(a => a.actividad_id !== actividad.actividad_id);
            Swal.fire(
              'Eliminada',
              'La actividad ha sido eliminada exitosamente.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la actividad.',
              'error'
            );
            console.error('Error al eliminar la actividad:', error);
          }
        );
      }
    });
  }
}
