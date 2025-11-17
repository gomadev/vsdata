import { useEffect } from 'react';

export const useKeyboardNavigation = (
  onNext: () => void,
  onPrevious: () => void,
  canGoNext: boolean,
  canGoPrevious: boolean
) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Espaço
          if (canGoNext) {
            e.preventDefault();
            onNext();
          }
          break;
        case 'ArrowLeft':
          if (canGoPrevious) {
            e.preventDefault();
            onPrevious();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext, onPrevious, canGoNext, canGoPrevious]);
};
