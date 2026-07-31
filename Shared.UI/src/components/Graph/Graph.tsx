import React from 'react';
import './Graph.css';
import { GraphProps } from './Graph.types';

export const Graph: React.FC<GraphProps> = ({ data, type = 'bar', className = '' }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`graph graph-${type} ${className}`}>
      {type === 'bar' && (
        <div className="graph__bars">
          {data.map((item, i) => (
            <div key={i} className="graph__bar-container">
              <div className="graph__bar" style={{ height: `${(item.value / maxValue) * 100}%` }} title={`${item.label}: ${item.value}`} />
              <span className="graph__label">{item.label}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'line' && (
        <svg className="graph__line-chart" viewBox="0 0 400 200">
          <polyline
            fill="none"
            stroke="#1890ff"
            strokeWidth="2"
            points={data.map((d, i) => `${(i / (data.length - 1)) * 400},${200 - (d.value / maxValue) * 180}`).join(' ')}
          />
          {data.map((d, i) => (
            <circle key={i} cx={(i / (data.length - 1)) * 400} cy={200 - (d.value / maxValue) * 180} r="4" fill="#1890ff" />
          ))}
        </svg>
      )}
    </div>
  );
};

export default Graph;
