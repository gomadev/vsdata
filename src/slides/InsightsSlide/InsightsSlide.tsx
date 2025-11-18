import React from 'react';
import styles from './InsightsSlide.module.css';

export const InsightsSlide: React.FC = () => {
  const principles = [
    { title: 'Interatividade', desc: 'Expansão de fatias pequenas' },
    { title: 'Cores Intuitivas', desc: 'Vermelho = crítico, Verde = bom' },
    { title: 'Minimalismo', desc: 'Foco nos dados essenciais' }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Princípios Aplicados</h2>
      
      <div className={styles.list}>
        {principles.map((p, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.bullet}>•</span>
            <div>
              <strong>{p.title}</strong>: {p.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
