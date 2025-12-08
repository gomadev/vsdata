import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { CheckIcon, DangerIcon } from '../../components/Icons';
import styles from './ComparisonSlide.module.css';

export const ComparisonSlide: React.FC = () => {
  const { data, loading } = useICMData();

  const comparison = useMemo(() => {
    if (!data.length) return null;

    const best = data.filter(d => d.categoria === 'BOM').length;
    const worst = data.filter(d => d.categoria === 'PÉSSIMO').length;
    const total = data.length;

    return {
      best: { count: best, pct: (best / total) * 100 },
      worst: { count: worst, pct: (worst / total) * 100 },
      ratio: (worst / best).toFixed(2)
    };
  }, [data]);

  if (loading || !comparison) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Comparativo BOM vs PÉSSIMO</h2>
      
      <div className={styles.comparison}>
        <div className={`${styles.side} ${styles.good}`}>
          <div className={styles.emoji}><CheckIcon size={56} color="#10b981" /></div>
          <div className={styles.label}>BOM</div>
          <div className={styles.count}>{(comparison.best.count / 1000).toFixed(1)}k</div>
          <div className={styles.percentage}>{comparison.best.pct.toFixed(1)}%</div>
        </div>

        <div className={styles.versus}>
          <div className={styles.vsText}>VS</div>
          <div className={styles.ratio}>
            1 : {comparison.ratio}
          </div>
          <div className={styles.ratioLabel}>Para cada trecho BOM,<br/>{comparison.ratio} estão PÉSSIMO</div>
        </div>

        <div className={`${styles.side} ${styles.bad}`}>
          <div className={styles.emoji}><DangerIcon size={56} color="#ef4444" /></div>
          <div className={styles.label}>PÉSSIMO</div>
          <div className={styles.count}>{(comparison.worst.count / 1000).toFixed(1)}k</div>
          <div className={styles.percentage}>{comparison.worst.pct.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};
