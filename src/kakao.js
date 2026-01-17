// Kakao SDK 초기화 및 공유 유틸리티

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

// Kakao SDK 로드 대기
const waitForKakaoSDK = (maxRetries = 20, interval = 100) => {
  return new Promise((resolve) => {
    let retries = 0;
    const check = () => {
      if (typeof window.Kakao !== 'undefined') {
        resolve(true);
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(check, interval);
      } else {
        resolve(false);
      }
    };
    check();
  });
};

// Kakao SDK 초기화 (비동기)
export const initKakao = async () => {
  // 이미 초기화되어 있으면 바로 true 반환
  if (window.Kakao?.isInitialized()) {
    return true;
  }

  if (!KAKAO_JS_KEY) {
    console.warn('⚠️ Kakao JavaScript Key가 설정되지 않았습니다. .env 파일을 확인하세요.');
    return false;
  }

  // SDK 로드 대기
  const isLoaded = await waitForKakaoSDK();
  if (!isLoaded) {
    console.warn('⚠️ Kakao SDK 로드 시간 초과');
    return false;
  }

  // 초기화
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY);
    console.log('✅ Kakao SDK 초기화 완료');
  }

  return true;
};

// 카카오톡 공유하기 (sendScrap 방식 - 현재 URL 스크랩)
export const shareKakao = () => {
  if (!window.Kakao?.isInitialized()) {
    console.warn('⚠️ Kakao SDK가 초기화되지 않았습니다.');
    return false;
  }

  try {
    window.Kakao.Share.sendScrap({
      requestUrl: window.location.href,
    });
    return true;
  } catch (error) {
    console.error('❌ 카카오톡 공유 실패:', error);
    return false;
  }
};

// SDK 초기화 상태 확인
export const isKakaoInitialized = () => {
  return window.Kakao?.isInitialized() || false;
};
