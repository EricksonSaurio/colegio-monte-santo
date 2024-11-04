import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MateriaService } from '../../../services/materia.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class MateriasComponent implements OnInit {
  materias: any[] = [];

  constructor(private materiaService: MateriaService) {}

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void {
    this.materiaService.listarMaterias().subscribe(
      (data: any) => {
        console.log("Respuesta completa de la API:", data); 
        if (Array.isArray(data)) {
          this.materias = data; 
        } else if (data && data.data) {
          this.materias = data.data; 
        } else {
          console.warn("Formato de datos inesperado:", data);
        }
        console.log("Materias procesadas:", this.materias); 
      },
      (error: any) => {
        console.error('Error al cargar las materias', error);
      }
    );
  }
}