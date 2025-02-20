// Funções de string(Texto)

var texto = "Aula de Javascript";

console.log(texto.length);// Contar numero de caracteres

console.log(texto.toLocaleUpperCase());//Tudo maisculo

console.log(texto.toLocaleLowerCase());//Tudo minusculo

//manipulação de texto
console.log(texto.substring(0,4)); //Aula

console.log(texto.slice(-10));//JavaScript

console.log(texto.replace("Javascript","TypeScript"));//TypeScript

//Split (usar um caracter em comum para separar um vetor)
let linguagem = "Javascripr, C++ Python, Java, PHP";
let arrayLinguagens = linguagem.split(",")
console.log(arrayLinguagens);

//Trin

let tesoura = "  Javascript  ";
console.log(tesoura.trim());