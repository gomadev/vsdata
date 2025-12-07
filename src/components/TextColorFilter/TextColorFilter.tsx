import React, { useState } from 'react';
import { useColorPalette, TEXT_COLOR_PALETTES } from '../../contexts/ColorPaletteContext';
import styles from './TextColorFilter.module.css';

export const TextColorFilter: React.FC = () => {
  const { textPalette, setTextPalette } = useColorPalette();
  const [isOpen, setIsOpen] = useState(false);

  const paletteNames: Array<keyof typeof TEXT_COLOR_PALETTES> = ['default', 'highContrast', 'vivid', 'accessible', 'warm'];

  return (
    <div className={styles.container}>
      <button
        className={`${styles.filterButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Alterar cores dos textos"
        aria-label="Abrir menu de paletas de cores de fonte"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="6" cy="6" r="2"/>
          <circle cx="18" cy="6" r="2"/>
          <circle cx="12" cy="18" r="2"/>
          <circle cx="6" cy="18" r="2"/>
          <line x1="8" y1="6" x2="16" y2="6"/>
          <line x1="10" y1="18" x2="14" y2="18"/>
          <line x1="6" y1="8" x2="6" y2="16"/>
          <line x1="18" y1="8" x2="18" y2="16"/>
        </svg>
        <span>Fontes</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          {paletteNames.map((palette) => (
            <button
              key={palette}
              className={`${styles.option} ${textPalette === palette ? styles.selected : ''}`}
              onClick={() => {
                setTextPalette(palette);
                setIsOpen(false);
              }}
              role="menuitem"
              aria-label={`Paleta de cores de texto: ${palette}${textPalette === palette ? ' (selecionada)' : ''}`}
              aria-current={textPalette === palette ? 'true' : 'false'}
            >
              <div className={styles.previewContainer} aria-hidden="true">
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: TEXT_COLOR_PALETTES[palette].primary }}
                />
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: TEXT_COLOR_PALETTES[palette].secondary }}
                />
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: TEXT_COLOR_PALETTES[palette].accent }}
                />
              </div>
              <span className={styles.paletteName}>
                {palette.charAt(0).toUpperCase() + palette.slice(1)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextColorFilter;
