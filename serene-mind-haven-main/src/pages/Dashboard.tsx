
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Heart, AlertTriangle, Calendar, Award, CheckCircle } from 'lucide-react';
import NavBar from '../components/NavBar';
import MoodTracker from '../components/MoodTracker';
import { getCurrentUser } from '../utils/auth';

const Dashboard: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [userName, setUserName] = useState('');
  
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserName(user.name);
      }
    };
    
    fetchUser();
  }, []);

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Set daily inspiration quote
  useEffect(() => {
    const quotes = [
      { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
      { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
      { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
      { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", author: "Albus Dumbledore" },
      { text: "You are not alone in this journey. Every step you take is progress.", author: "SerenSpace" }
    ];
    
    // For demo purposes, select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const features = [
    {
      name: 'Chat',
      description: 'Talk with our AI companion',
      icon: MessageSquare,
      color: 'bg-serenspace-rose/10',
      iconColor: 'text-serenspace-rose-dark',
      path: '/chat'
    },
    {
      name: 'Journal',
      description: 'Record your thoughts and feelings',
      icon: BookOpen,
      color: 'bg-serenspace-sage/10',
      iconColor: 'text-serenspace-sage-dark',
      path: '/journal'
    },
    {
      name: 'Self-Care',
      description: 'Activities to nurture your wellbeing',
      icon: Heart,
      color: 'bg-serenspace-nude/10',
      iconColor: 'text-serenspace-nude-dark',
      path: '/self-care'
    },
    {
      name: 'Emergency Help',
      description: 'Get immediate support',
      icon: AlertTriangle,
      color: 'bg-red-100',
      iconColor: 'text-red-500',
      path: '/support'
    }
  ];

  return (
    <div className="min-h-screen bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-serenspace-rose/20 to-serenspace-sage/20 rounded-xl p-6 mb-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {greeting}, {userName || 'there'}
              </h1>
              <p className="text-gray-600 mt-1">How are you feeling today?</p>
            </div>
            <MoodTracker />
          </div>
        </div>
        
        {/* Daily Inspiration */}
        <div className="mb-8 animate-fade-in delay-100">
          <div className="serenspace-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-serenspace-rose/10 to-serenspace-sage/10 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Daily Inspiration</h2>
              <blockquote className="text-lg text-gray-700 italic">"{quote.text}"</blockquote>
              <cite className="text-sm text-gray-500 mt-2 block">— {quote.author}</cite>
            </div>
          </div>
        </div>
        
        {/* Quick Access Features */}
        <div className="mb-8 animate-fade-in delay-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.path}
                className="serenspace-card p-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-3`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-medium text-gray-800">{feature.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Progress Dashboard */}
        <div className="animate-fade-in delay-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress</h2>
          <div className="serenspace-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center p-4 bg-serenspace-rose/10 rounded-lg">
                <div className="p-3 rounded-full bg-serenspace-rose text-white mr-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Current Streak</h3>
                  <p className="text-2xl font-bold text-serenspace-rose-dark">3 days</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-serenspace-sage/10 rounded-lg">
                <div className="p-3 rounded-full bg-serenspace-sage text-white mr-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Journal Entries</h3>
                  <p className="text-2xl font-bold text-serenspace-sage-dark">12 total</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-serenspace-nude/10 rounded-lg">
                <div className="p-3 rounded-full bg-serenspace-nude text-white mr-4">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Badges Earned</h3>
                  <p className="text-2xl font-bold text-serenspace-nude-dark">2 badges</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-serenspace-rose mr-2"></div>
                  <p>You completed a journaling session yesterday</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-serenspace-sage mr-2"></div>
                  <p>You earned the "Consistency" badge for 3 day streak</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-serenspace-nude mr-2"></div>
                  <p>You had a 15-minute chat with the AI companion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
