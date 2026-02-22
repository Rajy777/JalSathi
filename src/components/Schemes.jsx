import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ExternalLink } from 'lucide-react';

const schemes = [
    {
        name: 'PMKSY – Drip Irrigation',
        ministry: 'Ministry of Agriculture',
        badge: 'Up to 80% Subsidy',
        badgeColor: 'green',
        description: 'Per Drop More Crop initiative for micro-irrigation. Covers drip and sprinkler system installation costs for small and marginal farmers.',
        features: ['Covers 55–80% of installation cost', 'Valid for 0–5 acre landholders', 'Priority for SC/ST farmers'],
        docs: ['Aadhar Card', '7/12 Extract', 'Bank Passbook'],
        link: 'https://pmksy.gov.in/',
    },
    {
        name: 'CM Saur Krishi Vahini',
        ministry: 'Maharashtra Govt.',
        badge: '95% Solar Subsidy',
        badgeColor: 'amber',
        description: 'Chief Minister Solar Agriculture Pump Scheme to provide daytime electricity for irrigation and reduce power cut dependency.',
        features: ['3HP, 5HP, 7.5HP pump options', 'Farmer contribution just 5%', 'Works without grid power'],
        docs: ['Caste Certificate', 'Land Documents', 'Electricity Bill'],
        link: '#',
    },
    {
        name: 'Pradhan Mantri Fasal Bima',
        ministry: 'Ministry of Agriculture',
        badge: 'Crop Protection',
        badgeColor: 'blue',
        description: 'National crop insurance scheme providing financial support to farmers affected by unforeseen calamity, pests, and crop failure.',
        features: ['Premium as low as 2% of sum insured', 'Covers all food & oilseed crops', 'Direct transfer to bank account'],
        docs: ['Aadhar Card', 'Bank Account Proof', 'Land Records'],
        link: 'https://pmfby.gov.in/',
    },
];

const badgeColors = {
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10  text-blue-400  border-blue-500/20',
};

export default function Schemes() {
    const navigate = useNavigate();

    return (
        <section id="schemes" className="section bg-slate-950 relative">
            <div className="orb w-96 h-96 bg-green-600 top-0 left-0 opacity-10" />
            <div className="container-app px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="chip bg-green-500/10 text-green-400 border border-green-500/20 mb-4">Government Schemes</span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                        Never miss a{' '}
                        <span className="text-gradient">subsidy again</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        jalSathi automatically matches your profile against 30+ government schemes and shows exactly how to apply.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {schemes.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="glass rounded-3xl p-6 border border-white/10 hover:border-white/20 flex flex-col transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className={`chip border ${badgeColors[s.badgeColor]} text-xs mb-2`}>{s.badge}</span>
                                    <h3 className="font-display font-bold text-white text-lg">{s.name}</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">{s.ministry}</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-5">{s.description}</p>
                            <ul className="space-y-2 mb-6">
                                {s.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                                        <CheckCircle size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto pt-4 border-t border-white/10">
                                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Required Docs</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {s.docs.map((d, j) => (
                                        <span key={j} className="chip bg-slate-800 text-slate-400 text-[11px] px-2 py-1">{d}</span>
                                    ))}
                                </div>
                                <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors">
                                    View Official Page <ExternalLink size={12} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA inside section */}
                <div className="text-center mt-12">
                    <p className="text-slate-400 text-sm mb-4">Check all 30+ schemes matched to your profile</p>
                    <button onClick={() => navigate('/onboarding')} className="btn-primary">
                        Check My Eligibility →
                    </button>
                </div>
            </div>
        </section>
    );
}
