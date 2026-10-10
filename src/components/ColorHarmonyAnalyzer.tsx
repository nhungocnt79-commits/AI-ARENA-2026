import React from 'react';
import { CostumeOutfitState } from '../types/costume';
import { evaluateColorHarmony } from '../utils/costumeEvaluation';
import { Palette, Sliders } from 'lucide-react';

interface ColorHarmonyAnalyzerProps {
  outfit: CostumeOutfitState;
}

export const ColorHarmonyAnalyzer: React.FC<ColorHarmonyAnalyzerProps> = ({ outfit }) => {
  const harmony = evaluateColorHarmony(outfit);

  return (
    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC8] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
          <Palette className="w-4 h-4" />
          <span>Kiểm Tra Sự Hài Hòa Của Màu Sắc</span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          Điểm Hài Hòa: {harmony.score}/100
        </span>
      </div>

      {/* Overview Card */}
      <div className="p-3.5 bg-white rounded-xl border border-[#D8C7B0] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#2C241E]">
            Kiểu Phối Màu: {harmony.harmonyType}
          </span>
          <span className="text-[11px] text-[#8C7A6B]">
            Độ tương phản: {harmony.contrastRatio}:1
          </span>
        </div>
        <p className="text-xs text-[#6B5A4B] leading-relaxed">
          {harmony.designerVerdict}
        </p>
      </div>

      {/* 60-30-10 Rule Visual Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#4A3B32]">
          <span className="font-semibold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-[#8B1E1E]" />
            Phân Bổ Tỷ Lệ Màu 60 - 30 - 10
          </span>
          <span className="text-[11px] text-[#8C7A6B]">Chuẩn Mỹ Thuật Thị Giác</span>
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="w-full h-4 rounded-full overflow-hidden flex border border-black/10 shadow-2xs">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: '60%',
              backgroundColor: outfit.top.primaryColor
            }}
            title="60% Thân Áo Chủ Đạo"
          />
          <div
            className="h-full transition-all duration-300"
            style={{
              width: '30%',
              backgroundColor: outfit.bottom.color
            }}
            title="30% Quần / Chân Váy"
          />
          <div
            className="h-full transition-all duration-300"
            style={{
              width: '10%',
              backgroundColor: outfit.rootId === 'tu-than' ? outfit.top.sashColor : '#D4AF37'
            }}
            title="10% Điểm Xuyết Phụ Kiện"
          />
        </div>

        {/* Segment Details */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
          {harmony.paletteBreakdown.map((item, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-white/70 border border-[#E8DEC8] space-y-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-bold text-[#2C241E] truncate">{item.role}</span>
              </div>
              <p className="text-[10px] text-[#8C7A6B] leading-tight truncate">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorHarmonyAnalyzer;

