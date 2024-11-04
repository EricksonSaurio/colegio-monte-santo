import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private apiUrl = 'http://apicolegiomontesanto.site/Aulas';

  constructor(private http: HttpClient) {}

  getAulas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Listar`);
  }

  getAulaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  registrarAula(aulaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registrar`, aulaData);
  }

  editarAula(id: number, aulaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Editar/${id}`, aulaData);
  }

  deleteAula(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Eliminar/${id}`);
  }
}
