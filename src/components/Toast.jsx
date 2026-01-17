import React from 'react';

export default function Toast({ message, isVisible }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity pointer-events-none z-50 whitespace-nowrap ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );
}
