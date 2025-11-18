import React from 'react';
import styles from './MethodologySlide.module.css';

export const MethodologySlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Metodologia</h2>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <h3>Fonte de Dados</h3>
          <p>Levantamentos ICM Outubro/2025</p>
          <p>97.231 trechos pavimentados analisados</p>
        </div>

        <div className={styles.card}>
          <h3>Classificação ICM</h3>
          <ul>
            <li><span className={styles.bom}>BOM</span>: ICM &lt; 30</li>
            <li><span className={styles.regular}>REGULAR</span>: 30 ≤ ICM &lt; 50</li>
            <li><span className={styles.ruim}>RUIM</span>: 50 ≤ ICM &lt; 70</li>
            <li><span className={styles.pessimo}>PÉSSIMO</span>: ICM ≥ 70</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3>Processamento</h3>
          <p>Análise em tempo real com React</p>
          <p>Agregações dinâmicas por UF, região e categoria</p>
        </div>
      </div>
    </div>
  );
};
