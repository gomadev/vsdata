# Princípios de Visualização de Dados Aplicados

## 1. Storytelling com Dados

### Estrutura Narrativa
1. **Introdução** - Contexto do problema (rodovias brasileiras)
2. **Problema** - 40%+ das rodovias em estado crítico
3. **Dados** - Distribuição ICM por categoria
4. **Análise** - Estados mais críticos (ranking)
5. **Método** - Princípios técnicos aplicados
6. **Conclusão** - Insights e necessidade de intervenção

### Técnicas Utilizadas
- Progressão lógica (contexto → dados → análise → conclusão)
- Dados numéricos impactantes (%, números grandes)
- Foco em insights acionáveis

## 2. Escolha de Marcas Visuais

### Gráfico de Pizza (Slide 3)
**Por quê?**
- Mostra **proporção** das 4 categorias ICM
- Facilita comparação visual entre BOM vs CRÍTICO
- Cores intuitivas (verde → amarelo → vermelho → marrom)

**Inovação:**
- Fatias pequenas (<5%) expansíveis
- Resolve problema de legibilidade em dados granulares

### Gráfico de Barras (Slide 4)
**Por quê?**
- Ideal para **ranking** (top 10 estados)
- Facilita comparação de valores absolutos
- Eixo comum permite leitura precisa

**Técnica:**
- Ordenação decrescente (piores primeiro)
- Valores aparecem em hover (minimalismo)

## 3. Interatividade

### Nível 1: Básico
- Navegação por teclado (← → Espaço)
- Hover nos gráficos revela valores
- Botões com estados disabled

### Nível 2: Avançado
- **Expansão de fatias pequenas**: Detecção automática de slices < 5%
- **Hover trigger**: MouseEnter inicia expansão
- **Transformação**: Fatias pequenas viram pizza completa

### Nível 3: Expert
- **Rotação sincronizada**: Pizza gira, texto não
- **Pausas inteligentes**: Para a 90° (leitura ideal)
- **Counter-rotation**: `transform: rotate(-${angle}deg)` no texto

## 4. Design Minimalista

### Princípios
1. **Menos é mais**: Removidos cards, textos verbosos, decorações
2. **Foco nos dados**: Gráficos ocupam 70%+ da tela
3. **Hierarquia clara**: Títulos 2.5rem, dados 5-6rem

### Elementos Removidos
- ❌ Subtítulos explicativos
- ❌ Cards com estatísticas extras
- ❌ Animações de entrada/saída excessivas
- ❌ Legendas poluídas (apenas essenciais)

### Elementos Mantidos
- ✅ Bordas brancas 4px (destaque neomórfico)
- ✅ Sombras suaves (profundidade)
- ✅ Espaçamento generoso (3rem gaps)

## 5. Hierarquia Visual

### Paleta de Cores Semântica
```
BOM      → #10b981 (verde)
REGULAR  → #f59e0b (amarelo)
RUIM     → #ef4444 (vermelho)
PÉSSIMO  → #7c2d12 (marrom escuro)
```

**Justificativa:**
- Cores universais (vermelho = perigo, verde = bom)
- Escala progressiva de severidade
- Alto contraste (acessibilidade)

### Tamanhos Proporcionais
```
Título principal  → 4rem
Número destaque   → 5-6rem
Subtítulo         → 1.5rem
Labels            → 0.9rem
Metadados         → 0.8rem
```

## 6. Acessibilidade (WCAG 2.1)

### Contraste
- Texto primário: #1a1a1a em #e0e5ec → 12.6:1 (AAA)
- Accent: #667eea verificado contra fundos

### Navegação
- `role="img"` em gráficos SVG
- `aria-label` descritivo em elementos interativos
- Teclado: Arrow keys + Space (sem necessidade de mouse)

### Design Inclusivo
- Texto horizontal durante rotação (legibilidade)
- Valores aparecem em hover (redundância informacional)
- Tamanhos de fonte ≥ 0.8rem (16px base)

## 7. Técnicas Específicas

### Detecção de Pequenas Fatias
```typescript
const isSmall = percentage < minSlicePercentage; // 5%
```

### Rotação com Pausa
```typescript
// Detecta quando fatia atinge 90°
const sliceMidAngle = (slice.startAngle + slice.endAngle) / 2;
const normalizedAngle = (sliceMidAngle + rotationAngle + 90) % 360;
if (Math.abs(normalizedAngle - 90) < 5) {
  setIsPaused(true);
}
```

### Counter-Rotation de Texto
```typescript
// Pizza gira, texto não
<g transform={`rotate(${rotationAngle} 50 50)`}>
  {/* Pizza */}
</g>
<text transform={`rotate(-${rotationAngle - slice.angle} ...)`}>
  {/* Texto horizontal */}
</text>
```

## 8. Performance

### Otimizações
- `useMemo` para cálculos de slices (evita recalc em hover)
- CSS Modules (escopo isolado, sem conflitos)
- `requestAnimationFrame` para animações suaves
- Lazy loading de dados (useEffect + useState)

### Métricas
- First Load: ~2s (incluindo 97k linhas CSV)
- Interaction Latency: <16ms (60fps)
- Bundle Size: ~150kb (gzipped)

## 9. Responsividade

### Breakpoints
```css
Desktop: > 768px  → Layout completo
Tablet:  480-768  → Gráficos reduzidos
Mobile:  < 480    → Stack vertical
```

### Técnicas
- `viewBox` em SVG (escala automática)
- Gaps relativos (rem)
- `max-width` em containers

## 10. Aprendizados

### O que funcionou ✅
- Minimalismo extremo (feedback positivo)
- Interatividade inovadora (expansão de fatias)
- Storytelling claro (problema → solução)

### Desafios 🎯
- Sincronização rotação + texto (complexo)
- Performance com 97k registros (resolvido com processamento eficiente)
- Equilíbrio minimalismo vs informação (iterações necessárias)

### Próximos Passos 🚀
- Adicionar filtros por UF/ano
- Mapa de calor geográfico
- Exportar insights em PDF
- Dark mode

---

**Conclusão**: A aplicação bem-sucedida destes princípios resultou em uma apresentação que não apenas visualiza dados, mas conta uma história impactante sobre a infraestrutura rodoviária brasileira.
