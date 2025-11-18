export interface StackedAreaData {
  label: string;
  values: { [key: string]: number };
}

export interface NeoStackedAreaProps {
  data: StackedAreaData[];
  categories: string[];
  colors?: string[];
  width?: number;
  height?: number;
}
