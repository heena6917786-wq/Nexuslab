/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Terminal, FileText, Compass, Send, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenPortal: () => void;
  inquiryCount: number;
}

export default function Header({ onOpenPortal, inquiryCount }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="header-app"
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl border ${
        scrolled
          ? 'bg-white/5 border-white/15 backdrop-blur-xl shadow-lg shadow-black/25'
          : 'bg-[#020617]/30 border-white/5 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2.5 font-heading text-xl font-bold tracking-tight text-white group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-mono text-sm font-bold transition-transform duration-300 group-hover:rotate-6 shadow-md shadow-blue-500/20">
            N
          </div>
          <span>
            NEXUS<span className="text-blue-400 font-mono text-xs ml-1">LAB</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('portfolio-section')}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('services-section')}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('blog-section')}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Insights Blog
          </button>
          <button
            onClick={() => scrollToSection('testimonials-section')}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Client Portal Portal Action */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            id="open-client-portal-btn"
            onClick={onOpenPortal}
            className="relative inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20 hover:text-white text-xs font-mono font-medium transition-all duration-200 cursor-pointer"
          >
            <Terminal size={12} />
            <span>Studio Desk</span>
            {inquiryCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
                {inquiryCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => scrollToSection('contact-section')}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-bold transition-all duration-200 cursor-pointer shadow-md shadow-white/5"
          >
            <Send size={11} />
            <span>Brief Us</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={onOpenPortal}
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-white"
          >
            <Terminal size={14} />
            {inquiryCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm animate-pulse">
                {inquiryCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617]/95 border border-white/15 backdrop-blur-2xl rounded-2xl mx-2 mb-2 p-6 space-y-4 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('portfolio-section')}
              className="text-left py-2 text-base font-medium text-white/85 hover:text-white"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('services-section')}
              className="text-left py-2 text-base font-medium text-white/85 hover:text-white"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('blog-section')}
              className="text-left py-2 text-base font-medium text-white/85 hover:text-white"
            >
              Insights Blog
            </button>
            <button
              onClick={() => scrollToSection('testimonials-section')}
              className="text-left py-2 text-base font-medium text-white/85 hover:text-white"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-left py-2 text-base font-medium text-white/85 hover:text-white"
            >
              Contact
            </button>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20 text-sm font-mono font-medium"
            >
              <Terminal size={13} />
              <span>Studio Desk ({inquiryCount} Requests)</span>
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-white text-black font-bold text-sm"
            >
              <Send size={11} />
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
