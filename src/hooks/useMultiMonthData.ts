import { useState, useEffect } from 'react';
import type { ICMData } from '../utils/dataLoader';
import { categorizeICM, calculateStats } from '../utils/dataLoader';

export interface MonthData {
  month: string;
  monthNumber: number;
  data: ICMData[];
  stats: any;
}

export function useMultiMonthData() {
  const [monthsData, setMonthsData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const months = [
        { name: 'Agosto', number: 8, file: '2025_08' },
        { name: 'Setembro', number: 9, file: '2025_09' },
        { name: 'Outubro', number: 10, file: '2025_10' }
      ];

      const loaded: MonthData[] = [];

      for (const month of months) {
        const data: ICMData[] = [];

        try {
          // Load pavimentada
          const pavResp = await fetch(`/src/data/levantamentos_pavimentada_${month.file}.csv`);
          const pavText = await pavResp.text();
          const pavLines = pavText.split('\n').slice(1);

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
          const naoPavResp = await fetch(`/src/data/levantamentos_nao_pavimentada_${month.file}.csv`);
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

          loaded.push({
            month: month.name,
            monthNumber: month.number,
            data,
            stats: calculateStats(data)
          });
        } catch (error) {
          console.error(`Erro ao carregar dados de ${month.name}:`, error);
        }
      }

      setMonthsData(loaded);
      setLoading(false);
    };

    loadData();
  }, []);

  return { monthsData, loading };
}
