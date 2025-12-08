import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportOptions {
  filename?: string;
  quality?: number;
  margin?: number;
}

export async function exportAllSlidesToPDF(options: ExportOptions = {}) {
  const {
    filename = 'apresentacao.pdf',
    quality = 0.95,
    margin = 5,
  } = options;

  try {
    // A4 dimensions in mm (landscape)
    const pageWidth = 297;
    const pageHeight = 210;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Total de slides (hardcoded já que são sempre 28)
    const totalSlides = 28;
    let firstPage = true;

    for (let i = 0; i < totalSlides; i++) {
      try {
        // Capturar o slide atual ANTES de clicar no próximo
        const slideElement = document.querySelector('[role="main"]') as HTMLElement;
        
        if (!slideElement) {
          console.warn(`Slide ${i + 1} não encontrado`);
          continue;
        }

        // Esperar um pouco para garantir que o slide está renderizado
        await new Promise(resolve => setTimeout(resolve, 200));

        // Criar container temporário
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.top = '0';
        tempContainer.style.left = '0';
        tempContainer.style.width = '100%';
        tempContainer.style.height = '100%';
        tempContainer.style.zIndex = '10000';
        tempContainer.style.background = 'white';
        tempContainer.style.overflow = 'hidden';
        
        const slideClone = slideElement.cloneNode(true) as HTMLElement;
        tempContainer.appendChild(slideClone);
        document.body.appendChild(tempContainer);

        // Ocultar fundo
        const bgElements = tempContainer.querySelectorAll('[class*="TireMarksBackground"]');
        bgElements.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });

        // Capturar como imagem
        const canvas = await html2canvas(tempContainer, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
        });

        document.body.removeChild(tempContainer);

        // Calcular dimensões
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;
        
        const imgData = canvas.toDataURL('image/jpeg', quality);

        // Adicionar ao PDF
        if (!firstPage) {
          pdf.addPage([pageWidth, pageHeight]);
        }
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
        firstPage = false;

        // Clicar no botão "Próximo" DEPOIS de capturar
        if (i < totalSlides - 1) {
          const nextButton = Array.from(document.querySelectorAll('button')).find(
            btn => 
              btn.textContent?.includes('Próximo') || 
              btn.getAttribute('aria-label')?.includes('próximo') ||
              btn.innerText?.includes('Próximo')
          );
          
          if (nextButton && !nextButton.hasAttribute('disabled')) {
            (nextButton as HTMLButtonElement).click();
            // Esperar a animação/transição do slide
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      } catch (error) {
        console.error(`Erro ao processar slide ${i + 1}:`, error);
      }
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}
