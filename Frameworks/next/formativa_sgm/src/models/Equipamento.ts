import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEquipamento extends Document {
    _id: string;
    nome: string;
    descricao: string;
    status: string;
}

const EquipamentoSchema: Schema<IEquipamento> = new Schema({
    nome: { type: String, required: true, unique: true },
    descricao: { type: String, required: true },
    status: { type: String, enum: ["ativo", "inativo"], default: "ativo" }
}, {
    timestamps: true
});

const Equipamento: Model<IEquipamento> = mongoose.models.Equipamento || mongoose.model<IEquipamento>("Equipamento", EquipamentoSchema);

export default Equipamento;
