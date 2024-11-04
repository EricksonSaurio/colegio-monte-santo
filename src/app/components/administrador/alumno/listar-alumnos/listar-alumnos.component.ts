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
  imports: [CommonModule, MatDialogModule] 
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

  
  abrirModalRegistrar(): void {
    const dialogRef = this.dialog.open(RegistrarAlumnoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos(); 
      }
    });
  }

 
  editarAlumno(alumno: any): void {
    const dialogRef = this.dialog.open(EditarAlumnoComponent, {
      width: '400px',
      data: { alumno } 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos(); 
      }
    });
  }

  
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
            this.cargarAlumnos(); 
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
