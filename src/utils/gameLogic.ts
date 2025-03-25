import { Choice, GameResult } from '@/types/game';

export const getComputerChoice = (): Choice => {
  const choices: Choice[] = ['ko', 'papir', 'ollo'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

export const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
  if (playerChoice === computerChoice) return 'Döntetlen';
  
  const winningCombinations: Record<Choice, Choice> = {
    ko: 'ollo',
    papir: 'ko',
    ollo: 'papir',
  };

  return winningCombinations[playerChoice] === computerChoice ? 'Győzelem' : 'Vereség';
}; 