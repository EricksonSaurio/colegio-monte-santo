import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {
  calificaciones = [
    { calificacion_id: 1, alumno_id: 202, materia_id: 101, periodo_id: 1 },
    { calificacion_id: 2, alumno_id: 203, materia_id: 102, periodo_id: 2 },
    { calificacion_id: 3, alumno_id: 204, materia_id: 103, periodo_id: 1 }
  ];

  ngOnInit(): void {
    // Aquí puedes cargar las calificaciones desde un servicio si es necesario.
  }
}
