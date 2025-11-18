import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import styles from './CriticalAnalysisSlide.module.css';

export const CriticalAnalysisSlide: React.FC = () => {
  const { stats, data, loading } = useICMData();

  if (loading || !stats || !data.length) return null;

  const criticosTotal = stats.ruim + stats.pessimo;
  const percCritico = ((criticosTotal / stats.total) * 100).toFixed(1);
  
  // UF com mais trechos críticos
  const ufCriticalCount: { [key: string]: number } = {};
  data.forEach(d => {
    if (d.categoria === 'RUIM' || d.categoria === 'PÉSSIMO') {
      ufCriticalCount[d.uf] = (ufCriticalCount[d.uf] || 0) + 1;
    }
  });
  
  const worstUF = Object.entries(ufCriticalCount)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className={styles.slide}>
      <div className={styles.mainStat}>
        <span className={styles.number}>{percCritico}%</span>
        <span className={styles.label}>trechos críticos</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardNumber}>{stats.ruim.toLocaleString('pt-BR')}</span>
          <span className={styles.cardLabel}>Trechos RUIM</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardNumber}>{stats.pessimo.toLocaleString('pt-BR')}</span>
          <span className={styles.cardLabel}>Trechos PÉSSIMO</span>
        </div>
      </div>

      <p className={styles.insight}>
        <strong>{worstUF[0]}</strong> tem {worstUF[1].toLocaleString('pt-BR')} trechos críticos
      </p>
    </div>
  );
};
