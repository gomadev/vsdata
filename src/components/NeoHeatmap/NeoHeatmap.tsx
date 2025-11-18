import { useState, useMemo } from 'react';
import type { NeoHeatmapProps } from './types';
import styles from './NeoHeatmap.module.css';

export default function NeoHeatmap({
  data,
  rows,
  cols,
  colorScale = ['#10b981', '#ef4444'],
  width = 800,
  cellSize = 50
}: NeoHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; row: string; col: string; value: number } | null>(null);

  const { cells, minValue, maxValue, height } = useMemo(() => {
    if (!data.length) return { cells: [], minValue: 0, maxValue: 0, height: 0 };

    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const labelWidth = 100;
    const labelHeight = 80;

    const cells = data.map(item => {
      const rowIndex = rows.indexOf(item.row);
      const colIndex = cols.indexOf(item.col);
      
      const x = labelWidth + colIndex * cellSize;
      const y = labelHeight + rowIndex * cellSize;
      
      // Calculate color intensity
      const intensity = maxValue > minValue ? (item.value - minValue) / (maxValue - minValue) : 0.5;
      const color = interpolateColor(colorScale[0], colorScale[1], intensity);
      
      return {
        ...item,
        x,
        y,
        color,
        intensity
      };
    });

    const height = labelHeight + rows.length * cellSize + 50;

    return { cells, minValue, maxValue, height };
  }, [data, rows, cols, colorScale, cellSize]);

  if (!data.length) return null;

  return (
    <div className={styles.container}>
      <svg
        width={width}
        height={height}
        className={styles.svg}
        role="img"
        aria-label="Heatmap mostrando intensidade de dados"
      >
        <defs>
          <linearGradient id="heatmapLegend" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorScale[0]} />
            <stop offset="100%" stopColor={colorScale[1]} />
          </linearGradient>
        </defs>

        {/* Column labels */}
        {cols.map((col, i) => (
          <text
            key={`col-${i}`}
            x={100 + i * cellSize + cellSize / 2}
            y={60}
            textAnchor="middle"
            className={styles.axisLabel}
          >
            {col}
          </text>
        ))}

        {/* Row labels */}
        {rows.map((row, i) => (
          <text
            key={`row-${i}`}
            x={90}
            y={80 + i * cellSize + cellSize / 2 + 5}
            textAnchor="end"
            className={styles.axisLabel}
          >
            {row}
          </text>
        ))}

        {/* Cells */}
        {cells.map((cell, i) => (
          <g
            key={i}
            className={styles.cell}
            onMouseEnter={() => setTooltip({
              x: cell.x + cellSize / 2,
              y: cell.y,
              row: cell.row,
              col: cell.col,
              value: cell.value
            })}
            onMouseLeave={() => setTooltip(null)}
          >
            <rect
              x={cell.x}
              y={cell.y}
              width={cellSize}
              height={cellSize}
              fill={cell.color}
              className={styles.cellRect}
            />
            {cellSize >= 40 && (
              <text
                x={cell.x + cellSize / 2}
                y={cell.y + cellSize / 2 + 5}
                textAnchor="middle"
                className={styles.cellValue}
              >
                {cell.value.toFixed(0)}
              </text>
            )}
          </g>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g className={`${styles.tooltip} ${styles.tooltipVisible}`}>
            <rect
              x={tooltip.x - 70}
              y={tooltip.y - 70}
              width={140}
              height={60}
              className={styles.tooltipBg}
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 48}
              textAnchor="middle"
              className={styles.tooltipText}
            >
              {tooltip.value.toFixed(1)}
            </text>
            <text
              x={tooltip.x}
              y={tooltip.y - 32}
              textAnchor="middle"
              className={styles.tooltipLabel}
            >
              {tooltip.row}
            </text>
            <text
              x={tooltip.x}
              y={tooltip.y - 18}
              textAnchor="middle"
              className={styles.tooltipLabel}
            >
              {tooltip.col}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.legendLabel}>{minValue.toFixed(0)}</span>
        <div
          className={styles.legendGradient}
          style={{ background: 'linear-gradient(to right, ' + colorScale.join(', ') + ')' }}
        />
        <span className={styles.legendLabel}>{maxValue.toFixed(0)}</span>
      </div>
    </div>
  );
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  
  if (!c1 || !c2) return color1;
  
  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));
  
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
