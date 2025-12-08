import React from 'react';
import styles from './InsightsSlide.module.css';

export const InsightsSlide: React.FC = () => {
  const conclusions = [
    {
      title: 'Estado Crítico',
      text: 'A malha viária apresenta níveis alarmantes de degradação, afetando mobilidade e economia'
    },
    {
      title: 'Urgência de Ação',
      text: 'Intervenções imediatas são necessárias em trechos PÉSSIMO para evitar colapso'
    },
    {
      title: 'Potencial de Recuperação',
      text: 'Investimento estratégico pode recuperar 60% da malha em 24 meses'
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Conclusões Principais</h2>
      
      <div className={styles.conclusions}>
        {conclusions.map((c, i) => (
          <div key={i} className={styles.conclusionCard}>
            <span className={styles.cardNumber}>{i + 1}</span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

