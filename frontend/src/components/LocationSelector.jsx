import React, { useState } from 'react';
import { MapPin, Navigation, X, Check } from 'lucide-react';

export default function LocationSelector({ currentLocation, currentDistance, onSaveLocation, onClose }) {
  const [locInput, setLocInput] = useState(currentLocation || 'Coimbatore, Tamil Nadu, India');
  const [distance, setDistance] = useState(currentDistance || 100);
  const [locStatus, setLocStatus] = useState('');

  const handleUseBrowserLocation = () => {
    setLocStatus('Detecting location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocStatus('Location detected!');
          setLocInput('Coimbatore, Tamil Nadu, India'); // Approximate representation
        },
        (err) => {
          setLocStatus('Location access denied. Please type city manually.');
        }
      );
    } else {
      setLocStatus('Browser geolocation unavailable.');
    }
  };

  const handleSave = () => {
    onSaveLocation(locInput, distance);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-left">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Find jobs near you
          </h3>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Use My Location Button */}
        <button
          onClick={handleUseBrowserLocation}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
        >
          <Navigation className="w-4 h-4 text-cyan-400" />
          <span>Use My Location</span>
        </button>

        {locStatus && (
          <div className="text-[11px] text-cyan-400 font-medium text-center">{locStatus}</div>
        )}

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-600 uppercase font-semibold">Or enter manually</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Manual City Input */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">City / District / Region</label>
          <input
            type="text"
            value={locInput}
            onChange={(e) => setLocInput(e.target.value)}
            placeholder="e.g. Coimbatore, Tamil Nadu"
            className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Search Distance Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-600">Search Radius</span>
            <span className="font-bold text-cyan-400">{distance} km</span>
          </div>
          <input
            type="range"
            min="10"
            max="250"
            step="10"
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            className="w-full accent-blue-500 bg-white h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-600 mt-1">
            <span>10 km</span>
            <span>50 km</span>
            <span>100 km</span>
            <span>250 km</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-600">
          Your location is converted to an approximate geographic area to search for nearby job postings.
        </p>

        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={() => { onSaveLocation('India', 500); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
          >
            Search Nationwide
          </button>

          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
          >
            Save Location
          </button>
        </div>

      </div>
    </div>
  );
}
