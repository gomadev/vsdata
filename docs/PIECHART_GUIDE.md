# 🥧 Gráfico de Pizza Neomórfico Interativo

## 🎯 O que faz

Um gráfico de pizza revolucionário que resolve o problema clássico de muitas fatias pequenas:

### Funcionalidades Principais

1. **Agrupamento Inteligente**: Fatias menores que 5% são automaticamente agrupadas em "Outros"
2. **Expansão Animada**: Ao passar o mouse em "Outros", a pizza principal desaparece suavemente
3. **Pizza Expandida**: As mini-fatias se tornam uma nova pizza completa
4. **Rotação Automática**: A pizza expandida gira no sentido horário
5. **Pausa Inteligente**: Para brevemente quando cada fatia chega a 90° (posição de leitura ideal)
6. **Retorno Suave**: Ao tirar o mouse, volta ao estado original com animação reversa

## 🎨 Características Visuais

- **Estilo Neomórfico**: Sombras suaves e efeitos 3D
- **Cores Customizáveis**: Paleta de cores moderna pré-definida
- **Labels Dentro das Fatias**: Texto legível em cada seção
- **Legenda Dinâmica**: Atualiza conforme o estado (normal/expandido)
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

## 📊 Como Usar

### Importação Básica

```typescript
import { NeoPieChart } from '../../components/NeoPieChart';
import type { PieChartDataItem } from '../../components/NeoPieChart';
```

### Preparar Dados

```typescript
const data: PieChartDataItem[] = [
  { label: 'Categoria A', value: 450, color: '#667eea' }, // cor opcional
  { label: 'Categoria B', value: 380 }, // cor automática
  { label: 'Categoria C', value: 280 },
  // ... mais categorias
  { label: 'Categoria Pequena 1', value: 45 }, // será agrupada em "Outros"
  { label: 'Categoria Pequena 2', value: 38 }, // será agrupada em "Outros"
];
```

### Renderizar

```tsx
<NeoPieChart 
  data={data}
  width={450}                // largura em pixels (padrão: 400)
  height={450}               // altura em pixels (padrão: 400)
  minSlicePercentage={5}     // % mínima para fatia principal (padrão: 5)
/>
```

## ⚙️ Props Disponíveis

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `data` | `PieChartDataItem[]` | **obrigatório** | Array com os dados |
| `width` | `number` | `400` | Largura do gráfico |
| `height` | `number` | `400` | Altura do gráfico |
| `minSlicePercentage` | `number` | `5` | % mínima para não agrupar em "Outros" |
| `className` | `string` | `''` | Classe CSS adicional |

### Interface PieChartDataItem

```typescript
interface PieChartDataItem {
  label: string;      // Nome da categoria
  value: number;      // Valor numérico
  color?: string;     // Cor opcional (hex, rgb, etc.)
}
```

## 🎨 Personalização de Cores

### Usando Cores Automáticas

Se você não especificar cores, o componente usa uma paleta pré-definida:

```typescript
const data = [
  { label: 'A', value: 100 }, // Será #667eea (roxo)
  { label: 'B', value: 200 }, // Será #764ba2 (roxo escuro)
  { label: 'C', value: 150 }, // Será #f093fb (rosa)
  // ... ciclo continua
];
```

### Cores Customizadas

```typescript
const data = [
  { label: 'Vendas', value: 450, color: '#4caf50' }, // Verde
  { label: 'Marketing', value: 280, color: '#2196f3' }, // Azul
  { label: 'Suporte', value: 180, color: '#ff9800' }, // Laranja
];
```

## 📈 Exemplos de Uso

### Exemplo 1: Dados de Vendas por Região

```typescript
const salesData: PieChartDataItem[] = [
  { label: 'Sudeste', value: 4560, color: '#667eea' },
  { label: 'Sul', value: 3120, color: '#764ba2' },
  { label: 'Nordeste', value: 2340, color: '#f093fb' },
  { label: 'Centro-Oeste', value: 1780, color: '#4facfe' },
  { label: 'Norte', value: 1250, color: '#43e97b' },
  { label: 'AC', value: 45 }, // Agrupado
  { label: 'RR', value: 38 }, // Agrupado
  { label: 'AP', value: 32 }, // Agrupado
];

<NeoPieChart data={salesData} width={500} height={500} />
```

### Exemplo 2: Distribuição de Tráfego

