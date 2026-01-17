import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CardPage from './CardPage.jsx'
import { initGA, trackPageView, trackSessionStart } from './analytics'

// GA4 초기화
initGA();

// 라우터 변경 감지 및 페이지뷰 추적 컴포넌트
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // 세션 시작 추적 (최초 마운트 시)
    trackSessionStart();
  }, []);

  useEffect(() => {
    // 경로 변경 시 페이지뷰 추적
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:guid" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
