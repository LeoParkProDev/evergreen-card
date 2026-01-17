# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Evergreen Link는 React와 Vite로 구축된 디지털 명함 웹 애플리케이션입니다. 한국 제조업체(예: 안산 공단 지역 공장)를 위해 특별히 설계된 모바일 우선 인터페이스로 비즈니스 연락처 정보와 제품 카탈로그를 표시합니다.

## 개발 명령어

```bash
# HMR이 포함된 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview

# 린터 실행
npm run lint
```

## 기술 스택

- **프레임워크**: React 19.2.0
- **빌드 도구**: Vite 7.2.4
- **라우팅**: React Router DOM 7.12.0
- **스타일링**: TailwindCSS 3.4.19 + Autoprefixer
- **아이콘**: lucide-react
- **분석**: react-ga4 (Google Analytics 4)
- **린팅**: ESLint 9 (flat config)

## 아키텍처

### 컴포넌트 구조

애플리케이션은 멀티 페이지 지원을 위해 React Router를 사용합니다:

- **src/main.jsx**: React Router 설정이 포함된 진입점
  - Google Analytics 4 초기화
  - 자동 페이지뷰 추적을 위한 AnalyticsTracker 컴포넌트 포함
  - 라우트: `/` (홈) 및 `/:guid` (고객별 명함)
- **src/App.jsx**: 데모 데이터로 EvergreenCard를 렌더링하는 홈 페이지용 루트 컴포넌트
- **src/CardPage.jsx**: GUID로 고객 데이터를 로드하는 동적 라우트 컴포넌트
- **src/EvergreenCard.jsx**: 모든 비즈니스 로직과 UI를 포함하는 메인 컴포넌트
  - "명함"과 "카탈로그" 두 가지 뷰를 가진 탭 기반 인터페이스 구현
  - 탭 상태 관리를 위해 React useState 사용
  - props를 통해 고객 데이터 수신 (데모 및 고객별 데이터 모두 지원)
  - 반응형 컨테이너가 있는 모바일 우선 디자인
  - 모든 사용자 상호작용에 대한 분석 추적 통합

### EvergreenCard 컴포넌트의 주요 기능

1. **명함 탭**: 전화 걸기 및 연락처 저장을 위한 크고 접근하기 쉬운 버튼과 함께 연락처 정보 표시
2. **카탈로그 탭**: 이모지 플레이스홀더가 있는 제품/서비스를 보여주는 그리드 레이아웃
3. **공유 기능**: 헤더의 공유 버튼 (현재 알림 표시, navigator.share API용으로 설계됨)
4. **고정 하단 네비게이션**: 스크롤 시에도 보이는 탭 전환기

### 디자인 원칙

