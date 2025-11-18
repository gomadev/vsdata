import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import NeoStackedArea from '../../components/NeoStackedArea/NeoStackedArea';
import styles from './StackedAreaSlide.module.css';

export const StackedAreaSlide: React.FC = () => {
  const { data, loading } = useICMData();

  if (loading || !data.length) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  // Group by UF and calculate distribution
  const ufs = [...new Set(data.map(d => d.uf))].sort();
  const topUFs = ufs.slice(0, 10); // Top 10 states

  const stackedData = topUFs.map(uf => {
    const ufData = data.filter(d => d.uf === uf);
    const total = ufData.length;
    
    return {
      label: uf,
      values: {
        'BOM': (ufData.filter(d => d.categoria === 'BOM').length / total) * 100,
        'REGULAR': (ufData.filter(d => d.categoria === 'REGULAR').length / total) * 100,
        'RUIM': (ufData.filter(d => d.categoria === 'RUIM').length / total) * 100,
        'PÉSSIMO': (ufData.filter(d => d.categoria === 'PÉSSIMO').length / total) * 100
      }
    };
  });

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Distribuição por Estado</h2>
      <NeoStackedArea 
        data={stackedData}
        categories={['BOM', 'REGULAR', 'RUIM', 'PÉSSIMO']}
        colors={['#10b981', '#f59e0b', '#ef4444', '#7c2d12']}
        width={900}
        height={400}
      />
    </div>
  );
};
