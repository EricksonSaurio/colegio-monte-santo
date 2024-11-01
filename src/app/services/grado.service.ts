import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private apiUrl = 'http://apicolegiomontesanto.site/Grados';

  constructor(private http: HttpClient) {}

  getGrados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Listar`);
  }

  deleteGrado(gradoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Eliminar/${gradoId}`);
  }

  registrarGrado(grado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registrar`, grado);
  }

  editarGrado(grado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Editar/${grado.grado_id}`, grado);
  }
}
