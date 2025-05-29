import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss'],
})
export class PainelCurriculosComponent implements OnInit {
  public curriculo: Curriculo = new Curriculo(0, '', '', '', "0"); //rastrear os dados no formulário por interpolação

  public curriculos: Curriculo[] = [];
  //armazenar os dados do API -json

  constructor(private _curriculosService: CurriculosService) {} // aplicando o service no Construtor

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    // Lista as curriculos do servidor usando o serviço 'CurriculoService'
    this._curriculosService.getCurriculos().subscribe((retornaCurriculo) => {
      this.curriculos = retornaCurriculo.map((item) => {
        // Mapeia os dados retornados para objetos 'Curriculo'
        return new Curriculo(
          item.id,
          item.nome,
          item.descricao,
          item.referencias,
          item.area
        );
      });
    });
  }

  //Listar unica Curriculo
  listarCurriculoUnica(curriculo:Curriculo){
    //Função para listar curriculo unica, para edição no formulário
    this.curriculo = curriculo;
    //A curriculo clicada é mostrada no formulário, =>
  }

  //cadastrar Curriculo
  cadastrar(){
    this._curriculosService.cadastrarCurriculo(this.curriculo).subscribe(
      ()=>{
        this.curriculo = new Curriculo(0,"","","","0");//limpara os campos do formulário
        this.listarCurriculos();
        alert("Curriculo Cadastrada com Sucesso");
      }, (err) => { console.error("Exception: ",err);}
    );
  }

  // atualizar Curriculos
  atualizar(id:any){
    this._curriculosService.atualizarCurriculo(id, this.curriculo).subscribe(
      ()=>{
        this.curriculo = new Curriculo(0,"","","","0");
        this.listarCurriculos();
        alert("Curriculo Atualizada com Sucesso!!!");
      }, (err) => {console.error("Exception: ",err);}
    );
  }

  //deletar Curriculos
  excluir(id:any){
    this._curriculosService.removerCurriculo(id).subscribe(
      ()=>{
        this.listarCurriculos();
        alert("Curriculo Deletada com Sucesso!!!");
      }, (err) => {console.error("Exception: ",err);}
    );
  }

}
