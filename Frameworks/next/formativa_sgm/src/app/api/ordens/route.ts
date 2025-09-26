import { NextRequest } from 'next/server';
import { OrdemServicoController } from '@/controllers/OrdemServicoController';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        return OrdemServicoController.getById(request, id);
    }
    return OrdemServicoController.getAll(request);
}

export async function POST(request: NextRequest) {
    return OrdemServicoController.create(request);
}

export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return OrdemServicoController.update(request, id);
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return OrdemServicoController.delete(request, id);
}
