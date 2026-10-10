import React from 'react';
import { CostumeRootId } from '../types/costume';
import { COSTUME_ROOTS } from '../data/costumeData';
import { Sparkles, MapPin, Calendar, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface Step1CostumeSelectionProps {
  selectedRootId: CostumeRootId;
  onSelectRoot: (id: CostumeRootId) => void;
  onNext: () => void;
}

export const Step1CostumeSelection: React.FC<Step1CostumeSelectionProps> = ({
  selectedRootId,
  onSelectRoot,
  onNext,
}) => {
  const costumeList = Object.values(COSTUME_ROOTS);

  return (
    <div className="space-y-6">
      {/* Intro Editorial Banner */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E]">
          <Sparkles className="w-4 h-4 text-[#8B1E1E]" />
          <span>Bước 1 · Khởi Tạo Hệ Trang Phục Lễ Hội</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#2C241E] leading-tight">
          Chọn Cốt Cách Việt Phục Bạn Muốn Khám Phá
        </h2>
        <p className="text-sm text-[#6B5A4B] leading-relaxed max-w-3xl">
          Mỗi hệ phục trang truyền thống Việt Nam đều mang trong mình chiều sâu triết lý sống, cốt cách đoan trang và vẻ đẹp đặc trưng của từng vùng miền. Bạn có thể phối theo từng lớp (áo yếm lót trong, áo khoác ngoài, dải bao, quần lụa) hiển thị phía bên tay trái nhân vật để dễ dàng cảm nhận mức độ hài hòa!
        </p>

        {/* Layer Exploded View Notice Banner */}
        <div className="p-3 rounded-xl bg-[#F5EFEB] border border-[#D8C7B0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#3E2723]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B1E1E] shrink-0" />
            <span>
              <strong>Trải nghiệm phối đồ đa tầng:</strong> Bạn sẽ thấy cả áo khoác ngoài và lớp áo yếm phía bên trong đã chọn, các lớp này hiển thị phía bên tay trái nhân vật để dễ dàng tinh chỉnh.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#8B1E1E] shrink-0">
            ✓ Bóc tách & xem từng lớp
          </span>
        </div>
      </div>

      {/* 3 Main Costume Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {costumeList.map((costume) => {
          const isSelected = selectedRootId === costume.id;

          return (
            <div
              key={costume.id}
              onClick={() => onSelectRoot(costume.id)}
              className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FFFFFF] border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20 shadow-md scale-[1.01]'
                  : 'bg-[#FAF7F2]/60 hover:bg-[#FFFFFF] border-[#E8DEC8] hover:border-[#C8B39B] shadow-2xs'
              }`}
            >
              {/* Region Pill Indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#8C7A6B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1E1E]" />
                  {costume.region}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#8B1E1E] text-white'
                      : 'bg-[#EFE7DC] text-[#6B5A4B]'
                  }`}
                >
                  {costume.regionalTag}
                </span>
              </div>

              {/* Title & Epoch */}
              <div className="space-y-1.5 mb-3">
                <h3 className="text-xl font-serif font-bold text-[#2C241E] group-hover:text-[#8B1E1E] transition-colors">
                  {costume.name}
                </h3>
                <p className="text-xs text-[#8C7A6B] italic">
                  {costume.epoch}
                </p>
              </div>

              {/* Cultural Meaning & Symbolism */}
              <div className="space-y-3 text-xs text-[#4A3B32] mb-4">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80 space-y-1">
                  <div className="font-semibold text-[#2C241E] flex items-center gap-1.5 text-[11px]">
                    <Heart className="w-3 h-3 text-[#8B1E1E]" />
                    Ý Nghĩa Cốt Lõi:
                  </div>
                  <p className="text-[#6B5A4B] leading-relaxed">
                    {costume.meaning}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]/80 space-y-1">
                  <div className="font-semibold text-[#2C241E] flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3 h-3 text-[#B45309]" />
                    Bối Cảnh Lễ Hội Tiêu Biểu:
                  </div>
                  <p className="text-[#6B5A4B] leading-relaxed">
                    {costume.festivalContext}
                  </p>
                </div>
              </div>

              {/* Modesty Highlights */}
              <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between text-xs">
                <span className="text-[#15803D] flex items-center gap-1 text-[11px] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Chuẩn mực đoan trang
                </span>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#8B1E1E] bg-[#8B1E1E]'
                      : 'border-[#C8B39B] bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next CTA Step */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
        <div className="text-xs text-[#8C7A6B]">
          Đang chọn: <span className="font-semibold text-[#2C241E]">{COSTUME_ROOTS[selectedRootId].name}</span>
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Tiếp Tục Chọn & Thiết Kế Áo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step1CostumeSelection;
