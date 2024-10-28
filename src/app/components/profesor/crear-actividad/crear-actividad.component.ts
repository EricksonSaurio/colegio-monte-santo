import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
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
export class CrearActividadComponent {
  actividad = {
    nombre: '',
    estado: ''
  };

  constructor(private dialogRef: MatDialogRef<CrearActividadComponent>) {}

  onSubmit(): void {
    // Aquí agregas la lógica para crear la nueva actividad y cerrar el diálogo
    console.log('Actividad creada:', this.actividad);
    this.dialogRef.close(this.actividad);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
