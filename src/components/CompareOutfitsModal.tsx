import React from 'react';
import { CostumeOutfitState } from '../types/costume';
import { COSTUME_ROOTS, ACCESSORIES_DATABASE } from '../data/costumeData';
import { AvatarMannequin } from './AvatarMannequin';
import { X, GitCompare } from 'lucide-react';

interface CompareOutfitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfitA: CostumeOutfitState;
  outfitB: CostumeOutfitState;
  onApplyOutfit: (outfit: CostumeOutfitState) => void;
}

export const CompareOutfitsModal: React.FC<CompareOutfitsModalProps> = ({
  isOpen,
  onClose,
  outfitA,
  outfitB,
  onApplyOutfit,
}) => {
  if (!isOpen) return null;

  const rootA = COSTUME_ROOTS[outfitA.rootId];
  const rootB = COSTUME_ROOTS[outfitB.rootId];

  const getShoeName = (id: string) => ACCESSORIES_DATABASE.find((a) => a.id === id)?.name || 'Chưa chọn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B0] shadow-2xl p-5 lg:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#9B2C2C]/10 text-[#9B2C2C] flex items-center justify-center">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B2C2C]">
              Thử Nghiệm & Cân Nhắc
            </span>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#2C241E]">
              So Sánh Hai Phương Án Phối Việt Phục
            </h3>
          </div>
        </div>

        {/* Side-by-side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* OUTFIT A */}
          <div className="p-4 rounded-2xl bg-white border border-[#D8C7B0] space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#9B2C2C] uppercase tracking-wider">
                  Phương Án A
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EFE7DC] text-[#4A3B32]">
                  {rootA.name}
                </span>
              </div>

              {/* Mannequin Preview */}
              <div className="w-full h-80 rounded-xl overflow-hidden">
                <AvatarMannequin outfit={outfitA} heightClass="h-80" showDetailsOverlay={false} />
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs text-[#4A3B32]">
                <div className="flex items-center justify-between py-1 border-b border-[#E8DEC8]">
                  <span className="text-[#8C7A6B]">Màu áo / Quần:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: outfitA.top.primaryColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: outfitA.bottom.color }} />
                  </div>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E8DEC8]">
                  <span className="text-[#8C7A6B]">Giày dép:</span>
                  <span className="font-medium text-right truncate max-w-[180px]">
                    {getShoeName(outfitA.accessories.shoesId)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E8DEC8]">
                  <span className="text-[#8C7A6B]">Trang sức:</span>
                  <span className="font-medium">{outfitA.accessories.jewelryIds.length} món</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onApplyOutfit(outfitA);
                onClose();
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl transition-colors cursor-pointer mt-3"
            >
              Chọn Phương Án A Làm Lookbook
            </button>
          </div>

          {/* OUTFIT B */}
          <div className="p-4 rounded-2xl bg-white border border-[#D8C7B0] space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  Phương Án B
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EFE7DC] text-[#4A3B32]">
                  {rootB.name}
                </span>
              </div>

              {/* Mannequin Preview */}
              <div className="w-full h-80 rounded-xl overflow-hidden">
                <AvatarMannequin outfit={outfitB} heightClass="h-80" showDetailsOverlay={false} />
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs text-[#4A3B32]">
                <div className="flex items-center justify-between py-1 border-b border-[#E8DEC8]">
                  <span className="text-[#8C7A6B]">Màu áo / Quần:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: outfitB.top.primaryColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: outfitB.bottom.color }} />
                  </div>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E8DEC8]">
                  <span className="text-[#8C7A6B]">Giày dép:</span>
                  <span className="font-medium text-right truncate max-w-[180px]">
                    {getShoeName(outfitB.accessories.shoesId)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E8DEC8]">
                  <span className="text-[#8C7A6B]">Trang sức:</span>
                  <span className="font-medium">{outfitB.accessories.jewelryIds.length} món</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onApplyOutfit(outfitB);
                onClose();
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors cursor-pointer mt-3"
            >
              Chọn Phương Án B Làm Lookbook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareOutfitsModal;

