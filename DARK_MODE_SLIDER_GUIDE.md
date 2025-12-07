# 🌓 Dark Mode Arrow - Guia de Uso

## O Que É?

Uma **setinha interativa** fixa no canto direito da tela (centro verticalmente). Você **clica, segura e arrasta** horizontalmente para mudar progressivamente do modo claro para escuro - simples assim!

## Localização

**Canto direito, centro vertical** da tela:
- Um círculo roxo/azul com gradiente
- Uma setinha (`→` ou `←`) dependendo do progresso
- Uma barra de progresso embaixo
- Sempre visível

## Como Usar

### Arrastar para a Direita (Light → Dark)
```
Clique na setinha
↓
Segure e arraste para DIREITA
↓
Site fica progressivamente escuro
↓
Quando soltar, fica naquele modo
```

### Arrastar para a Esquerda (Dark → Light)
```
Clique na setinha
↓
Segure e arraste para ESQUERDA
↓
Site fica progressivamente claro
↓
Quando soltar, fica naquele modo
```

### Detalhes

- **Setinha dinâmica**: Aponta `→` quando pode escurecer, `←` quando pode clarear
- **Barra de progresso**: Embaixo do círculo, mostra quanto escuro está (0-100%)
- **Sensibilidade**: A cada 100px de arrasto = 100% de progresso (ajustável)

## Características Visuais

