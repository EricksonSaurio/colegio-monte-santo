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
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, NavbarComponent] // Importamos lo necesario
})
export class CardsComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  toggleSidenav() {
    this.drawer.toggle();
  }
}
