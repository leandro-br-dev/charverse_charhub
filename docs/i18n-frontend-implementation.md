# Frontend - Sistema de Internacionalização

## Implementação Frontend React + TypeScript (Iniciado APÓS Backend)

### Análise da Estrutura Existente

**Stack Detectado:**
- React 19 + TypeScript com Vite
- Zustand para state management
- TanStack React Query para data fetching
- Axios já configurado para HTTP requests
- React Hook Form + Zod para formulários
- Tailwind CSS para styling
- Vitest para testes

**IMPORTANTE**: Começar apenas após conclusão das APIs do backend

### Fluxo de Trabalho de Desenvolvimento

#### **Etapa 1: Análise e Instalação de Dependências**

**Objetivos:**
- Instalar bibliotecas específicas para i18n
- Analisar integração com stack existente
- Definir estratégia de carregamento de traduções

**Dependências necessárias:**
```bash
npm install react-i18next i18next i18next-http-backend i18next-browser-languagedetector
```

**Integração com stack existente:**
- Usar Axios já configurado para HTTP requests
- Integrar com Zustand para estado global
- Aproveitar TanStack Query para cache de traduções
- Usar React Hook Form para seletor de idioma

---

#### **Etapa 2: Configuração Base do i18next**

**Objetivos:**
- Configurar i18next com backend HTTP
- Integrar detector de idioma do navegador
- Estabelecer namespaces por página

**Deliverables:**
- `src/i18n/index.ts` - Configuração principal
- `src/i18n/resources.ts` - Mapeamento de recursos
- `src/hooks/useTranslation.ts` - Hook customizado

**Configuração específica:**
- Backend HTTP apontando para APIs do backend
- Detector de idioma com localStorage persistence
- Namespaces baseados nas páginas existentes
- Fallback para inglês em caso de erro

---

#### **Etapa 3: Integração com State Management**

**Objetivos:**
- Criar store Zustand para estado de idioma
- Integrar com TanStack Query para cache
- Implementar carregamento assíncrono

**Deliverables:**
- `src/stores/i18nStore.ts` - State management
- `src/services/translationService.ts` - API client
- `src/hooks/useLocale.ts` - Hook de gerenciamento

**Integração:**
- Usar padrão Zustand existente (authStore, themeStore)
- Integrar com Axios client configurado
- Cache inteligente com TanStack Query
- Persistência no localStorage

---

#### **Etapa 4: Componentes de Interface**

**Objetivos:**
- Criar seletor de idioma
- Implementar componentes de loading
- Integrar com design system existente

**Deliverables:**
- `src/components/ui/LanguageSelector.tsx`
- `src/components/ui/TranslationLoader.tsx`
- Integração com componentes existentes (Button, Card, etc.)

**Integração:**
- Seguir padrões de componentes UI existentes
- Usar classes Tailwind já configuradas
- Integrar com sistema de temas (ThemeToggle)
- Accessibility seguindo padrões do projeto

---

#### **Etapa 5: Integração com Páginas Existentes**

**Objetivos:**
- Substituir textos hardcoded por traduções
- Implementar carregamento dinâmico por página
- Otimizar performance

**Deliverables:**
- Refatoração das páginas existentes
- Sistema de loading states
- Fallbacks para conteúdo não traduzido

**Páginas a serem atualizadas:**
- `HomePage.tsx` - namespace: home
- `DashboardPage.tsx` - namespace: dashboard
- `LoginPage.tsx` / `RegisterPage.tsx` - namespace: auth
- `Header.tsx` / `Sidebar.tsx` - namespace: navigation
- Componentes compartilhados - namespace: common

---

### Estrutura Final de Arquivos

