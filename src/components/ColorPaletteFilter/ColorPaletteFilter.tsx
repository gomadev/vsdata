import React, { useState } from 'react';
import styles from './ColorPaletteFilter.module.css';

const COLOR_PALETTES = {
  default: { name: 'Padrão', colors: ['#10b981', '#f59e0b', '#ef4444', '#7c2d12'] },
  highContrast: { name: 'Alto Contraste', colors: ['#00d084', '#ffab00', '#ff3d3d', '#8b0000'] },
  vivid: { name: 'Vibrante', colors: ['#00ff88', '#ffff00', '#ff0000', '#cc0000'] },
  accessible: { name: 'Acessível', colors: ['#0173b2', '#de8f05', '#cc78bc', '#029e73'] },
  warm: { name: 'Quente', colors: ['#2ecc71', '#f39c12', '#e74c3c', '#8b4513'] }
};

interface ColorPaletteFilterProps {
  onPaletteChange: (palette: keyof typeof COLOR_PALETTES) => void;
}

export const ColorPaletteFilter: React.FC<ColorPaletteFilterProps> = ({ onPaletteChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<keyof typeof COLOR_PALETTES>('default');

  const handleSelect = (palette: keyof typeof COLOR_PALETTES) => {
    setSelected(palette);
    onPaletteChange(palette);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        title="Alterar paleta de cores dos gráficos"
        aria-label="Abrir menu de paletas de cores"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="1" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.6c3.72 4.35 8.45 5.74 16.88 2.28M19.5 13.0c3.43-3.44 4.76-6.88 5.69-11.38" />
          <path d="M9 6.75L4.6 9.6M56.29 3.75h4.38M6.15 8.95l7.07 7.07M42.3 9.75l3.54-3.54" />
        </svg>
        Cores
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
            <button
              key={key}
              className={`${styles.option} ${selected === key ? styles.active : ''}`}
              onClick={() => handleSelect(key as keyof typeof COLOR_PALETTES)}
              role="menuitem"
              aria-label={`Paleta de cores: ${palette.name}${selected === key ? ' (selecionada)' : ''}`}
              aria-current={selected === key ? 'true' : 'false'}
            >
              <div className={styles.colorPreview} aria-hidden="true">
                {palette.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className={styles.colorBox}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>{palette.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { COLOR_PALETTES };
