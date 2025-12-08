import React from 'react';
import { AlertIcon } from '../../components/Icons';
import styles from './MethodologySlide.module.css';

export const MethodologySlide: React.FC = () => {
  const limitations = [
    {
      title: 'Base de Dados Inconstante',
      desc: 'Dicionários de dados variam de um período para outro, criando inconsistências na forma como os mesmos campos são registrados',
      icon: AlertIcon
    },
    {
      title: 'Redundância de Bases',
      desc: 'Múltiplas bases com informações repetidas, sempre com as mesmas estruturas mas com pequenas atualizações conforme novos trechos são registrados',
      icon: AlertIcon
    },
    {
      title: 'Falta de Padronização',
      desc: 'Organização de dados muda entre períodos: um mês a base está estruturada de forma X, outro mês de forma Y, dificultando comparações',
      icon: AlertIcon
    },
    {
      title: 'Validação de Qualidade',
      desc: 'Necessidade de limpeza intensiva dos dados para garantir consistência entre períodos e bases diferentes',
      icon: AlertIcon
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Limitações e Dificuldades</h2>
      <p className={styles.subtitle}>Fatores que afetam a análise e interpretação dos resultados</p>
      
      <div className={styles.limitationsGrid}>
        {limitations.map((limit, i) => (
          <div key={`limit-${i}`} className={styles.limitationCard}>
            <limit.icon size={32} color="var(--accent)" />
            <h3>{limit.title}</h3>
            <p>{limit.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

