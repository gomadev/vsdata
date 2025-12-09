# Análise ICM - Rodovias Federais Brasileiras 2025

Plataforma interativa de visualização e análise de dados do Índice de Conservação e Manutenção (ICM) das rodovias federais brasileiras, desenvolvida com tecnologias modernas de frontend.

---

## Visão Geral

Esta aplicação apresenta uma análise abrangente de aproximadamente 97 mil trechos de rodovias brasileiras, utilizando a metodologia ICM para avaliação de condições de pavimentação. A plataforma oferece 28 slides informativos com visualizações interativas, permitindo exploração multidimensional dos dados através de gráficos especializados e análises regionais.

---

## Características Principais

### Design e Interface
- **Arquitetura Neomórfica**: Implementação de princípios de design neomórfico com efeitos de sombra sofisticados
- **Modo Claro/Escuro**: Suporte completo a alternância entre temas com CSS variables dinâmicas
- **Paletas de Cores Personalizáveis**: 8 paletas pré-configuradas com seletor de cores RGB
- **Responsividade**: Layout otimizado para diferentes tamanhos de tela

### Visualizações e Gráficos
- NeoLineChart: Gráficos de linhas para análise de tendências
- NeoStackedArea: Área empilhada para distribuição por estado
- NeoStackedBarChart: Barras empilhadas com análise matricial
- NeoBarChart: Gráficos de barras com animações
- NeoPieChart: Gráficos de pizza com expansão de fatias pequenas (descontinuado por preferência)

### Interatividade
- Navegação fluida entre 28 slides com transições animadas
- Controles por teclado: setas direcionais e teclas de navegação
- Filtros de cores e paletas interativas
- Sliders RGB para personalização de cores de texto
- Animação de fundo com esferas flutuantes neomórficas

### Acessibilidade
- Labels ARIA completos para elementos interativos
- Suporte a navegação via teclado
- Contraste de cores adequado em ambos os temas
- Semântica HTML apropriada

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── NeoLineChart/              # Gráfico de linhas com SVG customizado
│   ├── NeoStackedArea/            # Área empilhada para distribuições
│   ├── NeoStackedBarChart/        # Barras empilhadas para matriz de dados
│   ├── NeoBarChart/               # Gráficos de barras (não utilizado)
│   ├── NeoPieChart/               # Gráficos de pizza (descontinuado)
│   ├── NeoHeatmap/                # Heatmap (não utilizado)
│   ├── SlideNavigation/           # Controles de navegação
│   ├── ColorPaletteFilter/        # Seletor de paletas
│   ├── TextColorFilter/           # Sliders RGB para cores
│   ├── ThemeToggle/               # Alternância tema claro/escuro
│   ├── TireMarksBackground/       # Animação de fundo
│   ├── Icons/                     # Biblioteca de ícones SVG
│   └── ui/                        # Componentes UI base
├── slides/                        # 28 slides da apresentação
│   ├── IntroSlide/                # Introdução
│   ├── ContextSlide/              # Contexto do problema
│   ├── StatisticsSlide/           # Estatísticas gerais consolidadas
│   ├── KilometerageAnalysisSlide/ # Distribuição de quilometragem
│   ├── DegradationTrendSlide/     # Análise de degradação entre períodos
│   ├── CriticalAnalysisSlide/     # Análise de trechos críticos
│   ├── ComparisonSlide/           # Comparativo BOM vs PÉSSIMO
│   ├── TimelineSlide/             # Evolução por trecho (NeoLineChart)
│   ├── RoadsAnalysisSlide/        # Análise por rodovia
│   ├── VisualizationSlide/        # Top 10 estados críticos
│   ├── RegionComparisonSlide/     # Comparação regional
│   ├── NorthAnalysisSlide/        # Análise região norte
│   ├── SoutheastAnalysisSlide/    # Análise região sudeste
│   ├── HeatmapSlide/              # Matriz ICM por estado (NeoStackedBarChart)
│   ├── StackedAreaSlide/          # Distribuição por estado (NeoStackedArea)
│   ├── SurfaceTypeSlide/          # Pavimentada vs não pavimentada
│   ├── LaneAnalysisSlide/         # Análise por categoria
│   ├── EconomicImpactSlide/       # Impacto econômico
│   ├── InvestmentSlide/           # Investimentos necessários
│   ├── KeyFindingsSlide/          # Descobertas principais
│   ├── RecommendationsSlide/      # Recomendações
│   ├── ActionPlanSlide/           # Plano de ação
│   ├── TechnologySlide/           # Soluções tecnológicas
│   ├── NextStepsSlide/            # Próximos passos
│   ├── InsightsSlide/             # Conclusões principais
│   ├── MethodologySlide/          # Limitações metodológicas
│   ├── TeamSlide/                 # Equipe do projeto
│   └── ConclusionSlide/           # Conclusão final
├── hooks/
│   ├── useICMData.ts              # Hook para dados de um período
│   ├── useMultiMonthData.ts       # Hook para dados de múltiplos períodos
│   ├── useSlideNavigation.ts      # Lógica de navegação
│   ├── useKeyboardNavigation.ts   # Navegação por teclado
│   └── useDynamicTextColors.ts    # Cálculo de cores de texto
├── contexts/
│   └── ColorPaletteContext.tsx    # Gerenciamento de paleta de cores
├── data/
│   ├── levantamentos_pavimentada_2025_10.csv
│   ├── levantamentos_nao_pavimentada_2025_10.csv
│   └── dicionario-de-dados-icm.md
├── utils/
│   └── dataLoader.ts              # Carregamento e processamento de CSV
├── types/
│   └── index.ts                   # Definições TypeScript globais
├── styles/
│   ├── variables.css              # Variáveis CSS (cores, sombras)
│   ├── global.css                 # Estilos globais e media queries
│   └── index.css                  # Importações
└── App.tsx                        # Componente raiz

