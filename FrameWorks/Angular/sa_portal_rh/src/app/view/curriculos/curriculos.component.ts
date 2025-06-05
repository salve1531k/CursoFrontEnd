import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent implements OnInit{
  public curriculos: Curriculo[] = [];

  constructor(private _curriculoService:CurriculosService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculoService.getCurriculos().subscribe(
      (retornaCurriculo) => {
        this.curriculos = retornaCurriculo.map(
          (item) => {
            return new Curriculo(
              item.id,
              item.cpf,
              item.nome,
              item.descricao,
              item.referencias,
              item.area
            );
          }
        );
      }
    )
  }

}
