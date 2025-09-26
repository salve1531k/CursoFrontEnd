import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrdemServico extends Document {
    _id: string;
    titulo: string;
    descricao: string;
    equipamento: mongoose.Types.ObjectId;
    atribuidoPara: mongoose.Types.ObjectId;
    status: string;
}

const OrdemServicoSchema: Schema<IOrdemServico> = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    equipamento: { type: Schema.Types.ObjectId, ref: 'Equipamento', required: true },
    atribuidoPara: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    status: { type: String, enum: ["aberta", "em andamento", "concluida"], default: "aberta" }
}, {
    timestamps: true
});

const OrdemServico: Model<IOrdemServico> = mongoose.models.OrdemServico || mongoose.model<IOrdemServico>("OrdemServico", OrdemServicoSchema);

export default OrdemServico;
