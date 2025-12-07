import React, { useState, useRef, useEffect } from 'react';
import styles from './DarkModeCarousel.module.css';

interface DarkModeMode {
  id: string;
  label: string;
  progress: number;
  icon: string;
  description: string;
}

const DARK_MODES: DarkModeMode[] = [
  { id: 'light', label: 'Light', progress: 0, icon: '☀️', description: 'Modo claro' },
  { id: 'transition-25', label: '25%', progress: 0.25, icon: '🌤️', description: 'Pouco escuro' },
  { id: 'transition-50', label: '50%', progress: 0.5, icon: '🌓', description: 'Meia transição' },
  { id: 'transition-75', label: '75%', progress: 0.75, icon: '🌙', description: 'Quase escuro' },
  { id: 'dark', label: 'Dark', progress: 1, icon: '🌚', description: 'Modo escuro' },
];

export const DarkModeCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);

  const currentMode = DARK_MODES[currentIndex];

  // Atualiza CSS variables baseado no progresso
  useEffect(() => {
    const root = document.documentElement;
    const progress = currentMode.progress;
    
    // Cores base
    const lightBg = '#e0e5ec';
    const darkBg = '#1f2937';
    
    const lightText = '#2c3e50';
    const darkText = '#f5f7fa';
    
    const lightShadowLight = '#ffffff';
    const darkShadowLight = 'rgba(255, 255, 255, 0.1)';
    
    const lightShadowDark = '#a3b1c6';
    const darkShadowDark = 'rgba(0, 0, 0, 0.3)';

    // Função de interpolação
    const interpolateColor = (light: string, dark: string, prog: number): string => {
      const lightRgb = hexToRgb(light);
      const darkRgb = hexToRgb(dark);
      
      if (!lightRgb || !darkRgb) return light;
      
      const r = Math.round(lightRgb.r + (darkRgb.r - lightRgb.r) * prog);
      const g = Math.round(lightRgb.g + (darkRgb.g - lightRgb.g) * prog);
      const b = Math.round(lightRgb.b + (darkRgb.b - lightRgb.b) * prog);
      
      return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    root.style.setProperty('--bg-primary', interpolateColor(lightBg, darkBg, progress));
    root.style.setProperty('--text-primary', interpolateColor(lightText, darkText, progress));
    root.style.setProperty('--text-secondary', interpolateColor('#5a6c7d', '#d1d5db', progress));
    root.style.setProperty('--shadow-light', progress < 0.5 
      ? lightShadowLight 
      : interpolateColor(lightShadowLight, darkShadowLight, progress)
    );
    root.style.setProperty('--shadow-dark', interpolateColor(lightShadowDark, darkShadowDark, progress));
  }, [currentMode.progress]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const offset = e.clientX - dragStart;
    const threshold = 50; // Mínimo de pixels pra considerar swipe

    if (offset > threshold) {
      // Swipe para direita = voltar
      handlePrevious();
    } else if (offset < -threshold) {
      // Swipe para esquerda = avançar
      handleNext();
    }

    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - touchStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const offset = touchStart - e.changedTouches[0].clientX;
    const threshold = 50;

    if (offset > threshold) {
      handleNext();
    } else if (offset < -threshold) {
      handlePrevious();
    }

    setDragOffset(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DARK_MODES.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + DARK_MODES.length) % DARK_MODES.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Carousel principal */}
      <div
        ref={containerRef}
        className={`${styles.carousel} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        title="Deslize para mudar o modo (Light/Dark)"
      >
        {/* Cards do carousel */}
        <div className={styles.cardsWrapper}>
          {DARK_MODES.map((mode, index) => (
            <div
              key={mode.id}
              className={`${styles.card} ${
                index === currentIndex ? styles.active : ''
              } ${isDragging ? styles.noTransition : ''}`}
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.modeIcon}>{mode.icon}</div>
                <div className={styles.modeLabel}>{mode.label}</div>
                <div className={styles.modeDescription}>{mode.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setas de navegação */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={handlePrevious}
        aria-label="Modo anterior"
        title="Anterior (ou deslize para direita)"
      >
        ‹
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={handleNext}
        aria-label="Próximo modo"
        title="Próximo (ou deslize para esquerda)"
      >
        ›
      </button>

      {/* Indicadores de progresso (dots) */}
      <div className={styles.dotsContainer}>
        {DARK_MODES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Mudar para ${DARK_MODES[index].label}`}
            title={DARK_MODES[index].description}
          />
        ))}
      </div>

      {/* Info texto */}
      <div className={styles.info}>
        <span className={styles.label}>{currentMode.label}</span>
        <span className={styles.description}>{currentMode.description}</span>
      </div>
    </div>
  );
};
