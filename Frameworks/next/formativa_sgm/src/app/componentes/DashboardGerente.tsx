"use-client";

import { IOrdemServico } from "@/models/OrdemServico";
import { useEffect, useState } from "react";

export default function DashboardGerente(){
    const [ordens, setOrdens] = useState<IOrdemServico[]>([]);

    useEffect(()=>{
        fetchOrdens();
    }, []);

    const fetchOrdens = async () =>{
        try {
            const resposta = await fetch("/api/ordens");
            const data = await resposta.json();
            setOrdens(data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h3>Ordens de Serviço</h3>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Equipamento</th>
                        <th>Atribuído Para</th>
                        <th>Data Solicitação</th>
                        <th>Data Finalização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ordens.map((ordem)=>(
                        <tr key={ordem._id}>
                            <td>{ordem.titulo}</td>
                            <td>{ordem.descricao}</td>
                            <td>{ordem.status}</td>
                            <td>{(ordem.equipamento as any)?.nome || 'N/A'}</td>
                            <td>{(ordem.atribuidoPara as any)?.username || 'N/A'}</td>
                            <td>{ordem.createdAt ? new Date(ordem.createdAt).toLocaleDateString() : 'N/A'}</td>
                            <td>{ordem.status === 'concluida' && ordem.updatedAt ? new Date(ordem.updatedAt).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                {ordem.status !== 'concluida' && <button>Finalizar Serviço</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
