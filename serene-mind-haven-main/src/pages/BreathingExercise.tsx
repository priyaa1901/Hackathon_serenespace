
import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import { ArrowLeft, Clock, Pause, Play, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const BreathingExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [maxCycles, setMaxCycles] = useState(3);
  const animationRef = useRef<HTMLDivElement>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const exercises = [
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Inhale, hold, exhale, and hold for equal counts of 4 seconds each',
      phases: {
        inhale: 4,
        hold: 4,
        exhale: 4,
        hold2: 4
      },
      benefits: 'Reduces stress and improves concentration',
      color: 'from-serenspace-sage to-serenspace-sage-dark'
    },
    {
      id: '478',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
      phases: {
        inhale: 4,
        hold: 7,
        exhale: 8,
        hold2: 0
      },
      benefits: 'Helps with anxiety, sleep, and stress management',
      color: 'from-serenspace-rose to-serenspace-rose-dark'
    },
    {
      id: 'calm',
      name: 'Calming Breath',
      description: 'Slow, deep breathing with a longer exhale to calm the nervous system',
      phases: {
        inhale: 5,
        hold: 2,
        exhale: 6,
        hold2: 0
      },
      benefits: 'Reduces anxiety and promotes relaxation',
      color: 'from-serenspace-nude to-serenspace-nude-dark'
    }
  ];

  const getCurrentPhaseTime = () => {
    const exercise = exercises.find(ex => ex.id === currentExercise);
    if (!exercise) return 0;
    return exercise.phases[breathPhase];
  };

  const handleStartExercise = (exerciseId: string) => {
    setCurrentExercise(exerciseId);
    setBreathPhase('inhale');
    setCycleCount(0);
    setTimer(0);
    setIsRunning(false);
  };

  const startBreathing = () => {
    setIsRunning(true);
    setTimer(getCurrentPhaseTime());
    
    // Start the first phase
    nextPhase();
  };

  const pauseBreathing = () => {
    setIsRunning(false);
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }
  };

  const resetBreathing = () => {
    pauseBreathing();
    setBreathPhase('inhale');
    setCycleCount(0);
    setTimer(getCurrentPhaseTime());
  };

  const nextPhase = () => {
    if (!isRunning) return;
    
    const exercise = exercises.find(ex => ex.id === currentExercise);
    if (!exercise) return;
    
    // Clear any existing timeout
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
    }
    
    // Set the time for the current phase
    const phaseTime = exercise.phases[breathPhase] * 1000;
    
    phaseTimerRef.current = setTimeout(() => {
      // When phase is complete, move to next phase
      if (breathPhase === 'inhale') {
        setBreathPhase('hold');
        setTimer(exercise.phases.hold);
      } else if (breathPhase === 'hold') {
        setBreathPhase('exhale');
        setTimer(exercise.phases.exhale);
      } else if (breathPhase === 'exhale') {
        if (exercise.phases.hold2 > 0) {
          setBreathPhase('hold2');
          setTimer(exercise.phases.hold2);
        } else {
          setBreathPhase('inhale');
          setTimer(exercise.phases.inhale);
          // Complete cycle
          const newCycleCount = cycleCount + 1;
          setCycleCount(newCycleCount);
          
          if (newCycleCount >= maxCycles) {
            completeExercise();
            return;
          }
        }
      } else if (breathPhase === 'hold2') {
        setBreathPhase('inhale');
        setTimer(exercise.phases.inhale);
        // Complete cycle
        const newCycleCount = cycleCount + 1;
        setCycleCount(newCycleCount);
        
        if (newCycleCount >= maxCycles) {
          completeExercise();
          return;
        }
      }
      
      // Continue to the next phase
      nextPhase();
    }, phaseTime);
  };

  const completeExercise = () => {
    setIsRunning(false);
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
    }
    toast('Exercise completed!', {
      description: `You've completed ${maxCycles} cycles of breathing.`,
    });
  };

  const getAnimationClassName = () => {
    if (!isRunning) return '';
    
    if (breathPhase === 'inhale') {
      return 'animate-breathe-in';
    } else if (breathPhase === 'exhale') {
      return 'animate-breathe-out';
    }
    return 'animate-none';
  };

  const getPhaseText = () => {
    if (breathPhase === 'inhale') return 'Inhale';
    if (breathPhase === 'hold') return 'Hold';
    if (breathPhase === 'exhale') return 'Exhale';
    if (breathPhase === 'hold2') return 'Hold';
    return '';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6 animate-fade-in">
          <button
            onClick={() => navigate('/self-care')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back to Self-Care</span>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">Breathing Exercises</h1>
          <p className="text-gray-600">Calm your mind and reduce stress with guided breathing.</p>
        </div>
        
        {!currentExercise ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => handleStartExercise(exercise.id)}
                className="serenspace-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{exercise.name}</h2>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                <div className="text-sm bg-gray-50 p-2 rounded text-gray-700">
                  <strong>Benefits:</strong> {exercise.benefits}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="serenspace-card p-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {exercises.find(ex => ex.id === currentExercise)?.name}
              </h2>
              <p className="text-gray-600">
                {exercises.find(ex => ex.id === currentExercise)?.description}
              </p>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="mb-6 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-white">
                  {getPhaseText()}
                </div>
                <div
                  ref={animationRef}
                  className={`w-48 h-48 rounded-full bg-gradient-to-r ${
                    exercises.find(ex => ex.id === currentExercise)?.color
                  } flex items-center justify-center ${getAnimationClassName()}`}
                >
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="text-2xl font-bold text-white">{timer}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                {!isRunning ? (
                  <button
                    onClick={startBreathing}
                    className="px-4 py-2 bg-serenspace-rose text-white rounded-full flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseBreathing}
                    className="px-4 py-2 bg-serenspace-nude text-white rounded-full flex items-center"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                )}
                
                <button
                  onClick={resetBreathing}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">
                  Cycle {cycleCount + 1} of {maxCycles}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Cycles:</span>
                <select
                  value={maxCycles}
                  onChange={(e) => setMaxCycles(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  disabled={isRunning}
                >
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Find a comfortable seated position
                </li>
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Close your eyes to minimize distractions
                </li>
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Breathe through your nose if possible
                </li>
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Focus on your breath and let go of other thoughts
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BreathingExercise;
