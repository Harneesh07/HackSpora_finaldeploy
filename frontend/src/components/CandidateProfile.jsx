import React from 'react';
import { User, Mail, MapPin, Briefcase, GraduationCap, Award, Sparkles, CheckCircle } from 'lucide-react';

export default function CandidateProfile({ candidate }) {
  if (!candidate) return null;

  // Group skills by category
  const skillsByCategory = candidate.skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      
      {/* Candidate Overview Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xl">
              {candidate.name ? candidate.name.charAt(0) : 'C'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{candidate.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{candidate.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-lg border border-slate-300/80">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-slate-700">
              {candidate.skills ? candidate.skills.length : 0} Skills Extracted
            </span>
          </div>
        </div>

        {/* AI Contextual Summary */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/30 border border-blue-500/20">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Contextual Summary</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {candidate.ai_summary}
          </p>
        </div>

        {/* Key Achievements & Highlights */}
        {candidate.achievements && candidate.achievements.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Key Achievements & Accomplishments</span>
            </div>
            <ul className="space-y-2">
              {candidate.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Skills Detected Cloud */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>Skills Detected</span>
          <span className="text-xs text-slate-600 font-normal">Extracted from Resume Evidence</span>
        </h3>

        <div className="space-y-4">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-300/80 flex items-center space-x-2 text-xs font-medium text-slate-800 hover:border-blue-500/50 transition-colors"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-400 border border-blue-500/30">
                      {s.evidence || 'Strong'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
