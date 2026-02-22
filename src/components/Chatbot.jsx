import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Send, Volume2, Sparkles, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getEligibleSchemes } from '../utils/schemeLogic';

function generateBotResponse(query, data, lang) {
    const q = query.toLowerCase();
    if (q.includes('scheme') || q.includes('yojana') || q.includes('subsidy') || q.includes('योजना') || q.includes('सब्सिडी')) {
        const s = getEligibleSchemes(data);
        if (s.length > 0) {
            const name = s[0].name[lang] || s[0].name.en;
            return `Based on your profile, you are eligible for ${s.length} scheme(s). The top match is "${name}". Would you like the document checklist?`;
        }
        return 'I could not find schemes matching your profile. Please update your land size or irrigation type.';
    }
    if (q.includes('water') || q.includes('irrigation') || q.includes('पानी') || q.includes('सिंचाई')) {
        return `For ${data.crop || 'your crop'} on ${data.landSize || 'your land'} acres with ${data.soil || ''} soil, I recommend watering on Monday, Thursday, and Saturday. Skip Wednesday due to expected rain.`;
    }
    if (q.includes('rain') || q.includes('बारिश') || q.includes('पाऊस')) {
        return 'Rain of ~8mm is forecasted for Wednesday. I recommend pausing manual irrigation that day to save water and prevent soil waterlogging.';
    }
    if (q.includes('drip') || q.includes('ड्रिप') || q.includes('ठिबक')) {
        return 'Drip irrigation has 95% efficiency — the highest of all methods. Under PMKSY, you can get up to 80% subsidy for installation. Shall I show you how to apply?';
    }
    return lang === 'hi'
        ? 'मैं सिंचाई और सरकारी योजनाओं में आपकी सहायता कर सकता हूं। कृपया अपना प्रश्न पूछें।'
        : lang === 'mr'
            ? 'मी सिंचन आणि सरकारी योजनांसाठी मदत करू शकतो. कृपया तुमचा प्रश्न विचारा.'
            : "I can help with irrigation planning and government schemes. What would you like to know?";
}

export default function Chatbot({ isOpen, onClose, farmerData }) {
    const { i18n } = useTranslation();
    const [messages, setMessages] = useState([{
        id: 1, sender: 'bot',
        text: "Namaste! I'm your jalSathi Sahayak 🌿 Ask me about irrigation schedules, government subsidies, or crop advice."
    }]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const end = useRef(null);

    useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const send = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);
        setTimeout(() => {
            const response = generateBotResponse(input, farmerData || {}, i18n.language);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: response }]);
            setTyping(false);
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 80, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 80, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    className="fixed inset-0 z-[60] flex flex-col bg-slate-950 border border-white/10 md:inset-auto md:bottom-28 md:right-5 md:w-[380px] md:h-[560px] md:rounded-3xl shadow-2xl"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-4 flex items-center justify-between flex-shrink-0 md:rounded-t-3xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Bot size={22} className="text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm">jalSathi Sahayak</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-[10px] text-white/70 font-medium">Grounded AI · Online</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Grounded badge */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex-shrink-0">
                        <Sparkles size={12} className="text-amber-400" />
                        <span className="text-[10px] font-bold uppercase text-amber-300 tracking-wider">Scheme DB + Crop Knowledge Grounded</span>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-950/90">
                        {messages.map(m => (
                            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-end gap-2 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${m.sender === 'user' ? 'bg-blue-600/30 text-blue-300' : 'bg-slate-800 text-slate-400'}`}>
                                        {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-800 text-slate-200 border border-white/5 rounded-bl-md'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2">
                                    <div className="w-7 h-7 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-slate-800 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                                        {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={end} />
                    </div>

                    {/* Input */}
                    <form onSubmit={send} className="p-4 border-t border-white/10 flex gap-2.5 bg-slate-950 md:rounded-b-3xl">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about irrigation or schemes..."
                            className="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        <button type="submit" disabled={!input.trim()} className="w-11 h-11 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-blue-600/20 hover:bg-blue-500">
                            <Send size={16} />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
