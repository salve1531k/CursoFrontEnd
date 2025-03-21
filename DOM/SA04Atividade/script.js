
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário enquanto validamos os campos

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let telefone = document.getElementById('telefone').value;
    let idade = document.getElementById('idade').value;
    let mensagemDiv = document.getElementById('mensagem');

    // Limpa a mensagem de erro ou sucesso
    mensagemDiv.style.display = 'none';
    mensagemDiv.classList.remove('erro', 'sucesso');
    mensagemDiv.textContent = '';

    // Validação dos campos
    if (!nome || !email || !senha || !telefone || !idade) {
        mensagemDiv.style.display = 'block';
        mensagemDiv.classList.add('erro');
        mensagemDiv.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Validação do formato do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        mensagemDiv.style.display = 'block';
        mensagemDiv.classList.add('erro');
        mensagemDiv.textContent = 'Por favor, insira um e-mail válido.';
        return;
    }

    // Validação do telefone (aqui está uma validação simples para 10 ou 11 dígitos)
    const telefoneRegex = /^\d{10,11}$/;
    if (!telefoneRegex.test(telefone)) {
        mensagemDiv.style.display = 'block';
        mensagemDiv.classList.add('erro');
        mensagemDiv.textContent = 'Por favor, insira um telefone válido.';
        return;
    }

    // Validação da idade
    if (idade < 18) {
        mensagemDiv.style.display = 'block';
        mensagemDiv.classList.add('erro');
        mensagemDiv.textContent = 'A idade mínima é 18 anos.';
        return;
    }

    // Se todos os campos estão corretos
    mensagemDiv.style.display = 'block';
    mensagemDiv.classList.add('sucesso');
    mensagemDiv.textContent = 'Formulário enviado com sucesso!';
});
