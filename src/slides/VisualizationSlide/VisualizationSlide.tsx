import React from 'react';
import { NeoContainer } from '../../components/ui';
import styles from './VisualizationSlide.module.css';

export const VisualizationSlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Visualizações</h2>
      
      <NeoContainer>
        <div className={styles.chartPlaceholder}>
          <div className={styles.placeholderIcon}>📈</div>
          <h3>Gráfico Principal</h3>
          <p className={styles.placeholderText}>
            Aqui você pode integrar bibliotecas como Chart.js, Recharts, 
            D3.js ou Plotly para criar visualizações interativas dos seus dados.
          </p>
          <div className={styles.chartExample}>
            {/* Espaço reservado para gráfico */}
            <div className={styles.barExample}>
              <div className={styles.bar} style={{ height: '60%' }}></div>
              <div className={styles.bar} style={{ height: '85%' }}></div>
              <div className={styles.bar} style={{ height: '45%' }}></div>
              <div className={styles.bar} style={{ height: '70%' }}></div>
              <div className={styles.bar} style={{ height: '90%' }}></div>
            </div>
          </div>
        </div>
      </NeoContainer>
    </div>
  );
};
