import React from 'react';
import { X, ExternalLink, CheckCircle2, Circle, Building2, MapPin, Clock, Award, BookOpen } from 'lucide-react';

export default function JobDetailModal({ jobResult, onClose, onLearnSkill }) {
  if (!jobResult) return null;

  const { job, match_score, score_breakdown, matched_skills, missing_skills, match_reason } = jobResult;
  const { title, company, location, distance_km, posted_at, work_mode, source, description, experience, required_skills, preferred_skills, apply_url } = job;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl my-8 relative text-left">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-white border border-slate-300 text-xs font-bold text-slate-700">{source}</span>
              <span className="px-2.5 py-0.5 rounded bg-white border border-slate-300/60 text-xs font-medium text-slate-600">{work_mode}</span>
              {experience && (
                <span className="px-2.5 py-0.5 rounded bg-blue-50/80 border border-blue-500/40 text-xs font-semibold text-blue-300">
                  {experience} Experience
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1.5">
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{company}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{location} ({distance_km} km)</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Posted {posted_at}</span>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner */}
        <div className="p-4 rounded-xl bg-white/90 border border-blue-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Candidate Match Alignment</div>
            <div className="text-2xl font-extrabold text-blue-400">{match_score}% Match</div>
          </div>

          <div className="text-right text-xs text-slate-600">
            <div>Required Skill Match: {score_breakdown?.required_skill_score || 50}/50</div>
            <div>Preferred Skill Match: {score_breakdown?.preferred_skill_score || 25}/25</div>
          </div>
        </div>

        {/* Description Snippet */}
        <div>
          <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Job Summary</h4>
          <p className="text-sm text-slate-700 leading-relaxed bg-white/50 p-4 rounded-xl border border-slate-200">
            {description}
          </p>
        </div>

        {/* Skills Matched vs Missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Matched Requirements ({matched_skills.length})
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {matched_skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-emerald-900/40 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/20 border border-amber-500/30 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Circle className="w-4 h-4" />
              Missing Requirements ({missing_skills.length})
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {missing_skills.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => { onClose(); onLearnSkill(s); }}
                  className="px-2.5 py-1 rounded bg-amber-900/40 hover:bg-amber-800/60 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors flex items-center gap-1"
                >
                  <span>{s}</span>
                  <BookOpen className="w-3 h-3 text-amber-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-700 text-slate-800 text-xs font-semibold transition-colors"
          >
            Close
          </button>

          <a
            href={apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-1.5"
          >
            <span>Apply on {source}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
