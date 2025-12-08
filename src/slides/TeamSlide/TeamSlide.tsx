import React from 'react';
import styles from './TeamSlide.module.css';

interface TeamMember {
  name: string;
  role: string;
  contribution: string;
}

export const TeamSlide: React.FC = () => {
  const members: TeamMember[] = [
    {
      name: 'Guilherme',
      role: 'Desenvolvimento',
      contribution: 'Arquitetura do projeto, interface interativa e componentes React'
    },
    {
      name: 'Luane',
      role: 'Análise de Dados',
      contribution: 'Processamento de dados, análises estatísticas e visualizações principais'
    }
  ];

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Equipe do Projeto</h2>
      
      <div className={styles.teamGrid}>
        {members.map((member) => (
          <div key={member.name} className={styles.memberCard}>
            <div className={styles.memberNumber}>{members.indexOf(member) + 1}</div>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
            <p className={styles.memberContribution}>{member.contribution}</p>
          </div>
        ))}
      </div>

      <div className={styles.projectInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Fonte de Dados:</span>
          <span className={styles.infoValue}>DNIT & CNT 2025</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Tecnologia:</span>
          <span className={styles.infoValue}>React 19 + TypeScript + Vite</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Período:</span>
          <span className={styles.infoValue}>Dezembro de 2025</span>
        </div>
      </div>
    </div>
  );
};

