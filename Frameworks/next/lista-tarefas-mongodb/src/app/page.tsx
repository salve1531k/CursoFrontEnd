
//índica que é a tela usada pelo cliente-side
"use client";

import { Itarefa } from "@/models/Tarefa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home(){
  //useState => Armazenamento no localStorage
  const [tarefas, setTarefas] = useState<Itarefa[]>([]);
  const [newTarefa, SetNewTarefa] = useState<string>("");

  //useEffect => usado para executar códigos ligados a renderização do componente no cliente-side
  useEffect(()=> {
    // fazer o useeffect no carregamento da tela
    fetchTarefas();//carregar todas as tarefas do banco de Dados
  }, []);

  //carregar Tarefas
  const fetchTarefas = async () =>{
    try {
      const listaTarefas = await fetch("/api/tarefas"); //realiza a conexão http com o backend
      const data = await listaTarefas.json(); //verifica se esta em json
      if(data.sucess){
        setTarefas(data.data);//preenche o vetor localStorage com as info do BD
      }
    } catch (error) {
      console.error(error);
    }
  }

  //add Tarefa
  const addTarefa = async(e:FormEvent) =>{
    e.preventDefault(); //evita o carregamento da tela ao aperta o botão submmit
    if(!newTarefa.trim()) return; // não adiciona tarefa vazia
    try {
      const resultado = await fetch("/api/tarefas",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({titulo:newTarefa})
      });
      const data = await resultado.json();
      if(data.sucess){
        //fecthTarefas();
        setTarefas([...tarefas, data.data]); //adiciona a nova tarefa no vetor 
        SetNewTarefa("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //updateTarefa (toggle concluída)
  const updateTarefa = async(id: string, concluida: boolean) => {
    try {
      const resultado = await fetch(`/api/tarefas/${id}`, {
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ concluida: !concluida })
      });
      const data = await resultado.json();
      if(data.sucess){
        setTarefas(tarefas.map(tarefa => tarefa._id === id ? data.data : tarefa));
      }
    } catch (error) {
      console.error(error);
    }
  }

  //deleteTarefa
  const deleteTarefa = async(id: string) => {
    try {
      const resultado = await fetch(`/api/tarefas/${id}`, {
        method: "DELETE"
      });
      const data = await resultado.json();
      if(data.sucess){
        setTarefas(tarefas.filter(tarefa => tarefa._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }


  //html => ReactDOM
  return(
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0002", padding: 32 }}>
      <h1 style={{ textAlign: "center", color: "#2d3748", marginBottom: 24 }}>Lista de Tarefas</h1>
      <form onSubmit={addTarefa} style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input 
          type="text"
          value={newTarefa}
          onChange={(e:ChangeEvent<HTMLInputElement>)=> SetNewTarefa(e.target.value)}
          placeholder="Nova Tarefa"
          style={{ flex: 1, padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 16 }}
        />
        <button type="submit" style={{ background: "#3182ce", color: "#fff", border: "none", borderRadius: 6, padding: "10px 18px", fontWeight: 600, cursor: "pointer", fontSize: 16 }}>
          Adicionar Tarefa
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tarefas.map((tarefa) => (
          <li key={tarefa._id.toString()} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: tarefa.concluida ? "#e2e8f0" : "#f7fafc", borderRadius: 8, marginBottom: 12, padding: "12px 16px", boxShadow: "0 1px 4px #0001" }}>
            <span style={{ textDecoration: tarefa.concluida ? "line-through" : "none", color: tarefa.concluida ? "#718096" : "#2d3748", fontSize: 17, fontWeight: 500 }}>
              {tarefa.titulo}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => updateTarefa(tarefa._id, tarefa.concluida)}
                style={{ background: tarefa.concluida ? "#ecc94b" : "#38a169", color: "#fff", border: "none", borderRadius: 6, padding: "7px 14px", fontWeight: 500, cursor: "pointer", fontSize: 15 }}
              >
                {tarefa.concluida ? "Desfazer" : "Concluir"}
              </button>
              <button
                onClick={() => deleteTarefa(tarefa._id)}
                style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "7px 14px", fontWeight: 500, cursor: "pointer", fontSize: 15 }}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}
