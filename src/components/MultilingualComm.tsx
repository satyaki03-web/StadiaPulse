import React, { useState } from 'react';
import { Globe2, Mic, Volume2, Send, Languages, Activity } from 'lucide-react';

const activeAlerts = [
  { id: 1, lang: 'Spanish', text: 'Por favor proceda a la Puerta B. El flujo de multitudes es alto.', time: '1m ago' },
  { id: 2, lang: 'French', text: 'Veuillez vous diriger vers la porte B. Le flux de foule est important.', time: '1m ago' },
  { id: 3, lang: 'Portuguese', text: 'Por favor, dirija-se ao Portão B. O fluxo de pessoas é alto.', time: '2m ago' },
];

export default function MultilingualComm() {
  const [text, setText] = useState('');
  
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl flex flex-col flex-1 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Global PA Broadcast</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AI TRANSLATION ACTIVE
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter announcement here for auto-translation and stadium-wide broadcast..."
              className="w-full h-40 bg-black/50 border border-gray-800 rounded-lg p-4 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none transition-all font-sans"
            />
            
            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                <Send className="w-4 h-4" /> Broadcast to Zones
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-gray-700">
                <Mic className="w-4 h-4 text-gray-400" /> Dictate Message
              </button>
            </div>
            
            <div className="mt-8 border-t border-gray-800 pt-6">
              <h3 className="text-xs font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
                <Languages className="w-4 h-4" /> Target Languages (Auto-Detected by Sector)
              </h3>
              <div className="flex flex-wrap gap-3">
                {['English (Primary)', 'Spanish (Sec 4)', 'French (VIP)', 'Portuguese (Sec 1)', 'German', 'Arabic'].map((lang, i) => (
                  <div key={lang} className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 border ${i < 4 ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-gray-900 border-gray-700 text-gray-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${i < 4 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl flex flex-col shadow-2xl">
        <div className="p-4 border-b border-gray-800 bg-[#0c0c0c] flex items-center justify-between">
           <h2 className="text-sm font-semibold text-white flex items-center gap-2">
             <Volume2 className="w-4 h-4 text-emerald-400" />
             Live Translations Feed
           </h2>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-4 relative">
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          
          {activeAlerts.map(alert => (
             <div key={alert.id} className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg relative overflow-hidden group">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 group-hover:bg-blue-400 transition-colors"></div>
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-mono uppercase font-bold tracking-wider">{alert.lang}</span>
                 <span className="text-[10px] text-gray-500 font-mono">{alert.time}</span>
               </div>
               <p className="text-sm text-gray-300 leading-relaxed">{alert.text}</p>
             </div>
          ))}

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-mono">
            <Activity className="w-4 h-4 animate-pulse" />
            Monitoring PA Systems...
          </div>
        </div>
      </div>
    </div>
  );
}
