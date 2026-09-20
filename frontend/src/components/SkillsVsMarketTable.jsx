import React from 'react';
import { Table, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function SkillsVsMarketTable({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg my-8">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Table className="w-5 h-5 text-blue-400" />
            Your Skills vs Current Market
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Calculated directly from the current live job sample using Pandas data frame aggregation.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">Skill</th>
              <th className="py-3 px-4 font-semibold">Resume Evidence</th>
              <th className="py-3 px-4 font-semibold text-right">Market Demand</th>
              <th className="py-3 px-4 font-semibold text-right">Gap Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {comparisonData.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/60 transition-colors">
                
                <td className="py-3 px-4 font-bold text-slate-800">
                  {item.skill}
                </td>

                <td className="py-3 px-4">
                  {item.resume_status === 'Strong' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50/60 text-emerald-400 border border-emerald-500/30 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Demonstrated
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50/50 text-amber-400 border border-amber-500/30 font-semibold">
                      <Circle className="w-3.5 h-3.5" />
                      Missing
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 text-right font-extrabold text-blue-400">
                  {item.market_demand_pct}%
                </td>

                <td className="py-3 px-4 text-right font-semibold">
                  {item.gap_level === 'Low' ? (
                    <span className="text-emerald-400">Low Gap</span>
                  ) : item.gap_level === 'Medium' ? (
                    <span className="text-amber-400">Medium Priority</span>
                  ) : (
                    <span className="text-red-400 font-bold">High Priority Gap</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
