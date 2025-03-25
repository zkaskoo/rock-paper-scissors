export type Choice = 'ko' | 'papir' | 'ollo';

export type GameResult = 'Győzelem' | 'Vereség' | 'Döntetlen';

export interface GameRound {
  playerChoice: Choice;
  computerChoice: Choice;
  result: GameResult;
  timestamp: number;
}

export interface GameState {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  result: GameResult | null;
  score: {
    player: number;
    computer: number;
  };
  history: GameRound[];
} 