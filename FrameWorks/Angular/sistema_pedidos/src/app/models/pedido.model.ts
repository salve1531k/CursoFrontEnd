import { Cliente } from "./cliente.model";

export interface ItemPedido{
    produtoID: number;
    quantidade: number;
}

export class Pedido{
    constructor(
        public id: number,
        public cliente: Cliente,
        public itens: ItemPedido[],
        public desconto: number
    ){}

    //método
    calcularTotal(produtos: any[]):number{
        const total = this.itens.reduce((acc,item)=>{ // REDUCE -> reduz uma lista a um unico item
            const prod = produtos.find(p=>p.id === item.produtoID);// procura o produto pelo id
            return acc+(prod ? prod.preco*item.quantidade : 0);// se o produto não for encontrado, retorna 0
        },0);
        return total - (total*(this.desconto/100));// calcucla o desconto sobre o valor total encontrado anteriormente
    }

}