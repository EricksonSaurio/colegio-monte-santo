import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActividadService } from '../../../services/actividad.service'; // Importa el servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css'],
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
export class EditarActividadComponent {
  actividad: any;

  constructor(
    public dialogRef: MatDialogRef<EditarActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private actividadService: ActividadService
  ) {
    this.actividad = { ...data }; // Copia los datos para edición
  }

  onSubmit(): void {
    this.actividadService.editarActividad(this.actividad.actividad_id, this.actividad).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Actividad Actualizada',
          text: 'La actividad se ha actualizado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
        this.dialogRef.close(response); // Cierra el diálogo y pasa la actividad actualizada
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar la actividad.',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al actualizar la actividad:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
