import React, { useState } from 'react';
import { CostumeOutfitState } from '../types/costume';
import { COSTUME_ROOTS, ACCESSORIES_DATABASE, FESTIVAL_EVENTS, WEATHER_CONDITIONS } from '../data/costumeData';
import { AvatarMannequin } from './AvatarMannequin';
import { evaluateColorHarmony, evaluateCulturalEtiquette } from '../utils/costumeEvaluation';
import { SONG_NUOC_BG_DATA_URI } from '../assets/songNuocBackgroundDataUri';
import { HOI_LIM_BG_DATA_URI } from '../assets/hoiLimBackgroundDataUri';
import { FESTIVAL_HUE_BG_DATA_URI } from '../assets/festivalHueBackgroundDataUri';
import { DEN_HUNG_BG_DATA_URI } from '../assets/denHungBackgroundDataUri';
import { VIET_PHUC_TRE_BG_DATA_URI } from '../assets/vietPhucTreBackgroundDataUri';
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
  Award,
  CheckCircle2,
  Sparkle,
  Waves,
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

  const root = COSTUME_ROOTS[outfit.rootId];
  const harmony = evaluateColorHarmony(outfit);
  const etiquette = evaluateCulturalEtiquette(outfit);

  const currentEvent = FESTIVAL_EVENTS.find((e) => e.id === outfit.selectedEventId) || FESTIVAL_EVENTS[0];
  const currentWeather = WEATHER_CONDITIONS.find((w) => w.id === outfit.selectedWeatherId) || WEATHER_CONDITIONS[0];

  // Kiểm tra bối cảnh lễ hội đặc biệt có hình nền chủ đề
  const isDenHungEvent = outfit.selectedEventId === 'event-den-hung';
  const isHueFestivalEvent = outfit.selectedEventId === 'event-festival-hue';
  const isHoiLimEvent = outfit.selectedEventId === 'event-hoi-lim';
  const isSongNuocEvent = outfit.selectedEventId === 'event-song-nuoc-nam-bo';
  const isVietPhucTreEvent = outfit.selectedEventId === 'event-genz-street-festival';
  const hasCustomBgEvent = isDenHungEvent || isHueFestivalEvent || isHoiLimEvent || isSongNuocEvent || isVietPhucTreEvent;
  const activeCustomBgUri = isDenHungEvent
    ? DEN_HUNG_BG_DATA_URI
    : isHueFestivalEvent
      ? FESTIVAL_HUE_BG_DATA_URI
      : isHoiLimEvent
        ? HOI_LIM_BG_DATA_URI
        : isSongNuocEvent
          ? SONG_NUOC_BG_DATA_URI
          : isVietPhucTreEvent
            ? VIET_PHUC_TRE_BG_DATA_URI
            : null;

  const shoes = ACCESSORIES_DATABASE.find((a) => a.id === outfit.accessories.shoesId);
  const hairAcc = ACCESSORIES_DATABASE.find((a) => a.id === outfit.accessories.hairAccessoryId);
  const selectedJewelries = ACCESSORIES_DATABASE.filter((a) => outfit.accessories.jewelryIds.includes(a.id));

  // Tên phân loại trang phục súc tích
  const topItemName = root.recommendedSilhouettes.find((s) => s.id === outfit.top.silhouetteId)?.name || `Áo ${root.name}`;
  const bottomItemName = root.recommendedBottoms.find((b) => b.id === outfit.bottom.bottomId)?.name || 'Quần lụa truyền thống';
  const accessoriesItemName = [hairAcc?.name, shoes?.name].filter(Boolean).join(', ') || 'Nón lá / Guốc mộc';
  const jewelryItemName = selectedJewelries.length > 0 ? selectedJewelries.map((j) => j.name).join(', ') : 'Kiềng bạc chạm sen / Khuyên tai ngọc';

  // Tính điểm tổng quan kết hợp đoan trang (60%) và hài hòa sắc phục (40%)
  const overallScore = Math.round(etiquette.score * 0.6 + harmony.score * 0.4);
  const overallVerdict = 
    overallScore >= 92 ? 'Đoan trang nhã nhặn, tôn kính cội nguồn và rạng rỡ thanh xuân' :
    overallScore >= 82 ? 'Bản phối thanh lịch, nền nã và đậm nét duyên dáng truyền thống' :
    'Bản phối độc đáo, giao thoa giữa nét truyền thống và hơi thở hiện đại';

  // Kích hoạt pháo giấy chúc mừng
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8B1E1E', '#D97706', '#0F766E', '#DB2777', '#FDE68A']
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 3000);
  };

  // Helper tải hình ảnh bằng Promise
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Xuất ảnh Lookbook chuẩn 9:16 độ phân giải cao sắc nét (1080 x 1920 px)
  const handleDownloadStory916 = async () => {
    setDownloading(true);
    triggerConfetti();

    const svgElement = document.getElementById('mannequin-svg-canvas');
    if (!svgElement) {
      setDownloading(false);
      return;
    }

    try {
      // Nhân bản SVG để đảm bảo độ sắc nét cao khi render sang Canvas
      const clonedSvg = svgElement.cloneNode(true) as SVGElement;
      clonedSvg.setAttribute('width', '720');
      clonedSvg.setAttribute('height', '880');
      if (!clonedSvg.getAttribute('xmlns')) {
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(clonedSvg);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      // Tải song song cả avatar và background (nếu là lễ hội có hình nền chủ đề)
      const [mannequinImg, bgImg] = await Promise.all([
        loadImage(blobURL),
        hasCustomBgEvent && activeCustomBgUri ? loadImage(activeCustomBgUri) : Promise.resolve(null),
      ]);

      // Chuẩn Story Full HD: 1080 x 1920 px
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (hasCustomBgEvent && bgImg) {
          // 1A. VẼ BACKGROUND LỄ HỘI (CỐ ĐÔ HUẾ, HỘI LIM HOẶC SÔNG NƯỚC MIỆT VƯỜN)
          ctx.drawImage(bgImg, 0, 0, 1080, 1920);

          // Phủ nhẹ lớp ánh sáng mờ để đảm bảo tương phản văn bản
          const overlayGrad = ctx.createLinearGradient(0, 0, 0, 1920);
          if (isDenHungEvent) {
            overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.20)');
            overlayGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.08)');
            overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.28)');
          } else if (isHueFestivalEvent) {
            overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.20)');
            overlayGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.08)');
            overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
          } else if (isHoiLimEvent) {
            overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
            overlayGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.08)');
            overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
          } else if (isVietPhucTreEvent) {
            overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
            overlayGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.06)');
            overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.24)');
          } else {
            overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            overlayGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.05)');
            overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
          }
          ctx.fillStyle = overlayGrad;
          ctx.fillRect(0, 0, 1080, 1920);
        } else {
          // 1B. Nền giấy điệp / lụa truyền thống với dải màu ấm áp
          const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
          bgGrad.addColorStop(0, '#FAF7F2');
          bgGrad.addColorStop(0.45, '#F5EFE6');
          bgGrad.addColorStop(1, '#EDE4D5');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, 1080, 1920);
        }

        // 2. Khung viền đôi phong cách cung đình / di sản
        ctx.strokeStyle = hasCustomBgEvent ? 'rgba(255, 255, 255, 0.85)' : '#D8C7B0';
        ctx.lineWidth = 4;
        ctx.strokeRect(36, 36, 1008, 1848);

        ctx.strokeStyle = '#8B1E1E';
        ctx.lineWidth = 2;
        ctx.strokeRect(48, 48, 984, 1824);

        // Họa tiết góc truyền thống
        const drawCornerBracket = (x: number, y: number, dirX: number, dirY: number) => {
          ctx.strokeStyle = '#8B1E1E';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(x, y + dirY * 30);
          ctx.lineTo(x, y);
          ctx.lineTo(x + dirX * 30, y);
          ctx.stroke();
        };
        drawCornerBracket(48, 48, 1, 1);
        drawCornerBracket(1032, 48, -1, 1);
        drawCornerBracket(48, 1872, 1, -1);
        drawCornerBracket(1032, 1872, -1, -1);

        // 3. PHÍA TRÊN: HIỂN THỊ TÊN BỘ TRANG PHỤC (TRÊN THẺ TRANG TRỌNG)
        ctx.fillStyle = hasCustomBgEvent ? 'rgba(250, 247, 242, 0.94)' : 'transparent';
        if (hasCustomBgEvent) {
          ctx.beginPath();
          ctx.roundRect(140, 60, 800, 180, 20);
          ctx.fill();
          ctx.strokeStyle = '#D8C7B0';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.textAlign = 'center';
        ctx.fillStyle = '#8B1E1E';
        ctx.font = 'bold 22px serif';
        ctx.fillText('GIAO THOA · LOOKBOOK VIỆT PHỤC', 540, 95);

        ctx.fillStyle = '#2C241E';
        ctx.font = 'bold 42px serif';
        const titleText = outfit.outfitName || `Bộ Trang Phục ${root.name}`;
        if (titleText.length > 28) {
          const words = titleText.split(' ');
          const mid = Math.ceil(words.length / 2);
          const line1 = words.slice(0, mid).join(' ');
          const line2 = words.slice(mid).join(' ');
          ctx.fillText(`“${line1}`, 540, 145);
          ctx.fillText(`${line2}”`, 540, 190);
        } else {
          ctx.fillText(`“${titleText}”`, 540, 155);
        }

        ctx.fillStyle = '#78350F';
        ctx.font = 'italic 21px serif';
        ctx.fillText(`Di sản ${root.name} · ${currentEvent.name}`, 540, 215);

        // 4. Ở GIỮA LOOKBOOK: HIỆN RÕ ẢNH NHÂN VẬT VỚI BỘ TRANG PHỤC
        // Khi dùng background lễ hội, tạo một lớp gương mờ tinh tế nâng đỡ nhân vật
        ctx.fillStyle = hasCustomBgEvent ? 'rgba(255, 255, 255, 0.38)' : 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.roundRect(160, 260, 760, 840, 28);
        ctx.fill();
        ctx.strokeStyle = hasCustomBgEvent ? 'rgba(255, 255, 255, 0.8)' : '#E8DEC8';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.drawImage(mannequinImg, 180, 270, 720, 820);

        // 5. PHÍA DƯỚI NHÂN VẬT: HIỆN CỤ THỂ TRANG PHỤC BAO GỒM (CHỈ NÊU LOẠI TRANG PHỤC)
        const boxTop = 1125;
        ctx.fillStyle = hasCustomBgEvent ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(80, boxTop, 920, 315, 24);
        ctx.fill();
        ctx.strokeStyle = '#D8C7B0';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#8B1E1E';
        ctx.font = 'bold 21px serif';
        ctx.textAlign = 'left';
        ctx.fillText('TRANG PHỤC & PHỤ KIỆN BAO GỒM', 115, boxTop + 45);

        ctx.strokeStyle = '#F0E6D8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(115, boxTop + 60);
        ctx.lineTo(965, boxTop + 60);
        ctx.stroke();

        // Loại áo
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillText('• Loại áo:', 115, boxTop + 105);
        ctx.fillStyle = '#2C241E';
        ctx.font = '600 21px sans-serif';
        ctx.fillText(topItemName, 260, boxTop + 105);

        // Loại quần / váy
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillText('• Quần / Váy:', 115, boxTop + 160);
        ctx.fillStyle = '#2C241E';
        ctx.font = '600 21px sans-serif';
        ctx.fillText(bottomItemName, 260, boxTop + 160);

        // Phụ kiện
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillText('• Phụ kiện:', 115, boxTop + 215);
        ctx.fillStyle = '#2C241E';
        ctx.font = '600 21px sans-serif';
        ctx.fillText(accessoriesItemName, 260, boxTop + 215);

        // Trang sức
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillText('• Trang sức:', 115, boxTop + 270);
        ctx.fillStyle = '#2C241E';
        ctx.font = '600 21px sans-serif';
        ctx.fillText(jewelryItemName, 260, boxTop + 270);

        // 6. BÊN DƯỚI CHI TIẾT TRANG PHỤC: PHẦN CHẤM ĐIỂM TỔNG QUAN
        const scoreTop = 1465;
        const scoreGrad = ctx.createLinearGradient(80, scoreTop, 1000, scoreTop + 330);
        scoreGrad.addColorStop(0, hasCustomBgEvent ? 'rgba(255, 253, 248, 0.96)' : '#FFFDF8');
        scoreGrad.addColorStop(1, hasCustomBgEvent ? 'rgba(250, 243, 227, 0.96)' : '#FAF3E3');
        ctx.fillStyle = scoreGrad;
        ctx.beginPath();
        ctx.roundRect(80, scoreTop, 920, 315, 24);
        ctx.fill();
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#8B1E1E';
        ctx.font = 'bold 21px serif';
        ctx.textAlign = 'left';
        ctx.fillText('CHẤM ĐIỂM TỔNG QUAN CHO TRANG PHỤC', 115, scoreTop + 45);

        // 3 Khối Điểm Sắc Nét
        // Khối 1: Điểm tổng quan
        ctx.fillStyle = '#8B1E1E';
        ctx.beginPath();
        ctx.roundRect(115, scoreTop + 75, 240, 130, 16);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.font = 'bold 46px sans-serif';
        ctx.fillText(`${overallScore}/100`, 235, scoreTop + 140);
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('ĐIỂM TỔNG QUAN', 235, scoreTop + 180);

        // Khối 2: Chuẩn mực đoan trang
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(385, scoreTop + 75, 275, 130, 16);
        ctx.fill();
        ctx.strokeStyle = '#E8DEC8';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#15803D';
        ctx.font = 'bold 42px sans-serif';
        ctx.fillText(`${etiquette.score}/100`, 522, scoreTop + 138);
        ctx.fillStyle = '#3E2723';
        ctx.font = '600 15px sans-serif';
        ctx.fillText('Chuẩn Mực Đoan Trang', 522, scoreTop + 180);

        // Khối 3: Hài hòa sắc phục
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(690, scoreTop + 75, 275, 130, 16);
        ctx.fill();
        ctx.strokeStyle = '#E8DEC8';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#D97706';
        ctx.font = 'bold 42px sans-serif';
        ctx.fillText(`${harmony.score}/100`, 827, scoreTop + 138);
        ctx.fillStyle = '#3E2723';
        ctx.font = '600 15px sans-serif';
        ctx.fillText('Hài Hòa Sắc Phục', 827, scoreTop + 180);

        // Lời nhận xét tổng quan
        ctx.fillStyle = '#4A3525';
        ctx.font = 'italic 19px serif';
        ctx.textAlign = 'center';
        ctx.fillText(`“${overallVerdict}”`, 540, scoreTop + 245);

        ctx.fillStyle = '#15803D';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`✓ Phối màu: ${harmony.harmonyType} · Đạt tiêu chuẩn phục trang lễ hội di sản`, 540, scoreTop + 280);

        // Xuất file PNG sắc nét
        const link = document.createElement('a');
        link.download = `lookbook-story-${outfit.rootId}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      }
      URL.revokeObjectURL(blobURL);
    } catch (err) {
      console.error('Lỗi khi xuất ảnh Lookbook:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E] mb-1">
            <Sparkles className="w-4 h-4 text-[#8B1E1E]" />
            <span>Bước 5 · Lookbook Việt Phục Hoàn Thiện</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C241E]">
            Thiệp Lookbook Việt Phục Di Sản
          </h2>
          <p className="text-xs text-[#6B5A4B] mt-1">
            Thiết kế sắc nét phù hợp đăng Story, Reels và mạng xã hội. Bao gồm ảnh nhân vật, danh mục trang phục và bảng điểm tổng quan.
          </p>
        </div>

        {/* Nút hành động tải & chia sẻ */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleDownloadStory916}
            disabled={downloading}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ring-2 ring-[#8B1E1E]/20"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Đang xuất ảnh 1080x1920...' : 'Xuất Ảnh Lookbook'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#2C241E] bg-[#EFE7DC] hover:bg-[#E5DACB] border border-[#D8C7B0] rounded-xl transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Đã sao chép!' : 'Chia Sẻ'}</span>
          </button>
        </div>
      </div>

      {/* Main Container: Dual Column (Trái: Template Lookbook; Phải: Bảng điều khiển & Tùy chỉnh) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* CỘT TRÁI: TEMPLATE LOOKBOOK (STORY / REELS)               */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 flex justify-center">
          <div 
            id="lookbook-story-preview"
            style={
              hasCustomBgEvent && activeCustomBgUri
                ? { 
                    backgroundImage: `url(${activeCustomBgUri})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }
                : undefined
            }
            className={`w-full max-w-[440px] aspect-[9/16] rounded-3xl border-2 shadow-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none transition-all duration-300 ${
              hasCustomBgEvent 
                ? isDenHungEvent
                  ? 'border-white/60 ring-2 ring-[#B45309]/30'
                  : isHueFestivalEvent
                    ? 'border-white/60 ring-2 ring-[#7E22CE]/30'
                    : isHoiLimEvent 
                      ? 'border-white/60 ring-2 ring-[#8B1E1E]/30' 
                      : isVietPhucTreEvent
                        ? 'border-white/60 ring-2 ring-[#D97706]/30'
                        : 'border-white/60 ring-2 ring-[#0F766E]/30' 
                : 'bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#EDE4D5] border-[#D8C7B0]'
            }`}
          >
            {/* Viền chỉ đỏ truyền thống bên trong */}
            <div className={`absolute inset-2 border rounded-2xl pointer-events-none ${hasCustomBgEvent ? 'border-[#8B1E1E]/60' : 'border-[#8B1E1E]/40'}`} />

            {/* 1. PHÍA TRÊN: TÊN BỘ TRANG PHỤC */}
            <div className={`text-center pt-2 px-2 relative z-10 space-y-1 ${
              hasCustomBgEvent 
                ? 'bg-[#FAF7F2]/90 backdrop-blur-md rounded-2xl border border-[#D8C7B0]/70 p-2 shadow-sm' 
                : ''
            }`}>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1E1E]">
                  GIAO THOA · LOOKBOOK VIỆT PHỤC
                </span>
                {isDenHungEvent && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#B45309] text-white text-[9px] font-bold inline-flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    Đại Lễ Đền Hùng
                  </span>
                )}
                {isHueFestivalEvent && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#7E22CE] text-white text-[9px] font-bold inline-flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    Festival Cố Đô Huế
                  </span>
                )}
                {isHoiLimEvent && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#8B1E1E] text-white text-[9px] font-bold inline-flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    Hội Lim Quan Họ
                  </span>
                )}
                {isSongNuocEvent && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#0F766E] text-white text-[9px] font-bold inline-flex items-center gap-0.5">
                    <Waves className="w-2.5 h-2.5" />
                    Sông Nước
                  </span>
                )}
                {isVietPhucTreEvent && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D97706] text-white text-[9px] font-bold inline-flex items-center gap-0.5 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    Việt Phục Trẻ
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2C241E] leading-tight">
                &ldquo;{outfit.outfitName}&rdquo;
              </h3>
              <p className="text-[11px] font-serif italic text-[#78350F]">
                Di sản {root.name} · Phối đồ trẩy hội {currentEvent.name}
              </p>
            </div>

            {/* 2. Ở GIỮA: HIỆN RÕ ẢNH NHÂN VẬT VỚI BỘ TRANG PHỤC */}
            <div className="relative my-auto flex items-center justify-center z-10">
              <div className={`w-full rounded-2xl border p-1 sm:p-2 flex items-center justify-center transition-all ${
                hasCustomBgEvent 
                  ? 'bg-white/40 backdrop-blur-[2px] border-white/60 shadow-sm' 
                  : 'bg-white/70 backdrop-blur-xs border-[#E8DEC8] shadow-inner'
              }`}>
                <AvatarMannequin 
                  outfit={outfit} 
                  heightClass="h-[310px] sm:h-[350px]" 
                  showDetailsOverlay={false}
                  forceExplodedLayers={false}
                  isThumbnail={false}
                />
              </div>
            </div>

            {/* PHẦN DƯỚI GỒM: CHI TIẾT TRANG PHỤC & CHẤM ĐIỂM TỔNG QUAN */}
            <div className="space-y-2.5 relative z-10 pb-1">
              {/* 3. PHÍA DƯỚI NHÂN VẬT: HIỆN CỤ THỂ TRANG PHỤC (CHỈ NÊU LOẠI TRANG PHỤC) */}
              <div className={`rounded-xl border p-2.5 sm:p-3 shadow-xs space-y-1.5 text-left ${
                hasCustomBgEvent 
                  ? 'bg-white/95 backdrop-blur-md border-[#D8C7B0]' 
                  : 'bg-white/95 border-[#D8C7B0]'
              }`}>
                <div className="flex items-center gap-1 text-[11px] font-serif font-bold uppercase tracking-wider text-[#8B1E1E]">
                  <Layers className="w-3 h-3 text-[#8B1E1E]" />
                  <span>Trang phục bao gồm:</span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-[11px] text-[#2C241E]">
                  <div className="flex items-baseline gap-1.5 truncate">
                    <span className="font-bold text-[#78350F] shrink-0">• Loại áo:</span>
                    <span className="font-medium truncate">{topItemName}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <span className="font-bold text-[#78350F] shrink-0">• Quần / Váy:</span>
                    <span className="font-medium truncate">{bottomItemName}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <span className="font-bold text-[#78350F] shrink-0">• Phụ kiện:</span>
                    <span className="font-medium truncate">{accessoriesItemName}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 truncate">
                    <span className="font-bold text-[#78350F] shrink-0">• Trang sức:</span>
                    <span className="font-medium truncate">{jewelryItemName}</span>
                  </div>
                </div>
              </div>

              {/* 4. BÊN DƯỚI CHI TIẾT TRANG PHỤC: PHẦN CHẤM ĐIỂM TỔNG QUAN */}
              <div className={`rounded-xl border p-2.5 sm:p-3 shadow-xs space-y-2 ${
                hasCustomBgEvent 
                  ? 'bg-[#FFFDF8]/95 backdrop-blur-md border-[#D4AF37]' 
                  : 'bg-gradient-to-r from-[#FFFDF8] to-[#FAF3E3] border-[#D4AF37]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-serif font-bold uppercase tracking-wider text-[#8B1E1E]">
                    <Award className="w-3.5 h-3.5 text-[#8B1E1E]" />
                    <span>Chấm điểm tổng quan:</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#15803D]">
                    {harmony.harmonyType}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-[#8B1E1E] text-white p-1.5 rounded-lg flex flex-col justify-center items-center shadow-xs">
                    <span className="text-base sm:text-lg font-black leading-none">{overallScore}/100</span>
                    <span className="text-[9px] font-semibold tracking-tighter mt-0.5 opacity-90">Tổng quan</span>
                  </div>
                  <div className="bg-white border border-[#E8DEC8] p-1.5 rounded-lg flex flex-col justify-center items-center shadow-xs">
                    <span className="text-sm sm:text-base font-bold text-[#15803D] leading-none">{etiquette.score}/100</span>
                    <span className="text-[9px] font-medium text-[#6B5A4B] tracking-tighter mt-0.5">Đoan trang</span>
                  </div>
                  <div className="bg-white border border-[#E8DEC8] p-1.5 rounded-lg flex flex-col justify-center items-center shadow-xs">
                    <span className="text-sm sm:text-base font-bold text-[#D97706] leading-none">{harmony.score}/100</span>
                    <span className="text-[9px] font-medium text-[#6B5A4B] tracking-tighter mt-0.5">Hài hòa màu</span>
                  </div>
                </div>

                <p className="text-[10px] text-[#4A3525] italic text-center font-serif leading-tight truncate">
                  &ldquo;{overallVerdict}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CỘT PHẢI: BẢNG ĐIỀU KHIỂN & CHỈNH SỬA NHANH               */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-5">
          {/* 0. Chọn bối cảnh lễ hội (Đặc biệt: Đền Hùng, Festival Huế, Hội Lim, Sông Nước & Việt Phục Trẻ) */}
          <div className="bg-white p-5 rounded-2xl border border-[#D8C7B0] shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <label className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B1E1E]" />
                <span>Bối Cảnh Lễ Hội Trẩy Hội:</span>
              </label>
              {isDenHungEvent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B45309]/10 text-[#B45309] text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  Đang bật Background Đền Hùng
                </span>
              )}
              {isHueFestivalEvent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7E22CE]/10 text-[#7E22CE] text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  Đang bật Background Cố Đô Huế
                </span>
              )}
              {isHoiLimEvent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  Đang bật Background Hội Lim
                </span>
              )}
              {isSongNuocEvent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-[10px] font-bold">
                  <Waves className="w-3 h-3" />
                  Đang bật Background Sông Nước
                </span>
              )}
              {isVietPhucTreEvent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706] text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  Đang bật Background Việt Phục Trẻ
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {FESTIVAL_EVENTS.map((event) => {
                const isSelected = outfit.selectedEventId === event.id;
                const isDenHung = event.id === 'event-den-hung';
                const isHueFestival = event.id === 'event-festival-hue';
                const isHoiLim = event.id === 'event-hoi-lim';
                const isSongNuoc = event.id === 'event-song-nuoc-nam-bo';
                const isVietPhucTre = event.id === 'event-genz-street-festival';
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onChangeOutfit({ selectedEventId: event.id })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? isDenHung
                          ? 'bg-[#B45309] text-white border-[#B45309] shadow-sm font-semibold'
                          : isHueFestival
                            ? 'bg-[#7E22CE] text-white border-[#7E22CE] shadow-sm font-semibold'
                            : isHoiLim
                              ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-sm font-semibold'
                              : isVietPhucTre
                                ? 'bg-[#D97706] text-white border-[#D97706] shadow-sm font-semibold'
                                : isSongNuoc
                                  ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm font-semibold'
                                  : 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-sm font-semibold'
                        : isDenHung
                          ? 'bg-amber-50/80 hover:bg-amber-100/80 border-amber-300 text-amber-950 font-medium'
                          : isHueFestival
                            ? 'bg-purple-50/80 hover:bg-purple-100/80 border-purple-300 text-purple-950 font-medium'
                            : isHoiLim
                              ? 'bg-rose-50/70 hover:bg-rose-100/70 border-rose-300 text-rose-950 font-medium'
                              : isVietPhucTre
                                ? 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-300 text-amber-950 font-medium'
                                : isSongNuoc
                                  ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-300 text-emerald-950 font-medium'
                                  : 'bg-[#FAF7F2] hover:bg-[#F3ECE0] border-[#E8DEC8] text-[#2C241E]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate">{event.name}</span>
                      {isDenHung && (
                        <span className="text-[10px] shrink-0">🏛️</span>
                      )}
                      {isHueFestival && (
                        <span className="text-[10px] shrink-0">🏮</span>
                      )}
                      {isHoiLim && (
                        <span className="text-[10px] shrink-0">🌸</span>
                      )}
                      {isSongNuoc && (
                        <span className="text-[10px] shrink-0">🛶</span>
                      )}
                      {isVietPhucTre && (
                        <span className="text-[10px] shrink-0">✨</span>
                      )}
                    </div>
                    <span className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#8C7A6B]'}`}>
                      {isDenHung ? 'Cảnh nền Đại Lễ Đền Hùng' : (isHueFestival ? 'Cảnh nền Festival Cố Đô Huế' : (isHoiLim ? 'Cảnh nền Hội Lim Quan Họ' : (isVietPhucTre ? 'Cảnh nền Ngày Hội Việt Phục Trẻ' : (isSongNuoc ? 'Cảnh nền sông nước' : event.venue.split(',')[0]))))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1. Đổi tên nhanh cho bộ Lookbook */}
          <div className="bg-white p-5 rounded-2xl border border-[#D8C7B0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-[#8B1E1E]" />
                <span>Đặt tên cho bộ Lookbook:</span>
              </label>
              <span className="text-[11px] text-[#8C7A6B]">Tự động cập nhật vào ảnh</span>
            </div>
            <input
              type="text"
              value={outfit.outfitName}
              onChange={(e) => onChangeOutfit({ outfitName: e.target.value })}
              placeholder="Nhập tên bộ trang phục..."
              className="w-full px-4 py-2.5 text-sm bg-[#FAF7F2] rounded-xl border border-[#D8C7B0] text-[#2C241E] font-serif font-bold focus:outline-hidden focus:border-[#8B1E1E] transition-colors"
            />
          </div>

          {/* 2. Nút xuất ảnh to nổi bật */}
          <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] p-5 rounded-2xl border-2 border-[#8B1E1E]/30 shadow-md space-y-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-[11px] font-bold">
                <Sparkle className="w-3 h-3 text-[#8B1E1E]" />
                Chuẩn Story, Reels, TikTok (1080x1920)
              </span>
              <h4 className="font-serif font-bold text-base text-[#2C241E]">
                Sẵn Sàng Xuất Ảnh Độ Sắc Nét Cao 100%
              </h4>
              <p className="text-xs text-[#6B5A4B] leading-relaxed">
                {isDenHungEvent
                  ? 'Ảnh xuất ra sẽ tích hợp trực tiếp hình nền phong cảnh Đại Lễ Dâng Hương Đền Hùng cùng nhân vật và bảng chấm điểm chi tiết.'
                  : isHueFestivalEvent
                    ? 'Ảnh xuất ra sẽ tích hợp trực tiếp hình nền phong cảnh Festival Cố Đô Huế cùng nhân vật và bảng chấm điểm chi tiết.'
                    : isHoiLimEvent
                      ? 'Ảnh xuất ra sẽ tích hợp trực tiếp hình nền phong cảnh Lễ Hội Hội Lim & Giao Duyên Quan Họ cùng nhân vật và bảng chấm điểm chi tiết.'
                      : isVietPhucTreEvent
                        ? 'Ảnh xuất ra sẽ tích hợp trực tiếp hình nền phong cảnh Ngày Hội Việt Phục Trẻ cùng nhân vật và bảng chấm điểm chi tiết.'
                        : isSongNuocEvent 
                          ? 'Ảnh xuất ra sẽ tích hợp trực tiếp hình nền sông nước và trái cây miệt vườn cùng nhân vật và bảng chấm điểm chi tiết.'
                          : 'Ảnh xuất ra từ vector SVG sẽ giữ nguyên độ nét từng thớ vải lụa, hoa văn thêu và kiềng trang sức, phù hợp chia sẻ trực tiếp lên mạng xã hội.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadStory916}
              disabled={downloading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-2 ring-[#8B1E1E]/20"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Đang tạo ảnh độ nét cao...' : 'Tải Ảnh Lookbook (Story / Reels)'}</span>
            </button>
          </div>

          {/* 3. Các nút chỉnh sửa nhanh từng phần */}
          <div className="bg-white p-5 rounded-2xl border border-[#D8C7B0] shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] block">
              Điều Chỉnh Lại Từng Chi Tiết:
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => onGoToStep(2)}
                className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DEC8] flex items-center justify-between text-[#2C241E] font-medium transition-colors cursor-pointer"
              >
                <span>Sửa kiểu áo</span>
                <Edit3 className="w-3.5 h-3.5 text-[#8B1E1E]" />
              </button>
              <button
                type="button"
                onClick={() => onGoToStep(3)}
                className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DEC8] flex items-center justify-between text-[#2C241E] font-medium transition-colors cursor-pointer"
              >
                <span>Sửa quần / váy</span>
                <Edit3 className="w-3.5 h-3.5 text-[#8B1E1E]" />
              </button>
              <button
                type="button"
                onClick={() => onGoToStep(4)}
                className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DEC8] flex items-center justify-between text-[#2C241E] font-medium transition-colors cursor-pointer"
              >
                <span>Sửa phụ kiện & giày</span>
                <Edit3 className="w-3.5 h-3.5 text-[#8B1E1E]" />
              </button>
              <button
                type="button"
                onClick={() => onGoToStep(1)}
                className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DEC8] flex items-center justify-between text-[#2C241E] font-medium transition-colors cursor-pointer"
              >
                <span>Đổi loại phục trang</span>
                <Edit3 className="w-3.5 h-3.5 text-[#8B1E1E]" />
              </button>
            </div>
          </div>

          {/* 4. Xem quy chuẩn đoan trang & So sánh A/B */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onOpenEtiquette}
              className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#15803D]" />
              <span>Xem Quy Chuẩn Đoan Trang</span>
            </button>
            <button
              type="button"
              onClick={onOpenCompare}
              className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-700" />
              <span>So Sánh Phối Đồ A / B</span>
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
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Khởi Tạo Bản Phối Khác</span>
        </button>
      </div>
    </div>
  );
};

export default Step5LookbookReview;
