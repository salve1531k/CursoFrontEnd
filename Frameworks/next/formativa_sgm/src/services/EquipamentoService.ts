import connectMongo from './mongodb';
import Equipamento, { IEquipamento } from '../models/Equipamento';

export class EquipamentoService {
    static async getAllEquipamentos(): Promise<IEquipamento[]> {
        await connectMongo();
        return Equipamento.find();
    }

    static async getEquipamentoById(id: string): Promise<IEquipamento | null> {
        await connectMongo();
        return Equipamento.findById(id);
    }

    static async createEquipamento(data: Partial<IEquipamento>): Promise<IEquipamento> {
        await connectMongo();
        const equipamento = new Equipamento(data);
        return equipamento.save();
    }

    static async updateEquipamento(id: string, data: Partial<IEquipamento>): Promise<IEquipamento | null> {
        await connectMongo();
        return Equipamento.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteEquipamento(id: string): Promise<boolean> {
        await connectMongo();
        const result = await Equipamento.findByIdAndDelete(id);
        return !!result;
    }
}
