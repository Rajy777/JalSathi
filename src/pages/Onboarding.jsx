import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, User, MapPin, Sprout, ChevronRight, ChevronLeft, Droplets, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const crops = [{ v: 'cotton', e: 'Cotton', h: 'कपास', m: 'कापूस' }, { v: 'wheat', e: 'Wheat', h: 'गेहूं', m: 'गहू' }, { v: 'rice', e: 'Rice', h: 'चावल', m: 'तांदूळ' }, { v: 'sugarcane', e: 'Sugarcane', h: 'गन्ना', m: 'ऊस' }];
const soils = [{ v: 'black', e: 'Black Soil', h: 'काली मिट्टी', m: 'काळी माती' }, { v: 'red', e: 'Red Soil', h: 'लाल मिट्टी', m: 'लाल माती' }, { v: 'sandy', e: 'Sandy Soil', h: 'बलुई मिट्टी', m: 'वाळूची माती' }];
const irrigations = [{ v: 'drip', e: 'Drip', h: 'ड्रिप', m: 'ठिबक' }, { v: 'sprinkler', e: 'Sprinkler', h: 'स्प्रिंकलर', m: 'तुषार' }, { v: 'flood', e: 'Flood', h: 'बाढ़', m: 'पूर सिंचन' }];

const labels = {
    en: { welcome: 'Welcome to jalSathi', tag: 'Choose your language to get started', next: 'Continue', back: 'Back', finish: 'Go to Dashboard', name: 'Your Name', district: 'District', crop: 'Crop', soil: 'Soil Type', land: 'Land Size (acres)', irrig: 'Irrigation Type', step2title: 'Your Farm Profile', step3title: 'Land & Irrigation' },
    hi: { welcome: 'जलसाथी में आपका स्वागत है', tag: 'शुरू करने के लिए भाषा चुनें', next: 'जारी रखें', back: 'वापस', finish: 'डैशबोर्ड पर जाएं', name: 'आपका नाम', district: 'जिला', crop: 'फसल', soil: 'मिट्टी का प्रकार', land: 'भूमि आकार (एकड़)', irrig: 'सिंचाई का प्रकार', step2title: 'आपका खेत प्रोफाइल', step3title: 'भूमि और सिंचाई' },
    mr: { welcome: 'जलसाथीमध्ये आपले स्वागत आहे', tag: 'सुरू करण्यासाठी भाषा निवडा', next: 'पुढे', back: 'मागे', finish: 'डॅशबोर्डवर जा', name: 'तुमचे नाव', district: 'जिल्हा', crop: 'पीक', soil: 'मातीचा प्रकार', land: 'जमीन (एकड)', irrig: 'सिंचनाचा प्रकार', step2title: 'तुमचे शेत प्रोफाइल', step3title: 'जमीन आणि सिंचन' },
};

