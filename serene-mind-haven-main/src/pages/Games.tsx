
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import MemoryGame from '../components/games/MemoryGame';
import WordSearch from '../components/games/WordSearch';
import { Gamepad2, Brain, ArrowLeft } from 'lucide-react';

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const gameOptions = [
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Test your memory by matching pairs of cards',
      icon: <Gamepad2 className="w-12 h-12 text-serenspace-rose" />
    },
    {
      id: 'wordsearch',
      name: 'Word Search',
      description: 'Find hidden words in a grid of letters',
      icon: <Brain className="w-12 h-12 text-serenspace-sage" />
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800">Games</h1>
          <p className="text-gray-600">Distract your mind with these relaxing games.</p>
        </div>
        
        {activeGame ? (
          <div className="space-y-4">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Games
            </button>
            
            {activeGame === 'memory' && <MemoryGame />}
            {activeGame === 'wordsearch' && <WordSearch />}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {gameOptions.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="serenspace-card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="mb-4">{game.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h2>
                <p className="text-gray-600">{game.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Games;
