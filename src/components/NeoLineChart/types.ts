export interface LinePoint {
  x: number;
  y: number;
  label: string;
  value: number;
}

export interface NeoLineChartProps {
  data: LinePoint[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  animate?: boolean;
  gradient?: boolean;
}
