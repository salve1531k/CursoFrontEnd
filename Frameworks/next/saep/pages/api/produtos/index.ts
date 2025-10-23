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

  switch (req.method) {
    case 'GET':
      try {
        const { search = '' } = req.query;
        const produtos = await Produto.find({
          nome: { $regex: search, $options: 'i' },
        }).sort({ nome: 1 });
        res.status(200).json(produtos);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    case 'POST':
      try {
        const { nome, descricao, categoria, preco, estoque_atual, estoque_minimo, unidade } = req.body;

        if (!nome || !descricao || !categoria || preco === undefined || estoque_atual === undefined || estoque_minimo === undefined) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        const produto = new Produto({
          nome,
          descricao,
          categoria,
          preco: Number(preco),
          estoque_atual: Number(estoque_atual),
          estoque_minimo: Number(estoque_minimo),
          unidade,
        });

        await produto.save();
        res.status(201).json(produto);
      } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
