import React, { useMemo } from 'react';
import { useMultiMonthData } from '../../hooks/useMultiMonthData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './KeyFindingsSlide.module.css';

export const KeyFindingsSlide: React.FC = () => {
  const { monthsData, loading } = useMultiMonthData();
  const { colors } = useColorPalette();

  const metrics = useMemo(() => {
    if (!monthsData.length) return null;
    
    const latest = monthsData[monthsData.length - 1];
    const previous = monthsData[monthsData.length - 2];
    
    const total = latest.stats.bom + latest.stats.regular + latest.stats.ruim + latest.stats.pessimo;
    const prevTotal = previous ? (previous.stats.bom + previous.stats.regular + previous.stats.ruim + previous.stats.pessimo) : total;
    
    const bomPercent = ((latest.stats.bom / total) * 100).toFixed(1);
    const regularPercent = ((latest.stats.regular / total) * 100).toFixed(1);
    const ruimPercent = ((latest.stats.ruim / total) * 100).toFixed(1);
    const pessimoPercent = ((latest.stats.pessimo / total) * 100).toFixed(1);
    
    const totalChange = ((total - prevTotal) / prevTotal * 100).toFixed(1);
    
    return {
      month: latest.month,
      bom: latest.stats.bom,
      bomPercent,
      regular: latest.stats.regular,
      regularPercent,
      ruim: latest.stats.ruim,
      ruimPercent,
      pessimo: latest.stats.pessimo,
      pessimoPercent,
      total,
      totalChange
    };
  }, [monthsData]);

  if (loading || !metrics) return null;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Distribuição da Malha Rodoviária</h2>
      
      <div className={styles.metricsContainer}>
        <div className={styles.metric}>
          <div className={styles.metricValue} style={{ color: colors[3] }}>
            {metrics.bom}
          </div>
          <div className={styles.metricLabel}>Trechos BOM</div>
          <div className={styles.metricPercent}>{metrics.bomPercent}% do total</div>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricValue} style={{ color: colors[0] }}>
            {metrics.regular}
          </div>
          <div className={styles.metricLabel}>Trechos REGULAR</div>
          <div className={styles.metricPercent}>{metrics.regularPercent}% do total</div>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricValue} style={{ color: colors[1] }}>
            {metrics.ruim}
          </div>
          <div className={styles.metricLabel}>Trechos RUIM</div>
          <div className={styles.metricPercent}>{metrics.ruimPercent}% do total</div>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricValue} style={{ color: colors[2] }}>
            {metrics.pessimo}
          </div>
          <div className={styles.metricLabel}>Trechos PÉSSIMO</div>
          <div className={styles.metricPercent}>{metrics.pessimoPercent}% do total</div>
        </div>
      </div>

      <div className={styles.totalContainer}>
        <div className={styles.totalValue}>{metrics.total}</div>
        <div className={styles.totalLabel}>Total de Trechos Analisados</div>
      </div>
    </div>
  );
};
