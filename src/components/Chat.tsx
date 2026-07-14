import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const presetPrompts = [
  "Generate crowd rerouting plan",
  "Translate emergency protocol",
  "Predict post-match transit bottlenecks"
];

interface Message {
  id: string;
  role: string;
  content: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 'msg-0',
    role: 'assistant',
    content: 'OpsGPT active. Venue: MetLife Stadium. Real-time telemetry synced. How can I assist with operations today?',
    time: '18:00'
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: `msg-${Date.now()}-user`, role: 'user', content: text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Build API messages format
      const apiMessages = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })).concat([{ role: 'user', parts: [{ text }] }]);

      // Use direct Netlify function URL in production to avoid rewrite routing issues
      const endpoint = import.meta.env.PROD ? '/.netlify/functions/chat' : '/api/chat';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        let errorMsg = `Server returned HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch (e) {
          const errorText = await response.text();
          if (errorText) errorMsg = errorText;
        }
        console.error("Backend Error:", response.status, errorMsg);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-model`,
        role: 'assistant',
        content: data.text || (data.error ? `Server Error: ${data.error}` : 'Error: No response from model.'),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: `System Error: Failed to reach OpsGPT backend. (${err.message || 'Check console'}) Please make sure your GEMINI_API_KEY is added in Netlify Environment Variables.`,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-sm font-semibold text-white leading-none">OpsGPT Decision Support</h2>
            <span className="text-[10px] text-gray-500 font-mono">LLM-04-TURBO // RAG SYNCED</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">Online</span>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {msg.role === 'assistant' ? <Terminal className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-lg text-sm whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none ${
                  msg.role === 'assistant' 
                    ? 'bg-gray-900 border border-gray-800 text-gray-200 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <span className="text-[10px] text-gray-500 mt-1 font-mono">{msg.time}</span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                 <Terminal className="w-4 h-4" />
               </div>
               <div className="bg-gray-900 border border-gray-800 p-3 rounded-lg flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
             </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-[#0c0c0c] shrink-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {presetPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {prompt}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Query telemetry, generate protocols..."
            className="w-full bg-black border border-gray-800 rounded-lg pl-4 pr-12 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
