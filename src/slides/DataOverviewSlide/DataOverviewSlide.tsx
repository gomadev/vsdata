import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './DataOverviewSlide.module.css';

export const DataOverviewSlide: React.FC = () => {
  const { stats, loading } = useICMData();
  const { colors } = useColorPalette();

  if (loading || !stats) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.slideTitle}>Carregando...</h2>
      </div>
    );
  }

  const total = stats.bom + stats.regular + stats.ruim + stats.pessimo;
  const bomPct = ((stats.bom / total) * 100).toFixed(1);
  const regularPct = ((stats.regular / total) * 100).toFixed(1);
  const ruimPct = ((stats.ruim / total) * 100).toFixed(1);
  const pessimoPct = ((stats.pessimo / total) * 100).toFixed(1);

  const data = [
    { label: 'BOM', value: parseFloat(bomPct), color: colors[0], count: stats.bom, icon: '✓' },
    { label: 'REGULAR', value: parseFloat(regularPct), color: colors[1], count: stats.regular, icon: '○' },
    { label: 'RUIM', value: parseFloat(ruimPct), color: colors[2], count: stats.ruim, icon: '⚠' },
    { label: 'PÉSSIMO', value: parseFloat(pessimoPct), color: colors[3], count: stats.pessimo, icon: '✕' }
  ].sort((a, b) => b.value - a.value);

  const chartHeight = 280;

  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Estado das Rodovias</h2>
      <p className={styles.subtitle}>Distribuição por condição (total: {total.toLocaleString()})</p>
      
      <div className={styles.chartWrapper}>
        <svg 
          width="100%" 
          height={chartHeight + 60} 
          viewBox={`0 0 ${data.length * 100 + 40} ${chartHeight + 60}`}
          preserveAspectRatio="xMidYMid meet"
          className={styles.barChart}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <line
              key={`grid-${pct}`}
              x1="30"
              y1={chartHeight - (chartHeight * pct) / 100}
              x2={data.length * 100 + 20}
              y2={chartHeight - (chartHeight * pct) / 100}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = (item.value / 100) * chartHeight;
            const x = 50 + index * 100;
            const y = chartHeight - barHeight;

            return (
              <g key={item.label}>
                {/* Background bar */}
                <rect
                  x={x - 30}
                  y={chartHeight - chartHeight}
                  width="60"
                  height={chartHeight}
                  fill="rgba(255, 255, 255, 0.05)"
                  rx="6"
                />

                {/* Animated bar */}
                <rect
                  x={x - 30}
                  y={y}
                  width="60"
                  height={barHeight}
                  fill={item.color}
                  rx="6"
                  className={styles.barElement}
                  style={{ '--bar-index': index } as React.CSSProperties}
                  filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))"
                />

                {/* Value on top */}
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  className={styles.barValue}
                  style={{ '--bar-index': index } as React.CSSProperties}
                  fill={item.color}
                  fontSize="18"
                  fontWeight="700"
                >
                  {item.value}%
                </text>

                {/* Category label */}
                <text
                  x={x}
                  y={chartHeight + 25}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {item.label}
                </text>

                {/* Count */}
                <text
                  x={x}
                  y={chartHeight + 43}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {item.count.toLocaleString()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
