# Evergreen Link - 개발자 가이드

## 프로젝트 소개

Evergreen Link는 한국 제조업체를 위한 디지털 명함 웹 애플리케이션입니다.
모바일 우선 설계로 연락처 정보와 제품 카탈로그를 제공합니다.

---

## 기술 스택

### Core

| 기술 | 버전 | 용도 |
|-----|------|-----|
| React | 19.2.0 | UI 프레임워크 |
| Vite | 7.2.4 | 빌드 도구 & 개발 서버 |
| React Router DOM | 7.12.0 | 클라이언트 사이드 라우팅 |

### Styling

| 기술 | 버전 | 용도 |
|-----|------|-----|
| TailwindCSS | 3.4.19 | 유틸리티 CSS 프레임워크 |
| PostCSS | 8.5.6 | CSS 후처리 |
| Autoprefixer | 10.4.23 | 브라우저 벤더 프리픽스 자동 추가 |

### UI & Icons

| 기술 | 버전 | 용도 |
|-----|------|-----|
| lucide-react | 0.562.0 | 아이콘 라이브러리 |

### Analytics

| 기술 | 버전 | 용도 |
|-----|------|-----|
| react-ga4 | 2.1.0 | Google Analytics 4 연동 |

### Development Tools

| 기술 | 버전 | 용도 |
|-----|------|-----|
| ESLint | 9.39.1 | 코드 린팅 |
| eslint-plugin-react-hooks | 7.0.1 | React Hooks 규칙 검사 |
| eslint-plugin-react-refresh | 0.4.24 | Vite HMR 최적화 |
| @vitejs/plugin-react | 5.1.1 | Vite React 플러그인 |

### Type Definitions

| 기술 | 버전 | 용도 |
|-----|------|-----|
| @types/react | 19.2.5 | React 타입 정의 |
| @types/react-dom | 19.2.3 | React DOM 타입 정의 |

---

## 프로젝트 구조

```
evergreen-link/
├── public/
│   └── assets/           # 정적 이미지 (배너, 로고 등)
├── src/
│   ├── main.jsx          # 앱 진입점 (Router, GA4 초기화)
│   ├── App.jsx           # 홈 페이지 컴포넌트
│   ├── CardPage.jsx      # 동적 고객 카드 페이지
│   ├── EvergreenCard.jsx # 메인 명함 컴포넌트
│   ├── analytics.js      # GA4 이벤트 추적 유틸리티
│   ├── data/
│   │   └── customers.js  # 고객 데이터 저장소
│   ├── index.css         # Tailwind 전역 스타일
│   └── App.css           # 추가 스타일
├── .env                  # 환경변수 (GA4 ID)
├── vite.config.js        # Vite 설정
├── tailwind.config.js    # Tailwind 설정
├── postcss.config.js     # PostCSS 설정
├── eslint.config.js      # ESLint flat config
└── package.json
```

---

## 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env` 파일 생성:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버: http://localhost:5173

---

## 주요 명령어

| 명령어 | 설명 |
|-------|-----|
| `npm run dev` | 개발 서버 실행 (HMR 지원) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드된 결과물 미리보기 |
| `npm run lint` | ESLint 검사 |

---

## 라우팅 구조

| 경로 | 컴포넌트 | 설명 |
|-----|---------|-----|
| `/` | App.jsx | 홈 (데모 명함) |
| `/:guid` | CardPage.jsx | 고객별 명함 페이지 |

---

## 고객 데이터 구조

`src/data/customers.js`:

```javascript
{
  'customer-guid': {
    profile: {
      company: '회사명',
      name: '이름',
      position: '직함',
      phone: '전화번호',
      email: '이메일',
      address: '주소',
      tagline: '슬로건',
      description: '소개',
      bannerHeadline: '배너 헤드라인',
      profileImage: '/assets/profile.png',
      bannerImage: '/assets/banner.png',
      pageTitle: '브라우저 탭 제목'
    },
    products: [
      {
        id: 'product-id',
        name: '제품명',
        desc: '설명',
        badge: '뱃지',
        badgeColor: 'bg-blue-600',
        img: '이미지 URL',
        spec: {
          title: '스펙 제목',
          description: '스펙 설명',
          efficiency: '효율',
          material: '재질',
          usage: '용도'
        }
      }
    ]
  }
}
```

---

## GA4 이벤트 추적

`src/analytics.js`에서 제공하는 추적 함수:

| 함수 | 이벤트 | 설명 |
|-----|-------|-----|
| `analytics.viewCard(guid)` | view_business_card | 명함 탭 조회 |
| `analytics.viewCatalog(guid)` | view_catalog | 카탈로그 탭 조회 |
| `analytics.viewProduct(id, name, guid)` | view_item | 제품 상세 조회 |
| `analytics.clickCall(phone, guid)` | call_button_click | 전화 버튼 클릭 |
| `analytics.clickEmail(email, guid)` | email_button_click | 이메일 버튼 클릭 |
| `analytics.clickSMS(phone, guid)` | sms_button_click | SMS 버튼 클릭 |
| `analytics.copyAddress(address, guid)` | copy_address | 주소 복사 |
| `analytics.requestQuote(id, name, guid)` | request_quote | 견적 요청 |
| `analytics.switchTab(from, to, guid)` | tab_switch | 탭 전환 |

---

## 배포

### Vercel (현재 사용 중)

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로덕션 배포
vercel deploy --prod
```

배포 URL: https://evergreen-link.vercel.app

---

## 디자인 시스템

### 색상 팔레트

| 용도 | 색상 | Tailwind 클래스 |
|-----|------|----------------|
| Primary | #0f172a | slate-900 |
| Accent | #2563eb | blue-600 |
| Secondary | #ca8a04 | yellow-600 |
| Success | #16a34a | green-600 |
| Background | #f8fafc | slate-50 |

### 반응형 브레이크포인트

- 모바일: 기본 (전체 뷰포트)
- 데스크톱: `sm:` 이상 (컨테이너 카드 레이아웃)

---

## 기여 가이드

1. 기능 브랜치 생성: `git checkout -b feature/기능명`
2. 변경사항 커밋: `git commit -m "설명"`
3. 푸시: `git push origin feature/기능명`
4. Pull Request 생성

---

## 라이선스

Private Repository
