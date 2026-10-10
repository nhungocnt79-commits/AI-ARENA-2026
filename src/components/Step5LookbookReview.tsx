import React, { useState } from 'react';
import { CostumeOutfitState } from '../types/costume';
import { COSTUME_ROOTS, ACCESSORIES_DATABASE, FESTIVAL_EVENTS, WEATHER_CONDITIONS } from '../data/costumeData';
import { AvatarMannequin } from './AvatarMannequin';
import { evaluateColorHarmony, evaluateCulturalEtiquette } from '../utils/costumeEvaluation';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Download, 
  Share2, 
  Edit3, 
  ShieldCheck, 
  ArrowLeft, 
  Palette, 
  Calendar, 
  Layers,
  AlertTriangle,
  LayoutGrid,
  Frame,
  Image as ImageIcon
} from 'lucide-react';

interface Step5LookbookReviewProps {
  outfit: CostumeOutfitState;
  onChangeOutfit: (updated: Partial<CostumeOutfitState>) => void;
  onGoToStep: (step: number) => void;
  onOpenCompare: () => void;
  onOpenEtiquette: () => void;
}

export const Step5LookbookReview: React.FC<Step5LookbookReviewProps> = ({
  outfit,
  onChangeOutfit,
  onGoToStep,
  onOpenCompare,
  onOpenEtiquette,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  // 3 view modes: 'cards' (thẻ gợi ý), 'mockup' (mockup thời trang/tạp chí), 'poster' (hình ảnh & poster)
  const [viewMode, setViewMode] = useState<'cards' | 'mockup' | 'poster'>('cards');

  const root = COSTUME_ROOTS[outfit.rootId];
  const harmony = evaluateColorHarmony(outfit);
  const etiquette = evaluateCulturalEtiquette(outfit);

  const currentEvent = FESTIVAL_EVENTS.find((e) => e.id === outfit.selectedEventId) || FESTIVAL_EVENTS[0];
  const currentWeather = WEATHER_CONDITIONS.find((w) => w.id === outfit.selectedWeatherId) || WEATHER_CONDITIONS[0];

  const shoes = ACCESSORIES_DATABASE.find((a) => a.id === outfit.accessories.shoesId);
  const hairAcc = ACCESSORIES_DATABASE.find((a) => a.id === outfit.accessories.hairAccessoryId);
  const selectedJewelries = ACCESSORIES_DATABASE.filter((a) => outfit.accessories.jewelryIds.includes(a.id));

  // Trigger celebratory confetti on Lookbook generation
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B91C1C', '#D97706', '#0F766E', '#DB2777', '#FDE68A']
    });
  };

  const handleShare = () => {
    const text = `Lookbook Việt Phục: ${outfit.outfitName} (${root.name}) - Phối đồ tham dự ${currentEvent.name}. Khám phá tại Giao Thoa Atelier!`;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadCard = () => {
    setDownloading(true);
    triggerConfetti();

    // Export SVG Mannequin to Canvas image
    const svgElement = document.getElementById('mannequin-svg-canvas');
    if (!svgElement) {
      setDownloading(false);
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw elegant card parchment background
        ctx.fillStyle = '#FAF7F2';
        ctx.fillRect(0, 0, 800, 1000);

        // Header Title
        ctx.fillStyle = '#2C241E';
        ctx.font = 'bold 36px serif';
        ctx.textAlign = 'center';
        ctx.fillText('GIAO THOA · LOOKBOOK VIỆT PHỤC', 400, 70);

        ctx.font = 'italic 20px serif';
        ctx.fillStyle = '#8B1E1E';
        ctx.fillText(`“${outfit.outfitName}” — ${root.name}`, 400, 110);

        // Draw avatar image in center
        ctx.drawImage(image, 150, 140, 500, 680);

        // Footer details
        ctx.fillStyle = '#6B5A4B';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Lễ Hội: ${currentEvent.name} · Bảng Màu: ${harmony.harmonyType}`, 400, 870);
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#15803D';
        ctx.fillText(`Điểm Chuẩn Mực Đoan Trang: ${etiquette.score}/100 · Thiết kế bởi Học Sinh / Sinh Viên`, 400, 910);

        // Download
        const link = document.createElement('a');
        link.download = `lookbook-viet-phuc-${outfit.rootId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
      setDownloading(false);
    };
    image.src = blobURL;
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E] mb-1">
            <Sparkles className="w-4 h-4 text-[#8B1E1E]" />
            <span>Bước 5 · Lookbook Việt Phục Hoàn Thiện</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C241E]">
            Thẻ Kỷ Yếu & Phác Thảo Thời Trang Tổng Quan
          </h2>
          <p className="text-xs text-[#6B5A4B] mt-1">
            Toàn bộ trang phục và phụ kiện đã được hòa quyện đoan trang. Bạn có thể kiểm tra từng chi tiết, chỉnh sửa hoặc xuất ảnh kỷ niệm!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleDownloadCard}
            disabled={downloading}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Đang xuất...' : 'Tải Thiệp Lookbook'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] border border-[#D8C7B0] rounded-xl transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Đã sao chép link!' : 'Chia Sẻ'}</span>
          </button>
        </div>
      </div>

      {/* 3 Display Modes: Thẻ gợi ý | Mockup thời trang | Hình ảnh & Poster */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC8]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-[#3E2723] px-2">Chế độ xem kết quả:</span>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#8B1E1E] text-white shadow-xs'
                : 'text-[#4A3525] hover:bg-white border border-transparent hover:border-[#D8C7B0]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Thẻ Gợi Ý Chi Tiết</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('mockup')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'mockup'
                ? 'bg-[#8B1E1E] text-white shadow-xs'
                : 'text-[#4A3525] hover:bg-white border border-transparent hover:border-[#D8C7B0]'
            }`}
          >
            <Frame className="w-3.5 h-3.5" />
            <span>Mockup Tạp Chí Polaroid</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('poster')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'poster'
                ? 'bg-[#8B1E1E] text-white shadow-xs'
                : 'text-[#4A3525] hover:bg-white border border-transparent hover:border-[#D8C7B0]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hình Ảnh & Thiệp Poster</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleDownloadCard}
          className="text-xs font-semibold text-[#8B1E1E] hover:underline flex items-center gap-1 px-2 cursor-pointer self-end sm:self-auto"
        >
          <Download className="w-3 h-3" />
          <span>Xuất ảnh kỷ yếu PNG</span>
        </button>
      </div>

      {/* Cultural Modesty & Anti-Misrepresentation Warning Banner */}
      <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3 text-xs text-[#78350F]">
        <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#92400E]">
            Cảnh Báo Chuẩn Mực Văn Hóa & Đoan Trang Cổ Truyền:
          </p>
          <p className="leading-relaxed text-[#78350F]">
            Việt phục là biểu trưng của sự trang nghiêm và tinh tế. Nền tảng khuyến cáo người dùng không biến tấu hở hang quá đà, làm mất phom dáng đoan trang truyền thống (ví dụ: mặc yếm không có áo khoác ngoài khi ra chốn tôn nghiêm, hoặc xẻ tà quá trớn). Bản phối hiện tại đạt <strong>{etiquette.score}/100 điểm đoan trang</strong>.
          </p>
        </div>
      </div>

      {/* Main Lookbook Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Mannequin Mockup in Festival Frame (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-[#D8C7B0] shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8B1E1E] tracking-widest">
                Phác Thảo Trực Quan
              </span>
              <h3 className="font-serif font-bold text-lg text-[#2C241E]">
                {root.name} Lễ Hội
              </h3>
            </div>
            <button
              onClick={onOpenEtiquette}
              className="text-[11px] font-semibold text-[#15803D] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Đoan trang: {etiquette.score}/100
            </button>
          </div>

          {/* Mannequin View (Lookbook hiển thị trang phục theo thứ tự đúng) */}
          <div className="rounded-2xl overflow-hidden border border-[#E8DEC8]">
            <AvatarMannequin 
              outfit={outfit} 
              heightClass="h-[460px]" 
              showDetailsOverlay={true}
              forceExplodedLayers={false}
              onQuickUpdateAvatar={(updated) => onChangeOutfit({ avatar: { ...outfit.avatar, ...updated } })}
            />
          </div>

          {/* Name & Note Editor */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-[#4A3B32] block">
              Đặt Tên Bộ Lookbook Của Bạn:
            </label>
            <input
              type="text"
              value={outfit.outfitName}
              onChange={(e) => onChangeOutfit({ outfitName: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] rounded-xl border border-[#D8C7B0] text-[#2C241E] font-serif font-bold focus:outline-hidden focus:border-[#8B1E1E]"
            />
          </div>
        </div>

        {/* Right Column: Breakdown Cards & Quick Editor (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Festival Context & Weather Banner */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C7A6B]">
                  Bối Cảnh Lễ Hội Đã Chọn
                </span>
                <div className="text-xs font-bold text-[#2C241E]">
                  {currentEvent.name} ({currentWeather.title} · {currentWeather.temp})
                </div>
              </div>
            </div>
            <button
              onClick={() => onGoToStep(1)}
              className="text-[11px] text-[#8B1E1E] hover:underline font-semibold cursor-pointer shrink-0"
            >
              Đổi sự kiện
            </button>
          </div>

          {/* VIEW MODE 1: THẺ GỢI Ý CHI TIẾT (Cards Deck) */}
          {viewMode === 'cards' && (
            <div className="bg-white p-5 rounded-2xl border border-[#D8C7B0] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#8B1E1E]" />
                  Chi Tiết Trang Phục & Phụ Kiện Đã Phối
                </span>
                <span className="text-[11px] text-[#8C7A6B]">Nhấn nút để chỉnh sửa nhanh</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* 1. Áo */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#2C241E] flex items-center gap-2">
                      <span>Áo {root.name}</span>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 inline-block"
                        style={{ backgroundColor: outfit.top.primaryColor }}
                      />
                    </div>
                    <p className="text-[11px] text-[#6B5A4B]">
                      Phom: {root.recommendedSilhouettes.find((s) => s.id === outfit.top.silhouetteId)?.name} · Cổ: {root.necklines.find((n) => n.id === outfit.top.necklineId)?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => onGoToStep(2)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#8B1E1E] hover:bg-white rounded-lg border border-[#D8C7B0] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    Sửa Áo
                  </button>
                </div>

                {/* 2. Quần / Váy */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#2C241E] flex items-center gap-2">
                      <span>Quần / Chân Váy</span>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 inline-block"
                        style={{ backgroundColor: outfit.bottom.color }}
                      />
                    </div>
                    <p className="text-[11px] text-[#6B5A4B]">
                      Kiểu dáng: {root.recommendedBottoms.find((b) => b.id === outfit.bottom.bottomId)?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => onGoToStep(3)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#8B1E1E] hover:bg-white rounded-lg border border-[#D8C7B0] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    Sửa Quần
                  </button>
                </div>

                {/* 3. Phụ Kiện */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#2C241E]">
                      Album Phụ Kiện Lễ Hội
                    </div>
                    <p className="text-[11px] text-[#6B5A4B]">
                      Giày: {shoes?.name || 'Chưa chọn'} · Tóc: {hairAcc?.name || 'Mái tóc tự nhiên'} · Trang sức: {selectedJewelries.map((j) => j.name).join(', ') || 'Tối giản'}
                    </p>
                  </div>
                  <button
                    onClick={() => onGoToStep(4)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#8B1E1E] hover:bg-white rounded-lg border border-[#D8C7B0] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    Sửa Phụ Kiện
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: MOCKUP THỜI TRANG TẠP CHÍ POLAROID */}
          {viewMode === 'mockup' && (
            <div className="bg-[#FAF5EC] p-6 rounded-3xl border-2 border-[#D8C7B0] shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
                <div className="flex items-center gap-2">
                  <Frame className="w-4 h-4 text-[#8B1E1E]" />
                  <span className="text-xs font-serif font-black uppercase tracking-widest text-[#8B1E1E]">
                    Tạp Chí Giao Thoa • Editorial Mockup
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8C7A6B]">ISSUE GENZ #2026</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-[#2C241E]">
                    &ldquo;{outfit.outfitName}&rdquo;
                  </h4>
                  <span className="text-[11px] font-bold text-[#8B1E1E] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {root.name}
                  </span>
                </div>

                <p className="text-xs text-[#4A3B32] italic leading-relaxed font-['Lora',serif]">
                  Bộ trang phục kết hợp hài hòa giữa nét chuẩn mực truyền thống và hơi thở thanh xuân đương đại. Phối màu {harmony.harmonyType} mang đến sự thướt tha, trang nhã cho học sinh, sinh viên khi trẩy hội.
                </p>

                <div className="pt-2 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#8C7A6B]">Bảng màu:</span>
                    <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: outfit.top.primaryColor }} />
                    <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: outfit.bottom.color }} />
                    <span className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: outfit.top.innerYemColor || '#DB2777' }} />
                  </div>
                  <span className="text-[11px] font-semibold text-[#15803D]">
                    ✓ Điểm đoan trang: {etiquette.score}/100
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: HÌNH ẢNH & THIỆP POSTER */}
          {viewMode === 'poster' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#8B1E1E]/30 shadow-lg space-y-4 text-center">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B1E1E]">
                  Chứng Nhận Thiết Kế Việt Phục GenZ
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                  {outfit.outfitName}
                </h3>
                <p className="text-xs text-[#6B5A4B] italic">
                  Dành cho dịp {currentEvent.name} ({currentWeather.title})
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] flex flex-col items-center gap-2">
                <p className="text-xs text-[#3E2723] max-w-md leading-relaxed">
                  Thiệp kỷ yếu số đã sẵn sàng. Bạn có thể nhấn nút xuất ảnh chất lượng cao để lưu vào máy hoặc chia sẻ lên mạng xã hội với bạn bè!
                </p>
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-white text-xs font-bold transition-all shadow-md hover:scale-105 cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Ảnh Thiệp Lookbook Kỷ Yếu (PNG)</span>
                </button>
              </div>
            </div>
          )}

          {/* Color Harmony Score Pill & Designer Assessment */}
          <div className="p-4 rounded-2xl bg-white border border-[#D8C7B0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#8B1E1E]" />
                Đánh Giá Phối Màu: {harmony.harmonyType}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Hài hòa: {harmony.score}/100
              </span>
            </div>
            <p className="text-xs text-[#6B5A4B] leading-relaxed">
              {harmony.designerVerdict}
            </p>
          </div>

          {/* Compare With Option B CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#2C241E]">
                Muốn thử một phong cách khác để so sánh?
              </div>
              <p className="text-[11px] text-[#6B5A4B] mt-0.5">
                Mở bảng so sánh A/B để cân nhắc giữa nét dịu dàng Kinh Bắc và vẻ đài các xứ Huế!
              </p>
            </div>
            <button
              onClick={onOpenCompare}
              className="px-3 py-1.5 text-xs font-semibold text-[#8B1E1E] bg-white hover:bg-[#FAF7F2] border border-[#8B1E1E]/30 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              So Sánh A / B
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
        <button
          onClick={() => onGoToStep(4)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#6B5A4B] hover:text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay Lại Bước 4 (Phụ Kiện)</span>
        </button>

        <button
          onClick={() => onGoToStep(1)}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Khởi Tạo Bản Phối Khác</span>
        </button>
      </div>
    </div>
  );
};

export default Step5LookbookReview;
