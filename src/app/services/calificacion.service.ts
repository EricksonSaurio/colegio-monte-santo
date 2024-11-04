import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private apiUrl = 'http://apicolegiomontesanto/Calificaciones'; // Reemplaza con la URL base de tu API

  constructor(private http: HttpClient) {}

  // GET /Calificaciones/Listar
  listarCalificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Listar`);
  }

  // GET /Calificaciones/ListarPropias
  listarCalificacionesPropias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ListarPropias`);
  }

  // GET /Calificaciones/{id}
  obtenerCalificacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // POST /Calificaciones/Registrar
  registrarCalificacion(calificacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Registrar`, calificacion);
  }

  // PUT /Calificaciones/Editar/{id}
  editarCalificacion(id: number, calificacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Editar/${id}`, calificacion);
  }

  // DELETE /Calificaciones/Eliminar/{id}
  eliminarCalificacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Eliminar/${id}`);
  }
}
