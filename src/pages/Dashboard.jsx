import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Droplets, Bell, Settings, Home, ScrollText, CloudRain, User,
    MessageCircle, Sun, Thermometer, Wind, ArrowRight, TrendingUp,
    ChevronRight, Shield, Zap, Globe, LogOut
} from 'lucide-react';
import { calculateIrrigation } from '../utils/irrigationLogic';
import { getEligibleSchemes } from '../utils/schemeLogic';
import Chatbot from '../components/Chatbot';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Dashboard() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [farmerData, setFarmerData] = useState(null);
    const [irrigation, setIrrigation] = useState(null);
    const [schemes, setSchemes] = useState([]);
    const [chatOpen, setChatOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const rain = 8; // mm forecast

    useEffect(() => {
        const saved = localStorage.getItem('farmerData');
        if (!saved) { navigate('/onboarding'); return; }
        const data = JSON.parse(saved);
        setFarmerData(data);
        setIrrigation(calculateIrrigation(data, rain));
        setSchemes(getEligibleSchemes(data));
    }, []);

    const logout = () => { localStorage.removeItem('farmerData'); navigate('/'); };

    if (!farmerData) return null;

    const irrigDays = [
        { day: 'Mon', level: 80, recommended: true },
        { day: 'Tue', level: 0, recommended: false },
        { day: 'Wed', level: 0, recommended: false, rain: true },
        { day: 'Thu', level: 75, recommended: true },
        { day: 'Fri', level: 0, recommended: false },
        { day: 'Sat', level: 70, recommended: true },
        { day: 'Sun', level: 0, recommended: false },
    ];

    const getSchemeLabel = (s) => s.name[i18n.language] || s.name.en;
    const getSchemeDesc = (s) => s.description[i18n.language] || s.description.en;

    const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

    return (
        <div className="min-h-screen bg-slate-950 max-w-md mx-auto relative pb-24">
            {/* Header */}
            <header className="glass border-b border-white/10 px-5 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Droplets size={16} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-base text-white">jal<span className="text-gradient">Sathi</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-9 h-9 glass border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors relative">
                        <Bell size={16} />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full" />
                    </button>
                    <button onClick={logout} className="w-9 h-9 glass border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <LogOut size={16} />
                    </button>
                </div>
            </header>

            <motion.div className="p-4 space-y-4" variants={stagger} initial="hidden" animate="show">
                {/* Greeting */}
                <motion.div variants={item} className="pt-2">
                    <p className="text-slate-400 text-sm">Welcome back,</p>
                    <h1 className="font-display text-2xl font-bold text-white">{farmerData.name || 'Farmer'} 👋</h1>
                </motion.div>

                {/* Weather Card */}
                <motion.div variants={item} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 p-5 text-white">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Today's Weather</p>
                                <p className="text-white/80 text-sm">{farmerData.district}</p>
                            </div>
                            <Sun size={48} className="text-yellow-300" />
                        </div>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="font-display text-5xl font-bold">32°</span>
                            <span className="text-white/70 mb-2">Partly Cloudy</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-xs font-semibold">
                            <div className="flex items-center gap-1.5"><Thermometer size={13} className="text-white/70" /> High 36°C</div>
                            <div className="flex items-center gap-1.5"><CloudRain size={13} className="text-white/70" /> Rain 8mm</div>
                            <div className="flex items-center gap-1.5"><Wind size={13} className="text-white/70" /> 12 km/h</div>
                        </div>
                    </div>
                </motion.div>

                {/* Irrigation Plan */}
                {irrigation && (
                    <motion.div variants={item} className="glass rounded-3xl border border-white/10 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Droplets className="text-blue-400" size={20} />
                                <h3 className="font-display font-bold text-white">This Week's Irrigation</h3>
                            </div>
                            <span className="chip bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]">Active Plan</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="glass rounded-2xl p-3">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Volume</p>
                                <p className="text-white font-bold text-xl mt-1">{irrigation.litersPerWeek.toLocaleString()}<span className="text-slate-400 text-xs font-normal ml-1">L</span></p>
                            </div>
                            <div className="glass rounded-2xl p-3">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Rate</p>
                                <p className="text-white font-bold text-xl mt-1">{irrigation.mmPerWeek}<span className="text-slate-400 text-xs font-normal ml-1">mm</span></p>
                            </div>
                        </div>

                        {/* Day bars */}
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {irrigDays.map((d, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="relative w-full" style={{ height: '48px' }}>
                                        <div className={`absolute bottom-0 w-full rounded-full transition-all ${d.rain ? 'bg-blue-500/20' : d.recommended ? 'bg-blue-500' : 'bg-white/5'}`} style={{ height: d.rain ? '100%' : `${d.level}%` }}>
                                            {d.rain && <CloudRain size={10} className="text-blue-400 absolute top-1 left-1/2 -translate-x-1/2" />}
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-bold ${d.recommended ? 'text-blue-400' : 'text-slate-600'}`}>{d.day}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-3 border border-blue-500/10">
                            <Bell size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-blue-200 leading-relaxed">{irrigation.advice}</p>
                        </div>
                    </motion.div>
                )}

                {/* Eligible Schemes */}
                <motion.div variants={item}>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display font-bold text-white flex items-center gap-2">
                            <Shield size={18} className="text-green-400" /> Eligible Schemes
                        </h3>
                        <span className="chip bg-green-500/10 text-green-400 border border-green-500/20 text-[11px]">{schemes.length} Found</span>
                    </div>
                    <div className="space-y-3">
                        {schemes.map((s, i) => (
                            <motion.div key={i} variants={item} className="glass rounded-3xl border border-white/10 p-5 hover:border-green-500/20 transition-all group">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="chip bg-green-500/10 text-green-400 text-[10px] uppercase">Eligible</span>
                                        </div>
                                        <h4 className="font-semibold text-white text-sm leading-tight mb-1">{getSchemeLabel(s)}</h4>
                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{getSchemeDesc(s)}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-600 group-hover:text-green-400 flex-shrink-0 mt-1 ml-2 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                        {schemes.length === 0 && (
                            <div className="glass rounded-3xl border border-white/10 p-5 text-center text-slate-400 text-sm">
                                Complete your profile to see eligible schemes.
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Quick Stats Row */}
                <motion.div variants={item} className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-3xl border border-amber-500/20 p-4">
                        <Zap size={18} className="text-amber-400 mb-2" />
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Water Saved</p>
                        <p className="text-white font-bold text-lg">~30%</p>
                    </div>
                    <div className="glass rounded-3xl border border-purple-500/20 p-4">
                        <TrendingUp size={18} className="text-purple-400 mb-2" />
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Crop</p>
                        <p className="text-white font-bold text-lg capitalize">{farmerData.crop || '—'}</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Chatbot FAB */}
            <button
                onClick={() => setChatOpen(true)}
                className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-600/40 flex items-center justify-center text-white z-50 transition-all hover:scale-110 active:scale-90"
            >
                <MessageCircle size={24} />
            </button>

            {/* Chatbot */}
            <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} farmerData={farmerData} />

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-white/10 flex items-center justify-around px-2 h-20 z-40">
                {[
                    { id: 'home', icon: <Home size={20} />, label: 'Home' },
                    { id: 'schemes', icon: <ScrollText size={20} />, label: 'Schemes' },
                    { id: 'weather', icon: <CloudRain size={20} />, label: 'Weather' },
                    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
                ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${activeTab === t.id ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
                        {t.icon}
                        <span className="text-[9px] font-bold uppercase tracking-widest">{t.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
