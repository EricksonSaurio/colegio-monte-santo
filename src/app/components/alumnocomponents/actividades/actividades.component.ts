import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../../services/actividad.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class ActividadesComponent implements OnInit {
  actividades: any[] = [];
  displayedColumns: string[] = ['actividad_id', 'nombre_actividad', 'estado']; 

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.actividadService.getActividades().subscribe(
      (data: any) => {
        console.log("Respuesta de la API:", data);
        if (Array.isArray(data)) {
          this.actividades = data;
        } else if (data && data.data) {
          this.actividades = data.data;
        } else {
          console.warn("Formato de datos inesperado:", data);
        }
        console.log("Actividades procesadas:", this.actividades);
      },
      (error: any) => {
        console.error('Error al cargar las actividades', error);
      }
    );
  }
}