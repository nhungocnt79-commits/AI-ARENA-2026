import React, { useState } from 'react';
import { COSTUME_ROOTS, ACCESSORIES_DATABASE } from '../data/costumeData';
import { CostumeRootId } from '../types/costume';
import { BookOpen, X, Search } from 'lucide-react';

interface CulturalKnowledgeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRootFromDrawer: (rootId: CostumeRootId) => void;
}

export const CulturalKnowledgeDrawer: React.FC<CulturalKnowledgeDrawerProps> = ({
  isOpen,
  onClose,
  onSelectRootFromDrawer,
}) => {
  const [filter, setFilter] = useState<'all' | 'costume' | 'accessories'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const costumes = Object.values(COSTUME_ROOTS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B0] shadow-2xl p-6 lg:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
              Không Gian Mở Tra Cứu
            </span>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#2C241E]">
              Bách Khoa Toàn Thư Di Sản Việt Phục
            </h3>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-[#9B2C2C] shadow-2xs' : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Tất Cả Di Sản
            </button>
            <button
              onClick={() => setFilter('costume')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'costume' ? 'bg-white text-[#9B2C2C] shadow-2xs' : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              3 Hệ Phục Trang
            </button>
            <button
              onClick={() => setFilter('accessories')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'accessories' ? 'bg-white text-[#9B2C2C] shadow-2xs' : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Kho Phụ Kiện
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8C7A6B]" />
            <input
              type="text"
              placeholder="Tìm kiếm ý nghĩa, tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-[#D8C7B0] focus:outline-hidden focus:border-[#9B2C2C] text-[#2C241E]"
            />
          </div>
        </div>

        {/* 3 Main Costumes Grid */}
        {(filter === 'all' || filter === 'costume') && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
              Ba Cốt Cách Phục Trang Tiêu Biểu:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {costumes
                .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase()))
                .map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-white border border-[#E8DEC8] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFE7DC] text-[#6B5A4B]">
                          {c.regionalTag}
                        </span>
                        <span className="text-[10px] text-[#8C7A6B]">{c.epoch}</span>
                      </div>
                      <h5 className="font-serif font-bold text-base text-[#2C241E]">
                        {c.name}
                      </h5>
                      <p className="text-xs text-[#6B5A4B] leading-relaxed">
                        {c.meaning}
                      </p>
                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[11px] text-[#78350F]">
                        <strong>Triết lý thẩm mỹ:</strong> {c.philosophy}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectRootFromDrawer(c.id);
                        onClose();
                      }}
                      className="w-full py-1.5 text-xs font-semibold text-[#9B2C2C] bg-[#9B2C2C]/5 hover:bg-[#9B2C2C]/10 border border-[#9B2C2C]/20 rounded-xl transition-colors cursor-pointer"
                    >
                      Bắt đầu phối bộ này →
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Accessories Gallery */}
        {(filter === 'all' || filter === 'accessories') && (
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
              Phụ Kiện Truyền Thống & Biến Tấu Đương Đại:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ACCESSORIES_DATABASE
                .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.culturalOrigin.toLowerCase().includes(search.toLowerCase()))
                .map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3.5 rounded-xl bg-white border border-[#E8DEC8] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C241E]">
                        {acc.name}
                      </span>
                      <span className="text-[10px] text-[#8C7A6B] capitalize">
                        {acc.type === 'shoes' ? 'Giày' : acc.type === 'jewelry' ? 'Trang sức' : 'Phụ kiện tóc'}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#9B2C2C] italic">
                      {acc.culturalOrigin}
                    </div>
                    <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                      {acc.meaning}
                    </p>
                    <div className="text-[10px] text-[#15803D] pt-1 border-t border-[#E8DEC8]/80">
                      Gợi ý phối GenZ: {acc.styleAdvice}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalKnowledgeDrawer;

