import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { generateWorkoutAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Coach Sam. Ask me about our Aerobics classes, Gym memberships, or general fitness tips!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await generateWorkoutAdvice(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-sanctum-orange text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Interface Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 z-50 flex h-[600px] w-[90vw] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-sanctum-dark shadow-2xl backdrop-blur-xl md:bottom-8 md:right-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative h-2 w-2 rounded-full bg-sanctum-orange">
                    <div className="absolute inset-0 animate-ping rounded-full bg-sanctum-orange opacity-75"></div>
                </div>
                <h3 className="font-display text-lg font-bold tracking-wider text-white">COACH SAM</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20">
              <div className="flex flex-col gap-6">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg p-4 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-white text-black font-medium' 
                          : 'bg-sanctum-orange/10 text-white/90 border border-sanctum-orange/30'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-sanctum-orange" />
                      <span className="text-xs text-white/50 uppercase tracking-widest">Typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-black/80 p-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Coach Sam..."
                  className="w-full rounded-xl bg-white/10 py-4 pl-4 pr-12 text-sm text-white placeholder-white/30 outline-none transition-all focus:bg-white/15 focus:ring-1 focus:ring-sanctum-orange/50"
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 rounded-lg p-2 text-sanctum-orange hover:bg-sanctum-orange/20 disabled:opacity-50 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICoach;