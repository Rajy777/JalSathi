import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Shield, MessageCircle, CloudRain, Zap, Globe } from 'lucide-react';

const features = [
    {
        icon: <Droplets size={26} />,
        color: 'blue',
        title: 'Smart Irrigation Engine',
        description: 'Precision irrigation schedules based on crop type, soil, land size, and real-time rain forecasts. Never over or under-water again.',
        bullets: ['Crop-specific water requirements', 'Soil retention adjustments', 'Rain-adjusted recommendations'],
    },
    {
        icon: <Shield size={26} />,
        color: 'green',
        title: 'Scheme Eligibility Finder',
        description: 'Instantly discover which government subsidies and schemes you qualify for, with step-by-step application guides.',
        bullets: ['PMKSY, CM Solar Pump & more', 'Eligibility auto-matching', 'Document checklist included'],
    },
    {
        icon: <MessageCircle size={26} />,
        color: 'purple',
        title: 'AI-Powered Chatbot',
        description: 'Ask questions in Hindi, Marathi or English. The chatbot is grounded in real scheme and irrigation data — no hallucinations.',
        bullets: ['Scheme application guidance', 'Irrigation advice on demand', 'Multilingual responses'],
    },
    {
        icon: <CloudRain size={26} />,
        color: 'cyan',
        title: 'Weather Alert System',
        description: 'Get proactive alerts when rain is forecast, temperatures spike, or application deadlines are near.',
        bullets: ['OpenWeather integration', 'Rain-based irrigation pause', 'Scheme deadline reminders'],
    },
    {
        icon: <Globe size={26} />,
        color: 'amber',
        title: 'Fully Multilingual',
        description: 'Built from the ground up to support English, Hindi and Marathi — without any translation API costs or delays.',
        bullets: ['Static JSON locales', 'Instant language switching', 'Onboarding in native language'],
    },
    {
        icon: <Zap size={26} />,
        color: 'rose',
        title: 'PWA — No Install Needed',
        description: 'Works perfectly on any low-end Android phone. Load under 3 seconds, offline support, and zero app store friction.',
        bullets: ['Works on 2G/3G networks', 'Offline mode ready', 'Installable on home screen'],
    },
];

const colorMap = {
    blue: { bg: 'bg-blue-500/10', icon: 'text-blue-400', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40' },
    green: { bg: 'bg-green-500/10', icon: 'text-green-400', border: 'border-green-500/20', hover: 'hover:border-green-500/40' },
    purple: { bg: 'bg-purple-500/10', icon: 'text-purple-400', border: 'border-purple-500/20', hover: 'hover:border-purple-500/40' },
    cyan: { bg: 'bg-cyan-500/10', icon: 'text-cyan-400', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/40' },
    amber: { bg: 'bg-amber-500/10', icon: 'text-amber-400', border: 'border-amber-500/20', hover: 'hover:border-amber-500/40' },
    rose: { bg: 'bg-rose-500/10', icon: 'text-rose-400', border: 'border-rose-500/20', hover: 'hover:border-rose-500/40' },
};

const card = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
    return (
        <section id="features" className="section bg-slate-950">
            <div className="container-app px-4">
                {/* Label */}
                <div className="text-center mb-16">
                    <span className="chip bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">Core Features</span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                        Everything a farmer needs,<br />
                        <span className="text-gradient">in one place</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        No more complex government portals or language barriers. jalSathi makes modern agri-tech accessible for every Indian farmer.
                    </p>
                </div>

                {/* Feature Grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                >
                    {features.map((f, i) => {
                        const c = colorMap[f.color];
                        return (
                            <motion.div key={i} variants={card} className={`glass rounded-3xl p-6 border ${c.border} ${c.hover} transition-all duration-300 group`}>
                                <div className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center ${c.icon} mb-5 group-hover:scale-110 transition-transform`}>
                                    {f.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.description}</p>
                                <ul className="space-y-1.5">
                                    {f.bullets.map((b, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
                                            <span className={`w-1.5 h-1.5 rounded-full ${c.bg} ${c.icon} flex-shrink-0`} style={{ backgroundColor: 'currentColor' }} />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
