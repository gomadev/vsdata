import React from 'react';
import { TargetIcon, TrendUpIcon, DangerIcon } from '../../components/Icons';
import styles from './KeyFindingsSlide.module.css';

export const KeyFindingsSlide: React.FC = () => {
  const findings = [
    {
      IconComponent: TargetIcon,
      color: '#8b5cf6',
      title: 'Concentração de Problemas',
      text: 'Estados do Norte e Nordeste apresentam maior concentração de trechos críticos'
    },
    {
      IconComponent: TrendUpIcon,
      color: '#3b82f6',
      title: 'Tendência de Degradação',
      text: 'ICM médio aumenta progressivamente ao longo dos trechos analisados'
    },
    {
      IconComponent: DangerIcon,
      color: '#ef4444',
      title: 'Urgência de Intervenção',
      text: 'Mais de 40% dos trechos requerem manutenção urgente ou reconstrução'
    },
    {
      IconComponent: DangerIcon,
      color: '#f59e0b',
      title: 'Impacto Econômico',
      text: 'Rodovias críticas afetam diretamente o escoamento da produção agrícola'
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Principais Descobertas</h2>
      
      <div className={styles.findings}>
        {findings.map((finding, i) => (
          <div key={i} className={styles.finding}>
            <div className={styles.iconBox}>
              <finding.IconComponent size={48} color={finding.color} />
            </div>
            <h3>{finding.title}</h3>
            <p>{finding.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
