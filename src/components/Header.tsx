import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Users, Wifi, Zap, Activity } from 'lucide-react';

const venuesData = {
  "MetLife Stadium": { baseFans: 82450 },
  "Estadio Azteca": { baseFans: 87523 },
  "BC Place": { baseFans: 54500 },
  "BMO Field": { baseFans: 30000 },
  "Lumen Field": { baseFans: 68740 }
};

type VenueName = keyof typeof venuesData;

export default function Header() {
  const [venue, setVenue] = useState<VenueName>("MetLife Stadium");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [metrics, setMetrics] = useState({
    fans: venuesData["MetLife Stadium"].baseFans,
    ping: 12,
    carbon: 1.200
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      fans: venuesData[venue].baseFans + Math.floor(Math.random() * 100) - 50
    }));
  }, [venue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        fans: prev.fans + Math.floor(Math.random() * 11) - 5,
        ping: Math.floor(10 + Math.random() * 8),
        carbon: prev.carbon + 0.001
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 md:px-6 shrink-0 z-10 sticky top-0">
      
      {/* Mobile Title (Hidden on md+) */}
      <div className="flex md:hidden items-center gap-2">
        <Activity className="w-5 h-5 text-emerald-400" />
        <span className="text-white font-bold tracking-wider">StadiaPulse</span>
      </div>

      {/* Venue Dropdown */}
      <div className="relative hidden md:block" ref={dropdownRef}>
        <button 
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-md px-3 py-1.5 cursor-pointer hover:border-gray-700 transition-colors"
        >
          <span className="text-sm font-medium text-white">{venue}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        
        {isDropdownOpen && (
          <div role="listbox" className="absolute top-full left-0 mt-1 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-xl overflow-hidden z-50">
            {(Object.keys(venuesData) as VenueName[]).map(v => (
              <div 
                key={v}
                role="option"
                aria-selected={v === venue}
                tabIndex={0}
                onClick={() => { setVenue(v); setIsDropdownOpen(false); }}
                onKeyDown={(e) => { if(e.key === 'Enter') { setVenue(v); setIsDropdownOpen(false); } }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-800 transition-colors ${v === venue ? 'text-emerald-400 font-medium' : 'text-gray-300'}`}
              >
                {v}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metrics */}
      <div aria-label="Live Metrics" className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar mask-edges" role="region">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Active Fans</span>
            <span className="text-sm font-bold text-white tracking-tight">{metrics.fans.toLocaleString()}</span>
          </div>
        </div>

        <div className="w-px h-8 bg-gray-800 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Network</span>
            <span className="text-sm font-bold text-white tracking-tight">99.9% / {metrics.ping}ms</span>
          </div>
        </div>

        <div className="w-px h-8 bg-gray-800 hidden md:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-gray-500 uppercase">Carbon Saved</span>
            <span className="text-sm font-bold text-white tracking-tight">{metrics.carbon.toFixed(3)}M kg CO₂</span>
          </div>
        </div>
      </div>
    </header>
  );
}
