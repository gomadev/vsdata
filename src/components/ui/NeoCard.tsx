import React from 'react';
import type { NeoCardProps } from '../../types';
import styles from './NeoCard.module.css';

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className = '',
  variant = 'raised',
}) => {
  return (
    <div className={`${styles.neoCard} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};
