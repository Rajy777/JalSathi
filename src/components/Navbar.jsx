import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Droplets, Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
    const { i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const langs = [
        { code: 'en', label: 'English', native: 'English' },
        { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
        { code: 'mr', label: 'Marathi', native: 'मराठी' },
    ];

    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#schemes', label: 'Schemes' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/10' : ''}`}>
            <div className="container-app flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-sm">
                        <Droplets size={18} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-lg text-white tracking-tight">
                        jal<span className="text-gradient">Sathi</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(l => (
                        <a key={l.href} href={l.href} className="btn-ghost">{l.label}</a>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* Language Picker */}
                    <div className="relative">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="btn-ghost gap-1.5 text-slate-400 hover:text-white"
                        >
                            <Globe size={16} />
                            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                                {i18n.language?.toUpperCase()}
                            </span>
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 mt-2 glass rounded-2xl p-1.5 border border-white/10 shadow-xl min-w-[130px]">
                                {langs.map(l => (
                                    <button
                                        key={l.code}
                                        onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${i18n.language === l.code ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
                                    >
                                        {l.native}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={() => navigate('/onboarding')} className="btn-primary text-xs px-5 py-2.5 hidden sm:flex">
                        Get Started →
                    </button>

                    {/* Mobile Menu */}
                    <button className="md:hidden btn-ghost p-2" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden glass border-t border-white/10 px-4 py-4 space-y-1">
                    {navLinks.map(l => (
                        <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="btn-ghost block w-full text-left">{l.label}</a>
                    ))}
                    <button onClick={() => { navigate('/onboarding'); setMenuOpen(false); }} className="btn-primary w-full mt-3 justify-center text-sm">
                        Get Started →
                    </button>
                </div>
            )}
        </header>
    );
}
