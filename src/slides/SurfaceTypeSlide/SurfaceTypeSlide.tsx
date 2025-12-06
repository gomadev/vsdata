import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { RoadIcon, ConstructionIcon } from '../../components/Icons';
import styles from './SurfaceTypeSlide.module.css';

export const SurfaceTypeSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();

  const surfaceStats = useMemo(() => {
    if (!data.length) return [];

    const typeMap = new Map<string, { count: number; icmSum: number }>();

    data.forEach((item) => {
      const type = item.pavimentada ? 'Pavimentada' : 'Não Pavimentada';
      if (!typeMap.has(type)) {
        typeMap.set(type, { count: 0, icmSum: 0 });
      }
      const stats = typeMap.get(type)!;
      stats.count += 1;
      stats.icmSum += item.icm;
    });

    return Array.from(typeMap.entries())
      .map(([type, stats]) => ({
        type,
        count: stats.count,
        avgICM: stats.icmSum / stats.count,
        percentage: (stats.count / data.length) * 100
      }))
      .sort((a, b) => b.count - a.count);
  }, [data]);

  if (loading || !surfaceStats.length) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Análise por Tipo de Pavimentação</h2>
      
      <div className={styles.grid}>
        {surfaceStats.map((stat, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.typeIcon}>
              {stat.type === 'Pavimentada' ? (
                <RoadIcon size={64} color={colors[0]} />
              ) : (
                <ConstructionIcon size={64} color={colors[1]} />
              )}
            </div>
            <h3>{stat.type}</h3>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stat.percentage.toFixed(1)}%</span>
                <span className={styles.statLabel}>Cobertura</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stat.avgICM.toFixed(1)}</span>
                <span className={styles.statLabel}>ICM Médio</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{(stat.count / 1000).toFixed(1)}k</span>
                <span className={styles.statLabel}>Segmentos</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
