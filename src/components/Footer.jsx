import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <>
            {/* CTA Banner */}
            <section className="section py-20 relative overflow-hidden">
                <div className="orb w-[600px] h-[300px] bg-blue-600 top-0 left-1/2 -translate-x-1/2 opacity-20" />
                <div className="container-app px-4 text-center relative z-10">
                    <div className="glass rounded-4xl p-10 md:p-16 border border-white/10 max-w-3xl mx-auto">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Ready to farm{' '}
                            <span className="text-gradient">smarter?</span>
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto">
                            Join thousands of Indian farmers using jalSathi to save water, find subsidies, and maximize their yield — for free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate('/onboarding')} className="btn-primary text-base px-8 py-4">
                                Get Started Free →
                            </button>
                            <a href="mailto:hello@jalsathi.in" className="btn-outline text-base px-8 py-4">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-4">
                <div className="container-app">
                    <div className="grid sm:grid-cols-4 gap-8 mb-12">
                        {/* Brand */}
                        <div className="sm:col-span-2">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <Droplets size={18} className="text-white" />
                                </div>
                                <span className="font-display font-bold text-lg text-white">jal<span className="text-gradient">Sathi</span></span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Smart Irrigation & Scheme Navigator for Indian farmers. Built with ❤️ for India's Agritech ecosystem.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <p className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Product</p>
                            <ul className="space-y-2.5">
                                {['Features', 'How It Works', 'Schemes', 'Chatbot'].map(l => (
                                    <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Company</p>
                            <ul className="space-y-2.5">
                                {['About', 'Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                                    <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8 gap-4">
                        <p className="text-slate-500 text-sm">© 2025 jalSathi. All rights reserved.</p>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: <Twitter size={16} />, href: '#' },
                                { icon: <Github size={16} />, href: '#' },
                                { icon: <Mail size={16} />, href: '#' },
                            ].map((s, i) => (
                                <a key={i} href={s.href} className="w-9 h-9 glass border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
