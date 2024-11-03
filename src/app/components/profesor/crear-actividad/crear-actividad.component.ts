import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../services/actividad.service'; // Importa el servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
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
export class CrearActividadComponent {
  actividad = {
    nombre: '',
    estado: '' // Debe ser '1' para Activo o '0' para Inactivo
  };

  constructor(
    private dialogRef: MatDialogRef<CrearActividadComponent>,
    private actividadService: ActividadService
  ) {}

  onSubmit(): void {
    const nuevaActividad = {
      nombre_actividad: this.actividad.nombre,
      estado: this.actividad.estado === '1' ? 1 : 0
    };

    this.actividadService.registrarActividad(nuevaActividad).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Actividad Creada',
          text: 'La actividad se ha creado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
        this.dialogRef.close(response); // Envía la actividad creada al componente padre
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la actividad.',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al crear la actividad:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
