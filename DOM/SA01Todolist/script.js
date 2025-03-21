// Usar o dom para adicionar um evento no html
document.getElementById("btnAdicionar").addEventListener(
    "click", adicionarTarefa);

function adicionarTarefa() {
    let input = document.getElementById("tarefa");
    let texto = input.value.trim();
    
    if (texto === "") {
        return; // Interrompe a função
    }
    // continuar o código se o texto não for vazio ""
    let li = document.createElement("li"); // criando um elemento de lista
    li.innerHTML = texto + '<button onclick="removerTarefa(this)">Remover</button>';
    
    let ul = document.getElementById("lista");
    ul.appendChild(li); // adicionar o item à lista

    input.value = "";
}
//Função do botão para remover o elemento pai(parent) (li)
function removerTarefa(botao) {
    let li = botao.parentElement.remove();
}

document.getElementById("mudarCor").addEventListener("click", function() {
    let cores = ["red", "blue", "green", "purple", "orange"];
    document.body.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
});
