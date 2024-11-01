import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private baseUrl = 'http://apicolegiomontesanto.site/Actividades';

  constructor(private http: HttpClient) { }

  // Método para listar todas las actividades
  getActividades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Listar`);
  }

  // Método para obtener una actividad por ID
  getActividad(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Método para registrar una nueva actividad
  registrarActividad(actividad: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Registrar`, actividad);
  }

  // Método para editar una actividad existente
  editarActividad(id: number, actividad: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Editar/${id}`, actividad);
  }

  // Método para eliminar una actividad
  eliminarActividad(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Eliminar/${id}`);
  }
}
