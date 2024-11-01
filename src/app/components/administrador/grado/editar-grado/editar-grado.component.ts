import { Component, Inject } from '@angular/core';
import { GradoService } from '../../../../../../src/app/services/grado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-grado',
  standalone: true,
  templateUrl: './editar-grado.component.html',
  styleUrls: ['./editar-grado.component.css'],
  providers: [GradoService],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class EditarGradoComponent {
  grado: any;

  constructor(
    private gradoService: GradoService,
    public dialogRef: MatDialogRef<EditarGradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializamos `grado` con los datos pasados
    this.grado = { ...data.grado };
  }

  onSubmit() {
    this.gradoService.editarGrado(this.grado).subscribe(
      () => {
        Swal.fire('Guardado', 'El grado ha sido actualizado exitosamente.', 'success');
        this.dialogRef.close(true); // Cierra el modal y envía `true` indicando éxito
      },
      (error) => {
        console.error('Error al actualizar el grado', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el grado.', 'error');
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false); // Cierra el modal sin guardar
  }
}
