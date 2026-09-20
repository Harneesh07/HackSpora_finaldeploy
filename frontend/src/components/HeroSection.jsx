import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, Target, Compass } from 'lucide-react';

export default function HeroSection({ onAnalyzeClick, onRunDemo, onHowItWorksClick }) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-200/60 bg-slate-50">
      
      {/* Background glow effects - minimal */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-900/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50/60 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>AI-Powered Career Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Turn your resume into your <span className="text-blue-500">career roadmap.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Understand your skills, discover current job opportunities, see what employers are asking for, and identify the skills that can strengthen your career profile.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onAnalyzeClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition-all group"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRunDemo}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300/70 font-semibold text-sm transition-all"
              >
                <span>Try Demo Resume</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live Market Search</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pandas & NumPy Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Original Job Apply Links</span>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Preview Dashboard Widget */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Candidate Intelligence Preview</span>
                </div>
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100/60 px-2.5 py-1 rounded">Alex Chen</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-white/90 border border-slate-200">
                  <div className="text-xs text-slate-600 font-medium">Resume Score</div>
                  <div className="text-3xl font-extrabold text-blue-400 mt-1 flex items-baseline justify-between">
                    <span>82</span>
                    <span className="text-xs font-normal text-slate-600">/ 100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-slate-200">
                  <div className="text-xs text-slate-600 font-medium">Skills Detected</div>
                  <div className="text-3xl font-extrabold text-cyan-400 mt-1">18</div>
                  <div className="text-[11px] text-slate-600 mt-3">React, Node, Python, SQL</div>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-slate-200">
                  <div className="text-xs text-slate-600 font-medium">Skill Gaps</div>
                  <div className="text-3xl font-extrabold text-amber-400 mt-1">5</div>
                  <div className="text-[11px] text-slate-600 mt-3">Docker (47% market)</div>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-slate-200">
                  <div className="text-xs text-slate-600 font-medium">Role Matches</div>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-1">4</div>
                  <div className="text-[11px] text-slate-600 mt-3">Full Stack (92% align)</div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-blue-300">
                  <Compass className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Ready to validate against live job market?</span>
                </div>
                <button
                  onClick={onRunDemo}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-all"
                >
                  Load Demo
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
