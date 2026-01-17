# Evergreen Link 기술 리뷰 리포트

> **리뷰 일자**: 2026-01-17
> **리뷰 범위**: 확장성(Scalability) 및 안정성(Stability)

---

## 요약 (Executive Summary)

현재 프로젝트는 MVP 수준의 기능 구현은 완료되었으나, 프로덕션 환경에서의 확장성과 안정성 측면에서 개선이 필요한 부분이 다수 발견되었습니다.

| 영역 | 위험도 | 상태 |
|------|--------|------|
| 데이터 레이어 | 🔴 High | 인메모리 저장, 확장 불가 |
| 에러 처리 | 🔴 High | 대부분 미구현 |
| 컴포넌트 구조 | 🟡 Medium | 단일 거대 컴포넌트 |
| 성능 최적화 | 🟡 Medium | 최적화 미적용 |
| 보안 | 🟡 Medium | 클라이언트 데이터 노출 |
| 테스트 | 🔴 High | 테스트 코드 부재 |
| 타입 안정성 | 🟡 Medium | TypeScript 미사용 |

---

## 1. 데이터 레이어 문제점 (Critical)

### 1.1 인메모리 데이터 저장

**파일**: `src/data/customers.js`

```javascript
// 현재 구조: 하드코딩된 객체
export const customers = {
  'c7f8e9a1-...': { profile: {...}, products: [...] },
  // ...
};
```

**문제점**:
- 고객 추가/수정 시 코드 수정 및 재배포 필요
- 고객 수 증가 → 번들 크기 증가 → 초기 로딩 시간 증가
- 100개 이상의 고객 데이터 시 심각한 성능 저하 예상
- 데이터 백업/복구 불가

**권장 해결책**:
```
단기: JSON 파일 분리 + 동적 import
중기: Firebase/Supabase 같은 BaaS 도입
장기: 백엔드 API 서버 구축
```

### 1.2 데이터 검증 없음

**파일**: `src/data/customers.js:356-358`

```javascript
export const getCustomerData = (guid) => {
  return customers[guid] || null;  // 단순 null 반환
};
```

**문제점**:
- 데이터 스키마 검증 없음
- 필수 필드 누락 시 런타임 에러 발생 가능
- 타입 안정성 보장 안됨

---

## 2. 에러 처리 미흡 (Critical)

### 2.1 전역 에러 경계 부재

**파일**: `src/main.jsx`

```javascript
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Error Boundary 없음 */}
      <AnalyticsTracker />
      <Routes>...</Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

**문제점**:
- 컴포넌트 에러 시 전체 앱 크래시
- 사용자에게 흰 화면만 표시됨
- 에러 로깅/리포팅 불가

**권장 해결책**:
```jsx
// ErrorBoundary 컴포넌트 추가 필요
<ErrorBoundary fallback={<ErrorPage />}>
  <Routes>...</Routes>
</ErrorBoundary>
```

### 2.2 Analytics 에러 무시

**파일**: `src/analytics.js:36-46`

```javascript
export const trackPageView = (path, title) => {
  if (!MEASUREMENT_ID) return;
  // try-catch 없음 - 에러 시 무시됨
  ReactGA.send({...});
};
```

**문제점**:
- GA4 연결 실패 시 에러가 콘솔에만 표시
- 네트워크 이슈 시 앱 전체에 영향 가능성
- 분석 데이터 손실 파악 불가

### 2.3 API 호출 에러 처리 미흡

**파일**: `src/EvergreenCard.jsx:123-131`

```javascript
const handleCopyAddress = async () => {
  try {
    await navigator.clipboard.writeText(profile.address);
    // ...
  } catch (err) {
    showToastMessage('복사에 실패했습니다');  // 에러 로깅 없음
  }
};
```

**문제점**:
- 에러 원인 파악 불가
- Sentry 같은 에러 모니터링 서비스 미연동

---

## 3. 컴포넌트 구조 문제 (Medium)

### 3.1 단일 거대 컴포넌트

**파일**: `src/EvergreenCard.jsx` (377줄)

**현재 구조**:
```
EvergreenCard.jsx
├── 상태 관리 (6개 useState)
├── useEffect 로직 (파비콘, 분석)
├── 이벤트 핸들러 (8개)
├── 명함 뷰 UI
├── 카탈로그 뷰 UI
├── 제품 상세 뷰 UI
├── 토스트 UI
└── 하단 네비게이션 UI
```

**문제점**:
- 유지보수 어려움
- 코드 재사용 불가
- 테스트 작성 어려움
- 번들 분할(Code Splitting) 불가

**권장 구조**:
```
components/
├── layout/
│   ├── Header.jsx
│   └── BottomNav.jsx
├── card/
│   ├── BusinessCard.jsx
│   ├── ProfileCard.jsx
│   └── ActionButtons.jsx
├── catalog/
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   └── ProductDetail.jsx
├── common/
│   ├── Toast.jsx
│   └── ErrorBoundary.jsx
└── EvergreenCard.jsx (조합 컴포넌트)
```

### 3.2 미사용 코드

**파일**: `src/EvergreenCard.jsx:61-66`

```javascript
// colors 객체가 선언되었으나 사용되지 않음
const colors = {
  primary: '#0f172a',
  accent: '#2563eb',
  secondary: '#ca8a04',
};
```

---

## 4. 성능 문제 (Medium)

### 4.1 이미지 최적화 부재

**파일**: `src/EvergreenCard.jsx:169-172`

```jsx
<img
  className="w-full h-full object-cover opacity-60"
  src={profile.bannerImage || "https://..."}
  alt="Company"
