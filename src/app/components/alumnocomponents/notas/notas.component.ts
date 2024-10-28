import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas = [
    { nota_id: 1, materia_id: 101, alumno_id: 202, actividad_id: 303, valor_nota: 85, periodo_id: 1, fecha: '2023-10-01' },
    { nota_id: 2, materia_id: 102, alumno_id: 203, actividad_id: 304, valor_nota: 92, periodo_id: 2, fecha: '2023-10-02' },
    { nota_id: 3, materia_id: 103, alumno_id: 204, actividad_id: 305, valor_nota: 78, periodo_id: 1, fecha: '2023-10-03' }
  ];

  ngOnInit(): void {
    // Aquí puedes cargar las notas desde un servicio si es necesario.
  }
}
