import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { getTopWorstStates } from '../../utils/dataLoader';
import { DangerIcon, AlertIcon } from '../../components/Icons';
import styles from './VisualizationSlide.module.css';

export const VisualizationSlide: React.FC = () => {
  const { data, loading } = useICMData();

  if (loading || !data.length) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.slideTitle}>Carregando...</h2>
      </div>
    );
  }

  const worstStates = getTopWorstStates(data, 10);

  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}><DangerIcon size={32} color="#ef4444" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Top 10 Estados Críticos</h2>
      <p className={styles.subtitle}>Estados com maior ICM médio (piores condições)</p>
      
      <div className={styles.statesGrid}>
        {worstStates.map((state, index) => (
          <div 
            key={state.uf} 
            className={styles.stateCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.rank}>#{index + 1}</div>
            <div className={styles.ufName}>{state.uf}</div>
            <div className={styles.icmValue}>{state.media.toFixed(1)}</div>
            <div className={styles.barContainer}>
              <div 
                className={styles.barFill}
                style={{ width: `${(state.media / 100) * 100}%` }}
              />
            </div>
            <div className={styles.status}>
              {state.media > 70 ? (
                <><DangerIcon size={20} /> PÉSSIMO</>
              ) : state.media > 50 ? (
                <><DangerIcon size={20} color="#f97316" /> RUIM</>
              ) : (
                <><AlertIcon size={20} color="#eab308" /> REGULAR</>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
