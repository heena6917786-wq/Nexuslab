/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, CheckCircle2, ArrowRight, Calendar, Clock, 
  HelpCircle, Laptop, Landmark, ShieldCheck, Mail, ChevronRight 
} from 'lucide-react';
import { Inquiry } from '../types';

interface ServicesProps {
  onSelectServiceAndScroll: (service: Inquiry['service']) => void;
  onScrollToPortfolio: () => void;
  currency: 'USD' | 'INR';
  onCurrencyChange: (currency: 'USD' | 'INR') => void;
  currencySource: 'detecting' | 'auto-ip' | 'auto-timezone' | 'manual';
}

interface ServicePackage {
  id: string;
  name: string;
  category: Inquiry['service'];
  tagline: string;
  targetAudience: string;
  usdOneTimePrice: string;
  usdMonthlyPrice: string;
  inrOneTimePrice: string;
  inrMonthlyPrice: string;
  badge?: string;
  deliverables: string[];
  timeline: string;
}

export default function Services({ 
  onSelectServiceAndScroll, 
  onScrollToPortfolio,
  currency,
  onCurrencyChange,
  currencySource
}: ServicesProps) {
  const [billingCycle, setBillingCycle] = useState<'flat' | 'retainer'>('flat');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Custom Scheduler Modal state
  const [showBookerModal, setShowBookerModal] = useState(false);
  const [selectedPackForBooking, setSelectedPackForBooking] = useState<string>('UI/UX Design');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [bookerName, setBookerName] = useState('');
  const [bookerEmail, setBookerEmail] = useState('');
  const [bookingReceipt, setBookingReceipt] = useState<any | null>(null);
  
  const packages: ServicePackage[] = [
    {
      id: 'brand-identity',
      name: 'Brand Identity Launch',
      category: 'Brand Identity',
      tagline: 'Establish visual credibility and investor authority.',
      targetAudience: 'Pre-seed startups & growing freelance creators.',
      usdOneTimePrice: '$499',
      usdMonthlyPrice: '$199/mo',
      inrOneTimePrice: '₹14,999',
      inrMonthlyPrice: '₹5,999/mo',
      badge: 'Identity Suite',
      timeline: '2 weeks',
      deliverables: [
        'Signature color spectrum & design theme specs',
        '3 tailored logo families (SVG, web, vector assets)',
        'Modern type scale pairings (Space Grotesk & Inter)',
        'Full digital style deck outlining design systems'
      ]
    },
    {
      id: 'ui-ux-design',
      name: 'UI/UX Design Prototype',
      category: 'UI/UX Design',
      tagline: 'High-fidelity wireframes mapped to high user conversions.',
      targetAudience: 'Series A SaaS founders & micro-SaaS platforms.',
      usdOneTimePrice: '$999',
      usdMonthlyPrice: '$399/mo',
      inrOneTimePrice: '₹34,999',
      inrMonthlyPrice: '₹11,999/mo',
      badge: 'Best Value',
      timeline: '3-4 weeks',
      deliverables: [
        'Full desktop + mobile responsive layout systems',
        'Clickable interactive Figma wireframe master prototype',
        'Grid alignments and motion transition rules',
        'High-fidelity assets optimized for developer hand-off'
      ]
    },
    {
      id: 'full-web-dev',
      name: 'Full Web Development',
      category: 'Full Web Development',
      tagline: 'Bespoke custom-coded systems with elite speed scores.',
      targetAudience: 'B2B tech companies & luxury product catalogs.',
      usdOneTimePrice: '$1,999',
      usdMonthlyPrice: '$799/mo',
      inrOneTimePrice: '₹64,999',
      inrMonthlyPrice: '₹24,999/mo',
      badge: 'Elite Systems',
      timeline: '5-6 weeks',
      deliverables: [
        'Custom interactive SPA built with React, Vite & Tailwind CSS',
        'Stateful components, local caching & SEO optimization',
        'Fluid motion/react layout animations',
        '30-day dedicated post-launch maintenance SLA guidance'
      ]
    },
    {
      id: 'audit-redesign',
      name: 'Audit & Speed Redesign',
      category: 'Audit & Redesign',
      tagline: 'Unclutter components and double checkout performance.',
      targetAudience: 'Active brands wanting immediate bounce reduction.',
      usdOneTimePrice: '$699',
      usdMonthlyPrice: '$249/mo',
      inrOneTimePrice: '₹21,999',
      inrMonthlyPrice: '₹8,499/mo',
      badge: 'Speed Boost',
      timeline: '1-2 weeks',
      deliverables: [
        'Full UX audits highlighting design and layout friction',
        'Conversion optimizations & landing page flow cleanup',
        'Asset compression and bundle footprint analysis',
        'Speed blueprint optimizing PageSpeed metrics past 95+'
      ]
    }
  ];

  // Load future dates for scheduling
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  useEffect(() => {
    const dates: string[] = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      // Skip Sundays
      if (nextDate.getDay() !== 0) {
        dates.push(nextDate.toLocaleDateString('en-US', options));
      }
    }
    setAvailableDates(dates);
    if (dates.length > 0) setSelectedDate(dates[0]);
  }, []);

  const timeSlots = ['09:30 AM UTC', '11:00 AM UTC', '01:30 PM UTC', '03:00 PM UTC', '04:30 PM UTC'];

  const triggerBooker = (categoryName: Inquiry['service']) => {
    setSelectedPackForBooking(categoryName);
    setSelectedTimeSlot(timeSlots[0]);
    setShowBookerModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookerName || !bookerEmail) return;

    const receipt = {
      bookingId: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
      name: bookerName,
      email: bookerEmail,
      service: selectedPackForBooking,
      date: selectedDate,
      time: selectedTimeSlot,
      created: new Date().toLocaleDateString('en-US')
    };

    // Save Booking list in LocalStorage
    const savedBookings = localStorage.getItem('nexus_lab_bookings');
    let list = [];
    if (savedBookings) {
      try {
        list = JSON.parse(savedBookings);
      } catch (err) {}
    }
    list.push(receipt);
    localStorage.setItem('nexus_lab_bookings', JSON.stringify(list));

    setBookingReceipt(receipt);
    
    // Reset states
    setBookerName('');
    setBookerEmail('');
  };

  return (
    <section id="services-section" className="py-20 md:py-28 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Header Title with pricing switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-blue-400 uppercase">Interactive Service Matrix</div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Premium Web Packages
            </h2>
            <p className="text-white/70 font-sans font-light text-sm sm:text-base leading-relaxed">
              Transparent specifications tailored for ambitious tech founders. No opaque agency margin layers, just highly efficient design blueprints paired with swift, compliant implementation.
            </p>
          </div>

          {/* Currency + Billing Cycle Toggles */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 select-none shrink-0 font-mono">
            
            {/* Geolocation Region Indicator Badge */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                Region: <strong className="text-blue-400 uppercase">{currency === 'INR' ? '🇮🇳 India (INR)' : '🇺🇸 Global (USD)'}</strong>
                <span className="text-white/35 ml-1">({currencySource})</span>
              </span>
            </div>

            {/* Currency selector toggle */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => onCurrencyChange('INR')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-emerald-500 text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                INR (₹)
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => setBillingCycle('flat')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  billingCycle === 'flat' 
                    ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Flat-rate
              </button>
              <button
                onClick={() => setBillingCycle('retainer')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  billingCycle === 'retainer' 
                    ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg) => {
            const isHovered = hoveredCard === pkg.id;
            const price = currency === 'INR'
              ? (billingCycle === 'flat' ? pkg.inrOneTimePrice : pkg.inrMonthlyPrice)
              : (billingCycle === 'flat' ? pkg.usdOneTimePrice : pkg.usdMonthlyPrice);

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-white/5 border backdrop-blur-md rounded-2xl p-6 md:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 overflow-hidden ${
                  isHovered ? 'border-white/20 bg-white/10 -translate-y-1' : 'border-white/10'
                }`}
              >
                {/* Accent glow on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none -mr-10 -mt-10 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-widest">
                      {pkg.badge || 'Package'}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{pkg.timeline}</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-white tracking-tight">{pkg.name}</h3>
                    <p className="text-white/60 text-xs font-light mt-1.5 leading-normal">{pkg.tagline}</p>
                  </div>

                  {/* Pricing Placement */}
                  <div className="py-2.5 border-y border-white/10 flex items-baseline space-x-1">
                    <span className="text-2xl font-bold bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                      {price}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      {billingCycle === 'flat' ? 'Flat rate' : 'Subscription'}
                    </span>
                  </div>

                  {/* Target Audience */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 text-[11px] text-white/75 leading-relaxed">
                    <span className="font-mono text-[9px] text-blue-400 font-bold block uppercase tracking-wide mb-0.5">Ideal For</span>
                    {pkg.targetAudience}
                  </div>

                  {/* Checklist of deliverables */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block">Deliverables</span>
                    <ul className="space-y-2 block">
                      {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[11px] leading-relaxed text-white/80">
                          <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions Group - 2 Prominent CTA buttons per card */}
                <div className="pt-2 space-y-2 relative z-10">
                  <button
                    onClick={() => onSelectServiceAndScroll(pkg.category)}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/15 text-white hover:from-blue-500/15 hover:to-purple-500/15 hover:border-white/25 text-xs font-mono font-bold tracking-wide uppercase transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight size={11} className="text-blue-400" />
                  </button>
                  <button
                    onClick={() => triggerBooker(pkg.category)}
                    className="w-full py-2 rounded-lg bg-white text-black hover:bg-white/90 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Section Block */}
        <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-30 -mb-30" />

          <div className="space-y-2 max-w-lg text-center md:text-left relative z-10">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded text-[9px] font-mono uppercase tracking-widest">
              <Sparkles size={9} />
              <span>Free Consultation SLA</span>
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight">
              Unsure which model perfectly fits?
            </h3>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
              Let's evaluate your interface speed objectives together. Select a custom slot on my booking board or view completed cases below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10 shrink-0">
            <button
              onClick={() => onSelectServiceAndScroll('UI/UX Design')}
              className="px-5 py-3 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-mono font-bold tracking-widest uppercase cursor-pointer text-center"
            >
              Brief Us Online
            </button>
            <button
              onClick={() => triggerBooker('UI/UX Design')}
              className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono font-bold tracking-widest uppercase cursor-pointer text-center"
            >
              Book Studio Call
            </button>
            <button
              onClick={onScrollToPortfolio}
              className="px-5 py-3 rounded-lg bg-transparent text-white/50 hover:text-white text-xs font-mono tracking-widest uppercase cursor-pointer text-center flex items-center justify-center space-x-1"
            >
              <span>View Portfolio</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

      </div>

      {/* Appointment Booker Drawer Modal */}
      <AnimatePresence>
        {showBookerModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-[#0c1524]/95 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col backdrop-blur-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-blue-400" />
                  <h3 className="font-heading text-base font-bold text-white">Book Studio Design Call</h3>
                </div>
                <button
                  onClick={() => {
                    setShowBookerModal(false);
                    setBookingReceipt(null);
                  }}
                  className="text-white/40 hover:text-white text-sm font-bold cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
                {bookingReceipt ? (
                  // CONFIRMED TICKET RECEIPT
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="text-center space-y-2">
                      <div className="h-12 w-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ✓
                      </div>
                      <h4 className="font-heading font-medium text-lg text-white">Consultation Logged!</h4>
                      <p className="text-xs text-white/50">Your calendar slot has been registered. Here is your confirmed digital ticket.</p>
                    </div>

                    {/* Receipt block */}
                    <div className="border border-dashed border-white/15 p-5 rounded-xl font-mono text-xs text-white/70 bg-white/5 space-y-3.5 relative overflow-hidden">
                      {/* Left and right ticket notches */}
                      <div className="absolute top-1/2 -left-2.5 w-5 h-5 bg-[#0c1524] border border-white/10 rounded-full" />
                      <div className="absolute top-1/2 -right-2.5 w-5 h-5 bg-[#0c1524] border border-white/10 rounded-full" />

                      <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                        <span className="text-white/40 font-bold uppercase tracking-wider">Appointment Pass</span>
                        <span className="text-blue-400 font-bold">{bookingReceipt.bookingId}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Client Name</span>
                          <span className="text-white font-medium">{bookingReceipt.name}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase font-mono">Contact Email</span>
                          <span className="text-white font-medium truncate block">{bookingReceipt.email}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Selected Service</span>
                          <span className="text-emerald-400 font-medium block truncate">{bookingReceipt.service}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Date & Period</span>
                          <span className="text-amber-400 font-medium font-mono">{bookingReceipt.date}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/30">
                        <span>EST. CALENDAR SYNC ID</span>
                        <span>STATUS: ACTIVE CAL_BLOCKED</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-blue-500/10 p-4 border border-blue-500/15 space-y-1.5 text-center">
                      <div className="text-xs font-mono font-bold text-blue-300 flex items-center justify-center space-x-1.5">
                        <Clock size={12} fill="currentColor" className="text-blue-400" />
                        <span>Confirmed Slot: {bookingReceipt.time}</span>
                      </div>
                      <p className="text-[10px] text-white/50 leading-normal">
                        Our Nexus Lab design team will review your project requirements and email a Google Meet calendar invite with an initial design deck outline within 12 hours.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowBookerModal(false);
                        setBookingReceipt(null);
                      }}
                      className="w-full py-2.5 rounded-lg bg-white text-black hover:bg-white/95 text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  // CONFIG BOOKER FORM
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-white/70 flex items-start space-x-2.5">
                      <Clock size={14} className="text-blue-404 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">Briefing Schedule Policy:</span>
                        Consultation blocks are booked for 15-minute quick aligns. This provides instant alignment on budgets, delivery targets, and Figma styles before generating contract proposals.
                      </div>
                    </div>

                    {/* Pre-selected service selection inside modal */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Selected Service Tier</label>
                      <select
                        value={selectedPackForBooking}
                        onChange={(e) => setSelectedPackForBooking(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#020617]/70 border border-white/10 rounded-lg text-white font-mono outline-none focus:border-white/20"
                      >
                        <option value="Brand Identity">
                          Brand Identity Launch ({currency === 'INR' ? '₹5,999/mo or ₹14,999 Flat' : '$199/mo or $499 Flat'})
                        </option>
                        <option value="UI/UX Design">
                          UI/UX Design Prototype ({currency === 'INR' ? '₹11,999/mo or ₹34,999 Flat' : '$399/mo or $999 Flat'})
                        </option>
                        <option value="Full Web Development">
                          Full Web Development System ({currency === 'INR' ? '₹24,999/mo or ₹64,999 Flat' : '$799/mo or $1,999 Flat'})
                        </option>
                        <option value="Audit & Redesign">
                          Audit & Speed Redesign ({currency === 'INR' ? '₹8,499/mo or ₹21,999 Flat' : '$249/mo or $699 Flat'})
                        </option>
                      </select>
                    </div>

                    {/* Date select slot list */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Select Available Work Date</label>
                      <div className="flex flex-wrap gap-1.5">
                        {availableDates.map((dateString) => {
                          const isSelected = selectedDate === dateString;
                          return (
                            <button
                              key={dateString}
                              type="button"
                              onClick={() => setSelectedDate(dateString)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors cursor-pointer border ${
                                isSelected 
                                  ? 'bg-blue-500 border-transparent text-white font-bold' 
                                  : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 focus:border-white/25'
                              }`}
                            >
                              {dateString}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Slot Selectors */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Select 15-min Time Slot (GMT+0 / UTC)</label>
                      <div className="flex flex-wrap gap-1.5">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-colors cursor-pointer border ${
                                isSelected 
                                  ? 'bg-purple-500 border-transparent text-white font-bold' 
                                  : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                            >
                              ⏱ {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Booker Details inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={bookerName}
                          onChange={(e) => setBookerName(e.target.value)}
                          className="w-full text-xs p-3 bg-[#020617]/55 border border-white/10 text-white rounded-lg outline-none focus:border-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-mono">Work Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="email@company.com"
                          value={bookerEmail}
                          onChange={(e) => setBookerEmail(e.target.value)}
                          className="w-full text-xs p-3 bg-[#020617]/55 border border-white/10 text-white rounded-lg outline-none focus:border-white/20"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-br from-blue-400 to-purple-500 text-white hover:opacity-95 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <span>Secure Consultation Slot</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowBookerModal(false);
                    setBookingReceipt(null);
                  }}
                  className="px-4 py-2 hover:bg-white/10 rounded-lg border border-white/10 text-white text-xs cursor-pointer transition-colors bg-white/5 font-mono text-[10px] tracking-wider uppercase"
                >
                  Close Booker Workspace
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
