import "./App.css";

import { useState } from "react";
import Form from "./componentes/Form";
import List from "./componentes/List";

const App = () => {
  //Logíca do componente
  const [tarefas, setTarefas] = useState([]);
  //Estado para armazenar a lista de tarefas

  const addTarefa = (tarefa) => {
    setTarefas([...tarefas, tarefa]);
    //adiciona  nova tarefa ao array de tarefas,
    //...tarefas => copia todas as anteriores + a nova
  }

  const removerTarefas = (index) => {
    setTarefas(tarefas.filter((_,i)=> i !== index));
    //cria um novo vetor sem uma tarefa qu quero remover
    //Filtra o Array, removendo a posição index
};

//View do componente
return(
  <div>
    <h1>To-do-List App</h1>
    <Form addTarefa={addTarefa} />
    <List tarefas={tarefas} removerTarefas={removerTarefas} />
  </div>
);

};

export default App;