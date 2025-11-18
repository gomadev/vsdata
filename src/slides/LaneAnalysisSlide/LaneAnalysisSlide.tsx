import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { CheckIcon, AlertIcon, DangerIcon } from '../../components/Icons';
import styles from './LaneAnalysisSlide.module.css';

export const LaneAnalysisSlide: React.FC = () => {
  const { data, loading } = useICMData();

  const categoryStats = useMemo(() => {
    if (!data.length) return [];

    const categoryMap = new Map<string, { count: number; icmSum: number }>();

    data.forEach((item) => {
      const cat = item.categoria;
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, { count: 0, icmSum: 0 });
      }
      const stats = categoryMap.get(cat)!;
      stats.count += 1;
      stats.icmSum += item.icm;
    });

    const order = ['BOM', 'REGULAR', 'RUIM', 'PÉSSIMO'];
    return Array.from(categoryMap.entries())
      .map(([category, stats]) => ({
        category,
        count: stats.count,
        avgICM: stats.icmSum / stats.count,
        percentage: (stats.count / data.length) * 100
      }))
      .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  }, [data]);

  if (loading || !categoryStats.length) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Distribuição por Categoria</h2>
      <p className={styles.subtitle}>Percentual de rodovias em cada condição</p>
      
      <div className={styles.lanes}>
        {categoryStats.map((stat, i) => {
          const iconMap: { [key: string]: { Icon: React.FC<any>, color: string } } = {
            'BOM': { Icon: CheckIcon, color: '#10b981' },
            'REGULAR': { Icon: AlertIcon, color: '#eab308' },
            'RUIM': { Icon: DangerIcon, color: '#f97316' },
            'PÉSSIMO': { Icon: DangerIcon, color: '#ef4444' }
          };
          const { Icon, color } = iconMap[stat.category] || iconMap['RUIM'];
          return (
            <div key={i} className={styles.laneCard}>
              <div className={styles.laneIcon}>
                <Icon size={56} color={color} />
              </div>
              <div className={styles.laneNumber}>{stat.category}</div>
              <div className={styles.laneLabel}>Categoria</div>
            
              <div className={styles.divider} />
            
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>{stat.percentage.toFixed(1)}%</span>
                  <span className={styles.metricLabel}>dos trechos</span>
                </div>
                <div className={styles.metric}>
                  <span className={`${styles.metricValue} ${styles.icmValue}`}>
                    {stat.avgICM.toFixed(1)}
                  </span>
                  <span className={styles.metricLabel}>ICM médio</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
