import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div style={{ 
      textAlign: 'center',
      backgroundColor: '#222',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{ color: 'red', marginBottom: '20px' }}>React Road Rash</h1>
      <Game width={800} height={600} />
    </div>
  );
};

export default App;