- **타겟 사용자**: 한국 제조업 사장님들의 편리한 사용을 위해 설계
- **색상 체계**: 신뢰와 안정감을 위한 에버그린 그린(#166534) 기본 색상
- **타이포그래피**: 한국어 지원이 포함된 크고 읽기 쉬운 텍스트
- **인터랙션**: 접근성을 위한 큰 터치 타겟
- **반응성**: 모바일에서는 전체 뷰포트, 데스크톱에서는 컨테이너 카드 레이아웃 (sm: 브레이크포인트)

## ESLint 설정

프로젝트는 ESLint flat config (eslint.config.js)를 사용합니다:
- `dist` 디렉토리 무시
- React Hooks 규칙 적용
- Vite HMR을 위한 React Refresh 플러그인 설정
- 커스텀 규칙: `no-unused-vars`는 대문자 및 언더스코어 접두사 변수 허용

## 스타일링

TailwindCSS는 src 디렉토리의 모든 HTML 및 JSX/TSX 파일을 스캔하도록 설정되어 있습니다. PostCSS는 Tailwind 및 Autoprefixer 플러그인으로 설정되어 있습니다.

## 파일 구조

```
src/
├── main.jsx          # Router와 GA4가 포함된 React 앱 초기화
├── App.jsx           # 루트 컴포넌트 래퍼 (홈 페이지)
├── CardPage.jsx      # 동적 고객 카드 페이지 (/:guid 라우트)
├── EvergreenCard.jsx # 메인 애플리케이션 컴포넌트
├── analytics.js      # Google Analytics 4 유틸리티 및 이벤트 추적
├── data/
│   └── customers.js  # 고객 데이터 저장소 (인메모리 데이터베이스)
├── index.css         # Tailwind 지시문이 있는 전역 스타일
├── App.css           # 추가 컴포넌트 스타일
└── assets/           # 정적 에셋
```

## 분석 & 추적

### Google Analytics 4 통합

애플리케이션은 사용자 행동 분석을 위한 포괄적인 GA4 추적을 포함합니다:

#### 설정 요구사항

1. **환경 변수**: GA4 측정 ID가 포함된 `.env` 파일 생성
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **문서**: 전체 설정 지침은 `GA4_SETUP_GUIDE.md` 참조

#### 추적 이벤트

| 이벤트 이름 | 트리거 | 추적 데이터 |
|------------|--------|------------|
| `session_start` | 첫 방문 | device_id, timestamp |
| `pageview` | 라우트 변경 | path, title |
| `view_business_card` | 명함 탭 조회 | customer_id |
| `view_catalog` | 카탈로그 탭 조회 | customer_id |
| `view_item` | 제품 클릭 | item_id, item_name, customer_id |
| `call_button_click` | 전화 버튼 클릭 | phone_number, customer_id |
| `email_button_click` | 이메일 버튼 클릭 | email_address, customer_id |
| `sms_button_click` | SMS 버튼 클릭 | phone_number, customer_id |
| `copy_address` | 주소 복사 | address, customer_id |
| `request_quote` | 견적 요청 | item_id, item_name, customer_id |
| `tab_switch` | 탭 전환 | from_tab, to_tab, customer_id |

#### 기기 ID 추적

- 고유 기기 ID는 `crypto.randomUUID()`를 사용하여 생성
- localStorage에 `evergreen_device_id`로 저장
- 기기 수준의 고유성으로 MAU/DAU 추적 가능
- 브라우저 데이터가 삭제될 때까지 세션 간 유지

#### 분석 유틸리티 (`src/analytics.js`)

```javascript
import { analytics } from './analytics';

// 커스텀 이벤트 추적
analytics.viewCard(customerGuid);
analytics.clickCall(phoneNumber, customerGuid);
analytics.requestQuote(productId, productName, customerGuid);
```

### 데이터 레이어

#### 고객 데이터 구조

고객 데이터는 `src/data/customers.js`에 저장됩니다:

```javascript
{
  guid: 'unique-identifier',  // 라우팅 및 분석에 사용
  profile: {
    company, name, position, phone, email, address,
    tagline, description, bannerHeadline, profileImage,
    bannerImage, pageTitle
  },
  products: [
    { id, name, desc, badge, badgeColor, img, spec }
  ]
}
```

#### 멀티 테넌트 지원

- 각 고객은 URL 라우팅을 위한 고유 GUID 보유: `/:guid`
- 분석은 모든 이벤트를 `customer_id` 파라미터와 함께 추적
- GA4에서 고객별 분석 인사이트 제공

## 작업 규칙

- **빌드 검증 필수**: 모든 작업은 `npm run build` 로컬 빌드가 성공했는지 확인할 것 (작업 통과 조건)
- **MD 파일 커밋 금지**: md 파일을 생성한 경우 커밋하지 말고 로컬 파일로만 관리할 것
- **모호한 요청 시 재질문**: 작업 요청 시 맥락이 모호하면 반드시 재질문해서 명확하게 할 것
- **커밋 로그 한글 작성**: 모든 커밋 메시지는 반드시 한글로 작성할 것

## 참고사항

- 전화 걸기 및 연락처 저장 기능은 브라우저 API 사용 (`tel:` 프로토콜 및 알림)
- 아이콘은 현재 이모지; img 태그를 통해 실제 이미지로 교체 가능
- UI 전체에 한국어 사용
- IP 익명화가 활성화된 개인정보 친화적 분석
- 고객 데이터는 현재 인메모리에 저장 (비영속적)
