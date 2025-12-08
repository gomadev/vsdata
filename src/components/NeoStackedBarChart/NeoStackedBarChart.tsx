import { useMemo } from 'react';
import styles from './NeoStackedBarChart.module.css';

interface BarData {
  label: string;
  values: number[];
  total?: number;
}

interface NeoStackedBarChartProps {
  data: BarData[];
  categories: string[];
  colors?: string[];
  width?: number;
  height?: number;
}

export default function NeoStackedBarChart({
  data,
  categories,
  colors = ['#10b981', '#f59e0b', '#ef4444', '#7c2d12'],
  width = 900,
  height = 350
}: NeoStackedBarChartProps) {
  const { bars } = useMemo(() => {
    if (!data.length) return { bars: [] };

    const padding = { top: 30, right: 40, bottom: 60, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const barWidth = Math.max(30, chartWidth / data.length / 1.5);
    const spacing = chartWidth / data.length;

    const maxValue = 100; // Percentages go to 100

    const bars = data.map((item, itemIndex) => {
      const x = padding.left + itemIndex * spacing + spacing / 2 - barWidth / 2;
      let currentY = 0;

      const segments = categories.map((category, catIndex) => {
        const value = item.values[catIndex] || 0;
        const segmentHeight = (value / maxValue) * chartHeight;
        const y = padding.top + chartHeight - currentY - segmentHeight;

        const segment = {
          category,
          value,
          x,
          y,
          width: barWidth,
          height: segmentHeight,
          color: colors[catIndex % colors.length]
        };

        currentY += segmentHeight;
        return segment;
      });

      return {
        label: item.label,
        x: x + barWidth / 2,
        labelY: padding.top + chartHeight + 20,
        segments
      };
    });

    return { bars };
  }, [data, categories, colors, width, height]);

  if (!data.length) return null;

  const padding = { top: 30, right: 40, bottom: 60, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  return (
    <div className={styles.container}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className={styles.svg}
        role="img"
        aria-label={`Gráfico de barras empilhadas mostrando distribuição de ${categories.join(', ')} para ${data.length} itens`}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <g key={`grid-${value}`}>
            <line
              x1={padding.left}
              y1={padding.top + chartHeight - (value / 100) * chartHeight}
              x2={padding.left + chartWidth}
              y2={padding.top + chartHeight - (value / 100) * chartHeight}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={padding.top + chartHeight - (value / 100) * chartHeight + 4}
              textAnchor="end"
              fontSize="12"
              fill="var(--text-secondary)"
              fontWeight="600"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* Bars */}
        {bars.map((bar, barIndex) => (
          <g key={`bar-${barIndex}`} className={styles.barGroup}>
            {bar.segments.map((segment, segIndex) => (
              <rect
                key={`segment-${barIndex}-${segIndex}`}
                x={segment.x}
                y={segment.y}
                width={segment.width}
                height={segment.height}
                fill={segment.color}
                className={styles.segment}
                style={{
                  '--segment-delay': `${(barIndex + segIndex) * 0.05}s`
                } as React.CSSProperties}
                rx="3"
              />
            ))}

            {/* Bar label */}
            <text
              x={bar.x}
              y={bar.labelY}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
              className={styles.barLabel}
              style={{
                '--label-delay': `${barIndex * 0.08}s`
              } as React.CSSProperties}
            >
              {bar.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        {categories.map((category, index) => (
          <div key={category} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
