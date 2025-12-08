import React, { useMemo } from 'react';
import { useMultiMonthData } from '../../hooks/useMultiMonthData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './ActionPlanSlide.module.css';

export const ActionPlanSlide: React.FC = () => {
  const { monthsData, loading } = useMultiMonthData();
  const { colors } = useColorPalette();

  const pavimentacaoData = useMemo(() => {
    if (!monthsData.length) return [];

    return monthsData.map(month => {
      const pavimentada = month.data.filter(d => d.pavimentada).length;
      const naoPavimentada = month.data.filter(d => !d.pavimentada).length;
      const total = pavimentada + naoPavimentada;

      return {
        month: month.month,
        pavimentada,
        naoPavimentada,
        pavPercentage: ((pavimentada / total) * 100).toFixed(1),
        naoPavPercentage: ((naoPavimentada / total) * 100).toFixed(1),
        total
      };
    });
  }, [monthsData]);

  if (loading || !pavimentacaoData.length) return null;

  const latest = pavimentacaoData[pavimentacaoData.length - 1];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Análise Pavimentada vs Não Pavimentada</h2>
      
      <div className={styles.mainComparison}>
        <div className={styles.comparisonBar}>
          <div className={styles.barLabel}>Pavimentada</div>
          <div className={styles.barContainer}>
            <div 
              className={styles.barFill} 
              style={{ 
                width: latest.pavPercentage + '%',
                backgroundColor: colors[0]
              }}
            />
          </div>
          <div className={styles.barValue}>{latest.pavPercentage}% ({latest.pavimentada})</div>
        </div>

        <div className={styles.comparisonBar}>
          <div className={styles.barLabel}>Não Pavimentada</div>
          <div className={styles.barContainer}>
            <div 
              className={styles.barFill} 
              style={{ 
                width: latest.naoPavPercentage + '%',
                backgroundColor: colors[1]
              }}
            />
          </div>
          <div className={styles.barValue}>{latest.naoPavPercentage}% ({latest.naoPavimentada})</div>
        </div>
      </div>

      <div className={styles.historicalGrid}>
        {pavimentacaoData.map((data, i) => (
          <div key={i} className={styles.historyCard}>
            <div className={styles.historyMonth}>{data.month}</div>
            <div className={styles.historyRow}>
              <div className={styles.historyLabel} style={{ color: colors[0] }}>Pav.</div>
              <div className={styles.historyValue}>{data.pavPercentage}%</div>
            </div>
            <div className={styles.historyRow}>
              <div className={styles.historyLabel} style={{ color: colors[1] }}>Não Pav.</div>
              <div className={styles.historyValue}>{data.naoPavPercentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
