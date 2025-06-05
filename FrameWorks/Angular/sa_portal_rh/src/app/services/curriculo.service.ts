import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  private apiUrl = "http://localhost:3002/curriculos";

  constructor(private http: HttpClient) {}

  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  cadastrarCurriculo(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.post<Curriculo>(this.apiUrl, curriculo);
  }

  atualizarCurriculo(id: string, curriculo: Curriculo): Observable<Curriculo> {
    const urlAtualizado = `${this.apiUrl}/${id}`;
    return this.http.put<Curriculo>(urlAtualizado, curriculo);
  }

  removerCurriculo(id: string): Observable<any> {
    const urlDeletar = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(urlDeletar);
  }
}
