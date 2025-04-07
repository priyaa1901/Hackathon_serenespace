
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, BookOpen, Heart, HelpCircle, Menu, X, User } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Journal', path: '/journal', icon: BookOpen },
    { name: 'Self-Care', path: '/self-care', icon: Heart },
    { name: 'Support', path: '/support', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-serenspace-nude/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-serenspace-rose to-serenspace-sage flex items-center justify-center mr-2 animate-breathe">
                  <span className="text-white font-semibold">S</span>
                </div>
                <span className="text-xl font-semibold text-gray-800">SerenSpace</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium smooth-transition ${
                  isActive(item.path)
                    ? 'bg-serenspace-rose/10 text-serenspace-rose-dark'
                    : 'text-gray-600 hover:bg-serenspace-nude/10 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link 
              to="/profile" 
              className="p-2 rounded-full text-gray-600 hover:bg-serenspace-nude/10 hover:text-gray-800 smooth-transition"
            >
              <User size={20} />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-serenspace-nude/10 hover:text-gray-800 smooth-transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium smooth-transition ${
                  isActive(item.path)
                    ? 'bg-serenspace-rose/10 text-serenspace-rose-dark'
                    : 'text-gray-600 hover:bg-serenspace-nude/10 hover:text-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-serenspace-nude/10 hover:text-gray-800 smooth-transition"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span>Profile</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
