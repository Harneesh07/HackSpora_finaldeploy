import React, { useState } from 'react';
import { Search, CheckCircle2, Loader2, RefreshCw, Zap, Shield } from 'lucide-react';

export default function LiveSearchProgress({ onRunLiveSearch, isSearching, lastAnalyzedTime }) {
  const [steps, setSteps] = useState([
    { label: 'Resume analyzed', done: true },
    { label: 'Target roles identified', done: true },
    { label: 'Location identified', done: true },
    { label: 'LinkedIn searching', done: false, running: false },
    { label: 'Indeed searching', done: false, running: false },
    { label: 'Naukri searching', done: false, running: false },
  ]);

  const handleSearchClick = () => {
    onRunLiveSearch();
  };

  return (
    <div className="rounded-2xl bg-white border border-blue-500/30 p-8 shadow-2xl relative overflow-hidden my-8">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Live Market Intelligence</span>
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-900">
            Validate Against Live Job Market
          </h2>

          <p className="text-sm text-slate-600 max-w-xl">
            Execute a fresh analysis against active openings on LinkedIn, Indeed, and Naukri to evaluate candidate skills against real market demand.
          </p>

          {lastAnalyzedTime && (
            <div className="text-xs text-slate-600 pt-1 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>Last analyzed: {lastAnalyzedTime}</span>
            </div>
          )}
        </div>

        {/* Large Action Button */}
        <div>
          <button
            onClick={handleSearchClick}
            disabled={isSearching}
            className={`px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all flex items-center justify-center space-x-3 w-full sm:w-auto ${
              isSearching
                ? 'bg-blue-50 text-blue-300 border border-blue-500/40 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-95'
            }`}
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                <span>Searching Live Job Providers...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Validate Against Live Job Market</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Progress Steps status display */}
      <div className="mt-8 pt-6 border-t border-slate-200/80">
        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4 text-left">
          Live Search Status Sequence
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-white border border-emerald-500/30 flex items-center space-x-2 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Resume analyzed</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-emerald-500/30 flex items-center space-x-2 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Roles identified</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-emerald-500/30 flex items-center space-x-2 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Location identified</span>
          </div>

          <div className={`p-3 rounded-xl bg-white border flex items-center space-x-2 text-xs font-medium ${
            isSearching ? 'border-blue-500 text-blue-400 animate-pulse' : 'border-emerald-500/30 text-emerald-400'
          }`}>
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            <span>LinkedIn search</span>
          </div>

          <div className={`p-3 rounded-xl bg-white border flex items-center space-x-2 text-xs font-medium ${
            isSearching ? 'border-blue-500 text-blue-400 animate-pulse' : 'border-emerald-500/30 text-emerald-400'
          }`}>
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            <span>Indeed search</span>
          </div>

          <div className={`p-3 rounded-xl bg-white border flex items-center space-x-2 text-xs font-medium ${
            isSearching ? 'border-blue-500 text-blue-400 animate-pulse' : 'border-emerald-500/30 text-emerald-400'
          }`}>
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            <span>Naukri search</span>
          </div>
        </div>
      </div>

    </div>
  );
}
