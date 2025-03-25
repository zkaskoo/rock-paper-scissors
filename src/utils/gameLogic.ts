import { Choice, GameResult } from '@/types/game';

export const getComputerChoice = (): Choice => {
  const choices: Choice[] = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

export const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
  if (playerChoice === computerChoice) return 'draw';
  
  const winningCombinations: Record<Choice, Choice> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return winningCombinations[playerChoice] === computerChoice ? 'win' : 'lose';
}; 