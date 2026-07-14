import React, { useState } from 'react';
import { AlertTriangle, Cpu, Zap, Activity, Maximize2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Chat from './Chat';
import VirtualStadium from './VirtualStadium';

const energyData = [
  { time: '18:00', expected: 80, optimized: 80 },
  { time: '18:15', expected: 85, optimized: 75 },
  { time: '18:30', expected: 90, optimized: 70 },
  { time: '18:45', expected: 95, optimized: 65 },
  { time: '19:00', expected: 100, optimized: 60 },
  { time: '19:15', expected: 90, optimized: 55 },
  { time: '19:30', expected: 95, optimized: 50 },
];

const alerts = [
  { id: 1, type: 'action', text: 'Auto-translated evacuation route sent to 4,000 Spanish-speaking fans at Gate B.', time: '2m ago' },
  { id: 2, type: 'predictive', text: 'Predictive model suggests deploying 5 extra staff to Concourse C in 10 mins.', time: '5m ago' },
  { id: 3, type: 'system', text: 'HVAC Sector 2 load reduced by 15% due to lower thermal density.', time: '12m ago' },
  { id: 4, type: 'action', text: 'Dynamic turnstile allocation activated for Gate E to reduce 5min queue.', time: '18m ago' },
];

export default function Dashboard() {
  const [isStadiumOpen, setIsStadiumOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[800px]">
        {/* Left Column (Widgets) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Top Row: Map & Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
            
            {/* Widget 1: Crowd Control Map */}
            <div 
              onClick={() => setIsStadiumOpen(true)}
              className="bg-[#0a0a0a] border border-gray-800 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] rounded-xl flex flex-col overflow-hidden relative group cursor-pointer transition-all duration-300"
            >
              <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400 group-hover:text-emerald-400 transition-colors" />
                  <h2 className="text-sm font-semibold text-white">Live Crowd Radar</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs text-gray-500 font-mono">LIVE FEED</span>
                </div>
              </div>
              
              <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black p-4 flex items-center justify-center overflow-hidden">
                {/* Simulated Radar/Map */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                <div className="relative w-[250px] h-[250px] shrink-0 rounded-full border border-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-2 rounded-full border border-gray-800/50"></div>
                  <div className="absolute inset-8 rounded-full border border-gray-800/30"></div>
                  
                  {/* Radar Sweep */}
                  <div className="absolute inset-0 rounded-full border-r-2 border-emerald-500/50 animate-spin" style={{ animationDuration: '4s' }}>
                    <div className="w-full h-full bg-gradient-to-tr from-emerald-500/0 to-emerald-500/10 rounded-full"></div>
                  </div>

                  {/* Nodes */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                  <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-emerald-500 rounded-full"></div>
                  
                  {/* Sector 4 Congestion Alert */}
                  <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center animate-ping">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/3 right-1/3 translate-x-3 -translate-y-4">
                    <div className="bg-red-500/10 border border-red-500/50 px-2 py-0.5 rounded text-[10px] text-red-400 font-mono font-bold flex items-center gap-1 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <AlertTriangle className="w-3 h-3" />
                      SECTOR 4
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full font-mono text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                    OPEN VIRTUAL STADIUM
                  </div>
                </div>
              </div>
            </div>

          {/* Widget 2: AI Alerts Feed */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">Active GenAI Decisions</h2>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">AUTONOMOUS</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
               <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
               <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
              
              {alerts.map((alert) => (
                <div key={alert.id} className="relative pl-4 pb-4 border-l border-gray-800 last:border-transparent last:pb-0">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gray-900 border-2 border-gray-700"></div>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                      alert.type === 'action' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      alert.type === 'predictive' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      'bg-gray-800 text-gray-400 border-gray-700'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-[10px] text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mt-1.5">{alert.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 3: Sustainability Chart */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl flex flex-col flex-1 min-h-[300px]">
          <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">Dynamic Energy Optimization</h2>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                <span className="text-[10px] text-gray-400 uppercase font-mono">Baseline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-[10px] text-cyan-400 uppercase font-mono">AI Optimized</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 pb-0 pt-6 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}kW`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e7eb', fontSize: '12px' }}
                  labelStyle={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="expected" stroke="#4b5563" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="optimized" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorOptimized)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Right Column (Copilot) */}
      <div className="lg:col-span-1 h-[600px] lg:h-auto border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a] flex flex-col relative shadow-2xl">
         <Chat />
      </div>
    </div>
    <VirtualStadium isOpen={isStadiumOpen} onClose={() => setIsStadiumOpen(false)} />
    </>
  );
}
