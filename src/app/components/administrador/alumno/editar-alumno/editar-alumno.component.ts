import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css'],
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
export class EditarAlumnoComponent implements OnInit {
  alumno: any;

  constructor(
    private dialogRef: MatDialogRef<EditarAlumnoComponent>,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alumno = { ...data.alumno };
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.alumno.fecha_nac) {
      this.alumno.fecha_nac = new Date(this.alumno.fecha_nac).toISOString();
    }
    if (this.alumno.fecha_registro) {
      this.alumno.fecha_registro = new Date(this.alumno.fecha_registro).toISOString();
    }
  
    this.alumnoService.editarAlumno(this.alumno).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Alumno actualizado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.dialogRef.close(true);
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al actualizar el alumno. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al actualizar alumno:', error);
      }
    );
  }
  
  closeDialog() {
    this.dialogRef.close(false);
  }
}
