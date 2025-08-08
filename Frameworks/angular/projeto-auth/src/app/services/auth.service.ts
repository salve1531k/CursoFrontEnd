import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //atributos
  private apiUrl = 'http://localhost:3000/usuarios';
  private readonly CHAVE_AUTH = 'usuarioLogado';

  constructor(private router: Router, private http: HttpClient) {}

  // métodos
  //cadastrar o uruário no sistema
  registrar(usuario: any): Observable<any> {
    //verificar se usuario já existe (get -> email)
    return this.http.get<any[]>(`${this.apiUrl}?email=${usuario.email}`).pipe(
      map((usuarios) => {
        //se usuário já existe
        if (usuarios.length > 0) {
          //lanço um erro para o sistema.
          throw new Error('Usuário ja cadastrado');
        }
        return usuario;
      }),
      // caso o usuário não exista
      switchMap((novoUsuario) =>
        this.http.post(this.apiUrl, novoUsuario)
          .pipe(tap(() => alert('Registro realizado com sucesso')))
      ),
      // Pegar erros de conexâo
      catchError((err) => {
        alert(`Erro: ${err.message}`);
        throw err;
      })
    );
  }
  // métododo para logar úsuario já registrados
  login(credenciais: any): Observable<boolean> {
    // Passar para o banco uma com email e senha
    return this.http
      .get<any[]>(
        `${this.apiUrl}?email=${credenciais.email}&senha=${credenciais.senha}`
      )
      .pipe(
        // Não encontrado
        map((usuarios) => {
          if (usuarios.length === 0) {
            return false;
          } else {
            // O usuario e sua chave de autenticação => localStorage
            const usuario = usuarios[0];
            localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuario));
            return true;// Deu certo -> pode avançar
          }
        })
      );
  }
  // Deslogar o usuário
  logout() {
    // Limpo o local storage
    localStorage.removeItem(this.CHAVE_AUTH);
    // Redireciono para outra página
    this.router.navigate(["/home"]);
  }

  // verificar se usuario já fez autenticação
  // (autorização do acesso)
  estaAutenticado(): boolean{
    // Tranformando a verificação de uma string em uma booleana
    return !! localStorage.getItem(this.CHAVE_AUTH);
  }

  // pegar os dados do usuário
  getUsuarioAtual():any{
    // Quando eu armazeno no localStorage -> Texto -
    // Quando vou pegar informações do LocalStorage eu converto para JSON
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || '{}');
  }

}
