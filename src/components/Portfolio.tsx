/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { initialPortfolioItems } from '../data';
import { PortfolioItem } from '../types';
import { Filter, Eye, Palette, Layers, Calendar, ExternalLink, ArrowRight, X, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  
  // States representing current position of the wireframe-to-polish interactive slider (percentage 0-100)
  const [sliderIndex, setSliderIndex] = useState<{ [key: string]: number }>({
    'apex-saas': 50,
    'elixir-ecommerce': 50,
    'monolith-brand': 55,
    'nova-creative': 40,
    'zenith-logo': 45,
    'kinetix-identity': 50,
    'equinox-packaging': 35
  });

  const filteredItems = selectedCategory === 'all'
    ? initialPortfolioItems
    : initialPortfolioItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'saas', label: 'SaaS Interfaces' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'brand', label: 'Branded Portfolios' },
    { id: 'creative', label: 'Creative Catalogs' },
    { id: 'graphics', label: 'Logos & Graphics' }
  ];

  const updateSlider = (itemId: string, val: number) => {
    setSliderIndex(prev => ({
      ...prev,
      [itemId]: val
    }));
  };

  return (
    <section id="portfolio-section" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-xl space-y-3">
            <div className="text-[11px] font-mono font-medium tracking-wider text-blue-400 uppercase">Selected Craft Case Studies</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white animate-fade-in">
              High-Performance Digital Interfaces
            </h2>
            <p className="text-white/70 font-sans font-light">
              Explore live projects showing how balanced layout grids, typography design, and motion interactions deliver substantial client conversion results.
            </p>
          </div>
          
          {/* Custom Navigation Category Filters */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans cursor-pointer transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-transparent text-white/60 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredItems.map((item) => {
            const currentSlider = sliderIndex[item.id] || 50;
            return (
              <div 
                key={item.id} 
                id={`portfolio-item-${item.id}`}
                className="group flex flex-col bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-black/40 hover:shadow-xl hover:border-white/20"
              >
                {/* 1. INTERACTIVE WIREFRAME VS POLISH SLIDER CONTAINER */}
                <div className="relative h-[250px] sm:h-[320px] w-full select-none overflow-hidden bg-[#020617]/60 border-b border-white/10">
                  
                  {/* Background Polished Screen (Left to Right) */}
                  <div className="absolute inset-0 z-10">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Polished Visual UI overlays representing real finish */}
                    <div className="absolute top-3 left-3 bg-black/70 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white tracking-wide flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>POLISHED PREVIEW</span>
                    </div>
                  </div>

                  {/* Foreground Wireframe Screen (Clipped from left side based on slider value) */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${currentSlider}% 0, ${currentSlider}% 100%, 0 100%)` }}
                  >
                    {/* Wireframe simulated graphics overlay via picsum seed or custom visual pattern */}
                    <div className="absolute inset-0 bg-[#020617]/95" />
                    
                    {/* Blue Vector CAD Grid lines */}
                    <div className="absolute inset-0 opacity-[0.25]" style={{
                      backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />

                    {/* Wireframe Blueprint mock markup details */}
                    <div className="absolute inset-10 border-2 border-dashed border-blue-500/20 rounded flex flex-col justify-between p-4 bg-[#020617]/25">
                      <div className="flex justify-between items-start">
                        <div className="border border-blue-500/30 px-1.5 py-0.5 text-[8px] font-mono text-blue-400 font-bold bg-blue-550/10">W-GRID // H_HEADER</div>
                        <div className="h-4 w-4 rounded-full border border-blue-500/35 border-dashed" />
                      </div>
                      
                      {/* Grid crosshair symbol */}
                      <div className="text-center">
                        <div className="w-10 h-10 rounded border border-dashed border-blue-500/30 bg-blue-500/5 justify-center items-center flex text-blue-400/75 text-[10px] font-mono mx-auto">
                          IMG
                        </div>
                        <div className="mt-1.5 text-[9px] font-mono text-blue-400/60 uppercase tracking-widest">{item.client}</div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="h-2 w-20 bg-blue-500/10" />
                        <div className="h-3 w-8 bg-blue-500/20" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-blue-950/95 border border-blue-500/30 px-2.5 py-1 rounded text-[10px] font-mono text-blue-300 tracking-wide flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span>BLUEPRINT CAD</span>
                    </div>
                  </div>

                  {/* Range slider element to sweep handle across */}
                  <div className="absolute inset-x-0 bottom-0 top-0 z-30 flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={currentSlider}
                      onChange={(e) => updateSlider(item.id, Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                    />

                    {/* Visual Vertical line dividing elements */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-blue-400 shadow-[0_0_10px_#3b82f6] pointer-events-none z-30"
                      style={{ left: `${currentSlider}%` }}
                    >
                      {/* Dragger button bubble */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/50 border border-white/50 text-xs font-mono select-none">
                        ↔
                      </div>
                    </div>
                  </div>

                  {/* Micro tip helper banner */}
                  <div className="absolute bottom-3 right-3 z-10 bg-black/50 border border-white/5 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-white/80">
                    Drag slider center to inspect grid
                  </div>
                </div>

                {/* 2. CARD METADATA INFO */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-white/40 uppercase tracking-wider">
                      <span className="text-blue-400">
                        {item.category === 'saas' 
                          ? 'SaaS System' 
                          : item.category === 'ecommerce' 
                          ? 'E-Commerce Retail' 
                          : item.category === 'brand' 
                          ? 'Brand Identity Portfolio' 
                          : item.category === 'graphics'
                          ? 'Logo & Graphic Design'
                          : 'Creative Catalog'}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm font-sans font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Info Tags & Case Review Action button */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveItem(item)}
                      className="inline-flex items-center space-x-1 text-xs font-mono font-medium text-white/80 hover:text-white transition-colors group/btn cursor-pointer"
                    >
                      <span>Case Review</span>
                      <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. CASE STUDY INSPECTOR DIALOG MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020617]/85 backdrop-blur-xl flex justify-center items-center p-4">
          <div className="relative w-full max-w-4xl bg-[#0a0f25]/95 rounded-2xl shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Heading Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                  {activeItem.category.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white leading-tight">{activeItem.title}</h3>
                  <p className="text-xs font-mono text-white/40">CASE STUDY REVIEW</p>
                </div>
              </div>
              
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body Description Content */}
            <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1">
              
              {/* Quick Details List Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Client Brand</div>
                  <div className="text-sm font-sans font-medium text-white/90 mt-1">{activeItem.client}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Launched</div>
                  <div className="text-sm font-sans font-medium text-white/90 mt-1">{activeItem.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Core Font Stack</div>
                  <div className="text-sm font-mono font-medium text-white/90 mt-1">{activeItem.fontFamily}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Systems Tech</div>
                  <div className="text-xs font-mono text-white/90 mt-1">
                    {activeItem.tech.join(', ')}
                  </div>
                </div>
              </div>

              {/* Design Challenge vs Solution blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-white/50 uppercase">
                    <Layers size={11} className="text-white/40" />
                    <span>The Client Challenge</span>
                  </div>
                  <p className="text-white/70 text-sm font-sans font-light leading-relaxed">
                    {activeItem.challenge}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    <Sparkles size={11} />
                    <span>The Design Solution</span>
                  </div>
                  <p className="text-white/70 text-sm font-sans font-light leading-relaxed">
                    {activeItem.solution}
                  </p>
                </div>
              </div>

              {/* Color Swatch Inspector & Core Features lists */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/10">
                
                {/* Visual Color Palette circles */}
                <div className="md:col-span-5 space-y-4">
                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-white/50 uppercase">
                    <Palette size={12} />
                    <span>Color Palette Scheme</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {activeItem.colors.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-2">
                        <div 
                          className="w-11 h-11 rounded-full border border-white/10 shadow-md"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] font-mono text-white/50 uppercase">{color}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-white/5 p-3 border border-white/10 text-xs font-sans text-white/50 font-light">
                    This selection balances high contrast visibility guidelines in compliance with W3C web accessibility guidelines.
                  </div>
                </div>

                {/* Features list */}
                <div className="md:col-span-7 space-y-3">
                  <div className="text-xs font-mono font-bold text-white/55 uppercase">
                    Core Configured Features
                  </div>
                  <ul className="space-y-2">
                    {activeItem.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-sm text-white/80 font-sans font-light">
                        <Check size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-white/90 font-sans font-bold text-xs cursor-pointer transition-colors shadow-lg"
              >
                Done Case Review
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
