export interface ICMData {
  uf: string;
  rodovia: string;
  km: number;
  icm: number;
  categoria: 'BOM' | 'REGULAR' | 'RUIM' | 'PÉSSIMO';
  pavimentada: boolean;
}

export interface ICMStats {
  total: number;
  bom: number;
  regular: number;
  ruim: number;
  pessimo: number;
  mediaICM: number;
}

export function categorizeICM(icm: number): ICMData['categoria'] {
  if (icm < 30) return 'BOM';
  if (icm < 50) return 'REGULAR';
  if (icm < 70) return 'RUIM';
  return 'PÉSSIMO';
}

export async function loadICMData(): Promise<ICMData[]> {
  const data: ICMData[] = [];
  
  try {
    // Load pavimentada
    const pavResp = await fetch('/src/data/levantamentos_pavimentada_2025_10.csv');
    const pavText = await pavResp.text();
    const pavLines = pavText.split('\n').slice(1); // Skip header
    
    pavLines.forEach(line => {
      if (!line.trim()) return;
      const cols = line.split(';').map(c => c.replace(/"/g, '').trim());
      const icm = parseFloat(cols[15]?.replace(',', '.'));
      if (!isNaN(icm)) {
        data.push({
          uf: cols[1],
          rodovia: cols[5],
          km: parseFloat(cols[6]?.replace(',', '.')),
          icm,
          categoria: categorizeICM(icm),
          pavimentada: true
        });
      }
    });

    // Load não pavimentada
    const naoPavResp = await fetch('/src/data/levantamentos_nao_pavimentada_2025_10.csv');
    const naoPavText = await naoPavResp.text();
    const naoPavLines = naoPavText.split('\n').slice(1);
    
    naoPavLines.forEach(line => {
      if (!line.trim()) return;
      const cols = line.split(';').map(c => c.replace(/"/g, '').trim());
      const icm = parseFloat(cols[12]?.replace(',', '.'));
      if (!isNaN(icm)) {
        data.push({
          uf: cols[0],
          rodovia: cols[4],
          km: parseFloat(cols[5]?.replace(',', '.')),
          icm,
          categoria: categorizeICM(icm),
          pavimentada: false
        });
      }
    });
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }

  return data;
}

export function calculateStats(data: ICMData[]): ICMStats {
  const bom = data.filter(d => d.categoria === 'BOM').length;
  const regular = data.filter(d => d.categoria === 'REGULAR').length;
  const ruim = data.filter(d => d.categoria === 'RUIM').length;
  const pessimo = data.filter(d => d.categoria === 'PÉSSIMO').length;
  const soma = data.reduce((acc, d) => acc + d.icm, 0);
  
  return {
    total: data.length,
    bom,
    regular,
    ruim,
    pessimo,
    mediaICM: data.length > 0 ? soma / data.length : 0
  };
}

export function getTopWorstStates(data: ICMData[], limit: number = 5) {
  const byState = data.reduce((acc, d) => {
    if (!acc[d.uf]) {
      acc[d.uf] = { total: 0, soma: 0 };
    }
    acc[d.uf].total++;
    acc[d.uf].soma += d.icm;
    return acc;
  }, {} as Record<string, { total: number; soma: number }>);

  return Object.entries(byState)
    .map(([uf, stats]) => ({
      uf,
      media: stats.soma / stats.total
    }))
    .sort((a, b) => b.media - a.media)
    .slice(0, limit);
}
