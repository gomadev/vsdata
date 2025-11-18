import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { NeoPieChart } from '../../components/NeoPieChart';
import type { PieChartDataItem } from '../../components/NeoPieChart';
import styles from './DataOverviewSlide.module.css';

export const DataOverviewSlide: React.FC = () => {
  const { stats, loading } = useICMData();

  if (loading || !stats) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.slideTitle}>Carregando...</h2>
      </div>
    );
  }

  const chartData: PieChartDataItem[] = [
    { label: 'BOM', value: stats.bom, color: '#10b981' },
    { label: 'REGULAR', value: stats.regular, color: '#f59e0b' },
    { label: 'RUIM', value: stats.ruim, color: '#ef4444' },
    { label: 'PÉSSIMO', value: stats.pessimo, color: '#7c2d12' }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Estado das Rodovias</h2>
      
      <div className={styles.chartWrapper}>
        <NeoPieChart 
          data={chartData}
          width={500}
          height={500}
          minSlicePercentage={0}
        />
      </div>
    </div>
  );
};
