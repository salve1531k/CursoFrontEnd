//componete para criar formulario para inserir uma nova tarefa
//função para asicionar tarefa (arrow function)
import "./Form.css"; //Importa a estilização

import { useState } from "react";

const Form = ({addTarefa}) => {
    // vetor para armazenar o valor do input -> useState
    const [tarefa, seTarefa] = useState("");
    // UseState => usa a memoria local do navegador 
    // para armazenar as mudanças de estado
    //primeiro elemento do [] armazena as tarefas,
    // segundo elemento armazena as mudanças de estado

    //função para atualizar o estado com o valor do input
    //função vai criar uma nova tarefa ao ser clicado  o botão submit
    const handleSubmit = (e) => {//arrowFunction
        //impedir o funcionamento padrão do botão submit
        e.preventDefault();//Não permitir o recarregamento da página
        // Verificar se o campo está vazio
        if (tarefa.trim() !== "") {
        //adicionar tarefa ao vetor de tarefas
        addTarefa(tarefa);
        //Limpo o campo do Input
        seTarefa("");
        }
    };
    //Logica por tras do design
    //view
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={tarefa}
                onChange={(e) => seTarefa(e.target.value)}
                placeholder="Adicione uma nova tarefa"
            />
            <button className="btnEnviar">
                Adicionar
                </button>
        </form>
    );

};

export default Form;
//componente cria o formulário das tarefas
//pode ser reutilizado em outros componentes da aplicação (export)

