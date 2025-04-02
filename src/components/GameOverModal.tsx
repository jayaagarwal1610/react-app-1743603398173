import React from 'react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center',
      zIndex: 100
    }}>
      <h2>Game Over</h2>
      <p>Your score: {score}</p>
      <button 
        onClick={onRestart}
        style={{
          background: '#f00',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverModal;