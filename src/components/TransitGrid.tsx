import React from 'react';
import { Train, Zap, Activity, Battery, MapPin, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trainData = [
  { time: '18:00', load: 40 },
  { time: '18:30', load: 60 },
  { time: '19:00', load: 85 },
  { time: '19:30', load: 110 },
  { time: '20:00', load: 140 },
  { time: '20:30', load: 90 },
];

export default function TransitGrid() {
  return (
    <div className="h-full flex flex-col gap-6 min-h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="bg-[#0a0a0a] border border-gray-800 hover:border-gray-700 transition-colors rounded-xl p-6 flex flex-col gap-4 shadow-xl">
           <div className="flex items-center gap-3 text-cyan-400">
             <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
               <Train className="w-5 h-5" />
             </div>
             <h3 className="font-semibold text-white">Active Transit Shuttles</h3>
           </div>
           <div className="text-4xl font-bold text-white tracking-tight">124<span className="text-sm text-gray-500 font-normal ml-2">units</span></div>
           <div className="text-xs text-gray-400 font-mono flex items-center gap-2 bg-gray-900/50 p-2 rounded-md border border-gray-800">
             <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
             89% EV DEPLOYMENT
           </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#0a0a0a] border border-gray-800 hover:border-gray-700 transition-colors rounded-xl p-6 flex flex-col gap-4 shadow-xl">
           <div className="flex items-center gap-3 text-emerald-400">
             <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
               <Battery className="w-5 h-5" />
             </div>
             <h3 className="font-semibold text-white">Grid Battery Reserves</h3>
           </div>
           <div className="text-4xl font-bold text-white tracking-tight">82%<span className="text-sm text-gray-500 font-normal ml-2">capacity</span></div>
           <div className="text-xs text-gray-400 font-mono flex items-center gap-2 bg-gray-900/50 p-2 rounded-md border border-gray-800">
             <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
             OPTIMAL DISCHARGE RATE
           </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0a0a0a] border border-red-500/30 hover:border-red-500/50 transition-colors rounded-xl p-6 flex flex-col gap-4 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
           <div className="flex items-center gap-3 text-red-400">
             <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
               <MapPin className="w-5 h-5" />
             </div>
             <h3 className="font-semibold text-white">Station Congestion</h3>
           </div>
           <div className="text-4xl font-bold text-red-400 tracking-tight">Secaucus<span className="text-sm text-red-400/50 font-normal ml-2">hub</span></div>
           <div className="text-xs text-red-400 font-mono flex items-center gap-2 bg-red-500/10 p-2 rounded-md border border-red-500/20">
             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
             HIGH VOLUME DETECTED
           </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-xl flex flex-col min-h-[300px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        
        <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between relative z-10">
           <div className="flex items-center gap-3">
             <Activity className="w-5 h-5 text-purple-400" />
             <h2 className="text-sm font-semibold text-white">Predictive Transit Load (Next 3 Hrs)</h2>
           </div>
           <button className="text-[10px] text-purple-300 font-mono uppercase bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-colors px-3 py-1.5 rounded flex items-center gap-2">
             AI Reroute Shuttles <ArrowRight className="w-3 h-3" />
           </button>
        </div>
        
        <div className="flex-1 p-4 pb-0 pt-6 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trainData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} dy={10} fontFamily="monospace" />
              <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}k pax`} fontFamily="monospace" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px', fontFamily: 'monospace' }}
              />
              <Area type="monotone" dataKey="load" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
