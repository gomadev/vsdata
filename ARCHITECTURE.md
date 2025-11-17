# Arquitetura do Projeto VS Dados

## 📐 Visão Geral da Arquitetura

Este projeto segue princípios de **Clean Architecture** e **Component-Driven Development**, garantindo:
- Alta modularidade
- Fácil manutenção
- Reutilização de componentes
- Separação de responsabilidades

## 🏗️ Camadas da Aplicação

### 1. **Apresentação (UI Layer)**
`src/components/ui/`

Componentes visuais reutilizáveis que implementam o design neomórfico:
- `NeoButton`: Botões com efeitos neomórficos
- `NeoCard`: Cards para conteúdo
- `NeoContainer`: Containers principais

**Características:**
- Sem lógica de negócio
- Props tipadas com TypeScript
- CSS Modules para escopo isolado
- Variantes configuráveis

### 2. **Composição (Composition Layer)**
`src/components/SlideNavigation/`

Componentes que combinam elementos UI com lógica de apresentação:
- Gerenciam estado local quando necessário
- Orquestram componentes UI
- Implementam interações específicas

### 3. **Lógica de Negócio (Business Logic Layer)**
`src/hooks/`

Custom hooks que encapsulam lógica reutilizável:
- `useSlideNavigation`: Gerencia estado e navegação entre slides
- `useKeyboardNavigation`: Implementa atalhos de teclado

**Benefícios:**
- Lógica testável isoladamente
- Reutilização em múltiplos componentes
- Separação clara de responsabilidades

### 4. **Conteúdo (Content Layer)**
`src/slides/`

Slides individuais da apresentação:
- Cada slide é um componente independente
- Foco em conteúdo e dados
- Utiliza componentes UI para consistência

### 5. **Tipos (Type Layer)**
`src/types/`

Definições TypeScript centralizadas:
- Contratos de interfaces
- Props de componentes
- Modelos de dados

### 6. **Estilos (Style Layer)**
`src/styles/`

Sistema de design centralizado:
- `variables.css`: Tokens de design (cores, espaçamentos, sombras)
- `global.css`: Reset CSS e estilos globais

## 🔄 Fluxo de Dados

```
App.tsx (Orquestração)
    ↓
useSlideNavigation (Estado)
    ↓
SlideNavigation (Controles) + Slides (Conteúdo)
    ↓
Componentes UI (Apresentação)
```

### Exemplo de Fluxo:

1. **App.tsx** inicializa o hook `useSlideNavigation`
2. Hook retorna `currentSlide`, `goToNext`, `goToPrevious`
3. **App.tsx** renderiza o slide atual e passa callbacks para navegação
4. **SlideNavigation** recebe callbacks e renderiza botões
5. Usuário clica → callback executado → hook atualiza estado → re-render

## 🎨 Sistema de Design Neomórfico

### Princípios:

1. **Sombras Suaves**: Múltiplas camadas de sombra (clara + escura)
2. **Baixo Contraste**: Cores próximas ao fundo
3. **Profundidade Sutil**: Elevação através de sombras

### Variáveis CSS:

```css
--neo-shadow-raised    /* Elementos elevados */
--neo-shadow-pressed   /* Elementos pressionados */
--neo-shadow-flat      /* Elementos planos */
```

### Estados Visuais:

- **Raised**: Estado padrão (elevado)
- **Pressed**: Estado ativo/pressionado (rebaixado)
- **Flat**: Estado neutro

## 📦 Padrões de Componentes

### 1. Componente Funcional com TypeScript
```typescript
import React from 'react';
import type { Props } from './types';
import styles from './Component.module.css';

export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div className={styles.container}>{/* ... */}</div>;
};
```

### 2. CSS Modules
```css
.container {
  /* Estilos escopados ao componente */
}
```

### 3. Barrel Exports (index.ts)
```typescript
export { Component } from './Component';
```

## 🧪 Boas Práticas Implementadas

### TypeScript
- ✅ Props totalmente tipadas
- ✅ `type` imports para otimização
- ✅ Interfaces semânticas
- ✅ Enums para variantes

### React
- ✅ Functional Components
- ✅ Custom Hooks para lógica
- ✅ React.FC para componentes
- ✅ Hooks de otimização (useCallback)

### CSS
- ✅ CSS Modules (escopo isolado)
- ✅ Variáveis CSS para consistência
- ✅ Mobile-first responsive
- ✅ Transições suaves

### Estrutura de Arquivos
- ✅ Colocation (arquivos relacionados juntos)
- ✅ Separação por feature
- ✅ Nomes descritivos
- ✅ Índices para exports limpos

## 🔌 Extensibilidade

### Adicionando Novo Slide

1. **Criar estrutura**:
```bash
src/slides/NovoSlide/
├── NovoSlide.tsx
├── NovoSlide.module.css
└── index.ts
```

2. **Exportar em** `src/slides/index.ts`
3. **Adicionar ao array de slides** em `App.tsx`

### Adicionando Novo Componente UI

1. **Criar em** `src/components/ui/`
2. **Seguir padrão**:
   - Componente `.tsx`
   - Estilos `.module.css`
   - Props interface em `src/types/`
3. **Exportar em** `src/components/ui/index.ts`

### Adicionando Novo Hook

1. **Criar em** `src/hooks/`
2. **Prefixo** `use`
3. **Retornar objeto** com valores e funções
4. **Documentar parâmetros e retorno**

## 🎯 Decisões de Design

### Por que CSS Modules?
- Escopo automático (sem colisões)
- Performance (CSS otimizado no build)
- Type-safety (com typescript-plugin-css-modules)
- Árvore de estilos sacudível

### Por que Hooks Customizados?
- Reutilização de lógica
- Testabilidade
- Separação de responsabilidades
- Composição flexível

### Por que TypeScript?
- Segurança de tipos
- Autocomplete melhorado
- Refatoração confiável
- Documentação viva

### Por que Vite?
- Build extremamente rápido
- HMR instantâneo
- ESM nativo
- Otimizações automáticas

## 📊 Performance

### Otimizações Implementadas:

- ✅ Code splitting por rota (slides)
- ✅ CSS Modules tree-shaking
- ✅ Lazy loading de componentes (possível adicionar)
- ✅ Memoização com useCallback
- ✅ Transições via CSS (não JS)

### Métricas Alvo:

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle size: < 150KB (gzipped)

## 🔐 Type Safety

Todas as interfaces são exportadas de `src/types/index.ts`:

```typescript
interface Slide {
  id: number;
  component: React.ComponentType;
  title?: string;
}
```

Isso garante:
- Contratos claros entre componentes
- Refatoração segura
- IntelliSense completo

## 🚀 Próximos Passos Sugeridos

1. **Testes**: Adicionar Jest + React Testing Library
2. **Storybook**: Documentar componentes UI
3. **Animações**: Adicionar Framer Motion
4. **Data Fetching**: Integrar React Query
5. **State Management**: Redux Toolkit (se necessário)
6. **CI/CD**: GitHub Actions para deploy

---

**Princípio Fundamental**: Cada arquivo tem uma responsabilidade clara e única.
