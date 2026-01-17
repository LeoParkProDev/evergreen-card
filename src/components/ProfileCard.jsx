import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, QrCode } from 'lucide-react';

export default function ProfileCard({ profile, onCall, onSMS, onEmail, onCopyAddress, onShowQr }) {
  return (
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
        
        {/* Hidden QR Code Button (Top-Right of Banner) */}
        <button
          onClick={onShowQr}
          className="absolute top-0 right-0 w-[30px] h-[30px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
          aria-label="QR 코드 생성"
        >
          <QrCode className="w-3 h-3 text-white/50" />
        </button>
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
          onClick={onCall}
        >
          <Phone className="w-6 h-6 text-green-600" />
          <span className="text-xs font-bold text-slate-700">전화 걸기</span>
        </button>
        <button
          className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
          onClick={onSMS}
        >
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <span className="text-xs font-bold text-slate-700">간편 문자</span>
        </button>
        <button
          className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
          onClick={onEmail}
        >
          <Mail className="w-6 h-6 text-slate-600" />
          <span className="text-xs font-bold text-slate-700">이메일</span>
        </button>
        <button
          className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-1 active:scale-95 transition-transform"
          onClick={onCopyAddress}
        >
          <MapPin className="w-6 h-6 text-red-600" />
          <span className="text-xs font-bold text-slate-700">주소 복사</span>
        </button>
      </div>
    </div>
  );
}
