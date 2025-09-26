import { NextRequest } from 'next/server';
import { EquipamentoController } from '@/controllers/EquipamentoController';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        return EquipamentoController.getById(request, id);
    }
    return EquipamentoController.getAll(request);
}

export async function POST(request: NextRequest) {
    return EquipamentoController.create(request);
}

export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return EquipamentoController.update(request, id);
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return EquipamentoController.delete(request, id);
}
