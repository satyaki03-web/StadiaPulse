import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, AlertTriangle, Maximize2, Activity, ShieldAlert } from 'lucide-react';

interface VirtualStadiumProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualStadium({ isOpen, onClose }: VirtualStadiumProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-6xl h-full max-h-[85vh] bg-[#050505] border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-800 bg-[#0a0a0a] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Maximize2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Virtual Stadium Matrix</h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE 3D TELEMETRY &bull; METLIFE STADIUM
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Visualizer Area */}
            <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-800 p-8 flex items-center justify-center">
              
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

              {/* The SVG Stadium */}
              <div className="relative w-full max-w-3xl aspect-[16/10] animate-[pulse_8s_ease-in-out_infinite]">
                <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="15" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#064e3b" stopOpacity="0.5" />
                    </radialGradient>
                    <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1f2937" />
                      <stop offset="50%" stopColor="#111827" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                  </defs>

                  {/* Outer Concourses */}
                  <rect x="50" y="50" width="700" height="400" rx="150" fill="none" stroke="#1f2937" strokeWidth="2" strokeDasharray="10 5" opacity="0.5" />
                  <rect x="100" y="70" width="600" height="360" rx="120" fill="none" stroke="#374151" strokeWidth="40" opacity="0.3" />
                  
                  {/* Seating Tiers */}
                  <rect x="140" y="90" width="520" height="320" rx="100" fill="url(#standGrad)" stroke="#4b5563" strokeWidth="2" />
                  <rect x="180" y="120" width="440" height="260" rx="80" fill="#0f172a" stroke="#1e293b" strokeWidth="6" />

                  {/* Pitch */}
                  <rect x="250" y="160" width="300" height="180" fill="url(#pitchGlow)" stroke="#10b981" strokeWidth="2" opacity="0.8" />
                  {/* Pitch Markings */}
                  <circle cx="400" cy="250" r="30" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                  <line x1="400" y1="160" x2="400" y2="340" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                  <rect x="250" y="200" width="40" height="100" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
                  <rect x="510" y="200" width="40" height="100" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />

                  {/* Heatmap Nodes (Crowd Density) */}
                  {/* Sector 1 - Normal */}
                  <circle cx="400" cy="105" r="40" fill="#3b82f6" opacity="0.4" filter="blur(12px)" />
                  {/* Sector 2 - Normal */}
                  <circle cx="200" cy="250" r="50" fill="#10b981" opacity="0.3" filter="blur(15px)" />
                  {/* Sector 3 - Normal */}
                  <circle cx="400" cy="395" r="45" fill="#3b82f6" opacity="0.3" filter="blur(12px)" />
                  
                  {/* SECTOR 4 - CONGESTED (Red) */}
                  <circle cx="620" cy="250" r="60" fill="#ef4444" opacity="0.6" filter="blur(15px)" className="animate-[pulse_2s_ease-in-out_infinite]" />
                  <circle cx="620" cy="250" r="20" fill="#ef4444" opacity="0.9" filter="url(#glow)" className="animate-ping" />

                  {/* Overlay Data Points */}
                  <g transform="translate(365, 95)">
                    <circle cx="0" cy="0" r="4" fill="#60a5fa" />
                    <text x="12" y="4" fill="#9ca3af" fontSize="12" fontFamily="monospace">SEC-1: 18k</text>
                  </g>
                  
                  <g transform="translate(170, 245)">
                    <circle cx="0" cy="0" r="4" fill="#34d399" />
                    <text x="12" y="4" fill="#9ca3af" fontSize="12" fontFamily="monospace">SEC-2: 12k</text>
                  </g>

                  <g transform="translate(365, 405)">
                    <circle cx="0" cy="0" r="4" fill="#60a5fa" />
                    <text x="12" y="4" fill="#9ca3af" fontSize="12" fontFamily="monospace">SEC-3: 15k</text>
                  </g>

                  <g transform="translate(630, 245)">
                    <rect x="10" y="-12" width="90" height="20" fill="#ef4444" opacity="0.2" rx="4" />
                    <rect x="10" y="-12" width="90" height="20" fill="none" stroke="#ef4444" strokeWidth="1" rx="4" />
                    <circle cx="0" cy="0" r="4" fill="#f87171" className="animate-pulse" />
                    <text x="16" y="2" fill="#fca5a5" fontSize="11" fontFamily="monospace" fontWeight="bold">SEC-4: 28k!</text>
                  </g>
                </svg>

                {/* Floating Warning Tag */}
                <div className="absolute top-1/2 right-[5%] -translate-y-12 translate-x-4">
                   <div className="bg-red-500/10 border border-red-500/50 p-2 md:p-3 rounded-lg flex flex-col gap-1 shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-md">
                     <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                       <ShieldAlert className="w-4 h-4 animate-pulse" />
                       Critical Load
                     </div>
                     <span className="text-[10px] text-red-200 font-mono">140% Capacity at Gate E</span>
                   </div>
                </div>

              </div>
            </div>

            {/* Sidebar Stats Panel */}
            <div className="w-full lg:w-80 bg-[#0a0a0a] p-6 flex flex-col gap-6 overflow-y-auto">
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Sector Analysis
                </h3>
                
                <div className="space-y-4">
                  {/* Sector 1 */}
                  <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400 font-mono text-xs">Sector 1 (North)</span>
                      <span className="text-blue-400 font-bold text-sm">18,240</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  {/* Sector 4 - Alert */}
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-red-400 font-mono text-xs font-bold">Sector 4 (East)</span>
                      <span className="text-red-400 font-bold text-sm flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        28,950
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-red-500 h-1.5 rounded-full animate-pulse" style={{ width: '95%' }}></div>
                    </div>
                    <p className="text-[10px] text-red-300 mt-2 leading-relaxed">
                      AI recommends opening auxiliary exits 4A and 4B. Rerouting 4,000 incoming fans to Sector 3.
                    </p>
                  </div>

                  {/* Sector 2 */}
                  <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400 font-mono text-xs">Sector 2 (West)</span>
                      <span className="text-emerald-400 font-bold text-sm">12,100</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-800">
                <button className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Execute AI Reroute Protocol
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
