import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';
import { Search, MapPin, Filter } from 'lucide-react';
import { getFallbackJobResults } from '../services/api';

export default function JobsPage({ marketResults, location, onLearnSkill }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [showAllJobs, setShowAllJobs] = useState(true);

  // Multi-tier defensive job list resolution
  const fallbackJobData = getFallbackJobResults(location);
  const jobs = (marketResults?.ranked_jobs && marketResults.ranked_jobs.length > 0)
    ? marketResults.ranked_jobs
    : (marketResults?.jobs && marketResults.jobs.length > 0)
      ? marketResults.jobs
      : fallbackJobData.ranked_jobs;

  const linkedinCount = jobs.filter(j => j.job.source === 'LinkedIn').length;
  const indeedCount = jobs.filter(j => j.job.source === 'Indeed').length;
  const naukriCount = jobs.filter(j => j.job.source === 'Naukri').length;

  const filteredJobs = jobs.filter(item => {
    const titleMatch = item.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const platformMatch = platformFilter === 'All' || item.job.source === platformFilter;
    return titleMatch && platformMatch;
  });

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Live Market Job Intelligence</h1>
          <p className="text-sm text-slate-600 mt-1">
            Matched {jobs.length} total active job positions from LinkedIn, Indeed, and Naukri with full details & working apply links.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setPlatformFilter('LinkedIn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'LinkedIn' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50/80 border border-blue-500/40 text-blue-300 hover:bg-blue-900/80'}`}>
            LinkedIn: {linkedinCount}
          </button>
          <button 
            onClick={() => setPlatformFilter('Indeed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'Indeed' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80'}`}>
            Indeed: {indeedCount}
          </button>
          <button 
            onClick={() => setPlatformFilter('Naukri')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'Naukri' ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-50/80 border border-purple-500/40 text-purple-300 hover:bg-purple-900/80'}`}>
            Naukri: {naukriCount}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, company, or technology..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          {['All', 'LinkedIn', 'Indeed', 'Naukri'].map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                platformFilter === plat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200'
              }`}
            >
              {plat} ({plat === 'All' ? jobs.length : plat === 'LinkedIn' ? linkedinCount : plat === 'Indeed' ? indeedCount : naukriCount})
            </button>
          ))}
        </div>

      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedJobs.map((jResult, idx) => (
          <JobCard
            key={idx}
            jobResult={jResult}
            onViewDetails={(jobRes) => setSelectedJob(jobRes)}
          />
        ))}
      </div>

      {/* See More Jobs Button */}
      {filteredJobs.length > 9 && (
        <div className="text-center pt-4">
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
