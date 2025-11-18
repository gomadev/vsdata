import React from 'react';
import { useICMData } from '../../hooks/useICMData';
import { ForestIcon, SunIcon, WheatIcon, CityIcon, SnowIcon, CityIcon as MapIcon } from '../../components/Icons';
import styles from './RegionComparisonSlide.module.css';

export const RegionComparisonSlide: React.FC = () => {
  const { data, loading } = useICMData();

  if (loading || !data.length) {
    return (
      <div className={styles.slide}>
        <h2 className={styles.title}>Carregando...</h2>
      </div>
    );
  }

  // Define regiões brasileiras
  const regioes: { [key: string]: { ufs: string[], IconComponent: React.FC<any>, color: string } } = {
    'Norte': { ufs: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'], IconComponent: ForestIcon, color: '#10b981' },
    'Nordeste': { ufs: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'], IconComponent: SunIcon, color: '#f59e0b' },
    'Centro-Oeste': { ufs: ['DF', 'GO', 'MT', 'MS'], IconComponent: WheatIcon, color: '#8b5cf6' },
    'Sudeste': { ufs: ['ES', 'MG', 'RJ', 'SP'], IconComponent: CityIcon, color: '#3b82f6' },
    'Sul': { ufs: ['PR', 'RS', 'SC'], IconComponent: SnowIcon, color: '#06b6d4' }
  };

  const regionData = Object.entries(regioes).map(([regiao, info]) => {
    const regionRoads = data.filter(d => info.ufs.includes(d.uf));
    const avgICM = regionRoads.length > 0
      ? regionRoads.reduce((sum, d) => sum + d.icm, 0) / regionRoads.length
      : 0;

    return {
      name: regiao,
      avgICM,
      IconComponent: info.IconComponent,
      color: info.color,
      count: regionRoads.length
    };
  }).sort((a, b) => b.avgICM - a.avgICM);

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}><MapIcon size={32} color="var(--accent)" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Comparação Regional</h2>
      <p className={styles.subtitle}>ICM médio por região do Brasil</p>
      
      <div className={styles.regionsContainer}>
        {regionData.map((region, index) => (
          <div 
            key={region.name} 
            className={styles.regionCard}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className={styles.regionIcon}>
              <region.IconComponent size={48} color={region.color} />
            </div>
            <div className={styles.regionName}>{region.name}</div>
            
            <div className={styles.icmCircle}>
              <svg className={styles.circleProgress} viewBox="0 0 120 120">
                <circle
                  className={styles.circleBg}
                  cx="60"
                  cy="60"
                  r="50"
                />
                <circle
                  className={styles.circleFill}
                  cx="60"
                  cy="60"
                  r="50"
                  style={{
                    stroke: region.color,
                    strokeDasharray: `${(region.avgICM / 100) * 314} 314`,
                    animationDelay: `${index * 0.15}s`
                  }}
                />
              </svg>
              <div className={styles.icmNumber}>{region.avgICM.toFixed(1)}</div>
            </div>
            
            <div className={styles.regionStats}>
              <span>{(region.count / 1000).toFixed(1)}k km</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
