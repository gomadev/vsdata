import React from 'react';
import styles from './IntroSlide.module.css';

export const IntroSlide: React.FC = () => {
  return (
    <div className={styles.introSlide}>
      <div className={styles.content}>
        <h1 className={styles.title}>Rodovias Federais</h1>
        <p className={styles.subtitle}>Análise ICM 2025</p>
        <div className={styles.authors}>
          Guilherme & Luane
        </div>
      </div>
    </div>
  );
};
