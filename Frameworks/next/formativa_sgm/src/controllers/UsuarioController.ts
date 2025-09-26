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
            const usuario = await UsuarioService.createUsuario(data);
            return NextResponse.json(usuario, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to create usuario' }, { status: 500 });
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