```

---

## Configuração e Instalação

### Pré-requisitos
- Node.js 18+ ou superior
- npm ou yarn

### Passos de Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd vsdados

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse em http://localhost:5173
```

### Build para Produção

```bash
# Gere a versão otimizada para produção
npm run build

# Visualize a build de produção localmente
npm run preview
```

---

## Dados e Metodologia

### Fonte de Dados
- Levantamentos ICM - Outubro de 2025
- Arquivos: `levantamentos_pavimentada_2025_10.csv` e `levantamentos_nao_pavimentada_2025_10.csv`
- Volume: Aproximadamente 97.231 trechos analisados
- Cobertura: Rodovias federais brasileiras

### Categorização ICM
O Índice de Conservação e Manutenção classifica trechos em quatro categorias:

| Categoria | Intervalo ICM | Significado |
|-----------|---------------|-------------|
| BOM | ICM < 30 | Rodovia em excelente estado |
| REGULAR | 30 ≤ ICM < 50 | Rodovia em estado satisfatório |
| RUIM | 50 ≤ ICM < 70 | Rodovia necessita manutenção |
| PÉSSIMO | ICM ≥ 70 | Rodovia crítica, requer intervenção urgente |

### Análise Multidimensional
Os dados são analisados sob as seguintes dimensões:
- Distribuição por estado (UF)
- Tipo de pavimentação (pavimentada vs não pavimentada)
- Identificação de rodovias federais
- Série histórica (agosto a outubro de 2025)
- Análise regional (norte, sudeste)

---

## Tecnologias Utilizadas

### Frontend
- **React 19.2**: Framework de interface de usuário
- **TypeScript 5.7**: Tipagem estática para JavaScript
- **Vite 7.2.2**: Build tool e dev server
- **CSS Modules**: Estilo com escopo local

### Ferramenta de Linting
- **ESLint 9.x**: Análise estática de código

### Dependências Principais
```json
{
  "react": "^19.2.0",
  "typescript": "^5.7.2",
  "vite": "^7.2.2"
}
```

---

## Uso da Aplicação

### Navegação Entre Slides

#### Teclado
- Seta para Direita (→): Próximo slide
- Seta para Esquerda (←): Slide anterior
- Barra de Espaço: Próximo slide

