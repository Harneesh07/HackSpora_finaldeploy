import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Floating Menu Button (Visible when sidebar is closed) */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900"
          title="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-slate-50 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-700">ResumeIQ</span>
              <span>— AI Resume Analyzer + Live Job Market Intelligence</span>
            </div>
            <div>
              <span>Powered by FastAPI · Pandas · NumPy · React</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
