import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, RefreshCw, Check } from 'lucide-react';

interface HeroPosterDisplayProps {
  defaultAlt?: string;
}

const POSTER_STORAGE_KEY = 'giao_thoa_user_uploaded_poster_data_v1';

export const HeroPosterDisplay: React.FC<HeroPosterDisplayProps> = ({
  defaultAlt = 'GIAO THOA: XƯỞNG VIỆT PHỤC GENZ - Poster Gốc',
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved poster from localStorage or check public asset
  useEffect(() => {
    try {
      const saved = localStorage.getItem(POSTER_STORAGE_KEY);
      if (saved && saved.startsWith('data:image')) {
        setImageSrc(saved);
        return;
      }
    } catch {
      // ignore storage error
    }

    // Try loading public/hero-poster.png if present
    const testImg = new Image();
    testImg.src = '/hero-poster.png';
    testImg.onload = () => {
      setImageSrc('/hero-poster.png');
    };
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImageSrc(dataUrl);
        try {
          localStorage.setItem(POSTER_STORAGE_KEY, dataUrl);
        } catch {
          // If quota exceeded, at least keep in React state
        }
        setShowUploader(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    localStorage.removeItem(POSTER_STORAGE_KEY);
    setImageSrc(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D8C7B0] bg-[#FAF5EC] select-none group">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Main Poster Container */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[660px] flex items-center justify-center overflow-hidden transition-all ${
          isDragging ? 'ring-4 ring-[#9B2C2C] bg-[#FAF0E6]' : ''
        }`}
      >
        {imageSrc ? (
          /* ========================================================= */
          /* 1. NGUYÊN BẢN HÌNH ẢNH GỐC ĐƯỢC GIỮ NGUYÊN 100%           */
          /* ========================================================= */
          <div className="relative w-full h-full flex items-center justify-center bg-[#F7F2E7]">
            <img
              src={imageSrc}
              alt={defaultAlt}
              className="w-full h-full object-contain sm:object-cover"
            />

            {/* Quick action bar in bottom corner on hover */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-white text-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-[#FDE047] transition-colors flex items-center gap-1 cursor-pointer"
                title="Thay đổi ảnh poster"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Đổi ảnh</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* 2. KHUNG HIỂN THỊ POSTER GỐC & NÚT CHỌN ẢNH               */
          /* ========================================================= */
          <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#F9F5EC] to-[#EFE4D2] text-[#2C241E]">
            {/* Top Ornamental Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#D8C7B0] text-xs font-semibold text-[#851D1D] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Poster Gốc: Giao Thoa Xưởng Việt Phục GenZ</span>
            </div>

            {/* Center Area: Upload / Drag Drop Box for the original image */}
            <div className="max-w-md w-full text-center space-y-4 p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-dashed border-[#C4A882] shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#FDF4EC] text-[#9B2C2C] mx-auto flex items-center justify-center border border-[#E8DEC8] shadow-inner">
                <ImageIcon className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">
                  Giữ Nguyên Hình Ảnh Gốc Của Poster
                </h3>
                <p className="text-xs text-[#6B5A4B] leading-relaxed">
                  Bấm nút bên dưới để chọn tệp ảnh gốc <span className="font-bold text-[#851D1D]">&quot;Giao Thoa_ Vietnamese Heritage Gen Z Poster.png&quot;</span> từ thiết bị của bạn để hiển thị trọn vẹn 100% không qua thiết kế lại.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#9B2C2C] hover:bg-[#7F1D1D] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Chọn Tệp Ảnh Poster Gốc</span>
                </button>
              </div>

              <p className="text-[11px] text-[#8C7A6B]">
                Hoặc kéo thả trực tiếp tệp ảnh vào khung này
              </p>
            </div>

            {/* Bottom Note */}
            <div className="text-[11px] text-[#785E48] font-medium text-center">
              Tứ Thân (Bắc) • Ngũ Thân (Trung) • Bà Ba (Nam) • Trống Đồng Đông Sơn
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPosterDisplay;
