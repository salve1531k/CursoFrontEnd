//criar a rota api de login

import { autenticaUsuario } from "@/controllers/UsuarioController";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("JWT_SECRETE não está definida nas variáveis locais");
}

export async function POST(req: Request){
    try {
        const{username, password} = await req.json();
        // validar os dados 
        if(!username || !password){
            return NextResponse.json({success:false, error: "Usuário e Senha são Obrigatórios"});
        }
        // método de autenticação
        const usuario = await autenticaUsuario(username, password);
        if(!usuario){
            return NextResponse.json({success:false, error: "Usuário ou Senha inválidos"});
        }
        // criar o Token JWT
        const token = jwt.sign(
            {id: usuario._id, username: usuario.username, tipo: usuario.tipo},
            JWT_SECRET,
            { expiresIn: "8h"}
        );
        //retornar o token
        return NextResponse.json({success:true, token});

    } catch (error) {
        return NextResponse.json({success:false, error: "Erro no servidor"}, {status:500});
    }
}