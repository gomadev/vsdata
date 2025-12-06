import { useColorPalette } from '../contexts/ColorPaletteContext';

export const useDynamicTextColors = () => {
  const { textColors, textPalette } = useColorPalette();
  
  return {
    primary: textColors.primary,
    secondary: textColors.secondary,
    accent: textColors.accent,
    palette: textPalette,
    // Also return CSS variable names for use in style props
    primaryVar: 'var(--text-primary-dynamic)',
    secondaryVar: 'var(--text-secondary-dynamic)',
    accentVar: 'var(--accent-dynamic)'
  };
};
