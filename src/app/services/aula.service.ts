import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private apiUrl = 'http://apicolegiomontesanto.site/Aulas'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // GET /Aulas/Listar
  getAulas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Listar`);
  }

  // GET /Aulas/{id}
  getAulaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST /Aulas/Registrar
  registrarAula(aulaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registrar`, aulaData);
  }

  // PUT /Aulas/Editar/{id}
  editarAula(id: number, aulaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Editar/${id}`, aulaData);
  }

  // DELETE /Aulas/Eliminar/{id}
  deleteAula(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Eliminar/${id}`);
  }
}
