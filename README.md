# Análise ICM - Rodovias Federais 2025

Apresentação interativa de visualização de dados para análise do Índice de Conservação e Manutenção (ICM) das rodovias federais brasileiras.

## 🎯 Objetivo

Demonstrar princípios de storytelling com dados através de visualizações interativas e minimalistas, analisando ~97mil trechos de rodovias pavimentadas.

## 🎨 Características

- **Design Neomórfico Minimalista**: Bordas brancas, sombras suaves, zero clutter
- **Gráfico de Pizza Inovador**: Expansão de fatias pequenas com rotação automática
- **Navegação Fluida**: Transições animadas entre 6 slides
- **Navegação por Teclado**: Setas ← → ou Espaço
- **Acessibilidade**: ARIA labels, contraste adequado, texto sempre horizontal
- **TypeScript + React 18**: Código 100% tipado

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── NeoPieChart/      # Gráfico pizza interativo com expansão
│   ├── NeoBarChart/      # Gráfico de barras com hover
│   ├── SlideNavigation/  # Controles de navegação
│   └── ui/               # Buttons, Cards, Containers
├── slides/               # 6 slides da apresentação
│   ├── IntroSlide/       # Título e autores
│   ├── ContextSlide/     # Problema (% crítico)
│   ├── DataOverviewSlide/# Gráfico pizza ICM
│   ├── VisualizationSlide/# Ranking estados
│   ├── InsightsSlide/    # Princípios aplicados
│   └── ConclusionSlide/  # Insights finais
├── hooks/                # useICMData, useSlideNavigation
├── utils/                # dataLoader (processa CSV)
├── data/                 # CSVs + dicionário de dados
├── styles/               # Variáveis CSS + global
├── types/                # Interfaces TypeScript
└── App.tsx               # Orquestrador principal
```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm install
npm run dev
```
Acesse: http://localhost:5173

### Build
```bash
npm run build
npm run preview
```

## 📊 Dados

**Fonte**: Levantamentos ICM Outubro/2025  
**Arquivos**: `levantamentos_pavimentada_2025_10.csv`  
**Volume**: 97.231 trechos analisados

### Categorias ICM
- **BOM**: ICM < 30
- **REGULAR**: 30 ≤ ICM < 50
- **RUIM**: 50 ≤ ICM < 70
- **PÉSSIMO**: ICM ≥ 70

## 🎪 Recursos Implementados

### ✅ Requisitos Obrigatórios
- [x] Storytelling com dados (6 slides narrativos)
- [x] Marcas visuais adequadas (pizza, barras)
- [x] Interatividade (hover, expansão, navegação)
- [x] Elementos dinâmicos (rotação, animações)
- [x] Gráficos apropriados por tipo de dado
- [x] Acessibilidade (ARIA, teclado, contraste)

### 💡 Inovações Técnicas
- **Gráfico de Pizza Inteligente**: Detecta fatias < 5%, permite expansão em hover
- **Rotação Sincronizada**: Pizza gira, texto permanece horizontal
- **Pausas Automáticas**: Animação pausa a 90° para leitura
- **Minimalismo Extremo**: Bordas brancas, zero texto desnecessário
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
