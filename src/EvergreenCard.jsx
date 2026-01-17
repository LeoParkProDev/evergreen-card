import { useState, useRef, useEffect } from 'react';
import { getCustomerData } from './data/customers';
import { analytics } from './analytics';
import KakaoShareButton from './components/KakaoShareButton';
import QrCodeModal from './components/QrCodeModal';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import ProductCatalog from './components/ProductCatalog';
import SpecDetail from './components/SpecDetail';
import TabNavigation from './components/TabNavigation';
import Toast from './components/Toast';

export default function EvergreenCard({ customerData, customerGuid }) {
  // customerData가 없으면 demo 데이터 사용
  const data = customerData || getCustomerData('demo');

  // 고객 데이터에서 profile과 products 가져오기
  const profile = data.profile;
  const products = data.products;

  // 고객 GUID (추적용)
  const guid = customerGuid || data.guid || 'demo';

  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'catalog'
  const [showSpec, setShowSpec] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const scrollAreaRef = useRef(null);

  // 브라우저 탭 제목 및 파비콘 설정
  useEffect(() => {
    const defaultTitle = 'Evergreen Link - Digital Business Card';
    document.title = profile.pageTitle || `${profile.company} ${profile.name}` || defaultTitle;

    // 파비콘 설정 (프로필 이미지 사용)
    if (profile.profileImage) {
      // 기존 파비콘 링크 찾기 또는 생성
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = profile.profileImage;
    }

    // 컴포넌트 언마운트 시 기본 제목으로 복원
    return () => {
      document.title = defaultTitle;
      // 파비콘도 기본으로 복원
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = '/vite.svg';
      }
    };
  }, [profile]);

  // 탭 변경 시 뷰 추적
  useEffect(() => {
    if (activeTab === 'card' && !showSpec) {
      analytics.viewCard(guid);
    } else if (activeTab === 'catalog' && !showSpec) {
      analytics.viewCatalog(guid);
    }
  }, [activeTab, showSpec, guid]);

  const handleSwitchTab = (tab) => {
    // 카탈로그 탭은 준비중 (주석 해제 시 동작)
    if (tab === 'catalog') {
      showToastMessage('지원 준비중인 기능입니다');
      return;
    }

    // 탭 전환 추적
    analytics.switchTab(activeTab, tab, guid);

    setActiveTab(tab);
    setShowSpec(false);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  const handleShowSpec = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // 제품 상세 보기 추적
      analytics.viewProduct(product.id, product.name, guid);

      setSelectedProduct(product);
      setShowSpec(true);
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }
  };

  const handleHideSpec = () => {
    setShowSpec(false);
    setSelectedProduct(null);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  // 전화 걸기
  const handleCall = () => {
    // 전화 클릭 추적
    analytics.clickCall(profile.phone, guid);
    window.location.href = `tel:${profile.phone}`;
  };

  // 주소 복사
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(profile.address);
      // 주소 복사 추적
      analytics.copyAddress(profile.address, guid);
      showToastMessage('주소가 복사되었습니다');
    } catch (err) {
      showToastMessage('복사에 실패했습니다');
    }
  };

  // 이메일 보내기
  const handleEmail = () => {
    // 이메일 클릭 추적
    analytics.clickEmail(profile.email, guid);
    window.location.href = `mailto:${profile.email}`;
  };

  // 간편 문자
  const handleSMS = () => {
    // SMS 클릭 추적
    analytics.clickSMS(profile.phone, guid);
    const message = encodeURIComponent('안녕하세요, 연락 부탁드립니다.');
    window.location.href = `sms:${profile.phone}?body=${message}`;
  };

  const handleRequestQuote = () => {
      // 견적 문의 추적
      if (selectedProduct) {
        analytics.requestQuote(selectedProduct.id, selectedProduct.name, guid);
      }
      showToastMessage('견적 요청이 전송되었습니다');
      setTimeout(() => handleHideSpec(), 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans">
      <Header />

      {/* Scrollable Content Area */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto pb-20 scroll-smooth relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>

        {/* TAB 1: Business Card */}
        {activeTab === 'card' && !showSpec && (
          <ProfileCard 
            profile={profile}
            onCall={handleCall}
            onSMS={handleSMS}
            onEmail={handleEmail}
            onCopyAddress={handleCopyAddress}
            onShowQr={() => setShowQr(true)}
          />
        )}

        {/* TAB 2: Digital Catalog */}
        {activeTab === 'catalog' && !showSpec && (
          <ProductCatalog 
            products={products}
            onSelectProduct={handleShowSpec}
          />
        )}

        {/* Spec Detail Page */}
        {showSpec && selectedProduct && (
          <SpecDetail 
            product={selectedProduct}
            onBack={handleHideSpec}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {/* Toast Notification */}
        <Toast message={toastMessage} isVisible={showToast} />
      </div>

      {/* Kakao Share Floating Button */}
      <KakaoShareButton profile={profile} customerGuid={guid} />

      {/* QR Code Modal */}
      {showQr && (
        <QrCodeModal 
          url={`https://evergreen-link.vercel.app/${guid === 'demo' ? '' : guid}`}
          onClose={() => setShowQr(false)} 
        />
      )}

      {/* Bottom Navigation (Tab Bar) */}
      <TabNavigation 
        activeTab={activeTab}
        isSpecOpen={showSpec}
        onSwitchTab={handleSwitchTab}
      />
    </div>
  );
}