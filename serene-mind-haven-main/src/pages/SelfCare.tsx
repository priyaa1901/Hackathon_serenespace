
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Heart, Clock, ThumbsUp, ThumbsDown, Music, Activity, Coffee, Map, Award } from 'lucide-react';
import { toast } from 'sonner';

interface SelfCareActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'mindfulness' | 'physical' | 'creative' | 'social' | 'relaxation';
  completed?: boolean;
}

const SelfCare: React.FC = () => {
  const [activities, setActivities] = useState<SelfCareActivity[]>([
    {
      id: '1',
      title: 'Breathing Exercise',
      description: 'Practice deep breathing for 5 minutes to reduce stress and improve focus.',
      duration: '5 min',
      category: 'mindfulness'
    },
    {
      id: '2',
      title: 'Gentle Stretching',
      description: 'Do some gentle stretches to release tension in your body.',
      duration: '10 min',
      category: 'physical'
    },
    {
      id: '3',
      title: 'Gratitude Journaling',
      description: 'Write down three things you are grateful for today.',
      duration: '5 min',
      category: 'creative'
    },
    {
      id: '4',
      title: 'Listen to Calming Music',
      description: 'Take a break and listen to some soothing music.',
      duration: '15 min',
      category: 'relaxation'
    },
    {
      id: '5',
      title: 'Call a Friend',
      description: 'Reach out to someone you care about for a quick chat.',
      duration: '20 min',
      category: 'social'
    }
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [currentActivity, setCurrentActivity] = useState<SelfCareActivity | null>(null);

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === filter);

  const handleCompleteActivity = (id: string) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === id 
          ? { ...activity, completed: true } 
          : activity
      )
    );
    
    toast("Activity Completed!", {
      description: "Great job taking care of yourself.",
    });
  };

  const handleActivityFeedback = (liked: boolean) => {
    if (currentActivity) {
      toast(liked ? "Glad you enjoyed it!" : "Thanks for your feedback", {
        description: liked 
          ? "We'll recommend similar activities in the future." 
          : "We'll adjust our recommendations based on your feedback.",
      });
      setCurrentActivity(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800">Self-Care Activities</h1>
          <p className="text-gray-600">Take some time for yourself with these wellbeing-boosting activities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="serenspace-card p-4 animate-fade-in delay-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Heart className="mr-2 text-serenspace-rose" size={20} />
                  Activities for You
                </h2>
                
                <div className="flex space-x-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1 rounded border border-serenspace-nude focus:border-serenspace-rose focus:ring-2 focus:ring-serenspace-rose/30 outline-none transition-all duration-300 text-sm"
                  >
                    <option value="all">All Activities</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="physical">Physical</option>
                    <option value="creative">Creative</option>
                    <option value="social">Social</option>
                    <option value="relaxation">Relaxation</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`border rounded-lg p-4 transition-all ${
                        activity.completed 
                          ? 'bg-serenspace-sage/10 border-serenspace-sage/30' 
                          : 'bg-white border-serenspace-nude/30 hover:border-serenspace-rose/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{activity.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                          
                          <div className="flex items-center mt-3 space-x-3 text-xs">
                            <span className="flex items-center text-gray-500">
                              <Clock size={14} className="mr-1" />
                              {activity.duration}
                            </span>
                            
                            <span className={`px-2 py-0.5 rounded-full ${
                              activity.category === 'mindfulness' ? 'bg-purple-100 text-purple-800' :
                              activity.category === 'physical' ? 'bg-blue-100 text-blue-800' :
                              activity.category === 'creative' ? 'bg-yellow-100 text-yellow-800' :
                              activity.category === 'social' ? 'bg-pink-100 text-pink-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {activity.category}
                            </span>
                          </div>
                        </div>
                        
                        {activity.completed ? (
                          <div className="bg-serenspace-sage text-white p-2 rounded-full">
                            <Award size={16} />
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              handleCompleteActivity(activity.id);
                              setCurrentActivity(activity);
                            }}
                            className="px-3 py-1 text-sm bg-serenspace-rose text-white rounded-full hover:bg-serenspace-rose-dark transition-colors"
                          >
                            Start Activity
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No activities found for this category.</p>
                    <button 
                      onClick={() => setFilter('all')}
                      className="mt-2 text-serenspace-rose hover:underline"
                    >
                      View all activities
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {currentActivity && (
              <div className="serenspace-card p-6 animate-scale-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How was this activity?</h2>
                <p className="text-gray-600 mb-6">Your feedback helps us recommend better activities for you.</p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleActivityFeedback(true)}
                    className="flex items-center px-4 py-2 bg-serenspace-sage text-white rounded-full hover:bg-serenspace-sage-dark transition-colors"
                  >
                    <ThumbsUp size={18} className="mr-2" />
                    I liked it
                  </button>
                  
                  <button
                    onClick={() => handleActivityFeedback(false)}
                    className="flex items-center px-4 py-2 bg-serenspace-nude text-gray-800 rounded-full hover:bg-serenspace-nude-dark transition-colors"
                  >
                    <ThumbsDown size={18} className="mr-2" />
                    Not for me
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="serenspace-card p-6 animate-fade-in delay-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-serenspace-rose/10 rounded-lg hover:bg-serenspace-rose/20 transition-colors">
                  <Music className="text-serenspace-rose mb-2" size={24} />
                  <span className="text-sm text-gray-700">Calm Sounds</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 bg-serenspace-sage/10 rounded-lg hover:bg-serenspace-sage/20 transition-colors">
                  <Activity className="text-serenspace-sage mb-2" size={24} />
                  <span className="text-sm text-gray-700">Breathing</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 bg-serenspace-nude/10 rounded-lg hover:bg-serenspace-nude/20 transition-colors">
                  <Coffee className="text-serenspace-nude-dark mb-2" size={24} />
                  <span className="text-sm text-gray-700">Calm Places</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 bg-serenspace-rose/10 rounded-lg hover:bg-serenspace-rose/20 transition-colors">
                  <Map className="text-serenspace-rose mb-2" size={24} />
                  <span className="text-sm text-gray-700">Find Help</span>
                </button>
              </div>
            </div>
            
            <div className="serenspace-card p-6 animate-fade-in delay-400">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Self-Care Streaks</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Daily Activities</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div 
                        key={day} 
                        className={`w-4 h-4 rounded-full ${
                          day <= 3 ? 'bg-serenspace-rose' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mindfulness</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div 
                        key={day} 
                        className={`w-4 h-4 rounded-full ${
                          day <= 5 ? 'bg-serenspace-sage' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Physical</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div 
                        key={day} 
                        className={`w-4 h-4 rounded-full ${
                          day <= 2 ? 'bg-serenspace-nude-dark' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className="mt-4 w-full py-2 text-sm text-serenspace-rose border border-serenspace-rose/30 rounded-lg hover:bg-serenspace-rose/5 transition-colors">
                View All Stats
              </button>
            </div>
            
            <div className="serenspace-card p-6 animate-fade-in delay-500">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Daily Quote</h2>
              <blockquote className="text-gray-700 italic border-l-4 border-serenspace-rose pl-4 py-2">
                "Self-care is not selfish. You cannot serve from an empty vessel."
              </blockquote>
              <p className="text-right text-sm text-gray-500 mt-2">— Eleanor Brown</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelfCare;
