/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Layout, Paintbrush, Cpu, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export default function Hero({ onStartProject, onExploreWork }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 lg:pb-36 bg-transparent">
      {/* Background Subtle Geometrical Accent Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Soft Availability Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-[11px] font-mono tracking-wider uppercase"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span>Available for June & July Q3 Projects</span>
            </motion.div>

            {/* Core Value Statement Header */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
              >
                Bespoke websites <br />
                <span className="text-blue-400 font-light italic">sculpted</span> for high-growth tech brands.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-white/70 max-w-xl font-sans font-light leading-relaxed"
              >
                I partner with founders and marketing teams to engineer high-fidelity, grid-perfect web portfolios, interactive marketing catalogs, and fast custom Shopify systems.
              </motion.p>
            </div>

            {/* Action Group Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                id="hero-cta-start-project"
                onClick={onStartProject}
                className="px-6 py-3.5 rounded-lg bg-white text-black text-sm font-bold hover:bg-white/90 transition-all duration-200 shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <span>Brief Your Project</span>
                <ArrowDown size={14} />
              </button>
              <button
                id="hero-cta-explore-work"
                onClick={onExploreWork}
                className="px-6 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
              >
                Explore Studio Works
              </button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4"
            >
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white">100%</div>
                <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-1">Client Satisfaction</div>
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white">48-Hr</div>
                <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-1">Initial Draft Turnaround</div>
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white">15+</div>
                <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-1">SaaS & Brand Sites Live</div>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual Column - Architectural Design Layout Sandbox */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-[420px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/80 p-5 overflow-hidden"
            >
              {/* Studio Desk Interface Header decoration */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-white/40">NEXUS_LAB_ENGINE.SYS</div>
                <Layout size={12} className="text-white/30" />
              </div>

              {/* Miniature Layout Visual Sandbox */}
              <div className="space-y-4">
                {/* Visual Header Grid block */}
                <div className="h-6 flex justify-between items-center bg-white/5 border border-white/10 rounded px-2">
                  <div className="h-2 w-12 bg-white/20 rounded" />
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-3 bg-white/20 rounded-sm" />
                    <div className="h-1.5 w-3 bg-white/20 rounded-sm" />
                    <div className="h-1.5 w-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-sm" />
                  </div>
                </div>

                {/* Main Hero preview representation inside layout */}
                <div className="p-3 bg-white/5 border border-dashed border-white/10 rounded text-center space-y-2 relative">
                  <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest absolute top-1.5 left-2">Hero Section</div>
                  <div className="h-1.5 w-16 bg-white/25 rounded mx-auto mt-2" />
                  <div className="h-3.5 w-36 bg-white/70 rounded mx-auto" />
                  <div className="h-2 w-28 bg-white/20 rounded mx-auto" />
                  <div className="h-5 w-12 bg-[#020617]/55 border border-white/10 rounded mx-auto shadow-sm" />
                </div>

                {/* Two Column Feature grids inside layout */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 border border-white/10 bg-white/5 rounded space-y-1.5">
                    <Paintbrush size={12} className="text-blue-400" />
                    <div className="h-2 w-12 bg-white/80 rounded" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-white/10 rounded" />
                      <div className="h-1.5 w-10 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="p-2.5 border border-white/10 bg-white/5 rounded space-y-1.5">
                    <Cpu size={12} className="text-purple-400" />
                    <div className="h-2 w-14 bg-white/80 rounded" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-white/10 rounded" />
                      <div className="h-1.5 w-12 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>

                {/* Footer system details */}
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-1">
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={10} className="text-emerald-400" />
                    <span>W3C Compliant</span>
                  </div>
                  <span>Vite / Tailwind v4</span>
                </div>
              </div>
            </motion.div>

            {/* Back ambient color card details */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-60" />
            <div className="absolute -bottom-10 -left-6 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl -z-10 opacity-50" />
          </div>

        </div>
      </div>
    </section>
  );
}
