import { useState, useMemo } from 'react';
import type { NeoStackedAreaProps } from './types';
import styles from './NeoStackedArea.module.css';

export default function NeoStackedArea({
  data,
  categories,
  colors = ['#10b981', '#f59e0b', '#ef4444', '#7c2d12'],
  width = 700,
  height = 350
}: NeoStackedAreaProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  const { areas } = useMemo(() => {
    if (!data.length) return { areas: [], maxValue: 0 };

    const padding = { top: 20, right: 40, bottom: 50, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate stacked values
    const stackedData = data.map(item => {
      let cumulative = 0;
      const stacks: { [key: string]: { start: number; end: number } } = {};
      
      categories.forEach(cat => {
        const value = item.values[cat] || 0;
        stacks[cat] = { start: cumulative, end: cumulative + value };
        cumulative += value;
      });
      
      return { ...item, stacks, total: cumulative };
    });

    const maxValue = Math.max(...stackedData.map(d => d.total));

    // Generate paths for each category
    const areas = categories.map((category, catIndex) => {
      const points = stackedData.map((item, i) => {
        const x = padding.left + (i / (data.length - 1)) * chartWidth;
        const yStart = padding.top + chartHeight - (item.stacks[category].start / maxValue) * chartHeight;
        const yEnd = padding.top + chartHeight - (item.stacks[category].end / maxValue) * chartHeight;
        return { x, yStart, yEnd, label: item.label, value: item.values[category] || 0 };
      });

      const pathTop = points.map((p, i) => 
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.yEnd}`
      ).join(' ');

      const pathBottom = points.reverse().map(p => 
        `L ${p.x} ${p.yStart}`
      ).join(' ');

      points.reverse(); // Reset order

      const path = `${pathTop} ${pathBottom} Z`;

      return { category, path, color: colors[catIndex % colors.length], points };
    });

    return { areas, maxValue };
  }, [data, categories, colors, width, height]);

  if (!data.length) return null;

  return (
    <div className={styles.container}>
      <svg
        width={width}
        height={height}
        className={styles.svg}
        role="img"
        aria-label="Gráfico de área empilhada"
      >
        {/* Areas */}
        {areas.map((area) => (
          <g
            key={area.category}
            className={styles.area}
            onMouseEnter={() => setHoveredArea(area.category)}
            onMouseLeave={() => {
              setHoveredArea(null);
              setTooltipData(null);
            }}
            onMouseMove={(e) => {
              const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect();
              if (svgRect) {
                const x = e.clientX - svgRect.left;
                const pointIndex = Math.round(((x - 50) / (width - 90)) * (area.points.length - 1));
                const point = area.points[Math.max(0, Math.min(pointIndex, area.points.length - 1))];
                setTooltipData({
                  x: point.x,
                  y: point.yEnd,
                  label: `${area.category}: ${point.value.toFixed(0)}`,
                  value: point.value
                });
              }
            }}
          >
            <path
              d={area.path}
              fill={area.color}
              className={styles.areaPath}
              opacity={hoveredArea && hoveredArea !== area.category ? 0.3 : 1}
            />
          </g>
        ))}

        {/* Tooltip */}
        {tooltipData && (
          <g className={`${styles.tooltip} ${styles.tooltipVisible}`}>
            <rect
              x={tooltipData.x - 60}
              y={tooltipData.y - 40}
              width={120}
              height={30}
              className={styles.tooltipBg}
            />
            <text
              x={tooltipData.x}
              y={tooltipData.y - 20}
              textAnchor="middle"
              className={styles.tooltipText}
            >
              {tooltipData.label}
            </text>
          </g>
        )}

        {/* X-axis labels */}
        {data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 6)) === 0).map((item, i) => {
          const x = 50 + (data.indexOf(item) / (data.length - 1)) * (width - 90);
          return (
            <text
              key={i}
              x={x}
              y={height - 25}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              {item.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        {categories.map((cat, i) => (
          <div
            key={cat}
            className={styles.legendItem}
            onClick={() => setHoveredArea(hoveredArea === cat ? null : cat)}
          >
            <div
              className={styles.legendColor}
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className={styles.legendLabel}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
