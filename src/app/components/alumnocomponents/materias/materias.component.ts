import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias = [
    { materia_id: 1, nombre_materia: 'Matemáticas', estado: 'Activo' },
    { materia_id: 2, nombre_materia: 'Historia', estado: 'Inactivo' },
    { materia_id: 3, nombre_materia: 'Ciencias', estado: 'Activo' }
  ];

  ngOnInit(): void {
    // Aquí puedes cargar las materias desde un servicio si es necesario.
  }
}
