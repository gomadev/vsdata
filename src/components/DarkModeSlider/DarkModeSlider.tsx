import React, { useState, useRef, useEffect } from 'react';
import styles from './DarkModeSlider.module.css';

export const DarkModeSlider: React.FC = () => {
  const [darkProgress, setDarkProgress] = useState(0); // 0 = light, 1 = dark
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Atualiza CSS variables baseado no progresso
  useEffect(() => {
    const root = document.documentElement;
    
    // Interpolação linear entre light e dark
    const lightBg = '#e0e5ec';
    const darkBg = '#1f2937';
    
    const lightText = '#2c3e50';
    const darkText = '#f5f7fa';
    
    const lightShadowLight = '#ffffff';
    const darkShadowLight = 'rgba(255, 255, 255, 0.1)';
    
    const lightShadowDark = '#a3b1c6';
    const darkShadowDark = 'rgba(0, 0, 0, 0.3)';

    // Interpola cores RGB
    const interpolateColor = (light: string, dark: string, progress: number): string => {
      const lightRgb = hexToRgb(light);
      const darkRgb = hexToRgb(dark);
      
      if (!lightRgb || !darkRgb) return light;
      
      const r = Math.round(lightRgb.r + (darkRgb.r - lightRgb.r) * progress);
      const g = Math.round(lightRgb.g + (darkRgb.g - lightRgb.g) * progress);
      const b = Math.round(lightRgb.b + (darkRgb.b - lightRgb.b) * progress);
      
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

    const bgColor = interpolateColor(lightBg, darkBg, darkProgress);
    const textColor = interpolateColor(lightText, darkText, darkProgress);
    
    root.style.setProperty('--bg-primary', bgColor);
    root.style.setProperty('--text-primary', textColor);
    root.style.setProperty('--text-secondary', interpolateColor('#5a6c7d', '#d1d5db', darkProgress));
    root.style.setProperty('--shadow-light', darkProgress < 0.5 
      ? lightShadowLight 
      : interpolateColor(lightShadowLight, darkShadowLight, darkProgress)
    );
    root.style.setProperty('--shadow-dark', interpolateColor(lightShadowDark, darkShadowDark, darkProgress));
    
    // Adapta neomorfismo pro dark mode
    const neoShadowRaised = darkProgress < 0.5
      ? `12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light)`
      : `12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light)`;
    
    root.style.setProperty('--neo-shadow-raised', neoShadowRaised);
    root.style.setProperty('--neo-shadow-pressed', neoShadowRaised);
    root.style.setProperty('--neo-shadow-flat', neoShadowRaised);
  }, [darkProgress]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Calcula progresso baseado em position (0 = esquerda/light, 1 = direita/dark)
    const progress = Math.max(0, Math.min(1, x / rect.width));
    setDarkProgress(progress);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={styles.container}
      onMouseDown={handleMouseDown}
      title="Arraste para alternar entre Light e Dark Mode"
    >
      {/* Fundo com gradiente */}
      <div className={styles.background}>
        <div className={styles.lightSide}>☀️</div>
        <div className={styles.darkSide}>🌙</div>
      </div>

      {/* Indicador de progresso */}
      <div 
        className={styles.progressBar}
        style={{ 
          width: `${darkProgress * 100}%`,
          backgroundColor: `rgba(0, 0, 0, ${0.2 + darkProgress * 0.3})`
        }}
      />

      {/* Handle (botãozinho arrastável) */}
      <div 
        className={`${styles.handle} ${isDragging ? styles.dragging : ''}`}
        style={{ 
          left: `${darkProgress * 100}%`,
          backgroundColor: darkProgress < 0.5 
            ? `rgb(51, 65, 85, ${0.8 + darkProgress * 0.2})`
            : `rgb(229, 231, 235, ${0.8 - darkProgress * 0.2})`
        }}
      >
        <span className={styles.arrow}>
          {darkProgress < 0.5 ? '→' : '←'}
        </span>
      </div>

      {/* Label */}
      <div className={styles.label}>
        {darkProgress < 0.3 && 'Light'}
        {darkProgress >= 0.3 && darkProgress < 0.7 && 'Transitioning...'}
        {darkProgress >= 0.7 && 'Dark'}
      </div>
    </div>
  );
};
