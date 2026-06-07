/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  CheckCheck,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'client' | 'agent';
  text: string;
  timestamp: string;
}

const QUICK_REPLIES = [
  { text: 'How much does a project cost?', key: 'pricing' },
  { text: 'How long does a website take to build?', key: 'timeline' },
  { text: 'What is your custom tech stack?', key: 'tech' },
  { text: 'How can I book a service right now?', key: 'booking' }
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBubbleRef = useRef<HTMLDivElement>(null);

  // Initialize and load chat history from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexus_lab_chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (err) {
        console.warn('Stale chat cache discarded:', err);
      }
    }

    // Default welcome messages if none saved
    const initialWelcome: ChatMessage[] = [
      {
        id: 'welcome-1',
        sender: 'agent',
        text: "Hi there! Welcome to Nexus Lab. 🚀\nI'm your interactive Studio Architect. Are you looking to design a web platform, create high-converting SaaS interfaces, or establish an elite brand identity?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 'welcome-2',
        sender: 'agent',
        text: "Feel free to ask me any quick questions, or choose one of the options below to get instant information before submitting your portfolio inquiry form!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(initialWelcome);
    localStorage.setItem('nexus_lab_chat_messages', JSON.stringify(initialWelcome));
    
    // Show a floating badge indicator for unread welcome message if the window is closed
    const hasSeenChat = localStorage.getItem('nexus_lab_chat_seen');
    if (!hasSeenChat) {
      setHasUnread(true);
    }
  }, []);

  // Sync messages with LocalStorage
  const saveMessagesToStorage = (updatedMessages: ChatMessage[]) => {
    localStorage.setItem('nexus_lab_chat_messages', JSON.stringify(updatedMessages));
  };

  // Keep scroll focused on the newest messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Open chat window and clear unread badge
  const toggleChat = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setHasUnread(false);
      localStorage.setItem('nexus_lab_chat_seen', 'true');
    }
  };

  // Clear chat conversation
  const handleClearHistory = () => {
    const defaultWelcome: ChatMessage[] = [
      {
        id: 'welcome-reset',
        sender: 'agent',
        text: "Conversation history cleared. I'm ready to answer any new questions! Ask away.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(defaultWelcome);
    saveMessagesToStorage(defaultWelcome);
  };

  // Select quick inquiry service and scroll to the respective section
  const handleActionClick = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = element.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      const offsetPosition = elPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Generate automated reply responses based on query
  const getAutomatedReply = (text: string): string => {
    const query = text.toLowerCase();

    // 1. Pricing questions
    if (
      query.includes('price') || 
      query.includes('pricing') || 
      query.includes('cost') || 
      query.includes('budget') || 
      query.includes('rate') || 
      query.includes('rates') || 
      query.includes('how much') || 
      query.includes('charge')
    ) {
      return "We follow a highly transparent, flat-rate pricing model across three core packages:\n\n• **Brand Identity Blueprint**: $499 (5-7 Days)\n• **Elite Figma UI/UX Design**: $999 (7-10 Days)\n• **Full-Stack Web System**: $1,999 (10-15 Days)\n\nYou can inspect our full breakdown and features in the **Services** section of our landing page. Would you like me to scroll you down there?";
    }

    // 2. Timeline questions
    if (
      query.includes('time') || 
      query.includes('duration') || 
      query.includes('timeline') || 
      query.includes('how long') || 
      query.includes('days') || 
      query.includes('weeks') || 
      query.includes('schedule')
    ) {
      return "Speed is one of our primary core values! ⚡ Here are our standard delivery windows:\n\n• **Brand Assets**: 5-7 business days\n• **Figma UI/UX Layouts**: 7-10 business days\n• **Complete React / Full-Stack Site**: 10-15 business days\n\nWe provide active daily Figma previews and intermediate milestone reviews. Let us know in your inquiry sheet if you have an express launch deadline!";
    }

    // 3. Tech stack inquiries
    if (
      query.includes('tech') || 
      query.includes('technology') || 
      query.includes('stack') || 
      query.includes('framework') || 
      query.includes('react') || 
      query.includes('nextjs') || 
      query.includes('typescript') || 
      query.includes('tailwind') || 
      query.includes('code')
    ) {
      return "We are custom-coding purists! To ensure stunning performance, SEO value, and robust responsiveness, we construct websites entirely from scratch using:\n\n• **React 18+ & Vite** for interactive frontend architectures\n• **TypeScript** for strict type safety and bug-free execution\n• **Tailwind CSS** for responsive utility-oriented layouts\n• **Motion** for buttery soft layout transition flow\n\nWe do not use bloated visual builders or slow plugins, so your project gets perfect scores on Google Lighthouse!";
    }

    // 4. Booking and Hire requests
    if (
      query.includes('book') || 
      query.includes('booking') || 
      query.includes('contact') || 
      query.includes('hire') || 
      query.includes('inquiry') || 
      query.includes('start') || 
      query.includes('commence') || 
      query.includes('ready')
    ) {
      return "Amazing! Connecting with us is incredibly straightforward:\n\n1️⃣ Fill out our short **Project Scoping Inquiry** form at the bottom of this page.\n2️⃣ Select your preferred project budget and timeline.\n3️⃣ Our team will review your scope and follow up within 12-24 business hours containing a free initial wireframe outline draft.\n\nWould you like me to scroll you straight to the Inquiry form to submit now?";
    }

    // 5. Greetings
    if (
      query.includes('hello') || 
      query.includes('hi') || 
      query.includes('hey') || 
      query.includes('greetings')
    ) {
      return "Hello! Great to have you visiting Nexus Lab. 😊 How can we assist you today? Let me know if you are researching our design rates, checking build timelines, or curious about custom development!";
    }

    // 6. Gratitude
    if (
      query.includes('thanks') || 
      query.includes('thank you') || 
      query.includes('cool') || 
      query.includes('awesome') || 
      query.includes('perfect') || 
      query.includes('great')
    ) {
      return "You are very welcome! We are committed to doing pristine, world-class work for elite clients. Whenever you are ready, fill out our inquiry details or reserve a virtual slot. We can't wait to work with you!";
    }

    // 7. Fallback response
    return "That sounds like an exceptional project brief! 🚀 At Nexus Lab, we specialize in transforming that exact tier of professional design ideas into pixel-perfect custom software. \n\nI highly recommend sharing those details in our **Scoping Inquiry Form** below. We will analyze your specifications and send you a personalized Google Meet roadmap invite within 12 hours!";
  };

  // Handle sending message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Create client message
    const clientMsg: ChatMessage = {
      id: `client-${Date.now()}`,
      sender: 'client',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, clientMsg];
    setMessages(updatedMessages);
    saveMessagesToStorage(updatedMessages);
    setInputValue('');

    // Trigger Typing animation preview followed by response delay
    setIsTyping(true);
    const typingDelay = 1200 + Math.random() * 600; // Realistic delay

    setTimeout(() => {
      const responseText = getAutomatedReply(text);
      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const newMessagesList = [...updatedMessages, agentMsg];
      setMessages(newMessagesList);
      saveMessagesToStorage(newMessagesList);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom Right Corner */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"
        id="nexus-chat-trigger-container"
      >
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-600/90 text-white text-[11px] font-medium px-3 py-1.5 rounded-full mb-2.5 shadow-lg shadow-blue-500/20 backdrop-blur-sm pointer-events-auto flex items-center space-x-1 border border-blue-400/20"
            >
              <Sparkles size={11} className="text-amber-300 animate-pulse" />
              <span>Have a quick question? Ask here!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleChat}
          aria-label="Toggle live chat"
          className="pointer-events-auto relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-blue-500/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 group cursor-pointer"
        >
          {isOpen ? (
            <X size={22} className="text-white transition-transform duration-300 transform rotate-95" />
          ) : (
            <div className="relative">
              <MessageSquare size={22} className="text-white transition-transform duration-300" />
              {hasUnread && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#020617] flex items-center justify-center text-[8px] font-bold">
                  !
                </span>
              )}
            </div>
          )}

          {/* Active Status Ring */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse" />
        </button>
      </div>

      {/* Floating Chat Workspace Canvas Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[410px] h-[550px] max-h-[80vh] bg-slate-950/95 border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col backdrop-blur-xl overflow-hidden shadow-blue-500/5 select-none"
            id="nexus-floating-chat-widget"
          >
            {/* Header segment with Online Status and Options */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950/50 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-mono text-xs font-bold text-white shadow-inner">
                  N
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white tracking-wide uppercase flex items-center space-x-1.5">
                    <span>Nexus Studio Desk</span>
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-white/40 font-mono font-light mt-0.5">Pre-Sales Architect Agent</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Clear chat history */}
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation history"
                  className="p-1.5 rounded-lg text-white/30 hover:bg-white/5 hover:text-rose-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                {/* Minimize button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/30 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Minimize2 size={14} />
                </button>
              </div>
            </div>

            {/* Conversation Flow Feed Panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-normal scrollbar-thin select-text">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'client' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.sender === 'agent' && (
                      <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                        <Bot size={12} />
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <div
                        className={`text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'client'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none shadow-md'
                            : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                        
                        {/* Dynamic actions inside automated agent responses to boost UX conversions */}
                        {msg.sender === 'agent' && msg.text.includes('Services') && (
                          <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleActionClick('services-section')}
                              className="text-[10px] text-blue-400 font-mono flex items-center space-x-1 border border-blue-400/20 px-2 py-1 rounded bg-blue-400/5 hover:bg-blue-400/10 transition-colors outline-none cursor-pointer"
                            >
                              <span>Explore Packages</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        )}

                        {msg.sender === 'agent' && msg.text.includes('Inquiry') && (
                          <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleActionClick('contact-section')}
                              className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1 border border-emerald-400/20 px-2 py-1 rounded bg-emerald-400/5 hover:bg-emerald-400/10 transition-colors outline-none cursor-pointer"
                            >
                              <span>Go to Inquiry Form</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className={`text-[9px] font-mono text-white/30 mt-1 flex items-center space-x-1 ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'client' && <CheckCheck size={10} className="text-blue-400" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing simulation view */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                      <Bot size={12} />
                    </div>
                    <div>
                      <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Anchor target to keep in block view layout */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies chips lists (shows only if typing or no typing activity handles visual space cleanly) */}
            {!isTyping && (
              <div className="px-4 pb-3 pt-1 border-t border-white/5 bg-slate-950/20">
                <p className="text-[9px] font-mono text-white/30 mb-2 uppercase tracking-wide">Quick Question Triggers:</p>
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x whitespace-nowrap">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.key}
                      onClick={() => handleSendMessage(reply.text)}
                      className="inline-flex snap-start text-[10px] text-white/70 bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-blue-400/5 px-2.5 py-1.5 rounded-lg transition-all outline-none cursor-pointer text-ellipsis overflow-hidden font-normal"
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual user typing input controls */}
            <div className="p-3.5 bg-slate-950 border-t border-white/10 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your design question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow text-xs p-2.5 border border-white/10 rounded-xl outline-none focus:border-blue-500 bg-[#020617] text-white transition-all font-light"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 shadow-md ${
                  inputValue.trim()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer hover:scale-105 active:scale-95'
                    : 'bg-white/5 text-white/20'
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
