import React, { useState, useEffect } from 'react';
import { CostumeOutfitState } from '../types/costume';
import { COSTUME_ROOTS, ACCESSORIES_DATABASE, FESTIVAL_EVENTS } from '../data/costumeData';
import { AvatarMannequin } from './AvatarMannequin';
import { SHOWROOM_PRESETS } from './ShowroomCuratedOutfits';
import { 
  Archive, 
  X, 
  Sparkles, 
  Trash2, 
  Check, 
  ArrowRight, 
  Calendar, 
  Download, 
  Plus, 
  Share2, 
  Search,
  FolderHeart
} from 'lucide-react';

export interface SavedLookbookEntry {
  id: string;
  name: string;
  savedAt: string;
  outfit: CostumeOutfitState;
  notes?: string;
  isPreset?: boolean;
}

interface SavedOutfitsArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: CostumeOutfitState;
  onLoadOutfit: (outfit: CostumeOutfitState) => void;
}

const STORAGE_KEY = 'giao_thoa_saved_outfits_archive_v2';

export const SavedOutfitsArchiveModal: React.FC<SavedOutfitsArchiveModalProps> = ({
  isOpen,
  onClose,
  currentOutfit,
  onLoadOutfit,
}) => {
  const [entries, setEntries] = useState<SavedLookbookEntry[]>([]);
  const [filterRoot, setFilterRoot] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<SavedLookbookEntry | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and load saved outfits
  useEffect(() => {
    if (!isOpen) return;

    // 3 Mẫu thiết kế trưng bày 3 miền với đầy đủ màu sắc và kích thước trang phục mẫu chuẩn theo đúng thiết kế
    const seedPresets: SavedLookbookEntry[] = SHOWROOM_PRESETS.map((preset) => ({
      id: `seed-${preset.id}`,
      name: preset.title,
      savedAt: 'Mẫu thiết kế trưng bày 3 miền',
      outfit: preset.outfitState,
      notes: preset.description,
      isPreset: true,
    }));

    try {
      // Đọc từ storage v2 hoặc v1 để bảo lưu toàn bộ thiết kế cá nhân người dùng đã lưu
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('giao_thoa_saved_outfits_archive_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Bảo lưu toàn bộ các bộ đồ người dùng đã tự phối (lọc bỏ triệt để các preset mẫu cũ để cập nhật màu mới)
          const userCustoms = parsed.filter((item: SavedLookbookEntry) => 
            !item.isPreset && 
            !item.id.startsWith('seed-') && 
            !item.id.startsWith('showroom-') &&
            !item.id.includes('tu-than-xanh-hong') &&
            !item.id.includes('ngu-than') &&
            !item.id.includes('ba-ba')
          );
          // Đồng bộ và cập nhật 3 bộ trang phục mẫu chuẩn xác đúng màu thiết kế
          const combined = [...seedPresets, ...userCustoms];
          setEntries(combined);
          setSelectedEntry(combined[0]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
          return;
        }
      }
    } catch {
      // ignore JSON parse error
    }

    setEntries(seedPresets);
    setSelectedEntry(seedPresets[0]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPresets));
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save current active studio outfit into archive
  const handleSaveCurrentOutfit = () => {
    const newEntry: SavedLookbookEntry = {
      id: `outfit-${Date.now()}`,
      name: currentOutfit.outfitName || 'Việt Phục Của Tôi',
      savedAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      outfit: { ...currentOutfit },
      notes: currentOutfit.designerNote || 'Thiết kế cá nhân tạo bởi bạn trên Giao Thoa.',
      isPreset: false,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    setSelectedEntry(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    showToast('Đã lưu nhân vật và bộ đồ thành công vào kho lưu trữ!');
  };

  // Delete an entry
  const handleDeleteEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = entries.filter((item) => item.id !== id);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selectedEntry?.id === id) {
      setSelectedEntry(updated[0] || null);
    }
    showToast('Đã xóa bộ đồ khỏi kho lưu trữ.');
  };

  // Filter list
  const filteredEntries = entries.filter((item) => {
    const matchesFilter = filterRoot === 'all' || item.outfit.rootId === filterRoot;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B0] shadow-2xl p-6 lg:p-8 space-y-6 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8DEC8]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B1E1E] text-white flex items-center justify-center shadow-sm">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E1E]">
                  Kho Dữ Liệu Nhân Vật
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                  {entries.length} Bộ đã lưu
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C241E]">
                Kho Lưu Trữ Việt Phục
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveCurrentOutfit}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Lưu Bộ Đang Phối</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'tu-than', label: 'Áo Tứ Thân' },
              { id: 'ngu-than', label: 'Áo Ngũ Thân' },
              { id: 'ba-ba', label: 'Áo Bà Ba' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterRoot(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterRoot === tab.id
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
                    : 'bg-white hover:bg-[#EFE7DC] text-[#6B5A4B] border border-[#E8DEC8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bộ đồ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-xl border border-[#D8C7B0] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/30 text-[#2C241E]"
            />
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
          {/* Left Column: Grid of Saved Outfit Cards (7 cols) */}
          <div className="lg:col-span-7 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#D8C7B0] text-[#8C7A6B] space-y-2">
                <FolderHeart className="w-10 h-10 mx-auto text-[#CBB59C]" />
                <p className="text-sm font-medium">Chưa có bộ trang phục nào phù hợp</p>
                <p className="text-xs">Hãy thiết kế một nhân vật mới hoặc lưu bộ đồ bạn đang phối!</p>
              </div>
            ) : (
              filteredEntries.map((item) => {
                const root = COSTUME_ROOTS[item.outfit.rootId];
                const isSelected = selectedEntry?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEntry(item)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20 shadow-md'
                        : 'bg-white/80 hover:bg-white border-[#E8DEC8] shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Ảnh minh họa trang phục mẫu đúng màu và kích thước vào ô trống phía bên tay trái */}
                      <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl bg-gradient-to-b from-[#FDF8F2] via-[#F6EDE1] to-[#EBE0D0] border-2 border-[#D8C7B0] shadow-xs overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:border-[#8B1E1E] transition-all duration-300">
                        <AvatarMannequin
                          outfit={item.outfit}
                          heightClass="w-full h-full"
                          showDetailsOverlay={false}
                          isThumbnail={true}
                        />
                        {/* Bảng chấm màu sắc chính xác của trang phục mẫu */}
                        <div className="absolute bottom-1 inset-x-1 flex items-center justify-center gap-1 bg-white/95 backdrop-blur-xs py-0.5 px-1.5 rounded-full border border-black/10 shadow-2xs">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                            style={{ backgroundColor: item.outfit.top.primaryColor }}
                            title={`Màu áo: ${item.outfit.top.primaryColor}`}
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                            style={{ backgroundColor: item.outfit.bottom.color }}
                            title={`Màu quần: ${item.outfit.bottom.color}`}
                          />
                          {item.outfit.top.innerYemColor && item.outfit.rootId === 'tu-than' && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                              style={{ backgroundColor: item.outfit.top.innerYemColor }}
                              title={`Màu yếm: ${item.outfit.top.innerYemColor}`}
                            />
                          )}
                          {item.outfit.rootId === 'ngu-than' && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                              style={{ backgroundColor: '#D4AF37' }}
                              title="Họa tiết thêu chỉ vàng hoàng cung"
                            />
                          )}
                          {item.outfit.rootId === 'ba-ba' && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                              style={{ backgroundColor: '#F8FAFC' }}
                              title="Khăn rằn Nam Bộ dệt kẻ trắng đen"
                            />
                          )}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#78350F] border border-[#E8DEC8]">
                            {root.name}
                          </span>
                          {item.isPreset && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              Mẫu Chuẩn 3 Miền
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-serif font-bold text-[#2C241E] truncate mt-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#8C7A6B] truncate">
                          {item.savedAt}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#6B5A4B] flex-wrap">
                          <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.outfit.top.primaryColor }} />
                            Áo
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.outfit.bottom.color }} />
                            Quần
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoadOutfit(item.outfit);
                          onClose();
                        }}
                        title="Đưa vào phòng phối đồ ngay"
                        className="p-2 rounded-xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-white text-xs font-bold transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
                      >
                        <span className="hidden sm:inline">Phối đồ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {!item.isPreset && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteEntry(item.id, e)}
                          title="Xóa bộ đồ"
                          className="p-2 rounded-xl hover:bg-rose-50 text-[#8C7A6B] hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Outfit Inspection Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#D8C7B0] p-4 flex flex-col justify-between overflow-y-auto">
            {selectedEntry ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0E6D8]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E1E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Xem Chi Tiết Nhân Vật
                  </span>
                  <span className="text-[11px] text-[#8C7A6B]">
                    {COSTUME_ROOTS[selectedEntry.outfit.rootId].region}
                  </span>
                </div>

                {/* Mannequin Preview */}
                <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#FBF8F3] to-[#F2EADB] border border-[#E8DEC8] flex items-center justify-center p-2 shadow-xs">
                  <AvatarMannequin
                    outfit={selectedEntry.outfit}
                    heightClass="h-[320px]"
                    showDetailsOverlay={false}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-serif font-bold text-[#2C241E]">
                      {selectedEntry.name}
                    </h4>
                    {/* Bảng màu mẫu thực tế */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#D8C7B0]">
                      <span className="text-[10px] text-[#6B5A4B] font-medium">Bảng màu:</span>
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
                        style={{ backgroundColor: selectedEntry.outfit.top.primaryColor }}
                        title={`Áo: ${selectedEntry.outfit.top.primaryColor}`}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
                        style={{ backgroundColor: selectedEntry.outfit.bottom.color }}
                        title={`Quần: ${selectedEntry.outfit.bottom.color}`}
                      />
                      {selectedEntry.outfit.top.innerYemColor && selectedEntry.outfit.rootId === 'tu-than' && (
                        <span
                          className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
                          style={{ backgroundColor: selectedEntry.outfit.top.innerYemColor }}
                          title={`Yếm: ${selectedEntry.outfit.top.innerYemColor}`}
                        />
                      )}
                      {selectedEntry.outfit.rootId === 'ngu-than' && (
                        <span
                          className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
                          style={{ backgroundColor: '#D4AF37' }}
                          title="Chỉ vàng hoàng cung"
                        />
                      )}
                      {selectedEntry.outfit.rootId === 'ba-ba' && (
                        <span
                          className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
                          style={{ backgroundColor: '#F8FAFC' }}
                          title="Khăn rằn Nam Bộ"
                        />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#6B5A4B] leading-relaxed">
                    {selectedEntry.notes}
                  </p>

                  {/* Highlights list */}
                  <div className="text-[11px] space-y-1 pt-2 border-t border-[#F0E6D8] text-[#524438]">
                    <div className="flex justify-between">
                      <span className="text-[#8C7A6B]">Áo & Màu:</span>
                      <span className="font-semibold">{selectedEntry.outfit.top.primaryColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7A6B]">Quần & Màu:</span>
                      <span className="font-semibold">{selectedEntry.outfit.bottom.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7A6B]">Kiểu Tóc:</span>
                      <span className="font-semibold">{selectedEntry.outfit.avatar?.hairstyle || 'Dài thẳng eo'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7A6B]">Dáng Mặt:</span>
                      <span className="font-semibold">{selectedEntry.outfit.avatar?.faceShape === 'round' ? 'Mặt Tròn' : 'Trái Xoan'}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onLoadOutfit(selectedEntry.outfit);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Mở Trang Phục Này Trong Phòng Phối Đồ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-xs text-[#8C7A6B] p-6">
                Chọn một bộ đồ ở danh sách bên trái để xem chi tiết
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedOutfitsArchiveModal;
