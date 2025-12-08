// Tipos principais da aplicação

export interface Slide {
  id: number;
  component: React.ComponentType;
  title?: string;
}

export interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
}

export interface NeoButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'raised' | 'pressed' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  title?: string;
  'aria-label'?: string;
}

export interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'raised' | 'flat';
}

export interface NeoContainerProps {
  children: React.ReactNode;
  className?: string;
}
