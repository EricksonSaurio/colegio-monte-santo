import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../../services/materia.service';
import { ProfesorService } from '../../../../services/profesor.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrarMateriaComponent } from '../registrar-materia/registrar-materia.component';
import { EditarMateriaComponent } from '../editar-materia/editar-materia.component';

@Component({
  selector: 'app-listar-materias',
  templateUrl: './listar-materias.component.html',
  styleUrls: ['./listar-materias.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})
export class ListarMateriasComponent implements OnInit {
  materias: any[] = [];
  profesores: any[] = [];

  constructor(
    private materiaService: MateriaService,
    private profesorService: ProfesorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarMaterias();
    this.cargarProfesores();
  }

  cargarMaterias(): void {
    this.materiaService.listarMaterias().subscribe(
      (data) => {
        this.materias = data;
        this.combinarMateriasConProfesores();
      },
      (error) => {
        console.error('Error al cargar materias:', error);
      }
    );
  }

  cargarProfesores(): void {
    this.profesorService.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
        this.combinarMateriasConProfesores();
      },
      (error) => {
        console.error('Error al cargar profesores:', error);
      }
    );
  }

  combinarMateriasConProfesores(): void {
    if (this.materias.length && this.profesores.length) {
      this.materias.forEach((materia) => {
        const profesor = this.profesores.find((p) => p.profesor_id === materia.profesorid);
        materia.nombreProfesor = profesor ? profesor.nombre : 'Sin asignar';
      });
    }
  }

  abrirModalRegistrar(): void {
    const dialogRef = this.dialog.open(RegistrarMateriaComponent, {
      width: '500px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal cerrado');
      this.cargarMaterias();
    });
  }

  abrirModalEditar(materia: any): void {
    const dialogRef = this.dialog.open(EditarMateriaComponent, {
      width: '500px',
      data: { materia }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarMaterias();
      }
    });
  }
  
  confirmarEliminarMateria(materia: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar la materia: ${materia.nombre_materia}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarMateria(materia.materia_id);
      }
    });
  }

  eliminarMateria(id: number): void {
    this.materiaService.eliminarMateria(id).subscribe(
      () => {
        Swal.fire('Eliminado', 'La materia ha sido eliminada con éxito', 'success');
        this.cargarMaterias();
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al eliminar la materia', 'error');
        console.error('Error al eliminar la materia:', error);
      }
    );
  }
}
