import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { fetchCustomer } from './api';
import EvergreenCard from './EvergreenCard';

export default function CardPage() {
  const { guid } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await fetchCustomer(guid);
      setCustomerData(data);
      setIsLoading(false);
    }
    loadData();
  }, [guid]);

  if (isLoading) {
    // 로딩 스피너
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  // 데이터가 없으면 홈(데모)으로 리다이렉트
  if (!customerData) {
    return <Navigate to="/" replace />;
  }

  return <EvergreenCard customerData={customerData} customerGuid={guid} />;
}