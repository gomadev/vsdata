import React from 'react';
import { TruckIcon, ClockIcon, MoneyIcon, WrenchIcon, AlertIcon } from '../../components/Icons';
import styles from './EconomicImpactSlide.module.css';

export const EconomicImpactSlide: React.FC = () => {
  const impacts = [
    {
      IconComponent: TruckIcon,
      color: '#3b82f6',
      title: 'Logística',
      value: '+35%',
      description: 'Aumento no custo de transporte em rodovias críticas'
    },
    {
      IconComponent: ClockIcon,
      color: '#8b5cf6',
      title: 'Tempo',
      value: '+2.5h',
      description: 'Aumento médio no tempo de viagem por 1000km'
    },
    {
      IconComponent: MoneyIcon,
      color: '#ef4444',
      title: 'PIB',
      value: '-1.2%',
      description: 'Impacto estimado no crescimento econômico anual'
    },
    {
      IconComponent: WrenchIcon,
      color: '#f59e0b',
      title: 'Manutenção',
      value: 'R$ 42Bi',
      description: 'Investimento necessário para recuperação total'
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Impacto Econômico</h2>
      <p className={styles.subtitle}>Consequências da má conservação das rodovias</p>
      
      <div className={styles.grid}>
        {impacts.map((impact, i) => (
          <div key={i} className={styles.impactCard}>
            <div className={styles.iconCircle}>
              <impact.IconComponent size={48} color={impact.color} />
            </div>
            <h3 className={styles.impactTitle}>{impact.title}</h3>
            <div className={styles.impactValue}>{impact.value}</div>
            <p className={styles.impactDesc}>{impact.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.warning}>
        <AlertIcon size={24} color="#f59e0b" style={{ marginRight: '0.5rem' }} />
        <span>Dados estimados baseados em estudos da CNT e IPEA</span>
      </div>
    </div>
  );
};
