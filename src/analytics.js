import ReactGA from 'react-ga4';

// GA4 측정 ID (환경변수에서 가져오기)
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// GA4 초기화 함수
export const initGA = () => {
  if (!MEASUREMENT_ID) {
    console.warn('⚠️ GA4 Measurement ID가 설정되지 않았습니다. .env 파일을 확인하세요.');
    return false;
  }

  try {
    ReactGA.initialize(MEASUREMENT_ID, {
      gaOptions: {
        // 쿠키 설정
        cookieFlags: 'SameSite=None;Secure',
        // 디버그 모드 (개발 환경에서만)
        debug_mode: import.meta.env.DEV,
      },
      gtagOptions: {
        // 익명화 IP (GDPR 준수)
        anonymize_ip: true,
      },
    });

    console.log('✅ GA4 초기화 완료:', MEASUREMENT_ID);
    return true;
  } catch (error) {
    console.error('❌ GA4 초기화 실패:', error);
    return false;
  }
};

// 페이지뷰 추적 (경로 변경 시)
export const trackPageView = (path, title) => {
  if (!MEASUREMENT_ID) return;

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });

  console.log(`📊 페이지뷰 추적: ${path}`);
};

// 커스텀 이벤트 추적
export const trackEvent = (category, action, label = '', value = 0) => {
  if (!MEASUREMENT_ID) return;

  ReactGA.event({
    category,
    action,
    label,
    value,
  });

  console.log(`📊 이벤트 추적: ${category} - ${action}${label ? ` (${label})` : ''}`);
};

// 사용자 정의 이벤트 (GA4 권장 방식)
export const trackGA4Event = (eventName, eventParams = {}) => {
  if (!MEASUREMENT_ID) return;

  ReactGA.event(eventName, eventParams);

  console.log(`📊 GA4 이벤트: ${eventName}`, eventParams);
};

// 비즈니스 카드 관련 이벤트 추적 함수들
export const analytics = {
  // 명함 보기
  viewCard: (customerGuid) => {
    trackGA4Event('view_business_card', {
      customer_id: customerGuid || 'demo',
      content_type: 'business_card',
    });
  },

  // 카탈로그 보기
  viewCatalog: (customerGuid) => {
    trackGA4Event('view_catalog', {
      customer_id: customerGuid || 'demo',
      content_type: 'catalog',
    });
  },

  // 제품 상세 보기
  viewProduct: (productId, productName, customerGuid) => {
    trackGA4Event('view_item', {
      customer_id: customerGuid || 'demo',
      item_id: productId,
      item_name: productName,
    });
  },

  // 전화 걸기 버튼 클릭
  clickCall: (phoneNumber, customerGuid) => {
    trackGA4Event('call_button_click', {
      customer_id: customerGuid || 'demo',
      phone_number: phoneNumber,
      engagement_type: 'call',
    });
  },

  // 이메일 버튼 클릭
  clickEmail: (email, customerGuid) => {
    trackGA4Event('email_button_click', {
      customer_id: customerGuid || 'demo',
      email_address: email,
      engagement_type: 'email',
    });
  },

  // SMS 버튼 클릭
  clickSMS: (phoneNumber, customerGuid) => {
    trackGA4Event('sms_button_click', {
      customer_id: customerGuid || 'demo',
      phone_number: phoneNumber,
      engagement_type: 'sms',
    });
  },

  // 주소 복사 버튼 클릭
  copyAddress: (address, customerGuid) => {
    trackGA4Event('copy_address', {
      customer_id: customerGuid || 'demo',
      address: address,
      engagement_type: 'copy',
    });
  },

  // 견적 문의 버튼 클릭
  requestQuote: (productId, productName, customerGuid) => {
    trackGA4Event('request_quote', {
      customer_id: customerGuid || 'demo',
      item_id: productId,
      item_name: productName,
      engagement_type: 'quote_request',
    });
  },

  // 탭 전환
  switchTab: (fromTab, toTab, customerGuid) => {
    trackGA4Event('tab_switch', {
      customer_id: customerGuid || 'demo',
      from_tab: fromTab,
      to_tab: toTab,
    });
  },
};

// 사용자 속성 설정 (선택사항)
export const setUserProperties = (properties) => {
  if (!MEASUREMENT_ID) return;

  ReactGA.set(properties);
  console.log('👤 사용자 속성 설정:', properties);
};

// 디바이스 ID 생성 및 저장 (로컬스토리지 기반 고유 ID)
export const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem('evergreen_device_id');

  if (!deviceId) {
    // UUID v4 생성
    deviceId = crypto.randomUUID();
    localStorage.setItem('evergreen_device_id', deviceId);
    console.log('🆔 새로운 디바이스 ID 생성:', deviceId);
  }

  return deviceId;
};

// 세션 시작 추적
export const trackSessionStart = () => {
  const deviceId = getOrCreateDeviceId();

  setUserProperties({
    device_id: deviceId,
  });

  trackGA4Event('session_start', {
    device_id: deviceId,
    timestamp: new Date().toISOString(),
  });
};
