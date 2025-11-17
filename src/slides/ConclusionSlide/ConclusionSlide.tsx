import React from 'react';
import { NeoCard } from '../../components/ui';
import styles from './ConclusionSlide.module.css';

export const ConclusionSlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Conclusão</h2>
      
      <div className={styles.content}>
        <NeoCard variant="raised">
          <div className={styles.conclusionContent}>
            <div className={styles.mainConclusion}>
              <h3>Principais Conclusões</h3>
              <ul className={styles.conclusionList}>
                <li>Resuma as principais descobertas da análise</li>
                <li>Destaque os insights mais relevantes</li>
                <li>Mencione limitações e possíveis vieses</li>
                <li>Sugira próximos passos ou análises futuras</li>
              </ul>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.thanks}>
              <h2 className={styles.thanksTitle}>Obrigado!</h2>
              <p className={styles.thanksSubtitle}>
                Perguntas e discussões são bem-vindas
              </p>
              <div className={styles.authors}>
                <span>Guilherme</span>
                <span className={styles.separator}>•</span>
                <span>Luane</span>
              </div>
            </div>
          </div>
        </NeoCard>
      </div>
    </div>
  );
};
