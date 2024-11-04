import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa si usas formularios
import { MatTableModule } from '@angular/material/table'; // Para tablas de Angular Material
import { MatButtonModule } from '@angular/material/button'; // Para botones de Angular Material
import { MatIconModule } from '@angular/material/icon'; // Para iconos en Angular Material
import { MatDialogModule } from '@angular/material/dialog'; // Para diálogos de Angular Material
import { CalificacionService } from '../../../../services/calificacion.service';

@Component({
  selector: 'app-listar-calificaciones',
  templateUrl: './listar-calificaciones.component.html',
  styleUrls: ['./listar-calificaciones.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Para trabajar con formularios
    MatTableModule, // Para el uso de tablas
    MatButtonModule, // Para botones
    MatIconModule, // Para iconos
    MatDialogModule // Para usar diálogos de Angular Material
  ]
})
export class ListarCalificacionesComponent implements OnInit {
  calificaciones: any[] = [];

  constructor(private calificacionService: CalificacionService) {}

  ngOnInit(): void {
    this.obtenerCalificaciones();
  }

  obtenerCalificaciones(): void {
    this.calificacionService.listarCalificaciones().subscribe(
      (data) => {
        this.calificaciones = data;
      },
      (error) => {
        console.error('Error al obtener calificaciones:', error);
      }
    );
  }
}