### Círculo
- **Cor**: Gradiente roxo/azul (#667eea → #764ba2)
- **Tamanho**: 50px de diâmetro
- **Sombra**: Efeito 3D neomórfico
- **Posição**: Right 30px, center vertical

### Setinha
- **Símbolo**: `→` ou `←` (muda com progresso)
- **Cor**: Branco
- **Tamanho**: 24px
- **Animação**: Cresce no hover

### Barra de Progresso
- **Tipo**: Barra horizontal embaixo
- **Altura**: 4px
- **Cor**: Branco semi-transparente
- **Preenchimento**: Branco opaco (cresce com arrasto)
- **Brilho**: Glow suave

## Transições Dinâmicas

Enquanto arrasta, **tudo muda smoothly**:

### O Que Muda
1. **Background**: #e0e5ec (light) → #1f2937 (dark)
2. **Textos**: #2c3e50 → #f5f7fa
3. **Sombras**: Adaptam para dark mode
4. **Toda a página**: Interpolação RGB linear

### Velocidade
- **Transição**: 0.05s linear durante drag (responsivo)
- **Finalização**: 0.3s suave ao soltar

## Estados do Arrow

### Light Mode (0%)
```
Circle: Roxo vibrante
Arrow: →
Bar: Vazio
```

### Transitioning (50%)
```
Circle: Mesmo roxo
Arrow: Vira para ← (muda de direção)
Bar: Metade preenchida
```

### Dark Mode (100%)
```
Circle: Roxo vibrante (mesma cor)
Arrow: ←
Bar: Totalmente preenchido
```

## Hover Effects

Quando passa o mouse:
- **Circle**: Aumenta de tamanho (scale 1.1)
- **Sombra**: Aumenta
- **Setinha**: Cresce levemente
- **Barra**: Mais opaca/visível

## Drag Effects

Enquanto arrasta:
- **Cursor**: Muda para "grabbing" 🖐️
- **Circle**: Aumenta mais ainda (scale 1.15)
- **Sombra**: Máxima
- **Responsividade**: Instantânea ao movimento

## Técnicamente

### Interpolação RGB
Cores interpoladas linearmente conforme arrasta:
```typescript
progress = 0.0  → Light Mode
progress = 0.5  → Meia transição
progress = 1.0  → Dark Mode
```

### Sensibilidade
- 100px de arrasto horizontal = 100% de progresso
- Pode ser ajustada no código (`dragDistance / 100`)

### CSS Variables Atualizadas
- `--bg-primary`
- `--text-primary`
- `--text-secondary`
- `--shadow-dark`

Todos os elementos usando `var(--*)` atualizam **automaticamente**.

## Responsividade

Adapta-se automaticamente:
- **Desktop** (> 768px): 50px, right 30px
- **Tablet** (< 768px): 44px, right 20px, escala 1.05
- **Mobile** (< 480px): 40px, right 15px, escala 1.08

Funciona perfeitamente em mobile também!

## Exemplos de Uso

### Exemplo 1: Explorar o Dark Mode
1. Recarregue a página
2. Veja a setinha roxo no canto direito
3. Clique e segure
4. Arraste lentamente para direita
5. Observe site escurecer progressivamente
6. Solte em qualquer ponto

### Exemplo 2: Voltar ao Light
1. Se está em dark mode
2. Clique e segure na setinha
3. Arraste para esquerda
4. Volta progressivamente para claro

### Exemplo 3: Meia Transição
1. Clique e arraste até a metade
2. Deixa no 50% - meia escuro, meia claro
3. Ótimo para testes visuais

## Efeito Especial: Setinha Muda de Direção

Um detalhe legal: quando você está em 50% de progresso, a setinha **vira de direção**:
- **0-50%**: `→` (aponta para direita = escurecer mais)
- **50-100%**: `←` (aponta para esquerda = clarear)

Isso dá um feedback visual de que você alcançou o meio!

## Arquivo Relacionado

- `src/components/DarkModeArrow/DarkModeArrow.tsx` - Lógica
- `src/components/DarkModeArrow/DarkModeArrow.module.css` - Estilos
- `src/App.tsx` - Integração (`<DarkModeArrow />`)

## Melhorias Futuras

- [ ] Salvar preferência no localStorage
- [ ] Keyboard support (← → para fine-tuning)
- [ ] Preset buttons (Light, 50%, Dark)
- [ ] Smooth snap ao soltar

---

**Implementado em 7 de Dezembro de 2025** 🎉


## Como Usar

### Opção 1: Deslizar/Arrastar
```
Card visível: Light Mode (☀️)
↓
Deslize para esquerda (tipo Instagram Stories)
↓
Próximo card aparece com animação suave
↓
Continua até Dark Mode (🌚)
```

### Opção 2: Clicar nas Setas
- **Seta ‹ (esquerda)**: Voltar ao modo anterior
- **Seta › (direita)**: Ir para próximo modo

### Opção 3: Clicar nos Dots
Cada boinha abaixo representa um modo. Clique em qualquer uma pra pular direto.

## Características Visuais

### Cards do Carousel
```
┌────────────────┐
│      ☀️        │ ← Ícone animado (bounce)
│      Light     │ ← Label do modo
│   Modo claro   │ ← Descrição
└────────────────┘
```

Cada card tem:
- **Ícone**: Emoji animado com bounce
- **Label**: Nome do modo ("Light", "25%", "50%", "75%", "Dark")
- **Descrição**: Texto descritivo em português

### Setas
- Posicionadas **fora** do carousel (left: -42px, right: -42px)
- Roxo/azul com gradiente (#667eea → #764ba2)
- Hover: aumentam de tamanho e brilham
- Click: contraem levemente

### Dots Indicadores
- **Cinza claro**: Modo não selecionado
- **Roxo brilhante**: Modo selecionado (fica alongado)
- Hover: aumentam levemente

### Efeito Glassmorphism
O carousel tem:
- Background semi-transparente (rgba)
- Backdrop blur (10px)
- Borda sutil
- Sombra neomórfica

## Transições Dinâmicas

Enquanto você navega, **tudo muda gradualmente**:

### O Que Muda
1. **Background**: #e0e5ec (light) → #1f2937 (dark)
2. **Textos**: #2c3e50 (escuro) → #f5f7fa (claro)
3. **Sombras**: Adaptam para dark mode
4. **Ícones**: Mudam de sol ☀️ para lua 🌚

### Velocidade
- Transição: 0.6s suave (cubic-bezier)
- Sem saltos abruptos

## Tecnicamente

### Modos Suportados
```typescript
[
  { progress: 0.00, icon: '☀️', label: 'Light' },
  { progress: 0.25, icon: '🌤️', label: '25%' },
  { progress: 0.50, icon: '🌓', label: '50%' },
  { progress: 0.75, icon: '🌙', label: '75%' },
  { progress: 1.00, icon: '🌚', label: 'Dark' }
]
```

### Interpolação RGB
Cada cor é interpolada linearmente:
```
Exemplo: Light bg #e0e5ec → Dark bg #1f2937 em 50%
R: 224 + (31 - 224) * 0.5 = 127.5 ≈ 128
G: 229 + (41 - 229) * 0.5 = 135
B: 236 + (55 - 236) * 0.5 = 145.5 ≈ 146
= rgb(128, 135, 146)
```

### Suporta Múltiplos Gestos
- ✅ Mouse drag (desktop)
- ✅ Touch drag (mobile)
- ✅ Clique nas setas
- ✅ Clique nos dots
- ✅ Keyboard (futuro)

## Responsividade

Adapta automaticamente:
- **Desktop** (> 768px): 200px wide, top 20px, right 20px
- **Tablet** (< 768px): 160px wide, top 10px, right 10px
- **Mobile** (< 480px): 140px wide, top 5px, right 5px

Setas e dots ficam menores no mobile, mas totalmente funcional!

## Exemplos de Uso

### Exemplo 1: Explorar Modos
1. Recarregue a página → Carousel aparece no canto superior direito
2. Veja o card com "Light" (☀️)
3. Deslize para esquerda → muda para "25%"
4. Deslize novamente → "50%"
5. Continue até "Dark" (🌚)

### Exemplo 2: Voltar ao Claro
1. Se está em Dark, clique seta ‹ (esquerda)
2. Ou deslize para direita
3. Volta progressivamente para Light

### Exemplo 3: Ir Direto ao 50%
1. Clique no terceiro dot (no meio)
2. Pula direto para "Meia transição"
3. Sem passar pelos outros

## Efeitos Especiais

### Animação de Entrada
Carousel entra do lado direito com fade-in ao carregar a página:
```css
animation: slideInCarousel 0.6s cubic-bezier(0.4, 0, 0.2, 1)
```

### Bounce do Ícone
Quando muda de card, ícone faz bounce (pula):
```css
@keyframes bounce {
  0% { transform: scale(0.5) rotateZ(-180deg); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1) rotateZ(0deg); opacity: 1; }
}
```

### Easing Suave
Cards deslizam com easing "elástico":
```css
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

## Arquivo Relacionado

- `src/components/DarkModeCarousel/DarkModeCarousel.tsx` - Lógica
- `src/components/DarkModeCarousel/DarkModeCarousel.module.css` - Estilos
- `src/App.tsx` - Integração (linha com `<DarkModeCarousel />`)

## Melhorias Futuras

- [ ] Salvar modo preferido no localStorage
- [ ] Keyboard support (← → para navegar)
- [ ] Snap automático ao soltar (já suavizado)
- [ ] Modo automático (dark à noite, light de dia)
- [ ] Animação parallax nos ícones
- [ ] Modo "Eco" verde/sustentável

---

**Implementado em 7 de Dezembro de 2025** 🎉


## Como Usar

### Localização
- **Canto inferior direito** da tela
- Um pequeno slider com icones ☀️ (esquerda) e 🌙 (direita)
- Tem um botãozinho arrastável com uma **setinha** que aponta para o lado oposto

### Interação

#### 1. **Arrastar para a Direita** (Light → Dark)
```
Position: Esquerda (0%)
↓
Arraste o handle para a direita
↓
Position: Direita (100%)
Resultado: Modo completamente escuro
```

#### 2. **Meia Transição** (Modo Misto)
Se você arrastar até 50%:
- **Metade esquerda**: Branco (Light Mode)
- **Metade direita**: Escuro (Dark Mode)
- **Cores**: Interpoladas gradualmente

#### 3. **Voltar ao Claro**
Simplesmente arraste para a esquerda novamente

### Características Visuais

#### Handle (Botão Arrastável)
- **Gradiente**: Roxo/Azul (#667eea → #764ba2)
- **Sombra Neomórfica**: Sombra 3D que aumenta ao arrastar
- **Setinha Dinâmica**: Aponta para o próximo lado
  - Esquerda (0-50%): Aponta direita `→`
  - Direita (50-100%): Aponta esquerda `←`

#### Progresso Visual
- **Barra de progresso**: Cresce da esquerda para direita
- **Ícones**: ☀️ esquerda, 🌙 direita
- **Label**: Mostra estado atual
  - "Light" (0-30%)
  - "Transitioning..." (30-70%)
  - "Dark" (70-100%)

### O Que Muda Dinamicamente

#### 1. **Background**
```
Light Mode: #e0e5ec (cinza claro)
Dark Mode:  #1f2937 (cinza escuro)
→ Interpolação suave entre os dois
```

#### 2. **Cores de Texto**
```
Light Mode: #2c3e50 (cinza escuro)
Dark Mode:  #f5f7fa (branco)
→ Transição suave
```

#### 3. **Sombras Neomórficas**
```
Light Mode:
  - Sombra clara: #ffffff (branco)
  - Sombra escura: #a3b1c6 (cinza escuro)
  
Dark Mode:
  - Sombra clara: rgba(255,255,255,0.1) (branco semitransparente)
  - Sombra escura: rgba(0,0,0,0.3) (preto semitransparente)

→ Mantém efeito neomórfico em ambos os modos
```

#### 4. **Cores de Gráficos**
As cores dos gráficos (BOM, REGULAR, RUIM, PÉSSIMO) mantêm o mesmo mapeamento em ambos os modos:
- BOM: Verde
- REGULAR: Laranja
- RUIM: Vermelho
- PÉSSIMO: Marrom

### Detalhes Técnicos

#### Interpolação de Cores
O componente usa **interpolação RGB linear** para cores:
1. Converte cores hex para RGB
2. Calcula progresso (0.0 = light, 1.0 = dark)
3. Interpola cada canal R, G, B separadamente
4. Reconverte para RGB

```
Exemplo: #e0e5ec → #1f2937 em 50% de progresso
R: 224 + (31 - 224) * 0.5 = 127
G: 229 + (41 - 229) * 0.5 = 135
B: 236 + (55 - 236) * 0.5 = 145
Resultado: rgb(127, 135, 145)
```

#### CSS Variables
O componente atualiza as seguintes variáveis CSS em tempo real:
- `--bg-primary`
- `--text-primary`
- `--text-secondary`
- `--shadow-light`
- `--shadow-dark`
- `--neo-shadow-raised`
- `--neo-shadow-pressed`
- `--neo-shadow-flat`

Todos os elementos que usam `var(--*)` atualizam **automaticamente** sem necessidade de re-render React.

### Performance

✅ **Otimizado para Performance**
- Drag listeners apenas quando ativo
- CSS transitions para sombras
- Atualização de CSS variables é super rápida
- Sem animações pesadas durante drag

### Responsividade

O slider é responsivo:
- **Desktop**: 280px × 60px, posição fixed bottom-right
- **Tablet**: 240px × 50px, reduz tamanho
- **Mobile**: Ainda funciona, mas ocupa menos espaço

## Exemplos de Uso

### Exemplo 1: Verificar Light Mode Completo
1. Recarregue a página
2. Slider estará na posição **esquerda** (0%)
3. Site em modo claro completo

### Exemplo 2: Transição Gradual para Dark
1. Clique no handle do slider
2. Arraste lentamente para direita
3. Observe o site mudar gradualmente
4. Para na metade para ver efeito misto

### Exemplo 3: Dark Mode Completo
1. Arraste slider até a **direita** (100%)
2. Site fica completamente escuro
3. Label mostra "Dark"

## Código Relevante

### Arquivo Principal
```
src/components/DarkModeSlider/DarkModeSlider.tsx
```

### Estilo
```
src/components/DarkModeSlider/DarkModeSlider.module.css
```

### Integração no App
```
src/App.tsx → <DarkModeSlider />
```

### CSS Variables
```
src/styles/variables.css
```

## Melhorias Futuras

Possíveis extensões:
- [ ] Salvar preferência no localStorage
- [ ] Detectar preferência do SO (prefers-color-scheme)
- [ ] Botão para resetar ao padrão
- [ ] Animação ao soltar o drag (snap)
- [ ] Keyboard support (← → para ajustar)
- [ ] Modo automático (escurece à noite)

## Troubleshooting

### O slider não aparece
- Verifique se `<DarkModeSlider />` está em `App.tsx`
- Verifique z-index (1000 deveria funcionar)
- Abra DevTools e procure `bottom: 30px; right: 30px;`

### Cores não mudam ao arrastar
- Verifique se CSS variables estão sendo atualizadas no DevTools
- Procure por `document.documentElement.style.setProperty`
- Verifique se `global.css` tem `transition: var(--color-transition)`

### Drag não funciona
- Verifique listeners de mouse em DevTools
- Teste em Chrome (pode ter diferenças em Firefox)
- Verifique se há `user-select: none` no container

---

**Componente criado em 7 de Dezembro de 2025** 🎉