```
frontend/
├── src/
│   ├── i18n/
│   │   ├── index.ts                 # Configuração principal
│   │   └── resources.ts             # Mapeamento de recursos
│   ├── services/
│   │   └── translationService.ts    # Cliente HTTP para API
│   ├── stores/
│   │   └── i18nStore.ts             # State management Zustand
│   ├── hooks/
│   │   ├── useTranslation.ts        # Hook customizado
│   │   └── useLocale.ts             # Hook gerenciamento idioma
│   ├── components/
│   │   └── ui/
│   │       ├── LanguageSelector.tsx # Seletor de idioma
│   │       └── TranslationLoader.tsx # Loading tradução
│   └── utils/
│       └── i18n.ts                  # Utilities
```

### Checklist de Implementação

#### **Fase 1 - Configuração Base**
- [ ] Instalar dependências react-i18next
- [ ] Configurar i18next com backend HTTP
- [ ] Implementar detector de idioma
- [ ] Configurar namespaces por página

#### **Fase 2 - State Management**
- [ ] Criar i18nStore com Zustand
- [ ] Implementar translationService com Axios
- [ ] Integrar TanStack Query para cache
- [ ] Hook useLocale para gerenciamento

#### **Fase 3 - Componentes UI**
- [ ] LanguageSelector seguindo design system
- [ ] TranslationLoader com states
- [ ] Integração com tema existente
- [ ] Accessibility e responsividade

#### **Fase 4 - Integração Páginas**
- [ ] Refatorar HomePage com traduções
- [ ] Atualizar DashboardPage
- [ ] Modificar LoginPage/RegisterPage
- [ ] Atualizar Header e Sidebar
- [ ] Componentes compartilhados

#### **Fase 5 - Otimização**
- [ ] Lazy loading de traduções
- [ ] Cache estratégico
- [ ] Error boundaries
- [ ] Performance testing

---

### Integração com Stack Existente

#### **Zustand Store Pattern**
```typescript
// Seguir padrão de authStore.ts e themeStore.ts
interface I18nState {
  currentLocale: string;
  supportedLocales: string[];
  isLoading: boolean;
  changeLanguage: (locale: string) => Promise<void>;
}
```

#### **TanStack Query Integration**
```typescript
// Usar para cache de traduções
const useTranslationQuery = (locale: string, namespace: string) => {
  return useQuery({
    queryKey: ['translation', locale, namespace],
    queryFn: () => translationService.getTranslation(locale, namespace),
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
};
```

#### **Axios Service Integration**
```typescript
// Usar cliente HTTP já configurado em src/services/api.ts
class TranslationService {
  async getTranslation(locale: string, namespace: string) {
    return api.get(`/api/i18n/translations/${locale}/${namespace}`);
  }
}
```

### Dependências Críticas

**Antes de iniciar:**
- Backend APIs funcionais e testadas
- Axios client configurado
- Zustand stores funcionando
- TanStack Query configurado

**Integrar com:**
- Sistema de autenticação existente
- Theme store para consistência visual
- Error handling padronizado
- Loading states existentes

### Namespaces por Página

**Mapeamento baseado na estrutura existente:**
- `home` - HomePage.tsx
- `dashboard` - DashboardPage.tsx
- `auth` - LoginPage.tsx, RegisterPage.tsx
- `navigation` - Header.tsx, Sidebar.tsx
- `common` - Componentes UI compartilhados

### Estratégia de Loading

**Carregamento progressivo:**
1. Carregar namespace da página atual
2. Preload de namespaces comuns (navigation, common)
3. Lazy load de outros namespaces conforme necessário
4. Cache inteligente com invalidação adequada

### Performance e UX

**Otimizações:**
- Suspense boundaries para carregamento
- Skeleton loading states
- Fallback para textos em inglês
- Retry automático em caso de erro
- Compressão de arquivos de tradução

### Testing Strategy

**Integração com Vitest:**
- Testes de componentes com traduções mockadas
- Testes de integração com API
- Testes de performance de carregamento
- Testes de acessibilidade

### Próximos Passos

Após implementação completa:
1. Validar integração com todas as páginas
2. Testes de performance e UX
3. Deploy e monitoramento
4. Documentação de uso para desenvolvedores