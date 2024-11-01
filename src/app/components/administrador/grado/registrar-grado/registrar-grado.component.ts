import { Component } from '@angular/core';
import { GradoService } from '../../../../../../src/app/services/grado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-grado',
  standalone: true,
  templateUrl: './registrar-grado.component.html',
  styleUrls: ['./registrar-grado.component.css'],
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
export class RegistrarGradoComponent {
  grado = {
    nombre_grado: '',
    estado: 1
  };

  constructor(
    private gradoService: GradoService,
    public dialogRef: MatDialogRef<RegistrarGradoComponent>
  ) {}

  onSubmit() {
    this.gradoService.registrarGrado(this.grado).subscribe(
      () => {
        Swal.fire('Creado', 'El grado ha sido creado exitosamente.', 'success');
        this.dialogRef.close(true); // Cierra el modal y envía `true` indicando que el registro fue exitoso
      },
      (error) => {
        console.error('Error al crear el grado', error);
        Swal.fire('Error', 'Hubo un problema al crear el grado.', 'error');
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false); // Cierra el modal sin registrar y envía `false`
  }
}
