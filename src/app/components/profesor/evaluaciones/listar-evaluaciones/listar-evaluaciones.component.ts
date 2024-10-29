import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngFor y *ngIf
import { RouterModule } from '@angular/router'; // Importar RouterModule para routerLink
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CrearEvaluacionComponent } from '../crear-evaluacion/crear-evaluacion.component'; // Ensure this path is correct

@Component({
  selector: 'app-listar-evaluaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule], // Asegúrate de que todos los módulos necesarios están aquí
  templateUrl: './listar-evaluaciones.component.html',
  styleUrls: ['./listar-evaluaciones.component.css']
})
export class ListarEvaluacionesComponent implements OnInit {
  evaluaciones = [
    {
      id: '1',
      nombre: 'Evaluación de Matemáticas',
      asignatura: 'Matemáticas',
      fechaRealizacion: new Date('2023-11-10'),
      estado: 'Pendiente'
    },
    {
      id: '2',
      nombre: 'Evaluación de Ciencias',
      asignatura: 'Ciencias',
      fechaRealizacion: new Date('2023-11-15'),
      estado: 'En Progreso'
    },
    {
      id: '3',
      nombre: 'Evaluación de Historia',
      asignatura: 'Historia',
      fechaRealizacion: new Date('2023-11-20'),
      estado: 'Finalizada'
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  eliminarEvaluacion(id: string): void {
    this.evaluaciones = this.evaluaciones.filter(evaluacion => evaluacion.id !== id);
    alert('Evaluación eliminada correctamente'); // Muestra una alerta como confirmación
  }

  openCrearEvaluacion(): void {
    this.dialog.open(CrearEvaluacionComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
      disableClose: true // Previene que el modal se cierre al hacer clic fuera
    });
  }
}
