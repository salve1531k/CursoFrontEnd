//PUT e DELETE que usam ID para fazer as requisições http

import { deleteTarefa, updateTArefa } from "@/controllers/tarefaController";
import { error } from "console";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

interface Parametros{
    id:string
}

//params -> Next prescisa dos Params para dar acesso ao segmento da url
//params.id => "/api/tarefas/123" => Trasnforma os params em endereço URL
export async function PATCH(req:NextRequest, {params}: {params: Parametros}){
    try {
        const {id} = params;
        const data = await req.json();
        const tarefaAtualizada = await updateTArefa(id, data);
        // Correção: retorna 404 se NÃO encontrar a tarefa
        if(!tarefaAtualizada){
            return NextResponse.json({sucess: false, error: "Not Found"}, {status: 404});
        }
        return NextResponse.json({sucess: true, data: tarefaAtualizada}, {status: 200});
    } catch (error) {
        return NextResponse.json({
            sucess: false,
            error: `Falha ao Atualizar a Tarefa: ${error}`
        }, {status: 500});
    }
}

//DELETE
export async function DELETE(req:NextRequest, {params}: {params: Parametros}){
    try {
        const {id} = params;
        const resultado = await deleteTarefa(id);
        //duas respostas
        if(!resultado){
            return NextResponse.json({sucess: false, error: "Not Found"}, {status: 404});
        }
        return NextResponse.json({sucess: true, data: "Tarefa Deletada com Sucesso!"}, {status: 200});
    } catch (error) {
        return NextResponse.json({
            sucess: false,
            error: `Falha ao Deletar a Tarefa: ${error}`
        }, {status: 500});
    }
}