//Rotas que não prescisam expecificar o id

import { createTarefa, getAllTarefas } from "@/controllers/tarefaController";
import { NextRequest, NextResponse } from "next/server";

//GET
export async function GET(){
    try {
        const tarefas = await getAllTarefas();
        return NextResponse.json({sucess: true, data: tarefas}); {status: 200}
    } catch (error) {
        return NextResponse.json({
            sucess: false,
            error: `Erro ao Buscar as Tarefas: ${error}`
        }, {status: 500});
        
    }
}

//POST
export async function POST(req:NextRequest){
    try {
        const data = await req.json();//verifico se esta escrito em formato json
        const newTarefa = await createTarefa(data);
        return NextResponse.json({sucess: true, data: newTarefa}, {status: 201});
    } catch (error) {
        return NextResponse.json({
            sucess: false,
            error: `Falha ao inserir a Tarefa: ${error}`
        }, {status: 500});
        
    }
}