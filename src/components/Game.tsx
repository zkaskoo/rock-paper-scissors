'use client';

import { useState, useEffect } from 'react';
import { Choice, GameState, GameRound, GameResult } from '@/types/game';
import { getComputerChoice, determineWinner } from '@/utils/gameLogic';
import confetti from 'canvas-confetti';

const initialGameState: GameState = {
  playerChoice: null,
  computerChoice: null,
  result: null,
  score: {
    player: 0,
    computer: 0,
  },
  history: [],
};

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handlePlayerChoice = (choice: Choice) => {
    setIsAnimating(true);
    
    // Simulate thinking time for computer
    setTimeout(() => {
      const computerChoice = getComputerChoice();
      const result = determineWinner(choice, computerChoice);
      
      const newRound: GameRound = {
        playerChoice: choice,
        computerChoice,
        result,
        timestamp: Date.now(),
      };

      setGameState((prev) => ({
        playerChoice: choice,
        computerChoice,
        result,
        score: {
          player: prev.score.player + (result === 'Győzelem' ? 1 : 0),
          computer: prev.score.computer + (result === 'Vereség' ? 1 : 0),
        },
        history: [newRound, ...prev.history].slice(0, 10), // Keep only the last 10 rounds
      }));
      
      // Celebrate if player wins
      if (result === 'Győzelem') {
        triggerConfetti();
      }
      
      setIsAnimating(false);
    }, 800);
  };
  
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#06b6d4', '#818cf8', '#60a5fa', '#34d399'],
    });
  };

  const getResultColor = (result: string | null) => {
    switch (result) {
      case 'Győzelem':
        return 'text-green-500';
      case 'Vereség':
        return 'text-red-500';
      case 'Döntetlen':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getResultBgColor = (result: GameResult) => {
    switch (result) {
      case 'Győzelem':
        return 'bg-green-500/20';
      case 'Vereség':
        return 'bg-red-500/20';
      case 'Döntetlen':
        return 'bg-yellow-500/20';
      default:
        return 'bg-gray-500/20';
    }
  };
  
  const getChoiceEmoji = (choice: Choice | null) => {
    if (!choice) return '❓';
    
    switch (choice) {
      case 'ko': return '🪨';
      case 'papir': return '📄';
      case 'ollo': return '✂️';
      default: return '❓';
    }
  };
  
  const resetGame = () => {
    setGameState(initialGameState);
  };
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('hu-HU', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Kő Papír Olló</h1>
        
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl mb-8 border border-gray-800">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">Játékos</h2>
              <div className={`text-6xl mb-2 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
                {getChoiceEmoji(gameState.playerChoice)}
              </div>
              <p className="text-lg opacity-80">{gameState.playerChoice ? gameState.playerChoice.charAt(0).toUpperCase() + gameState.playerChoice.slice(1) : ''}</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">Számítógép</h2>
              <div className={`text-6xl mb-2 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
                {isAnimating ? '❓' : getChoiceEmoji(gameState.computerChoice)}
              </div>
              <p className="text-lg opacity-80">{!isAnimating && gameState.computerChoice ? gameState.computerChoice.charAt(0).toUpperCase() + gameState.computerChoice.slice(1) : ''}</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="text-center px-8 py-4 bg-gray-800/50 rounded-full">
              <h2 className="text-xl font-semibold mb-2 text-gray-300">Pontszám</h2>
              <p className="text-3xl font-bold">
                <span className="text-cyan-400">{gameState.score.player}</span>
                <span className="mx-3">-</span>
                <span className="text-purple-400">{gameState.score.computer}</span>
              </p>
            </div>
          </div>

          {gameState.result && (
            <div className={`text-center text-2xl font-bold ${getResultColor(gameState.result)} mb-6 py-3 rounded-lg transition-all duration-500`}>
              {gameState.result}!
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mb-6">
            {(gameState.playerChoice || gameState.score.player > 0 || gameState.score.computer > 0) && (
              <button 
                onClick={resetGame}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
              >
                Újrakezdés
              </button>
            )}
            
            {gameState.history.length > 0 && (
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-sm transition-colors"
              >
                {showHistory ? 'Előzmények elrejtése' : 'Előzmények mutatása'}
              </button>
            )}
          </div>
          
          {showHistory && gameState.history.length > 0 && (
            <div className="mt-6 border-t border-gray-700 pt-4 overflow-hidden">
              <h3 className="text-lg font-semibold mb-3 text-center">Játék előzmények</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {gameState.history.map((round, index) => (
                  <div 
                    key={round.timestamp} 
                    className={`flex items-center justify-between p-2 rounded-lg ${getResultBgColor(round.result)}`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">{index + 1}.</span>
                      <div className="flex items-center">
                        <span className="text-xl mr-1">{getChoiceEmoji(round.playerChoice)}</span>
                        <span className="text-sm">vs</span>
                        <span className="text-xl ml-1">{getChoiceEmoji(round.computerChoice)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`font-medium ${getResultColor(round.result)}`}>
                        {round.result}
                      </span>
                      <span className="text-xs text-gray-400">{formatTime(round.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {(['ko', 'papir', 'ollo'] as Choice[]).map((choice) => (
            <button
              key={choice}
              onClick={() => !isAnimating && handlePlayerChoice(choice)}
              disabled={isAnimating}
              className={`
                relative overflow-hidden group
                bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600
                text-white font-bold py-5 px-6 rounded-xl
                transition-all duration-200 transform hover:scale-105 hover:shadow-lg
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl mb-2">{getChoiceEmoji(choice)}</span>
                <span>{choice.charAt(0).toUpperCase() + choice.slice(1)}</span>
              </div>
              <div className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          ))}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p className="mb-2">
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Kő Papír Olló
          </span>{' '}
          &copy; {new Date().getFullYear()}
        </p>
        <p className="opacity-70">Készítette: Tóth Zoltán</p>
      </footer>
    </div>
  );
} 