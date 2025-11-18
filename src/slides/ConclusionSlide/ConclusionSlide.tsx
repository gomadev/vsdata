import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import styles from './ConclusionSlide.module.css';

export const ConclusionSlide: React.FC = () => {
  const { stats, loading } = useICMData();

  if (loading || !stats) return null;

  const criticosPerc = ((stats.ruim + stats.pessimo) / stats.total * 100).toFixed(0);

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Insights</h2>
      
      <div className={styles.insight}>
        <span className={styles.number}>{criticosPerc}%</span>
        <span className={styles.text}>necessitam intervenção urgente</span>
      </div>

      <div className={styles.footer}>
        <p className={styles.thanks}>Obrigado</p>
        <p className={styles.authors}>Guilherme & Luane</p>
      </div>
    </div>
  );
};
