import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { ChartIcon, RoadIcon } from '../../components/Icons';
import styles from './KilometerageAnalysisSlide.module.css';

export const KilometerageAnalysisSlide: React.FC = () => {
  const { data, loading } = useICMData();
  const { colors } = useColorPalette();

  const analysis = useMemo(() => {
    if (!data.length) return null;

    const categoryMap = new Map<string, number>();
    const categories = ['BOM', 'REGULAR', 'RUIM', 'PÉSSIMO'];

    categories.forEach(cat => {
      const count = data.filter(d => d.categoria === cat).length;
      categoryMap.set(cat, count);
    });

    const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

    const categoryStats = categories.map((cat, idx) => ({
      category: cat,
      km: categoryMap.get(cat) || 0,
      percentage: ((categoryMap.get(cat) || 0) / total) * 100,
      color: colors[idx]
    }));

    // Pavimentação
    const pavimentada = data.filter(d => d.pavimentada).length;
    const naoPavimentada = data.filter(d => !d.pavimentada).length;

    return {
      categoryStats,
      pavimentada,
      naoPavimentada,
      total,
      pavPercentage: (pavimentada / total) * 100,
      naoPavPercentage: (naoPavimentada / total) * 100
    };
  }, [data]);

  if (loading || !analysis) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className={styles.slide}>
      <div>
        <h2 className={styles.title}>Análise de Quilometragem</h2>
        <p className={styles.subtitle}>Distribuição de {(analysis.total / 1000).toFixed(1)}k km por categoria e pavimentação</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.cardTitle}><ChartIcon size={20} color="var(--accent)" style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Por Condição</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analysis.categoryStats.map((stat, i) => (
              <div key={i} className={styles.categoryBar}>
                <span className={styles.categoryName}>{stat.category}</span>
                <div className={styles.barContainer}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${stat.percentage}%`,
                      backgroundColor: stat.color
                    }}
                  >
                    {stat.percentage > 5 && `${stat.percentage.toFixed(0)}%`}
                  </div>
                </div>
                <span className={styles.categoryValue}>{(stat.km / 1000).toFixed(1)}k km</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statCard}>
          <h3 className={styles.cardTitle}><RoadIcon size={20} color="var(--accent)" style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Por Pavimentação</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.categoryBar}>
              <span className={styles.categoryName}>Pavimentada</span>
              <div className={styles.barContainer}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${analysis.pavPercentage}%`,
                    backgroundColor: colors[0]
                  }}
                >
                  {analysis.pavPercentage > 5 && `${analysis.pavPercentage.toFixed(0)}%`}
                </div>
              </div>
              <span className={styles.categoryValue}>{(analysis.pavimentada / 1000).toFixed(1)}k km</span>
            </div>

            <div className={styles.categoryBar}>
              <span className={styles.categoryName}>Não Pavim.</span>
              <div className={styles.barContainer}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${analysis.naoPavPercentage}%`,
                    backgroundColor: colors[1]
                  }}
                >
                  {analysis.naoPavPercentage > 5 && `${analysis.naoPavPercentage.toFixed(0)}%`}
                </div>
              </div>
              <span className={styles.categoryValue}>{(analysis.naoPavimentada / 1000).toFixed(1)}k km</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.comparison}>
        <div className={styles.comparisonCard}>
          <span className={styles.comparisonLabel}>Maior Problema</span>
          <span className={styles.comparisonValue} style={{ color: colors[3] }}>
            {((analysis.categoryStats.find(s => s.category === 'PÉSSIMO')?.km || 0) / 1000).toFixed(1)}k km
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>em estado PÉSSIMO</span>
        </div>

        <div className={styles.comparisonCard}>
          <span className={styles.comparisonLabel}>Em Bom Estado</span>
          <span className={styles.comparisonValue} style={{ color: colors[0] }}>
            {((analysis.categoryStats.find(s => s.category === 'BOM')?.km || 0) / 1000).toFixed(1)}k km
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>rodovias saudáveis</span>
        </div>
      </div>
    </div>
  );
};
