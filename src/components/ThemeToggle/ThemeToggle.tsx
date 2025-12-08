import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '../Icons';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    
    if (dark) {
      // DARK MODE - Neomorfismo escuro com sombras em tons cinza/azuis
      const darkBg = '#1f2937';
      const darkText = '#f5f7fa';
      const darkSecondary = '#d1d5db';
      
      root.style.setProperty('--bg-primary', darkBg);
      root.style.setProperty('--text-primary', darkText);
      root.style.setProperty('--text-secondary', darkSecondary);
      
      // Sombras para dark mode - usar preto com baixa opacidade (sombra suave)
      // e um cinza claro para highlight sutil
      const neoShadowRaised = `
        12px 12px 24px rgba(0, 0, 0, 0.3),
        -12px -12px 24px rgba(255, 255, 255, 0.05)
      `;
      const neoShadowPressed = `
        inset 12px 12px 24px rgba(0, 0, 0, 0.3),
        inset -12px -12px 24px rgba(255, 255, 255, 0.05)
      `;
      const neoShadowFlat = `
        6px 6px 12px rgba(0, 0, 0, 0.25),
        -6px -6px 12px rgba(255, 255, 255, 0.03)
      `;
      
      root.style.setProperty('--shadow-light', 'rgba(255, 255, 255, 0.05)');
      root.style.setProperty('--shadow-dark', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--neo-shadow-raised', neoShadowRaised);
      root.style.setProperty('--neo-shadow-pressed', neoShadowPressed);
      root.style.setProperty('--neo-shadow-flat', neoShadowFlat);
    } else {
      // LIGHT MODE - Neomorfismo clássico com sombras suave
      const lightBg = '#e0e5ec';
      const lightText = '#1a202c';
      const lightSecondary = '#4a5568';
      
      root.style.setProperty('--bg-primary', lightBg);
      root.style.setProperty('--text-primary', lightText);
      root.style.setProperty('--text-secondary', lightSecondary);
      
      // Sombras para light mode - sombra escura suave e branco puro para highlight
      const neoShadowRaised = `
        12px 12px 24px rgba(163, 177, 198, 0.5),
        -12px -12px 24px rgba(255, 255, 255, 0.8)
      `;
      const neoShadowPressed = `
        inset 12px 12px 24px rgba(163, 177, 198, 0.4),
        inset -12px -12px 24px rgba(255, 255, 255, 0.8)
      `;
      const neoShadowFlat = `
        6px 6px 12px rgba(163, 177, 198, 0.4),
        -6px -6px 12px rgba(255, 255, 255, 0.8)
      `;
      
      root.style.setProperty('--shadow-light', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--shadow-dark', 'rgba(163, 177, 198, 0.5)');
      root.style.setProperty('--neo-shadow-raised', neoShadowRaised);
      root.style.setProperty('--neo-shadow-pressed', neoShadowPressed);
      root.style.setProperty('--neo-shadow-flat', neoShadowFlat);
    }
  };

  const handleToggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    applyTheme(newState);
  };

  return (
    <button
      className={styles.themeButton}
      onClick={handleToggle}
      title={isDark ? 'Modo Claro' : 'Modo Escuro'}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDark ? <SunIcon size={20} color="currentColor" /> : <MoonIcon size={20} color="currentColor" />}
    </button>
  );
};
