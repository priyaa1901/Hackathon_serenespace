
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ActivityTimerProps {
  duration: number; // in minutes
  onComplete: () => void;
}

const ActivityTimer: React.FC<ActivityTimerProps> = ({ duration, onComplete }) => {
  const [seconds, setSeconds] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      if (interval) clearInterval(interval);
      setIsActive(false);
      setCompleted(true);
      onComplete();
      toast('Activity completed!', {
        description: 'Great job completing your self-care activity.',
      });
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(duration * 60);
    setIsActive(false);
    setCompleted(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-serenspace-nude/10 rounded-lg p-4 text-center">
      {completed ? (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
          <p className="text-xl font-semibold text-gray-800">Activity Completed</p>
          <button 
            onClick={resetTimer}
            className="mt-3 px-3 py-1 bg-serenspace-sage text-white rounded hover:bg-serenspace-sage-dark"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-serenspace-rose flex items-center justify-center mb-3">
            <div className="text-2xl font-bold text-gray-800">{formatTime()}</div>
          </div>
          <div className="space-x-2">
            <button 
              onClick={toggleTimer} 
              className={`px-4 py-2 rounded ${isActive 
                ? 'bg-serenspace-nude-dark text-white' 
                : 'bg-serenspace-rose text-white'}`}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={resetTimer}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTimer;
