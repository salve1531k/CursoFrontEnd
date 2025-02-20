//Estruturas de Dados

//Condicionais (if else, switch case

var precoProduto = 150;

if (precoProduto >= 100){
    console.log("Valor a Pagar:" + precoProduto * 0.9);
} else {
    console.log("Valor a pagar:" + ptrcoProduto);
}

//Switch case
var mes =2
switch (mes) {
    case 1:
        console.log("Janeiro");
        break;
    case 2:
        console.log("Fevereiro");
        break
    case 3:
        console.log("março")
        break;        

    default:
        console.log("outro mês");
        break;
}

//Rstrutura de repetição (for,while)

//for (ponto de inicio ponto de parada, Ponto de imcremento)

for (let i = 0; i < 10; i++) {
    console.log("indice: " + i);
}

//While (condiçãao de parada for == de parada)

var continuar = true;
var numeroEscolhido = 3;
var tentativas=0;
while (continuar) {
    let numeroSorteado = Math.round(Math.random()*10);
    if (numeroEscolhido == numeroSorteado) {
        continuar = false;
    }
    tentativas ++;
    console.log("Nº de tentativa " + tentativas);
}

//funções (métodos)

function saudacao(nome){
    return "Olá " + nome + " !!!";
}

console.log(saudacao("Matheus"))



