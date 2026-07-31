export interface GraphDataPoint {
  label: string;
  value: number;
}

export interface GraphProps {
  data: GraphDataPoint[];
  type?: 'bar' | 'line';
  className?: string;
}
