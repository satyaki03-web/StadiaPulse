import React from 'react';
import Chat from './Chat';

export default function OpsGPTView() {
  return (
    <div className="h-full flex items-center justify-center p-2">
      <div className="w-full max-w-5xl h-[85vh] border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a] flex flex-col shadow-2xl">
        <Chat />
      </div>
    </div>
  );
}
