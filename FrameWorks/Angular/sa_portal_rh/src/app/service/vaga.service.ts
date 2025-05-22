import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.model';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  //atributo
  private apiUrl = "http://localhost:3000/vagas"; // Caminho da API


  constructor(private http: HttpClient ) { }

  //método de Conexão com a API

  //get - read
  getVagas(): Observable<Vaga[]> { //responsavel por traduzir as informações da API para o Model
    return this.http.get<Vaga[]>(this.apiUrl); // endereço da conexão e retorno da informação
  }

  //post - create
  cadastrarVaga(vaga: Vaga): Observable<Vaga[]> {
    return this.http.post<Vaga[]>(this.apiUrl, vaga); // endereço da conexão e retorno da informação
  }

  //put - update
  atualizarVaga(id: any, vaga: Vaga): Observable<Vaga[]> {
    const urlAtualizado = `${this.apiUrl}/${id}`; // Atualiza o id da URL
    return this.http.put<Vaga[]>(urlAtualizado, vaga); // endereço da conexão e retorno da informação
  }

  //delete - delete
  removeVaga(id: any): Observable<Vaga[]> {
    const urlDeletar = `${this.apiUrl}/${id}`; // Atualiza o id da URL
    return this.http.delete<Vaga[]>(urlDeletar); // endereço da conexão e retorno da informação
  }
}
