import React from 'react';

interface RoadProps {
  width: number;
  height: number;
  position: number;
}

const Road: React.FC<RoadProps> = ({ width, height, position }) => {
  const roadBackgroundStyle = {
    width: '100%',
    height: '100%',
    background: '#555',
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const stripeStyle = {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '10px',
    height: '50px',
    background: '#fff',
    marginBottom: '30px'
  };

  const renderStripes = () => {
    const stripes = [];
    const stripeCount = Math.ceil(height / 80);
    
    for (let i = 0; i < stripeCount + 1; i++) {
      const yPos = ((position + i * 80) % (height + 80)) - 50;
      
      stripes.push(
        <div 
          key={i}
          style={{
            ...stripeStyle,
            top: `${yPos}px`
          }} 
        />
      );
    }
    
    return stripes;
  };

  return (
    <div style={roadBackgroundStyle}>
      <div style={{
        position: 'absolute',
        left: `${width * 0.15}px`,
        width: `${width * 0.7}px`,
        height: '100%',
        background: '#333'
      }}>
        {renderStripes()}
      </div>
    </div>
  );
};

export default Road;