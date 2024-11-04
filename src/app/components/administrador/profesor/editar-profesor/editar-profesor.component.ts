import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfesorService } from '../../../../services/profesor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-profesor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent {
  profesor: any;

  constructor(
    private dialogRef: MatDialogRef<EditarProfesorComponent>,
    private profesorService: ProfesorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profesor = { ...data.profesor };
  }

  onSubmit() {
    this.profesorService.editarProfesor(this.profesor).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Profesor actualizado',
          text: 'Los datos del profesor han sido actualizados exitosamente.',
          confirmButtonColor: '#3f51b5'
        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar los datos del profesor. Inténtalo de nuevo.',
          confirmButtonColor: '#f44336'
        });
        console.error('Error al actualizar el profesor:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
