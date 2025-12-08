import React, { useMemo } from 'react';
import { useMultiMonthData } from '../../hooks/useMultiMonthData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import styles from './TechnologySlide.module.css';

export const TechnologySlide: React.FC = () => {
  const { monthsData, loading } = useMultiMonthData();
  const { colors } = useColorPalette();

  const pavData = useMemo(() => {
    if (!monthsData.length) return null;

    const latest = monthsData[monthsData.length - 1];
    const pavimentada = latest.data.filter(d => d.pavimentada);
    const naoPavimentada = latest.data.filter(d => !d.pavimentada);

    const pavICM = pavimentada.length > 0 ? (pavimentada.reduce((sum, d) => sum + d.icm, 0) / pavimentada.length).toFixed(1) : '0';
    const naoPavICM = naoPavimentada.length > 0 ? (naoPavimentada.reduce((sum, d) => sum + d.icm, 0) / naoPavimentada.length).toFixed(1) : '0';

    const pavBom = pavimentada.filter(d => d.categoria === 'BOM').length;
    const naoPavBom = naoPavimentada.filter(d => d.categoria === 'BOM').length;

    return {
      month: latest.month,
      pavICM: parseFloat(pavICM),
      naoPavICM: parseFloat(naoPavICM),
      pavTotal: pavimentada.length,
      naoPavTotal: naoPavimentada.length,
      pavBomPercent: ((pavBom / pavimentada.length) * 100).toFixed(1),
      naoPavBomPercent: ((naoPavBom / naoPavimentada.length) * 100).toFixed(1)
    };
  }, [monthsData]);

  if (loading || !pavData) return null;

  const maxICM = Math.max(pavData.pavICM, pavData.naoPavICM) + 5;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Tecnologia & Infraestrutura </h2>
      
      <div className={styles.comparisonBoxes}>
        <div className={styles.boxPavimentada}>
          <div className={styles.boxTitle}>PAVIMENTADA</div>
          
          <div className={styles.metric}>
            <div className={styles.metricLabel}>ICM Médio</div>
            <div className={styles.metricValue} style={{ color: colors[0] }}>
              {pavData.pavICM.toFixed(1)}
            </div>
            <div className={styles.barBack}>
              <div 
                className={styles.barFront}
                style={{ 
                  width: `${(pavData.pavICM / maxICM) * 100}%`,
                  backgroundColor: colors[0]
                }}
              />
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Em Bom Estado</div>
            <div className={styles.metricValue} style={{ color: colors[3] }}>
              {pavData.pavBomPercent}%
            </div>
          </div>

          <div className={styles.metricSmall}>
            {pavData.pavTotal} trechos
          </div>
        </div>

        <div className={styles.boxNaoPavimentada}>
          <div className={styles.boxTitle}>NÃO PAVIMENTADA</div>
          
          <div className={styles.metric}>
            <div className={styles.metricLabel}>ICM Médio</div>
            <div className={styles.metricValue} style={{ color: colors[1] }}>
              {pavData.naoPavICM.toFixed(1)}
            </div>
            <div className={styles.barBack}>
              <div 
                className={styles.barFront}
                style={{ 
                  width: `${(pavData.naoPavICM / maxICM) * 100}%`,
                  backgroundColor: colors[1]
                }}
              />
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Em Bom Estado</div>
            <div className={styles.metricValue} style={{ color: colors[3] }}>
              {pavData.naoPavBomPercent}%
            </div>
          </div>

          <div className={styles.metricSmall}>
            {pavData.naoPavTotal} trechos
          </div>
        </div>
      </div>

      <div className={styles.insight}>
        <div className={styles.insightText}>
          {pavData.pavICM > pavData.naoPavICM 
            ? '✓ Rodovias pavimentadas apresentam melhor condição geral' 
            : '! Ambas as infraestruturas requerem atenção'}
        </div>
      </div>
    </div>
  );
};
