import React from 'react';
import type { SlideNavigationProps } from '../../types';
import { NeoButton } from '../ui';
import styles from './SlideNavigation.module.css';

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
}) => {
  return (
    <div className={styles.navigation}>
      <NeoButton
        onClick={onPrevious}
        disabled={currentSlide === 0}
        size="md"
        variant="raised"
        aria-label="Ir para slide anterior"
        title="Slide anterior (← ou Shift+←)"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Anterior
      </NeoButton>

      <div className={styles.indicator} role="status" aria-live="polite">
        <span className="sr-only">Slide atual: </span>
        <span className={styles.currentSlide}>{currentSlide + 1}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.totalSlides}>{totalSlides}</span>
      </div>

      <NeoButton
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        size="md"
        variant="raised"
        aria-label="Ir para próximo slide"
        title="Próximo slide (→ ou Espaço)"
      >
        Próximo
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </NeoButton>
    </div>
  );
};
