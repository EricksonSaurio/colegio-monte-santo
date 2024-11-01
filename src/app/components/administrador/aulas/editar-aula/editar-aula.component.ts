import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AulaService } from '../../../../services/aula.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar-aula',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './editar-aula.component.html',
  styleUrls: ['./editar-aula.component.css']
})
export class EditarAulaComponent {
  aula = {
    aula_id: this.data.aula_id,
    nombre_aula: this.data.nombre_aula,
    estado: this.data.estado
  };

  constructor(
    private aulaService: AulaService,
    private dialogRef: MatDialogRef<EditarAulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    this.aulaService.editarAula(this.aula.aula_id, this.aula).subscribe(
      () => {
        Swal.fire('Éxito', 'Aula actualizada correctamente', 'success');
        this.dialogRef.close('success');
      },
      (error) => {
        console.error('Error al actualizar aula', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el aula', 'error');
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
