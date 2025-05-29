import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/service/vaga.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss'],
})
export class PainelVagasComponent implements OnInit {
  public vaga: Vaga = new Vaga(0, '', '', '', 0); //rastrear os dados no formulário por interpolação

  public vagas: Vaga[] = [];
  //armazenar os dados do API -json

  constructor(private _vagasService: VagasService) {} // aplicando o service no Construtor

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas() {
    // Lista as vagas do servidor usando o serviço 'VagaService'
    this._vagasService.getVagas().subscribe((retornaVaga) => {
      this.vagas = retornaVaga.map((item) => {
        // Mapeia os dados retornados para objetos 'Vaga'
        return new Vaga(
          item.id,
          item.nome,
          item.foto,
          item.descricao,
          item.salario
        );
      });
    });
  }

  //Listar unica vaga
  listarVagaUnica(vaga:Vaga){
    //Função para listar vaga unica, para edição no formulario
    this.vaga = vaga;
    // A vaga clicada é mostrada no formulario, =>
  }

  //Cadastrar Vaga
  cadastrar(){
    this._vagasService.cadastrarVaga(this.vaga).subscribe(
      () => {
        this.vaga = new Vaga(0, '', '', '', 0); // Limpa o formulário após o cadastro
        this.listarVagas();
        alert("Vaga cadastrada com sucesso"); // Atualiza a lista de vagas
      }, (err) => {console.error("Exception: ",err);}
    );
  }

  //Atualizar Vaga
  atualizar(id: any) {
    this._vagasService.atualizarVaga(id, this.vaga).subscribe(
      () => {
        this.vaga = new Vaga(0, '', '', '', 0); // Limpa o formulário após a atualização
        this.listarVagas();
        alert("Vaga atualizada com sucesso"); // Atualiza a lista de vagas
      }, (err) => {console.error("Exception: ",err);}
    );
  }

  //Deletar Vaga
  excluir(id: any) {
    this._vagasService.removeVaga(id).subscribe(
      () => {
        this.vaga = new Vaga(0, '', '', '', 0); // Limpa o formulário após a exclusão
        this.listarVagas();
        alert("Vaga excluída com sucesso"); // Atualiza a lista de vagas
      }, (err) => {console.error("Exception: ",err);}
    );
  }
}
