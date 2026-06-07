/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialTestimonials } from '../data';
import { Testimonial } from '../types';
import { Quote, Star, UserPlus, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  // Testimonial Form Input elements
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientReview, setClientReview] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize reviews state
  useEffect(() => {
    const saved = localStorage.getItem('nexus_lab_testimonials');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(initialTestimonials);
      }
    } else {
      setReviews(initialTestimonials);
      localStorage.setItem('nexus_lab_testimonials', JSON.stringify(initialTestimonials));
    }
  }, []);

  const handleRatingSelect = (stars: number) => {
    setRating(stars);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const submitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientReview) return;

    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      name: clientName,
      role: clientRole || 'Founder / Partner',
      company: clientCompany || 'Independent Startup',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=crop&q=80&w=150`,
      content: clientReview,
      rating: rating,
      tags: selectedTags.length > 0 ? selectedTags : ['Custom Design']
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('nexus_lab_testimonials', JSON.stringify(updated));

    // Reset fields
    setClientName('');
    setClientRole('');
    setClientCompany('');
    setClientReview('');
    setRating(5);
    setSelectedTags([]);
    setSubmitSuccess(true);
    
    // Auto collapse form after brief window
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitForm(false);
    }, 2000);
  };

  const presetTags = ['SaaS Interface', 'UI/UX Redesign', 'Brand Showcase', 'Shopify Design', 'Typography Suite'];

  return (
    <section id="testimonials-section" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-xl space-y-3">
            <div className="text-[11px] font-mono font-medium tracking-wider text-blue-400 uppercase">Trusted Client Voices</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white animate-fade-in">
              Validated Collaborations
            </h2>
            <p className="text-white/70 font-sans font-light">
              Read how design-led layouts and strategic product wireframing helped active startups establish authority and land vital funding rounds.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="mt-6 md:mt-0 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20 hover:text-white text-xs font-mono font-bold tracking-wide uppercase cursor-pointer transition-all duration-200 inline-flex items-center space-x-2"
          >
            <UserPlus size={14} className="text-blue-400" />
            <span>{showSubmitForm ? 'Hide Review Box' : 'Leave a testimonial'}</span>
          </button>
        </div>

        {/* 1. INTERACTIVE INPUT FORM */}
        {showSubmitForm && (
          <div className="mb-12 p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="space-y-1 mb-6">
              <h3 className="font-heading text-xl font-bold text-white">Share Your Project Review</h3>
              <p className="text-xs text-white/50">Your honest design performance feedback helps keep our visual strategies high-caliber.</p>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <ShieldCheck size={36} className="text-emerald-400 mx-auto" />
                <h4 className="font-heading font-bold text-emerald-300">Review Registered!</h4>
                <p className="text-xs text-emerald-400/85">Thank you for sharing your experience. Prepending review to board...</p>
              </div>
            ) : (
              <form onSubmit={submitTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Liam Cooper" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full text-sm p-2.5 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/50 text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Venture Analytics" 
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full text-sm p-2.5 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/50 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase">Business Role</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Marketing Lead" 
                      value={clientRole}
                      onChange={(e) => setClientRole(e.target.value)}
                      className="w-full text-sm p-2.5 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/50 text-white"
                    />
                  </div>
                  
                  {/* Rating selection star icons */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase">Rating Score</label>
                    <div className="flex items-center space-x-1 h-10 select-none">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingSelect(star)}
                          className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star size={20} fill={rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtag tagging pills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/40 uppercase">Configured Services</label>
                  <div className="flex flex-wrap gap-1.5">
                    {presetTags.map((tag) => {
                      const selected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded cursor-pointer transition-colors ${
                            selected
                              ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-sm'
                              : 'bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/40 uppercase">Testimonial Content *</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Describe how Nexus Lab approached your brand redesign and the positive results you noticed..." 
                    value={clientReview}
                    onChange={(e) => setClientReview(e.target.value)}
                    className="w-full text-sm p-3 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/50 text-white resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-black hover:bg-white/95 rounded-lg text-xs font-mono font-bold tracking-wide uppercase transition-colors cursor-pointer shadow-md"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. REVIEWS MASONRY / GRID DISPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              id={`testimonial-card-${rev.id}`}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl relative group overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Giant quote layout block decoration */}
              <Quote size={50} className="absolute -top-1 -right-1 text-white/5 opacity-15 pointer-events-none -rotate-12 transform" />

              <div className="space-y-4 relative z-10">
                {/* Visual Stars */}
                <div className="flex items-center space-x-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>

                <p className="text-white/80 text-[13px] sm:text-sm font-sans font-light leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Client detail row */}
              <div className="flex items-center space-x-3 pt-4 border-t border-white/10 relative z-10">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-9 h-9 rounded-full object-cover border border-white/10 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white">{rev.name}</div>
                  <div className="text-[10px] font-mono text-white/40 uppercase truncate">
                    {rev.role} at <span className="text-blue-400 font-medium">{rev.company}</span>
                  </div>
                </div>
              </div>

              {/* Badges footer tags */}
              <div className="flex flex-wrap gap-1">
                {rev.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[9px] font-mono text-white/45">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
