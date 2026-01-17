import React from 'react';

export default function ProductCatalog({ products, onSelectProduct }) {
  return (
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
            onClick={() => onSelectProduct(product.id)}
          >
            <div className="h-40 bg-slate-200 relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={product.img}
                alt={product.name}
                loading="lazy"
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
  );
}
