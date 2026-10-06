import React from 'react';
import { BookOpen, GitCompare, ShieldCheck, Archive, Sparkles, Home } from 'lucide-react';

interface HeaderProps {
  pageView: 'intro' | 'atelier';
  currentStep: number;
  onGoToIntro: () => void;
  onGoToStudio: () => void;
  onOpenKnowledge: () => void;
  onOpenEtiquette: () => void;
  onOpenCompare: () => void;
  onOpenArchive: () => void;
  onGoToStep: (step: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  pageView,
  currentStep,
  onGoToIntro,
  onGoToStudio,
  onOpenKnowledge,
  onOpenEtiquette,
  onOpenCompare,
  onOpenArchive,
  onGoToStep,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Wordmark Logo */}
        <button
          onClick={onGoToIntro}
          className="text-left group cursor-pointer flex items-center gap-2.5"
          title="Về trang giới thiệu Giao Thoa"
        >
          <div className="w-8 h-8 rounded-xl bg-[#9B2C2C] text-white flex items-center justify-center font-serif font-black text-base shadow-xs group-hover:scale-105 transition-transform">
            GT
          </div>
          <div>
            <span className="text-xl lg:text-2xl font-serif font-bold tracking-tight text-[#2C241E] group-hover:text-[#9B2C2C] transition-colors">
              Giao Thoa
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs uppercase tracking-widest text-[#8C7A6B] font-sans">
              Xưởng Việt Phục GenZ
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-[#6B5A4B]">
          <button
            onClick={onGoToIntro}
            className={`transition-colors hover:text-[#9B2C2C] cursor-pointer flex items-center gap-1.5 ${
              pageView === 'intro' ? 'text-[#9B2C2C] font-bold' : ''
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Giới Thiệu & Trưng Bày</span>
          </button>

          <button
            onClick={onGoToStudio}
            className={`transition-colors hover:text-[#9B2C2C] cursor-pointer flex items-center gap-1.5 ${
              pageView === 'atelier' && currentStep === 1 ? 'text-[#9B2C2C] font-bold' : ''
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Phòng Phối Đồ</span>
          </button>

          {pageView === 'atelier' && (
            <>
              <button
                onClick={() => onGoToStep(2)}
                className={`transition-colors hover:text-[#9B2C2C] cursor-pointer ${
                  currentStep === 2 ? 'text-[#9B2C2C] font-semibold' : ''
                }`}
              >
                Chọn Áo
              </button>
              <button
                onClick={() => onGoToStep(3)}
                className={`transition-colors hover:text-[#9B2C2C] cursor-pointer ${
                  currentStep === 3 ? 'text-[#9B2C2C] font-semibold' : ''
                }`}
              >
                Chọn Quần
              </button>
              <button
                onClick={() => onGoToStep(4)}
                className={`transition-colors hover:text-[#9B2C2C] cursor-pointer ${
                  currentStep === 4 ? 'text-[#9B2C2C] font-semibold' : ''
                }`}
              >
                Phụ Kiện
              </button>
              <button
                onClick={() => onGoToStep(5)}
                className={`transition-colors hover:text-[#9B2C2C] cursor-pointer ${
                  currentStep === 5 ? 'text-[#9B2C2C] font-semibold' : ''
                }`}
              >
                Lookbook
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Kho Lưu Trữ */}
          <button
            onClick={onOpenArchive}
            title="Kho lưu trữ những nhân vật và bộ đồ bạn đã thiết kế"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4A3B32] bg-[#F5EFE6] hover:bg-[#EFE7DC] border border-[#D8C7B0] rounded-xl transition-colors cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="hidden sm:inline">Kho Lưu Trữ</span>
          </button>

          {/* Quy Chuẩn */}
          <button
            onClick={onOpenEtiquette}
            title="Kiểm tra thuần phong mỹ tục và nếp văn hóa"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#78350F] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D] rounded-xl transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="hidden md:inline">Quy Chuẩn</span>
          </button>

          {/* Ý Nghĩa Di Sản */}
          <button
            onClick={onOpenKnowledge}
            title="Xem thư viện văn hóa và nguồn gốc di sản"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] border border-[#D8C7B0] rounded-xl transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span className="hidden md:inline">Cẩm Nang</span>
          </button>

          {pageView === 'atelier' && (
            <button
              onClick={onOpenCompare}
              title="So sánh phương án phối đồ"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">So Sánh</span>
            </button>
          )}

          {pageView === 'intro' && (
            <button
              onClick={onGoToStudio}
              title="Bước vào phòng phối đồ ngay"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Phòng Phối Đồ</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
