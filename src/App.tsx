/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OpsGPTView from './components/OpsGPTView';
import MultilingualComm from './components/MultilingualComm';
import TransitGrid from './components/TransitGrid';

export default function App() {
  const [activeTab, setActiveTab] = useState('heatmap');

  const renderContent = () => {
    switch (activeTab) {
      case 'heatmap':
        return <Dashboard />;
      case 'opsgpt':
        return <OpsGPTView />;
      case 'multilingual':
        return <MultilingualComm />;
      case 'transit':
        return <TransitGrid />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 font-mono">
            Module "{activeTab}" is initializing...
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-gray-200 font-sans overflow-hidden selection:bg-emerald-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

