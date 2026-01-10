# 💼 Stockly — Dashboard de Vendas e Estoque

Projeto desenvolvido durante o curso da plataforma **Full Stack Club**, com o objetivo de criar um dashboard completo para gestão de produtos e controle de vendas.  
O sistema permite cadastrar produtos, registrar vendas, editar e remover informações, além de visualizar métricas importantes por meio de gráficos e indicadores em tempo real.

O Stockly foi construído com foco em organização de dados, usabilidade e aplicação de boas práticas no desenvolvimento full stack.

## 📋 Funcionalidades

- ✅ **Gestão de Produtos**: Cadastro, edição e remoção de produtos com controle de estoque
- ✅ **Gestão de Vendas**: Registro, edição e exclusão de vendas com múltiplos produtos
- ✅ **Controle de Estoque**: Atualização automática do estoque conforme as vendas são realizadas
- ✅ **Dashboard Interativo**: Visualização de métricas e gráficos de desempenho em tempo real
- ✅ **Análise de Receita**: Gráficos de receita dos últimos 14 dias
- ✅ **Design Responsivo**: Interface adaptável para desktop e mobile

## 🛠️ Tecnologias Utilizadas

### Front-end
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn UI** - Componentes de interface
- **Recharts** - Gráficos e visualizações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Back-end
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - ORM para TypeScript
- **Neon DB** - Plataforma de banco de dados serverless
- **Next Safe Action** - Gerenciamento de ações do servidor

## 📁 Estrutura do Projeto

```
stockly/
├── app/
│   ├── (dashboard)/          # Páginas do dashboard
│   │   ├── _components/      # Componentes específicos do dashboard
│   │   └── page.tsx          # Página principal do dashboard
│   ├── products/             # Páginas de produtos
│   │   └── _components/      # Componentes de produtos
│   ├── sales/                # Páginas de vendas
│   │   └── _components/      # Componentes de vendas
│   ├── _actions/             # Server actions (mutations)
│   │   ├── product/          # Ações de produtos
│   │   └── sale/             # Ações de vendas
│   ├── _components/          # Componentes compartilhados
│   │   └── ui/               # Componentes UI (Shadcn)
│   ├── _data-access/         # Camada de acesso a dados
│   │   ├── dashboard/        # Queries do dashboard
│   │   ├── product/          # Queries de produtos
│   │   └── sales/            # Queries de vendas
│   ├── _helpers/             # Funções auxiliares
│   ├── _lib/                 # Bibliotecas e configurações
│   └── layout.tsx            # Layout principal
├── prisma/
│   ├── schema.prisma         # Schema do banco de dados
│   └── migrations/           # Migrações do Prisma
└── package.json
```

## 🏗️ Arquitetura do Sistema

### Modelo de Dados

O sistema utiliza três entidades principais relacionadas:

```mermaid
erDiagram
    Product ||--o{ SaleProduct : "tem"
    Sale ||--o{ SaleProduct : "contém"
    
    Product {
        string id PK
        string name
        decimal price
        int stock
        datetime createdAt
        datetime updatedAt
    }
    
    Sale {
        string id PK
        datetime date
        datetime createdAt
        datetime updatedAt
    }
    
    SaleProduct {
        string id PK
        string saleId FK
        string productId FK
        int quantity
        decimal unitPrice
        datetime createdAt
        datetime updatedAt
    }
```

### Fluxo de Dados

```mermaid
graph TB
    A[Cliente/Usuário] -->|Requisição| B[Next.js App Router]
    B --> C{Server Component?}
    C -->|Sim| D[Data Access Layer]
    C -->|Não| E[Client Component]
    E -->|Ação| F[Server Action]
    F --> D
    D --> G[Prisma ORM]
    G --> H[(PostgreSQL/Neon DB)]
    H -->|Dados| G
    G -->|Resultado| D
    D -->|Dados| B
    B -->|Renderização| A
```

### Fluxo de Venda

