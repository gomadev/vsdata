import React, { useState, useMemo, useEffect } from 'react';
import type { PieChartProps } from './types';
import { generateSlices, getLabelPosition } from './utils';
import styles from './NeoPieChart.module.css';

export const NeoPieChart: React.FC<PieChartProps> = ({
  data,
  width = 400,
  height = 400,
  minSlicePercentage = 5,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const { mainSlices, otherSlices } = useMemo(
    () => generateSlices(data, minSlicePercentage),
    [data, minSlicePercentage]
  );
  
  const hasOthers = otherSlices.length > 0;
  const otherSliceIndex = hasOthers ? mainSlices.length - 1 : -1;
  
  // Debug
  console.log('NeoPieChart - hasOthers:', hasOthers, 'otherSlices:', otherSlices.length);
  
  // Rotação automática quando expandido
  useEffect(() => {
    if (!isExpanded || otherSlices.length === 0) return;
    
    let animationId: number;
    let lastTime = Date.now();
    const rotationSpeed = 30; // graus por segundo
    const pauseDuration = 1500; // ms de pausa em cada fatia
    let pauseStartTime = 0;
    
    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      if (isPaused) {
        if (now - pauseStartTime >= pauseDuration) {
          setIsPaused(false);
          pauseStartTime = 0;
        }
      } else {
        setRotationAngle((prev) => {
          const newAngle = (prev + rotationSpeed * delta) % 360;
          
          // Verificar se uma fatia está na posição 90° (direita)
          otherSlices.forEach((slice) => {
            const sliceMidAngle = (slice.startAngle + slice.endAngle) / 2;
            const currentMidAngle = (sliceMidAngle + newAngle + 90) % 360;
            
            // Se a fatia está aproximadamente a 90° (com margem de 5°)
            if (Math.abs(currentMidAngle - 90) < 5 && !isPaused) {
              setIsPaused(true);
              pauseStartTime = now;
            }
          });
          
          return newAngle;
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isExpanded, otherSlices, isPaused]);
  
  // Reset ao sair
  const handleMouseLeave = () => {
    setIsExpanded(false);
    setRotationAngle(0);
    setIsPaused(false);
  };
  
  const viewBox = `0 0 100 100`;
  
  return (
    <div className={`${styles.chartContainer} ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className={styles.svg}
      >
        {/* Fundo neomórfico */}
        <defs>
          <filter id="neoShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="neoHighlight">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="-2" dy="-2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feFlood floodColor="white" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Pizza principal (fade out quando expande) */}
        <g
          className={`${styles.mainPie} ${isExpanded ? styles.fadeOut : ''}`}
          opacity={isExpanded ? 0 : 1}
        >
          {mainSlices.map((slice, index) => {
            const isOtherSlice = index === otherSliceIndex;
            
            return (
              <g key={`main-${index}`}>
                <path
                  d={slice.path}
                  fill={slice.color}
                  className={`${styles.slice} ${isOtherSlice ? styles.otherSlice : ''}`}
                  filter="url(#neoShadow)"
                  onMouseEnter={() => {
                    console.log('Mouse enter - isOtherSlice:', isOtherSlice, 'slice:', slice.label);
                    if (isOtherSlice) {
                      setIsExpanded(true);
                    }
                  }}
                  style={{
                    cursor: isOtherSlice ? 'pointer' : 'default',
                  }}
                />
                
                {/* Label da fatia */}
                {!isExpanded && (
                  <text
                    x={getLabelPosition(50, 50, 45, slice.startAngle, slice.endAngle).x}
                    y={getLabelPosition(50, 50, 45, slice.startAngle, slice.endAngle).y}
                    className={styles.sliceLabel}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan className={styles.labelName}>{slice.label}</tspan>
                    <tspan x={getLabelPosition(50, 50, 45, slice.startAngle, slice.endAngle).x} dy="1.2em" className={styles.labelValue}>
                      {slice.percentage.toFixed(1)}%
                    </tspan>
                  </text>
                )}
              </g>
            );
          })}
        </g>
        
        {/* Pizza expandida (fade in quando expande) */}
        {hasOthers && (
          <g
            className={`${styles.expandedPie} ${isExpanded ? styles.fadeIn : ''}`}
            opacity={isExpanded ? 1 : 0}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grupo da pizza que gira */}
            <g transform={`rotate(${rotationAngle} 50 50)`}>
              {otherSlices.map((slice, index) => (
                <path
                  key={`expanded-path-${index}`}
                  d={slice.path}
                  fill={slice.color}
                  className={styles.expandedSlice}
                  filter="url(#neoShadow)"
                />
              ))}
            </g>
            
            {/* Grupo dos textos que NÃO giram */}
            {otherSlices.map((slice, index) => {
              const labelPos = getLabelPosition(50, 50, 45, slice.startAngle, slice.endAngle);
              const angle = rotationAngle * (Math.PI / 180);
              
              // Calcular posição rotacionada do texto
              const rotatedX = 50 + (labelPos.x - 50) * Math.cos(angle) - (labelPos.y - 50) * Math.sin(angle);
              const rotatedY = 50 + (labelPos.x - 50) * Math.sin(angle) + (labelPos.y - 50) * Math.cos(angle);
              
              return (
                <text
                  key={`expanded-label-${index}`}
                  x={rotatedX}
                  y={rotatedY}
                  className={styles.expandedLabel}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan className={styles.labelName}>{slice.label}</tspan>
                  <tspan 
                    x={rotatedX} 
                    dy="1.2em" 
                    className={styles.labelValue}
                  >
                    {slice.percentage.toFixed(1)}%
                  </tspan>
                </text>
              );
            })}
          </g>
        )}
      </svg>
      
      {/* Legenda */}
      <div className={styles.legend}>
        {(isExpanded ? otherSlices : mainSlices).map((slice, index) => (
          <div key={`legend-${index}`} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: slice.color }}
            />
            <span className={styles.legendLabel}>
              {slice.label}: <strong>{slice.percentage.toFixed(1)}%</strong>
            </span>
          </div>
        ))}
      </div>
      
      {hasOthers && !isExpanded && (
        <div className={styles.hint}>
          💡 Passe o mouse em "Outros" para ver detalhes
        </div>
      )}
    </div>
  );
};
