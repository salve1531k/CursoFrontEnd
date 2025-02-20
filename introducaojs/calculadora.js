var prompt = require("prompt-sync")();

//calculadora simples

//funções
function soma(a,b){
    return (a+b)
}
function Subtracão(a,b){
    return (a-b)
}
function multiplicacao(a,b){
    return (a*b)
}
function divisao(a,b){
    if (b == 0)
        return "Divisão por zero não é permitida";
    return (a/b)
}

function menu(){
    console.log("Escolha a operação desejada: ");
    console.log("1- Soma");
    console.log("2- subtração");
    console.log("3- Multiplicação");
    console.log("4- divisão");

    let operacao = Number(prompt("Operação:"));

    switch (operacao) {
        case 1:
            var a = Number(prompt("Informe o primeiro número"));
            var b = Number(prompt("Informe o segundo número"));
            console.log("O resultado é:" + soma(a, b));
            
            break;
        case 2:
            var a = Number(prompt("Informe o primeiro número"));
            var b = Number(prompt("Informe o segundo número"));
            console.log("O resultado é:" + subtracao(a, b));
            break;
        case 3:
            var a = Number(prompt("Informe o primeiro número"));
            var b = Number(prompt("Informe o segundo número"));
            console.log("O resultado é:" + divisao(a, b));
            break;
        case 4:
            var a = Number(prompt("Informe o primeiro número"));
            var b = Number(prompt("Informe o segundo número"));
            console.log("O resultado é:" + divisao(a, b));
        default:
            console.log("Operação inválida")
            break;
    }
}

menu();