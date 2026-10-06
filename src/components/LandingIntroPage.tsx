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
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 flex flex-col items-center text-center space-y-8">
        
        {/* TÊN CỦA WEBSITE: GIAO THOA: xuống hàng XƯỞNG VIỆT PHỤC GENZ, tất cả canh giữa */}
        <div className="w-full text-center space-y-4 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs font-semibold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            Dự Án Phi Lợi Nhuận Tôn Vinh Di Sản Văn Hóa Việt
          </div>

          <h1 className="text-center font-serif font-black tracking-tight text-[#851D1D] leading-tight">
            <span className="block text-4xl sm:text-6xl lg:text-7xl tracking-wide">
              GIAO THOA:
            </span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl tracking-normal mt-1.5 sm:mt-2.5 text-[#9B2C2C]">
              XƯỞNG VIỆT PHỤC GENZ
            </span>
          </h1>

          <p className="text-center text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
            Không Gian Khám Phá Quy Chuẩn & Phối Đồ Truyền Thống Đương Đại
          </p>
        </div>

        {/* HÌNH ẢNH MINH HỌA BÊN DƯỚI TÊN WEBSITE (GIỮ NGUYÊN HÌNH ẢNH GỐC, KHÔNG THIẾT KẾ LẠI) */}
        <div className="w-full">
          <HeroPosterDisplay />
        </div>

        {/* ĐOẠN MÔ TẢ THEO ĐÚNG NỘI DUNG YÊU CẦU */}
        <div className="max-w-3xl mx-auto px-4 py-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E8DEC8] shadow-sm">
          <p className="text-sm sm:text-base lg:text-lg text-[#3E3228] font-medium leading-relaxed italic text-center font-serif">
            &ldquo;Là một dự án phi lợi nhuận hoàn toàn không vì mục đích thương mại, 
            nền tảng này được ra đời với sứ mệnh kết nối và tôn vinh vẻ đẹp Việt phục 
            giao thoa cùng hơi thở đương đại - nơi bạn thỏa sức sáng tạo và định hình dấu 
            ấn cá nhân thông qua từng trang phục Việt.&rdquo;
          </p>
        </div>

        {/* 3 NÚT HÀNH ĐỘNG CHÍNH */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          {/* Nút 1: Cẩm nang văn hóa */}
          <button
            type="button"
            onClick={onOpenKnowledge}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#EFE7DC] hover:bg-[#E5DACB] text-[#2C241E] border border-[#D8C7B0] text-sm font-bold shadow-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <BookOpen className="w-4 h-4 text-[#8C7A6B] group-hover:text-[#9B2C2C] transition-colors" />
            <span>Cẩm Nang Văn Hóa</span>
          </button>

          {/* Nút 2: Kho lưu trữ việt phục */}
          <button
            type="button"
            onClick={onOpenArchive}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-white text-[#4A3B32] border border-[#D8C7B0] text-sm font-bold shadow-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Archive className="w-4 h-4 text-[#B45309] group-hover:scale-110 transition-transform" />
            <span>Kho Lưu Trữ Việt Phục</span>
          </button>

          {/* Nút 3: Đi đến phòng phối đồ ngay */}
          <button
            type="button"
            onClick={onGoToStudio}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#9B2C2C] hover:bg-[#7F1D1D] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FDE047]" />
            <span>Đi Đến Phòng Phối Đồ Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* GỢI Ý CUỘN XUỐNG DƯỚI ĐỂ KHÁM PHÁ CỬA HÀNG TRƯNG BÀY PHỐI SẴN */}
        <div className="pt-6">
          <button
            type="button"
            onClick={scrollToCuratedShowroom}
            className="group flex flex-col items-center gap-2 text-xs font-semibold text-[#8C7A6B] hover:text-[#9B2C2C] transition-colors cursor-pointer select-none"
          >
            <span className="tracking-wide">
              Cuộn xuống khám phá Cửa Hàng Trưng Bày Phối Sẵn
            </span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#D8C7B0] flex items-center justify-center group-hover:border-[#9B2C2C] group-hover:translate-y-1 transition-all shadow-2xs">
              <ArrowDown className="w-4 h-4" />
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
