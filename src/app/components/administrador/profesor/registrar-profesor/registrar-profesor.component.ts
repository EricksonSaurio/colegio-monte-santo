import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfesorService } from '../../../../services/profesor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-profesor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent {
  profesor = {
    nombre: '',
    direccion: '',
    cedula: '',
    telefono: '',
    correo: '',
    nivel_est: 'Licenciatura',
    estado: 1,
  };

  constructor(
    private dialogRef: MatDialogRef<RegistrarProfesorComponent>,
    private profesorService: ProfesorService
  ) {}

  onSubmit() {
    this.profesorService.registrarProfesor(this.profesor).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Profesor registrado',
          text: 'El profesor ha sido registrado exitosamente.',
          confirmButtonColor: '#3f51b5'
        }).then(() => {
          this.dialogRef.close(true); // Cerramos el modal y actualizamos la lista
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el profesor. Inténtalo de nuevo.',
          confirmButtonColor: '#f44336'
        });
        console.error('Error al registrar el profesor:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
