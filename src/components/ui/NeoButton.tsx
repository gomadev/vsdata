import React from 'react';
import { NeoButtonProps } from '../../types';
import styles from './NeoButton.module.css';

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'raised',
  size = 'md',
  className = '',
}) => {
  return (
    <button
      className={`${styles.neoButton} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
