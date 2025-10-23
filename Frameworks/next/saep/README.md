# Sistema de Gestão de Estoque de Ferramentas Manuais

Olá! Bem-vindo ao nosso sistema completo de gestão de estoque, criado especialmente para quem trabalha com ferramentas manuais. Imagine ter tudo o que você precisa para controlar seu inventário de forma simples, rápida e eficiente - é exatamente isso que construímos aqui!

## O que este sistema faz por você

Nosso sistema foi desenvolvido pensando na praticidade do dia a dia. Com ele, você pode:

- Entrar e se registrar de forma segura e rápida
- Gerenciar produtos - adicionar, editar, buscar e organizar tudo
- Controlar o estoque - entrada e saída com atualização automática
- Receber alertas quando o estoque estiver baixo
- Acompanhar histórico de todas as movimentações
- Usar em qualquer dispositivo - desktop, tablet ou celular

##  Arquitetura do Sistema

### Diagrama de Classes

```mermaid
classDiagram
    class Usuario {
        +ObjectId _id
        +String name
        +String email
        +String password
        +String role
        +Date createdAt
        +Date updatedAt
        +registrar()
        +autenticar()
    }

    class Produto {
        +ObjectId _id
        +String nome
        +String descricao
        +String categoria
        +Number preco
        +Number estoque_atual
        +Number estoque_minimo
        +String unidade
        +Date createdAt
        +Date updatedAt
        +verificarEstoqueBaixo()
    }

    class Movimentacao {
        +ObjectId _id
        +ObjectId produto
        +String tipo
        +Number quantidade
        +ObjectId usuario
        +Date data
        +String observacao
        +Date createdAt
        +Date updatedAt
        +registrarMovimento()
    }

    Usuario ||--o{ Movimentacao : realiza
    Produto ||--o{ Movimentacao : possui
    Produto --> Usuario : criado_por
```

### Tecnologias que usamos

Escolhemos as melhores ferramentas disponíveis para criar um sistema robusto e moderno:

- Next.js 16 + React 19: A combinação perfeita para aplicações web rápidas
- TypeScript: Código mais seguro e fácil de manter
- MongoDB 7.x + Mongoose: Banco de dados flexível e poderoso
- NextAuth.js: Autenticação profissional e segura
- Tailwind CSS: Design bonito e responsivo sem complicação
- React Hot Toast: Notificações elegantes e intuitivas
- bcryptjs: Senhas protegidas com criptografia forte

##  Estrutura do Projeto

```
saep/
├── app/                          # Next.js App Router
│   ├── login/                    # Página de login/registro
│   ├── dashboard/                # Dashboard principal
│   ├── produtos/                 # Gestão de produtos
│   ├── estoque/                  # Controle de estoque
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Página inicial (redirect)
├── components/                   # Componentes reutilizáveis
│   └── providers.tsx             # Provedores React (Session, Toast)
├── lib/                          # Utilitários e configurações
│   ├── dbConnect.ts              # Conexão MongoDB
│   ├── mongodb.ts                # Cliente MongoDB
│   └── models/                   # Modelos Mongoose
│       ├── Usuario.ts            # Modelo de Usuário
│       ├── Produto.ts            # Modelo de Produto
│       └── Movimentacao.ts       # Modelo de Movimentação
├── pages/api/                    # API Routes
│   ├── auth/                     # Autenticação
│   │   ├── [...nextauth].ts      # NextAuth configuração
│   │   └── register.ts           # Registro de usuários
│   ├── produtos/                 # API de produtos
│   │   ├── index.ts              # CRUD produtos
│   │   └── [id].ts               # Operações por ID
│   └── movimentacoes/            # API de movimentações
│       └── index.ts              # Histórico e registro
├── middleware.ts                 # Middleware de autenticação
├── .env.local                    # Variáveis de ambiente
└── package.json                  # Dependências
```

## Vamos começar! Instalação passo a passo

### O que você precisa antes

