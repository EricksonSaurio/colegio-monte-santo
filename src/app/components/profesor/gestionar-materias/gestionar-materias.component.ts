import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarProfesorComponent } from '../navbar-profesor/navbar-profesor.component';
import { MateriaService } from '../../../services/materia.service';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-gestionar-materias',
  templateUrl: './gestionar-materias.component.html',
  styleUrls: ['./gestionar-materias.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarProfesorComponent, RouterModule]
})
export class GestionarMateriasComponent implements OnInit {
  materias: any[] = [];

  constructor(
    private materiaService: MateriaService,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
    this.obtenerMaterias();
  }

  obtenerMaterias(): void {
    this.materiaService.listarMaterias().subscribe(
      (data) => {
        this.materias = data;
        console.log("Materias obtenidas:", this.materias); // Verifica el `profesor_id` aquí
  
        this.materias.forEach((materia) => {
          if (materia.profesor_id) {
            this.profesorService.getProfesorById(materia.profesor_id).subscribe(
              (profesor) => {
                console.log(`Profesor encontrado para ID ${materia.profesor_id}:`, profesor); // Verifica los datos del profesor
                materia.nombre_profesor = profesor.nombre; // Asegúrate de que el nombre esté disponible aquí
              },
              (error) => {
                console.error(`Error al obtener el profesor con ID ${materia.profesor_id}:`, error);
                materia.nombre_profesor = 'Error al cargar';
              }
            );
          } else {
            materia.nombre_profesor = 'No asignado';
          }
        });
      },
      (error) => {
        console.error('Error al obtener las materias:', error);
      }
    );
  }
  
}
