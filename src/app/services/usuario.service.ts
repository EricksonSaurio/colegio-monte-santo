import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://apicolegiomontesanto.site/Usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any[]> {
    console.log("Llamada a listar usuarios");
    return this.http.get<any[]>(`${this.apiUrl}/Listar`);
  }

  registrarUsuario(usuario: any): Observable<any> {
    console.log("Intentando registrar usuario:", usuario);
    return this.http.post<any>(`${this.apiUrl}/Registrar`, usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    console.log(`Intentando actualizar usuario con ID ${id}:`, usuario);
    return this.http.put<any>(`${this.apiUrl}/Editar/${id}`, usuario);
  }

  obtenerRoles(): Observable<any[]> {
    console.log("Llamada a obtener roles");
    return this.http.get<any[]>('http://apicolegiomontesanto.site/Roles/Listar');
  }

  eliminarUsuario(id: number): Observable<any> {
    console.log(`Intentando eliminar usuario con ID ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/Eliminar/${id}`);
  }

  // Nuevo método para obtener la lista de profesores
  obtenerProfesores(): Observable<any[]> {
    return this.http.get<any[]>('http://apicolegiomontesanto.site/Profesores/Listar');
  }
  // Nuevo método para obtener la lista de alumnos
  obtenerAlumnos(): Observable<any[]> {
    return this.http.get<any[]>('http://apicolegiomontesanto.site/Alumnos/Listar');
  }
}
