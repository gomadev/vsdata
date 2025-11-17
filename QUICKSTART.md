# 🚀 Guia Rápido - Primeiros Passos

## ✅ Checklist de Início

### 1️⃣ Verificar Instalação (FEITO ✓)
```bash
# Já está instalado e funcionando!
npm run dev  # Rodando em http://localhost:5173
```

### 2️⃣ Personalizar o Conteúdo

#### Slide Inicial (Introdução)
📍 `src/slides/IntroSlide/IntroSlide.tsx`

```typescript
// Já está pronto com:
// - Título "VS Dados"
// - Autores "Guilherme & Luane"
// ✅ Este slide está completo!
```

#### Slides de Conteúdo
📍 `src/slides/DataOverviewSlide/` - Visão geral dos dados
📍 `src/slides/VisualizationSlide/` - Gráficos e visualizações
📍 `src/slides/InsightsSlide/` - Descobertas e análises
📍 `src/slides/ConclusionSlide/` - Conclusão

**Como editar**: Abra cada arquivo `.tsx` e substitua o texto placeholder pelos seus dados.

### 3️⃣ Adicionar Seus Dados

**Opção A - Dados Estáticos** (Mais simples)
```typescript
// Direto no componente do slide
const meusDados = [
  { nome: "Produto A", vendas: 1200 },
  { nome: "Produto B", vendas: 850 },
  // ...
];
```

**Opção B - Dados de Arquivo** (Organizado)
1. Crie `src/data/meusDados.ts`
2. Exporte seus dados
3. Importe nos slides

**Exemplo prático** já criado em:
📁 `src/examples/dataExample.ts`

### 4️⃣ Personalizar Cores

📍 `src/styles/variables.css`

```css
:root {
  --bg-primary: #e0e5ec;     /* Fundo principal */
  --accent: #667eea;          /* Cor de destaque - MUDE AQUI! */
  --accent-hover: #764ba2;    /* Cor hover - MUDE AQUI! */
}
```

**Dicas de cores neomórficas:**
- Cinza claro: `#e0e5ec` (padrão)
- Azul suave: `#dde1f0`
- Rosa claro: `#f0e1ea`
- Verde claro: `#e1f0e9`

### 5️⃣ Testar Navegação

**Teclado:**
- `→` ou `Espaço`: Próximo slide
- `←`: Slide anterior

**Mouse:**
- Clique nos botões "Anterior" e "Próximo"

### 6️⃣ Adicionar Gráficos (Quando tiver dados)

**Recomendação: Recharts** (mais fácil para começar)

```bash
npm install recharts
```

**Exemplo rápido:**
```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', vendas: 400 },
  { name: 'Fev', vendas: 300 },
  { name: 'Mar', vendas: 600 },
];

<BarChart width={500} height={300} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="vendas" fill="#667eea" />
</BarChart>
```

## 📝 Ordem Recomendada de Trabalho

1. ✅ **Estrutura criada** (FEITO)
2. ⏭️ **Coletar/preparar seus dados**
3. ⏭️ **Editar slide de Visão Geral** com informações do dataset
4. ⏭️ **Instalar biblioteca de gráficos** (Recharts)
5. ⏭️ **Criar visualizações** no VisualizationSlide
6. ⏭️ **Extrair insights** dos dados
7. ⏭️ **Preencher slide de Insights**
8. ⏭️ **Escrever conclusões**
9. ⏭️ **Ajustar cores** (se quiser personalizar)
10. ⏭️ **Testar apresentação** completa

## 🎨 Customizações Rápidas

### Mudar número de slides
📍 `src/App.tsx` - linha ~18
```typescript
const slides: Slide[] = [
  { id: 1, component: IntroSlide },
  { id: 2, component: DataOverviewSlide },
  // Adicione ou remova slides aqui
];
```

### Adicionar novo slide
```bash
# 1. Copie uma pasta de slide existente
cp -r src/slides/DataOverviewSlide src/slides/MeuNovoSlide

# 2. Renomeie os arquivos dentro
# 3. Edite o conteúdo
# 4. Exporte em src/slides/index.ts
# 5. Adicione no array de slides em App.tsx
```

## 🔥 Comandos Úteis

```bash
# Desenvolvimento (servidor local)
npm run dev

# Build para produção
npm run build

# Visualizar build de produção
npm run preview

# Checar erros do TypeScript
npx tsc --noEmit

# Ver estrutura de arquivos
tree src/  # ou dir /s src\ no Windows
```

## 📖 Documentação Completa

- **README.md**: Guia geral do projeto
- **ARCHITECTURE.md**: Detalhes técnicos da arquitetura
- **Este arquivo**: Guia prático de início rápido

## 💡 Dicas Pro

1. **Mantenha o servidor rodando** (`npm run dev`) enquanto edita - as mudanças aparecem automaticamente
2. **Use Ctrl+C** no terminal para parar o servidor
3. **Salve frequentemente** - o HMR (Hot Module Replacement) atualiza na hora
4. **Abra o DevTools** (F12) para debugar se algo não funcionar
5. **Teste em diferentes resoluções** - o layout é responsivo

## ❓ Dúvidas Comuns

**Q: Como adiciono mais slides?**
A: Copie uma pasta de slide existente, renomeie, edite e adicione em `App.tsx`

**Q: Posso mudar a ordem dos slides?**
A: Sim! Apenas reordene o array `slides` em `App.tsx`

**Q: Como adiciono imagens?**
A: Coloque em `public/` e use `<img src="/nome-da-imagem.png" />`

**Q: E se eu quebrar algo?**
A: O terminal mostrará o erro. Leia a mensagem - geralmente indica o arquivo e linha.

## 🎯 Próximos Passos AGORA

1. **Prepare seus dados** (planilha, JSON, etc.)
2. **Abra** `src/slides/DataOverviewSlide/DataOverviewSlide.tsx`
3. **Substitua** o texto placeholder pelos seus dados
4. **Salve** e veja a mudança no navegador
5. **Repita** para os outros slides

---

**Está pronto para impressionar! 🚀**

O servidor já está rodando em: http://localhost:5173

Qualquer dúvida, consulte README.md ou ARCHITECTURE.md
