import React from 'react';
import { SatelliteIcon, BrainIcon, PhoneIcon, ChartIcon, BlockchainIcon, SensorIcon } from '../../components/Icons';
import styles from './TechnologySlide.module.css';

export const TechnologySlide: React.FC = () => {
  const solutions = [
    {
      IconComponent: SatelliteIcon,
      color: '#3b82f6',
      title: 'Sensoriamento Remoto',
      description: 'Uso de satélites e drones para monitoramento contínuo das rodovias'
    },
    {
      IconComponent: BrainIcon,
      color: '#8b5cf6',
      title: 'IA e Machine Learning',
      description: 'Predição de falhas e priorização automática de manutenções'
    },
    {
      IconComponent: PhoneIcon,
      color: '#10b981',
      title: 'Apps Colaborativos',
      description: 'Cidadãos reportam problemas em tempo real via aplicativo'
    },
    {
      IconComponent: ChartIcon,
      color: '#f59e0b',
      title: 'Big Data Analytics',
      description: 'Análise massiva de dados para otimizar investimentos'
    },
    {
      IconComponent: BlockchainIcon,
      color: '#06b6d4',
      title: 'Blockchain',
      description: 'Rastreamento transparente de recursos e execução de obras'
    },
    {
      IconComponent: SensorIcon,
      color: '#ec4899',
      title: 'IoT Sensors',
      description: 'Sensores embarcados detectam desgaste em tempo real'
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Soluções Tecnológicas</h2>
      <p className={styles.subtitle}>Inovações para modernizar o monitoramento rodoviário</p>
      
      <div className={styles.grid}>
        {solutions.map((sol, i) => (
          <div key={i} className={styles.solutionCard}>
            <div className={styles.icon}>
              <sol.IconComponent size={56} color={sol.color} />
            </div>
            <h3>{sol.title}</h3>
            <p>{sol.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
