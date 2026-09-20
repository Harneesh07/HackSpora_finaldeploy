import React, { useState } from 'react';
import {
  Search, Target, Code, Star, GitBranch,
  CheckCircle, XCircle, ChevronRight, Activity,
  Map, FileText, AlertCircle, RefreshCw, BarChart2
} from 'lucide-react';
import { GithubIcon as Github } from '../components/icons/GithubIcon';
import { analyzeGitHubProfile } from '../services/githubApi';

const ROLE_OPTIONS = [
  "Java Developer", "Backend Developer", "Full Stack Developer", "Frontend Developer",
  "React Developer", "Spring Boot Developer", "Software Developer", "Software Engineer",
  "Python Developer", "AI/ML Engineer", "Data Analyst", "Data Scientist",
  "DevOps Engineer", "Cloud Engineer", "Mobile App Developer",
  "Cybersecurity Engineer", "Database Developer", "Other"
];

export default function GitHubAnalyzer() {
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0]);
  const [customRole, setCustomRole] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!githubUrl) return;

    setError(null);
    setLoading(true);
    setResult(null);

    const activeRole = selectedRole === "Other" && customRole ? customRole : selectedRole;

    try {
      const data = await analyzeGitHubProfile(githubUrl, activeRole);
      setResult(data);
    } catch (err) {
      setError(err.message || "GitHub profile could not be analyzed. Please check the profile URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-2">
          <Github className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">GitHub Profile Analyzer</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Analyze your public GitHub repositories and discover how well your projects match your target career.
        </p>
      </div>

      {/* Input Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleAnalyze} className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                GitHub Profile URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username"
                  className="block w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Target Job Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Target className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  className="block w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 appearance-none transition-colors"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {ROLE_OPTIONS.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedRole === "Other" && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Custom Job Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blockchain Developer"
                  className="block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span>{loading ? 'Analyzing GitHub Profile...' : 'Analyze GitHub Profile'}</span>
          </button>

          {error && (
            <div className="flex items-start space-x-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </form>
      </div>

      {/* Results Section */}
      {result && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Github className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Profile</p>
                <p className="text-lg font-bold text-slate-900 truncate">@{result.summary.username}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><FileText className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Projects Analyzed</p>
                <p className="text-lg font-bold text-slate-900">{result.summary.projectsAnalyzed} / {result.summary.totalRepositories}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Target className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Target Role</p>
                <p className="text-lg font-bold text-slate-900 truncate">{result.summary.targetRole}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-md flex items-center justify-between text-white">
              <div>
                <p className="text-blue-100 font-medium mb-1">GitHub Role Match</p>
                <p className="text-3xl font-extrabold">{result.score}<span className="text-lg text-blue-200 font-medium">/100</span></p>
              </div>
              <BarChart2 className="w-10 h-10 text-blue-200 opacity-80" />
            </div>
          </div>

          {/* AI Explanation & Score Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                <h3 className="font-bold text-slate-800">AI Explanation</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed text-lg">{result.aiExplanation}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Score Breakdown</h3>
              </div>
              <div className="p-6 space-y-5">
                {result.scoreBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{item.category}</span>
                      <span className="text-sm font-bold text-slate-900">{item.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-green-50 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-green-900">YOUR CURRENT SKILLS</h3>
              </div>
              <div className="p-6">
                {result.skillsDetected.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.skillsDetected.map((skill, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No relevant skills detected in public repositories.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-red-50 flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-red-900">SKILLS TO ADD</h3>
              </div>
              <div className="p-6">
                {result.missingSkills.length > 0 ? (
                  <div className="space-y-4">
                    {result.missingSkills.slice(0, 5).map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="mt-0.5"><XCircle className="w-4 h-4 text-red-500" /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.skill}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">You have all the core skills for this role!</p>
                )}
              </div>
            </div>
          </div>

          {/* Analyzed Repositories */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center text-lg">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                Analyzed Repositories
              </h3>
              <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {result.repositories.length} top matching
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {result.repositories.map((repo, i) => (
                <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <a href={repo.url} target="_blank" rel="noreferrer" className="text-lg font-bold text-blue-600 hover:underline">
                          {repo.name}
                        </a>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${repo.roleRelevance === 'High' ? 'bg-green-50 text-green-700 border-green-200' :
                          repo.roleRelevance === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                          {repo.roleRelevance} Relevance
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{repo.description || "No description available."}</p>
                      <div className="flex flex-wrap gap-2">
                        {repo.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end space-y-3 min-w-[200px]">
                      <div className="flex space-x-4 text-sm text-slate-500">
                        <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-slate-400" /> {repo.stars}</div>
                        <div className="flex items-center"><GitBranch className="w-4 h-4 mr-1 text-slate-400" /> {repo.forks}</div>
                        <div className="flex items-center"><Activity className="w-4 h-4 mr-1 text-slate-400" /> {repo.activity} Activity</div>
                      </div>
                      {repo.detectedSkills.length > 0 && (
                        <div className="w-full">
                          <p className="text-xs text-slate-500 mb-1 md:text-right">Detected Skills:</p>
                          <div className="flex flex-wrap gap-1 md:justify-end">
                            {repo.detectedSkills.map((skill, idx) => (
                              <span key={idx} className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {result.repositories.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No public repositories found.
                </div>
              )}
            </div>
          </div>

          {/* Project Recommendations */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-xl flex items-center">
              <Target className="w-6 h-6 mr-2 text-purple-600" />
              Project Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.recommendedProjects.map((proj, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-16 h-16 text-purple-600" />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-slate-900 pr-4">{proj.title}</h4>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0 border ${proj.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                        proj.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {proj.difficulty}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Why this project?</p>
                      <p className="text-sm text-slate-700">{proj.reason}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Skills Added:</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.skillsAdded.map((skill, idx) => (
                          <span key={idx} className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded-md border border-purple-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Roadmap */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10">
              <Map className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="font-extrabold text-white text-2xl mb-2">Your AI Career Roadmap</h3>
              <p className="text-slate-400 mb-8 max-w-2xl">Follow these personalized steps based on your current GitHub profile to become a top-tier {result.summary.targetRole}.</p>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {result.roadmap.map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-blue-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                      {step.step}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-md">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white text-lg">{step.title}</h4>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
