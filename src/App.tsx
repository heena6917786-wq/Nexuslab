/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import ClientDashboard from './components/ClientDashboard';
import LiveChat from './components/LiveChat';
import { Inquiry, Testimonial } from './types';
import { initialTestimonials } from './data';
import { Sparkles, Terminal, FileText, Compass, Send } from 'lucide-react';

export default function App() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portalOpen, setPortalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Inquiry['service'] | undefined>(undefined);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [currencySource, setCurrencySource] = useState<'detecting' | 'auto-ip' | 'auto-timezone' | 'manual'>('detecting');

  // Unified automatic timezone & IP geolocation detection
  useEffect(() => {
    // 1. First priority: Check manual persistent toggle override
    const cachedOverride = localStorage.getItem('user_selected_currency');
    if (cachedOverride === 'USD' || cachedOverride === 'INR') {
      setCurrency(cachedOverride);
      setCurrencySource('manual');
      return;
    }

    // 2. High-speed local timezone & languague heuristics (zero latency layout shift)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndianTimezone = tz && (tz === 'Asia/Kolkata' || tz.includes('Calcutta') || tz.includes('Asia/Colombo'));
    const isIndianLang = navigator.languages && navigator.languages.some(lang => lang.toLowerCase().includes('in') || lang.toLowerCase().includes('en-in'));
    
    if (isIndianTimezone || isIndianLang) {
      setCurrency('INR');
      setCurrencySource('auto-timezone');
    } else {
      setCurrency('USD');
      setCurrencySource('auto-timezone');
    }

    // 3. Robust async IP-based Geolocation accuracy check
    const checkIpLocation = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await res.json();
        
        if (data && data.country_code) {
          if (data.country_code === 'IN') {
            setCurrency('INR');
            setCurrencySource('auto-ip');
          } else {
            setCurrency('USD');
            setCurrencySource('auto-ip');
          }
        }
      } catch (err) {
        console.log("Primary geo lookup bypassed, layout preserved with timezone fallback:", err);
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);
          const res = await fetch('https://freeipapi.com/api/json', { signal: controller.signal });
          clearTimeout(timeoutId);
          const data = await res.json();
          if (data && data.countryCode) {
            if (data.countryCode === 'IN') {
              setCurrency('INR');
              setCurrencySource('auto-ip');
            } else {
              setCurrency('USD');
              setCurrencySource('auto-ip');
            }
          }
        } catch (e2) {
          console.log("All geolocation API handshakes complete, preserved timezone fallback.");
        }
      }
    };

    checkIpLocation();
  }, []);

  const handleCurrencyChange = (newCurrency: 'USD' | 'INR') => {
    setCurrency(newCurrency);
    setCurrencySource('manual');
    localStorage.setItem('user_selected_currency', newCurrency);
  };

  // Initialize unified persistent metrics safely on load
  useEffect(() => {
    // 1. Load inquiries
    const savedInquiries = localStorage.getItem('nexus_lab_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        setInquiries([]);
      }
    } else {
      setInquiries([]);
    }

    // 2. Load Testimonials
    const savedReviews = localStorage.getItem('nexus_lab_testimonials');
    if (savedReviews) {
      try {
        setTestimonials(JSON.parse(savedReviews));
      } catch (e) {
        setTestimonials(initialTestimonials);
      }
    } else {
      setTestimonials(initialTestimonials);
    }
  }, []);

  const handleNewInquiry = (inq: Inquiry) => {
    const updated = [inq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('nexus_lab_inquiries', JSON.stringify(updated));
  };

  const handleUpdateInquiryStatus = (id: string, nextStatus: Inquiry['status']) => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: nextStatus };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('nexus_lab_inquiries', JSON.stringify(updated));
  };

  const handleClearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem('nexus_lab_inquiries');
  };

  const scrollToContactSection = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      const offsetPosition = elPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToPortfolioSection = () => {
    const el = document.getElementById('portfolio-section');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      const offsetPosition = elPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectServiceAndScroll = (service: Inquiry['service']) => {
    setSelectedService(service);
    scrollToContactSection();
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white/90 selection:bg-white/20 selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Background radial soft ambient lights / glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/15 rounded-full blur-[120px] md:blur-[160px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/15 rounded-full blur-[120px] md:blur-[160px]" />
        <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[35%] left-[-15%] w-[45vw] h-[45vw] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Absolute Floating Navigation Header */}
      <Header 
        onOpenPortal={() => setPortalOpen(true)} 
        inquiryCount={inquiries.filter(i => i.status === 'pending').length} 
      />

      <main className="flex-grow relative z-10">
        
        {/* Hero Landing viewport */}
        <Hero 
          onStartProject={() => handleSelectServiceAndScroll('UI/UX Design')} 
          onExploreWork={scrollToPortfolioSection} 
        />

        {/* Portfolio Section Case Studies with Blueprint controls */}
        <Portfolio />

        {/* Services Section with Interactive Packages and CTAs */}
        <Services 
          onSelectServiceAndScroll={handleSelectServiceAndScroll}
          onScrollToPortfolio={scrollToPortfolioSection}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          currencySource={currencySource}
        />

        {/* Design insights logs blog articles */}
        <Blog />

        {/* Client validation boards */}
        <Testimonials />

        {/* Multi-step Intake scoping brief forms */}
        <Contact 
          onNewInquiry={handleNewInquiry} 
          selectedService={selectedService} 
          currency={currency}
        />

      </main>

      {/* Primary humbler, aesthetic page credit footer */}
      <footer className="relative z-10 bg-white/5 border-t border-white/10 backdrop-blur-md text-white/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Branding details */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-mono text-xs font-bold shadow-lg">
                N
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white/90 tracking-widest uppercase">NEXUS LAB STUDIO</div>
                <div className="text-[10px] font-mono font-light text-white/30 mt-0.5">EST. 2026 // GRID-PERFECT WEB SYSTEMS</div>
              </div>
            </div>

            {/* Quick action back office console shortcut */}
            <p className="text-xs font-mono font-light text-white/40 max-w-sm text-center md:text-right">
              Explore our responsive metrics and inquiries from the{' '}
              <button
                onClick={() => setPortalOpen(true)}
                className="text-blue-400 hover:text-blue-300 font-medium underline inline-flex items-center space-x-1 cursor-pointer"
              >
                <span>Studio Desk Console</span>
              </button>{' '}
              at any time.
            </p>

            {/* Copyright notes */}
            <div className="text-xs font-mono text-white/30">
              © {new Date().getFullYear()} Nexus Lab Co. All rights reserved.
            </div>

          </div>
        </div>
      </footer>

      {/* 4. CLINIQUE STATUS BOARD ADMIN DRAWER OVERLAY */}
      {portalOpen && (
        <ClientDashboard
          onClose={() => setPortalOpen(false)}
          inquiries={inquiries}
          testimonials={testimonials}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onClearInquiries={handleClearInquiries}
        />
      )}

      {/* Floating Interactive pre-sales Live Chat Widget */}
      <LiveChat />

    </div>
  );
}
