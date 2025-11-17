import React from 'react';
import { NeoCard } from '../../components/ui';
import { NeoPieChart } from '../../components/NeoPieChart';
import type { PieChartDataItem } from '../../components/NeoPieChart';
import styles from './DataOverviewSlide.module.css';

// Dados de exemplo - SUBSTITUA pelos seus dados reais
const exampleData: PieChartDataItem[] = [
  { label: 'Categoria A', value: 450, color: '#667eea' },
  { label: 'Categoria B', value: 380, color: '#764ba2' },
  { label: 'Categoria C', value: 280, color: '#f093fb' },
  // Fatias menores (< 5% do total) - serão agrupadas em "Outros"
  { label: 'Categoria D', value: 45, color: '#4facfe' },
  { label: 'Categoria E', value: 38, color: '#43e97b' },
  { label: 'Categoria F', value: 32, color: '#fa709a' },
  { label: 'Categoria G', value: 28, color: '#fee140' },
  { label: 'Categoria H', value: 22, color: '#30cfd0' },
  { label: 'Categoria I', value: 18, color: '#a8edea' },
  { label: 'Categoria J', value: 15, color: '#fed6e3' },
];

console.log('DataOverviewSlide - Total:', exampleData.reduce((s, i) => s + i.value, 0));
console.log('Categorias:', exampleData.map(d => `${d.label}: ${d.value}`));

export const DataOverviewSlide: React.FC = () => {
  const total = exampleData.reduce((sum, item) => sum + item.value, 0);
  const mainCategories = exampleData.filter((item) => (item.value / total) * 100 >= 5);
  const smallCategories = exampleData.filter((item) => (item.value / total) * 100 < 5);
  
  return (
    <div className={styles.slide}>
      <h2 className={styles.slideTitle}>Distribuição dos Dados</h2>
      
      <div className={styles.content}>
        <div className={styles.chartSection}>
          <NeoPieChart 
            data={exampleData}
            width={450}
            height={450}
            minSlicePercentage={5}
          />
        </div>
        
        <div className={styles.statsSection}>
          <NeoCard variant="raised">
            <div className={styles.statsContent}>
              <h3>📊 Estatísticas Gerais</h3>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Total de Registros:</span>
                <span className={styles.statValue}>{total.toLocaleString()}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Categorias Principais:</span>
                <span className={styles.statValue}>{mainCategories.length}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Categorias Menores:</span>
                <span className={styles.statValue}>{smallCategories.length}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Maior Categoria:</span>
                <span className={styles.statValue}>
                  {exampleData[0].label} ({((exampleData[0].value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </NeoCard>
          
          <NeoCard variant="raised">
            <div className={styles.infoContent}>
              <h3>💡 Como Funciona</h3>
              <ul className={styles.infoList}>
                <li>
                  <strong>Fatias grandes:</strong> Categorias com mais de 5% do total
                </li>
                <li>
                  <strong>Fatia "Outros":</strong> Agrupa categorias menores que 5%
                </li>
                <li>
                  <strong>Interação:</strong> Passe o mouse em "Outros" para explodir e ver detalhes
                </li>
                <li>
                  <strong>Animação:</strong> A pizza gira automaticamente pausando em cada categoria
                </li>
              </ul>
            </div>
          </NeoCard>
        </div>
      </div>
    </div>
  );
};
