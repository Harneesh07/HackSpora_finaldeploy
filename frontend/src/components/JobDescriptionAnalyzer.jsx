import React, { useState } from 'react';
import { FileSearch, CheckCircle2, Circle, Loader2, Sparkles, X, ExternalLink, BookOpen, Video, Globe, Award, Code, ArrowRight, Target, GraduationCap } from 'lucide-react';
import { analyzeJobDescription } from '../services/api';

export default function JobDescriptionAnalyzer({ candidateSkills }) {
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedMissingSkill, setSelectedMissingSkill] = useState(null);

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeJobDescription(jdText, candidateSkills || ['React', 'JavaScript', 'Node.js', 'SQL']);
      setAnalysisResult(res.analysis);
    } catch (err) {
      console.error('Failed to analyze JD:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg my-8 relative">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-blue-400" />
            Analyze a Custom Job Description
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Paste any arbitrary job description below to test your resume alignment and extract required skills.
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <textarea
          rows={5}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste job posting description text here (e.g., We are seeking a Full Stack Developer with React, Node.js, TypeScript, Docker...)"
          className="w-full p-4 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={!jdText.trim() || isAnalyzing}
          className={`px-6 py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center space-x-2 ${
            jdText.trim() && !isAnalyzing
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25'
              : 'bg-slate-100 text-slate-500 border border-slate-300/50 cursor-not-allowed'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Analyzing Job Description...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Analyze Job Description</span>
            </>
          )}
        </button>
      </div>

      {/* Analysis Output */}
      {analysisResult && (
        <div className="mt-6 p-5 rounded-xl bg-white border border-slate-200 space-y-5 text-left">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Custom JD Alignment</span>
              <div className="text-2xl font-extrabold text-blue-400 mt-0.5">{analysisResult.match_score}% Match</div>
            </div>

            <div className="text-right text-xs text-slate-600">
              {analysisResult.jd_skills_detected?.length || 0} Skills Extracted from JD
            </div>
          </div>

          {/* Missing Skill Callout Banner if Gaps Exist */}
          {analysisResult.missing_skills && analysisResult.missing_skills.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-500/40 flex items-center justify-between gap-3 text-xs text-amber-300">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>{analysisResult.missing_skills.length} Skill Gap{analysisResult.missing_skills.length > 1 ? 's' : ''} Detected!</strong> Click any missing skill pill below to open its GeeksforGeeks, YouTube & Multi-Platform Learning Roadmap.
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Matched Skills */}
            <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Matched Skills ({analysisResult.matched_skills?.length || 0})
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysisResult.matched_skills?.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-emerald-50/70 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills with Pop-Up Action Trigger */}
            <div className="p-4 rounded-xl bg-amber-50/20 border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Circle className="w-4 h-4 text-amber-400" />
                Missing Skills / Gaps ({analysisResult.missing_skills?.length || 0})
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {analysisResult.missing_skills?.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMissingSkill(s)}
                    className="px-3 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-900 text-amber-200 text-xs font-bold border border-amber-500/40 transition-all flex items-center space-x-1.5 shadow-sm group"
                  >
                    <span>{s}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold group-hover:bg-amber-500/30">
                      ⚡ Learn {s} Path
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* LEARNING PATH POP-UP MODAL */}
      {selectedMissingSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-blue-500/50 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative text-left my-8">
            
            {/* Pop-Up Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    Custom JD Skill Gap Recovery
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                    Target: 100% Alignment
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  Learning Path & Mastery Roadmap: <span className="text-amber-300">{selectedMissingSkill}</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Follow this curated multi-platform roadmap to master <strong>{selectedMissingSkill}</strong> and successfully apply for this position.
                </p>
              </div>

              <button
                onClick={() => setSelectedMissingSkill(null)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Platform Links Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-400" />
                Recommended Learning Platforms & Resources
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* 1. GeeksforGeeks */}
                <a
                  href={`https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(selectedMissingSkill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-slate-100/90 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between group space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-400 transition-colors">GeeksforGeeks Tutorials</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                      Articles & Docs
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive article documentation, code syntax, and practice exercises on GeeksforGeeks for {selectedMissingSkill}.
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400 pt-1">
                    <span>Read GeeksforGeeks Articles</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* 2. YouTube Courses */}
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMissingSkill)}+full+course+beginners+tutorial`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-slate-100/90 border border-red-500/30 hover:border-red-500/60 transition-all flex flex-col justify-between group space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-red-400" />
                      <span className="font-bold text-sm text-slate-900 group-hover:text-red-400 transition-colors">YouTube Video Workshops</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-extrabold border border-red-500/30">
                      Full Video Course
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Free step-by-step video courses and complete beginner-to-advanced playlists for {selectedMissingSkill}.
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-bold text-red-400 pt-1">
                    <span>Watch YouTube Playlist</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* 3. W3Schools & Web Guides */}
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(selectedMissingSkill)}+tutorial+w3schools+geeksforgeeks`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-slate-100/90 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex flex-col justify-between group space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-sm text-slate-900 group-hover:text-cyan-400 transition-colors">W3Schools & Web Guides</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-300 text-[10px] font-extrabold border border-cyan-500/30">
                      Interactive Playgrounds
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Interactive code playgrounds, reference guides, and quick syntax cheatsheets for {selectedMissingSkill}.
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-bold text-cyan-400 pt-1">
                    <span>Explore Web Guides</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* 4. Coursera Professional Certificates */}
                <a
                  href={`https://www.coursera.org/search?query=${encodeURIComponent(selectedMissingSkill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white hover:bg-slate-100/90 border border-blue-500/30 hover:border-blue-500/60 transition-all flex flex-col justify-between group space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-sm text-slate-900 group-hover:text-blue-400 transition-colors">Coursera Certifications</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-300 text-[10px] font-extrabold border border-blue-500/30">
                      Earn Certificate
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    University specializations and industry certification tracks for {selectedMissingSkill}.
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-bold text-blue-400 pt-1">
                    <span>Browse Coursera Tracks</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

              </div>
            </div>

            {/* 4-Step Mastery & Application Plan */}
            <div className="p-4 rounded-xl bg-white/90 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                4-Step Master Plan: "Master It & Apply For It"
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-blue-400">Step 1: Core Fundamentals</div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Read GeeksforGeeks articles and W3Schools documentation to master syntax, concepts, and primitive patterns.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-red-400">Step 2: Video Workshops</div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Follow along with full YouTube tutorial playlists to build hands-on code modules for {selectedMissingSkill}.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-emerald-400">Step 3: Build & Deploy Project</div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Create a production project featuring {selectedMissingSkill} (e.g., REST service or UI module) and push to GitHub.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-amber-400">Step 4: Master It & Apply!</div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Add {selectedMissingSkill} to your candidate profile to reach 100% Match Alignment and submit your application!
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedMissingSkill(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-700 text-slate-800 text-xs font-semibold transition-colors"
              >
                Close Learning Path
              </button>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <a
                  href={`https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(selectedMissingSkill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20"
                >
                  <span>GeeksforGeeks</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMissingSkill)}+full+course+beginners+tutorial`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-red-600/20"
                >
                  <span>YouTube Video</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

