import { useState, useEffect } from 'react';
import { ICMData, ICMStats, loadICMData, calculateStats } from '../utils/dataLoader';

export function useICMData() {
  const [data, setData] = useState<ICMData[]>([]);
  const [stats, setStats] = useState<ICMStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadICMData().then(loaded => {
      setData(loaded);
      setStats(calculateStats(loaded));
      setLoading(false);
    });
  }, []);

  return { data, stats, loading };
}
