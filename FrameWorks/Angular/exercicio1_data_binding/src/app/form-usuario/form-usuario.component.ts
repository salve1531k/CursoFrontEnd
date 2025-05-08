import { Component } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  // Atributos
  nome: string = "";
  email: string = "";
  telefone: string = "";
  genero: string = "";
  idade: number | null = null;
  profissao: string = "";
  mensagemErro: string = ""; // Variável para armazenar a mensagem de erro

  limparCampos(){
    this.nome = "";
    this.email = "";
    this.telefone = "";
    this.genero = "";
    this.idade = null;
    this.profissao = "";
    this.mensagemErro = ""; // Limpa a mensagem de erro
  }

  enviarFormulario() {
    if (!this.nome || !this.email || !this.telefone || !this.genero || this.idade === null || !this.profissao) {
      this.mensagemErro = "Erro: Todos os campos devem ser preenchidos."; // Define a mensagem de erro
    } else {
      this.mensagemErro = ""; // Limpa a mensagem de erro
      console.log("Formulário enviado com sucesso!");
      console.log({
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        genero: this.genero,
        idade: this.idade,
        profissao: this.profissao
      });
    }
  }
}
