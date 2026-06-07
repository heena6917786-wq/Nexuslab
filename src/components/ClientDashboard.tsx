/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Inquiry, Testimonial } from '../types';
import { Terminal, Shield, Briefcase, Database, Eye, X, Check, ArrowRight, TrendingUp, Cpu, Server, MessageSquare } from 'lucide-react';

interface ClientDashboardProps {
  onClose: () => void;
  inquiries: Inquiry[];
  testimonials: Testimonial[];
  onUpdateInquiryStatus: (id: string, nextStatus: Inquiry['status']) => void;
  onClearInquiries: () => void;
}

export default function ClientDashboard({
  onClose,
  inquiries,
  testimonials,
  onUpdateInquiryStatus,
  onClearInquiries
}: ClientDashboardProps) {
  const [activePortalTab, setActivePortalTab] = useState<'briefings' | 'analytics' | 'testimonials'>('briefings');

  // Compute metric indexes for visual showcase
  const totalBriefsCount = inquiries.length;
  
  // Calculate simulated pricing metrics safely
  const calculateEstimatedMetrics = () => {
    let sum = 0;
    inquiries.forEach(inq => {
      if (inq.budget === 'Under $5k') sum += 4000;
      else if (inq.budget === '$5k - $10k') sum += 7500;
      else if (inq.budget === '$10k - $25k') sum += 17500;
      else if (inq.budget === '$25k+') sum += 30000;
    });
    return sum.toLocaleString('en-US');
  };

  const getStatusBadgeElement = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold bg-amber-50 text-amber-800 border border-amber-200">PENDING_BRIEF</span>;
      case 'reviewing':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold bg-blue-50 text-blue-800 border border-blue-200">IN_REVIEW</span>;
      case 'concept_ready':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold bg-purple-50 text-purple-800 border border-purple-200">PROPOSAL_SENT</span>;
      case 'accepted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold bg-emerald-50 text-emerald-800 border border-emerald-250">PROJECT_ACCEPTED</span>;
    }
  };

  const handleAdvanceStatus = (inq: Inquiry) => {
    let next: Inquiry['status'] = 'pending';
    if (inq.status === 'pending') next = 'reviewing';
    else if (inq.status === 'reviewing') next = 'concept_ready';
    else if (inq.status === 'concept_ready') next = 'accepted';
    else return;

    onUpdateInquiryStatus(inq.id, next);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex justify-end">
      
      {/* Drawer layout */}
      <div className="w-full max-w-2xl bg-zinc-950 border-l border-zinc-900 text-zinc-100 h-full flex flex-col p-6 overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header toolbar stats */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-5 mb-6">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-white font-mono text-xs">
              M
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-white flex items-center space-x-1.5">
                <span>Studio Desk Console</span>
                <span className="text-[9px] font-mono font-normal text-emerald-400 bg-emerald-950/80 border border-emerald-900 px-1 py-0.5 rounded">SYS_ACTIVE</span>
              </h3>
              <p className="text-[10px] font-mono text-zinc-500">MANAGE PROPOSALS & INQUIRIES CLIENT PORTABLES</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-400 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Console stats widgets */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg">
            <div className="text-[9px] font-mono text-zinc-500 uppercase">Incoming Briefs</div>
            <div className="font-heading text-lg font-bold text-white mt-1">{totalBriefsCount}</div>
          </div>
          <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg">
            <div className="text-[9px] font-mono text-zinc-500 uppercase">Pipeline Value</div>
            <div className="font-heading text-lg font-bold text-emerald-400 mt-1">${calculateEstimatedMetrics()}</div>
          </div>
          <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg">
            <div className="text-[9px] font-mono text-zinc-500 uppercase">Testimonial Reviews</div>
            <div className="font-heading text-lg font-bold text-white mt-1">{testimonials.length}</div>
          </div>
        </div>

        {/* Tab Selector selectors */}
        <div className="flex space-x-2 mb-6 border-b border-zinc-900 pb-3">
          <button
            onClick={() => setActivePortalTab('briefings')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              activePortalTab === 'briefings'
                ? 'bg-white text-zinc-950 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-850 hover:text-white'
            }`}
          >
            [1] Briefings List
          </button>
          <button
            onClick={() => setActivePortalTab('analytics')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              activePortalTab === 'analytics'
                ? 'bg-white text-zinc-950 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-850 hover:text-white'
            }`}
          >
            [2] Pipeline Analytics
          </button>
          <button
            onClick={() => setActivePortalTab('testimonials')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              activePortalTab === 'testimonials'
                ? 'bg-white text-zinc-950 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-850 hover:text-white'
            }`}
          >
            [3] Testimonials Mod
          </button>
        </div>

        {/* Tab contents list container screen */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          
          {/* 1. BRIEFINGS LIST TAB panel */}
          {activePortalTab === 'briefings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>INCOMING CLIENT BRIEFS RECORD ({totalBriefsCount})</span>
                {totalBriefsCount > 0 && (
                  <button 
                    onClick={onClearInquiries}
                    className="text-red-400 hover:text-red-300 text-[10px]"
                  >
                    CLEAR_ALL_LOGS
                  </button>
                )}
              </div>

              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 bg-zinc-900 border border-zinc-850 rounded-lg space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div>
                        <div className="text-sm font-bold text-white font-sans">{inq.name}</div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">
                          {inq.company} • {inq.email}
                        </div>
                      </div>
                      
                      {/* Status select badge */}
                      <div className="flex items-center space-x-2">
                        {getStatusBadgeElement(inq.status)}
                      </div>
                    </div>

                    <p className="text-zinc-400 text-xs font-sans font-light bg-zinc-950 p-2.5 rounded border border-zinc-900 whitespace-pre-wrap leading-relaxed">
                      {inq.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 pt-1.5 border-t border-zinc-850 gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span>SER: <span className="text-zinc-350">{inq.service}</span></span>
                        <span>BDG: <span className="text-zinc-350">{inq.budget}</span></span>
                        <span>SPD: <span className="text-zinc-350">{inq.timeline}</span></span>
                      </div>

                      {inq.status !== 'accepted' && (
                        <button
                          onClick={() => handleAdvanceStatus(inq)}
                          className="px-2.5 py-1 rounded bg-zinc-850 hover:bg-zinc-800 text-white hover:text-emerald-400 text-[10px] transition-colors inline-flex items-center space-x-1 border border-zinc-800 cursor-pointer"
                        >
                          <span>Advance Phase</span>
                          <ArrowRight size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-zinc-900/40 border border-zinc-900 rounded-lg">
                  <Terminal size={24} className="text-zinc-650 mx-auto mb-3" />
                  <div className="text-xs font-mono text-zinc-500 font-medium">CONSOLE_LOGS: EMPTY_INBOX</div>
                  <p className="text-[10px] font-light text-zinc-500 mt-1 max-w-xs mx-auto">Fill in the Front-Office project briefs form on the page to register incoming client inquiries.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. PIPELINE ANALYTICS TAB panel */}
          {activePortalTab === 'analytics' && (
            <div className="space-y-6">
              <h4 className="text-xs font-mono text-zinc-500">AGENCY PERFORMANCE PIPELINE OVERVIEWS</h4>
              
              {/* Graphic metrics progress block bar */}
              <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-lg space-y-4">
                <div className="text-xs font-mono text-zinc-300 font-bold">Studio Standard Milestones SLA Tracker</div>
                <div className="h-2 bg-zinc-950 rounded overflow-hidden flex">
                  <div className="bg-emerald-500 h-full w-[40%]" style={{ width: `${(inquiries.filter(i => i.status === 'accepted').length / (totalBriefsCount || 1)) * 100}%` }} />
                  <div className="bg-purple-500 h-full w-[25%]" style={{ width: `${(inquiries.filter(i => i.status === 'concept_ready').length / (totalBriefsCount || 1)) * 100}%` }} />
                  <div className="bg-blue-500 h-full w-[20%]" style={{ width: `${(inquiries.filter(i => i.status === 'reviewing').length / (totalBriefsCount || 1)) * 100}%` }} />
                </div>
                <div className="grid grid-cols-3 text-[10px] font-mono text-zinc-500 gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded bg-emerald-500 block" />
                    <span>Project Accepted ({inquiries.filter(i => i.status === 'accepted').length})</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded bg-purple-500 block" />
                    <span>Concept Sent ({inquiries.filter(i => i.status === 'concept_ready').length})</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded bg-blue-500 block" />
                    <span>In Review ({inquiries.filter(i => i.status === 'reviewing').length})</span>
                  </div>
                </div>
              </div>

              {/* Technical indicators details */}
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px] text-zinc-500">
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded">
                  <span className="text-zinc-650">PORT_ENV_SYS:</span>
                  <div className="text-white mt-1 font-bold">Cloud Run Sandbox</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded">
                  <span className="text-zinc-650">PERSISTENCE_DRIVE:</span>
                  <div className="text-white mt-1 font-bold">localStorage DB</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded">
                  <span className="text-zinc-650">API_STATUS_PROXY:</span>
                  <div className="text-emerald-400 mt-1 font-bold">0 Errors (Nginx proxy)</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-850 rounded">
                  <span className="text-zinc-650">ENGINE_BUILD_CORE:</span>
                  <div className="text-white mt-1 font-bold">Vite Core Node</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. TESTIMONIALS MOD TAB panel */}
          {activePortalTab === 'testimonials' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono text-zinc-500">CLIENT VISITS TESTIMONIAL MODERATION BOARD</h4>
              
              {testimonials.map((rev) => (
                <div key={rev.id} className="p-3 bg-zinc-900 border border-zinc-850 rounded-lg flex items-start space-x-3 text-xs">
                  <img src={rev.avatar} className="w-8 h-8 rounded-full border border-zinc-800 mt-0.5 shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0 font-sans space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-[12px]">{rev.name}</span>
                      <span className="text-[10px] font-mono text-amber-400">★ {rev.rating}/5</span>
                    </div>
                    <p className="text-zinc-400 font-light text-[11px] italic">"{rev.content}"</p>
                    <div className="text-[9px] font-mono text-zinc-500">{rev.role} at {rev.company}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Drawer Console Footer info */}
        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500">
          <div className="flex items-center space-x-1.5">
            <Server size={10} className="text-emerald-500" />
            <span>NEXUS_PORT_SECURE_VERIFIER</span>
          </div>
          <span>UTC_TIME_OK</span>
        </div>

      </div>
    </div>
  );
}
