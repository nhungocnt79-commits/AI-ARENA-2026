import React from 'react';
import { CostumeOutfitState } from '../types/costume';
import { COSTUME_ROOTS, VIETNAMESE_PALETTES } from '../data/costumeData';
import { getContrastRatio } from '../utils/costumeEvaluation';
import { Palette, Sparkles, ArrowRight, ArrowLeft, Check, Compass, Rotate3d, Eye } from 'lucide-react';

interface Step3BottomCustomizationProps {
  outfit: CostumeOutfitState;
  onChangeBottom: (updatedBottom: Partial<CostumeOutfitState['bottom']>) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenAtelier3D?: (bottomType?: 'vay-xep-ly-dai' | 'vay-lua-bong' | 'quan-ong-xeo' | 'vay-dup-trang') => void;
}

export const Step3BottomCustomization: React.FC<Step3BottomCustomizationProps> = ({
  outfit,
  onChangeBottom,
  onPrev,
  onNext,
  onOpenAtelier3D,
}) => {
  const root = COSTUME_ROOTS[outfit.rootId];
  const topColor = outfit.top.primaryColor;
  const currentBottomColor = outfit.bottom.color;
  const contrast = getContrastRatio(topColor, currentBottomColor);

  // Dynamic recommendations based on current top color
  const suggestedBottoms = [
    {
      title: 'Kinh Điển: Đen Tuyền Mun',
      hex: '#18181B',
      reason: 'Quần lụa đen tuyền là chuẩn mực ngàn đời của phụ nữ Việt, tôn vinh độ rực rỡ của tà áo phía trên.',
      tag: 'Truyền Thống'
    },
    {
      title: 'Thanh Nhã: Trắng Ngọc Trai',
      hex: '#F8FAFC',
      reason: 'Mang lại sự thanh tao, sáng sủa, cực kỳ ăn ảnh khi tham gia lễ hội ban ngày dưới ánh nắng xuân.',
      tag: 'Đoan Trang'
    },
    {
      title: 'Đồng Điệu: Tone-sur-Tone',
      hex: topColor,
      reason: 'Phối màu quần tiệp màu áo tạo cảm giác kéo dài đôi chân, phong thái nhẹ nhàng, thanh thoát của GenZ.',
      tag: 'Hiện Đại'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E]">
          <Compass className="w-4 h-4 text-[#8B1E1E]" />
          <span>Bước 3 · Phối Quần & Chân Váy Hài Hòa</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#2C241E]">
          Chọn Phom Dáng & Màu Quần Tương Thích Với Màu Áo
        </h2>
        <p className="text-xs lg:text-sm text-[#6B5A4B] leading-relaxed">
          Quần lụa hoặc chân váy đóng vai trò bệ đỡ nâng đỡ toàn bộ vạt áo. Hãy tự do lựa chọn màu sắc trong bảng màu để tạo sự tương phản hoặc đồng điệu tuyệt mỹ với chiếc áo bạn vừa chọn!
        </p>

        {/* Nút Mở Phòng Trưng Bày 3D 360° Chi Tiết Quần Ống Xéo & Các Mẫu Váy */}
        {onOpenAtelier3D && (
          <div className="pt-1">
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#2A231E] via-[#3D3025] to-[#241C16] border border-[#C5A059]/40 text-white shadow-md flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
                  <Rotate3d className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Phòng Trưng Bày 3D 360°
                    </span>
                    <span className="text-[10px] bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30">
                      Haute Couture Studio
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Chiêm Ngưỡng Váy Xếp Ly Dài, Váy Lụa Satin, Quần Ống Xéo & Váy Đụp 360°
                  </h3>
                  <p className="text-[11px] text-zinc-300">
                    Phóng to, đổi 6 chất liệu vải trắng cao cấp và xoay 360 độ ngắm trọn từng nếp rủ và gấu lượn sóng.
                  </p>
                </div>
              </div>
              
              {/* Quick action buttons for 3D bottoms */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-1">
                <button
                  type="button"
                  onClick={() => onOpenAtelier3D('vay-xep-ly-dai')}
                  className="px-2.5 py-1.5 bg-[#B45309] hover:bg-[#92400E] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Váy Xếp Ly Dài</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAtelier3D('vay-lua-bong')}
                  className="px-2.5 py-1.5 bg-amber-600/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Váy Lụa Satin</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAtelier3D('quan-ong-xeo')}
                  className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Quần Ống Xéo</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAtelier3D('vay-dup-trang')}
                  className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Váy Đụp Lụa</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Color Harmony Analysis Card between Top & Bottom */}
      <div className="p-4 rounded-2xl bg-white border border-[#D8C7B0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            <div
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white uppercase"
              style={{ backgroundColor: topColor }}
              title="Màu áo đang chọn"
            >
              Áo
            </div>
            <div
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white uppercase"
              style={{ backgroundColor: currentBottomColor }}
              title="Màu quần đang chọn"
            >
              Quần
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-[#2C241E]">
              Chỉ số tương phản thị giác: {contrast.toFixed(1)}:1
            </div>
            <div className="text-[11px] text-[#6B5A4B]">
              {contrast > 4.5
                ? 'Độ tương phản cao kinh điển, vạt áo nổi bật rõ rệt trên nền quần!'
                : contrast < 1.5
                ? 'Phối đơn sắc tone-sur-tone thanh lịch, tạo cảm giác người mặc cao ráo hơn!'
                : 'Độ hài hòa bổ trợ tự nhiên, dịu mắt và trang nhã.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <span className="text-[11px] font-medium text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            ✓ Đạt chuẩn đoan trang
          </span>
        </div>
      </div>

      {/* Recommended Bottom Color Presets based on Top Color */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Gợi Ý Màu Quần Tối Ưu Tương Thích Với Màu Áo Hiện Tại:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {suggestedBottoms.map((sug, i) => (
            <div
              key={i}
              onClick={() => onChangeBottom({ color: sug.hex })}
              className="p-3 bg-white/90 hover:bg-white rounded-xl border border-amber-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C241E] group-hover:text-[#8B1E1E] transition-colors">
                  {sug.title}
                </span>
                <span
                  className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                  style={{ backgroundColor: sug.hex }}
                />
              </div>
              <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                {sug.reason}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#E8DEC8]/50 text-[10px]">
                <span className="font-semibold text-amber-800">{sug.tag}</span>
                <span className="text-amber-800 font-medium">Áp dụng →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Bottom Type Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
          1. Lựa Chọn Kiểu Dáng Quần / Chân Váy
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {root.recommendedBottoms.map((bot) => {
            const isSelected = outfit.bottom.bottomId === bot.id;
            return (
              <div
                key={bot.id}
                onClick={() => onChangeBottom({ bottomId: bot.id })}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/15 shadow-xs'
                    : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2C241E]">
                      {bot.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                  </div>
                  <p className="text-[11px] text-[#6B5A4B] leading-relaxed mb-2">
                    {bot.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#15803D] pt-1.5 border-t border-[#E8DEC8]/80 font-medium">
                  <span className="truncate mr-1">Phù hợp: {bot.appropriateFor}</span>
                  {onOpenAtelier3D && (
                    (bot.id === 'bot-vay-xep-ly-dai' || bot.id === 'bot-vay-lua-bong-cat-xeo' || bot.id === 'bot-quan-ong-xeo-lua-trang-nga' || bot.id === 'bot-vay-dup-lua-trang-xoe-rong') && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const targetMap: Record<string, any> = {
                            'bot-vay-xep-ly-dai': 'vay-xep-ly-dai',
                            'bot-vay-lua-bong-cat-xeo': 'vay-lua-bong',
                            'bot-quan-ong-xeo-lua-trang-nga': 'quan-ong-xeo',
                            'bot-vay-dup-lua-trang-xoe-rong': 'vay-dup-trang'
                          };
                          onOpenAtelier3D(targetMap[bot.id]);
                        }}
                        className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                        title="Xem mô hình 3D 360° mẫu quần/váy này"
                      >
                        <Rotate3d className="w-2.5 h-2.5" />
                        <span>3D 360°</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Color Palette for Bottom */}
      <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC8] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#8B1E1E]" />
            2. Bảng Màu Sắc Quần / Váy (Palette Presets & Tùy Chọn Tự Do)
          </label>

          {/* Color Picker Input */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-[#D8C7B0] text-xs">
            <span className="text-[11px] text-[#6B5A4B] font-medium">Màu tự do:</span>
            <input
              type="color"
              value={outfit.bottom.color}
              onChange={(e) => onChangeBottom({ color: e.target.value })}
              className="w-6 h-6 rounded-md cursor-pointer border-0 p-0 bg-transparent"
              title="Chọn bất kỳ màu nào bạn muốn"
            />
            <span className="font-mono text-[11px] text-[#2C241E]">
              {outfit.bottom.color.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 12 Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {VIETNAMESE_PALETTES.map((palette) => {
            const isSelected = outfit.bottom.color.toLowerCase() === palette.hex.toLowerCase();
            return (
              <button
                key={palette.hex}
                onClick={() => onChangeBottom({ color: palette.hex })}
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
                    {palette.region}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation CTAs */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#6B5A4B] hover:text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay Lại Bước 2 (Áo)</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Tiếp Tục Lật Mở Album Phụ Kiện</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step3BottomCustomization;
