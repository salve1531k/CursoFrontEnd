code .Numbervar prompt = require("prompt-sync")();
letnotas = [];

function inserirNotas(){
    let nota = Number (prompt("Digitr a nota:")) 
    inserirNotas.push(nota);}
    function media(notas) {
        notas.reduce((media ,nota) => media + nota)/ notas.length;
        console.log("A média é + media")
    }

    function menu() {
        let continuar = true;
        while (continuar) {
            console.log("===Sistemas de notas===");
            console.log("|1. Inserir Notas     |");
            console.log("|2. Calcular Media    |");
            console.log("|3. Sair              |")
            console.log("=======================")
            
            operador = prompt("Informe a opção:")
            switch (operador) {
                case "1":
                inserirNotas();
                break;

                case "2":
                calculeMedia();
                break;

                case "3";
                continuar = false 
                console.log("Encerrando o programa");
                break;
                default:
                console.log("opção invalida");
                break;
            }
        }
    }