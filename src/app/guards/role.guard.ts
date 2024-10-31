import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRole = route.data['role'] as string; // Rol requerido especificado en la ruta
    const userRole = this.authService.getUserRole(); // Obtiene el rol del usuario

    console.log(`Verificando acceso...`); // Depuración
    console.log(`Rol del usuario: ${userRole}`); // Muestra el rol del usuario
    console.log(`Rol requerido: ${requiredRole}`); // Muestra el rol requerido por la ruta

    if (userRole && userRole === requiredRole) {
      console.log(`Acceso permitido al rol: ${userRole}`); // Permite el acceso
      return true;
    } else {
      console.warn(`Acceso denegado. Redirigiendo al login.`); // Depuración de acceso denegado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
