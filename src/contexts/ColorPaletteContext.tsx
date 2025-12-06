import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const COLOR_PALETTES = {
  default: ['#10b981', '#f59e0b', '#ef4444', '#7c2d12'],
  highContrast: ['#00d084', '#ffab00', '#ff3d3d', '#8b0000'],
  vivid: ['#00ff88', '#ffff00', '#ff0000', '#cc0000'],
  accessible: ['#0173b2', '#de8f05', '#cc78bc', '#029e73'],
  warm: ['#2ecc71', '#f39c12', '#e74c3c', '#8b4513']
};

export const TEXT_COLOR_PALETTES = {
  default: { primary: '#1f2937', secondary: '#6b7280', accent: '#10b981' },
  highContrast: { primary: '#ffffff', secondary: '#e0e0e0', accent: '#00d084' },
  vivid: { primary: '#ffffff', secondary: '#f0f0f0', accent: '#00ff88' },
  accessible: { primary: '#0a0a0a', secondary: '#404040', accent: '#0173b2' },
  warm: { primary: '#3d2817', secondary: '#8b6f47', accent: '#e74c3c' }
};

interface ColorPaletteContextType {
  colorPalette: keyof typeof COLOR_PALETTES;
  setColorPalette: (palette: keyof typeof COLOR_PALETTES) => void;
  colors: string[];
  textPalette: keyof typeof TEXT_COLOR_PALETTES;
  setTextPalette: (palette: keyof typeof TEXT_COLOR_PALETTES) => void;
  textColors: typeof TEXT_COLOR_PALETTES[keyof typeof TEXT_COLOR_PALETTES];
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(undefined);

export const ColorPaletteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorPalette, setColorPalette] = useState<keyof typeof COLOR_PALETTES>('default');
  const [textPalette, setTextPalette] = useState<keyof typeof TEXT_COLOR_PALETTES>('default');

  // Update CSS variables quando as paletas mudam
  useEffect(() => {
    const textColors = TEXT_COLOR_PALETTES[textPalette];
    document.documentElement.style.setProperty('--text-primary-dynamic', textColors.primary);
    document.documentElement.style.setProperty('--text-secondary-dynamic', textColors.secondary);
    document.documentElement.style.setProperty('--accent-dynamic', textColors.accent);
  }, [textPalette]);

  // Update CSS variables para cores dos gráficos quando a paleta muda
  useEffect(() => {
    const colors = COLOR_PALETTES[colorPalette];
    document.documentElement.style.setProperty('--color-bom', colors[0]);
    document.documentElement.style.setProperty('--color-regular', colors[1]);
    document.documentElement.style.setProperty('--color-ruim', colors[2]);
    document.documentElement.style.setProperty('--color-pessimo', colors[3]);
  }, [colorPalette]);

  return (
    <ColorPaletteContext.Provider
      value={{
        colorPalette,
        setColorPalette,
        colors: COLOR_PALETTES[colorPalette],
        textPalette,
        setTextPalette,
        textColors: TEXT_COLOR_PALETTES[textPalette]
      }}
    >
      {children}
    </ColorPaletteContext.Provider>
  );
};

export const useColorPalette = () => {
  const context = useContext(ColorPaletteContext);
  if (!context) {
    throw new Error('useColorPalette must be used within ColorPaletteProvider');
  }
  return context;
};
