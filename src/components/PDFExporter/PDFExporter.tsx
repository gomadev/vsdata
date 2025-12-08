import { useState } from 'react';
import styles from './PDFExporter.module.css';

export default function PDFExporter() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      // Criar container para coletar todos os slides
      const allSlidesContainer = document.createElement('div');
      allSlidesContainer.id = 'all-slides-print';
      allSlidesContainer.style.position = 'fixed';
      allSlidesContainer.style.top = '0';
      allSlidesContainer.style.left = '0';
      allSlidesContainer.style.width = '100vw';
      allSlidesContainer.style.height = '100vh';
      allSlidesContainer.style.zIndex = '99998';
      allSlidesContainer.style.overflow = 'auto';
      allSlidesContainer.style.background = 'white';
      allSlidesContainer.style.display = 'none';
      document.body.appendChild(allSlidesContainer);

      // Guardar estado original
      const originalSlideEl = document.querySelector('[role="main"]');
      if (!originalSlideEl) {
        throw new Error('Nenhum slide encontrado');
      }

      // Coletar todos os 28 slides
      const slides: HTMLElement[] = [];
      const totalSlides = 28;

      // Voltar para slide 1
      // Clicar voltar múltiplas vezes para garantir que volta ao slide 1
      for (let j = 0; j < 30; j++) {
        const btn = Array.from(document.querySelectorAll('button')).find(
          btn => btn.getAttribute('aria-label') === 'Ir para slide anterior'
        ) as HTMLButtonElement | undefined;
        
        if (btn && !btn.disabled) {
          btn.click();
          await new Promise(resolve => setTimeout(resolve, 50));
        } else {
          break;
        }
      }

      // Coletar cada slide
      for (let i = 0; i < totalSlides; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));

        // Pegar slide atual
        const slideEl = document.querySelector('[role="main"]') as HTMLElement;
        if (slideEl) {
          const clonedSlide = slideEl.cloneNode(true) as HTMLElement;
          // Garantir page break
          clonedSlide.style.pageBreakAfter = 'always';
          clonedSlide.style.pageBreakInside = 'avoid';
          clonedSlide.style.breakAfter = 'page';
          clonedSlide.style.breakInside = 'avoid';
          
          allSlidesContainer.appendChild(clonedSlide);
          slides.push(slideEl);
        }

        // Ir para próximo
        if (i < totalSlides - 1) {
          const nextBtn = Array.from(document.querySelectorAll('button')).find(
            btn => btn.getAttribute('aria-label') === 'Ir para próximo slide'
          ) as HTMLButtonElement | undefined;
          
          if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
          }
        }
      }

      // Agora mostrar o container com todos os slides e fazer print
      allSlidesContainer.style.display = 'block';
      
      await new Promise(resolve => setTimeout(resolve, 500));

      // Chamar print
      window.print();

      // Limpar depois
      setTimeout(() => {
        if (allSlidesContainer.parentElement) {
          document.body.removeChild(allSlidesContainer);
        }
        setIsExporting(false);
      }, 2000);

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro: ' + (error as Error).message);
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      disabled={isExporting}
      className={styles.button}
      title="Exportar todos os slides como PDF"
    >
      {isExporting ? 'Coletando...' : 'Exportar PDF'}
    </button>
  );
}