```typescript
const trafficData: PieChartDataItem[] = [
  { label: 'Orgânico', value: 6500 },
  { label: 'Direto', value: 3200 },
  { label: 'Redes Sociais', value: 2100 },
  { label: 'Email', value: 850 },
  { label: 'Referência', value: 420 },
  { label: 'Display', value: 180 }, // < 5%, vai para "Outros"
  { label: 'Afiliados', value: 95 }, // < 5%, vai para "Outros"
];

<NeoPieChart 
  data={trafficData}
  minSlicePercentage={3} // Menos rigoroso: agrupar apenas < 3%
/>
```

### Exemplo 3: Dados Dinâmicos (API)

```typescript
const MyComponent = () => {
  const [data, setData] = useState<PieChartDataItem[]>([]);
  
  useEffect(() => {
    fetch('/api/dados')
      .then(res => res.json())
      .then(apiData => {
        const formatted = apiData.map((item: any) => ({
          label: item.nome,
          value: item.quantidade,
          color: item.cor, // opcional
        }));
        setData(formatted);
      });
  }, []);
  
  return <NeoPieChart data={data} />;
};
```

## 🎭 Comportamento Interativo

### Estados do Gráfico

1. **Estado Normal**: 
   - Mostra fatias principais + fatia "Outros" (se houver)
   - Hover nas fatias principais: leve destaque
   - Hover em "Outros": indica que é clicável

2. **Estado Expandido** (mouse em "Outros"):
   - Pizza principal fade out + escala reduzida
   - Pizza expandida fade in com mini-fatias
   - Rotação automática começa
   - Pausa de 1.5s quando fatia chega a 90°
   - Labels giram inversamente para ficarem legíveis
   - Legenda atualiza para mostrar mini-fatias

3. **Retorno** (mouse sai):
   - Animação reversa
   - Rotação para
   - Volta ao estado normal

## 🎨 Estilos CSS

### Classes Disponíveis

```css
.chartContainer  /* Container principal */
.svg             /* Elemento SVG */
.slice           /* Fatia individual */
.otherSlice      /* Fatia "Outros" especial */
.expandedSlice   /* Fatia no estado expandido */
.legend          /* Legenda */
.legendItem      /* Item da legenda */
.hint            /* Dica de interação */
```

### Customização de Estilos

```css
/* Sobrescrever no seu componente */
.meuGrafico {
  /* Seu estilo aqui */
}

.meuGrafico .legend {
  background: #f0f0f0;
  /* Customizar legenda */
}
```

## 🔧 Configurações Avançadas

### Ajustar Limite de Agrupamento

```typescript
// Menos rigoroso - agrupa apenas < 3%
<NeoPieChart data={data} minSlicePercentage={3} />

// Mais rigoroso - agrupa < 10%
<NeoPieChart data={data} minSlicePercentage={10} />

// Desabilitar agrupamento - todas as fatias aparecem
<NeoPieChart data={data} minSlicePercentage={0} />
```

### Tamanhos Diferentes

```typescript
// Gráfico pequeno para dashboard
<NeoPieChart data={data} width={300} height={300} />

// Gráfico grande para apresentação
<NeoPieChart data={data} width={600} height={600} />

// Gráfico retangular (não recomendado para pizza)
<NeoPieChart data={data} width={500} height={400} />
```

## 💡 Dicas de Uso

1. **Dados Ordenados**: Ordene os dados por valor decrescente para melhor visualização
2. **Limite de Categorias**: Ideal ter entre 3-8 categorias principais
3. **Cores Contrastantes**: Use cores com bom contraste para melhor legibilidade
4. **Labels Curtos**: Mantenha labels concisos (máximo 15-20 caracteres)
5. **Valores Significativos**: Certifique-se que os valores façam sentido agregados

## ⚠️ Limitações Conhecidas

- **SVG**: Pode ter performance reduzida com 50+ fatias pequenas
- **Mobile**: Rotação pode ser menos suave em dispositivos antigos
- **Acessibilidade**: Considere adicionar texto alternativo para screen readers
- **Impressão**: Animações não aparecem em PDF/impressão

## 🚀 Próximas Melhorias (Futuro)

- [ ] Export para imagem (PNG/SVG)
- [ ] Tooltip com informações detalhadas
- [ ] Modo escuro automático
- [ ] Animação de entrada ao carregar
- [ ] Gesto de toque para mobile
- [ ] Opção de gráfico de rosquinha (donut)
- [ ] Destacar fatia ao clicar
- [ ] Comparação lado a lado de múltiplos gráficos

---

**Criado com ❤️ para impressionar na apresentação!**
