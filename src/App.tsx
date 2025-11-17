import React from 'react';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { SlideNavigation } from './components/SlideNavigation';
import {
  IntroSlide,
  DataOverviewSlide,
  VisualizationSlide,
  InsightsSlide,
  ConclusionSlide,
} from './slides';
import type { Slide } from './types';
import './styles/variables.css';
import './styles/global.css';
import styles from './App.module.css';

// Configuração dos slides
const slides: Slide[] = [
  { id: 1, component: IntroSlide, title: 'Introdução' },
  { id: 2, component: DataOverviewSlide, title: 'Visão Geral' },
  { id: 3, component: VisualizationSlide, title: 'Visualizações' },
  { id: 4, component: InsightsSlide, title: 'Insights' },
  { id: 5, component: ConclusionSlide, title: 'Conclusão' },
];

const App: React.FC = () => {
  const {
    currentSlide,
    direction,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
  } = useSlideNavigation(slides.length);

  // Adiciona navegação por teclado
  useKeyboardNavigation(goToNext, goToPrevious, canGoNext, canGoPrevious);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className={styles.app}>
      <div 
        className={`${styles.slideContainer} ${
          direction === 'next' ? styles.slideNext : styles.slidePrev
        }`}
        key={currentSlide}
      >
        <CurrentSlideComponent />
      </div>

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
};

export default App;
