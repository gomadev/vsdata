import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import styles from './ContextSlide.module.css';

export const ContextSlide: React.FC = () => {
  const { stats, loading } = useICMData();

  if (loading || !stats) return null;

  const problemasPercentage = ((stats.ruim + stats.pessimo) / stats.total * 100).toFixed(1);

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>O Problema</h2>
      
      <div className={styles.stat}>
        <span className={styles.number}>{problemasPercentage}%</span>
        <span className={styles.label}>das rodovias em estado crítico</span>
      </div>

      <p className={styles.text}>
        ~{stats.total.toLocaleString('pt-BR')} trechos analisados
      </p>
    </div>
  );
};
