import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividades = [
    { actividad_id: 1, nombre_actividad: 'Matemáticas', estado: 'Activo' },
    { actividad_id: 2, nombre_actividad: 'Historia', estado: 'Inactivo' },
    { actividad_id: 3, nombre_actividad: 'Ciencias', estado: 'Activo' }
  ];

  ngOnInit(): void {
    // Aquí puedes cargar las actividades desde un servicio si es necesario.
  }
}
