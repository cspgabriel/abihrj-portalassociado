
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Olá! Sou a IA do HoteisRio. Como posso ajudar com seus benefícios hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Usuário' : 'IA'}: ${m.text}`);
    const responseText = await sendChatMessage(history, userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl mb-4 w-80 sm:w-96 flex flex-col border border-gray-100 overflow-hidden animate-fade-in-up" style={{ maxHeight: '600px', height: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-rio-blue to-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles className="w-4 h-4 text-rio-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Assistente HoteisRio</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online agora
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-rio-blue text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-rio-blue" />
                  <span className="text-xs text-gray-500">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-rio-blue focus-within:ring-1 focus-within:ring-rio-blue transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pergunte sobre os benefícios..."
                className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
                disabled={loading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="text-rio-blue hover:text-blue-700 disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button - Added ID for Tutorial */}
      <button
        id="ai-assistant-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300 bg-rio-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center group relative`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-0 top-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rio-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rio-gold"></span>
        </span>
      </button>
    </div>
  );
};

export default AiAssistant;
