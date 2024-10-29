import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar *ngIf
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-crear-evaluacion',
  templateUrl: './crear-evaluacion.component.html',
  styleUrls: ['./crear-evaluacion.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Agrega CommonModule para *ngIf y otras directivas comunes
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class CrearEvaluacionComponent {
  evaluacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearEvaluacionComponent>
  ) {
    this.evaluacionForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.evaluacionForm.valid) {
      console.log('Evaluación creada:', this.evaluacionForm.value);
      this.dialogRef.close(this.evaluacionForm.value);
    }
  }
}
