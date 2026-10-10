import React, { useState } from 'react';
import { Image as ImageIcon, Lock } from 'lucide-react';
import ceremonialHeritageImg from '../assets/images/ceremonial_vietnamese_heritage_trio_1791634963672.jpg';

interface HeroPosterDisplayProps {
  defaultAlt?: string;
}

// Static asset paths for Ceremonial Vietnamese Heritage Trio (bound according to strict immutability rules)
const PRIMARY_STATIC_ASSET = ceremonialHeritageImg;
const FALLBACK_STATIC_ASSETS = [
  '/Ceremonial Vietnamese Heritage Trio.png',
  '/assets/images/ceremonial_heritage_trio.png',
  '/assets/images/Ceremonial Vietnamese Heritage Trio.png',
  '/ceremonial-vietnamese-heritage-trio.png',
  '/hero-poster.png',
];

export const HeroPosterDisplay: React.FC<HeroPosterDisplayProps> = ({
  defaultAlt = 'GIAO THOA: XƯỞNG VIỆT PHỤC GENZ - Ceremonial Vietnamese Heritage Trio',
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const [allFailed, setAllFailed] = useState<boolean>(false);

  const allCandidatePaths = [PRIMARY_STATIC_ASSET, ...FALLBACK_STATIC_ASSETS];
  const activeSrc = allCandidatePaths[currentSrcIndex] || PRIMARY_STATIC_ASSET;

  const handleImageError = () => {
    if (currentSrcIndex < allCandidatePaths.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D8C7B0] bg-[#FAF5EC] select-none">
      {/* 
        QUY TẮC BẮT BUỘC VỀ ASSET HÌNH ẢNH (STRICT IMAGE IMMUTABILITY):
        1. KHÔNG THAY THẾ, KHÔNG TÁI THIẾT KẾ: Tuyệt đối không tự ý vẽ lại background bằng CSS gradient, SVG, canvas hay bất kỳ thư viện tạo hình nào. Giữ nguyên 100% hình ảnh gốc được cung cấp.
        2. CƠ CHẾ NHÚNG ẢNH TĨNH (STATIC ASSET BINDING): Coi file ảnh cung cấp là một asset tĩnh đã có sẵn, không can thiệp bộ lọc làm biến dạng màu sắc (không filter đổi màu, hue-rotate, saturation quá mức).
        3. TÁCH BIỆT NỘI DUNG VÀ NỀN: Mọi thành phần chữ, nút bấm, avatar nhân vật là các layer nằm đè lên trên.
        4. KHÓA HÌNH ẢNH CỐ ĐỊNH: Tuyệt đối không cho phép người dùng tải ảnh lên hoặc thay đổi.
      */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[660px] flex items-center justify-center bg-[#F7F2E7] overflow-hidden">
        {!allFailed ? (
          <img
            src={activeSrc}
            alt={defaultAlt}
            className="w-full h-full object-contain sm:object-cover"
            style={{ filter: 'none' }}
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          /* Neutral locked placeholder strictly honoring zero-canvas / zero-svg-drawing rule */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F5EFEB] border border-dashed border-[#D8C7B0] rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EFE6DA] flex items-center justify-center text-[#8B1E1E]">
              <ImageIcon className="w-6 h-6 text-[#8B1E1E]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#3E2723] tracking-wide">
                Ceremonial Vietnamese Heritage Trio.png
              </h3>
              <p className="text-xs text-[#5D4037] max-w-md">
                Asset tĩnh đã được khóa cố định theo liên kết Static Asset Binding. Tuyệt đối không tự sinh đồ họa thay thế.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/10 border border-[#8B1E1E]/20 text-[11px] font-semibold text-[#8B1E1E]">
              <Lock className="w-3 h-3" />
              <span>Chế độ khóa ảnh tĩnh bất biến (Strict Image Immutability)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPosterDisplay;
