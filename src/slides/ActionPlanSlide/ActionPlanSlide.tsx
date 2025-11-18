import React from 'react';
import styles from './ActionPlanSlide.module.css';

export const ActionPlanSlide: React.FC = () => {
  const phases = [
    {
      phase: 'FASE 1',
      title: 'Emergencial',
      duration: '0-6 meses',
      actions: [
        'Interdição de trechos PÉSSIMO com risco',
        'Sinalização emergencial',
        'Rotas alternativas'
      ],
      color: '#ef4444'
    },
    {
      phase: 'FASE 2',
      title: 'Crítica',
      duration: '6-12 meses',
      actions: [
        'Reconstrução trechos RUIM',
        'Manutenção preventiva REGULAR',
        'Monitoramento contínuo'
      ],
      color: '#f59e0b'
    },
    {
      phase: 'FASE 3',
      title: 'Preventiva',
      duration: '12-24 meses',
      actions: [
        'Programa de manutenção regular',
        'Sistema de alerta precoce',
        'Capacitação equipes'
      ],
      color: '#10b981'
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Plano de Ação</h2>
      <p className={styles.subtitle}>Estratégia de recuperação em 3 fases</p>
      
      <div className={styles.timeline}>
        {phases.map((phase, i) => (
          <div key={i} className={styles.phaseCard}>
            <div className={styles.phaseHeader} style={{ borderColor: phase.color }}>
              <div className={styles.phaseNumber} style={{ background: phase.color }}>
                {i + 1}
              </div>
              <div className={styles.phaseInfo}>
                <div className={styles.phaseTitle}>{phase.title}</div>
                <div className={styles.phaseDuration}>{phase.duration}</div>
              </div>
            </div>
            
            <ul className={styles.actionList}>
              {phase.actions.map((action, j) => (
                <li key={j}>{action}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