export default function Onboarding() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', district: '', crop: '', soil: '', landSize: '', irrigation: '' });
    const lang = labels[i18n.language] || labels.en;
    const getLabel = (item) => i18n.language === 'hi' ? item.h : i18n.language === 'mr' ? item.m : item.e;

    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);

    const finish = (e) => {
        e.preventDefault();
        localStorage.setItem('farmerData', JSON.stringify({ ...form, language: i18n.language }));
        navigate('/dashboard');
    };

    const slide = {
        enter: { x: 60, opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
        exit: { x: -60, opacity: 0, transition: { duration: 0.2 } },
    };

    const langs = [
        { code: 'en', label: 'English', script: 'English' },
        { code: 'hi', label: 'Hindi', script: 'हिन्दी' },
        { code: 'mr', label: 'Marathi', script: 'मराठी' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
            <div className="orb w-96 h-96 bg-blue-600 top-0 left-1/2 -translate-x-1/2 opacity-20" />

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-10 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-sm">
                    <Droplets size={20} className="text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">jal<span className="text-gradient">Sathi</span></span>
            </div>

            {/* Card */}
            <div className="w-full max-w-md relative z-10">
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map(s => (
                        <React.Fragment key={s}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-500'}`}>
                                {step > s ? <Check size={14} /> : s}
                            </div>
                            {s < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-blue-600' : 'bg-white/10'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                <div className="glass rounded-4xl border border-white/10 overflow-hidden">
                    <div className="p-8">
                        <AnimatePresence mode="wait">
                            {/* STEP 1 — Language */}
                            {step === 1 && (
                                <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit">
                                    <div className="mb-6">
                                        <Globe className="text-blue-400 mb-3" size={28} />
                                        <h2 className="font-display text-2xl font-bold text-white">{lang.welcome}</h2>
                                        <p className="text-slate-400 text-sm mt-1">{lang.tag}</p>
                                    </div>
                                    <div className="grid gap-3">
                                        {langs.map(l => (
                                            <button
                                                key={l.code}
                                                onClick={() => i18n.changeLanguage(l.code)}
                                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${i18n.language === l.code ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 glass hover:border-white/25'}`}
                                            >
                                                <div>
                                                    <div className="font-semibold text-white">{l.script}</div>
                                                    <div className="text-xs text-slate-400">{l.label}</div>
                                                </div>
                                                {i18n.language === l.code && <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={next} className="btn-primary w-full mt-8 justify-center">{lang.next} <ChevronRight size={18} /></button>
                                </motion.div>
                            )}

                            {/* STEP 2 — Profile */}
                            {step === 2 && (
                                <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit">
                                    <div className="mb-6">
                                        <User className="text-blue-400 mb-3" size={28} />
                                        <h2 className="font-display text-2xl font-bold text-white">{lang.step2title}</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{lang.name}</label>
                                            <input className="input" placeholder="e.g. Ramesh Patil" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{lang.district}</label>
                                            <input className="input" placeholder="e.g. Amravati" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{lang.crop}</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {crops.map(c => (
                                                    <button key={c.v} onClick={() => setForm({ ...form, crop: c.v })} className={`p-3 rounded-2xl border text-sm font-medium transition-all ${form.crop === c.v ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-white/10 glass text-slate-300 hover:border-white/25'}`}>
                                                        {getLabel(c)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-8">
                                        <button onClick={back} className="btn-outline flex-1 justify-center"><ChevronLeft size={16} /> {lang.back}</button>
                                        <button onClick={next} className="btn-primary flex-[2] justify-center">{lang.next} <ChevronRight size={18} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 — Land */}
                            {step === 3 && (
                                <motion.div key="s3" variants={slide} initial="enter" animate="center" exit="exit">
                                    <div className="mb-6">
                                        <Sprout className="text-green-400 mb-3" size={28} />
                                        <h2 className="font-display text-2xl font-bold text-white">{lang.step3title}</h2>
                                    </div>
                                    <form onSubmit={finish} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{lang.soil}</label>
                                            <div className="grid gap-2">
                                                {soils.map(s => (
                                                    <button type="button" key={s.v} onClick={() => setForm({ ...form, soil: s.v })} className={`p-3 rounded-2xl border text-sm font-medium text-left transition-all ${form.soil === s.v ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-white/10 glass text-slate-300 hover:border-white/25'}`}>
                                                        {getLabel(s)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{lang.land}</label>
                                            <input className="input" type="number" step="0.1" placeholder="e.g. 1.5" value={form.landSize} onChange={e => setForm({ ...form, landSize: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{lang.irrig}</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {irrigations.map(ir => (
                                                    <button type="button" key={ir.v} onClick={() => setForm({ ...form, irrigation: ir.v })} className={`p-3 rounded-2xl border text-sm font-medium transition-all ${form.irrigation === ir.v ? 'border-blue-500 bg-blue-500/10 text-blue-300' : 'border-white/10 glass text-slate-300 hover:border-white/25'}`}>
                                                        {getLabel(ir)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <button type="button" onClick={back} className="btn-outline flex-1 justify-center"><ChevronLeft size={16} /></button>
                                            <button type="submit" className="btn-primary flex-[2] justify-center">{lang.finish} →</button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
