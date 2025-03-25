'use client';

import { useState } from 'react';
import { Choice, GameState } from '@/types/game';
import { getComputerChoice, determineWinner } from '@/utils/gameLogic';

const initialGameState: GameState = {
  playerChoice: null,
  computerChoice: null,
  result: null,
  score: {
    player: 0,
    computer: 0,
  },
};

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handlePlayerChoice = (choice: Choice) => {
    const computerChoice = getComputerChoice();
    const result = determineWinner(choice, computerChoice);

    setGameState((prev) => ({
      playerChoice: choice,
      computerChoice,
      result,
      score: {
        player: prev.score.player + (result === 'win' ? 1 : 0),
        computer: prev.score.computer + (result === 'lose' ? 1 : 0),
      },
    }));
  };

  const getResultColor = (result: string | null) => {
    switch (result) {
      case 'win':
        return 'text-green-500';
      case 'lose':
        return 'text-red-500';
      case 'draw':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Rock Paper Scissors</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Player</h2>
              <p className="text-2xl">{gameState.playerChoice || '?'}</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Computer</h2>
              <p className="text-2xl">{gameState.computerChoice || '?'}</p>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Score</h2>
            <p className="text-3xl">
              {gameState.score.player} - {gameState.score.computer}
            </p>
          </div>

          {gameState.result && (
            <div className={`text-center text-2xl font-bold ${getResultColor(gameState.result)} mb-6`}>
              {gameState.result.toUpperCase()}!
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {(['rock', 'paper', 'scissors'] as Choice[]).map((choice) => (
            <button
              key={choice}
              onClick={() => handlePlayerChoice(choice)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              {choice.charAt(0).toUpperCase() + choice.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 