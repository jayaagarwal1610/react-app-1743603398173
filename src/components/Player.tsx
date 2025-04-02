import React from 'react';
import { Position } from '../types';

interface PlayerProps {
  position: Position;
  health: number;
}

const Player: React.FC<PlayerProps> = ({ position, health }) => {
  const bikeColor = health > 50 ? '#ff0000' : health > 20 ? '#ff8800' : '#ff0000';
  
  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '50px',
      height: '80px',
      zIndex: 10,
    }}>
      {/* Main body */}
      <div style={{
        position: 'absolute',
        width: '30px',
        height: '60px',
        background: bikeColor,
        left: '10px',
        top: '10px',
        borderRadius: '5px'
      }} />
      
      {/* Front wheel */}
      <div style={{
        position: 'absolute',
        width: '15px',
        height: '15px',
        background: '#333',
        borderRadius: '50%',
        left: '17.5px',
        top: '5px'
      }} />
      
      {/* Back wheel */}
      <div style={{
        position: 'absolute',
        width: '15px',
        height: '15px',
        background: '#333',
        borderRadius: '50%',
        left: '17.5px',
        bottom: '5px'
      }} />
      
      {/* Rider */}
      <div style={{
        position: 'absolute',
        width: '20px',
        height: '25px',
        background: '#222',
        left: '15px',
        top: '20px',
        borderRadius: '50% 50% 0 0'
      }} />
    </div>
  );
};

export default Player;