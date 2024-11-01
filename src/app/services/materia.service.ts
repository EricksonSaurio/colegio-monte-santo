import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'http://apicolegiomontesanto.site/Materia';

  constructor(private http: HttpClient) {}

  // Método para listar materias
  listarMaterias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Listar`);
  }

  listarMateria(materiaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${materiaId}`);
  }
  

  // Método para registrar una nueva materia
  registrarMateria(materia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Registrar`, materia);
  }

  // Método para editar una materia existente
  editarMateria(materia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Editar/${materia.id}`, materia);
  }

  // Método para eliminar una materia
  eliminarMateria(materiaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Eliminar/${materiaId}`);
  }

  // En materia.service.ts
  obtenerMateria(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
   // Método para obtener una materia específica por su id

}
