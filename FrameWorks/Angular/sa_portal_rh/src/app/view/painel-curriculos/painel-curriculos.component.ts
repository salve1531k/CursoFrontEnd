import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss'],
})
export class PainelCurriculosComponent implements OnInit {
  curriculo: Curriculo = new Curriculo('','', '', '', '', '');
  public curriculos: Curriculo[] = [];

  constructor(private _curriculosService: CurriculosService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }



  listarCurriculos() {
    this._curriculosService.getCurriculos().subscribe(
      (retornaCurriculo) => {
        console.log('Curriculos retornados da API:', retornaCurriculo);
        this.curriculos = retornaCurriculo.map((item: any) => {
          return new Curriculo(
            item.id,
            item.cpf,
            item.nome,
            item.descricao,
            item.referencias,
            item.area
          );
        });
      },
      (error) => {
        console.error('Erro ao carregar curriculos:', error);
      }
    );
  }

  listarCurriculoUnica(curriculo: Curriculo) {
    this.curriculo = curriculo;
  }

cadastrar() {
  if (!this.curriculo.cpf || !/^\d{11}$/.test(this.curriculo.cpf)) {
    alert('CPF inválido. Deve conter exatamente 11 dígitos numéricos.');
    return;
  }

  this._curriculosService.cadastrarCurriculo(this.curriculo).subscribe(
    () => {
      this.curriculo = new Curriculo('','', '', '', '', '');
      this.listarCurriculos();
      alert('Currículo cadastrado com sucesso!');
    },
    (err) => {
      console.error('Erro ao cadastrar currículo:', err);
      alert('Erro ao cadastrar currículo.');
    }
  );
}


  atualizar(id: any) {
    this._curriculosService.atualizarCurriculo(id, this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo('','', '', '', '', '');
        this.listarCurriculos();
        alert('Curriculo Atualizado com Sucesso!!!');
      },
      (err) => {
        console.error('Exception:', err);
      }
    );
  }

  excluir(curriculo: Curriculo) {
    console.log('Tentando excluir:', curriculo); // Adicione isto para depurar
    if (!confirm(`Tem certeza que deseja excluir o currículo de CPF ${curriculo.cpf}?`)) {
      return;
    }

    this._curriculosService.removerCurriculo(curriculo.id).subscribe(
      () => {
        alert('Currículo deletado com sucesso!');
        this.listarCurriculos();

        // Limpa o formulário se o currículo excluído for o que está carregado
        if (this.curriculo.cpf === curriculo.cpf) {
          this.curriculo = new Curriculo('','', '', '', '', '');
        }
      },
      (err) => {
        console.error('Erro ao deletar currículo:', err);
        alert('Erro ao deletar currículo, veja console para detalhes.');
      }
    );
  }
}

