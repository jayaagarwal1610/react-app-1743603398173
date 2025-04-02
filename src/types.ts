export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  id: string;
  position: Position;
  width: number;
  height: number;
  type: 'car' | 'rock' | 'oil';
}

export interface Player {
  position: Position;
  speed: number;
  health: number;
  score: number;
}

export interface GameState {
  player: Player;
  obstacles: Obstacle[];
  isGameOver: boolean;
  isPaused: boolean;
  roadSpeed: number;
}