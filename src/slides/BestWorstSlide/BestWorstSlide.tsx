import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { getTopWorstStates } from '../../utils/dataLoader';
import styles from './BestWorstSlide.module.css';

export const BestWorstSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();

  if (loading || !data.length) return null;

  const worstStates = getTopWorstStates(data, 5);
  const bestStates = getTopWorstStates(data, 100)
    .reverse()
    .slice(0, 5)
    .reverse();

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Top 5: Melhores vs Piores</h2>

      <div className={styles.comparison}>
        <div className={styles.column}>
          <h3 className={styles.subtitle}>Melhores</h3>
          {bestStates.map((s, i) => (
            <div key={i} className={`${styles.item} ${styles.best}`}>
              <span className={styles.rank}>{i + 1}</span>
              <span className={styles.uf}>{s.uf}</span>
              <span className={styles.value}>{s.media.toFixed(1)}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.column}>
          <h3 className={styles.subtitle}>Piores</h3>
          {worstStates.map((s, i) => (
            <div key={i} className={`${styles.item} ${styles.worst}`}>
              <span className={styles.rank}>{i + 1}</span>
              <span className={styles.uf}>{s.uf}</span>
              <span className={styles.value}>{s.media.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
