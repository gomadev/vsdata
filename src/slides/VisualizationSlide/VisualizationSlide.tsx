import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { getTopWorstStates } from '../../utils/dataLoader';
import { DangerIcon, AlertIcon } from '../../components/Icons';
import styles from './VisualizationSlide.module.css';

export const VisualizationSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();

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
      <h2 className={styles.slideTitle}><DangerIcon size={32} color={colors[2]} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Top 10 Estados Críticos</h2>
      <p className={styles.subtitle}>Estados com maior ICM médio (piores condições)</p>
      
      <div className={styles.statesGrid}>
        {worstStates.map((state, index) => (
          <div 
            key={state.uf} 
            className={styles.stateCard}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              '--rank-gradient': `linear-gradient(135deg, ${colors[2]}, ${colors[3]})`,
              '--bar-color': state.media > 70 ? colors[2] : state.media > 50 ? colors[1] : colors[0]
            } as React.CSSProperties}
          >
            <div className={styles.rank}>#{index + 1}</div>
            <div className={styles.ufName}>{state.uf}</div>
            <div className={styles.icmValue}>{state.media.toFixed(1)}</div>
            <div className={styles.barContainer}>
              <div 
                className={styles.barFill}
                style={{ 
                  width: `${(state.media / 100) * 100}%`,
                  backgroundColor: state.media > 70 ? colors[2] : state.media > 50 ? colors[1] : colors[0]
                }}
              />
            </div>
            <div className={styles.status}>
              {state.media > 70 ? (
                <><DangerIcon size={20} color={colors[2]} /> PÉSSIMO</>
              ) : state.media > 50 ? (
                <><DangerIcon size={20} color={colors[1]} /> RUIM</>
              ) : (
                <><AlertIcon size={20} color={colors[0]} /> REGULAR</>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
