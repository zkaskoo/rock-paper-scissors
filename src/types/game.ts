export type Choice = 'rock' | 'paper' | 'scissors';

export type GameResult = 'win' | 'lose' | 'draw';

export interface GameState {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  result: GameResult | null;
  score: {
    player: number;
    computer: number;
  };
} 