import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { useDynamicTextColors } from '../../hooks/useDynamicTextColors';
import { CityIcon, ChartIcon } from '../../components/Icons';
import styles from './SoutheastAnalysisSlide.module.css';

export const SoutheastAnalysisSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();
  const textColors = useDynamicTextColors();

  const seStats = useMemo(() => {
    if (!data.length) return [];

    const seUFs = ['SP', 'RJ', 'MG', 'ES'];
    const seData = data.filter(d => seUFs.includes(d.uf));

    const ufStats = new Map<string, { sum: number; count: number; categories: Map<string, number> }>();
    seData.forEach(item => {
      if (!ufStats.has(item.uf)) {
        ufStats.set(item.uf, { sum: 0, count: 0, categories: new Map() });
      }
      const stats = ufStats.get(item.uf)!;
      stats.sum += item.icm;
      stats.count += 1;
      stats.categories.set(item.categoria, (stats.categories.get(item.categoria) || 0) + 1);
    });

    return Array.from(ufStats.entries())
      .map(([uf, stats]) => ({
        uf,
        avgICM: stats.sum / stats.count,
        count: stats.count,
        critical: ((stats.categories.get('RUIM') || 0) + (stats.categories.get('PÉSSIMO') || 0)) / stats.count * 100
      }))
      .sort((a, b) => a.avgICM - b.avgICM);
  }, [data]);

  if (loading || !seStats.length) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}><CityIcon size={32} color={colors[3]} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Sudeste - Análise Detalhada</h2>
      <p className={styles.subtitle}>Centro econômico do país - situação das rodovias</p>
      
      <div className={styles.grid}>
        {seStats.map((stat, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.ufBadge}>{stat.uf}</div>
            
            <div className={styles.mainStat}>
              <div className={styles.statValue}>{stat.avgICM.toFixed(1)}</div>
              <div className={styles.statLabel}>ICM Médio</div>
            </div>

            <div className={styles.divider} />

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricIcon}>📏</span>
                <span className={styles.metricText}>{(stat.count / 1000).toFixed(1)}k km</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricIcon}>🚨</span>
                <span className={styles.metricText}>{stat.critical.toFixed(0)}% crítico</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
