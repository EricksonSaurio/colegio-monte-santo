import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificacionService } from '../../../../services/calificacion.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './listar-calificaciones.component.html',
  styleUrls: ['./listar-calificaciones.component.css'],
  standalone: true,
  imports: [CommonModule] // Esto es fundamental para el uso de *ngFor y *ngIf en componentes standalone
})
export class CalificacionesComponent implements OnInit {
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