#### Mouse
- Botões "Ir para anterior" e "Próximo" na barra de navegação
- Indicador visual do slide atual

### Personalização de Cores

#### Paletas Pré-configuradas
Clique em "Color Palette" para selecionar entre 8 paletas de cores predefinidas que afetam todos os gráficos e elementos visuais.

#### Cores de Texto (RGB Sliders)
Use os sliders RGB para ajustar a cor do texto dinamicamente. Os valores são aplicados em tempo real.

#### Tema Claro/Escuro
Clique no ícone de sol/lua para alternar entre tema claro e escuro. Todas as variáveis CSS são atualizadas dinamicamente.

### Animações de Fundo
A aplicação apresenta uma animação contínua de esferas flutuantes neomórficas que variam com o tema selecionado.

---

## Desenvolvimento

### Adicionando um Novo Slide

1. **Crie a pasta e arquivos**:
```bash
mkdir src/slides/MeuNovoSlide
touch src/slides/MeuNovoSlide/MeuNovoSlide.tsx
touch src/slides/MeuNovoSlide/MeuNovoSlide.module.css
touch src/slides/MeuNovoSlide/index.ts
```

2. **Implemente o componente**:
```tsx
// MeuNovoSlide.tsx
import React from 'react';
import styles from './MeuNovoSlide.module.css';

export const MeuNovoSlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2>Meu Novo Slide</h2>
      {/* Conteúdo */}
    </div>
  );
};
```

3. **Exporte do índice**:
```typescript
// index.ts
export { MeuNovoSlide } from './MeuNovoSlide';
```

4. **Adicione a App.tsx**:
```typescript
import { MeuNovoSlide } from './slides';

const slides: Slide[] = [
  // ... slides existentes
  { id: 29, component: MeuNovoSlide, title: 'Meu Novo Slide' },
];
```

### Estilização com CSS Modules

Cada slide possui um arquivo `.module.css` para estilos isolados:

```css
.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
```

### Utilizando o Hook de Dados

```typescript
import { useICMData } from '../../hooks/useICMData';

const { data, stats, loading } = useICMData();

// data: array de objetos com informações dos trechos
// stats: objeto com contagens por categoria
// loading: booleano indicando carregamento
```

---

## Performance e Otimizações

- Build otimizado com Vite
- Lazy loading de slides quando aplicável
- Memoização de componentes custosos
- CSS variables para evitar recálculos
- Compressão gzip automática na produção

---

## Melhorias Implementadas

- Consolidação de análises redundantes de distribuição por categorias
- Remoção de gráficos de pizza em favor de visualizações mais diretas
- Implementação de 3 novos slides com conteúdo único e não repetido
- Sistema completo de ícones SVG em substituição aos emojis
- Modo escuro e claro com animação de fundo neomórfica
- Paletas de cores dinâmicas com sliders RGB

---

## Limitações Conhecidas

- PDF export não foi implementado (SPA com renderização dinâmica)
- NeoBarChart, NeoPieChart e NeoHeatmap não utilizados atualmente
- Dados limitados a três meses (agosto a outubro de 2025)

---

## Padrão de Código

### Tipagem TypeScript
Todos os componentes são totalmente tipados:

```typescript
interface DataPoint {
  km: number;
  categoria: 'BOM' | 'REGULAR' | 'RUIM' | 'PÉSSIMO';
  pavimentada: boolean;
  rodovia: string;
  uf: string;
  icm: number;
}
```

### Uso de Contexts
Gerenciamento de estado global através de React Context:

```typescript
const { colors } = useColorPalette();
const { currentSlide, goToSlide } = useSlideNavigation();
```

---

## Suporte e Contato

Para dúvidas ou sugestões sobre a aplicação, entre em contato com a equipe do projeto.

---

## Informações do Projeto

- **Versão**: 1.0.0
- **Data**: Dezembro de 2025
- **Linguagem Principal**: TypeScript
- **Framework**: React 19
- **Build Tool**: Vite
- **Licença**: Proprietária

---

**Desenvolvido com foco em excelência técnica, acessibilidade e experiência do usuário.**
```
