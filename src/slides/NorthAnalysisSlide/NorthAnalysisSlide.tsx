import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { useDynamicTextColors } from '../../hooks/useDynamicTextColors';
import { ForestIcon, ChartIcon } from '../../components/Icons';
import styles from './NorthAnalysisSlide.module.css';

export const NorthAnalysisSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();
  const textColors = useDynamicTextColors();

  const northStats = useMemo(() => {
    if (!data.length) return [];

    const northUFs = ['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'];
    const northData = data.filter(d => northUFs.includes(d.uf));

    const ufStats = new Map<string, { sum: number; count: number }>();
    northData.forEach(item => {
      if (!ufStats.has(item.uf)) {
        ufStats.set(item.uf, { sum: 0, count: 0 });
      }
      const stats = ufStats.get(item.uf)!;
      stats.sum += item.icm;
      stats.count += 1;
    });

    return Array.from(ufStats.entries())
      .map(([uf, stats]) => ({
        uf,
        avgICM: stats.sum / stats.count,
        count: stats.count
      }))
      .sort((a, b) => b.avgICM - a.avgICM);
  }, [data]);

  if (loading || !northStats.length) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}><ForestIcon size={32} color={colors[0]} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Região Norte - Análise Detalhada</h2>
      
      <div className={styles.content}>
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryIcon}><ChartIcon size={48} color="var(--accent)" /></div>
            <div className={styles.summaryValue}>
              {(northStats.reduce((acc, s) => acc + s.avgICM, 0) / northStats.length).toFixed(1)}
            </div>
            <div className={styles.summaryLabel}>ICM Médio Regional</div>
          </div>
        </div>

        <div className={styles.states}>
          {northStats.map((stat, i) => (
            <div key={i} className={styles.stateCard}>
              <div className={styles.stateHeader}>
                <span className={styles.stateName}>{stat.uf}</span>
                <span className={`${styles.stateICM} ${stat.avgICM > 60 ? styles.critical : stat.avgICM > 40 ? styles.warning : styles.good}`}>
                  {stat.avgICM.toFixed(1)}
                </span>
              </div>
              <div className={styles.stateBar}>
                <div 
                  className={styles.stateBarFill} 
                  style={{ 
                    width: `${(stat.avgICM / 100) * 100}%`,
                    background: stat.avgICM > 60 ? `linear-gradient(90deg, ${colors[2]}, ${colors[3]})` : 
                                stat.avgICM > 40 ? `linear-gradient(90deg, ${colors[1]}, ${colors[2]})` : 
                                `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`
                  }}
                />
              </div>
              <div className={styles.stateCount}>{(stat.count / 1000).toFixed(1)}k km</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
