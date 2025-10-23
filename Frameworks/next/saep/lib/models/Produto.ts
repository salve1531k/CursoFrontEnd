import mongoose from 'mongoose';

const ProdutoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
    min: 0,
  },
  estoque_atual: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  estoque_minimo: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  unidade: {
    type: String,
    required: true,
    default: 'unidade',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema);
