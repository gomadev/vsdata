# Guia de Apresentação - Visualização de Dados

## 🎬 Roteiro Sugerido (8-10 minutos)

### Slide 1: Introdução (30s)
**Fala sugerida:**
> "Hoje vamos analisar o estado das rodovias federais brasileiras através do Índice de Conservação e Manutenção - ICM. Utilizamos dados de outubro de 2025 com quase 97 mil trechos avaliados."

**Ação:** Sem interação, apenas apresentar

---

### Slide 2: Contexto - O Problema (45s)
**Fala sugerida:**
> "O ICM classifica as rodovias em 4 categorias: BOM, REGULAR, RUIM e PÉSSIMO. Nossa análise revela que [X]% das rodovias estão em estado crítico, ou seja, RUIM ou PÉSSIMO, necessitando intervenção urgente."

**Destaque:** Número grande em vermelho (impacto visual)

---

### Slide 3: Distribuição ICM (2min)
**Fala sugerida:**
> "Este gráfico de pizza mostra a distribuição completa. Vejam como implementamos uma inovação: fatias muito pequenas (menos de 5%) podem ser difíceis de ler. Ao passar o mouse sobre elas..."

**DEMO AO VIVO:**
1. Hover sobre uma fatia pequena
2. Mostrar expansão e rotação
3. Explicar: "A pizza rotaciona automaticamente, mas reparem que o texto permanece horizontal para facilitar a leitura"

**Justificativa técnica:**
- Cores semânticas (verde = bom, vermelho = crítico)
- Interatividade resolve problema de legibilidade
- Animação com pausas a 90° (posição ideal de leitura)

---

### Slide 4: Estados Críticos (2min)
**Fala sugerida:**
> "Agora vamos além da visão geral e identificar ONDE estão os problemas. Este gráfico de barras ranqueia os 10 estados com piores médias de ICM."

**DEMO AO VIVO:**
1. Hover em cada barra para revelar valores
2. Apontar top 3 estados
3. Comentar diferenças regionais

**Justificativa técnica:**
- Gráfico de barras ideal para ranking
- Valores aparecem sob demanda (minimalismo)
- Ordenação decrescente facilita comparação

---

### Slide 5: Princípios Aplicados (1.5min)
**Fala sugerida:**
> "Durante o desenvolvimento, aplicamos 3 princípios fundamentais de visualização de dados:"

1. **Interatividade**: Não apenas mostrar dados, mas permitir exploração
2. **Hierarquia Visual**: Cores com significado (criticidade crescente)
3. **Acessibilidade**: Navegação por teclado, ARIA labels, contraste adequado

**Demonstrar:**
- Apertar setas do teclado para navegar
- Mencionar WCAG 2.1 compliance

---

### Slide 6: Conclusão (1min)
**Fala sugerida:**
> "Em resumo, identificamos que [X]% das rodovias necessitam intervenção urgente. Os dados mostram concentração de problemas em [regiões/estados]. Esta apresentação demonstra como storytelling com dados, marcas visuais apropriadas e interatividade podem transformar números em insights acionáveis."

**Finalizar:** "Obrigado! Estamos abertos a perguntas."

---

## 🎯 Pontos-Chave para Destacar

### Técnicos (para professores/avaliadores)
1. **Processamento de Dados**: 97k linhas CSV carregadas e processadas em React
2. **Performance**: `useMemo` para otimização, animações 60fps
3. **TypeScript**: Código 100% tipado, interfaces bem definidas
4. **Modularidade**: Componentes reutilizáveis (NeoPieChart, NeoBarChart)

### Design (princípios de visualização)
1. **Escolha de gráficos**:
   - Pizza → Proporção/distribuição
   - Barras → Ranking/comparação
2. **Cores semânticas**: Verde/Amarelo/Vermelho/Marrom (intuitivo)
3. **Minimalismo extremo**: Zero clutter, foco nos dados
4. **Neomorfismo**: Sombras suaves, bordas brancas, profundidade

### Inovação
1. **Expansão de fatias pequenas**: Solução criativa para problema comum
2. **Rotação com texto fixo**: Técnica avançada (counter-rotation)
3. **Storytelling claro**: Problema → Dados → Análise → Conclusão

---

## ⌨️ Atalhos de Teclado (para apresentação)

- `→` ou `Espaço`: Próximo slide
- `←`: Slide anterior
- `F11`: Fullscreen (recomendado)

---

## 🛠️ Checklist Pré-Apresentação

- [ ] Servidor rodando (`npm run dev`)
- [ ] Navegador aberto em localhost:5173
- [ ] Modo fullscreen (F11)
- [ ] Som do sistema mutado (evitar notificações)
- [ ] DevTools fechado
- [ ] Slide 1 carregado e pronto

---

## 💡 Dicas

### Se perguntarem sobre dados
- **Fonte**: Dados reais de levantamentos ICM 2025
- **Volume**: 97.231 trechos pavimentados
- **Formato**: CSV com 15 colunas
- **Processamento**: Fetch + parsing + categorização em React

### Se perguntarem sobre tecnologias
- React 18 (hooks, functional components)
- TypeScript (type safety)
- Vite (build tool, HMR)
- CSS Modules (scoped styles)
- SVG (gráficos vetoriais escaláveis)

### Se perguntarem sobre desafios
1. **Sincronização rotação + texto**: Counter-rotation complexa
2. **Performance com 97k registros**: Otimização com memoization
3. **Minimalismo vs informação**: Iterações para equilíbrio

### Se perguntarem sobre acessibilidade
- ARIA labels em gráficos (role="img")
- Navegação 100% por teclado
- Contraste WCAG AA/AAA
- Redundância informacional (cores + texto + hover)

---

## 🎓 Conexão com Disciplina

### Conceitos Aplicados
1. **Storytelling com Dados** ✅
   - Narrativa clara (6 slides progressivos)
   - Foco em insights, não apenas números

2. **Marcas Visuais Adequadas** ✅
   - Pizza para proporção
   - Barras para ranking
   - Cores para categorias

3. **Interatividade** ✅
   - Hover effects
   - Expansão de elementos
   - Navegação fluida

4. **Dinamismo** ✅
   - Rotação automática
   - Transições animadas
   - Elementos responsivos

5. **Acessibilidade** ✅
   - ARIA, teclado, contraste

---

## 📊 Métricas de Sucesso

### Feedback Esperado
- ✅ "Inovador" (expansão de fatias)
- ✅ "Limpo" (minimalismo)
- ✅ "Profissional" (qualidade técnica)
- ✅ "Útil" (insights acionáveis)

### Diferenciais
- Não é template pronto
- Solução criativa para problema real
- Código bem estruturado
- Documentação completa

---

**BOA APRESENTAÇÃO! 🚀**
