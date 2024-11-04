import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CalificacionService } from '../../../services/calificacion.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class CalificacionesComponent implements OnInit {
  calificaciones: any[] = [];
  displayedColumns: string[] = ['calificacion_id', 'alumno_id', 'materia_id', 'periodo_id']; 

  constructor(private calificacionService: CalificacionService) {}

  ngOnInit(): void {
    this.cargarCalificaciones();
  }

  cargarCalificaciones(): void {
    this.calificacionService.listarCalificaciones().subscribe(
      (data: any) => {
        console.log("Respuesta de la API:", data);
        this.calificaciones = Array.isArray(data) ? data : data.data || [];
      },
      (error: any) => {
        console.error('Error al cargar las calificaciones', error);
      }
    );
  }
}