import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../lib/dbConnect';
import Movimentacao from '../../../lib/models/Movimentacao';
import Produto from '../../../lib/models/Produto';
import Usuario from '../../../lib/models/Usuario';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const movimentacoes = await Movimentacao.find()
          .populate('produto', 'nome')
          .populate('usuario', 'name')
          .sort({ data: -1 });
        res.status(200).json(movimentacoes);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching movements' });
      }
      break;

    case 'POST':
      try {
        const { produtoId, tipo, quantidade, observacao } = req.body;

        if (!produtoId || !tipo || !quantidade) {
          return res.status(400).json({ message: 'Product ID, type, and quantity are required' });
        }

        const produto = await Produto.findById(produtoId);
        if (!produto) {
          return res.status(404).json({ message: 'Product not found' });
        }

        let novoEstoque = produto.estoque_atual;

        if (tipo === 'entrada') {
          novoEstoque += Number(quantidade);
        } else if (tipo === 'saida') {
          if (produto.estoque_atual < Number(quantidade)) {
            return res.status(400).json({ message: 'Insufficient stock' });
          }
          novoEstoque -= Number(quantidade);
        } else {
          return res.status(400).json({ message: 'Invalid movement type' });
        }

        // Update product stock
        await Produto.findByIdAndUpdate(produtoId, { estoque_atual: novoEstoque });

        // Create movement record
        const movimentacao = new Movimentacao({
          produto: produtoId,
          tipo,
          quantidade: Number(quantidade),
          usuario: session.user.id,
          observacao: observacao || '',
        });

        await movimentacao.save();

        const populatedMovimentacao = await Movimentacao.findById(movimentacao._id)
          .populate('produto', 'nome')
          .populate('usuario', 'name');

        res.status(201).json(populatedMovimentacao);
      } catch (error) {
        res.status(500).json({ message: 'Error creating movement' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