/>
// loading="lazy" 없음
// srcset 없음 (반응형 이미지)
```

**문제점**:
- 모든 이미지가 즉시 로드됨
- 모바일에서 불필요하게 큰 이미지 다운로드
- LCP(Largest Contentful Paint) 성능 저하

### 4.2 불필요한 리렌더링

**파일**: `src/EvergreenCard.jsx:52-59`

```javascript
useEffect(() => {
  if (activeTab === 'card' && !showSpec) {
    analytics.viewCard(guid);  // 탭 변경마다 호출
  } else if (activeTab === 'catalog' && !showSpec) {
    analytics.viewCatalog(guid);
  }
}, [activeTab, showSpec, guid]);
```

**문제점**:
- StrictMode에서 useEffect 2번 실행 (개발 모드)
- 동일 탭 재클릭 시에도 이벤트 발송

### 4.3 객체 재생성

```javascript
// 매 렌더마다 새 객체 생성
const colors = { primary: '#0f172a', ... };  // useMemo 필요
```

---

## 5. 보안 고려사항 (Medium)

### 5.1 클라이언트 데이터 노출

**파일**: `src/data/customers.js`

**문제점**:
- 모든 고객의 전화번호, 이메일, 주소가 클라이언트 번들에 포함
- 브라우저 개발자 도구에서 전체 고객 목록 조회 가능
- 경쟁사가 고객 DB 전체를 쉽게 추출 가능

**권장 해결책**:
```
1. 백엔드 API에서 해당 고객 데이터만 제공
2. 민감 정보(전화번호 등)는 마스킹 처리
3. Rate Limiting 적용
```

### 5.2 GUID 예측 가능성

**현재**: UUID v4 형식 사용 (랜덤)
**평가**: 적절함, 추가 인증 없이도 낮은 예측 가능성

---

## 6. 테스트 부재 (Critical)

### 현재 상태

```json
// package.json - 테스트 관련 설정 없음
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
    // "test" 스크립트 없음
  }
}
```

**권장 사항**:
- Vitest 도입 (Vite 네이티브 테스트 러너)
- React Testing Library 도입
- 최소 커버리지 목표: 70%

**우선 테스트 대상**:
1. `getCustomerData()` 함수
2. `CardPage` 컴포넌트 라우팅 로직
3. 분석 이벤트 발송 로직

---

## 7. 타입 안정성 (Medium)

### 현재 상태

- TypeScript 미사용 (JavaScript)
- PropTypes 미사용
- @types/react는 설치되어 있으나 활용 안됨

**문제점**:
- 런타임 에러 발생 가능성 높음
- IDE 자동완성 제한적
- 리팩토링 시 버그 발생 위험

**권장 사항**:
```bash
# 점진적 TypeScript 마이그레이션
1. tsconfig.json 추가 (allowJs: true)
2. 핵심 파일부터 .tsx로 변환
3. 데이터 타입 정의 (Customer, Product 인터페이스)
```

---

## 8. 기능 미완성 사항

### 8.1 카탈로그 기능 비활성화

**파일**: `src/EvergreenCard.jsx:68-73`

```javascript
const handleSwitchTab = (tab) => {
  if (tab === 'catalog') {
    showToastMessage('준비중인 기능입니다');
    return;  // 카탈로그 접근 차단
  }
  // ...
};
```

### 8.2 견적 문의 미구현

**파일**: `src/EvergreenCard.jsx:321-325`

```javascript
onClick={() => {
  analytics.requestQuote(selectedProduct.id, selectedProduct.name, guid);
  showToastMessage('견적 요청이 전송되었습니다');  // 실제 전송 안됨
  setTimeout(() => handleHideSpec(), 800);
}}
```

**문제점**:
- 사용자는 견적 요청이 전송되었다고 인식
- 실제로는 아무 동작도 하지 않음 (UX 기만)

---

## 9. 권장 개선 로드맵

### Phase 1: 안정성 확보 (즉시)

- [ ] ErrorBoundary 컴포넌트 추가
- [ ] 에러 로깅 서비스 연동 (Sentry)
- [ ] 기본 테스트 코드 작성
- [ ] 견적 문의 토스트 문구 수정 또는 기능 구현

### Phase 2: 확장성 개선 (단기)

- [ ] 컴포넌트 분리 리팩토링
- [ ] TypeScript 점진적 도입
- [ ] 이미지 lazy loading 적용
- [ ] 고객 데이터 JSON 파일 분리

### Phase 3: 인프라 구축 (중기)

- [ ] 백엔드 API 서버 구축
- [ ] 데이터베이스 도입
- [ ] CDN 이미지 최적화
- [ ] CI/CD 파이프라인 구축

---

## 10. 긍정적 요소

1. **최신 기술 스택**: React 19, Vite 7 사용
2. **모바일 우선 디자인**: TailwindCSS 활용 잘 됨
3. **분석 통합**: GA4 이벤트 추적 체계적으로 구현
4. **깔끔한 UI/UX**: 타겟 사용자에 적합한 디자인
5. **코드 가독성**: 일관된 코딩 스타일

---

## 결론

현재 프로젝트는 **MVP 단계**로서는 적절하나, **프로덕션 배포 전** 최소한 Phase 1의 안정성 확보 작업이 필요합니다. 특히 에러 처리와 테스트 부재는 서비스 운영 시 심각한 문제를 야기할 수 있습니다.

고객 수가 10개 이하인 현재 상황에서는 인메모리 데이터 저장이 당장 문제가 되지 않으나, 50개 이상으로 확장 시 반드시 백엔드 API 도입을 검토해야 합니다.
