export interface PieChartDataItem {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataItem[];
  width?: number;
  height?: number;
  minSlicePercentage?: number; // Fatias menores que isso vão para "Outros"
  className?: string;
}

export interface PieSlice {
  label: string;
  value: number;
  percentage: number;
  startAngle: number;
  endAngle: number;
  color: string;
  path: string;
}
