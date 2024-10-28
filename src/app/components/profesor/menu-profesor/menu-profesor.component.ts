import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { NavbarProfesorComponent } from "../navbar-profesor/navbar-profesor.component";
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-profesor',
  standalone: true,
  imports: [
    CommonModule, // Asegúrate de importar CommonModule
    NavbarProfesorComponent,
    RouterModule
  ],
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.css']
})
export class MenuProfesorComponent implements OnInit {
  showMenu: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.url.includes('actividades');
      }
    });
  }
}
