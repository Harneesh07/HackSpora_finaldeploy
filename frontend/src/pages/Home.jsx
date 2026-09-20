import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Upload, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home({ onRunDemo }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <HeroSection
        onAnalyzeClick={() => navigate('/analyzer')}
        onRunDemo={onRunDemo}
        onHowItWorksClick={() => navigate('/implementation')}
      />

      {/* How It Works Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How ResumeIQ Works
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            A complete career intelligence engine combining NLP skill extraction, live market data, and Pandas analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
              1
            </div>
            <h3 className="text-base font-bold text-slate-800">Upload & Extract</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your PDF or DOCX resume. NLP algorithms extract skills, experience, and contact metadata.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              2
            </div>
            <h3 className="text-base font-bold text-slate-800">Live Job Search</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fetches active postings near your location from LinkedIn, Indeed, and Naukri in real time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
              3
            </div>
            <h3 className="text-base font-bold text-slate-800">Pandas & NumPy Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates vector match alignment, platform frequency statistics, and skill gap priorities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              4
            </div>
            <h3 className="text-base font-bold text-slate-800">Roadmap & Apply</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get personalized skill recommendations and direct application links to open listings.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
