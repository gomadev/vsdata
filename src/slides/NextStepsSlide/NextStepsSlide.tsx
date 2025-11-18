import React from 'react';
import styles from './NextStepsSlide.module.css';

export const NextStepsSlide: React.FC = () => {
  const steps = [
    { num: '01', title: 'Validação', text: 'Apresentar análise para stakeholders' },
    { num: '02', title: 'Orçamento', text: 'Detalhar custos por região e prioridade' },
    { num: '03', title: 'Cronograma', text: 'Estabelecer timeline de 24 meses' },
    { num: '04', title: 'Licitação', text: 'Abrir processos para empresas especializadas' },
    { num: '05', title: 'Execução', text: 'Iniciar obras seguindo plano de ação' },
    { num: '06', title: 'Monitoramento', text: 'Acompanhar KPIs e ajustar estratégias' }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Próximos Passos</h2>
      <p className={styles.subtitle}>Roadmap para implementação</p>
      
      <div className={styles.timeline}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNumber}>{step.num}</div>
            <div className={styles.stepContent}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            {i < steps.length - 1 && <div className={styles.connector} />}
          </div>
        ))}
      </div>
    </div>
  );
};
