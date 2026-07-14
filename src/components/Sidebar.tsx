import React from 'react';
import { Map, MessageSquare, Globe2, Train, Activity, Shield } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'heatmap', icon: Map, label: 'Live Crowd Heatmap' },
  { id: 'opsgpt', icon: MessageSquare, label: 'OpsGPT Assistant' },
  { id: 'multilingual', icon: Globe2, label: 'Multilingual Comm' },
  { id: 'transit', icon: Train, label: 'Transit & Grid' },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside aria-label="Main Navigation" className="w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col z-20 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-gray-800 shrink-0">
        <Activity className="w-6 h-6 text-emerald-400 mr-3" aria-hidden="true" />
        <span className="text-white font-bold tracking-wider text-lg">StadiaPulse</span>
      </div>
      
      <nav aria-label="Sidebar Modules" className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 px-2" id="nav-heading">Core Modules</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            aria-current={activeTab === item.id ? "page" : undefined}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
              activeTab === item.id 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800" role="status" aria-live="polite">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-2">
            <Shield className="w-4 h-4 text-blue-400" aria-hidden="true" />
            Security Status
          </div>
          <div className="text-sm text-emerald-400 font-medium">ALPHA SECURE</div>
          <div className="text-[10px] text-gray-500 mt-1">E2E Encryption Active</div>
        </div>
      </div>
    </aside>
  );
}
