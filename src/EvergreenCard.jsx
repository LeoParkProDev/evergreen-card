import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, CreditCard, Grid, ArrowLeft } from 'lucide-react';
import { getCustomerData } from './data/customers';

export default function EvergreenCard({ customerData }) {
  // customerData가 없으면 demo 데이터 사용
  const data = customerData || getCustomerData('demo');

  // 고객 데이터에서 profile과 products 가져오기
  const profile = data.profile;
  const products = data.products;

  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'catalog'
  const [showSpec, setShowSpec] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
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

  // 색상 팔레트 (ex/index.html 기반)
  const colors = {
    primary: '#0f172a', // slate-900
    accent: '#2563eb', // blue-600
    secondary: '#ca8a04', // yellow-600
  };

  const handleSwitchTab = (tab) => {
    // 카탈로그 탭은 준비중
    if (tab === 'catalog') {
      showToastMessage('준비중인 기능입니다');
      return;
    }

    setActiveTab(tab);
    setShowSpec(false);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  const handleShowSpec = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
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
    window.location.href = `tel:${profile.phone}`;
  };

  // 주소 복사
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(profile.address);
      showToastMessage('주소가 복사되었습니다');
    } catch (err) {
      showToastMessage('복사에 실패했습니다');
    }
  };

  // 이메일 보내기
  const handleEmail = () => {
    window.location.href = `mailto:${profile.email}`;
  };

  // 간편 문자
  const handleSMS = () => {
    const message = encodeURIComponent('안녕하세요, 연락 부탁드립니다.');
    window.location.href = `sms:${profile.phone}?body=${message}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-20 flex justify-center items-center shadow-sm border-b border-slate-100">
        <span className="font-bold text-slate-800 text-lg tracking-tight">EVERGREEN</span>
      </header>

      {/* Scrollable Content Area */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto pb-20 scroll-smooth relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>

        {/* TAB 1: Business Card */}
        {activeTab === 'card' && !showSpec && (
          <div className="animate-fade-in">
            {/* Hero Banner */}
            <div className="relative h-52 bg-slate-800">
              <img
                className="w-full h-full object-cover opacity-60"
                src={profile.bannerImage || "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=400&fit=crop"}
                alt="Company"
              />
              <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-slate-900 to-transparent">
                <div className="text-yellow-400 text-xs font-bold mb-1">{profile.tagline}</div>
                <div className="text-white text-xl font-bold leading-tight">
                  {profile.bannerHeadline || "산업용 필터의 모든 것"}<br />{profile.company}
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="p-6 bg-white border-b border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-slate-100 flex items-center justify-center text-3xl">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>👨🏻‍💼</span>
                  )}
                </div>
                <div>
                  <div className="text-blue-600 font-bold text-sm">{profile.position}</div>
                  <div className="text-2xl font-black text-slate-900">{profile.name}</div>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                "{profile.description}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="p-4 grid grid-cols-2 gap-3 bg-slate-50">
              <button
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
                onClick={handleCall}
              >
                <Phone className="w-6 h-6 text-green-600" />
                <span className="text-xs font-bold text-slate-700">전화 걸기</span>
              </button>
              <button
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
                onClick={handleSMS}
              >
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">간편 문자</span>
              </button>
              <button
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
                onClick={handleEmail}
              >
                <Mail className="w-6 h-6 text-slate-600" />
                <span className="text-xs font-bold text-slate-700">이메일</span>
              </button>
              <button
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
                onClick={handleCopyAddress}
              >
                <MapPin className="w-6 h-6 text-red-600" />
                <span className="text-xs font-bold text-slate-700">주소 복사</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Digital Catalog */}
        {activeTab === 'catalog' && !showSpec && (
          <div className="animate-fade-in">
            {/* Catalog Header */}
            <div className="p-5 bg-white border-b border-slate-100 sticky top-0 z-10">
              <h3 className="font-bold text-xl text-slate-900">제품 & 설비 카탈로그</h3>
              <p className="text-xs text-slate-500">주력 필터 제품군을 확인하세요.</p>
            </div>

            {/* Product List */}
            <div className="p-4 space-y-4 bg-slate-50">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group cursor-pointer"
                  onClick={() => handleShowSpec(product.id)}
                >
                  <div className="h-40 bg-slate-200 relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={product.img}
                      alt={product.name}
                    />
                    <div className={`absolute top-2 right-2 ${product.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                      {product.badge}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-slate-900">{product.name}</h4>
                    <p className="text-sm text-slate-500 mt-1">{product.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spec Detail Page */}
        {showSpec && selectedProduct && (
          <div className="animate-fade-in">
            {/* Back Button Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 shadow-sm bg-white sticky top-0 z-10">
              <button
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
                onClick={handleHideSpec}
              >
                <ArrowLeft className="w-6 h-6 text-slate-600" />
              </button>
              <span className="font-bold text-lg text-slate-900">상세 스펙</span>
            </div>

            {/* Spec Content */}
            <div className="bg-slate-50">
              <div className="relative h-64 bg-slate-200">
                <img
                  className="w-full h-full object-cover"
                  src={selectedProduct.img}
                  alt={selectedProduct.spec.title}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedProduct.spec.title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{selectedProduct.spec.description}</p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-sm text-blue-600 mb-2">효율 (Efficiency)</h4>
                    <p className="text-slate-800 font-medium">{selectedProduct.spec.efficiency}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-sm text-blue-600 mb-2">주요 재질 (Material)</h4>
                    <p className="text-slate-800 font-medium">{selectedProduct.spec.material}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-sm text-blue-600 mb-2">추천 용도 (Usage)</h4>
                    <p className="text-slate-800 font-medium">{selectedProduct.spec.usage}</p>
                  </div>
                </div>

                <button
                  className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                  onClick={() => {
                    showToastMessage('견적 요청이 전송되었습니다');
                    setTimeout(() => handleHideSpec(), 800);
                  }}
                >
                  이 제품 견적 문의하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity pointer-events-none z-50 whitespace-nowrap ${
            showToast ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {toastMessage}
        </div>
      </div>

      {/* Bottom Navigation (Tab Bar) */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-20 pb-2">
        <button
          className={`flex flex-col items-center justify-center w-full h-full transition-colors border-t-2 ${
            activeTab === 'card' && !showSpec
              ? 'text-blue-600 border-blue-600'
              : 'text-slate-400 border-transparent'
          }`}
          onClick={() => handleSwitchTab('card')}
        >
          <CreditCard className={`w-6 h-6 mb-1 ${activeTab === 'card' && !showSpec ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-bold">명함</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center w-full h-full transition-colors border-t-2 ${
            activeTab === 'catalog' && !showSpec
              ? 'border-yellow-600'
              : 'border-transparent'
          }`}
          style={{
            color: activeTab === 'catalog' && !showSpec ? '#ca8a04' : '#94a3b8'
          }}
          onClick={() => handleSwitchTab('catalog')}
        >
          <Grid className={`w-6 h-6 mb-1 ${activeTab === 'catalog' && !showSpec ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-bold">카탈로그</span>
        </button>
      </div>
    </div>
  );
}
