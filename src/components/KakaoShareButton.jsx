import { useEffect, useState } from 'react';
import { initKakao, shareKakao, isKakaoInitialized } from '../kakao';
import { analytics } from '../analytics';

export default function KakaoShareButton({ profile, customerGuid }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Kakao SDK 초기화 (비동기)
    const initialize = async () => {
      const initialized = await initKakao();
      setIsReady(initialized);
    };
    initialize();
  }, []);

  const handleShare = () => {
    if (!isKakaoInitialized()) {
      alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      return;
    }

    // 공유 이벤트 추적
    analytics.switchTab('share', 'kakao', customerGuid);

    const success = shareKakao();

    if (!success) {
      alert('카카오톡 공유에 실패했습니다.');
    }
  };

  // SDK가 준비되지 않았으면 버튼 숨김
  if (!isReady) return null;

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-24 right-4 z-30 w-14 h-14 bg-[#FEE500] rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform hover:shadow-xl"
      aria-label="카카오톡으로 공유하기"
    >
      {/* 카카오톡 아이콘 */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3C6.477 3 2 6.463 2 10.691c0 2.734 1.8 5.127 4.5 6.478-.146.522-.94 3.363-.972 3.596 0 0-.02.166.087.229.107.063.232.014.232.014.306-.043 3.548-2.326 4.108-2.72.67.097 1.36.148 2.045.148 5.523 0 10-3.463 10-7.745C22 6.463 17.523 3 12 3Z"
          fill="#391B1B"
        />
      </svg>
    </button>
  );
}
