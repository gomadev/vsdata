import React, { useState } from 'react';
import styles from './TextColorFilter.module.css';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export const TextColorFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rgbColor, setRgbColor] = useState<RGBColor>({ r: 0, g: 0, b: 0 });
  const [userCustomized, setUserCustomized] = useState(false);

  // Atualizar cor padrão baseado no tema e observar mudanças
  React.useEffect(() => {
    const updateDefaultColor = () => {
      // Se o usuário customizou, não sobrescrever
      if (userCustomized) return;

      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
      // Se o fundo é claro (modo light), usar preto; se escuro (modo dark), usar branco
      const isDark = bgColor.includes('31') || bgColor.includes('47') || bgColor.includes('37');
      const defaultColor = isDark ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 };
      setRgbColor(defaultColor);
      const rgbString = `rgb(${defaultColor.r}, ${defaultColor.g}, ${defaultColor.b})`;
      document.documentElement.style.setProperty('--text-primary', rgbString);
    };

    updateDefaultColor();
    // Observar mudanças no tema (para atualizar slider quando muda light/dark)
    const observer = new MutationObserver(updateDefaultColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, [userCustomized]);

  const handleSliderChange = (channel: 'r' | 'g' | 'b', value: number) => {
    setUserCustomized(true); // Marca como customizado
    const newColor = { ...rgbColor, [channel]: value };
    setRgbColor(newColor);
    const root = document.documentElement;
    const rgbString = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    root.style.setProperty('--text-primary', rgbString);
  };

  const rgbString = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
  const hexColor = `#${((1 << 24) + (rgbColor.r << 16) + (rgbColor.g << 8) + rgbColor.b).toString(16).slice(1)}`;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.filterButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Alterar cores dos textos com RGB"
        aria-label="Abrir controle RGB de cores de fonte"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
        <span>Fontes</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.rgbContainer}>
            <div className={styles.colorPreview}>
              <div 
                className={styles.colorSwatch}
                style={{ backgroundColor: rgbString }}
                aria-label={`Cor atual: ${hexColor}`}
              />
              <div className={styles.colorInfo}>
                <div className={styles.colorValue}>{hexColor}</div>
                <div className={styles.colorCode}>RGB({rgbColor.r}, {rgbColor.g}, {rgbColor.b})</div>
              </div>
            </div>

            <div className={styles.sliderGroup}>
              <label htmlFor="slider-r" className={styles.sliderLabel}>
                <span className={styles.channelLabel}>R</span>
                <input
                  id="slider-r"
                  type="range"
                  min="0"
                  max="255"
                  value={rgbColor.r}
                  onChange={(e) => handleSliderChange('r', parseInt(e.target.value))}
                  className={styles.slider}
                  style={{ 
                    background: `linear-gradient(to right, rgb(0, ${rgbColor.g}, ${rgbColor.b}), rgb(255, ${rgbColor.g}, ${rgbColor.b}))`
                  }}
                  aria-label="Canal vermelho (Red)"
                />
                <span className={styles.sliderValue}>{rgbColor.r}</span>
              </label>

              <label htmlFor="slider-g" className={styles.sliderLabel}>
                <span className={styles.channelLabel}>G</span>
                <input
                  id="slider-g"
                  type="range"
                  min="0"
                  max="255"
                  value={rgbColor.g}
                  onChange={(e) => handleSliderChange('g', parseInt(e.target.value))}
                  className={styles.slider}
                  style={{ 
                    background: `linear-gradient(to right, rgb(${rgbColor.r}, 0, ${rgbColor.b}), rgb(${rgbColor.r}, 255, ${rgbColor.b}))`
                  }}
                  aria-label="Canal verde (Green)"
                />
                <span className={styles.sliderValue}>{rgbColor.g}</span>
              </label>

              <label htmlFor="slider-b" className={styles.sliderLabel}>
                <span className={styles.channelLabel}>B</span>
                <input
                  id="slider-b"
                  type="range"
                  min="0"
                  max="255"
                  value={rgbColor.b}
                  onChange={(e) => handleSliderChange('b', parseInt(e.target.value))}
                  className={styles.slider}
                  style={{ 
                    background: `linear-gradient(to right, rgb(${rgbColor.r}, ${rgbColor.g}, 0), rgb(${rgbColor.r}, ${rgbColor.g}, 255))`
                  }}
                  aria-label="Canal azul (Blue)"
                />
                <span className={styles.sliderValue}>{rgbColor.b}</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextColorFilter;
