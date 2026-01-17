import React, { useState, useEffect } from 'react';
import { fetchCustomer } from './api';
import EvergreenCard from './EvergreenCard';

function App() {
  const [demoData, setDemoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDemo() {
      setIsLoading(true);
      const data = await fetchCustomer('demo'); // demo는 로컬 폴백 사용됨
      setDemoData(data);
      setIsLoading(false);
    }
    loadDemo();
  }, []);

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