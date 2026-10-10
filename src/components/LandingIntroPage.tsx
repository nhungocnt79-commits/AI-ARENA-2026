import React from 'react';
import { HeroPosterDisplay } from './HeroPosterDisplay';
import { ShowroomCuratedOutfits } from './ShowroomCuratedOutfits';
import { CostumeOutfitState } from '../types/costume';
import { 
  BookOpen, 
  Archive, 
  Sparkles, 
  ArrowDown, 
  ArrowRight, 
  Compass, 
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';

interface LandingIntroPageProps {
  onGoToStudio: () => void;
  onOpenKnowledge: () => void;
  onOpenArchive: () => void;
  onSelectAndApplyOutfit: (outfit: CostumeOutfitState) => void;
}

export const LandingIntroPage: React.FC<LandingIntroPageProps> = ({
  onGoToStudio,
  onOpenKnowledge,
  onOpenArchive,
  onSelectAndApplyOutfit,
}) => {
  const scrollToCuratedShowroom = () => {
    const el = document.getElementById('showroom-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ========================================================= */}
      {/* 1. HERO INTRO SECTION (TRANG MỞ ĐẦU CHÍNH)                */}
      {/* ========================================================= */}
      <section id="hero-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 flex flex-col items-center text-center space-y-8">
        
        {/* TÊN CỦA WEBSITE: Times New Roman, màu đỏ đậm, in đậm, in hoa */}
        <div className="w-full text-center space-y-3 flex flex-col items-center justify-center">
          <h1
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="text-center font-bold uppercase tracking-tight text-[#8B1E1E] leading-[1.12]"
          >
            <span className="block text-4xl sm:text-6xl lg:text-7xl tracking-wide">
              GIAO THOA:
            </span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl mt-1.5 sm:mt-2.5 tracking-normal">
              XƯỞNG VIỆT PHỤC GENZ
            </span>
          </h1>

          {/* DÒNG CHỮ NHỎ HƠN PHÍA DƯỚI: NẰM TRÊN CÙNG MỘT HÀNG, MÀU NÂU ĐẬM #3E2723 */}
          <p className="text-center text-sm sm:text-base lg:text-lg font-medium text-[#3E2723] whitespace-nowrap pt-1">
            Nơi vẻ đẹp di sản dân tộc hòa cùng nhịp thở thanh xuân hiện đại
          </p>
        </div>

        {/* HÌNH ẢNH MINH HỌA VỚI KHUNG VIỀN BO GÓC NHẸ NHÀNG, GIỮ NGUYÊN 100% ẢNH CÓ SẴN */}
        <div className="w-full">
          <HeroPosterDisplay />
        </div>

        {/* ĐOẠN MÔ TẢ ĐỊNH DẠNG FONT LORA, IN NGHIÊNG, CHÍNH XÁC CHÍNH TẢ 100% */}
        <div className="max-w-4xl mx-auto px-6 py-5 rounded-2xl bg-[#F5EFEB]/90 backdrop-blur-md border border-[#D8C7B0] shadow-sm">
          <p
            style={{ fontFamily: "'Lora', serif" }}
            className="text-sm sm:text-base lg:text-lg text-[#3E2723] leading-relaxed italic text-center font-normal"
          >
            &ldquo;Là một dự án phi lợi nhuận hoàn toàn không vì mục đích thương mại, nền tảng này được ra đời với sứ mệnh kết nối và tôn vinh vẻ đẹp Việt phục giao thoa cùng hơi thở đương đại - nơi bạn thỏa sức sáng tạo và định hình dấu ấn cá nhân thông qua từng trang phục Việt.&rdquo;
          </p>
        </div>

        {/* 3 NÚT HÀNH ĐỘNG: CẨM NANG VĂN HÓA, KHO LƯU TRỮ VIỆT PHỤC, ĐI ĐẾN PHÒNG PHỐI ĐỒ NGAY */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Nút 1: Cẩm nang văn hóa (Outline button, viền đỏ đậm, icon cuốn sách mở) */}
          <button
            type="button"
            onClick={onOpenKnowledge}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-2 border-[#8B1E1E] text-[#8B1E1E] hover:bg-[#8B1E1E]/5 bg-transparent text-sm font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#8B1E1E]" />
            <span>Cẩm nang văn hóa</span>
          </button>

          {/* Nút 2: Kho lưu trữ việt phục (Outline button, viền nâu đất, icon kho lưu trữ/lookbook cá nhân) */}
          <button
            type="button"
            onClick={onOpenArchive}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-2 border-[#4A3525] text-[#4A3525] hover:bg-[#4A3525]/5 bg-transparent text-sm font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Archive className="w-4 h-4 text-[#4A3525]" />
            <span>Kho lưu trữ việt phục</span>
          </button>

          {/* Nút 3: Đi đến phòng phối đồ ngay (Primary CTA button, nền đỏ đậm #8B1E1E, chữ trắng ngà, hover nổi bật) */}
          <button
            type="button"
            onClick={scrollToCuratedShowroom}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-[#FAF7F2] text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-2 ring-[#8B1E1E]/20"
          >
            <Sparkles className="w-4 h-4 text-[#FDE047]" />
            <span>Đi đến phòng phối đồ ngay</span>
            <ArrowDown className="w-4 h-4 text-[#FAF7F2]" />
          </button>
        </div>

        {/* GỢI Ý CUỘN XUỐNG DƯỚI ĐỂ KHÁM PHÁ CỬA HÀNG TRƯNG BÀY PHỐI SẴN */}
        <div className="pt-4">
          <button
            type="button"
            onClick={scrollToCuratedShowroom}
            className="group flex flex-col items-center gap-2 text-xs font-semibold text-[#8C7A6B] hover:text-[#8B1E1E] transition-colors cursor-pointer select-none"
          >
            <span className="tracking-wide">
              Cuộn chuột xuống để khám phá Cửa Hàng Trưng Bày Phối Sẵn 3 Miền
            </span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#D8C7B0] flex items-center justify-center group-hover:border-[#8B1E1E] group-hover:translate-y-1 transition-all shadow-2xs">
              <ArrowDown className="w-4 h-4 text-[#8B1E1E]" />
            </div>
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CỬA HÀNG TRƯNG BÀY VỚI 3 BỘ PHỐI SẴN (CUỘN XUỐNG DƯỚI) */}
      {/* ========================================================= */}
      <div className="w-full border-t border-[#E8DEC8] bg-gradient-to-b from-[#FAF7F2] to-[#F5EFE6]">
        <ShowroomCuratedOutfits onSelectAndApplyOutfit={onSelectAndApplyOutfit} />
      </div>
    </div>
  );
};

export default LandingIntroPage;
