import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import JobsPage from './pages/JobsPage';
import LocationSelector from './components/LocationSelector';
import { SkillGap, Projects, Profile, CustomJD } from './pages/PlaceholderPages';
import GitHubAnalyzer from './pages/GitHubAnalyzer';
import { fetchDemoResume, uploadResumeFile, uploadResumeText, fetchMarketAnalysis } from './services/api';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

export default function App() {
  const [candidate, setCandidate] = useState(null);
  const [marketResults, setMarketResults] = useState(null);
  const [location, setLocation] = useState('Coimbatore, Tamil Nadu, India');
  const [distanceKm, setDistanceKm] = useState(100);
  const [lastAnalyzedTime, setLastAnalyzedTime] = useState('4:35 PM');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const formatCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    handleRunDemoSilent();
  }, []);

  const handleRunDemoSilent = async () => {
    try {
      const demoCand = await fetchDemoResume();
      setCandidate(demoCand);
      const skills = demoCand.skills ? demoCand.skills.map(s => s.name) : [];
      const mResults = await fetchMarketAnalysis(skills, location);
      setMarketResults(mResults);
    } catch (err) {
      console.error('Silent demo init error:', err);
    }
  };

  const handleRunDemo = async () => {
    setIsLoading(true);
    try {
      const demoCand = await fetchDemoResume();
      setCandidate(demoCand);
      const skills = demoCand.skills ? demoCand.skills.map(s => s.name) : [];
      const mResults = await fetchMarketAnalysis(skills, location);
      setMarketResults(mResults);
      setLastAnalyzedTime(formatCurrentTime());
    } catch (err) {
      console.error('Demo load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    try {
      const uploadedCand = await uploadResumeFile(file);
      setCandidate(uploadedCand);
      const skills = uploadedCand.skills ? uploadedCand.skills.map(s => s.name) : [];
      const mResults = await fetchMarketAnalysis(skills, location);
      setMarketResults(mResults);
      setLastAnalyzedTime(formatCurrentTime());
    } catch (err) {
      alert(`Resume Parsing Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextUpload = async (text) => {
    setIsLoading(true);
    try {
      const parsedCand = await uploadResumeText(text);
      setCandidate(parsedCand);
      const skills = parsedCand.skills ? parsedCand.skills.map(s => s.name) : [];
      const mResults = await fetchMarketAnalysis(skills, location);
      setMarketResults(mResults);
      setLastAnalyzedTime(formatCurrentTime());
    } catch (err) {
      alert(`Resume Text Parsing Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunLiveSearch = async () => {
    if (!candidate) return;
    setIsSearching(true);
    try {
      const skills = candidate.skills ? candidate.skills.map(s => s.name) : [];
      const mResults = await fetchMarketAnalysis(skills, location);
      setMarketResults(mResults);
      setLastAnalyzedTime(formatCurrentTime());
    } catch (err) {
      console.error('Live search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveLocation = (newLoc, newDist) => {
    setLocation(newLoc);
    setDistanceKm(newDist);
    if (candidate) {
      const skills = candidate.skills ? candidate.skills.map(s => s.name) : [];
      fetchMarketAnalysis(skills, newLoc).then(res => setMarketResults(res));
    }
  };

  const handleLearnSkill = (skill) => {
    const el = document.getElementById('learning-roadmap');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Application Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Navbar
                    location={location}
                    onOpenLocationModal={() => setShowLocationModal(true)}
                    onRunDemo={handleRunDemo}
                  />

                  <Routes>
                    <Route path="/dashboard" element={<Home onRunDemo={handleRunDemo} />} />
                    <Route
                      path="/analyzer"
                      element={
                        <Analyzer
                          candidate={candidate}
                          marketResults={marketResults}
                          isSearching={isSearching}
                          isLoading={isLoading}
                          location={location}
                          distanceKm={distanceKm}
                          lastAnalyzedTime={lastAnalyzedTime}
                          onFileUpload={handleFileUpload}
                          onTextUpload={handleTextUpload}
                          onRunDemo={handleRunDemo}
                          onRunLiveSearch={handleRunLiveSearch}
                          onLearnSkill={handleLearnSkill}
                        />
                      }
                    />
                    <Route
                      path="/jobs"
                      element={
                        <JobsPage
                          marketResults={marketResults}
                          location={location}
                        />
                      }
                    />
                    <Route path="/skill-gap" element={<SkillGap marketResults={marketResults} />} />
                    <Route path="/projects" element={<Projects candidate={candidate} />} />
                    <Route path="/custom-jd" element={<CustomJD candidate={candidate} />} />
                    <Route path="/github-analyzer" element={<GitHubAnalyzer />} />

                    <Route
                      path="/implementation"
                      element={
                        <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-8">
                          <h1 className="text-3xl font-extrabold text-slate-900">Architecture & Methodology</h1>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            ResumeIQ uses a deterministic NLP parser combined with vector similarity math (NumPy) and dataset aggregations (Pandas) to analyze career readiness against real job requirements.
                          </p>
                          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
                            <h3 className="text-base font-bold text-blue-400">Match Scoring Algorithm</h3>
                            {candidate && (
                              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                                <p className="text-sm font-semibold text-slate-800">Your Current Score: <span className="text-blue-600">{candidate.resume_score}%</span></p>
                              </div>
                            )}
                            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
                              <li><strong>Required Skills Coverage (50%)</strong>: Vector dot product candidate skill set vs explicit job prerequisites.</li>
                              <li><strong>Preferred Skills Coverage (25%)</strong>: Match score for optional or nice-to-have technologies.</li>
                              <li><strong>Experience Alignment (10%)</strong>: Years of hands-on experience and title relevance.</li>
                              <li><strong>Role Title Similarity (10%)</strong>: Cosine match between candidate target role and posting title.</li>
                              <li><strong>Geographic Relevance (5%)</strong>: Haversine distance from candidate location.</li>
                            </ul>
                          </div>
                        </div>
                      }
                    />

                    <Route path="/profile" element={<Profile candidate={candidate} />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>

                  {showLocationModal && (
                    <LocationSelector
                      currentLocation={location}
                      currentDistance={distanceKm}
                      onSaveLocation={handleSaveLocation}
                      onClose={() => setShowLocationModal(false)}
                    />
                  )}
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
