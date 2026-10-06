import React, { useState } from 'react';
import { CostumeOutfitState } from '../types/costume';
import { ACCESSORIES_DATABASE } from '../data/costumeData';
import { 
  BookMarked, 
  Sparkles, 
  Footprints, 
  Shield, 
  Crown, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Wand2,
  Flower,
  Disc,
  Glasses
} from 'lucide-react';

interface Step4AccessoriesAlbumProps {
  outfit: CostumeOutfitState;
  onUpdateAccessories: (updated: Partial<CostumeOutfitState['accessories']>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step4AccessoriesAlbum: React.FC<Step4AccessoriesAlbumProps> = ({
  outfit,
  onUpdateAccessories,
  onPrev,
  onNext,
}) => {
  // 3 sequential sub-tabs in the album as specifically ordered by user
  type AlbumSection = 'shoes' | 'jewelry' | 'hair';
  const [activeSection, setActiveSection] = useState<AlbumSection>('shoes');

  const shoesItems = ACCESSORIES_DATABASE.filter((i) => i.type === 'shoes');
  const jewelryItems = ACCESSORIES_DATABASE.filter((i) => i.type === 'jewelry');
  const hairItems = ACCESSORIES_DATABASE.filter((i) => i.type === 'hair');

  const { shoesId, jewelryIds, hairAccessoryId } = outfit.accessories;

  const toggleJewelry = (id: string) => {
    let nextJewelry: string[];
    if (jewelryIds.includes(id)) {
      nextJewelry = jewelryIds.filter((j) => j !== id);
    } else {
      nextJewelry = [...jewelryIds, id];
    }
    onUpdateAccessories({ jewelryIds: nextJewelry });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Glasses': return <Glasses className="w-5 h-5" />;
      case 'Disc': return <Disc className="w-5 h-5" />;
      case 'Flower': return <Flower className="w-5 h-5" />;
      case 'Wand2': return <Wand2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9B2C2C]">
          <BookMarked className="w-4 h-4" />
          <span>Bước 4 · Cuốn Album Phụ Kiện Lễ Hội</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#2C241E]">
          Lựa Chọn Phụ Kiện Theo Trật Tự Đoan Trang
        </h2>
        <p className="text-xs lg:text-sm text-[#6B5A4B] leading-relaxed">
          Từng món phụ kiện được sưu tầm như một trang album di sản. Hãy chọn lần lượt theo thứ tự truyền thống: <span className="font-semibold text-[#2C241E]">Giày → Trang sức → Phụ kiện tóc</span> để hoàn thiện diện mạo vừa bắt mắt vừa tôn trọng văn hóa.
        </p>
      </div>

      {/* Sequential Album Chapter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
        <button
          onClick={() => setActiveSection('shoes')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'shoes'
              ? 'bg-white text-[#9B2C2C] shadow-xs'
              : 'text-[#6B5A4B] hover:text-[#2C241E]'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>1. Chọn Giày</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-[#EFE7DC] rounded-full text-[#4A3B32]">
            {shoesId ? 'Đã chọn' : 'Chưa'}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('jewelry')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'jewelry'
              ? 'bg-white text-[#9B2C2C] shadow-xs'
              : 'text-[#6B5A4B] hover:text-[#2C241E]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. Trang Sức ({jewelryIds.length})</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-[#EFE7DC] rounded-full text-[#4A3B32]">
            {jewelryIds.length > 0 ? `${jewelryIds.length} món` : 'Tùy chọn'}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('hair')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'hair'
              ? 'bg-white text-[#9B2C2C] shadow-xs'
              : 'text-[#6B5A4B] hover:text-[#2C241E]'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>3. Phụ Kiện Tóc & Đầu</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-[#EFE7DC] rounded-full text-[#4A3B32]">
            {hairAccessoryId ? 'Đã chọn' : 'Tùy chọn'}
          </span>
        </button>
      </div>

      {/* ALBUM SECTION 1: GIÀY DÉP */}
      {activeSection === 'shoes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
            <span>Chương 1 / 3: Chọn giày nâng bước thướt tha</span>
            <span className="text-[#9B2C2C] font-semibold">Chọn 1 đôi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoesItems.map((item) => {
              const isSelected = shoesId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onUpdateAccessories({ shoesId: item.id })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-white border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-sm'
                      : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                        {getIcon(item.imageIcon)}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#9B2C2C] bg-[#9B2C2C]' : 'border-[#C8B39B]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#2C241E] group-hover:text-[#9B2C2C] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7A6B] italic">
                        {item.culturalOrigin}
                      </p>
                    </div>

                    <p className="text-xs text-[#6B5A4B] leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E8DEC8]/80 text-[11px] text-[#15803D] font-medium">
                    Lời khuyên GenZ: {item.styleAdvice}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveSection('jewelry')}
              className="text-xs font-semibold text-[#9B2C2C] hover:text-[#781818] flex items-center gap-1 cursor-pointer"
            >
              <span>Tiếp tục sang trang Trang Sức</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ALBUM SECTION 2: TRANG SỨC */}
      {activeSection === 'jewelry' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
            <span>Chương 2 / 3: Trang sức mỹ nghệ tôn vinh vẻ đài các</span>
            <span className="text-[#9B2C2C] font-semibold">Có thể chọn nhiều món</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jewelryItems.map((item) => {
              const isSelected = jewelryIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleJewelry(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-white border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-sm'
                      : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200">
                        {getIcon(item.imageIcon)}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isSelected ? 'border-[#9B2C2C] bg-[#9B2C2C]' : 'border-[#C8B39B]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#2C241E] group-hover:text-[#9B2C2C] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7A6B] italic">
                        {item.culturalOrigin}
                      </p>
                    </div>

                    <p className="text-xs text-[#6B5A4B] leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E8DEC8]/80 text-[11px] text-[#15803D] font-medium">
                    Lời khuyên GenZ: {item.styleAdvice}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveSection('shoes')}
              className="text-xs font-semibold text-[#6B5A4B] hover:text-[#2C241E] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Giày</span>
            </button>
            <button
              onClick={() => setActiveSection('hair')}
              className="text-xs font-semibold text-[#9B2C2C] hover:text-[#781818] flex items-center gap-1 cursor-pointer"
            >
              <span>Tiếp tục sang trang Phụ Kiện Tóc & Đầu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ALBUM SECTION 3: PHỤ KIỆN TÓC & ĐẦU */}
      {activeSection === 'hair' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
            <span>Chương 3 / 3: Nón, mấn, trâm cài & hoa cài tóc</span>
            <span className="text-[#9B2C2C] font-semibold">Chọn 1 món điểm nhấn</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hairItems.map((item) => {
              const isSelected = hairAccessoryId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onUpdateAccessories({ hairAccessoryId: isSelected ? '' : item.id })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-white border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-sm'
                      : 'bg-[#FAF7F2] hover:bg-white border-[#E8DEC8]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center border border-rose-200">
                        {getIcon(item.imageIcon)}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#9B2C2C] bg-[#9B2C2C]' : 'border-[#C8B39B]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#2C241E] group-hover:text-[#9B2C2C] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7A6B] italic">
                        {item.culturalOrigin}
                      </p>
                    </div>

                    <p className="text-xs text-[#6B5A4B] leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E8DEC8]/80 text-[11px] text-[#15803D] font-medium">
                    Lời khuyên GenZ: {item.styleAdvice}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-start pt-2">
            <button
              onClick={() => setActiveSection('jewelry')}
              className="text-xs font-semibold text-[#6B5A4B] hover:text-[#2C241E] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Trang Sức</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation CTAs */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#6B5A4B] hover:text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay Lại Bước 3 (Quần)</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Tổng Hợp Lookbook & Phác Thảo Hoàn Thiện</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step4AccessoriesAlbum;
