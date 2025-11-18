import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import NeoLineChart from '../../components/NeoLineChart/NeoLineChart';
import styles from './TimelineSlide.module.css';

export const TimelineSlide: React.FC = () => {
  const { data, loading } = useICMData();

  if (loading || !data.length) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  // Sample every N trechos for performance
  const step = Math.max(1, Math.floor(data.length / 100));
  const sampledData = data.filter((_, i) => i % step === 0);

  const lineData = sampledData.map((d, i) => ({
    x: i,
    y: d.icm,
    label: `Km ${d.km.toFixed(0)}`,
    value: d.icm
  }));

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Evolução ICM por Trecho</h2>
      <NeoLineChart data={lineData} width={900} height={350} />
    </div>
  );
};
