import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './RoadsAnalysisSlide.module.css';

export const RoadsAnalysisSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();

  const roadsData = useMemo(() => {
    if (!data.length) return [];

    const roadMap = new Map<string, { 
      count: number; 
      icmSum: number; 
      criticCount: number;
      category: Map<string, number>;
    }>();

    data.forEach(item => {
      const roadName = item.rodovia || 'Desconhecida';
      if (!roadMap.has(roadName)) {
        roadMap.set(roadName, { 
          count: 0, 
          icmSum: 0, 
          criticCount: 0,
          category: new Map([
            ['BOM', 0],
            ['REGULAR', 0],
            ['RUIM', 0],
            ['PÉSSIMO', 0]
          ])
        });
      }
      const stats = roadMap.get(roadName)!;
      stats.count += 1;
      stats.icmSum += item.icm;
      if (item.categoria === 'RUIM' || item.categoria === 'PÉSSIMO') {
        stats.criticCount += 1;
      }
      const cats = stats.category;
      cats.set(item.categoria, (cats.get(item.categoria) || 0) + 1);
    });

    return Array.from(roadMap.entries())
      .map(([name, stats]) => ({
        name,
        km: stats.count,
        avgICM: stats.icmSum / stats.count,
        criticPercent: (stats.criticCount / stats.count) * 100,
        categorization: stats.category
      }))
      .sort((a, b) => b.criticPercent - a.criticPercent)
      .slice(0, 8);
  }, [data]);

  if (loading || !roadsData.length) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  const maxCritic = Math.max(...roadsData.map(r => r.criticPercent));

  return (
    <div className={styles.slide}>
      <div>
        <h2 className={styles.title}>Análise por Rodovia</h2>
        <p className={styles.subtitle}>Top 8 rodovias com maior índice de deterioração</p>
      </div>

      <div className={styles.roadsScrollContainer}>
        <div className={styles.roadsGrid}>
          {roadsData.map((road, i) => {
            const colorByCondition = road.criticPercent > 60 ? colors[3] : 
                                    road.criticPercent > 40 ? colors[2] :
                                    road.criticPercent > 20 ? colors[1] :
                                    colors[0];

            return (
              <div 
                key={i} 
                className={styles.roadCard}
                style={{ borderLeftColor: colorByCondition }}
              >
                <div className={styles.roadName}>{road.name}</div>
                
                <div className={styles.roadStats}>
                  <div className={styles.roadStat}>
                    <span className={styles.roadStatLabel}>KM</span>
                    <span className={styles.roadStatValue}>{(road.km / 1000).toFixed(1)}k</span>
                  </div>
                  <div className={styles.roadStat}>
                    <span className={styles.roadStatLabel}>ICM</span>
                    <span className={styles.roadStatValue}>{road.avgICM.toFixed(1)}</span>
                  </div>
                  <div className={styles.roadStat}>
                    <span className={styles.roadStatLabel}>CRÍTICA</span>
                    <span className={styles.roadStatValue} style={{ color: colorByCondition }}>
                      {road.criticPercent.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className={styles.roadBar}>
                  <div 
                    className={styles.roadBarFill}
                    style={{ 
                      width: `${(road.criticPercent / maxCritic) * 100}%`,
                      backgroundColor: colorByCondition
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
