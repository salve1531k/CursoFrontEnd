import connectMongo from './mongodb';
import OrdemServico, { IOrdemServico } from '../models/OrdemServico';

export class OrdemServicoService {
    static async getAllOrdens(): Promise<IOrdemServico[]> {
        await connectMongo();
        return OrdemServico.find().populate('equipamento').populate('atribuidoPara', '-password');
    }

    static async getOrdemById(id: string): Promise<IOrdemServico | null> {
        await connectMongo();
        return OrdemServico.findById(id).populate('equipamento').populate('atribuidoPara', '-password');
    }

    static async createOrdem(data: Partial<IOrdemServico>): Promise<IOrdemServico> {
        await connectMongo();
        const ordem = new OrdemServico(data);
        return ordem.save();
    }

    static async updateOrdem(id: string, data: Partial<IOrdemServico>): Promise<IOrdemServico | null> {
        await connectMongo();
        return OrdemServico.findByIdAndUpdate(id, data, { new: true }).populate('equipamento').populate('atribuidoPara', '-password');
    }

    static async deleteOrdem(id: string): Promise<boolean> {
        await connectMongo();
        const result = await OrdemServico.findByIdAndDelete(id);
        return !!result;
    }
}
