import { Obstacle, Player } from '../types';

export const checkCollision = (
  player: Player,
  obstacle: Obstacle,
  playerWidth: number = 50,
  playerHeight: number = 80
): boolean => {
  return (
    player.position.x < obstacle.position.x + obstacle.width &&
    player.position.x + playerWidth > obstacle.position.x &&
    player.position.y < obstacle.position.y + obstacle.height &&
    player.position.y + playerHeight > obstacle.position.y
  );
};

export const detectCollisions = (
  player: Player,
  obstacles: Obstacle[],
  playerWidth: number = 50,
  playerHeight: number = 80
): Obstacle | null => {
  for (const obstacle of obstacles) {
    if (checkCollision(player, obstacle, playerWidth, playerHeight)) {
      return obstacle;
    }
  }
  return null;
};