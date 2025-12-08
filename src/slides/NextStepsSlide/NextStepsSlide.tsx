import React, { useMemo } from 'react';
import { useMultiMonthData } from '../../hooks/useMultiMonthData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './NextStepsSlide.module.css';

export const NextStepsSlide: React.FC = () => {
  const { monthsData, loading } = useMultiMonthData();
  const { colors } = useColorPalette();

  const categoryTrends = useMemo(() => {
    if (!monthsData.length) return [];

    return monthsData.map(month => {
      const total = month.data.length;
      
      return {
        month: month.month,
        bom: month.stats.bom,
        bomPercent: ((month.stats.bom / total) * 100).toFixed(1),
        regular: month.stats.regular,
        regularPercent: ((month.stats.regular / total) * 100).toFixed(1),
        ruim: month.stats.ruim,
        ruimPercent: ((month.stats.ruim / total) * 100).toFixed(1),
        pessimo: month.stats.pessimo,
        pessimoPercent: ((month.stats.pessimo / total) * 100).toFixed(1),
        total
      };
    });
  }, [monthsData]);

  if (loading || !categoryTrends.length) return null;

  const latest = categoryTrends[categoryTrends.length - 1];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Próximos Passos & Prioridades</h2>
      
      <div className={styles.priorityGrid}>
        <div className={styles.priorityCard} style={{ borderLeftColor: colors[3] }}>
          <div className={styles.priorityTitle}>Manter</div>
          <div className={styles.priorityValue} style={{ color: colors[3] }}>
            {latest.bomPercent}%
          </div>
          <div className={styles.priorityLabel}>Trechos em BOM estado</div>
          <div className={styles.priorityCount}>{latest.bom} trechos</div>
        </div>

        <div className={styles.priorityCard} style={{ borderLeftColor: colors[0] }}>
          <div className={styles.priorityTitle}>Melhorar</div>
          <div className={styles.priorityValue} style={{ color: colors[0] }}>
            {latest.regularPercent}%
          </div>
          <div className={styles.priorityLabel}>Trechos em estado REGULAR</div>
          <div className={styles.priorityCount}>{latest.regular} trechos</div>
        </div>

        <div className={styles.priorityCard} style={{ borderLeftColor: colors[1] }}>
          <div className={styles.priorityTitle}>Urgente</div>
          <div className={styles.priorityValue} style={{ color: colors[1] }}>
            {latest.ruimPercent}%
          </div>
          <div className={styles.priorityLabel}>Trechos em estado RUIM</div>
          <div className={styles.priorityCount}>{latest.ruim} trechos</div>
        </div>

        <div className={styles.priorityCard} style={{ borderLeftColor: colors[2] }}>
          <div className={styles.priorityTitle}>Crítico</div>
          <div className={styles.priorityValue} style={{ color: colors[2] }}>
            {latest.pessimoPercent}%
          </div>
          <div className={styles.priorityLabel}>Trechos PÉSSIMOS</div>
          <div className={styles.priorityCount}>{latest.pessimo} trechos</div>
        </div>
      </div>

      <div className={styles.timelineTable}>
        <div className={styles.tableHeader}>
          <div className={styles.colMonth}>Mês</div>
          <div className={styles.colData}>BOM</div>
          <div className={styles.colData}>REG</div>
          <div className={styles.colData}>RUIM</div>
          <div className={styles.colData}>PES</div>
        </div>
        {categoryTrends.map((item, idx) => (
          <div key={`trend-${idx}`} className={styles.tableRow} style={{ animation: `rowReveal 0.4s ease-out ${0.1 + idx * 0.1}s backwards` }}>
            <div className={styles.colMonth}>{item.month}</div>
            <div className={styles.colData} style={{ color: colors[3] }}>{item.bomPercent}%</div>
            <div className={styles.colData} style={{ color: colors[0] }}>{item.regularPercent}%</div>
            <div className={styles.colData} style={{ color: colors[1] }}>{item.ruimPercent}%</div>
            <div className={styles.colData} style={{ color: colors[2] }}>{item.pessimoPercent}%</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes rowReveal {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
