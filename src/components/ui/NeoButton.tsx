import React from 'react';
import type { NeoButtonProps } from '../../types';
import styles from './NeoButton.module.css';

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'raised',
  size = 'md',
  className = '',
  title,
  'aria-label': ariaLabel,
}) => {
  return (
    <button
      className={`${styles.neoButton} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
