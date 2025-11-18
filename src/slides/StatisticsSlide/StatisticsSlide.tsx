import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { ChartIcon, RoadIcon, CityIcon, CheckIcon, AlertIcon, DangerIcon } from '../../components/Icons';
import styles from './StatisticsSlide.module.css';

export const StatisticsSlide: React.FC = () => {
  const { stats, data, loading } = useICMData();

  if (loading || !stats || !data.length) return null;

  const mediaGeral = stats.mediaICM.toFixed(1);
  const totalKm = data.length; // Each record is ~1km
  const ufsUnicas = [...new Set(data.map(d => d.uf))].length;

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Estatísticas Gerais</h2>
      
      <div className={styles.grid}>
        <div className={styles.statCard}>
          <div className={styles.icon}><ChartIcon size={48} color="var(--accent)" /></div>
          <div className={styles.number}>{mediaGeral}</div>
          <div className={styles.label}>Média Nacional ICM</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}><RoadIcon size={48} color="var(--accent)" /></div>
          <div className={styles.number}>{(totalKm / 1000).toFixed(1)}k</div>
          <div className={styles.label}>Km Analisados</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}><CityIcon size={48} color="var(--accent)" /></div>
          <div className={styles.number}>{ufsUnicas}</div>
          <div className={styles.label}>Estados</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}><CheckIcon size={48} color="#10b981" /></div>
          <div className={styles.number}>{((stats.bom / stats.total) * 100).toFixed(0)}%</div>
          <div className={styles.label}>Em Bom Estado</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}><AlertIcon size={48} color="#f59e0b" /></div>
          <div className={styles.number}>{((stats.regular / stats.total) * 100).toFixed(0)}%</div>
          <div className={styles.label}>Estado Regular</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}><DangerIcon size={48} color="#ef4444" /></div>
          <div className={styles.number}>{(((stats.ruim + stats.pessimo) / stats.total) * 100).toFixed(0)}%</div>
          <div className={styles.label}>Estado Crítico</div>
        </div>
      </div>
    </div>
  );
};
