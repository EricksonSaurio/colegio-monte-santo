import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlumnoService } from '../../../../services/alumno.service';
import Swal from 'sweetalert2';

import { RegistrarAlumnoComponent } from '../registrar-alumno/registrar-alumno.component';
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule] // Añadido MatDialogModule para el uso de diálogos
})
export class ListarAlumnosComponent implements OnInit {
  alumnos: any[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  // Método para cargar la lista de alumnos
  cargarAlumnos(): void {
    this.alumnoService.listarAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
      },
      (error) => {
        console.error('Error al cargar alumnos:', error);
      }
    );
  }

  // Método para abrir el modal de "Registrar Alumno"
  abrirModalRegistrar(): void {
    const dialogRef = this.dialog.open(RegistrarAlumnoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos(); // Recargar la lista de alumnos después de registrar uno nuevo
      }
    });
  }

  // Método para abrir el modal de "Editar Alumno"
  editarAlumno(alumno: any): void {
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: '400px',
      data: { alumno } // Pasamos el alumno seleccionado al modal de edición
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos(); // Recargar la lista de alumnos después de editar
      }
    });
  }

  // Método para confirmar y eliminar un alumno
  confirmarEliminarAlumno(alumno: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar al alumno: ${alumno.nombre_alumno}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.eliminarAlumno(alumno.alumno_id).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'El alumno ha sido eliminado con éxito', 'success');
            this.cargarAlumnos(); // Recargar la lista de alumnos después de eliminar
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el alumno', 'error');
            console.error('Error al eliminar alumno:', error);
          }
        );
      }
    });
  }
}
