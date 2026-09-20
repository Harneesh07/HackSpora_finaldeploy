import React, { useState } from 'react';
import { AlertCircle, ArrowUpRight, ShieldAlert, Award, BookOpen, Video, ChevronDown, ChevronUp } from 'lucide-react';

export default function SkillGapCard({ skillGaps, onSelectSkillToLearn }) {
  const [showAllGaps, setShowAllGaps] = useState(false);

  if (!skillGaps || skillGaps.length === 0) return null;

  const displayedGaps = showAllGaps ? skillGaps : skillGaps.slice(0, 4);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg my-8 text-left">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Skill Gap Engine ({skillGaps.length} Total Lagging Skills Identified)
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Key market requirements currently missing from your resume evidence. Choose learning options to bridge each gap.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {displayedGaps.map((gap, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold text-amber-300">{gap.skill}</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-500/30">
                  {gap.market_demand_pct}% Market Demand
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {gap.reason}
              </p>

              {/* Available Alternatives Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-600 font-medium">Platforms:</span>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(gap.skill + ' course on Infosys Springboard')}`} target="_blank" rel="noreferrer" className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-500/30 flex items-center gap-1 cursor-pointer transition-colors">
                  <Award className="w-3 h-3 text-emerald-500" /> Infosys Springboard
                </a>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(gap.skill + ' course on Cisco Academy')}`} target="_blank" rel="noreferrer" className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-500/30 flex items-center gap-1 cursor-pointer transition-colors">
                  <BookOpen className="w-3 h-3 text-blue-500" /> Cisco Academy
                </a>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(gap.skill + ' tutorial on YouTube')}`} target="_blank" rel="noreferrer" className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors">
                  <Video className="w-3 h-3 text-amber-500" /> YouTube
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-600">
                Priority: <strong className="text-amber-400">{gap.learning_priority}</strong>
              </span>

              <button
                onClick={() => {
                  if (onSelectSkillToLearn) {
                    onSelectSkillToLearn(gap.skill);
                  } else {
                    const el = document.getElementById('learning-roadmap');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                  }
                }}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Fill the gap with these alternatives</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More Skill Gaps Button */}
      {skillGaps.length > 4 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllGaps(!showAllGaps)}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-all inline-flex items-center gap-2"
          >
            {showAllGaps ? (
              <>
                <span>Show Fewer Skill Gaps</span>
                <ChevronUp className="w-4 h-4 text-blue-400" />
              </>
            ) : (
              <>
                <span>See More Skill Gap Suggestions ({skillGaps.length} Total Identified)</span>
                <ChevronDown className="w-4 h-4 text-blue-400" />
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}


