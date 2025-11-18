export interface BarData {
  label: string;
  value: number;
  color?: string;
}

export interface NeoBarChartProps {
  data: BarData[];
  height?: number;
  showValues?: boolean;
}
