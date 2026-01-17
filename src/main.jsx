import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import CardPage from './CardPage.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { initGA, trackPageView, trackSessionStart } from './analytics'

// GA4 초기화
initGA();

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 데이터는 5분간 '최신' 상태로 간주 (재요청 안함)
      retry: 1, // 실패 시 1번만 재시도
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <AnalyticsTracker />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:guid" element={<CardPage />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)