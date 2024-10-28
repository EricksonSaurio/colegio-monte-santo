import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.actividad = { ...data }; // Copiar los datos para evitar modificar el original directamente
  }

  onSubmit(): void {
    // Enviar los datos actualizados y cerrar el diálogo
    this.dialogRef.close(this.actividad);
  }

  closeDialog(): void {
    // Cerrar el diálogo sin realizar cambios
    this.dialogRef.close();
  }
}
