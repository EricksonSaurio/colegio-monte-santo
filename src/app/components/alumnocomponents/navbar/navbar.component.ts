import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate de importar esto

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterModule] // Asegúrate de agregar esto
})
export class NavbarComponent { }
