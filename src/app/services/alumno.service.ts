import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://apicolegiomontesanto.site/Alumnos';

  constructor(private http: HttpClient) {}

  // Método para listar alumnos
  listarAlumnos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Listar`);
  }

  // Método para registrar un nuevo alumno
  registrarAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Registrar`, alumno);
  }

  // Método para editar un alumno existente
  editarAlumno(alumno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Editar/${alumno.alumno_id}`, alumno);
  }
  

  // Método para eliminar un alumno
  eliminarAlumno(alumnoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Eliminar/${alumnoId}`);
  }
}
