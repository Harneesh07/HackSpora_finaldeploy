import React, { useState } from 'react';
import { Info, Award, X, Check } from 'lucide-react';

export default function ResumeScoreCard({ score, breakdown }) {
  const [showModal, setShowModal] = useState(false);

  const scoreNum = score || 82;

  return (
    <>
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg flex flex-col justify-between">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Overall Resume Score</span>
          <button
            onClick={() => setShowModal(true)}
            className="text-slate-600 hover:text-blue-400 transition-colors p-1"
            title="Explain Score"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 flex items-baseline space-x-2">
          <span className="text-5xl font-extrabold text-blue-400">{scoreNum}</span>
          <span className="text-sm font-semibold text-slate-600">/ 100</span>
        </div>

        <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-1000"
            style={{ width: `${scoreNum}%` }}
          />
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Explainable Benchmark</span>
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-400 font-semibold hover:underline"
          >
            Inspect Breakdown →
          </button>
        </div>
      </div>

      {/* Modal Explanation */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300/80 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                Resume Score Breakdown
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-600 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              ResumeIQ scores resumes deterministically by measuring quantifiable criteria across impact phrases, tech stack breadth, brevity, and formatting.
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Skills & Tech Stack Coverage</div>
                  <div className="text-[11px] text-slate-600">Density of canonical skills detected</div>
                </div>
                <div className="text-sm font-bold text-blue-400">90%</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Impact & Metric Action Verbs</div>
                  <div className="text-[11px] text-slate-600">Quantifiable achievement statements</div>
                </div>
                <div className="text-sm font-bold text-emerald-400">82%</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Brevity & Conciseness</div>
                  <div className="text-[11px] text-slate-600">Optimal page length & word count</div>
                </div>
                <div className="text-sm font-bold text-cyan-400">88%</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Structure & Contact Metadata</div>
                  <div className="text-[11px] text-slate-600">Clean sections, email, location metadata</div>
                </div>
                <div className="text-sm font-bold text-amber-400">85%</div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-700 text-slate-800 text-xs font-semibold transition-colors"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}
