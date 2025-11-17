import React from 'react';
import { NeoContainerProps } from '../../types';
import styles from './NeoContainer.module.css';

export const NeoContainer: React.FC<NeoContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.neoContainer} ${className}`}>
      {children}
    </div>
  );
};
