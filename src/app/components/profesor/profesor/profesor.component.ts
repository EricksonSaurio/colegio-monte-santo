import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarProfesorComponent } from '../navbar-profesor/navbar-profesor.component';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [
    RouterModule,
    NavbarProfesorComponent
  ],
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent {}
