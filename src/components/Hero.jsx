import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Shield, Zap, Globe } from 'lucide-react';

const stats = [
    { value: '2M+', label: 'Farmers Assisted' },
    { value: '30+', label: 'Govt. Schemes' },
    { value: '3', label: 'Languages' },
    { value: '87%', label: 'Water Saved' },
];

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 noise">
            {/* Background Orbs */}
            <div className="orb w-[600px] h-[600px] bg-blue-600 top-[-20%] left-[50%] translate-x-[-50%]" />
            <div className="orb w-[400px] h-[400px] bg-cyan-500 top-[30%] right-[-10%] opacity-15" />
            <div className="orb w-[400px] h-[400px] bg-indigo-600 bottom-[-10%] left-[-5%] opacity-15" />

            {/* Hero Content */}
            <div className="container-app text-center relative z-10 px-4">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-blue-500/30 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">AI-Powered Smart Irrigation</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] text-white mb-6"
                >
                    Smart Irrigation for{' '}
                    <span className="text-gradient">Every Farmer</span>
                </motion.h1>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
                >
                    jalSathi combines precision irrigation scheduling, government scheme matching, and AI-powered advisory — in Hindi, Marathi & English — designed for India's farmers.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <button onClick={() => navigate('/onboarding')} className="btn-primary text-base px-8 py-4 glow">
                        Start for Free <ArrowRight size={20} />
                    </button>
                    <a href="#how-it-works" className="btn-outline text-base px-8 py-4">
                        See How It Works
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                >
                    {stats.map((s, i) => (
                        <div key={i} className="glass rounded-3xl p-5 text-center border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="text-3xl font-display font-bold text-white mb-1">{s.value}</div>
                            <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Floating Card Preview */}
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="container-app relative z-10 px-4 mt-20"
            >
                <div className="glass rounded-4xl p-2 border border-white/10 shadow-2xl max-w-4xl mx-auto">
                    <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 grid sm:grid-cols-3 gap-4">
                        {[
                            { icon: <Droplets className="text-blue-400" size={28} />, title: 'Irrigation Plan', desc: '32,450 L needed this week', sub: 'Cotton • 1.5 acres', color: 'blue' },
                            { icon: <Shield className="text-green-400" size={28} />, title: 'Eligible Scheme', desc: 'PMKSY Drip Subsidy', sub: '80% subsidy available', color: 'green' },
                            { icon: <Zap className="text-amber-400" size={28} />, title: 'Smart Alert', desc: 'Postpone irrigation Wed', sub: 'Rain expected 22mm', color: 'amber' },
                        ].map((c, i) => (
                            <div key={i} className={`glass rounded-3xl p-5 border border-${c.color}-500/20 hover:border-${c.color}-500/40 transition-all`}>
                                <div className={`w-12 h-12 rounded-2xl bg-${c.color}-500/10 flex items-center justify-center mb-4`}>
                                    {c.icon}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{c.title}</div>
                                <div className="text-white font-semibold text-lg leading-tight mb-1">{c.desc}</div>
                                <div className="text-xs text-slate-400">{c.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
