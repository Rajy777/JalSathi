import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, BarChart2, ScrollText, MessageCircle } from 'lucide-react';

const steps = [
    {
        num: '01',
        icon: <UserCircle size={24} />,
        title: 'Create Your Profile',
        desc: 'Tell jalSathi about your crop, soil type, land size, irrigation method, and district in just 2 minutes.',
        color: 'blue',
    },
    {
        num: '02',
        icon: <BarChart2 size={24} />,
        title: 'Get Your Irrigation Plan',
        desc: 'Our rule-based engine calculates exactly how many liters you need this week, adjusted for rain and soil type.',
        color: 'cyan',
    },
    {
        num: '03',
        icon: <ScrollText size={24} />,
        title: 'See Eligible Schemes',
        desc: 'Instantly see which government subsidies like PMKSY you qualify for, with full application guides.',
        color: 'green',
    },
    {
        num: '04',
        icon: <MessageCircle size={24} />,
        title: 'Chat with Your AI Sahayak',
        desc: 'Ask anything — crop advice, subsidy details, or weather tips — in Hindi, Marathi, or English.',
        color: 'purple',
    },
];

const colorMap = {
    blue: { accent: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', line: 'bg-blue-500/30' },
    cyan: { accent: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', line: 'bg-cyan-500/30' },
    green: { accent: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', line: 'bg-green-500/30' },
    purple: { accent: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', line: 'bg-purple-500/30' },
};

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section relative bg-slate-950">
            <div className="orb w-96 h-96 bg-indigo-600 bottom-0 right-0 opacity-10" />
            <div className="container-app px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="chip bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">How It Works</span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                        From <span className="text-gradient">signup to savings</span>
                        <br />in minutes
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Designed for simplicity. No technical knowledge needed — just real guidance in your language.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-4 gap-6">
                    {/* Connector line on desktop */}
                    <div className="hidden md:block absolute top-[76px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/0 via-slate-700 to-purple-500/0" />

                    {steps.map((s, i) => {
                        const c = colorMap[s.color];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                {/* Icon circle */}
                                <div className="flex justify-center mb-5">
                                    <div className={`relative w-16 h-16 ${c.bg} border ${c.border} rounded-3xl flex items-center justify-center ${c.accent}`}>
                                        {s.icon}
                                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-950 border border-slate-700 rounded-full text-[10px] font-bold text-slate-400 flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="font-display font-bold text-white text-lg mb-2">{s.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
