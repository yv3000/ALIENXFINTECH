
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAlien } from '../services/geminiService';
import { Bot, User, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'alien';
  text: string;
}

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'alien', text: 'GREETINGS, HUMAN. I AM ALIENX. HOW ARE YOUR FINANCES?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await sendMessageToAlien(userMsg);
      setMessages(prev => [...prev, { role: 'alien', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'alien', text: "SYSTEM_ERROR: CONNECTION_LOST." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-alien-800 border-l border-alien-700">
      <div className="p-4 border-b border-alien-700 flex items-center bg-alien-900/50">
        <Bot className="text-alien-500 mr-2" />
        <h3 className="font-mono font-bold text-white">ALIEN_AGENT_V1</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              m.role === 'user' 
                ? 'bg-alien-700 text-white rounded-tr-none' 
                : 'bg-alien-900/80 border border-alien-500/30 text-alien-100 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-alien-900/80 border border-alien-500/30 p-3 rounded-lg rounded-tl-none">
              <Sparkles size={16} className="text-alien-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-alien-700 bg-alien-900">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 bg-alien-800 border border-alien-700 rounded p-2 text-white focus:border-alien-500 outline-none text-sm font-mono"
            placeholder="Ask about your balance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-alien-500 hover:bg-alien-400 text-alien-900 p-2 rounded transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
