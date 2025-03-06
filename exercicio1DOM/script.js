function alterarTexto() {
    document.getElementById("titulo").innerText = 'Texto alterado!';
    document.getElementById("descricao").innerText = 'Texto alterado!';
}

function alterarCor() {
    document.body.style.background = "blue";
    
}
function voltarCor() {
    document.body.style.background = "white";
}

// getElementByid - seleção do elemento pelo id

let titulo = document.getElementById("titulo");
titulo.style.color = "blue";

let paragrafos = document.getElementsByClassName("descricao");

paragrafos[0].style.color = "red";
paragrafos[1].style.fontWeight = "bold";
paragrafos[2].style.color = "green";


let todosParagrafos = document.getElementsByTagName("p");
console.log(todosParagrafos.length);

let primeirodescricao = document.querySelector("descricao");
primeirodescricao.style.color= "red";

let ps = document.querySelector("p");
ps.forEach(p=> p.style.fontSize = "18px");


