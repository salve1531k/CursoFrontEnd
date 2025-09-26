import connectMongo from './mongodb';
import Usuario, { IUsuario } from '../models/Usuario';

export class UsuarioService {
    static async getAllUsuarios(): Promise<IUsuario[]> {
        await connectMongo();
        return Usuario.find().select('-password');
    }

    static async getUsuarioById(id: string): Promise<IUsuario | null> {
        await connectMongo();
        return Usuario.findById(id).select('-password');
    }

    static async createUsuario(data: Partial<IUsuario>): Promise<IUsuario> {
        await connectMongo();
        const usuario = new Usuario(data);
        return usuario.save();
    }

    static async updateUsuario(id: string, data: Partial<IUsuario>): Promise<IUsuario | null> {
        await connectMongo();
        return Usuario.findByIdAndUpdate(id, data, { new: true }).select('-password');
    }

    static async deleteUsuario(id: string): Promise<boolean> {
        await connectMongo();
        const result = await Usuario.findByIdAndDelete(id);
        return !!result;
    }
}
