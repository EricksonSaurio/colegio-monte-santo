import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,  
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, NavbarComponent] 
})
export class AlumnoComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  toggleSidenav() {
    this.drawer.toggle();
  }
}
