'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Produto {
  _id: string;
  nome: string;
  estoque_atual: number;
  unidade: string;
}

interface Movimentacao {
  _id: string;
  produto: { nome: string };
  tipo: 'entrada' | 'saida';
  quantidade: number;
  usuario: { name: string };
  data: string;
  observacao: string;
}

export default function EstoquePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    tipo: 'entrada',
    quantidade: '',
    observacao: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const [produtosRes, movimentacoesRes] = await Promise.all([
        fetch('/api/produtos'),
        fetch('/api/movimentacoes'),
      ]);

      if (produtosRes.ok) {
        const produtosData = await produtosRes.json();
        setProdutos(produtosData);
      }

      if (movimentacoesRes.ok) {
        const movimentacoesData = await movimentacoesRes.json();
        setMovimentacoes(movimentacoesData);
      }
    } catch (error) {
      toast.error('Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduto) return;

    try {
      const response = await fetch('/api/movimentacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produtoId: selectedProduto._id,
          tipo: formData.tipo,
          quantidade: parseInt(formData.quantidade),
          observacao: formData.observacao,
        }),
      });

      if (response.ok) {
        toast.success('Movimentação registrada!');
        setShowModal(false);
        setSelectedProduto(null);
        resetForm();
        fetchData();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erro ao registrar movimentação');
      }
    } catch (error) {
      toast.error('Erro ao registrar movimentação');
    }
  };

  const resetForm = () => {
    setFormData({
      tipo: 'entrada',
      quantidade: '',
      observacao: '',
    });
  };

  const openModal = (produto: Produto) => {
    setSelectedProduto(produto);
    resetForm();
    setShowModal(true);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-indigo-600 hover:text-indigo-900"
              >
                ← Voltar ao Dashboard
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">Olá, {session.user?.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Produtos */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Produtos em Estoque
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {produtos.map((produto) => (
                  <li key={produto._id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {produto.nome}
                          </p>
                          <p className="text-sm text-gray-500">
                            Estoque: {produto.estoque_atual} {produto.unidade}
                          </p>
                        </div>
                        <button
                          onClick={() => openModal(produto)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Movimentar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Histórico de Movimentações */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Histórico de Movimentações
                </h3>
              </div>
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {movimentacoes.map((mov) => (
                  <li key={mov._id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {mov.produto.nome}
                          </p>
                          <p className="text-sm text-gray-500">
                            {mov.tipo === 'entrada' ? '+' : '-'}{mov.quantidade} | {mov.usuario.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(mov.data).toLocaleString('pt-BR')}
                          </p>
                          {mov.observacao && (
                            <p className="text-xs text-gray-500 italic">
                              {mov.observacao}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            mov.tipo === 'entrada'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showModal && selectedProduto && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Movimentar Estoque - {selectedProduto.nome}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Estoque atual: {selectedProduto.estoque_atual} {selectedProduto.unidade}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Movimentação</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'entrada' | 'saida' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Observação (opcional)</label>
                  <textarea
                    value={formData.observacao}
                    onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
