import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCustomer } from './hooks/useCustomer';
import EvergreenCard from './EvergreenCard';

export default function CardPage() {
  const { guid } = useParams();
  const { data: customerData, isLoading } = useCustomer(guid);

  if (isLoading) {
    // 로딩 스피너
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  // 데이터가 없으면 홈으로 리다이렉트 (이 부분에서 404 페이지로 보내는 것이 더 좋음)
  if (!customerData) {
    return <Navigate to="/" replace />;
  }

  return <EvergreenCard customerData={customerData} customerGuid={guid} />;
}
