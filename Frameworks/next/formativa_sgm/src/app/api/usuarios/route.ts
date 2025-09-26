import { NextRequest } from 'next/server';
import { UsuarioController } from '@/controllers/UsuarioController';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        return UsuarioController.getById(request, id);
    }
    return UsuarioController.getAll(request);
}

export async function POST(request: NextRequest) {
    return UsuarioController.create(request);
}

export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return UsuarioController.update(request, id);
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return UsuarioController.delete(request, id);
}
