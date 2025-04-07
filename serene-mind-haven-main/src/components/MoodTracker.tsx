
import React, { useState } from 'react';
import { Smile, Meh, Frown, Heart, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

type Mood = 'great' | 'good' | 'okay' | 'sad' | 'awful';

interface MoodIcon {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const MoodTracker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const moods: Record<Mood, MoodIcon> = {
    great: { 
      icon: <Heart size={24} className="text-pink-500" />, 
      label: 'Great', 
      color: 'bg-pink-500 hover:bg-pink-600' 
    },
    good: { 
      icon: <ThumbsUp size={24} className="text-green-500" />, 
      label: 'Good', 
      color: 'bg-green-500 hover:bg-green-600' 
    },
    okay: { 
      icon: <Smile size={24} className="text-yellow-500" />, 
      label: 'Okay', 
      color: 'bg-yellow-500 hover:bg-yellow-600' 
    },
    sad: { 
      icon: <Meh size={24} className="text-orange-500" />, 
      label: 'Sad', 
      color: 'bg-orange-500 hover:bg-orange-600' 
    },
    awful: { 
      icon: <Frown size={24} className="text-red-500" />, 
      label: 'Awful', 
      color: 'bg-red-500 hover:bg-red-600' 
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setIsOpen(false);
    toast(`Mood set to ${moods[mood].label}`, {
      description: "Your mood has been recorded for today.",
      action: {
        label: "View Trends",
        onClick: () => console.log("View mood trends")
      },
    });

    // Suggestion based on mood
    if (mood === 'sad' || mood === 'awful') {
      setTimeout(() => {
        toast("Self-care suggestion", {
          description: "Would you like to try a breathing exercise or chat with our AI companion?",
          action: {
            label: "Let's Try",
            onClick: () => console.log("Navigate to self-care")
          },
        });
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-3 ${selectedMood ? moods[selectedMood].color : 'bg-serenspace-rose hover:bg-serenspace-rose-dark'} text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serenspace-rose`}
      >
        {selectedMood ? moods[selectedMood].icon : <Smile size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 z-10 bg-white rounded-lg shadow-xl p-3 border border-serenspace-nude/20 animate-fade-in w-56">
          <div className="text-sm font-medium text-gray-700 mb-2">How are you feeling today?</div>
          <div className="grid grid-cols-5 gap-2">
            {(Object.keys(moods) as Mood[]).map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className={`p-2 rounded-full ${moods[mood].color} text-white flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-110`}
                title={moods[mood].label}
              >
                {moods[mood].icon}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2 mt-1">
            {(Object.keys(moods) as Mood[]).map((mood) => (
              <span key={`label-${mood}`} className="text-xs text-center text-gray-600">
                {moods[mood].label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