```mermaid
sequenceDiagram
    participant U as Usuário
    participant C as Client Component
    participant SA as Server Action
    participant DB as Database
    participant P as Product

    U->>C: Criar/Editar Venda
    C->>SA: upsertSale()
    SA->>DB: Criar Sale
    DB-->>SA: Sale criado
    loop Para cada produto
        SA->>DB: Criar SaleProduct
        SA->>P: Atualizar estoque
        P->>DB: Decrementar stock
    end
    DB-->>SA: Venda completa
    SA-->>C: Sucesso
    C-->>U: Feedback visual
```

### Fluxo de Dashboard

```mermaid
graph LR
    A[Dashboard Page] -->|Suspense| B[Total Revenue Card]
    A -->|Suspense| C[Today Revenue Card]
    A -->|Suspense| D[Total Sales Card]
    A -->|Suspense| E[Total Stock Card]
    A -->|Suspense| F[Total Products Card]
    A -->|Suspense| G[Last 14 Days Chart]
    A -->|Suspense| H[Most Sold Products]
    
    B --> I[getDashboardData]
    C --> I
    D --> I
    E --> I
    F --> I
    G --> I
    H --> J[getMostSoldProducts]
    
    I --> K[(Database)]
    J --> K
```

## 🔄 Como Funciona

### 1. Gestão de Produtos

- **Criação**: O usuário preenche um formulário com nome, preço e estoque inicial
- **Validação**: Zod valida os dados antes de enviar ao servidor
- **Persistência**: Prisma cria o registro no banco de dados
- **Atualização**: O estoque é atualizado automaticamente quando produtos são vendidos

### 2. Gestão de Vendas

- **Criação**: O usuário seleciona produtos e quantidades
- **Cálculo**: O sistema calcula o preço total baseado no preço unitário do momento da venda
- **Estoque**: O estoque dos produtos é decrementado automaticamente
- **Histórico**: Todas as vendas são registradas com data e produtos associados

### 3. Dashboard

- **Métricas em Tempo Real**: 
  - Receita total acumulada
  - Receita do dia atual
  - Total de vendas realizadas
  - Total de produtos em estoque
  - Quantidade de produtos cadastrados

- **Visualizações**:
  - Gráfico de linha mostrando a receita dos últimos 14 dias
  - Lista dos produtos mais vendidos

### 4. Design Responsivo

- **Desktop**: Sidebar fixa com navegação completa
- **Mobile**: Menu hambúrguer com drawer lateral
- **Breakpoints**: Adaptação automática usando Tailwind CSS

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL ou conta no Neon DB
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd stockly
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione:
```env
DATABASE_URL="postgresql://usuario:senha@host:porta/database"
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Gere o Prisma Client:
```bash
npx prisma generate
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

7. Acesse a aplicação:
```
http://localhost:3000
```

## 📊 Estrutura de Componentes

```mermaid
graph TD
    A[Layout] --> B[Sidebar]
    A --> C[Mobile Sidebar]
    A --> D[Pages]
    
    D --> E[Dashboard]
    D --> F[Products]
    D --> G[Sales]
    
    E --> H[Summary Cards]
    E --> I[Revenue Chart]
    E --> J[Most Sold Products]
    
    F --> K[Product Table]
    F --> L[Create Product Button]
    
    G --> M[Sales Table]
    G --> N[Create Sale Button]
    
    L --> O[Product Form Dialog]
    N --> P[Sale Form Sheet]
```

## 🔐 Segurança e Validação

- **Validação no Cliente**: React Hook Form + Zod
- **Validação no Servidor**: Next Safe Action com schemas Zod
- **Type Safety**: TypeScript em todo o projeto
- **SQL Injection Protection**: Prisma ORM com queries parametrizadas

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter
```

## 🎯 Próximos Passos

- [ ] Autenticação de usuários
- [ ] Relatórios em PDF
- [ ] Exportação de dados (CSV/Excel)
- [ ] Notificações de estoque baixo
- [ ] Histórico de alterações
- [ ] Múltiplos usuários e permissões

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais durante o curso Full Stack Club.

---

Desenvolvido com ❤️ durante o curso **Full Stack Club**
