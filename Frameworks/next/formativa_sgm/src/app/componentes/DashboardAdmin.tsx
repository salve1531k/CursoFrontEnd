"use-client";

import { IOrdemServico } from "@/models/OrdemServico";
import { IUsuario } from "@/models/Usuario";
import { IEquipamento } from "@/models/Equipamento";
import { useEffect, useState } from "react";

export default function DashboardAdmin(){
    const [ordens, setOrdens] = useState<IOrdemServico[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [equipamentos, setEquipamentos] = useState<IEquipamento[]>([]);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () =>{
        try {
            const [ordensRes, usuariosRes, equipamentosRes] = await Promise.all([
                fetch("/api/ordens"),
                fetch("/api/usuarios"),
                fetch("/api/equipamentos")
            ]);

            const ordensData = await ordensRes.json();
            const usuariosData = await usuariosRes.json();
            const equipamentosData = await equipamentosRes.json();

            setOrdens(ordensData);
            setUsuarios(usuariosData);
            setEquipamentos(equipamentosData);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h3>Dashboard Admin</h3>

            <section>
                <h4>Usuários</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario)=>(
                            <tr key={usuario._id}>
                                <td>{usuario.username}</td>
                                <td>{usuario.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h4>Ordens de Serviço</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Status</th>
                            <th>Atribuído Para</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordens.map((ordem)=>(
                            <tr key={ordem._id}>
                                <td>{ordem.titulo}</td>
                                <td>{ordem.status}</td>
                                <td>{(ordem.atribuidoPara as any)?.username || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h4>Equipamentos</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipamentos.map((equip)=>(
                            <tr key={equip._id}>
                                <td>{equip.nome}</td>
                                <td>{equip.descricao}</td>
                                <td>{equip.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
