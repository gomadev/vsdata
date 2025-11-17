import type { PieChartDataItem, PieSlice } from './types';

// Paleta de cores neomórficas
const DEFAULT_COLORS = [
  '#667eea', // Roxo
  '#764ba2', // Roxo escuro
  '#f093fb', // Rosa
  '#4facfe', // Azul claro
  '#43e97b', // Verde
  '#fa709a', // Rosa forte
  '#fee140', // Amarelo
  '#30cfd0', // Ciano
];

export const generateSlices = (
  data: PieChartDataItem[],
  minSlicePercentage: number = 5
): { mainSlices: PieSlice[]; otherSlices: PieSlice[] } => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const mainData: PieChartDataItem[] = [];
  const otherData: PieChartDataItem[] = [];
  
  // Separar fatias principais das pequenas
  data.forEach((item, index) => {
    const percentage = (item.value / total) * 100;
    const itemWithColor = {
      ...item,
      color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    };
    
    if (percentage >= minSlicePercentage) {
      mainData.push(itemWithColor);
    } else {
      otherData.push(itemWithColor);
    }
  });
  
  // Criar fatias principais
  let currentAngle = -90; // Começar no topo
  const mainSlices: PieSlice[] = mainData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    return {
      label: item.label,
      value: item.value,
      percentage,
      startAngle,
      endAngle,
      color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      path: createArcPath(50, 50, 45, startAngle, endAngle),
    };
  });
  
  // Criar fatia "Outros" se necessário
  if (otherData.length > 0) {
    const otherTotal = otherData.reduce((sum, item) => sum + item.value, 0);
    const otherPercentage = (otherTotal / total) * 100;
    const otherAngle = (otherPercentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + otherAngle;
    
    mainSlices.push({
      label: 'Outros',
      value: otherTotal,
      percentage: otherPercentage,
      startAngle,
      endAngle,
      color: '#a3b1c6',
      path: createArcPath(50, 50, 45, startAngle, endAngle),
    });
    
    // Criar sub-fatias para expansão
    currentAngle = -90;
    const otherSlices: PieSlice[] = otherData.map((item, index) => {
      const percentage = (item.value / otherTotal) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      return {
        label: item.label,
        value: item.value,
        percentage,
        startAngle,
        endAngle,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        path: createArcPath(50, 50, 45, startAngle, endAngle),
      };
    });
    
    return { mainSlices, otherSlices };
  }
  
  return { mainSlices, otherSlices: [] };
};

export const createArcPath = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);
  
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  
  return [
    `M ${centerX} ${centerY}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
    'Z',
  ].join(' ');
};

export const getLabelPosition = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): { x: number; y: number } => {
  const midAngle = (startAngle + endAngle) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const labelRadius = radius * 0.7;
  
  return {
    x: centerX + labelRadius * Math.cos(midRad),
    y: centerY + labelRadius * Math.sin(midRad),
  };
};
