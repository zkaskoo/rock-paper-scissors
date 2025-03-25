export type Choice = 'ko' | 'papir' | 'ollo';

export type GameResult = 'Győzelem' | 'Vereség' | 'Döntettlen';

export interface GameState {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  result: GameResult | null;
  score: {
    player: number;
    computer: number;
  };
} 