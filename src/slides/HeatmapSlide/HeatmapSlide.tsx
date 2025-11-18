import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import NeoHeatmap from '../../components/NeoHeatmap/NeoHeatmap';
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

  // Get unique UFs
  const ufs = [...new Set(data.map(d => d.uf))].sort().slice(0, 15); // Top 15 states
  const categories = ['BOM', 'REGULAR', 'RUIM', 'PÉSSIMO'];

  // Calculate heatmap data - SWAPPED: categories as columns, UFs as rows
  const heatmapData = ufs.flatMap(uf => {
    const ufData = data.filter(d => d.uf === uf);
    return categories.map(cat => {
      const count = ufData.filter(d => d.categoria === cat).length;
      const percentage = ufData.length > 0 ? (count / ufData.length) * 100 : 0;
      return {
        row: uf,
        col: cat,
        value: percentage
      };
    });
  });

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Matriz ICM por Estado</h2>
      <NeoHeatmap 
        data={heatmapData} 
        rows={ufs}
        cols={categories}
        width={700}
        cellSize={40}
      />
    </div>
  );
};
