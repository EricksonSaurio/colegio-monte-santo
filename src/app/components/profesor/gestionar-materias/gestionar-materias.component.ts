import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Agregar RouterModule
import { NavbarProfesorComponent } from '../navbar-profesor/navbar-profesor.component';

@Component({
  selector: 'app-gestionar-materias',
  templateUrl: './gestionar-materias.component.html',
  styleUrls: ['./gestionar-materias.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarProfesorComponent, RouterModule] // Añadir RouterModule aquí
})
export class GestionarMateriasComponent {
  materias = [
    { nombre: 'Matemáticas', descripcion: 'Materia básica de números y álgebra' },
    { nombre: 'Historia', descripcion: 'Estudio de los eventos históricos' },
    { nombre: 'Ciencias', descripcion: 'Estudio de los fenómenos naturales' }
  ];
}
