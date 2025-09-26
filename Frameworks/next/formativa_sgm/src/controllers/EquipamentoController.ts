import { NextRequest, NextResponse } from 'next/server';
import { EquipamentoService } from '../services/EquipamentoService';

export class EquipamentoController {
    static async getAll(request: NextRequest) {
        try {
            const equipamentos = await EquipamentoService.getAllEquipamentos();
            return NextResponse.json(equipamentos);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch equipamentos' }, { status: 500 });
        }
    }

    static async getById(request: NextRequest, id: string) {
        try {
            const equipamento = await EquipamentoService.getEquipamentoById(id);
            if (!equipamento) {
                return NextResponse.json({ error: 'Equipamento not found' }, { status: 404 });
            }
            return NextResponse.json(equipamento);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch equipamento' }, { status: 500 });
        }
    }

    static async create(request: NextRequest) {
        try {
            const data = await request.json();
            const equipamento = await EquipamentoService.createEquipamento(data);
            return NextResponse.json(equipamento, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to create equipamento' }, { status: 500 });
        }
    }

    static async update(request: NextRequest, id: string) {
        try {
            const data = await request.json();
            const equipamento = await EquipamentoService.updateEquipamento(id, data);
            if (!equipamento) {
                return NextResponse.json({ error: 'Equipamento not found' }, { status: 404 });
            }
            return NextResponse.json(equipamento);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to update equipamento' }, { status: 500 });
        }
    }

    static async delete(request: NextRequest, id: string) {
        try {
            const deleted = await EquipamentoService.deleteEquipamento(id);
            if (!deleted) {
                return NextResponse.json({ error: 'Equipamento not found' }, { status: 404 });
            }
            return NextResponse.json({ message: 'Equipamento deleted successfully' });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to delete equipamento' }, { status: 500 });
        }
    }
}
