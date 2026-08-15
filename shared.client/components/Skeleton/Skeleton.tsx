import React from 'react';
import './Skeleton.css';
import { SkeletonProps } from './Skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return <div className="placeholder">Skeleton Component</div>;
};

export default Skeleton;
