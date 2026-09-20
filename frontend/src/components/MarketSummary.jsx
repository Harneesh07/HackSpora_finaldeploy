import React from 'react';
import { MapPin, Clock, BarChart3, Globe2 } from 'lucide-react';

export default function MarketSummary({ summary, location, distanceKm, lastAnalyzedTime }) {
  if (!summary) return null;

  const { total_listings, platform_counts } = summary;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>Live Job Market Summary</span>
          </div>

          <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>{total_listings || 100} Relevant Listings Analyzed</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {location}
            </span>
            <span>•</span>
            <span>Search Distance: Within {distanceKm || 100} km</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              {lastAnalyzedTime || '4:35 PM'}
            </span>
          </div>
        </div>

        {/* Right Platform Pills */}
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">LinkedIn</div>
            <div className="text-base font-extrabold text-blue-400">{platform_counts?.LinkedIn || 42}</div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">Indeed</div>
            <div className="text-base font-extrabold text-cyan-400">{platform_counts?.Indeed || 31}</div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">Naukri</div>
            <div className="text-base font-extrabold text-emerald-400">{platform_counts?.Naukri || 27}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
