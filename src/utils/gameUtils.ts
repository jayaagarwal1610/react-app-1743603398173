import { Obstacle, Position } from '../types';

export const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const generateRandomPosition = (
  minX: number,
  maxX: number,
  y: number
): Position => ({
  x: Math.random() * (maxX - minX) + minX,
  y
});

export const generateObstacle = (
  canvasWidth: number,
  type: 'car' | 'rock' | 'oil' = 'car'
): Obstacle => {
  const width = type === 'car' ? 60 : type === 'rock' ? 40 : 30;
  const height = type === 'car' ? 100 : type === 'rock' ? 40 : 30;
  
  // Keep obstacles within the road bounds with some margin
  const minX = canvasWidth * 0.2;
  const maxX = canvasWidth * 0.8 - width;
  
  return {
    id: generateId(),
    position: generateRandomPosition(minX, maxX, -height),
    width,
    height,
    type
  };
};