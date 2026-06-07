/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Send, Calculator, PhoneCall, Sparkles, AlertCircle, FileCheck } from 'lucide-react';

interface ContactProps {
  onNewInquiry: (inquiry: Inquiry) => void;
  selectedService?: Inquiry['service'];
  currency?: 'USD' | 'INR';
}

export default function Contact({ onNewInquiry, selectedService, currency = 'USD' }: ContactProps) {
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState<Inquiry['service']>('UI/UX Design');

  // Pre-select service when requested externally via CTA click
  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const [budget, setBudget] = useState<string>('$5k - $10k');

  // Reactively shift budget default values when currency shifts
  useEffect(() => {
    setBudget(currency === 'INR' ? '₹40k - ₹80k' : '$5k - $10k');
  }, [currency]);

  const [timeline, setTimeline] = useState<Inquiry['timeline']>('1-2 months');
  const [description, setDescription] = useState('');
  
  // Submit modal reception details
  const [receiptInquiry, setReceiptInquiry] = useState<Inquiry | null>(null);
  const [formError, setFormError] = useState('');

  const services: Inquiry['service'][] = [
    'Brand Identity',
    'UI/UX Design',
    'Full Web Development',
    'Audit & Redesign'
  ];

  const budgets = currency === 'INR'
    ? ['Under ₹40k', '₹40k - ₹80k', '₹80k - ₹1.5L', '₹1.5L+']
    : ['Under $5k', '$5k - $10k', '$10k - $25k', '$25k+'];

  const timelines: Inquiry['timeline'][] = [
    'Under 1 month',
    '1-2 months',
    '3+ months'
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !description) {
      setFormError('Please complete all required fields (*)');
      return;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      company: company || 'Independent Founder',
      service,
      budget,
      timeline,
      description,
      status: 'pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Callback to update App state (which syncs headers and lists)
    onNewInquiry(newInquiry);

    // Save locally for receipt viewing
    setReceiptInquiry(newInquiry);

    // Reset standard state forms
    setName('');
    setEmail('');
    setCompany('');
    setService('UI/UX Design');
    setBudget(currency === 'INR' ? '₹40k - ₹80k' : '$5k - $10k');
    setTimeline('1-2 months');
    setDescription('');
  };

  return (
    <section id="contact-section" className="py-20 md:py-28 bg-transparent text-white relative overflow-hidden">
      {/* Background Star Vector grids */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Details column */}
          <div className="lg:col-span-5 space-y-8 lg:pr-6">
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-medium tracking-widest text-blue-400 uppercase">Interactive Design Briefing</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white animate-fade-in">
                Brief Your Project Ideas
              </h2>
              <p className="text-white/70 font-sans font-light leading-relaxed">
                Skip standard dry calendar hooks. Align your features, service scopes, and budget expectations right now in our designer-first estimator form.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Calculator size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Instant Response Estimate</h3>
                  <p className="text-xs text-white/50 font-light mt-0.5">Submit details to generate an automated pricing scope and scheduling checklist directly on-screen.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-blue-400 flex items-center justify-center shrink-0">
                  <PhoneCall size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Studio Follow-Up Guarantee</h3>
                  <p className="text-xs text-white/50 font-light mt-0.5">Get a personalized Figma wireframe outline or audit summary from Nexus Lab straight to your email within 24 business hours.</p>
                </div>
              </div>
            </div>

            {/* Design Credentials banner */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-white/90">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Craft Standard Commitment</span>
              </div>
              <p className="text-[11px] text-white/60 leading-normal font-light">
                Every project runs under rigid SLA schedules: Initial wireframes in 48 hours, daily Figma iterations progress checks, and native code builds utilizing clean speed checks.
              </p>
            </div>
          </div>

          {/* Form Intake column */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center space-x-2">
              <span>Interactive Scope Configurator</span>
              <span className="text-[10px] font-mono font-normal text-white/30">v1.4</span>
            </h3>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-900 text-xs text-red-300 flex items-center space-x-2">
                <AlertCircle size={14} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-6">
              
              {/* Service selects visual grid */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Select Required Design Service *</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {services.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setService(item)}
                      className={`p-3 text-left border rounded-lg transition-all duration-200 cursor-pointer ${
                        service === item
                          ? 'border-transparent bg-gradient-to-br from-blue-400 to-purple-500 text-white font-medium shadow-md shadow-blue-500/20'
                          : 'border-white/10 bg-[#020617]/50 text-white/60 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wide opacity-50">FOR</div>
                      <div className="text-xs sm:text-sm mt-0.5 font-bold">{item}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget / Timeline row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Budget selection blocks */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Budget Tier</label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgets.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setBudget(item)}
                        className={`py-2 px-3 border rounded-lg text-xs transition-colors cursor-pointer ${
                          budget === item
                            ? 'border-transparent bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold shadow-md shadow-blue-500/20'
                            : 'border-white/10 bg-[#020617]/55 text-white/60 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline selection block */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Speed Timeline</label>
                  <div className="grid grid-cols-1 gap-2">
                    {timelines.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTimeline(item)}
                        className={`py-1.5 px-3 border rounded-lg text-xs text-left transition-colors cursor-pointer ${
                          timeline === item
                            ? 'border-transparent bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold shadow-md shadow-blue-500/20'
                            : 'border-white/10 bg-[#020617]/55 text-white/60 hover:border-white/25'
                        }`}
                      >
                        ⏱ {item}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Standard text inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Liam Gallagher" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 bg-[#020617]/55 border border-white/10 text-white rounded-lg outline-none focus:border-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Business Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="liam@startup.io" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-3 bg-[#020617]/55 border border-white/10 text-white rounded-lg outline-none focus:border-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Company / Venture Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme SaaS" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-xs p-3 bg-[#020617]/55 border border-white/10 text-white rounded-lg outline-none focus:border-white/20"
                  />
                </div>
              </div>

              {/* Project description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Project Outline Description *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell, what are the primary goals, target audiences, and special features (e.g., custom animations, stripe checkout hooks) required for your brand..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#020617]/55 border border-white/10 text-white font-sans rounded-lg outline-none focus:border-white/20 resize-y leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black hover:bg-white/95 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <Send size={12} className="text-blue-500" />
                <span>Transmit Design Briefing</span>
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* 3. DYNAMIC INTAKE ESTIMATE RECEIPT MODAL */}
      {receiptInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-center p-4">
          <div className="relative w-full max-w-xl bg-[#0c1524]/95 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 backdrop-blur-2xl">
            
            {/* Modal Heading Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
              <div className="flex items-center space-x-2">
                <FileCheck size={18} className="text-emerald-400" />
                <h3 className="font-heading text-base font-bold text-white">Brief receipt summary</h3>
              </div>
              <button
                onClick={() => setReceiptInquiry(null)}
                className="text-white/40 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Receipt Body blocks */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-heading font-medium text-lg text-white">Design Brief Logged!</h4>
                <p className="text-xs text-white/50">Briefing has been cataloged. Go back or check metric trackers.</p>
              </div>

              {/* Inquiry details metadata */}
              <div className="border border-dashed border-white/15 p-4 rounded-xl font-mono text-[11px] text-white/70 bg-white/5 space-y-3">
                <div className="flex justify-between pb-1.5 border-b border-white/10">
                  <span className="text-white/40 font-bold">TRACK_REQ_ID:</span>
                  <span className="text-white font-bold">{receiptInquiry.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Client Name:</span>
                  <span className="text-white font-bold">{receiptInquiry.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Services Requested:</span>
                  <span className="text-emerald-400 font-bold">{receiptInquiry.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Budget Range:</span>
                  <span className="text-white font-medium">{receiptInquiry.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Timeline Target:</span>
                  <span className="text-white font-medium">{receiptInquiry.timeline}</span>
                </div>
              </div>

              {/* Automated Response Outline message */}
              <div className="rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/15 space-y-2">
                <div className="flex items-center space-x-1.5 text-emerald-300">
                  <Sparkles size={13} />
                  <span className="text-xs font-mono font-bold">Estimated Next Milestone Steps</span>
                </div>
                <p className="text-[11px] text-emerald-400/90 leading-normal font-light">
                  Our system evaluates these parameters for high feasibility. An email summary containing initial wireframe templates and scheduling guidelines is ready to transition inside your Inbox within 12-24 business hours as requested.
                </p>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setReceiptInquiry(null)}
                className="px-5 py-2 hover:bg-white/10 rounded-lg border border-white/10 text-white font-medium text-xs cursor-pointer transition-colors bg-white/5"
              >
                Close Receipt Overview
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
