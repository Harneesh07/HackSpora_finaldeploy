import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Play, X, Loader2, Type } from 'lucide-react';

export default function ResumeUploader({ onFileUpload, onTextUpload, onRunDemo, isLoading }) {
  const [activeTab, setActiveTab] = useState('file'); // 'file' or 'text'
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMsg('');
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    const ext = file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) && !['pdf', 'docx', 'doc', 'txt'].includes(ext)) {
      setErrorMsg('Invalid file format. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10 MB limit.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'file' && selectedFile) {
      onFileUpload(selectedFile);
    } else if (activeTab === 'text' && pastedText.trim()) {
      if (pastedText.trim().length < 20) {
        setErrorMsg('Pasted resume text is too short. Please paste at least 20 characters.');
        return;
      }
      onTextUpload(pastedText);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 px-4 text-left">
      <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-xl space-y-6">
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Upload or Paste Your Resume</h2>
          <p className="text-sm text-slate-600">
            Extract User Name, Skills, Summary, Key Achievements & Skill Matches instantly.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center space-x-2 bg-white p-1.5 rounded-xl border border-slate-200 max-w-md mx-auto">
          <button
            onClick={() => { setActiveTab('file'); setErrorMsg(''); }}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'file' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('text'); setErrorMsg(''); }}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'text' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Paste Resume Text</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium flex items-center justify-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* File Upload Mode */}
        {activeTab === 'file' && (
          !selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 cursor-pointer text-center transition-all ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50/20' 
                  : 'border-slate-300/80 bg-white/40 hover:border-slate-500 hover:bg-white/70'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleChange}
                className="hidden"
              />
              
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-blue-400 mb-4">
                <Upload className="w-6 h-6" />
              </div>

              <p className="text-base font-semibold text-slate-800">Drop your resume file here</p>
              <p className="text-xs text-slate-600 mt-1">PDF, DOCX, or TXT · Up to 10 MB or <span className="text-blue-400 underline font-medium">Browse Files</span></p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white border border-slate-300/70 flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-50/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 truncate max-w-xs sm:max-w-md">{selectedFile.name}</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · {selectedFile.name.split('.').pop().toUpperCase()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFile(null)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        )}

        {/* Text Paste Mode */}
        {activeTab === 'text' && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Paste Resume Content</label>
            <textarea
              rows={8}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your full resume text here (e.g. John Doe, Skills: React, Node.js, Python, Work Experience, Achievements...)"
              className="w-full p-4 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading || (activeTab === 'file' ? !selectedFile : !pastedText.trim())}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              !isLoading && ((activeTab === 'file' && selectedFile) || (activeTab === 'text' && pastedText.trim()))
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                : 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300/50'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Resume...</span>
              </>
            ) : (
              <span>Extract & Analyze Resume</span>
            )}
          </button>

          <div className="text-xs text-slate-600 font-medium">or</div>

          <button
            onClick={onRunDemo}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300/80 text-sm font-medium transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span>Try Demo Resume</span>
          </button>
        </div>

      </div>
    </div>
  );
}
