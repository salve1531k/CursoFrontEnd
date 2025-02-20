// Array e matrizes

//Declaração de um arrya
let dados = []; //uso de colchetes permite a declaração de um array

let numeros = [1,2,3,4,5,6,7,8,9];
let palavras = ["Bola", "Sapato", "Caixa"];

console.log(numeros.length); //Quantidade de elementos do array

//Indices do array

//Imprimir o 5º elemento de um array
console.log(numeros[4]);// 5

//Adicionar elementos no array

palavras.push("Cachorro");// no final do array
console.log(palavras);

palavras.unshift("Gato");// no começo do array
console.log(palavras);

//Remover elementos d array
 palavras.pop()// remove o ultim elemento
 console.log(palavras);

 palavras.shift() //remove o primeiro elemento
 console.log(palavras);

 //Foreach - repetição em um vetor
 palavras.forEach(palavra => {
    console.log(palavra);
 });

 //Splice

 palavras.splice(1, 1);

 //Manipulação de arrays 
let numerosDobro = numeros.map(x => x * 10);
console.log(numerosDobro);