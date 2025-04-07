
import React from 'react';
import NavBar from '../components/NavBar';
import ChatBot from '../components/ChatBot';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800">AI Companion</h1>
          <p className="text-gray-600">Chat with your supportive AI companion about how you're feeling.</p>
        </div>
        
        <div className="flex-1 serenspace-card overflow-hidden flex flex-col animate-fade-in delay-100">
          <ChatBot />
        </div>
      </main>
    </div>
  );
};

export default Chat;
