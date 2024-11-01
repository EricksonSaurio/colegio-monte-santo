import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfesorService } from '../../../../services/profesor.service';
import { MateriaService } from '../../../../services/materia.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-materia',
  templateUrl: './registrar-materia.component.html',
  styleUrls: ['./registrar-materia.component.css'],
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
export class RegistrarMateriaComponent implements OnInit {
  materia = {
    nombre_materia: '',
    estado: 1,
    profesorid: null
  };

  profesores: any[] = [];

  constructor(
    private profesorService: ProfesorService,
    private materiaService: MateriaService,
    private dialogRef: MatDialogRef<RegistrarMateriaComponent>
  ) {}

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

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.materiaService.registrarMateria(this.materia).subscribe(
        () => {
          Swal.fire('Éxito', 'Materia registrada exitosamente', 'success');
          this.dialogRef.close(); // Cierra el modal después de registrar
        },
        (error) => {
          console.error('Error al registrar materia:', error);
          Swal.fire('Error', 'No se pudo registrar la materia', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor completa todos los campos obligatorios', 'error');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
