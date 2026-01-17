import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SpecDetail({ product, onBack, onRequestQuote }) {
  if (!product) return null;

  return (
    <div className="animate-fade-in">
      {/* Back Button Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 shadow-sm bg-white sticky top-0 z-10">
        <button
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
          onClick={onBack}
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
            src={product.img}
            alt={product.spec.title}
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black text-slate-900 mb-2">{product.spec.title}</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">{product.spec.description}</p>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-blue-600 mb-2">효율 (Efficiency)</h4>
              <p className="text-slate-800 font-medium">{product.spec.efficiency}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-blue-600 mb-2">주요 재질 (Material)</h4>
              <p className="text-slate-800 font-medium">{product.spec.material}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-blue-600 mb-2">추천 용도 (Usage)</h4>
              <p className="text-slate-800 font-medium">{product.spec.usage}</p>
            </div>
          </div>

          <button
            className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
            onClick={onRequestQuote}
          >
            이 제품 견적 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
