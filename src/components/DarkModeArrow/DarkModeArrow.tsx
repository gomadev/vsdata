import React, { useState, useRef, useEffect } from 'react';
import styles from './DarkModeArrow.module.css';

export const DarkModeArrow: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [darkProgress, setDarkProgress] = useState(0);
  const arrowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (light: string, dark: string, prog: number): string => {
    const lightRgb = hexToRgb(light);
    const darkRgb = hexToRgb(dark);
    
    if (!lightRgb || !darkRgb) return light;
    
    const r = Math.round(lightRgb.r + (darkRgb.r - lightRgb.r) * prog);
    const g = Math.round(lightRgb.g + (darkRgb.g - lightRgb.g) * prog);
    const b = Math.round(lightRgb.b + (darkRgb.b - lightRgb.b) * prog);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const applyProgress = (progress: number) => {
    const root = document.documentElement;
    
    const lightBg = '#e0e5ec';
    const darkBg = '#1f2937';
    const lightText = '#2c3e50';
    const darkText = '#f5f7fa';
    const lightShadowLight = '#ffffff';
    const lightShadowDark = '#a3b1c6';
    const darkShadowDark = 'rgba(0, 0, 0, 0.3)';

    const bgColor = interpolateColor(lightBg, darkBg, progress);
    const textColor = interpolateColor(lightText, darkText, progress);
    const shadowLightColor = interpolateColor(lightShadowLight, lightShadowDark, progress);
    const shadowDarkColor = interpolateColor(lightShadowDark, darkShadowDark, progress);

    root.style.setProperty('--bg-primary', bgColor);
    root.style.setProperty('--text-primary', textColor);
    root.style.setProperty('--shadow-light', shadowLightColor);
    root.style.setProperty('--shadow-dark', shadowDarkColor);
    
    const neoShadowRaised = `12px 12px 24px ${shadowDarkColor}, -12px -12px 24px ${shadowLightColor}`;
    const neoShadowPressed = `inset 8px 8px 16px ${shadowDarkColor}, inset -8px -8px 16px ${shadowLightColor}`;
    const neoShadowFlat = `6px 6px 12px ${shadowDarkColor}, -6px -6px 12px ${shadowLightColor}`;
    
    root.style.setProperty('--neo-shadow-raised', neoShadowRaised);
    root.style.setProperty('--neo-shadow-pressed', neoShadowPressed);
    root.style.setProperty('--neo-shadow-flat', neoShadowFlat);

    if (arrowRef.current) {
      arrowRef.current.style.left = `${progress * 100}%`;
    }

    if (overlayRef.current) {
      overlayRef.current.style.width = `${progress * 100}%`;
    }

    setDarkProgress(progress);
  };

  useEffect(() => {
    // Inicializa com left = 0
    if (arrowRef.current) {
      arrowRef.current.style.left = '0%';
    }
    if (overlayRef.current) {
      overlayRef.current.style.width = '0%';
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const progress = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      applyProgress(progress);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div 
        ref={overlayRef}
        className={styles.darkOverlay}
      />
      
      <div
        ref={arrowRef}
        className={`${styles.arrowContainer} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={() => setIsDragging(true)}
        title={`Dark Mode: ${Math.round(darkProgress * 100)}%`}
      >
        <span className={styles.symbol}>
          {darkProgress < 0.5 ? '→' : '←'}
        </span>
        
        <div className={styles.progressIndicator}>
          <div 
            className={styles.progressFill}
            style={{ width: `${darkProgress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
