import { NextRequest, NextResponse } from 'next/server';
import { OrdemServicoService } from '../services/OrdemServicoService';

export class OrdemServicoController {
    static async getAll(request: NextRequest) {
        try {
            const ordens = await OrdemServicoService.getAllOrdens();
            return NextResponse.json(ordens);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch ordens' }, { status: 500 });
        }
    }

    static async getById(request: NextRequest, id: string) {
        try {
            const ordem = await OrdemServicoService.getOrdemById(id);
            if (!ordem) {
                return NextResponse.json({ error: 'OrdemServico not found' }, { status: 404 });
            }
            return NextResponse.json(ordem);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch ordem' }, { status: 500 });
        }
    }

    static async create(request: NextRequest) {
        try {
            const data = await request.json();
            const ordem = await OrdemServicoService.createOrdem(data);
            return NextResponse.json(ordem, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to create ordem' }, { status: 500 });
        }
    }

    static async update(request: NextRequest, id: string) {
        try {
            const data = await request.json();
            const ordem = await OrdemServicoService.updateOrdem(id, data);
            if (!ordem) {
                return NextResponse.json({ error: 'OrdemServico not found' }, { status: 404 });
            }
            return NextResponse.json(ordem);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to update ordem' }, { status: 500 });
        }
    }

    static async delete(request: NextRequest, id: string) {
        try {
            const deleted = await OrdemServicoService.deleteOrdem(id);
            if (!deleted) {
                return NextResponse.json({ error: 'OrdemServico not found' }, { status: 404 });
            }
            return NextResponse.json({ message: 'OrdemServico deleted successfully' });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to delete ordem' }, { status: 500 });
        }
    }
}
