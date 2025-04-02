import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Obstacle as ObstacleType } from '../types';
import Road from './Road';
import Player from './Player';
import Obstacle from './Obstacle';
import StatusBar from './StatusBar';
import GameOverModal from './GameOverModal';
import StartScreen from './StartScreen';
import { useGameLoop } from '../hooks/useGameLoop';
import { useKeyPress } from '../hooks/useKeyPress';
import { detectCollisions } from '../utils/collision';
import { generateObstacle } from '../utils/gameUtils';

interface GameProps {
  width: number;
  height: number;
}

const INITIAL_STATE: GameState = {
  player: {
    position: { x: 0, y: 0 },
    speed: 60,
    health: 100,
    score: 0
  },
  obstacles: [],
  isGameOver: false,
  isPaused: false,
  roadSpeed: 0
};

const Game: React.FC<GameProps> = ({ width, height }) => {
  const [gameState, setGameState] = useState<GameState>({ ...INITIAL_STATE });
  const [gameStarted, setGameStarted] = useState(false);
  const [roadPosition, setRoadPosition] = useState(0);
  const [obstacleTimer, setObstacleTimer] = useState(0);
  
  const leftPressed = useKeyPress('ArrowLeft');
  const rightPressed = useKeyPress('ArrowRight');
  const upPressed = useKeyPress('ArrowUp');
  const downPressed = useKeyPress('ArrowDown');
  
  const startGame = useCallback(() => {
    const playerX = width / 2 - 25; // Center player horizontally (player width is 50px)
    const playerY = height - 150;  // Position player near bottom
    
    setGameState({
      ...INITIAL_STATE,
      player: {
        ...INITIAL_STATE.player,
        position: { x: playerX, y: playerY }
      },
      obstacles: []
    });
    setGameStarted(true);
  }, [width, height]);
  
  const gameOver = useCallback(() => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
  }, []);

  const updateGameState = useCallback((timestamp: number) => {
    if (gameState.isGameOver || gameState.isPaused) return;
    
    setGameState(prevState => {
      // Don't update if game is over
      if (prevState.isGameOver) return prevState;
      
      // Calculate time-based movement
      const deltaTime = 1 / 60; // Assume 60 FPS
      
      // Update player position based on input
      let newX = prevState.player.position.x;
      let newY = prevState.player.position.y;
      let newSpeed = prevState.player.speed;
      
      // Handle key presses
      if (leftPressed) newX -= 200 * deltaTime;
      if (rightPressed) newX += 200 * deltaTime;
      if (upPressed) newSpeed = Math.min(newSpeed + 2, 200);
      if (downPressed) newSpeed = Math.max(newSpeed - 2, 20);
      
      // Keep player within road bounds (road width is 70% of canvas)
      const roadLeftBound = width * 0.15;
      const roadRightBound = width * 0.85 - 50; // Player width is 50px
      newX = Math.max(roadLeftBound, Math.min(newX, roadRightBound));
      
      // Calculate road speed based on player speed
      const roadSpeed = newSpeed * 0.5;
      
      // Update obstacle positions
      const updatedObstacles = prevState.obstacles.map(obstacle => ({
        ...obstacle,
        position: {
          ...obstacle.position,
          y: obstacle.position.y + roadSpeed * deltaTime
        }
      }));
      
      // Remove obstacles that are off-screen
      const filteredObstacles = updatedObstacles.filter(
        obstacle => obstacle.position.y < height
      );
      
      // Generate new obstacles
      let newObstacles = [...filteredObstacles];
      
      // Occasionally add a new obstacle
      if (Math.random() < 0.02 + (newSpeed / 2000)) {
        newObstacles.push(generateObstacle(width));
      }
      
      // Check for collisions
      const collidedObstacle = detectCollisions(
        { ...prevState.player, position: { x: newX, y: newY } }, 
        newObstacles
      );
      
      // Update health and remove collided obstacle
      let newHealth = prevState.player.health;
      if (collidedObstacle) {
        newHealth -= collidedObstacle.type === 'car' ? 30 : 
                     collidedObstacle.type === 'rock' ? 20 : 10;
        
        // Remove the collided obstacle
        newObstacles = newObstacles.filter(obs => obs.id !== collidedObstacle.id);
      }
      
      // Calculate score
      const newScore = prevState.player.score + Math.floor(newSpeed) / 10;
      
      // Check game over condition
      if (newHealth <= 0) {
        return {
          ...prevState,
          player: {
            ...prevState.player,
            health: 0,
            score: Math.floor(newScore)
          },
          obstacles: newObstacles,
          isGameOver: true
        };
      }
      
      return {
        ...prevState,
        player: {
          position: { x: newX, y: newY },
          speed: newSpeed,
          health: newHealth,
          score: Math.floor(newScore)
        },
        obstacles: newObstacles,
        roadSpeed
      };
    });
    
    // Update road stripe animation
    setRoadPosition(prev => (prev + gameState.roadSpeed / 30) % 80);
  }, [gameState.isGameOver, gameState.isPaused, gameState.roadSpeed, leftPressed, rightPressed, upPressed, downPressed, width, height]);
  
  useGameLoop(updateGameState, gameStarted && !gameState.isGameOver);
  
  return (
    <div style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      position: 'relative',
      overflow: 'hidden',
      margin: '0 auto',
      backgroundColor: '#888'
    }}>
      <StatusBar 
        score={gameState.player.score} 
        health={gameState.player.health} 
        speed={gameState.player.speed} 
      />
      
      <div style={{ position: 'relative', height: `${height - 35}px` }}>
        <Road width={width} height={height} position={roadPosition} />
        
        <Player 
          position={gameState.player.position} 
          health={gameState.player.health} 
        />
        
        {gameState.obstacles.map(obstacle => (
          <Obstacle key={obstacle.id} obstacle={obstacle} />
        ))}
        
        {!gameStarted && <StartScreen onStart={startGame} />}
        
        {gameState.isGameOver && (
          <GameOverModal 
            score={gameState.player.score} 
            onRestart={startGame} 
          />
        )}
      </div>
    </div>
  );
};

export default Game;