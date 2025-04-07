
import React, { useState, useEffect } from 'react';

interface WordSearchProps {
  size?: number;
  wordCount?: number;
}

const WordSearch: React.FC<WordSearchProps> = ({ size = 10, wordCount = 5 }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  
  const wordList = [
    'CALM', 'PEACE', 'HAPPY', 'JOY', 'RELAX',
    'SERENE', 'BREATH', 'MINDFUL', 'REST', 'BALANCE',
    'GENTLE', 'FOCUS', 'PRESENT', 'HARMONY', 'HEALING'
  ];
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  const initializeGame = () => {
    // Choose random words
    const shuffledWords = wordList.sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, wordCount).map(word => word.toUpperCase());
    setWords(selectedWords);
    setFoundWords([]);
    
    // Create empty grid
    const emptyGrid = Array(size).fill(null).map(() => Array(size).fill(''));
    
    // Place words
    const filledGrid = placeWords(emptyGrid, selectedWords);
    
    // Fill remaining empty cells with random letters
    const finalGrid = fillEmptyCells(filledGrid);
    
    setGrid(finalGrid);
  };
  
  const placeWords = (grid: string[][], words: string[]): string[][] => {
    const newGrid = [...grid.map(row => [...row])];
    const directions = [
      [0, 1],   // right
      [1, 0],   // down
      [1, 1],   // diagonal down-right
      [-1, 1],  // diagonal up-right
    ];
    
    words.forEach(word => {
      let placed = false;
      
      while (!placed) {
        // Pick random direction
        const dirIndex = Math.floor(Math.random() * directions.length);
        const [dx, dy] = directions[dirIndex];
        
        // Pick random starting position
        const startRow = Math.floor(Math.random() * size);
        const startCol = Math.floor(Math.random() * size);
        
        // Check if word fits
        if (checkWordFit(newGrid, word, startRow, startCol, dx, dy)) {
          // Place word
          placeWord(newGrid, word, startRow, startCol, dx, dy);
          placed = true;
        }
      }
    });
    
    return newGrid;
  };
  
  const checkWordFit = (
    grid: string[][], 
    word: string, 
    startRow: number, 
    startCol: number, 
    dx: number, 
    dy: number
  ): boolean => {
    if (
      startRow + word.length * dx > size || 
      startRow + word.length * dx < 0 ||
      startCol + word.length * dy > size || 
      startCol + word.length * dy < 0
    ) {
      return false;
    }
    
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * dx;
      const col = startCol + i * dy;
      
      if (grid[row][col] && grid[row][col] !== word[i]) {
        return false;
      }
    }
    
    return true;
  };
  
  const placeWord = (
    grid: string[][], 
    word: string, 
    startRow: number, 
    startCol: number, 
    dx: number, 
    dy: number
  ): void => {
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * dx;
      const col = startCol + i * dy;
      grid[row][col] = word[i];
    }
  };
  
  const fillEmptyCells = (grid: string[][]): string[][] => {
    const newGrid = [...grid.map(row => [...row])];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!newGrid[i][j]) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          newGrid[i][j] = letters[randomIndex];
        }
      }
    }
    
    return newGrid;
  };
  
  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([`${row}-${col}`]);
  };
  
  const handleCellMouseEnter = (row: number, col: number) => {
    if (isSelecting) {
      setSelectedCells([...selectedCells, `${row}-${col}`]);
    }
  };
  
  const handleCellMouseUp = () => {
    setIsSelecting(false);
    
    // Check if selected cells form a word
    const selectedLetters = selectedCells.map(cell => {
      const [row, col] = cell.split('-').map(Number);
      return grid[row][col];
    }).join('');
    
    // Check if the word is in our word list and not already found
    if (words.includes(selectedLetters) && !foundWords.includes(selectedLetters)) {
      setFoundWords([...foundWords, selectedLetters]);
    }
    
    // Clear selected cells after short delay
    setTimeout(() => {
      setSelectedCells([]);
    }, 500);
  };
  
  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.includes(`${row}-${col}`);
  };
  
  const isWordFound = (word: string): boolean => {
    return foundWords.includes(word);
  };
  
  return (
    <div className="serenspace-card p-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Word Search</h2>
        <p className="text-gray-600">Find all the hidden words in the grid!</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div 
          className="w-full md:w-auto"
          onMouseLeave={() => setIsSelecting(false)}
        >
          <div className="grid grid-cols-10" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
            {grid.map((row, rowIndex) => (
              row.map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square flex items-center justify-center border border-gray-200 font-bold text-sm md:text-base select-none cursor-pointer ${
                    isCellSelected(rowIndex, colIndex) 
                      ? 'bg-serenspace-rose text-white' 
                      : 'hover:bg-serenspace-nude/10'
                  }`}
                  onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleCellMouseUp}
                >
                  {letter}
                </div>
              ))
            ))}
          </div>
        </div>
        
        <div className="md:min-w-44">
          <h3 className="text-lg font-medium mb-2">Words to Find:</h3>
          <ul className="space-y-1">
            {words.map((word, index) => (
              <li 
                key={index}
                className={`px-3 py-1 rounded ${isWordFound(word) 
                  ? 'bg-serenspace-sage-light line-through text-serenspace-sage-dark' 
                  : 'text-gray-700'}`}
              >
                {word}
              </li>
            ))}
          </ul>
          
          {foundWords.length === words.length && (
            <div className="mt-4 p-3 bg-serenspace-sage/20 rounded-lg text-center">
              <p className="font-medium text-serenspace-sage-dark">Congratulations!</p>
              <p className="text-sm">You found all the words!</p>
              <button 
                onClick={initializeGame} 
                className="mt-2 px-4 py-1 bg-serenspace-sage text-white rounded-lg text-sm hover:bg-serenspace-sage-dark"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={initializeGame} 
          className="serenspace-button-primary"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default WordSearch;