Para rodar o sistema, você vai precisar de:
- Node.js 18 ou superior (baixe em [nodejs.org](https://nodejs.org))
- MongoDB 7.x (local ou [MongoDB Atlas](https://www.mongodb.com/atlas) gratuito)
- npm ou yarn (vem junto com o Node.js)

### Passos para instalar

1. Baixe o projeto
   ```bash
   git clone <repository-url>
   cd saep
   ```

2. Instale tudo que precisa
   ```bash
   npm install
   ```
   Isso pode demorar um pouquinho, mas é normal!

3. Configure o banco de dados
   - Opção fácil: Crie uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Opção local: Instale MongoDB na sua máquina
   - Copie a URL de conexão do seu banco

4. Configure as variáveis de ambiente
   Edite o arquivo `.env.local` com suas informações:
   ```env
   MONGO_URI=mongodb://localhost:27017/stock-management
   NEXTAUTH_SECRET=uma-chave-super-secreta-aqui
   NEXTAUTH_URL=http://localhost:3000
   ```

5. Vamos testar!
   ```bash
   npm run dev
   ```

6. Abra no navegador
   - Acesse [http://localhost:3000](http://localhost:3000)
   - Crie sua conta ou faça login
   - Pronto! O sistema está funcionando!

## O que você pode fazer no sistema

### Como entrar no sistema
- Criar conta: Coloque seu nome, email e uma senha segura
- Fazer login: Use seu email e senha para entrar
- Segurança total: Suas informações ficam protegidas
- Fica logado: Não precisa ficar fazendo login toda hora

### Gerenciando seus produtos
- Adicionar produtos: Cadastre martelos, chaves, furadeiras...
- Ver tudo organizado: Lista bonita com busca rápida
- Editar informações: Preço, descrição, categoria...
- Remover quando necessário: Produtos que não usa mais
- Encontrar rápido: Digite o nome e pronto!

### Controle de estoque na palma da mão
- Entrada: Chegou mercadoria nova? Registre aqui
- Saída: Vendeu ou usou? Diminua do estoque
- Proteção: Não deixa tirar mais do que tem
- Atualização automática: Tudo se recalcula sozinho

### Fica de olho no estoque
- Alertas inteligentes: "Ei, estoque baixo!" quando precisar
- Notificações bonitas: Pop-ups que explicam o que aconteceu
- Dashboard: Visão geral de tudo em um lugar só

### Histórico completo
- Rastreamento total: Quem fez, quando, quanto
- Observações: Anote detalhes importantes
- Relatórios: Veja tudo que aconteceu cronologicamente

## Para desenvolvedores - APIs disponíveis

Se você é desenvolvedor e quer integrar com o sistema, aqui estão as APIs:

### Autenticação
- `POST /api/auth/register` - Criar nova conta de usuário
- `POST /api/auth/[...nextauth]` - Login e logout (usando NextAuth)

### Produtos
- `GET /api/produtos` - Ver todos os produtos (pode buscar por nome)
- `POST /api/produtos` - Adicionar produto novo
- `GET /api/produtos/[id]` - Ver detalhes de um produto específico
- `PUT /api/produtos/[id]` - Atualizar informações do produto
- `DELETE /api/produtos/[id]` - Remover produto

### Movimentações
- `GET /api/movimentacoes` - Ver histórico de entradas e saídas
- `POST /api/movimentacoes` - Registrar entrada ou saída de estoque

## Como é a aparência

### Design moderno e amigável
- Bonito e organizado: Interface limpa usando Tailwind CSS
- Funciona em tudo: Desktop, tablet, celular - tudo compatível
- Fácil de usar: Botões grandes, textos claros, navegação intuitiva
- Acessível: Funciona com leitores de tela e navegação por teclado

### Suas páginas principais
1. Login/Registro: Entre ou crie sua conta
2. Dashboard: Visão geral do seu negócio em um lugar só
3. Produtos: Gerencie todo o seu catálogo
4. Estoque: Controle entradas e saídas

## Sua segurança em primeiro lugar

Não se preocupe, cuidamos de tudo para manter suas informações seguras:

- Senhas protegidas: Usamos criptografia forte (bcrypt) para guardar suas senhas
- Login seguro: Sistema profissional de autenticação com JWT
- Dados validados: Tudo que você digita é verificado antes de salvar
- Proteção contra ataques: Bloqueamos tentativas maliciosas
- Pronto para produção: Pode usar HTTPS quando publicar

##  Modelo de Dados

### Usuário
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  password: string (hashed),
  role: string (default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Produto
```typescript
{
  _id: ObjectId,
  nome: string,
  descricao: string,
  categoria: string,
  preco: number,
  estoque_atual: number,
  estoque_minimo: number,
  unidade: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Movimentação
```typescript
{
  _id: ObjectId,
  produto: ObjectId (ref: Produto),
  tipo: 'entrada' | 'saida',
  quantidade: number,
  usuario: ObjectId (ref: Usuario),
  data: Date,
  observacao: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Publicando seu sistema online

Quer compartilhar seu sistema com outras pessoas? É fácil!

### Recomendação: Vercel (mais fácil)
1. Crie uma conta gratuita no [Vercel](https://vercel.com)
2. Conecte seu repositório do GitHub
3. Configure as variáveis de ambiente (MONGO_URI, etc.)
4. Pronto! Seu sistema fica online automaticamente

### Outras opções
- Railway: Perfeito se você já usa MongoDB
- Heroku: Clássico e confiável
- Docker: Para quem quer total controle

##  Testes

Para executar testes (quando implementados):
```bash
npm run test
```

## Quer ajudar a melhorar?

Adoramos contribuições! Se você quer ajudar:

1. Faça um fork do projeto
2. Crie uma branch para sua ideia (`git checkout -b minha-melhora`)
3. Faça suas mudanças e teste tudo
4. Mande um Pull Request explicando o que melhorou

## Licença

Este projeto é open source sob a licença MIT. Use à vontade!

## Precisa de ajuda?

- Abra uma issue no GitHub se encontrou um problema
- Sugira melhorias também pelas issues
- Estamos aqui para ajudar!

---

Feito com muito carinho e muitas ferramentas manuais!
