import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const COLOR_PALETTES = {
  default: ['#10b981', '#f59e0b', '#ef4444', '#7c2d12'],
  ocean: ['#0ea5e9', '#06b6d4', '#3b82f6', '#1e40af'],
  sunset: ['#f97316', '#f43f5e', '#ec4899', '#a855f7'],
  forest: ['#16a34a', '#22c55e', '#84cc16', '#65a30d'],
  candy: ['#ec4899', '#f43f5e', '#fbbf24', '#8b5cf6'],
  midnight: ['#1e293b', '#475569', '#64748b', '#94a3b8'],
  tropical: ['#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
  aurora: ['#8b5cf6', '#ec4899', '#f43f5e', '#fbbf24']
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
