//Rotas que Precisam do ID ( PATCH ou PUT. DELETE, GET(one))

import { UsuarioService } from "@/services/UsuarioService";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Parametro{
    id:string;
}

//PATCH
export async function PATCH(req: NextRequest, {params}:{params:Parametro}){
    try {
        const {id} = params;
        const data = await req.json();
        const usuarioAtualizado = await UsuarioService.updateUsuario(id, data);
        if(!usuarioAtualizado){
            return NextResponse.json({success:false, error: "Not Found"});
        }
        return NextResponse.json({success:true, data:usuarioAtualizado});
    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
}

//GET(one)
export async function GET ({params}:{params:Parametro}){
    try {
        const {id} = params;
        const data = await UsuarioService.getUsuarioById(id);
        if(!data){
            return NextResponse.json({success:false, error: "Not Found"});
        }
        return NextResponse.json({success:true, data:data});
    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
}

//DELETE
export async function DELETE({params}:{params:Parametro}) {
    try {
        const {id} = params;
        await UsuarioService.deleteUsuario(id);
        return NextResponse.json({success: true, data:{}});

    } catch (error) {
        return NextResponse.json({success:false, error:error});        
    }
}
