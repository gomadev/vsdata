// Exemplo de como estruturar seus dados para a apresentação

// 1. Defina a interface dos seus dados
export interface DataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface Dataset {
  name: string;
  description: string;
  data: DataPoint[];
  metadata?: {
    source: string;
    updatedAt: string;
    totalRecords: number;
  };
}

// 2. Exemplo de dados mock (substitua pelos seus dados reais)
export const exampleDataset: Dataset = {
  name: "Vendas por Região 2024",
  description: "Análise de vendas trimestrais por região do Brasil",
  data: [
    { label: "Norte", value: 1250, category: "Q1" },
    { label: "Nordeste", value: 2340, category: "Q1" },
    { label: "Centro-Oeste", value: 1780, category: "Q1" },
    { label: "Sudeste", value: 4560, category: "Q1" },
    { label: "Sul", value: 3120, category: "Q1" },
  ],
  metadata: {
    source: "Sistema Interno",
    updatedAt: "2024-11-17",
    totalRecords: 5,
  },
};

// 3. Exemplo de estatísticas calculadas
export const calculateStats = (data: DataPoint[]) => {
  const values = data.map(d => d.value);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  
  return {
    total: sum,
    average: avg.toFixed(2),
    maximum: max,
    minimum: min,
    count: values.length,
  };
};

// 4. Exemplo de insights automatizados
export const generateInsights = (data: DataPoint[]) => {
  const stats = calculateStats(data);
  const sorted = [...data].sort((a, b) => b.value - a.value);
  
  return [
    {
      id: 1,
      title: "Região com Maior Performance",
      description: `${sorted[0].label} lidera com ${sorted[0].value} unidades, representando ${((sorted[0].value / stats.total) * 100).toFixed(1)}% do total.`,
    },
    {
      id: 2,
      title: "Média Geral",
      description: `A média de vendas por região é de ${stats.average} unidades, com desvio significativo entre regiões.`,
    },
    {
      id: 3,
      title: "Oportunidades de Crescimento",
      description: `${sorted[sorted.length - 1].label} apresenta potencial de crescimento, com apenas ${sorted[sorted.length - 1].value} unidades.`,
    },
  ];
};

// 5. Exemplo de uso nos slides
// import { exampleDataset, calculateStats } from './examples/dataExample';
//
// function MySlide() {
//   const stats = calculateStats(exampleDataset.data);
//   
//   return (
//     <div>
//       <h2>{exampleDataset.name}</h2>
//       <p>Total: {stats.total}</p>
//       <p>Média: {stats.average}</p>
//     </div>
//   );
// }
