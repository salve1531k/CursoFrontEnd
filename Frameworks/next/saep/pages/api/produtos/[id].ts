import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../lib/dbConnect';
import Produto from '../../../lib/models/Produto';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const produto = await Produto.findById(id);
        if (!produto) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(produto);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;

    case 'PUT':
      try {
        const { nome, descricao, categoria, preco, estoque_atual, estoque_minimo, unidade } = req.body;

        const produto = await Produto.findByIdAndUpdate(
          id,
          {
            nome,
            descricao,
            categoria,
            preco: Number(preco),
            estoque_atual: Number(estoque_atual),
            estoque_minimo: Number(estoque_minimo),
            unidade,
          },
          { new: true, runValidators: true }
        );

        if (!produto) {
          return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(produto);
      } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
      }
      break;

    case 'DELETE':
      try {
        const produto = await Produto.findByIdAndDelete(id);
        if (!produto) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
