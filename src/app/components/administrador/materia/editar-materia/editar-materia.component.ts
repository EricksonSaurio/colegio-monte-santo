import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriaService } from '../../../../services/materia.service';
import { ProfesorService } from '../../../../services/profesor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class EditarMateriaComponent implements OnInit {
  materia: any = {
    materia_id: null,
    nombre_materia: '',
    estado: 1,
    profesorid: null
  };
  profesores: any[] = [];

  constructor(
    private materiaService: MateriaService,
    private profesorService: ProfesorService,
    private dialogRef: MatDialogRef<EditarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.materia) {
      this.materia = { ...data.materia };
    }
  }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores(): void {
    this.profesorService.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
      },
      (error) => {
        console.error('Error al cargar profesores:', error);
      }
    );
  }

  onSubmit(): void {
    const materiaActualizada = {
      materia_id: this.materia.materia_id,
      nombre_materia: this.materia.nombre_materia,
      estado: this.materia.estado,
      profesorid: this.materia.profesorid
    };

    this.materiaService.editarMateria(materiaActualizada).subscribe(
      () => {
        Swal.fire('Éxito', 'La materia ha sido actualizada exitosamente', 'success');
        this.dialogRef.close(true);
      },
      (error) => {
        Swal.fire('Error', 'No se pudo actualizar la materia', 'error');
        console.error('Error al actualizar materia:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
