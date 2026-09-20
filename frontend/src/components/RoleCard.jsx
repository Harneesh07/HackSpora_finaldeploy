import React from 'react';
import { Target, CheckCircle2, Circle, ArrowUpRight } from 'lucide-react';

export default function RoleCard({ roleRecommendation, onSelectRole }) {
  if (!roleRecommendation) return null;

  const {
    role,
    alignment_percentage,
    matched_skills,
    missing_skills,
    explanation
  } = roleRecommendation;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg hover:border-slate-300/80 transition-all flex flex-col justify-between space-y-4">
      
      <div>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            {role}
          </h3>

          <div className="px-3 py-1 rounded-full bg-blue-50/80 border border-blue-500/30 text-blue-400 text-xs font-bold">
            {alignment_percentage}% Alignment
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          {explanation}
        </p>

        {/* Alignment Progress Bar */}
        <div className="w-full bg-white h-2 rounded-full overflow-hidden mt-3 border border-slate-200">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${alignment_percentage}%` }}
          />
        </div>
      </div>

      {/* Matched vs Missing Pills */}
      <div className="space-y-2.5 pt-2 border-t border-slate-200">
        <div>
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Matched Skills</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {matched_skills.slice(0, 6).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-emerald-50/40 text-emerald-400 border border-emerald-500/30 text-xs font-medium"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {missing_skills && missing_skills.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Missing & Important</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {missing_skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-50/40 text-amber-400 border border-amber-500/30 text-xs font-medium"
                >
                  <Circle className="w-3 h-3 text-amber-400" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
