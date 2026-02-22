import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Schemes from './components/Schemes';
import Footer from './components/Footer';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import './i18n';

// Landing Page
function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Schemes />
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}
