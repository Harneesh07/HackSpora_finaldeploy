import React, { useState } from 'react';
import ResumeUploader from '../components/ResumeUploader';
import CandidateProfile from '../components/CandidateProfile';
import ResumeScoreCard from '../components/ResumeScoreCard';
import RoleCard from '../components/RoleCard';
import LiveSearchProgress from '../components/LiveSearchProgress';
import MarketSummary from '../components/MarketSummary';
import OneSkillAway from '../components/OneSkillAway';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';
import SkillsVsMarketTable from '../components/SkillsVsMarketTable';
import PlatformComparison from '../components/PlatformComparison';
import SkillGapCard from '../components/SkillGapCard';
import LearningRoadmap from '../components/LearningRoadmap';
import JobDescriptionAnalyzer from '../components/JobDescriptionAnalyzer';
import { Sparkles, Briefcase, Filter } from 'lucide-react';

import { getFallbackJobResults } from '../services/api';

export default function Analyzer({
  candidate,
  marketResults,
  isSearching,
  isLoading,
  location,
  distanceKm,
  lastAnalyzedTime,
  onFileUpload,
  onTextUpload,
  onRunDemo,
  onRunLiveSearch,
  onLearnSkill
}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [showUploader, setShowUploader] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(true);

  if (!candidate || showUploader) {
    return (
      <div className="space-y-4">
        {candidate && (
          <div className="max-w-3xl mx-auto pt-6 px-4">
            <button
              onClick={() => setShowUploader(false)}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              ← Back to Extracted Profile Analysis
            </button>
          </div>
        )}
        <ResumeUploader
          onFileUpload={(file) => { setShowUploader(false); onFileUpload(file); }}
          onTextUpload={(text) => { setShowUploader(false); onTextUpload(text); }}
          onRunDemo={() => { setShowUploader(false); onRunDemo(); }}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Multi-tier defensive job list resolution
  const fallbackJobData = getFallbackJobResults(location);
  const allRankedJobs = (marketResults?.ranked_jobs && marketResults.ranked_jobs.length > 0)
    ? marketResults.ranked_jobs
    : (marketResults?.jobs && marketResults.jobs.length > 0)
      ? marketResults.jobs
      : fallbackJobData.ranked_jobs;

  const filteredJobs = activeCategoryFilter === 'All' 
    ? allRankedJobs 
    : allRankedJobs.filter(j => j.match_category === activeCategoryFilter);

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 12);

  const candidateSkillNames = candidate.skills ? candidate.skills.map(s => s.name) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      
      {/* Top Banner / Re-upload button */}
      <div className="flex items-center justify-between bg-white/90 border border-slate-200 p-4 rounded-xl">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Active Candidate Profile</span>
          <h2 className="text-lg font-bold text-slate-900">{candidate.name}</h2>
        </div>
        <button
          onClick={() => setShowUploader(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
        >
          Upload / Replace Resume
        </button>
      </div>

      {/* 1 & 2 & 3. Candidate Overview + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-8">
          <CandidateProfile candidate={candidate} />
        </div>

        <div className="lg:col-span-4">
          <ResumeScoreCard
            score={candidate.resume_score || 82}
            breakdown={candidate.score_breakdown}
          />
        </div>

      </div>

      {/* 4. Recommended Roles */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>Recommended Career Roles</span>
          <span className="text-xs text-slate-600 font-normal">Based on Candidate Skill Vector</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidate.role_recommendations?.map((roleRec, idx) => (
            <RoleCard key={idx} roleRecommendation={roleRec} />
          ))}
        </div>
      </div>

      {/* 5. Validate Against Live Job Market Banner */}
      <LiveSearchProgress
        onRunLiveSearch={onRunLiveSearch}
        isSearching={isSearching}
        lastAnalyzedTime={lastAnalyzedTime}
      />

      {/* 6. Current Market Summary */}
      <MarketSummary
        summary={marketResults}
        location={location}
        distanceKm={distanceKm}
        lastAnalyzedTime={lastAnalyzedTime}
      />

      {/* 8. "You're Almost There / One Skill Away" */}
      <OneSkillAway
        data={marketResults?.one_skill_away}
        onSelectSkillToLearn={onLearnSkill}
      />

      {/* 7 & 9. Job Matches Grid & Filters */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Live Matched Job Opportunities
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Ranked by NumPy skill vector match score, required skill coverage, and recency.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200">
            {['All', 'Best', 'Strong', 'Potential'].map((cat) => {
              const count = cat === 'All' 
                ? allRankedJobs.length 
                : allRankedJobs.filter(j => j.match_category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs Grid */}
        {displayedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedJobs.map((jResult, idx) => (
              <JobCard
                key={idx}
                jobResult={jResult}
                onViewDetails={(jobRes) => setSelectedJob(jobRes)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4">
            <p className="text-sm text-slate-700 font-medium">
              No positions categorized under <span className="text-amber-400 font-bold">"{activeCategoryFilter}"</span> match category.
            </p>
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
            >
              View All {allRankedJobs.length} Live Job Matches
            </button>
          </div>
        )}

        {/* See More Jobs Button */}
        {filteredJobs.length > 12 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllJobs(!showAllJobs)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              {showAllJobs
                ? "Show Less Jobs"
                : `See More Jobs (${filteredJobs.length} Total Matched Positions Available)`}
            </button>
          </div>
        )}
      </div>

      {/* 10. Your Skills vs Current Market Table */}
      <SkillsVsMarketTable
        comparisonData={marketResults?.comparison_table}
      />

      {/* 11. Platform Comparison */}
      <PlatformComparison
        skillFrequencies={marketResults?.skill_frequencies}
      />

      {/* 12. Skill Gap Engine */}
      <SkillGapCard
        skillGaps={marketResults?.skill_gaps}
        onSelectSkillToLearn={onLearnSkill}
      />

      {/* 13. Personalized Learning Roadmap */}
      <LearningRoadmap
        roadmap={marketResults?.learning_roadmap}
      />

      {/* Job Detail Side Drawer Modal */}
      {selectedJob && (
        <JobDetailModal
          jobResult={selectedJob}
          onClose={() => setSelectedJob(null)}
          onLearnSkill={onLearnSkill}
        />
      )}

    </div>
  );
}
