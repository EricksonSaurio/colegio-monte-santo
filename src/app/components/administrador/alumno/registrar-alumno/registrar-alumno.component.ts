import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlumnoService } from '../../../../services/alumno.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.component.html',
  styleUrls: ['./registrar-alumno.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ]
})
export class RegistrarAlumnoComponent {
  alumno = {
    nombre_alumno: '',
    carnet: '',
    edad: null,
    direccion: '',
    cedula: '',
    telefono: '',
    correo: '',
    fecha_nac: '', 
    fecha_registro: '', 
    estado: 1
  };

  constructor(
    private dialogRef: MatDialogRef<RegistrarAlumnoComponent>,
    private alumnoService: AlumnoService
  ) {}

  onSubmit() {
    this.alumnoService.registrarAlumno(this.alumno).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Alumno registrado',
          text: 'El alumno ha sido registrado exitosamente.',
          confirmButtonColor: '#3f51b5'
        }).then(() => {
          this.dialogRef.close(true); 
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el alumno. Inténtalo de nuevo.',
          confirmButtonColor: '#f44336'
        });
        console.error('Error al registrar el alumno:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
