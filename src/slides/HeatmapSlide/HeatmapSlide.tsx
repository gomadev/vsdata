import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import NeoStackedBarChart from '../../components/NeoStackedBarChart/NeoStackedBarChart';
import styles from './HeatmapSlide.module.css';

export const HeatmapSlide: React.FC = () => {
  const { data, loading } = useICMData();

  if (loading || !data.length) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  // Get unique UFs and top 10
  const ufs = [...new Set(data.map(d => d.uf))].sort().slice(0, 10);
  const categories = ['BOM', 'REGULAR', 'RUIM', 'PÉSSIMO'];

  // Calculate stacked data for chart
  const chartData = ufs.map((uf) => {
    const ufData = data.filter(d => d.uf === uf);
    const total = ufData.length;
    
    const segments = categories.map(cat => {
      const count = ufData.filter(d => d.categoria === cat).length;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      return percentage;
    });

    return {
      label: uf,
      values: segments,
      total
    };
  });

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Matriz ICM por Estado</h2>
      <p className={styles.subtitle}>Distribuição de condições por UF (Top 10)</p>
      
      <div className={styles.chartContainer}>
        <NeoStackedBarChart 
          data={chartData} 
          categories={categories}
          width={900} 
          height={350}
        />
      </div>
    </div>
  );
};
