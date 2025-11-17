import React from 'react';
import { NeoCard } from '../../components/ui';
import styles from './InsightsSlide.module.css';

export const InsightsSlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Insights e Análises</h2>
      
      <div className={styles.insightsGrid}>
        <NeoCard variant="raised">
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>01</div>
            <h3>Primeira Descoberta</h3>
            <p>
              Descreva aqui o primeiro insight importante que você descobriu
              ao analisar os dados. Seja específico e use números quando possível.
            </p>
          </div>
        </NeoCard>

        <NeoCard variant="raised">
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>02</div>
            <h3>Segunda Descoberta</h3>
            <p>
              Apresente a segunda conclusão relevante. Explique como isso
              pode impactar as decisões ou o entendimento do problema.
            </p>
          </div>
        </NeoCard>

        <NeoCard variant="raised">
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>03</div>
            <h3>Terceira Descoberta</h3>
            <p>
              Compartilhe um terceiro insight valioso. Relacione com os
              dados apresentados nos slides anteriores.
            </p>
          </div>
        </NeoCard>

        <NeoCard variant="raised">
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>04</div>
            <h3>Padrões Identificados</h3>
            <p>
              Mencione padrões ou tendências observadas. Discuta possíveis
              correlações e relações entre variáveis.
            </p>
          </div>
        </NeoCard>
      </div>
    </div>
  );
};
