import React from 'react';
import styles from './RecommendationsSlide.module.css';

export const RecommendationsSlide: React.FC = () => {
  const recommendations = [
    {
      priority: 'Alta',
      title: 'Intervenção Imediata',
      actions: [
        'Priorizar estados com ICM > 60',
        'Foco em trechos PÉSSIMO',
        'Interditar trechos perigosos'
      ]
    },
    {
      priority: 'Média',
      title: 'Manutenção Preventiva',
      actions: [
        'Estabelecer cronograma regular',
        'Monitorar trechos REGULAR',
        'Evitar degradação progressiva'
      ]
    },
    {
      priority: 'Baixa',
      title: 'Planejamento',
      actions: [
        'Investir em tecnologia de monitoramento',
        'Criar sistema de alerta precoce',
        'Capacitar equipes regionais'
      ]
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Recomendações</h2>
      
      <div className={styles.recommendations}>
        {recommendations.map((rec, i) => (
          <div key={i} className={styles.card}>
            <div className={`${styles.priority} ${styles[rec.priority.toLowerCase()]}`}>
              {rec.priority}
            </div>
            <h3>{rec.title}</h3>
            <ul>
              {rec.actions.map((action, j) => (
                <li key={j}>{action}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
