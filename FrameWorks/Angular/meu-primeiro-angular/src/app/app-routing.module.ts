import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ContatoComponent } from './pages/contato/contato.component';

const routes: Routes = [//criar as rotas de navegação
 {path: "", component: InicioComponent},
 {path: "contato", component: ContatoComponent},
 {path: "produtos", component: ProdutosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
