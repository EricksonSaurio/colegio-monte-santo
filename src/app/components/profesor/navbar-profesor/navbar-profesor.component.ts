import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate de importar esto

@Component({
  selector: 'app-navbar-profesor',
  standalone: true,
  imports: [RouterModule],

  templateUrl: './navbar-profesor.component.html',
  styleUrl: './navbar-profesor.component.css'
})
export class NavbarProfesorComponent {

}
