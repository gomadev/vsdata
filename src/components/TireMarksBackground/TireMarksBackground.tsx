import React from 'react';
import styles from './TireMarksBackground.module.css';

export const TireMarksBackground: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ball} style={{ left: '10%', top: '15%', width: '120px', height: '120px', animationDelay: '0s' }} />
      <div className={styles.ball} style={{ left: '25%', top: '60%', width: '80px', height: '80px', animationDelay: '-2s' }} />
      <div className={styles.ball} style={{ right: '15%', top: '25%', width: '100px', height: '100px', animationDelay: '-4s' }} />
      <div className={styles.ball} style={{ right: '10%', bottom: '20%', width: '90px', height: '90px', animationDelay: '-6s' }} />
      <div className={styles.ball} style={{ left: '50%', bottom: '15%', width: '110px', height: '110px', animationDelay: '-3s' }} />
      <div className={styles.ball} style={{ left: '70%', top: '40%', width: '75px', height: '75px', animationDelay: '-5s' }} />
    </div>
  );
};
