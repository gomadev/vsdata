import React, { useMemo } from 'react';
import { useMultiMonthData } from '../../hooks/useMultiMonthData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { CheckIcon, AlertIcon, DangerIcon } from '../../components/Icons';
import styles from './DegradationTrendSlide.module.css';

export const DegradationTrendSlide: React.FC = () => {
  const { monthsData, loading } = useMultiMonthData();
  const { colors } = useColorPalette();

  const degradationTrend = useMemo(() => {
    if (!monthsData.length) return null;

    const months = monthsData.sort((a, b) => 
      new Date(a.month).getTime() - new Date(b.month).getTime()
    );

    if (months.length < 2) return null;

    const firstMonth = months[0];
    const lastMonth = months[months.length - 1];

    const categories = ['BOM', 'REGULAR', 'RUIM', 'PÉSSIMO'];

    return categories.map(cat => {
      const firstTotal = firstMonth.data.length;
      const lastTotal = lastMonth.data.length;

      let firstCount = 0, lastCount = 0;
      
      if (cat === 'BOM') {
        firstCount = firstMonth.stats.bom;
        lastCount = lastMonth.stats.bom;
      } else if (cat === 'REGULAR') {
        firstCount = firstMonth.stats.regular;
        lastCount = lastMonth.stats.regular;
      } else if (cat === 'RUIM') {
        firstCount = firstMonth.stats.ruim;
        lastCount = lastMonth.stats.ruim;
      } else {
        firstCount = firstMonth.stats.pessimo;
        lastCount = lastMonth.stats.pessimo;
      }

      const firstPercent = (firstCount / firstTotal) * 100;
      const lastPercent = (lastCount / lastTotal) * 100;
      const change = lastPercent - firstPercent;

      return {
        category: cat,
        firstPercent: firstPercent.toFixed(1),
        lastPercent: lastPercent.toFixed(1),
        change: change.toFixed(1),
        changed: change !== 0,
        worsened: change > 0 && (cat === 'RUIM' || cat === 'PÉSSIMO'),
        improved: change < 0 && (cat === 'RUIM' || cat === 'PÉSSIMO'),
        firstMonth: firstMonth.month,
        lastMonth: lastMonth.month
      };
    });
  }, [monthsData]);

  if (loading || !degradationTrend) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  const iconMap: { [key: string]: React.FC<any> } = {
    'BOM': CheckIcon,
    'REGULAR': AlertIcon,
    'RUIM': AlertIcon,
    'PÉSSIMO': DangerIcon
  };

  return (
    <div className={styles.slide}>
      <div>
        <h2 className={styles.title}>Análise de Degradação</h2>
        <p className={styles.subtitle}>
          Comparação de condições entre {degradationTrend[0].firstMonth} e {degradationTrend[0].lastMonth}
        </p>
      </div>

      <div className={styles.trendGrid}>
        {degradationTrend.map((trend, i) => {
          const IconComponent = iconMap[trend.category];
          const color = [colors[0], colors[1], colors[2], colors[3]]['BOM|REGULAR|RUIM|PÉSSIMO'.split('|').indexOf(trend.category)];
          const isWorsened = parseFloat(trend.change) > 0;
          const changePercent = Math.abs(parseFloat(trend.change));

          return (
            <div key={i} className={styles.trendCard} style={{ borderLeftColor: color, borderLeftWidth: '4px' }}>
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className={styles.categoryIcon} style={{ backgroundColor: color + '20' }}>
                    <IconComponent size={32} color={color} />
                  </div>
                  <span className={styles.categoryLabel}>{trend.category}</span>
                </div>
                {trend.changed && (
                  <div className={`${styles.trendIndicator} ${isWorsened ? styles.trendUp : styles.trendDown}`}>
                    {isWorsened ? '↑' : '↓'} {changePercent.toFixed(1)}%
                  </div>
                )}
              </div>

              <div className={styles.metricsRow}>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>{trend.firstMonth}</span>
                  <span className={styles.metricValue}>{trend.firstPercent}%</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>{trend.lastMonth}</span>
                  <span className={styles.metricValue}>{trend.lastPercent}%</span>
                </div>
              </div>

              <div className={styles.changeBar}>
                <div 
                  className={styles.changeFill}
                  style={{ 
                    width: `${changePercent}%`,
                    color: isWorsened ? '#ef4444' : '#10b981'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
