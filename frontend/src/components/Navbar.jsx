import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEARCH_ITEMS = [
  { title: 'Dashboard', path: '/dashboard', type: 'Page' },
  { title: 'Resume Analyzer', path: '/analyzer', type: 'Page' },
  { title: 'Job Matching', path: '/jobs', type: 'Page' },
  { title: 'Analyze JD', path: '/custom-jd', type: 'Page' },
  { title: 'Skill Gap', path: '/skill-gap', type: 'Page' },
  { title: 'Projects', path: '/projects', type: 'Page' },
  { title: 'Implementation Details', path: '/implementation', type: 'Page' },
  { title: 'User Profile', path: '/profile', type: 'Page' },
];

export default function Navbar({ location, onOpenLocationModal, onRunDemo }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = SEARCH_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (path) => {
    setSearchTerm('');
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="w-full pr-4 pl-16 sm:pr-6 sm:pl-20 lg:pr-8 lg:pl-20 h-16 flex items-center justify-between">
        
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative hidden sm:block" ref={dropdownRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors bg-white focus:bg-white text-slate-900"
            />
          </div>
          
          {/* Dropdown */}
          {showDropdown && searchTerm && (
            <div className="absolute mt-1 w-full bg-white shadow-lg rounded-lg border border-slate-100 py-1 z-50 max-h-60 overflow-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex flex-col"
                  >
                    <span className="font-medium text-slate-900">{item.title}</span>
                    <span className="text-xs text-slate-500">{item.type}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-slate-500 text-center">
                  No results found for "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tagline (Hidden on smaller screens to avoid crowding) */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
          <p className="text-base font-medium text-slate-600 truncate select-none">
            <span className="text-blue-600 font-extrabold text-lg tracking-wide">AI-powered</span> career insights from your <span className="text-blue-600 font-bold">skills</span> and <span className="text-blue-600 font-bold">projects</span>
          </p>
        </div>

        {/* Right Actions: Location & Demo */}
        <div className="flex items-center space-x-3 ml-auto pl-4">
          <button
            onClick={onOpenLocationModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300/60 text-xs font-medium text-slate-700 hover:border-slate-500 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[80px] sm:max-w-[130px] truncate">{location.split(',')[0]}</span>
          </button>

          <button
            onClick={onRunDemo}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap"
          >
            Try Demo Resume
          </button>
        </div>

      </div>
    </header>
  );
}
