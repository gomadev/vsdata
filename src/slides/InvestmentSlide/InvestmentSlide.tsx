import React, { useMemo } from 'react';
import { useICMData } from '../../hooks/useICMData';
import { useColorPalette } from '../../contexts/ColorPaletteContext';
import { MoneyIcon, AlertIcon, DangerIcon } from '../../components/Icons';
import styles from './InvestmentSlide.module.css';

export const InvestmentSlide: React.FC = () => {
  const { colors } = useColorPalette();
  const { data, loading } = useICMData();

  const investment = useMemo(() => {
    if (!data.length) return null;

    const criticalCount = data.filter(d => d.categoria === 'RUIM' || d.categoria === 'PÉSSIMO').length;
    const regularCount = data.filter(d => d.categoria === 'REGULAR').length;
    
    // Estimativas baseadas em estudos do DNIT (valores aproximados por km)
    const costCritical = criticalCount * 850000; // R$ 850mil/km para reconstrução
    const costRegular = regularCount * 120000; // R$ 120mil/km para manutenção

    return {
      critical: { km: criticalCount, cost: costCritical },
      regular: { km: regularCount, cost: costRegular },
      total: costCritical + costRegular
    };
  }, [data]);

  if (loading || !investment) return null;

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(1)}Bi`;
    if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(0)}Mi`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  return (
    <div className={styles.slide}>
      <h2 className={styles.title}><MoneyIcon size={32} color={colors[1]} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Investimento Necessário</h2>
      <p className={styles.subtitle}>Estimativa de recursos para recuperação total</p>
      
      <div className={styles.breakdown}>
        <div className={styles.card}>
          <div className={styles.cardIcon}><DangerIcon size={48} color={colors[2]} /></div>
          <h3>Trechos Críticos</h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Extensão</span>
              <span className={styles.statValue}>{(investment.critical.km / 1000).toFixed(1)}k km</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Investimento</span>
              <span className={styles.statValue}>{formatCurrency(investment.critical.cost)}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}><AlertIcon size={48} color={colors[1]} /></div>
          <h3>Trechos Regulares</h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Extensão</span>
              <span className={styles.statValue}>{(investment.regular.km / 1000).toFixed(1)}k km</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Investimento</span>
              <span className={styles.statValue}>{formatCurrency(investment.regular.cost)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.total}>
        <div className={styles.totalLabel}>Investimento Total Estimado</div>
        <div className={styles.totalValue}>{formatCurrency(investment.total)}</div>
        <div className={styles.totalNote}>* Valores estimados baseados em custos médios DNIT 2025</div>
      </div>
    </div>
  );
};
