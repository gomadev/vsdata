import React from 'react';
import styles from './IntroSlide.module.css';

export const IntroSlide: React.FC = () => {
  return (
    <div className={styles.introSlide}>
      <div className={styles.content}>
        <h1 className={styles.title}>VS Dados</h1>
        <div className={styles.subtitle}>
          <p className={styles.authors}>
            <span className={styles.authorName}>Guilherme</span>
            <span className={styles.separator}>&</span>
            <span className={styles.authorName}>Luane</span>
          </p>
        </div>
        <div className={styles.decorativeLine}></div>
      </div>
    </div>
  );
};
