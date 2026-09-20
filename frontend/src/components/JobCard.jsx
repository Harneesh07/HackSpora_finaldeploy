import React from 'react';
import { MapPin, Clock, CheckCircle2, Circle, ExternalLink, ChevronRight, Building2, Briefcase } from 'lucide-react';

export default function JobCard({ jobResult, onViewDetails }) {
  if (!jobResult) return null;

  const {
    job,
    match_score,
    matched_skills,
    missing_skills,
    match_category
  } = jobResult;

  const {
    title,
    company,
    location,
    distance_km,
    posted_at,
    work_mode,
    source,
    experience,
    description,
    apply_url
  } = job;

  // Category badge colors
  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'Best':
        return 'bg-emerald-50/80 text-emerald-400 border-emerald-500/40';
      case 'Strong':
        return 'bg-blue-50/80 text-blue-400 border-blue-500/40';
      case 'Potential':
        return 'bg-amber-50/80 text-amber-400 border-amber-500/40';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 p-6 shadow-lg transition-all flex flex-col justify-between space-y-5 group">
      
      <div>
        {/* Top Header: Source Badge, Work Mode, Experience & Match % */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[11px] font-bold text-slate-700">
              {source}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-300/60 text-[11px] font-medium text-slate-600">
              {work_mode}
            </span>
            {experience && (
              <span className="px-2.5 py-1 rounded-md bg-blue-50/60 border border-blue-500/30 text-[11px] font-semibold text-blue-300">
                {experience}
              </span>
            )}
          </div>

          <div className={`px-3 py-1 rounded-full border font-extrabold text-xs flex items-center gap-1 ${getCategoryBadge(match_category)}`}>
            <span>{match_score}% Match</span>
          </div>
        </div>

        {/* Job Title & Company */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center space-x-1.5 text-sm text-slate-700 mt-1 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{company}</span>
          </div>
        </div>

        {/* Location & Recency */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {location} {distance_km ? `· ${distance_km} km` : ''}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Posted {posted_at}
          </span>
        </div>

        {/* Job Description Text Box on Card */}
        {description && (
          <div className="mt-3.5 p-3 rounded-xl bg-white/90 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-600 block mb-1 uppercase tracking-wider text-[10px]">Job Description:</span>
            <p className="line-clamp-3">{description}</p>
          </div>
        )}

        {/* Matched vs Missing Pills */}
        <div className="space-y-2 mt-5 pt-4 border-t border-slate-200/80">
          <div className="flex flex-wrap gap-1.5">
            {matched_skills.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-50/50 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>

          {missing_skills && missing_skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {missing_skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-amber-50/40 border border-amber-500/30 text-amber-400 text-xs font-medium"
                >
                  <Circle className="w-3 h-3 text-amber-400" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center space-x-3">
        <button
          onClick={() => onViewDetails(jobResult)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300/80 font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
        >
          <span>View Breakdown</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center space-x-1.5"
        >
          <span>Apply on {source}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
