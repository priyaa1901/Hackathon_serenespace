
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Calendar, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood?: 'great' | 'good' | 'okay' | 'sad' | 'awful';
}

const Journal: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [entryDate, setEntryDate] = useState(new Date());
  const [currentMood, setCurrentMood] = useState<JournalEntry['mood']>('okay');
  const [streak, setStreak] = useState(0);
  const user = getCurrentUser();

  useEffect(() => {
    // In a real app, this would fetch from a database
    const mockEntries: JournalEntry[] = [
      {
        id: '1',
        date: new Date(Date.now() - 86400000), // yesterday
        content: "Today was challenging but I practiced mindfulness for 10 minutes and it helped me center myself.",
        mood: 'good'
      },
      {
        id: '2',
        date: new Date(Date.now() - 172800000), // 2 days ago
        content: "I felt overwhelmed with work today. Going to try to break tasks into smaller pieces tomorrow.",
        mood: 'sad'
      }
    ];
    
    setJournalEntries(mockEntries);
    
    // Calculate streak based on consecutive days with entries
    const calculateStreak = () => {
      let currentStreak = 0;
      const sortedEntries = [...mockEntries].sort((a, b) => b.date.getTime() - a.date.getTime());
      
      if (sortedEntries.length === 0) return 0;
      
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      
      for (const entry of sortedEntries) {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (24 * 60 * 60 * 1000));
        
        if (diffDays === currentStreak) {
          currentStreak++;
          currentDate = new Date(entryDate.getTime() - 24 * 60 * 60 * 1000);
        } else {
          break;
        }
      }
      
      return currentStreak;
    };
    
    setStreak(calculateStreak());
  }, []);

  const handleSaveEntry = () => {
    if (currentEntry.trim() === '') {
      toast("Entry cannot be empty", {
        description: "Please write something before saving.",
      });
      return;
    }
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: entryDate,
      content: currentEntry,
      mood: currentMood
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setCurrentEntry('');
    setEntryDate(new Date());
    
    toast("Journal entry saved", {
      description: "Your thoughts have been recorded.",
    });
    
    // Update streak
    setStreak(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800">Journal</h1>
          <p className="text-gray-600">Record your thoughts and track your emotional journey.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="serenspace-card p-6 animate-fade-in delay-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BookOpen className="mr-2 text-serenspace-rose" size={20} />
                  Today's Entry
                </h2>
                <div className="flex items-center text-serenspace-sage">
                  <Calendar size={18} className="mr-1" />
                  <span className="text-sm">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="How are you feeling today? What's on your mind?"
                className="w-full min-h-[200px] p-4 border rounded-lg border-serenspace-nude focus:border-serenspace-rose focus:ring-2 focus:ring-serenspace-rose/30 outline-none transition-all duration-300"
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <label className="text-sm text-gray-600 mr-2">Mood:</label>
                  <select
                    value={currentMood || 'okay'}
                    onChange={(e) => setCurrentMood(e.target.value as JournalEntry['mood'])}
                    className="p-2 rounded border border-serenspace-nude focus:border-serenspace-rose focus:ring-2 focus:ring-serenspace-rose/30 outline-none transition-all duration-300"
                  >
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="okay">Okay</option>
                    <option value="sad">Sad</option>
                    <option value="awful">Awful</option>
                  </select>
                </div>
                
                <button
                  onClick={handleSaveEntry}
                  className="serenspace-button-primary"
                >
                  Save Entry
                </button>
              </div>
            </div>
            
            <div className="serenspace-card p-6 animate-fade-in delay-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Entries</h2>
              
              {journalEntries.length > 0 ? (
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="border-b border-serenspace-nude/50 pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          {entry.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          entry.mood === 'great' ? 'bg-pink-100 text-pink-800' :
                          entry.mood === 'good' ? 'bg-green-100 text-green-800' :
                          entry.mood === 'okay' ? 'bg-yellow-100 text-yellow-800' :
                          entry.mood === 'sad' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {entry.mood}
                        </span>
                      </div>
                      <p className="text-gray-700">{entry.content}</p>
                      <button className="mt-2 text-sm text-serenspace-rose flex items-center">
                        Read more <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">No journal entries yet. Start writing today!</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="serenspace-card p-6 animate-fade-in delay-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CheckCircle className="mr-2 text-serenspace-sage" size={20} />
                Your Progress
              </h2>
              
              <div className="space-y-4">
                <div className="bg-serenspace-nude/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-serenspace-rose-dark">{streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                
                <div className="bg-serenspace-sage/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-serenspace-sage-dark">{journalEntries.length}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-700 mb-2">Mood Trends</h3>
                  <div className="h-24 flex items-end justify-between px-2">
                    {/* Placeholder for mood chart */}
                    <div className="w-1/5 bg-pink-400 h-12 rounded-t-md"></div>
                    <div className="w-1/5 bg-green-400 h-20 rounded-t-md"></div>
                    <div className="w-1/5 bg-yellow-400 h-16 rounded-t-md"></div>
                    <div className="w-1/5 bg-orange-400 h-8 rounded-t-md"></div>
                    <div className="w-1/5 bg-red-400 h-4 rounded-t-md"></div>
                  </div>
                  <div className="flex text-xs text-gray-500 justify-between px-2 mt-1">
                    <div>Great</div>
                    <div>Good</div>
                    <div>Okay</div>
                    <div>Sad</div>
                    <div>Awful</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="serenspace-card p-6 animate-fade-in delay-400">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Journaling Tips</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Write without judgment or editing
                </li>
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Focus on your emotions and their sources
                </li>
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Try to journal at the same time each day
                </li>
                <li className="flex items-start">
                  <span className="text-serenspace-rose mr-2">•</span>
                  Include both challenges and gratitude
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;
