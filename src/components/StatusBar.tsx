import React from 'react';

interface StatusBarProps {
  score: number;
  health: number;
  speed: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ score, health, speed }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      background: '#333',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div>Score: {score}</div>
      <div>
        Health: 
        <div style={{
          width: '100px',
          height: '15px',
          background: '#444',
          marginLeft: '10px',
          display: 'inline-block',
          position: 'relative'
        }}>
          <div style={{
            width: `${health}%`,
            height: '100%',
            background: health > 50 ? 'green' : health > 20 ? 'orange' : 'red'
          }} />
        </div>
      </div>
      <div>Speed: {Math.floor(speed)} km/h</div>
    </div>
  );
};

export default StatusBar;