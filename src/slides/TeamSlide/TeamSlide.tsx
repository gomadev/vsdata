import React from 'react';
import { TeamIcon, EmailIcon, GlobeIcon, ChartIcon, ToolIcon } from '../../components/Icons';
import styles from './TeamSlide.module.css';

export const TeamSlide: React.FC = () => {
  return (
    <div className={styles.slide}>
      <h2 className={styles.title}>Equipe & Contato</h2>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.icon}><TeamIcon size={56} color="var(--accent)" /></div>
          <h3>Análise de Dados</h3>
          <p>Equipe de Ciência de Dados<br/>VSData Analytics</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}><EmailIcon size={56} color="var(--accent)" /></div>
          <h3>Contato</h3>
          <p>contato@vsdata.com.br<br/>+55 (11) 9999-9999</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}><GlobeIcon size={56} color="var(--accent)" /></div>
          <h3>Mais Informações</h3>
          <p>www.vsdata.com.br<br/>linkedin.com/company/vsdata</p>
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          <ChartIcon size={20} color="var(--accent)" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3rem' }} /> 
          Dados: DNIT/CNT 2025 | 
          <ToolIcon size={20} color="var(--accent)" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 0.3rem' }} /> 
          Tecnologia: React + TypeScript + Vite
        </p>
        <p className={styles.thanks}>Obrigado pela atenção!</p>
      </div>
    </div>
  );
};
