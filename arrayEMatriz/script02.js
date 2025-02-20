//Operações avançadas em vetores (arrays)

//filtros
let numeros = [10, 20, 30, 40, 50];

let nuMaior20 = numeros.filter(x => x> 20);

console.log (nuMaior20);

// Reduce
let soma = numeros.reduce((acumulador, valorAtual) => acumulador += valorAtual, 0);
console.log(soma);

//sort (organizador)

let aleatorio = [2, 5, 1, 3, 8, 6, 9, 0, 7, 4]
aleatorio.sort();
console.log(aleatorio);