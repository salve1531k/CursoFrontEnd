import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
