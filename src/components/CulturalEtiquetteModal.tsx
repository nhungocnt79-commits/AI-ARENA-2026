import React from 'react';
import { CulturalAssessment } from '../types/costume';
import { ShieldCheck, X, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface CulturalEtiquetteModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: CulturalAssessment;
}

export const CulturalEtiquetteModal: React.FC<CulturalEtiquetteModalProps> = ({
  isOpen,
  onClose,
  assessment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B0] shadow-2xl p-6 lg:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
              Bộ Tiêu Chuẩn Nền Tảng
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2C241E]">
              Thuần Phong Mỹ Tục & Giữ Gìn Bản Sắc
            </h3>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {assessment.title}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Điểm đoan trang: {assessment.score}/100
            </span>
          </div>
          <p className="text-xs text-[#6B5A4B] leading-relaxed">
            {assessment.message}
          </p>
        </div>

        {/* Educational Etiquette Principles for Gen Z */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-[#9B2C2C]" />
            Quy Chuẩn Khi Mặc Việt Phục Đi Lễ Hội & Đền Đình
          </h4>

          <div className="space-y-2 text-xs text-[#4A3B32]">
            <div className="p-3 rounded-xl bg-white/70 border border-[#E8DEC8] flex items-start gap-2.5">
              <span className="text-base">✨</span>
              <div>
                <strong className="text-[#2C241E]">Không mặc yếm trần khi dự lễ:</strong>
                <p className="text-[#6B5A4B] mt-0.5">
                  Áo yếm là trang phục nội y truyền thống của phụ nữ. Khi đi lễ hội hoặc không gian tâm linh, bắt buộc phải khoác áo tứ thân bên ngoài để giữ trọn vẻ đoan trang, tôn kính.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-[#E8DEC8] flex items-start gap-2.5">
              <span className="text-base">🌸</span>
              <div>
                <strong className="text-[#2C241E]">Độ xẻ tà vừa phải, không hở da thịt:</strong>
                <p className="text-[#6B5A4B] mt-0.5">
                  Tà áo bà ba hay ngũ thân cách tân được đo vừa vặn qua hông. Tránh các biến tấu xẻ tà quá cao hoặc cúp ngực hở hang làm biến dạng cốt cách di sản.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 border border-[#E8DEC8] flex items-start gap-2.5">
              <span className="text-base">🌿</span>
              <div>
                <strong className="text-[#2C241E]">Cách tân năng động nhưng không lố lăng:</strong>
                <p className="text-[#6B5A4B] mt-0.5">
                  Bạn trẻ GenZ hoàn toàn có thể phối sneaker thêu, giày Mary Jane, mắt kính retro hoặc tất ren để thoải mái di chuyển, miễn là tổng thể vẫn giữ sự trang nhã, chỉn chu.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Lore Quote */}
        {assessment.historicalQuote && (
          <div className="p-4 rounded-2xl bg-[#EFE7DC]/60 border-l-4 border-[#9B2C2C] italic text-xs text-[#5C4D40] leading-relaxed">
            {assessment.historicalQuote}
          </div>
        )}

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs font-semibold text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl transition-colors cursor-pointer"
        >
          Đã Hiểu & Tiếp Tục Trải Nghiệm
        </button>
      </div>
    </div>
  );
};

export default CulturalEtiquetteModal;

