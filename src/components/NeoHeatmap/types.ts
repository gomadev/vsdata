export interface HeatmapCell {
  row: string;
  col: string;
  value: number;
}

export interface NeoHeatmapProps {
  data: HeatmapCell[];
  rows: string[];
  cols: string[];
  colorScale?: [string, string];
  width?: number;
  cellSize?: number;
}
