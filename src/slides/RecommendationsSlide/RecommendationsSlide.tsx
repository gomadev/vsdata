import React, { useMemo } from 'react';
import { useMultiMonthData } from '../../hooks/useMultiMonthData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './RecommendationsSlide.module.css';

export const RecommendationsSlide: React.FC = () => {
  const { monthsData, loading } = useMultiMonthData();
  const { colors } = useColorPalette();

  const timeline = useMemo(() => {
    if (!monthsData.length) return [];
    
    return monthsData.map(month => {
      const total = month.data.length;
      const bomPercent = ((month.stats.bom / total) * 100).toFixed(1);
      const pessimoPlusRuimPercent = (((month.stats.ruim + month.stats.pessimo) / total) * 100).toFixed(1);
      
      return {
        month: month.month,
        bom: month.stats.bom,
        bomPercent,
        pessimo: month.stats.pessimo,
        ruim: month.stats.ruim,
        pessimoPlusRuimPercent,
        total
      };
    });
  }, [monthsData]);

  if (loading || !timeline.length) return null;

  const maxPercent = 100;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Evolução das Condições</h2>
      
      <div className={styles.timelineContainer}>
        {timeline.map((item, idx) => (
          <div key={`month-${idx}`} className={styles.timelineItem}>
            <div className={styles.monthLabel}>{item.month}</div>
            
            <div className={styles.barContainer}>
              <div className={styles.barRow}>
                <div className={styles.label} style={{ color: colors[3] }}>BOM</div>
                <div className={styles.barWrapper}>
                  <div 
                    className={styles.bar} 
                    style={{ 
                      width: `${(parseFloat(item.bomPercent) / maxPercent) * 100}%`,
                      backgroundColor: colors[3]
                    }}
                  />
                </div>
                <div className={styles.percent}>{item.bomPercent}%</div>
              </div>

              <div className={styles.barRow}>
                <div className={styles.label} style={{ color: colors[2] }}>CRÍTICO</div>
                <div className={styles.barWrapper}>
                  <div 
                    className={styles.bar} 
                    style={{ 
                      width: `${(parseFloat(item.pessimoPlusRuimPercent) / maxPercent) * 100}%`,
                      backgroundColor: colors[2]
                    }}
                  />
                </div>
                <div className={styles.percent}>{item.pessimoPlusRuimPercent}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: colors[3] }} />
          <span>BOM: Condição ótima</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendColor} style={{ backgroundColor: colors[2] }} />
          <span>CRÍTICO: Ruim ou Péssimo</span>
        </div>
      </div>
    </div>
  );
};
