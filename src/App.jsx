import React from 'react';
import { useCustomer } from './hooks/useCustomer';
import EvergreenCard from './EvergreenCard';

function App() {
  // 'demo' 데이터 로딩 (React Query 사용)
  const { data: demoData, isLoading } = useCustomer('demo');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <EvergreenCard customerData={demoData} customerGuid="demo" />
  )
}

export default App
