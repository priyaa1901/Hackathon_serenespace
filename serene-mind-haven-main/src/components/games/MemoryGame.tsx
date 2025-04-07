
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ICONS = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍋', '🍑', '🍍', '🥭', '🍈', '🍉', '🍐'];

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const initializeGame = () => {
    // Create pairs of cards
    const selectedIcons = ICONS.slice(0, 6);
    const cardPairs = [...selectedIcons, ...selectedIcons];
    
    // Shuffle the cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false
      }));
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
    setGameCompleted(false);
  };

  useEffect(() => {
    if (matchedPairs === 6) {
      setGameCompleted(true);
      toast('Congratulations!', {
        description: `You completed the game in ${moves} moves!`,
      });
    }
  }, [matchedPairs, moves]);

  const handleCardClick = (index: number) => {
    // Don't allow clicks if game is completed or card is already flipped/matched
    if (gameCompleted || cards[index].flipped || cards[index].matched) {
      return;
    }

    // Don't allow more than 2 flipped cards at once
    if (flippedIndices.length === 2) {
      return;
    }

    // Flip the card
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    // Add to flipped indices
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // If two cards are flipped, check for a match
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].icon === cards[secondIndex].icon) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].matched = true;
          matchedCards[secondIndex].matched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatchedPairs(matchedPairs + 1);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const unflippedCards = [...cards];
          unflippedCards[firstIndex].flipped = false;
          unflippedCards[secondIndex].flipped = false;
          setCards(unflippedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="serenspace-card p-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Memory Game</h2>
        <p className="text-gray-600">Match all the pairs of fruits to win!</p>
      </div>
      
      {!gameStarted ? (
        <div className="text-center py-6">
          <button
            onClick={initializeGame}
            className="serenspace-button-primary px-8 py-3"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-gray-600">Moves: {moves}</div>
            <div className="text-sm font-medium text-gray-600">Pairs: {matchedPairs}/6</div>
            <button 
              onClick={initializeGame} 
              className="text-sm px-3 py-1 bg-serenspace-nude text-white rounded hover:bg-serenspace-nude-dark"
            >
              Restart
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
            {cards.map((card, index) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square flex items-center justify-center rounded-lg text-3xl cursor-pointer transition-all transform ${
                  card.flipped || card.matched
                    ? 'bg-serenspace-rose-light rotate-0'
                    : 'bg-serenspace-rose text-white rotate-y-180'
                } ${
                  card.matched ? 'bg-serenspace-sage-light' : ''
                } hover:scale-105`}
              >
                {(card.flipped || card.matched) ? card.icon : '?'}
              </div>
            ))}
          </div>
          
          {gameCompleted && (
            <div className="mt-6 text-center">
              <div className="text-lg font-semibold text-serenspace-sage-dark">
                Congratulations! You won in {moves} moves!
              </div>
              <button 
                onClick={initializeGame} 
                className="mt-3 serenspace-button-primary"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
