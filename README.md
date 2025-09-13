# CharHub - Frontend Web Portal

CharHub é o portal web principal do ecossistema CharVerse, fornecendo interfaces para criação de personagens, histórias, chat e gerenciamento de assistentes AI.

## 🚀 Status do Desenvolvimento

**Fase Atual**: Fase 1 - Setup e Infraestrutura Base ✅ **CONCLUÍDA**

### Fase 1 Completa
- ✅ Setup Vite + React + TypeScript
- ✅ Configuração Tailwind CSS
- ✅ Setup ESLint + Prettier + Husky
- ✅ Estrutura de pastas configurada
- ✅ Variáveis de ambiente
- ✅ Roteamento com React Router v6
- ✅ Providers principais (React Query)
- ✅ Interceptadores HTTP configurados
- ✅ Sistema de autenticação (Zustand)
- ✅ Serviços de API para backend Orion

## 🛠️ Tecnologias

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + PostCSS
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base
│   ├── forms/          # Componentes de formulário
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── pages/              # Page components
├── stores/             # Zustand stores
├── hooks/              # Custom hooks
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript types
├── constants/          # Constants
└── router/             # Routing configuration
```

## 🚀 Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
npm run lint:fix

# Formatação
npm run format
npm run format:check

# Testes
npm run test
npm run test:coverage
```

## 🔗 Integração com Backend

O frontend está configurado para se conectar com o **Project Orion** (backend):
- API Base URL: `http://localhost:3000/api/v1`
- WebSocket URL: `http://localhost:3000`
- Documentação API: `http://localhost:3000/api/v1/docs`

## 📋 Próximas Fases

### Fase 2: Design System e Componentes Base
- Definir tokens de design
- Criar sistema de iconografia
- Componentes fundamentais (Button, Input, Modal, etc.)
- Layout components

### Fase 3: Autenticação e Gerenciamento de Estado
- Formulários de login/registro funcionais
- Protected routes
- Gerenciamento completo de usuário
- Error handling global

### Fase 4: Sistema de Créditos e Pagamentos
- Integração PayPal
- Gestão de créditos
- Pricing tables

### Fase 5: Character Management System
- CRUD completo de personagens
- Sistema de busca e filtros
- Upload de imagens

## 🌍 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=http://localhost:3000
VITE_APP_NAME=CharHub
VITE_APP_ENV=development
```

## 🔐 Autenticação

O sistema de autenticação está implementado com:
- JWT tokens com refresh automático
- Zustand store persistente
- Interceptadores HTTP para tokens
- Protected routes (a implementar)

## 📊 Métricas de Qualidade

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier configurados
- ✅ Build otimizado com code splitting
- ✅ Hot Module Replacement (HMR)
- ✅ Source maps para debug

---

**CharHub** - Portal Web do ecossistema CharVerse | Fase 1 Concluída ✅
