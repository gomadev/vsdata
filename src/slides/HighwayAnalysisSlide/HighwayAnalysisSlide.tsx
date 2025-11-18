import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { RoadIcon } from '../../components/Icons';
import styles from './HighwayAnalysisSlide.module.css';

export const HighwayAnalysisSlide: React.FC = () => {
  const { data, loading } = useICMData();

  const topHighways = useMemo(() => {
    if (!data.length) return [];

    const highwayStats = new Map<string, { sum: number; count: number }>();

    data.forEach((item) => {
      const br = item.rodovia || 'Desconhecida';
      if (!highwayStats.has(br)) {
        highwayStats.set(br, { sum: 0, count: 0 });
      }
      const stats = highwayStats.get(br)!;
      stats.sum += item.icm;
      stats.count += 1;
    });

    return Array.from(highwayStats.entries())
      .map(([rodovia, stats]) => ({
        name: rodovia,
        avgICM: stats.sum / stats.count,
        count: stats.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [data]);

  if (loading || !topHighways.length) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}><RoadIcon size={32} color="var(--accent)" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Top 10 Rodovias Analisadas</h2>
      <p className={styles.subtitle}>Rodovias com maior extensão de dados coletados</p>
      
      <div className={styles.highwaysGrid}>
        {topHighways.map((highway, index) => (
          <div 
            key={highway.name} 
            className={styles.highwayCard}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className={styles.position}>#{index + 1}</div>
            <div className={styles.highwayName}>{highway.name}</div>
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{(highway.count / 1000).toFixed(1)}k</span>
                <span className={styles.statLabel}>km</span>
              </div>
              <div className={styles.stat}>
                <span className={`${styles.statValue} ${styles.icmValue}`}>
                  {highway.avgICM.toFixed(1)}
                </span>
                <span className={styles.statLabel}>ICM</span>
              </div>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${(highway.count / topHighways[0].count) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
