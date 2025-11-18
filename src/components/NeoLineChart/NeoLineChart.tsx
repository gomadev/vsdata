import { useState, useMemo } from 'react';
import type { NeoLineChartProps } from './types';
import styles from './NeoLineChart.module.css';

export default function NeoLineChart({
  data,
  width = 600,
  height = 300,
  showGrid = true,
  animate = true,
  gradient = true
}: NeoLineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const { points, path, areaPath, maxY, minY } = useMemo(() => {
    if (!data.length) return { points: [], path: '', areaPath: '', maxY: 0, minY: 0 };

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxY = Math.max(...data.map(d => d.value));
    const minY = Math.min(...data.map(d => d.value));
    const range = maxY - minY || 1;

    const points = data.map((d, i) => ({
      ...d,
      x: padding + (i / (data.length - 1)) * chartWidth,
      y: padding + chartHeight - ((d.value - minY) / range) * chartHeight
    }));

    const path = points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ');

    const areaPath = `${path} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

    return { points, path, areaPath, maxY, minY };
  }, [data, width, height]);

  if (!data.length) return null;

  const gridLines = showGrid ? [0, 0.25, 0.5, 0.75, 1].map(ratio => ({
    y: 40 + (height - 80) * ratio,
    value: maxY - (maxY - minY) * ratio
  })) : [];

  return (
    <div className={styles.container}>
      <svg
        width={width}
        height={height}
        className={styles.svg}
        role="img"
        aria-label="Gráfico de linha mostrando evolução de dados"
      >
        <defs>
          {gradient && (
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
          )}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {showGrid && gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={40}
              y1={line.y}
              x2={width - 40}
              y2={line.y}
              className={styles.gridLine}
            />
            <text
              x={30}
              y={line.y + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--text-secondary)"
              opacity="0.6"
            >
              {line.value.toFixed(0)}
            </text>
          </g>
        ))}

        {/* Axes */}
        <line
          x1={40}
          y1={40}
          x2={40}
          y2={height - 40}
          className={styles.axis}
        />
        <line
          x1={40}
          y1={height - 40}
          x2={width - 40}
          y2={height - 40}
          className={styles.axis}
        />

        {/* Area */}
        {gradient && (
          <path
            d={areaPath}
            fill="url(#areaGradient)"
            className={styles.area}
          />
        )}

        {/* Line */}
        <path
          d={path}
          className={`${styles.line} ${animate ? styles.lineAnimated : ''}`}
          stroke={gradient ? 'url(#lineGradient)' : '#667eea'}
        />

        {/* Points */}
        {points.map((point, i) => (
          <g
            key={i}
            className={styles.point}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === i ? 8 : 5}
              className={styles.pointCircle}
              stroke={gradient ? '#764ba2' : '#667eea'}
            />

            {/* Tooltip */}
            {hoveredPoint === i && (
              <g className={styles.tooltip}>
                <rect
                  x={point.x - 50}
                  y={point.y - 60}
                  width={100}
                  height={50}
                  className={styles.tooltipBg}
                />
                <text
                  x={point.x}
                  y={point.y - 38}
                  textAnchor="middle"
                  className={styles.tooltipText}
                >
                  {point.value.toFixed(1)}
                </text>
                <text
                  x={point.x}
                  y={point.y - 22}
                  textAnchor="middle"
                  className={styles.tooltipLabel}
                >
                  {point.label}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* X-axis labels */}
        {points.filter((_, i) => i % Math.max(1, Math.floor(points.length / 8)) === 0).map((point, i) => (
          <text
            key={i}
            x={point.x}
            y={height - 20}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            opacity="0.8"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
