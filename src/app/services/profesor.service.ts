import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://apicolegiomontesanto.site/Profesores'; // Cambia la URL según tu endpoint real

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de profesores
  getProfesores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Listar`);
  }

  registrarProfesor(profesor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Registrar`, profesor); // Asegúrate de que la ruta sea correcta
  }
  editarProfesor(profesor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${profesor.profesor_id}`, profesor);
  }
  eliminarProfesor(profesorId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${profesorId}`);
  }
  // Puedes agregar otros métodos para registrar, editar, eliminar, etc.
}
