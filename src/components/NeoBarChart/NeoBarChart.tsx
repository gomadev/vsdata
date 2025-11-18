import type { NeoBarChartProps } from './types';
import styles from './NeoBarChart.module.css';

export function NeoBarChart({ 
  data, 
  height = 300,
  showValues = true 
}: NeoBarChartProps) {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div 
      className={styles.container} 
      style={{ height }}
      role="img"
      aria-label={`Gráfico de barras mostrando ${data.length} estados com valores de ICM médio`}
    >
      <div className={styles.chart}>
        {data.map((item, index) => {
          // Use range for better visual differentiation
          const barHeight = range > 0 ? ((item.value - minValue) / range) * 90 + 10 : 50;
          
          return (
            <div 
              key={index} 
              className={styles.bar}
              role="presentation"
              aria-label={`${item.label}: ${item.value.toFixed(1)}`}
            >
              <div 
                className={styles.barFill}
                style={{ 
                  height: `${barHeight}%`,
                  minHeight: '10%'
                }}
              >
                {showValues && (
                  <span className={styles.value}>
                    {item.value.toFixed(1)}
                  </span>
                )}
              </div>
              <span className={styles.label}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
