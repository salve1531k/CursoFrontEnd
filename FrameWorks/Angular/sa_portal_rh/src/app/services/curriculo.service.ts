import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  //atributo
  private apiUrl = "http://localhost:3002/curriculos"; // Caminho da API


  constructor(private http: HttpClient ) { }

  //método de Conexão com a API

  //get - read
  getCurriculos(): Observable<Curriculo[]> { //responsavel por traduzir as informações da API para o Model
    return this.http.get<Curriculo[]>(this.apiUrl); // endereço da conexão e retorno da informação
  }

  //post - create
  cadastrarCurriculo(curriculo: Curriculo): Observable<Curriculo[]> {
    return this.http.post<Curriculo[]>(this.apiUrl, curriculo);
  }

  //put - update
  atualizarCurriculo(id: any, curriculo:Curriculo): Observable<Curriculo[]>{
    const urlAtualizado = `${this.apiUrl}/${id}`;
    return this.http.put<Curriculo[]>(urlAtualizado, curriculo);
  }

  //delete - delete
  removerCurriculo(id:any): Observable<Curriculo[]>{
    const urlDeletar = `${this.apiUrl}/${id}`;
    return this.http.delete<Curriculo[]>(urlDeletar);
  }
}
