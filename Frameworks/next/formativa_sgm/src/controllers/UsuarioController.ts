import { NextRequest, NextResponse } from 'next/server';
import { UsuarioService } from '../services/UsuarioService';

export class UsuarioController {
    static async getAll(request: NextRequest) {
        try {
            const usuarios = await UsuarioService.getAllUsuarios();
            return NextResponse.json(usuarios);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch usuarios' }, { status: 500 });
        }
    }

    static async getById(request: NextRequest, id: string) {
        try {
            const usuario = await UsuarioService.getUsuarioById(id);
            if (!usuario) {
                return NextResponse.json({ error: 'Usuario not found' }, { status: 404 });
            }
            return NextResponse.json(usuario);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch usuario' }, { status: 500 });
        }
    }

    static async create(request: NextRequest) {
        try {
            const data = await request.json();
            if (!data.username || !data.password || !data.tipo) {
                return NextResponse.json({ success: false, error: "Preencha todos os campos" }, { status: 400 });
            }
            // Verifica se já existe
            const exists = await UsuarioService.getAllUsuarios();
            if (exists.some(u => u.username === data.username)) {
                return NextResponse.json({ success: false, error: "Usuário já existe" }, { status: 409 });
            }
            const usuario = await UsuarioService.createUsuario(data);
            return NextResponse.json({ success: true, data: { id: usuario._id, username: usuario.username, tipo: usuario.tipo } }, { status: 201 });
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error);
            let msg = 'Erro ao cadastrar usuário';
            if (error?.message) msg = error.message;
            if (error?.code === 11000) msg = 'Usuário já existe';
            return NextResponse.json({ success: false, error: msg }, { status: 500 });
        }
    }

    static async update(request: NextRequest, id: string) {
        try {
            const data = await request.json();
            const usuario = await UsuarioService.updateUsuario(id, data);
            if (!usuario) {
                return NextResponse.json({ error: 'Usuario not found' }, { status: 404 });
            }
            return NextResponse.json(usuario);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to update usuario' }, { status: 500 });
        }
    }

    static async delete(request: NextRequest, id: string) {
        try {
            const deleted = await UsuarioService.deleteUsuario(id);
            if (!deleted) {
                return NextResponse.json({ error: 'Usuario not found' }, { status: 404 });
            }
            return NextResponse.json({ message: 'Usuario deleted successfully' });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to delete usuario' }, { status: 500 });
        }
    }
}
