# 📄 Exportar Apresentação para PDF

## Como usar

A aplicação agora tem um botão para exportar todos os slides para um arquivo PDF de forma automática!

### Opções de Export

Você verá dois botões na barra de controle (canto superior da tela):

1. **📄 Exportar PDF** - Exporta TODOS os 28 slides em um único arquivo PDF
2. **📌 Slide Atual** - Exporta apenas o slide que você está visualizando

### Funcionalidades

✅ **Todos os slides capturados** - Cada slide é renderizado como imagem de alta qualidade  
✅ **Fundo removido** - A animação do fundo (bolas flutuantes) é automaticamente ocultada durante a captura  
✅ **Formatação A4 em landscape** - PDF formatado para impressão profissional  
✅ **Qualidade alta** - Imagens com scale 2x para máxima clareza  
✅ **Sem bloqueios de layout** - Conteúdo capturado exatamente como aparece na tela  

### Tecnologia

- **html2canvas** - Converte elementos HTML em imagens canvas
- **jsPDF** - Cria arquivo PDF com as imagens dos slides
- Suporta temas (claro/escuro) - PDF captura o estado visual atual

### Exemplo

1. Navegue pelos slides normalmente
2. Quando pronto, clique em **"📄 Exportar PDF"**
3. Um arquivo chamado `apresentacao-icm.pdf` será baixado automaticamente
4. Abra em qualquer leitor de PDF (Adobe Reader, navegador, etc.)

### Dicas

- Para melhor qualidade, use tema **claro** antes de exportar
- O PDF será salvo em landscape (paisagem) para melhor visualização dos gráficos
- Cada slide é uma página separada no PDF
- O tamanho do arquivo PDF é aproximadamente 5-10MB com 28 slides em alta qualidade

---

**Nota**: O export é feito no navegador, não requer envio para servidor nenhum!
