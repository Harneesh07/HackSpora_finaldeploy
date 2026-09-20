import React, { useState } from 'react';
import { BookOpen, Clock, Code2, ExternalLink, Award, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, CheckSquare, Square } from 'lucide-react';

export default function LearningRoadmap({ roadmap }) {
  const [showAllRoadmap, setShowAllRoadmap] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  if (!roadmap || roadmap.length === 0) return null;

  const toggleStep = (skillIndex, stepIndex) => {
    const key = `${skillIndex}-${stepIndex}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const displayedRoadmap = showAllRoadmap ? roadmap : roadmap.slice(0, 3);

  return (
    <div id="learning-roadmap" className="rounded-2xl bg-white border border-blue-500/30 p-6 shadow-xl my-8 text-left">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Personalized Learning Roadmap & Platform Alternatives ({roadmap.length} Total Skills)
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Fill your lagging skill gaps with direct course links and follow the 4-step completion roadmap.
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {displayedRoadmap.map((item, idx) => (
          <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 space-y-5 shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <span>Fill Skill Gap: {item.skill}</span>
                  </h4>
                  <div className="text-xs text-slate-600 font-normal mt-0.5">
                    {item.recommendation}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-600">
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-400 text-xs font-semibold border border-blue-500/30">
                  {item.market_demand_pct}% Market Demand
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Est. {item.estimated_hours} Hours</span>
              </div>
            </div>

            {/* Suggested Hands-on Project */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-200/80 flex items-start space-x-2.5 text-xs text-slate-700">
              <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 font-semibold">Suggested Action Project: </strong>
                <span>{item.suggested_project}</span>
              </div>
            </div>

            {/* 4-Step Basic Roadmap for Completion */}
            {item.completion_roadmap && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-200/60 space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>4-Step Basic Completion Roadmap</span>
                  <span className="text-[11px] text-slate-600 font-normal">Track your step progress</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {item.completion_roadmap.map((step, sIdx) => {
                    const isDone = !!completedSteps[`${idx}-${sIdx}`];
                    return (
                      <div
                        key={sIdx}
                        onClick={() => toggleStep(idx, sIdx)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start space-x-2.5 ${
                          isDone 
                            ? 'bg-emerald-50/40 border-emerald-500/40 text-emerald-200' 
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <div className={`font-bold text-xs ${isDone ? 'text-emerald-300 line-through' : 'text-slate-800'}`}>
                            Step {step.step_number}: {step.title}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommended Direct Training Options & Platform Alternatives */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Fill the gap with these direct course options:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {item.platforms && item.platforms.map((plat, pIdx) => {
                  const isCertificate = plat.has_certificate;
                  return (
                    <a
                      key={pIdx}
                      href={plat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 hover:border-blue-500/40 transition-all flex flex-col justify-between group space-y-2"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-400 transition-colors">
                            {plat.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                          {plat.description || `${plat.name} direct training course for ${item.skill}.`}
                        </p>
                      </div>

                      {/* Certificate Status Badge */}
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-[10px] text-slate-600">{plat.type || 'Course'}</span>
                        
                        {isCertificate ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                            <Award className="w-3 h-3 text-emerald-400" />
                            <span>{plat.certificate_note || 'Has Certificate'}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50/80 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            <span>{plat.certificate_note || "You won't earn a certificate for this"}</span>
                          </span>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* See More Learning Paths Button */}
      {roadmap.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllRoadmap(!showAllRoadmap)}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-all inline-flex items-center gap-2"
          >
            {showAllRoadmap ? (
              <>
                <span>Show Fewer Learning Suggestions</span>
                <ChevronUp className="w-4 h-4 text-blue-400" />
              </>
            ) : (
              <>
                <span>See More Skill Learning Suggestions ({roadmap.length} Total Available)</span>
                <ChevronDown className="w-4 h-4 text-blue-400" />
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}


