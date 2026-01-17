import QRCode from 'react-qr-code';
import { X, Download } from 'lucide-react';
import { useRef } from 'react';

export default function QrCodeModal({ url, onClose }) {
  const svgRef = useRef(null);

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // SVG 크기
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      // 흰색 배경 그리기
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'business-card-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-900">QR 코드 (영구 보관용)</h3>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
          <QRCode
            ref={svgRef}
            value={url}
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
          />
        </div>

        <p className="text-sm text-slate-500 text-center mb-6 break-all px-2">
          {url}
        </p>

        <button
          onClick={handleDownload}
          className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>이미지로 저장하기</span>
        </button>
      </div>
    </div>
  );
}
