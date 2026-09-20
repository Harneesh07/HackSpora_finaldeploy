import React from 'react';
import { Layers } from 'lucide-react';

export default function PlatformComparison({ skillFrequencies }) {
  if (!skillFrequencies || skillFrequencies.length === 0) return null;

  const topSkills = skillFrequencies.slice(0, 6);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg my-8">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            Platform Skill Demand Comparison
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Frequency breakdown across LinkedIn, Indeed, and Naukri in analyzed postings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {topSkills.map((item, idx) => {
          const breakdown = item.platform_breakdown || {};
          return (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-slate-900">{item.skill}</span>
                <span className="text-xs font-bold text-blue-400 bg-blue-50 px-2 py-0.5 rounded border border-blue-500/30">
                  {item.frequency_pct}% Overall
                </span>
              </div>

              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>LinkedIn</span>
                  <span className="font-semibold text-slate-800">{breakdown.LinkedIn || item.frequency_pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.LinkedIn || item.frequency_pct}%` }} />
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Indeed</span>
                  <span className="font-semibold text-slate-800">{breakdown.Indeed || item.frequency_pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${breakdown.Indeed || item.frequency_pct}%` }} />
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Naukri</span>
                  <span className="font-semibold text-slate-800">{breakdown.Naukri || item.frequency_pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${breakdown.Naukri || item.frequency_pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
