import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // El componente es standalone
  imports: [RouterModule],  // Importamos RouterModule para manejar el enrutamiento
  template: '<router-outlet></router-outlet>',  // Usamos el router-outlet para cargar las rutas
})
export class AppComponent {}
