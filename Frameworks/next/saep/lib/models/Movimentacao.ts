import mongoose from 'mongoose';

const MovimentacaoSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    required: true,
  },
  tipo: {
    type: String,
    enum: ['entrada', 'saida'],
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  observacao: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Movimentacao || mongoose.model('Movimentacao', MovimentacaoSchema);
