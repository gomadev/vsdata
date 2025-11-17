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
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Anterior
      </NeoButton>

      <div className={styles.indicator}>
        <span className={styles.currentSlide}>{currentSlide + 1}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.totalSlides}>{totalSlides}</span>
      </div>

      <NeoButton
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        size="md"
        variant="raised"
      >
        Próximo
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </NeoButton>
    </div>
  );
};
