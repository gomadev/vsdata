# VS Dados - Apresentação Neomórfica

Apresentação profissional de visualização de dados com design neomórfico, desenvolvida em React + TypeScript.

## 🎨 Características

- **Design Neomórfico**: Interface moderna com efeitos de sombra suaves
- **Navegação Fluida**: Transições animadas entre slides sem redirecionamento
- **Totalmente Responsivo**: Funciona perfeitamente em desktop e mobile
- **Navegação por Teclado**: Use as setas ← → ou Espaço para navegar
- **TypeScript**: Código 100% tipado para maior segurança
- **Modular**: Componentes reutilizáveis e bem organizados

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes UI base (Button, Card, Container)
│   └── SlideNavigation/ # Componente de navegação
├── slides/             # Slides da apresentação
│   ├── IntroSlide/
│   ├── DataOverviewSlide/
│   ├── VisualizationSlide/
│   ├── InsightsSlide/
│   └── ConclusionSlide/
├── hooks/              # Custom hooks
├── styles/             # Estilos globais e variáveis
├── types/              # Definições TypeScript
└── App.tsx             # Componente principal
```

## 🚀 Como Usar

### Desenvolvimento
```bash
npm run dev
```
Abre em http://localhost:5173

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 🎯 Personalizando os Slides

### 1. Editando Slides Existentes

Cada slide está em sua própria pasta dentro de `src/slides/`. Por exemplo, para editar o slide de visualizações:

```typescript
// src/slides/VisualizationSlide/VisualizationSlide.tsx
export const VisualizationSlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2>Seu Título Aqui</h2>
      {/* Seu conteúdo */}
    </div>
  );
};
```

### 2. Adicionando Novos Slides

1. Crie uma nova pasta em `src/slides/`:
```bash
src/slides/MeuNovoSlide/
├── MeuNovoSlide.tsx
├── MeuNovoSlide.module.css
└── index.ts
```

2. Adicione o slide em `src/App.tsx`:
```typescript
import { MeuNovoSlide } from './slides';

const slides: Slide[] = [
  // ... slides existentes
  { id: 6, component: MeuNovoSlide, title: 'Novo Slide' },
];
```

### 3. Personalizando Cores

Edite as variáveis CSS em `src/styles/variables.css`:

```css
:root {
  --bg-primary: #e0e5ec;      /* Cor de fundo principal */
  --accent: #667eea;           /* Cor de destaque */
  --text-primary: #2c3e50;    /* Cor do texto */
  /* ... */
}
```

## 🎨 Componentes Disponíveis

### NeoButton
```tsx
<NeoButton 
  variant="raised"  // 'raised' | 'pressed' | 'flat'
  size="md"         // 'sm' | 'md' | 'lg'
  onClick={handleClick}
>
  Clique aqui
</NeoButton>
```

### NeoCard
```tsx
<NeoCard variant="raised">
  <h3>Título</h3>
  <p>Conteúdo do card</p>
</NeoCard>
```

### NeoContainer
```tsx
<NeoContainer>
  {/* Conteúdo com efeito neomórfico */}
</NeoContainer>
```

## ⌨️ Atalhos de Teclado

- `→` ou `Espaço`: Próximo slide
- `←`: Slide anterior

## 📊 Integrando Bibliotecas de Gráficos

Para adicionar gráficos reais, você pode usar:

### Chart.js + React-Chartjs-2
```bash
npm install chart.js react-chartjs-2
```

### Recharts
```bash
npm install recharts
```

### D3.js
```bash
npm install d3 @types/d3
```

### Plotly
```bash
npm install react-plotly.js plotly.js
```

## 🎓 Dicas para Apresentação

1. **Prepare seus dados**: Substitua o conteúdo placeholder pelos seus dados reais
2. **Teste a navegação**: Use as setas do teclado para uma apresentação mais fluida
3. **Customize as cores**: Ajuste o tema para combinar com sua identidade visual
4. **Adicione gráficos**: Use uma das bibliotecas sugeridas para visualizações impactantes
5. **Build antes de apresentar**: Execute `npm run build` e teste com `npm run preview`

## 🌟 Melhorias Futuras

- [ ] Adicionar modo escuro
- [ ] Incluir gráficos interativos
- [ ] Adicionar animações de entrada nos elementos
- [ ] Implementar fullscreen API
- [ ] Adicionar indicador de progresso
- [ ] Suporte a gestos touch para mobile

## 📝 Autores

- **Guilherme**
- **Luane**

---

**Tecnologias**: React 18, TypeScript, Vite, CSS Modules

Boa sorte na apresentação! 🚀

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
