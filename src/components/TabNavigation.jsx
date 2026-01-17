import React from 'react';
import { CreditCard, Grid } from 'lucide-react';

export default function TabNavigation({ activeTab, isSpecOpen, onSwitchTab }) {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-20 pb-2">
      <button
        className={`flex flex-col items-center justify-center w-full h-full transition-colors border-t-2 ${
          activeTab === 'card' && !isSpecOpen
            ? 'text-blue-600 border-blue-600'
            : 'text-slate-400 border-transparent'
        }`}
        onClick={() => onSwitchTab('card')}
      >
        <CreditCard className={`w-6 h-6 mb-1 ${activeTab === 'card' && !isSpecOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] font-bold">명함</span>
      </button>

      <button
        className={`flex flex-col items-center justify-center w-full h-full transition-colors border-t-2 ${
          activeTab === 'catalog' && !isSpecOpen
            ? 'border-yellow-600'
            : 'border-transparent'
        }`}
        style={{
          color: activeTab === 'catalog' && !isSpecOpen ? '#ca8a04' : '#94a3b8'
        }}
        onClick={() => onSwitchTab('catalog')}
      >
        <Grid className={`w-6 h-6 mb-1 ${activeTab === 'catalog' && !isSpecOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] font-bold">카탈로그</span>
      </button>
    </div>
  );
}