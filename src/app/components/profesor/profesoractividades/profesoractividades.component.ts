import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavbarProfesorComponent } from '../navbar-profesor/navbar-profesor.component';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from '../editar-actividad/editar-actividad.component';
import { EliminarActividadComponent } from '../eliminar-actividad/eliminar-actividad.component';
import { ActividadService } from '../../../services/actividad.service'; // Importa el servicio de actividad

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
  actividades: any[] = [];

  constructor(
    public dialog: MatDialog,
    private actividadService: ActividadService // Inyecta el servicio de actividad
  ) {}

  ngOnInit(): void {
    this.obtenerActividades();
  }

  obtenerActividades(): void {
    this.actividadService.getActividades().subscribe(
      (data) => {
        this.actividades = data.map((actividad: any) => ({
          nombre: actividad.nombre_actividad,
          estado: actividad.estado === 0 ? 'Inactivo' : 'Activo' // Asumiendo que 0 = Inactivo y 1 = Activo
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
      if (result && result.nombre && result.estado) {
        this.actividades.push(result);
      }
    });
  }

  editActivity(actividad: any): void {
    const dialogRef = this.dialog.open(EditarActividadComponent, {
      width: '400px',
      disableClose: true,
      data: actividad
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
      data: actividad
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actividades = this.actividades.filter(a => a !== actividad);
      }
    });
  }
}
