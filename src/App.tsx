import React from 'react';
import { useSlideNavigation } from './hooks/useSlideNavigation';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { SlideNavigation } from './components/SlideNavigation';
import { ColorPaletteFilter } from './components/ColorPaletteFilter/ColorPaletteFilter';
import { TextColorFilter } from './components/TextColorFilter/TextColorFilter';
import { ColorPaletteProvider, useColorPalette } from './contexts/ColorPaletteContext';
import {
  IntroSlide,
  ContextSlide,
  DataOverviewSlide,
  StatisticsSlide,
  CriticalAnalysisSlide,
  ComparisonSlide,
  TimelineSlide,
  VisualizationSlide,
  BestWorstSlide,
  RegionComparisonSlide,
  NorthAnalysisSlide,
  SoutheastAnalysisSlide,
  HeatmapSlide,
  StackedAreaSlide,
  HighwayAnalysisSlide,
  SurfaceTypeSlide,
  LaneAnalysisSlide,
  EconomicImpactSlide,
  InvestmentSlide,
  KeyFindingsSlide,
  RecommendationsSlide,
  ActionPlanSlide,
  TechnologySlide,
  NextStepsSlide,
  InsightsSlide,
  MethodologySlide,
  TeamSlide,
  ConclusionSlide,
} from './slides';
import type { Slide } from './types';
import './styles/variables.css';
import './styles/global.css';
import styles from './App.module.css';

// Configuração dos slides - 28 SLIDES TOTAIS!
const slides: Slide[] = [
  { id: 1, component: IntroSlide, title: 'Introdução' },
  { id: 2, component: ContextSlide, title: 'O Problema' },
  { id: 3, component: DataOverviewSlide, title: 'Distribuição ICM' },
  { id: 4, component: StatisticsSlide, title: 'Estatísticas Gerais' },
  { id: 5, component: CriticalAnalysisSlide, title: 'Análise Crítica' },
  { id: 6, component: ComparisonSlide, title: 'BOM vs PÉSSIMO' },
  { id: 7, component: TimelineSlide, title: 'Evolução por Trecho' },
  { id: 8, component: VisualizationSlide, title: 'Top 10 Estados' },
  { id: 9, component: BestWorstSlide, title: 'Melhores vs Piores' },
  { id: 10, component: RegionComparisonSlide, title: 'Comparação Regional' },
  { id: 11, component: NorthAnalysisSlide, title: 'Análise Região Norte' },
  { id: 12, component: SoutheastAnalysisSlide, title: 'Análise Região Sudeste' },
  { id: 13, component: HeatmapSlide, title: 'Matriz UF x Categoria' },
  { id: 14, component: StackedAreaSlide, title: 'Distribuição por UF' },
  { id: 15, component: HighwayAnalysisSlide, title: 'Top Rodovias' },
  { id: 16, component: SurfaceTypeSlide, title: 'Tipo de Pavimentação' },
  { id: 17, component: LaneAnalysisSlide, title: 'Distribuição por Categoria' },
  { id: 18, component: EconomicImpactSlide, title: 'Impacto Econômico' },
  { id: 19, component: InvestmentSlide, title: 'Investimento Necessário' },
  { id: 20, component: KeyFindingsSlide, title: 'Principais Descobertas' },
  { id: 21, component: RecommendationsSlide, title: 'Recomendações' },
  { id: 22, component: ActionPlanSlide, title: 'Plano de Ação' },
  { id: 23, component: TechnologySlide, title: 'Soluções Tecnológicas' },
  { id: 24, component: NextStepsSlide, title: 'Próximos Passos' },
  { id: 25, component: InsightsSlide, title: 'Princípios Aplicados' },
  { id: 26, component: MethodologySlide, title: 'Metodologia' },
  { id: 27, component: TeamSlide, title: 'Equipe & Contato' },
  { id: 28, component: ConclusionSlide, title: 'Conclusão' },
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
  const { setColorPalette } = useColorPalette();

  return (
    <div className={styles.app}>
      <div className={styles.filterContainer}>
        <ColorPaletteFilter onPaletteChange={setColorPalette} />
        <TextColorFilter />
      </div>
      
      <div 
        className={`${styles.slideContainer} ${
          direction === 'next' ? styles.slideNext : styles.slidePrev
        }`}
        key={currentSlide}
        role="main"
        aria-label={`Slide ${currentSlide + 1} de ${slides.length}: ${slides[currentSlide].title}`}
      >
        <span className="sr-only">Slide {currentSlide + 1}: {slides[currentSlide].title}</span>
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

const AppWithProvider: React.FC = () => {
  return (
    <ColorPaletteProvider>
      <App />
    </ColorPaletteProvider>
  );
};

export default AppWithProvider;
