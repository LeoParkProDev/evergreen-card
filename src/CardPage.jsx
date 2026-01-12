import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCustomerData } from './data/customers';
import EvergreenCard from './EvergreenCard';

export default function CardPage() {
  const { guid } = useParams();
  const customerData = getCustomerData(guid);

  // 고객 데이터가 없으면 홈으로 리다이렉트
  if (!customerData) {
    return <Navigate to="/" replace />;
  }

  return <EvergreenCard customerData={customerData} />;
}
