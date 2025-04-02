import React from 'react';
import { Obstacle as ObstacleType } from '../types';

interface ObstacleProps {
  obstacle: ObstacleType;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  const { type, position, width, height } = obstacle;
  
  const getObstacleStyle = () => {
    switch(type) {
      case 'car':
        return {
          background: '#228',
          borderRadius: '5px'
        };
      case 'rock':
        return {
          background: '#996633',
          borderRadius: '10px'
        };
      case 'oil':
        return {
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '50%'
        };
      default:
        return {
          background: '#f00'
        };
    }
  };

  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${width}px`,
      height: `${height}px`,
      ...getObstacleStyle()
    }} />
  );
};

export default Obstacle;