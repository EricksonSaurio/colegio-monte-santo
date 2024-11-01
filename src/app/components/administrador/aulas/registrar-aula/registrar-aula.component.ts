import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AulaService } from '../../../../services/aula.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registrar-aula',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './registrar-aula.component.html',
  styleUrls: ['./registrar-aula.component.css']
})
export class RegistrarAulaComponent {
  aula = {
    nombre_aula: '',
    estado: 1
  };

  constructor(
    private aulaService: AulaService,
    private dialogRef: MatDialogRef<RegistrarAulaComponent>
  ) {}

  onSubmit(): void {
    this.aulaService.registrarAula(this.aula).subscribe(
      () => {
        Swal.fire('Éxito', 'Aula registrada correctamente', 'success');
        this.dialogRef.close('success');
      },
      (error) => {
        console.error('Error al registrar aula', error);
        Swal.fire('Error', 'Hubo un problema al registrar el aula', 'error');
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
