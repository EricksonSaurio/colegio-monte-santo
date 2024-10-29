import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calificar-evaluacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './calificar-evaluacion.component.html',
  styleUrls: ['./calificar-evaluacion.component.css']
})
export class CalificarEvaluacionComponent {
  alumnosForm: FormGroup;

  alumnos = [
    { id: 1, nombre: 'Alumno 1' },
    { id: 2, nombre: 'Alumno 2' },
    { id: 3, nombre: 'Alumno 3' },
    { id: 4, nombre: 'Alumno 4' },
  ];

  constructor(private fb: FormBuilder) {
    this.alumnosForm = this.fb.group({
      calificaciones: this.fb.array(this.alumnos.map(() => new FormControl('')))
    });
  }

  get calificaciones(): FormArray {
    return this.alumnosForm.get('calificaciones') as FormArray;
  }

  getCalificacionControl(index: number): FormControl {
    return this.calificaciones.at(index) as FormControl;
  }

  onSubmit(): void {
    const calificaciones = this.alumnosForm.value.calificaciones;
    this.alumnos.forEach((alumno, index) => {
      console.log(`Calificación para ${alumno.nombre}: ${calificaciones[index]}`);
    });
  }
}
