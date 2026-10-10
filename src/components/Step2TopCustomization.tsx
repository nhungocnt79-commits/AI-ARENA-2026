import React from 'react';
import { CostumeOutfitState } from '../types/costume';
import { COSTUME_ROOTS, VIETNAMESE_PALETTES } from '../data/costumeData';
import { Palette, Sparkles, Wand2, ArrowRight, ArrowLeft, Check, Layers } from 'lucide-react';

interface Step2TopCustomizationProps {
  outfit: CostumeOutfitState;
  onChangeTop: (updatedTop: Partial<CostumeOutfitState['top']>) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenAtelier3D?: () => void;
}

export const Step2TopCustomization: React.FC<Step2TopCustomizationProps> = ({
  outfit,
  onChangeTop,
  onPrev,
  onNext,
  onOpenAtelier3D,
}) => {
  const root = COSTUME_ROOTS[outfit.rootId];

  // Helper to apply recommendation
  const applyColorRecommendation = (rec: { topColor: string; bottomColor: string; accentColor: string }) => {
    onChangeTop({
      primaryColor: rec.topColor,
      innerYemColor: rec.accentColor,
      sashColor: rec.accentColor
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E]">
          <Wand2 className="w-4 h-4 text-[#8B1E1E]" />
          <span>Bước 2 · Định Hình Chi Tiết Thân Áo & Bảng Màu</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#2C241E]">
          Thiết Kế Áo {root.name} Phong Cách Cá Nhân
        </h2>
        <p className="text-xs lg:text-sm text-[#6B5A4B] leading-relaxed">
          Tùy chỉnh phom dáng vạt áo, kiểu cổ áo đoan trang, chất liệu khuy cài và họa tiết thêu. Tự do sáng tạo màu áo từ bảng màu lễ hội dân tộc hoặc chọn mã màu riêng biệt theo sở thích GenZ!
        </p>

        {/* Nút Mở Phòng Trưng Bày 3D 360° Của Nhà Thiết Kế */}
        {onOpenAtelier3D && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenAtelier3D}
              className="w-full p-3.5 rounded-xl bg-gradient-to-r from-[#8B1E1E] via-[#78350F] to-[#047857] text-white hover:opacity-95 transition-all cursor-pointer flex items-center justify-between shadow-xs group"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                    Phòng Trưng Bày 3D 360°: Chiếc Áo Màu Trắng (Haute Couture Atelier)
                  </h4>
                  <p className="text-[11px] text-white/85">
                    Xoay 360° toàn diện mọi góc độ · Xem riêng Áo Tứ Thân, Áo Bà Ba, Áo Ngũ Thân · 6 chất liệu vải trắng cao cấp (nhũ bóng, tơ vân mây, gấm dệt chìm, sa tơ...)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-300 shrink-0 ml-2">
                Mở 3D 360° →
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Recommended Color Harmonies Banner (Đề xuất giải pháp phối màu tối ưu) */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Gợi Ý Phối Màu Tối Ưu Từ Nhà Thiết Kế Cho {root.name}:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {root.colorRecommendations.map((rec, i) => (
            <div
              key={i}
              onClick={() => applyColorRecommendation(rec)}
              className="p-3 bg-white/90 hover:bg-white rounded-xl border border-amber-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C241E] group-hover:text-[#8B1E1E] transition-colors">
                  {rec.title}
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: rec.topColor }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: rec.bottomColor }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: rec.accentColor }} />
                </div>
              </div>
              <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                {rec.description}
              </p>
              <span className="text-[10px] font-semibold text-amber-800 self-end">
                Nhấn để áp dụng nhanh →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Silhouette / Garment Cut */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#8B1E1E]" />
          1. Phom Dáng Vạt Áo (Silhouette)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {root.recommendedSilhouettes.map((sil) => {
            const isSelected = outfit.top.silhouetteId === sil.id;
            return (
              <div
                key={sil.id}
                onClick={() => onChangeTop({ silhouetteId: sil.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/15 shadow-xs'
                    : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C241E]">
                      {sil.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                  </div>
                  <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                    {sil.description}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-[#E8DEC8]/80 text-[10px] text-[#15803D] font-medium">
                  Cách tân GenZ: {sil.modernTwist}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Neckline Option */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
          2. Kiểu Cổ Áo (Thanh Thoát & Đoan Trang)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {root.necklines.map((neck) => {
            const isSelected = outfit.top.necklineId === neck.id;
            return (
              <div
                key={neck.id}
                onClick={() => onChangeTop({ necklineId: neck.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/15 shadow-xs'
                    : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#2C241E]">
                    {neck.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                </div>
                <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                  {neck.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Button / Fastening Option */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
          3. Chi Tiết Cúc Áo / Khuy Cài / Buộc Vạt
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {root.buttonTypes.map((btn) => {
            const isSelected = outfit.top.buttonId === btn.id;
            return (
              <div
                key={btn.id}
                onClick={() => onChangeTop({ buttonId: btn.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/15 shadow-xs'
                    : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#2C241E]">
                    {btn.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                </div>
                <p className="text-[10px] text-[#8C7A6B] mb-1 font-medium">
                  Chất liệu: {btn.material}
                </p>
                <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                  {btn.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Pattern / Texture */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
          4. Họa Tiết & Chất Liệu Thêu
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {root.patterns.map((pat) => {
            const isSelected = outfit.top.patternId === pat.id;
            return (
              <div
                key={pat.id}
                onClick={() => onChangeTop({ patternId: pat.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/15 shadow-xs'
                    : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#2C241E]">
                    {pat.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                </div>
                <p className="text-[11px] text-[#6B5A4B] leading-relaxed mb-1.5">
                  {pat.description}
                </p>
                <div className="text-[10px] text-[#78350F] italic">
                  Ý nghĩa: {pat.symbolism}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Complete Color Palette (Bảng màu Palette đầy đủ) */}
      <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC8] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#8B1E1E]" />
            5. Bảng Màu Sắc Áo Đầy Đủ (Palette Presets & Tùy Chọn Tự Do)
          </label>

          {/* Native Color Picker for Free Choice */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-[#D8C7B0] text-xs">
            <span className="text-[11px] text-[#6B5A4B] font-medium">Màu tự do:</span>
            <input
              type="color"
              value={outfit.top.primaryColor}
              onChange={(e) => onChangeTop({ primaryColor: e.target.value })}
              className="w-6 h-6 rounded-md cursor-pointer border-0 p-0 bg-transparent"
              title="Chọn màu bất kỳ trong bảng mã màu"
            />
            <span className="font-mono text-[11px] text-[#2C241E]">
              {outfit.top.primaryColor.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 12 Traditional & Modern Palette Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {VIETNAMESE_PALETTES.map((palette) => {
            const isSelected = outfit.top.primaryColor.toLowerCase() === palette.hex.toLowerCase();
            return (
              <button
                key={palette.hex}
                onClick={() => onChangeTop({ primaryColor: palette.hex })}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20 shadow-xs'
                    : 'bg-white/70 hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-5 h-5 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: palette.hex }}
                  />
                  {isSelected && <Check className="w-3 h-3 text-[#8B1E1E]" />}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#2C241E] truncate">
                    {palette.name}
                  </div>
                  <div className="text-[9px] text-[#8C7A6B] truncate">
                    {palette.meaning}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Additional layers for Tu Than: Yếm & Sash */}
        {outfit.rootId === 'tu-than' && (
          <div className="pt-3 border-t border-[#E8DEC8] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Yếm color */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2C241E]">
                  Màu Yếm Đào Bên Trong:
                </span>
                <input
                  type="color"
                  value={outfit.top.innerYemColor}
                  onChange={(e) => onChangeTop({ innerYemColor: e.target.value })}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {['#DB2777', '#B91C1C', '#A3B14B', '#F8FAFC'].map((c) => (
                  <button
                    key={c}
                    onClick={() => onChangeTop({ innerYemColor: c })}
                    className={`w-6 h-6 rounded-full border border-black/10 transition-transform ${
                      outfit.top.innerYemColor === c ? 'scale-110 ring-2 ring-[#8B1E1E]' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Sash color */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2C241E]">
                  Màu Dải Thắt Lưng Bao (Sash):
                </span>
                <input
                  type="color"
                  value={outfit.top.sashColor}
                  onChange={(e) => onChangeTop({ sashColor: e.target.value })}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {['#0F766E', '#DB2777', '#D97706', '#A3B14B'].map((c) => (
                  <button
                    key={c}
                    onClick={() => onChangeTop({ sashColor: c })}
                    className={`w-6 h-6 rounded-full border border-black/10 transition-transform ${
                      outfit.top.sashColor === c ? 'scale-110 ring-2 ring-[#8B1E1E]' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step Navigation CTAs */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#6B5A4B] hover:text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay Lại Bước 1</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Tiếp Tục Chọn Quần / Váy Phối Cùng</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step2TopCustomization;
