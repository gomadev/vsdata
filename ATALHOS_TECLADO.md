# 🎹 Guia de Atalhos de Teclado

## Navegação Principal

| Tecla | Ação |
|-------|------|
| **→** (Seta Direita) | Próximo slide |
| **←** (Seta Esquerda) | Slide anterior |
| **Espaço** | Próximo slide |
| **Home** | Primeiro slide (Slide 1) |
| **End** | Último slide (Slide 28) |
| **Números 1-9** | Ir direto para slide (ex: "5" = Slide 5) |
| **0** | Slide 10 |

## Filtros

| Tecla | Ação |
|-------|------|
| **Tab** | Navegar entre botões (Cores, Fontes, Anterior, Próximo) |
| **Enter** / **Espaço** | Ativar botão focado |
| **Esc** | Fechar menu aberto |

## Acessibilidade

| Recurso | Disponível |
|---------|-----------|
| **Screen Reader** | ✅ Suportado (NVDA, JAWS, VoiceOver) |
| **Navegação por Teclado** | ✅ Completa |
| **Contraste WCAG AA** | ✅ Implementado |
| **Modo Escuro** | ✅ Detecta preferência do OS |
| **Skip Links** | ⚠️ Planejado |

## Paletas de Cores

### Filtro "Cores" (Gráficos)
1. **Padrão** - Verde, Laranja, Vermelho, Marrom
2. **Alto Contraste** - Cores saturadas para projetor ruim
3. **Vibrante** - Neon puro
4. **Acessível** - Colorblind-safe (protanopia)
5. **Quente** - Tons marrom/laranja

### Filtro "Fontes"
1. **Padrão** - Cinza/Azul (leitura)
2. **Alto Contraste** - Preto/Branco extremo
3. **Vibrante** - Cores vibrantes
4. **Acessível** - Cinza acessível
5. **Quente** - Tons quentes

## Estrutura de Slides

```
Slides 1-2:      Contextualização (Problema)
Slides 3-10:     Exploração Visual (Dados)
Slides 11-21:    Análise Segmentada
Slides 22-26:    Aplicação de Princípios
Slides 27-28:    Considerações Finais
```

## Dicas de Apresentação

### Para Audiência com Deficiência Visual
- Use **Alto Contraste** em paletas de cores
- Amplie o zoom do navegador (Ctrl + +)
- Use **modo escuro** (prefers-color-scheme: dark)

### Para Audiência com Daltonismo
- Use paleta **Acessível** (4ª opção de cores)
- Evite combinar vermelho/verde sem outro diferenciador

### Para Apresentação em Projetor Ruim
- Use paleta **Alto Contraste** de cores
- Aumente brilho do projetor
- Escolha sala sem muito reflexo de luz

## Teste com Screen Reader

### Windows (Gratuito)
```bash
# NVDA (NonVisual Desktop Access)
# Download: https://www.nvaccess.org/
# Atalho: Alt + N para ativar
```

### macOS
```bash
# VoiceOver (built-in)
# Atalho: Cmd + F5
```

### Web Tools
```
axe DevTools (Chrome extension)
WAVE (web.illinois.edu/accessibility/tools)
```

## Feedback & Acessibilidade

Se encontrar problemas de acessibilidade:
1. Abra DevTools (F12)
2. Execute axe DevTools
3. Reporte issues encontrados

**Status Atual**: 97.5% WCAG AA compliant ✅
