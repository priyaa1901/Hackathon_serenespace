
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hi there! I'm your supportive companion. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    // In a real app, this would connect to an AI service
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('sad') || lowerCaseMessage.includes('depressed') || lowerCaseMessage.includes('unhappy')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to try a quick breathing exercise or would you prefer to talk about what's troubling you?";
    } else if (lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('nervous') || lowerCaseMessage.includes('stressed')) {
      return "I notice you're feeling anxious. Let's take a moment together. Try taking a few deep breaths - in for 4 counts, hold for 2, and out for 6. Would you like me to guide you through a grounding exercise?";
    } else if (lowerCaseMessage.includes('happy') || lowerCaseMessage.includes('good') || lowerCaseMessage.includes('great')) {
      return "I'm so glad to hear you're feeling good! What's contributing to your positive mood today? Recognizing these factors can help us build on them.";
    } else if (lowerCaseMessage.includes('tired') || lowerCaseMessage.includes('exhausted') || lowerCaseMessage.includes('sleepy')) {
      return "Being tired can really affect how we feel. Have you been getting enough rest lately? Sometimes small adjustments to our sleep routine can make a big difference.";
    } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('emergency')) {
      return "If you're in crisis or need immediate help, please reach out to a crisis helpline or emergency services. Would you like me to provide some resources that could help?";
    } else if (userMessage.length < 10) {
      return "I'd love to hear more about that. Could you tell me a bit more so I can better understand what you're experiencing?";
    } else {
      return "Thank you for sharing that with me. I'm here to support you. How else can I help you today?";
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: generateBotResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleRecording = () => {
    // In a real app, this would use the Speech Recognition API
    setIsRecording(!isRecording);
    if (isRecording) {
      setInput("I'm feeling a bit anxious today.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-serenspace-rose text-white'
                  : 'bg-serenspace-sage-light text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-serenspace-sage-light text-gray-800 px-4 py-3 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-serenspace-sage rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-serenspace-sage rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-serenspace-sage rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-serenspace-nude/20 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="serenspace-input flex-1"
          />
          <button
            onClick={toggleRecording}
            className={`ml-2 p-3 rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-serenspace-nude'
            } text-white transition-colors`}
          >
            {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className="ml-2 p-3 rounded-full bg-serenspace-rose text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
