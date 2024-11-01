import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ProfesorService } from '../../../../services/profesor.service';
import { EditarProfesorComponent } from '../editar-profesor/editar-profesor.component';
import { RegistrarProfesorComponent } from '../registrar-profesor/registrar-profesor.component';

@Component({
  selector: 'app-listar-profesor',
  templateUrl: './listar-profesor.component.html',
  styleUrls: ['./listar-profesor.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListarProfesorComponent implements OnInit {
  profesores: any[] = [];

  constructor(
    private profesorService: ProfesorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  obtenerProfesores() {
    this.profesorService.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
      },
      (error) => {
        console.error('Error al obtener los profesores:', error);
      }
    );
  }

  abrirModalRegistrar() {
    const dialogRef = this.dialog.open(RegistrarProfesorComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerProfesores(); // Actualizar la lista de profesores si se registró uno nuevo
      }
    });
  }

  abrirModalEditar(profesor: any) {
    const dialogRef = this.dialog.open(EditarProfesorComponent, {
      width: '400px',
      data: { profesor }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerProfesores(); // Actualizar la lista después de editar
      }
    });
  }

  confirmarEliminarProfesor(profesor: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar al profesor: ${profesor.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.eliminarProfesor(profesor.profesor_id).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'El profesor ha sido eliminado con éxito', 'success');
            this.obtenerProfesores(); // Recargar la lista después de eliminar
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el profesor', 'error');
            console.error('Error al eliminar profesor:', error);
          }
        );
      }
    });
  }
}
