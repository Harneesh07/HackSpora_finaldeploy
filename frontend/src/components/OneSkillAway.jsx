import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink, BookOpen } from 'lucide-react';

export default function OneSkillAway({ data, onSelectSkillToLearn }) {
  if (!data || !data.has_opportunity) return null;

  const {
    role,
    company,
    match_score,
    matched_skills,
    missing_skill,
    market_demand_pct,
    apply_url,
    recommendation
  } = data;

  return (
    <div className="rounded-2xl bg-white border-2 border-blue-500/40 p-8 shadow-2xl relative overflow-hidden my-8">
      
      {/* Badge Top */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">You're Almost There</h2>
            <p className="text-xs text-slate-600">High-impact single skill gap detected</p>
          </div>
        </div>

        <div className="px-4 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-500/40 text-emerald-400 font-extrabold text-sm flex items-center gap-1.5 self-start sm:self-auto">
          <span>{match_score}% Match Alignment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
        
        {/* Role & Matched Skills */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Target Opportunity</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{role}</div>
            <div className="text-sm text-slate-600">{company}</div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">You Already Match:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {matched_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-50/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Missing Skill Callout */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white/90 border border-amber-500/30 flex flex-col justify-between space-y-4">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Single Missing Requirement</span>
            </div>
            
            <div className="text-xl font-extrabold text-amber-300">
              Missing: {missing_skill}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-amber-300 font-bold">{missing_skill}</strong> appears in <strong className="text-slate-900 font-bold">{market_demand_pct}%</strong> of similar current job postings. Learning this skill unlocks top-tier roles.
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => onSelectSkillToLearn(missing_skill)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn {missing_skill} Roadmap</span>
            </button>

            {apply_url && (
              <a
                href={apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-700 text-slate-800 font-semibold text-xs border border-slate-300 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>View Job</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
