import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      zIndex: 100
    }}>
      <h1 style={{ color: '#f00', fontSize: '48px' }}>ROAD RASH</h1>
      <div style={{ marginBottom: '30px' }}>
        <p>Use arrow keys to move your bike.</p>
        <p>Avoid obstacles and survive as long as possible!</p>
      </div>
      <button 
        onClick={onStart}
        style={{
          background: '#f00',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;