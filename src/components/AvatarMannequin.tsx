import React, { useState } from 'react';
import { CostumeOutfitState, Hairstyle, FaceShape, Gender } from '../types/costume';
import { COSTUME_ROOTS } from '../data/costumeData';
import { Smile, Sparkles, Ruler, RotateCcw, Palette, Sliders, SunMedium, User } from 'lucide-react';
import { HairThumbnailCard } from './HairThumbnailCard';

interface AvatarMannequinProps {
  outfit: CostumeOutfitState;
  showDetailsOverlay?: boolean;
  onEditAvatar?: () => void;
  onQuickUpdateAvatar?: (updated: Partial<CostumeOutfitState['avatar']>) => void;
  heightClass?: string;
}

export const AvatarMannequin: React.FC<AvatarMannequinProps> = ({
  outfit,
  showDetailsOverlay = true,
  onEditAvatar,
  onQuickUpdateAvatar,
  heightClass = 'h-[520px]'
}) => {
  const root = COSTUME_ROOTS[outfit.rootId];
  const { top, bottom, accessories, avatar } = outfit;

  // Studio Ghibli Natural Warm Porcelain & Soft Peach Skin Tone
  const skinColor = avatar.skinTone === 'fair' ? '#FFF6EE' : avatar.skinTone === 'natural' ? '#FDF0E6' : '#F6DFCE';
  const skinShade = avatar.skinTone === 'fair' ? '#F7C6B6' : avatar.skinTone === 'natural' ? '#ECA98D' : '#D88A60';

  // Face shape: oval (trái xoan) or round (mặt tròn)
  const faceShape = avatar.faceShape || 'oval';

  // Gender: 'female' (mặc định) hoặc 'male' (nhân vật nam)
  const gender: Gender = avatar.gender || 'female';
  const isMale = gender === 'male';

  // User customized physique: Height (140 - 200 cm) and Weight (40 - 100 kg)
  // Standard default values: Nữ (160 cm, 52 kg) | Nam (172 cm, 64 kg)
  const defaultStandardHeight = isMale ? 172 : 160;
  const defaultStandardWeight = isMale ? 64 : 52;

  const height = avatar.height ?? defaultStandardHeight;
  const weight = avatar.weight ?? defaultStandardWeight;
  const [showPhysiqueControls, setShowPhysiqueControls] = useState(false);

  // Studio Ghibli warm pastel anime filter state
  // Types: 'ghibli-warm' (default warm pastel film), 'ghibli-sunlit' (golden hour nostagia), 'ghibli-watercolor' (soft watercolor dream), 'natural' (crisp studio)
  const [ghibliFilter, setGhibliFilter] = useState<'ghibli-warm' | 'ghibli-sunlit' | 'ghibli-watercolor' | 'natural'>('ghibli-warm');
  const [showFilterPicker, setShowFilterPicker] = useState(false);

  // Filter URL mapping
  const activeFilterUrl = 
    ghibliFilter === 'ghibli-warm' ? 'url(#ghibliWarmFilter)' :
    ghibliFilter === 'ghibli-sunlit' ? 'url(#ghibliSunlitFilter)' :
    ghibliFilter === 'ghibli-watercolor' ? 'url(#ghibliWatercolorFilter)' :
    undefined;

  // Scale calculations relative to reference standard:
  // Base standard reference: Female 160cm/52kg, Male has broader shoulder and taller baseline
  const baseRefHeight = isMale ? 170 : 160;
  const baseRefWeight = isMale ? 62 : 52;
  const scaleY = (1 + (height - baseRefHeight) * 0.0034) * (isMale ? 1.04 : 1.0);
  const scaleX = (1 + (weight - baseRefWeight) * 0.0052) * (isMale ? 1.07 : 1.0);

  // Center is x=180, vertical anchor is feet/ground at y=435
  const mannequinTransform = `translate(180, 435) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)}) translate(-180, -435)`;

  const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(1));
  const getBmiStatus = (val: number) => {
    if (val < 18.5) return 'Mảnh mai';
    if (val <= 22.9) return 'Cân đối';
    if (val <= 24.9) return 'Đầy đặn';
    return 'Phúc hậu';
  };

  const handlePhysiqueChange = (newHeight: number, newWeight: number) => {
    if (onQuickUpdateAvatar) {
      onQuickUpdateAvatar({ height: newHeight, weight: newWeight });
    }
  };

  // Accessories checks
  const hasKiengBac = accessories.jewelryIds.includes('jewel-kieng-bac-cham-sen');
  const hasPearlEarring = accessories.jewelryIds.includes('jewel-khuyen-tai-ngoc-trai');
  const hasGlasses = accessories.jewelryIds.includes('jewel-kinh-mat-retro-oval');
  const hasWristband = accessories.jewelryIds.includes('jewel-vong-tay-ngu-sac');

  const hairAcc = accessories.hairAccessoryId;
  const shoesId = accessories.shoesId;
  const hairstyle: Hairstyle = avatar.hairstyle;

  // Studio Ghibli Hand-Drawn Hair Palette (Warm chestnut, roasted espresso & sunlit amber luster)
  const hairDark = '#1E1612';     // Deep sepia base
  const hairMid = '#2F231B';      // Warm chestnut body
  const hairSoft = '#443327';     // Hand-drawn soft mid-tone
  const hairSheen = '#634B3B';    // Subtle organic curve
  const hairHalo = '#9A775C';     // Sunlit warm amber luster

  // Handle quick update
  const handleFaceShapeChange = (shape: FaceShape) => {
    if (onQuickUpdateAvatar) {
      onQuickUpdateAvatar({ faceShape: shape });
    } else if (onEditAvatar) {
      onEditAvatar();
    }
  };

  const handleHairstyleChange = (style: Hairstyle) => {
    if (onQuickUpdateAvatar) {
      onQuickUpdateAvatar({ hairstyle: style });
    } else if (onEditAvatar) {
      onEditAvatar();
    }
  };

  return (
    <div className={`relative w-full ${heightClass} flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-b from-[#FDF8F2] via-[#F6EDE1] to-[#EBE0D0] border border-[#D8C7B0]/90 shadow-inner select-none transition-all duration-300`}>
      {/* Subtle Ghibli sky & clouds / cultural architectural backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center">
        <svg viewBox="0 0 400 500" className="w-full h-full object-cover">
          <circle cx="200" cy="180" r="140" fill="none" stroke="#D2BBA0" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="180" r="170" fill="none" stroke="#D2BBA0" strokeWidth="0.8" />
          {/* Gentle pastel clouds resembling Ghibli afternoon skies */}
          <path d="M40,90 Q65,65 95,85 Q125,70 145,95 Q165,115 135,125 Q70,125 40,90 Z" fill="#FFF7ED" opacity="0.6" />
          <path d="M260,110 Q285,85 315,100 Q345,90 365,115 Q375,135 345,140 Q290,140 260,110 Z" fill="#FFF7ED" opacity="0.55" />
          <line x1="60" y1="20" x2="60" y2="480" stroke="#C8B39B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="340" y1="20" x2="340" y2="480" stroke="#C8B39B" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Top Floating Info Bar */}
      {showDetailsOverlay && (
        <div className="w-full z-20 px-3.5 pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 rounded-xl border border-[#D8C7B0] shadow-2xs text-[11px] flex items-center gap-1.5">
              <span className="font-serif font-bold text-[#2C241E]">{root.name}</span>
              <span className="text-[#8C7A6B]">·</span>
              <span className="text-[#8C7A6B]">{root.regionalTag}</span>
            </div>

            {/* Quick Controls: Vóc Dáng (Chiều cao & Cân nặng) + Dáng Mặt */}
            <div className="bg-white/95 backdrop-blur-md px-1.5 py-1 rounded-xl border border-[#D8C7B0] shadow-2xs flex items-center gap-1">
              {/* Nút bật thanh trượt vóc dáng */}
              <button
                type="button"
                onClick={() => setShowPhysiqueControls(!showPhysiqueControls)}
                title="Tùy chỉnh chiều cao (140-200cm) và cân nặng (40-100kg)"
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  showPhysiqueControls || height !== 160 || weight !== 52
                    ? 'bg-[#9B2C2C] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                <Ruler className="w-3 h-3" />
                <span>{height}cm · {weight}kg</span>
              </button>

              <button
                type="button"
                onClick={() => handleFaceShapeChange('oval')}
                title="Dáng Mặt Trái Xoan (Thanh Tú, V-Line)"
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  faceShape === 'oval'
                    ? 'bg-[#9B2C2C] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                ⬭ Trái Xoan
              </button>
              <button
                type="button"
                onClick={() => handleFaceShapeChange('round')}
                title="Dáng Mặt Tròn (Bầu Bĩnh, Đáng Yêu)"
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  faceShape === 'round'
                    ? 'bg-[#9B2C2C] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                ◯ Mặt Tròn
              </button>

              {/* Nút tùy chọn Filter Hoạt Hình Ghibli Pastel */}
              <button
                type="button"
                onClick={() => setShowFilterPicker(!showFilterPicker)}
                title="Hiệu ứng màu sắc pastel ấm áp phong cách hoạt hình Ghibli"
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  showFilterPicker || ghibliFilter !== 'natural'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                <Palette className="w-3 h-3 text-amber-700" />
                <span className="hidden sm:inline">Ghibli</span>
              </button>

              {onEditAvatar && (
                <button
                  type="button"
                  onClick={onEditAvatar}
                  title="Mở bảng tùy chọn chi tiết kiểu tóc & tải ảnh đại diện"
                  className="ml-0.5 p-1 text-[#6B5A4B] hover:text-[#9B2C2C] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                >
                  <Smile className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Selection Popover Card */}
          {showFilterPicker && (
            <div className="w-full p-2.5 bg-white/95 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-md space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between pb-1 border-b border-amber-100">
                <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1">
                  <SunMedium className="w-3.5 h-3.5 text-amber-600" />
                  Hiệu Ứng Màu Sắc Hoạt Hình Ghibli
                </span>
                <span className="text-[9px] text-amber-800 font-medium">Nét vẽ mềm & Pastel ấm</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
                {[
                  { id: 'ghibli-warm', name: '🌸 Pastel Ấm', desc: 'Màu phim Ghibli ấm áp' },
                  { id: 'ghibli-sunlit', name: '☀️ Nắng Chiều Vàng', desc: 'Hoàng hôn hoài niệm' },
                  { id: 'ghibli-watercolor', name: '🎨 Màu Nước Êm', desc: 'Nét vẽ tơi mềm mại' },
                  { id: 'natural', name: '🌿 Nguyên Bản', desc: 'Độ nét sắc tiêu chuẩn' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setGhibliFilter(item.id as any);
                    }}
                    className={`px-2 py-1.5 rounded-xl text-left transition-all border cursor-pointer ${
                      ghibliFilter === item.id
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-[#FAF7F2] text-[#4A3B32] border-[#E8DEC8] hover:bg-white'
                    }`}
                  >
                    <p className="text-[10px] font-bold leading-tight">{item.name}</p>
                    <p className={`text-[8px] leading-tight truncate ${ghibliFilter === item.id ? 'text-amber-100' : 'text-[#8C7A6B]'}`}>
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Collapsible Quick Physique Sliders Card */}
          {showPhysiqueControls && (
            <div className="w-full p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D8C7B0] shadow-md space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between pb-1 border-b border-[#F0E6D8]">
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#9B2C2C]" />
                  <span className="text-[11px] font-bold text-[#2C241E] uppercase tracking-wide">
                    Vóc Dáng Nhân Vật
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#8C7A6B]">
                    BMI: <strong className="text-[#9B2C2C]">{bmi}</strong> ({getBmiStatus(bmi)})
                  </span>
                  {(height !== 160 || weight !== 52) && (
                    <button
                      type="button"
                      onClick={() => handlePhysiqueChange(160, 52)}
                      className="text-[9px] text-[#9B2C2C] hover:underline font-bold flex items-center gap-0.5"
                      title="Đặt lại chuẩn 160 cm và 52 kg"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Chuẩn 160cm/52kg</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Slider 1: Chiều cao (140 cm - 200 cm) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#6B5A4B] font-medium">Chiều cao (140 - 200 cm):</span>
                  <span className="font-bold text-[#9B2C2C] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    {height} cm
                  </span>
                </div>
                <input
                  type="range"
                  min={140}
                  max={200}
                  step={1}
                  value={height}
                  onChange={(e) => handlePhysiqueChange(Number(e.target.value), weight)}
                  className="w-full accent-[#9B2C2C] cursor-pointer h-1.5 bg-[#E8DEC8] rounded-lg"
                />
                <div className="flex justify-between text-[9px] text-[#8C7A6B]">
                  <span>140 cm (Nhỏ nhắn)</span>
                  <span className="font-semibold text-[#78350F]">160 cm (Chuẩn)</span>
                  <span>200 cm (Cao ráo)</span>
                </div>
              </div>

              {/* Slider 2: Cân nặng (40 kg - 100 kg) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#6B5A4B] font-medium">Cân nặng (40 - 100 kg):</span>
                  <span className="font-bold text-[#9B2C2C] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    {weight} kg
                  </span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  step={1}
                  value={weight}
                  onChange={(e) => handlePhysiqueChange(height, Number(e.target.value))}
                  className="w-full accent-[#9B2C2C] cursor-pointer h-1.5 bg-[#E8DEC8] rounded-lg"
                />
                <div className="flex justify-between text-[9px] text-[#8C7A6B]">
                  <span>40 kg (Mảnh mai)</span>
                  <span className="font-semibold text-[#78350F]">52 kg (Chuẩn)</span>
                  <span>100 kg (Đầy đặn)</span>
                </div>
              </div>

              {/* Presets Row */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
                <span className="text-[9px] text-[#8C7A6B] shrink-0 font-medium">Gợi ý dáng:</span>
                {[
                  { h: 160, w: 52, label: 'Chuẩn 160/52' },
                  { h: 152, w: 44, label: 'Mảnh mai 152/44' },
                  { h: 172, w: 54, label: 'Người mẫu 172/54' },
                  { h: 162, w: 66, label: 'Đầy đặn 162/66' },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePhysiqueChange(preset.h, preset.w)}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                      height === preset.h && weight === preset.w
                        ? 'bg-[#9B2C2C] text-white border-[#9B2C2C]'
                        : 'bg-[#FAF7F2] text-[#4A3B32] border-[#E8DEC8] hover:bg-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SVG Canvas for Model + Fitted Clothing Layers */}
      <svg
        id="mannequin-svg-canvas"
        viewBox="0 -25 360 515"
        className="w-full flex-1 max-h-[460px] z-10 drop-shadow-md my-auto"
      >
        <defs>
          {/* Fabric Shading Gradients */}
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={top.primaryColor} stopOpacity="1" />
            <stop offset="50%" stopColor={top.primaryColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={top.primaryColor} stopOpacity="0.84" />
          </linearGradient>

          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bottom.color} stopOpacity="1" />
            <stop offset="50%" stopColor={bottom.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={bottom.color} stopOpacity="0.84" />
          </linearGradient>

          {/* Premium Traditional Vietnamese Silver Kiềng Gradients */}
          <linearGradient id="silverKiengGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="75%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <radialGradient id="silverKieng" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F1F5F9" />
            <stop offset="65%" stopColor="#CBD5E1" />
            <stop offset="90%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </radialGradient>

          <radialGradient id="silverGleam" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E2E8F0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.2" />
          </radialGradient>

          {/* Webtoon/Anime Hair Gradients */}
          <linearGradient id="hairBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C1714" />
            <stop offset="30%" stopColor="#2A221D" />
            <stop offset="75%" stopColor="#251E19" />
            <stop offset="100%" stopColor="#16120F" />
          </linearGradient>

          <linearGradient id="hairFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2F251E" />
            <stop offset="25%" stopColor="#3A3028" />
            <stop offset="60%" stopColor="#2A221D" />
            <stop offset="100%" stopColor="#1A1512" />
          </linearGradient>

          <linearGradient id="animeHalo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E5C4E" stopOpacity="0" />
            <stop offset="30%" stopColor="#8A7665" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#AA9380" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#8A7665" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6E5C4E" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="strandGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#AA9380" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#5A4C40" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2A221D" stopOpacity="0" />
          </linearGradient>

          {/* Studio Ghibli Soulful Amber Eyes and Watercolor Peach Blush */}
          <linearGradient id="animeIrisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E150F" />
            <stop offset="30%" stopColor="#3A2315" />
            <stop offset="60%" stopColor="#58341D" />
            <stop offset="85%" stopColor="#7E4A28" />
            <stop offset="100%" stopColor="#9C6237" />
          </linearGradient>

          <radialGradient id="animeBlushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FB7185" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>

          {/* Pattern filter/mask */}
          <pattern id="lotusPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10,2 Q14,8 10,14 Q6,8 10,2 Z" fill="#FFFFFF" fillOpacity="0.14" />
          </pattern>

          {/* ============================================================== */}
          {/* STUDIO GHIBLI ARTISTIC VISUAL FILTERS                         */}
          {/* ============================================================== */}

          {/* 1. Ghibli Warm Pastel Filter: Soft lines, gentle pastel bloom, warm peach-amber tones */}
          <filter id="ghibliWarmFilter" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            {/* Subtle line softening */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="softBase" />
            {/* Warm pastel film color grading matrix: warm up shadows, gently lower harsh black, lift pastel peach/cream */}
            <feColorMatrix
              type="matrix"
              values="1.06  0.03  0.01  0  0.04
                      0.02  1.02  0.01  0  0.03
                      0.00  0.02  0.94  0  0.01
                      0     0     0     1  0"
              in="softBase"
              result="warmColor"
            />
            {/* Soft Ghibli film bloom/glow */}
            <feGaussianBlur in="warmColor" stdDeviation="1.6" result="bloomBlur" />
            <feComponentTransfer in="bloomBlur" result="subtleBloom">
              <feFuncA type="linear" slope="0.22" />
            </feComponentTransfer>
            {/* Blend subtle bloom over warm color */}
            <feBlend mode="screen" in="subtleBloom" in2="warmColor" />
          </filter>

          {/* 2. Ghibli Sunlit Amber Filter: Golden hour radiance, nostalgic nostalgic Hayao Miyazaki afternoon glow */}
          <filter id="ghibliSunlitFilter" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="softBase" />
            <feColorMatrix
              type="matrix"
              values="1.14  0.05  0.01  0  0.06
                      0.03  1.06  0.01  0  0.04
                      0.01  0.02  0.88  0  0.00
                      0     0     0     1  0"
              in="softBase"
              result="sunlitColor"
            />
            <feGaussianBlur in="sunlitColor" stdDeviation="2.2" result="sunGlow" />
            <feComponentTransfer in="sunGlow" result="softSunGlow">
              <feFuncA type="linear" slope="0.26" />
            </feComponentTransfer>
            <feBlend mode="screen" in="softSunGlow" in2="sunlitColor" />
          </filter>

          {/* 3. Ghibli Watercolor Filter: Dreamy hand-painted gouache/watercolor texture and gentle wash */}
          <filter id="ghibliWatercolorFilter" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="washBase" />
            <feColorMatrix
              type="matrix"
              values="1.04  0.04  0.02  0  0.05
                      0.02  1.04  0.02  0  0.04
                      0.02  0.02  0.98  0  0.03
                      0     0     0     1  0"
              in="washBase"
              result="pastelWash"
            />
            {/* Fine hand-drawn edge overlay to preserve key silhouette contours */}
            <feBlend mode="multiply" in="pastelWash" in2="SourceGraphic" result="blendedArt" />
            <feGaussianBlur in="blendedArt" stdDeviation="1.0" result="softHaze" />
            <feComponentTransfer in="softHaze" result="hazeAlpha">
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feBlend mode="screen" in="hazeAlpha" in2="blendedArt" />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* SCALABLE AVATAR FIGURE: Dynamic Scale by Height & Weight       */}
        {/* WITH STUDIO GHIBLI WARM PASTEL ANIME ARTISTIC FILTER           */}
        {/* ============================================================== */}
        <g id="mannequin-scalable-figure" transform={mannequinTransform} filter={activeFilterUrl}>

        {/* ============================================================== */}
        {/* LAYER 1: BACK HAIR (Chiều sâu 2D Webtoon/Anime sau gáy & lưng) */}
        {/* ============================================================== */}
        <g id="back-hair-layer">
          {/* Kiểu tóc Nam Cổ Trang: Búi Củ Tỏi / Đỉnh Đầu Nam */}
          {hairstyle === 'male-topknot-bun' && (
            <g id="back-hair-male-topknot">
              <ellipse cx="180" cy="52" rx="14" ry="12" fill="url(#hairBackGrad)" />
              {/* Búi tóc củ tỏi đỉnh đầu */}
              <circle cx="180" cy="40" r="10" fill="url(#hairBackGrad)" stroke={hairDark} strokeWidth="1" />
              <line x1="168" y1="38" x2="192" y2="42" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Kiểu tóc Nam Layer Ghibli rủ sau gáy */}
          {hairstyle === 'male-curtain-layers' && (
            <g id="back-hair-male-layers">
              <path
                d="M162,76 C155,95 152,112 152,126 Q166,132 180,132 Q194,132 208,126 C208,112 205,95 198,76 Z"
                fill="url(#hairBackGrad)"
              />
              <path d="M154,124 L158,132 L165,126 L172,133 L180,127 L188,133 L195,126 L202,132 L206,124" stroke={hairSoft} strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* 1. DÀI THẲNG EO (Suôn mượt, tơi thành từng lọn mảnh so le ở đuôi) */}
          {(hairstyle === 'long-straight-waist' || hairstyle === 'long-flowing') && (
            <g id="back-hair-long-straight">
              {/* Lớp nền tối sau lưng */}
              <path
                d="M156,76 C144,105 138,160 137,240 C138,258 143,268 148,272 L154,264 L161,275 L169,267 L177,276 L183,276 L191,267 L199,275 L206,264 L212,272 C217,268 222,258 223,240 C222,160 216,105 204,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Lớp lọn tóc tơi xen kẽ ở đuôi */}
              <path
                d="M142,210 Q146,245 152,267 L158,260 Q164,250 168,270 L174,262 Q180,250 186,270 L192,262 Q196,250 202,267 L208,260 Q214,245 218,210"
                stroke={hairSoft}
                strokeWidth="1.2"
                fill="none"
              />
              {/* Các sợi tóc suôn mượt tơi ở đuôi (feathered wisps) */}
              <line x1="154" y1="240" x2="153" y2="271" stroke={hairSheen} strokeWidth="0.8" />
              <line x1="166" y1="235" x2="165" y2="272" stroke={hairSheen} strokeWidth="0.8" />
              <line x1="180" y1="230" x2="180" y2="274" stroke={hairSheen} strokeWidth="0.9" />
              <line x1="194" y1="235" x2="195" y2="272" stroke={hairSheen} strokeWidth="0.8" />
              <line x1="206" y1="240" x2="207" y2="271" stroke={hairSheen} strokeWidth="0.8" />
            </g>
          )}

          {/* 2. NGẮN NGANG VAI (Tóc lob cúp nhẹ, tỉa layer so le tự nhiên ở đuôi) */}
          {(hairstyle === 'short-bob-straight' || hairstyle === 'short-shoulder-length' || hairstyle === 'short-modern') && (
            <g id="back-hair-short-bob">
              <path
                d="M154,76 C146,98 141,120 141,142 C146,150 156,152 165,148 L170,144 L180,146 L190,144 L195,148 C204,152 214,150 219,142 C219,120 214,98 206,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Tỉa layer so le ở đuôi tóc */}
              <path
                d="M143,135 Q152,148 162,144 Q172,149 180,144 Q188,149 198,144 Q208,148 217,135"
                stroke={hairSoft}
                strokeWidth="1.2"
                fill="none"
              />
              <path d="M152,125 Q156,145 160,147" stroke={hairSheen} strokeWidth="0.8" fill="none" />
              <path d="M208,125 Q204,145 200,147" stroke={hairSheen} strokeWidth="0.8" fill="none" />
            </g>
          )}

          {/* 3. TẾT 2 BÍM (Lớp chân tóc sau gáy chia ngôi giữa) */}
          {(hairstyle === 'braided-twin-waist' || hairstyle === 'braided-twin') && (
            <g id="back-hair-twin-braids">
              <path
                d="M158,78 C152,94 148,112 148,130 C160,132 176,128 178,118 L180,105 L182,118 C184,128 200,132 212,130 C212,112 208,94 202,78 Z"
                fill="url(#hairBackGrad)"
              />
              <line x1="180" y1="85" x2="180" y2="115" stroke={hairDark} strokeWidth="1.2" />
            </g>
          )}

          {/* 4. TẾT 1 BÍM VAI PHẢI (Tóc quét lệch từ sau gáy sang vai phải) */}
          {hairstyle === 'braided-single-side' && (
            <g id="back-hair-single-side-braid">
              <path
                d="M156,76 C148,96 146,116 148,135 C156,140 170,136 182,130 C194,124 208,118 216,110 C218,98 214,86 204,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Nét chải tóc xuôi từ trái qua phải */}
              <path d="M152,105 Q174,128 204,118" stroke={hairSoft} strokeWidth="1.2" fill="none" />
              <path d="M156,90 Q178,115 208,105" stroke={hairSoft} strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* 5. BÚI LỆCH PHẢI (Khối búi tròn phồng trễ sau tai phải & lọn mai sau gáy) */}
          {hairstyle === 'side-bun-right' && (
            <g id="back-hair-side-bun">
              {/* Tóc sau đầu gom sang phải */}
              <ellipse cx="180" cy="74" rx="22" ry="20" fill="url(#hairBackGrad)" />
              {/* Khối búi tròn lỏng to trễ lệch sang phải */}
              <circle cx="216" cy="96" r="16" fill="url(#hairBackGrad)" />
              <ellipse cx="218" cy="94" rx="14" ry="14" fill={hairMid} />
              {/* Nếp uốn xoắn mềm mại của búi tóc (swirl petal texture) */}
              <path d="M206,94 Q216,83 226,92 Q230,104 218,108 Q208,104 208,95" stroke={hairSheen} strokeWidth="1.8" fill="none" />
              <path d="M210,98 Q216,92 222,96 Q224,103 216,104" stroke={hairHalo} strokeWidth="1.2" fill="none" />
              {/* Lọn tóc mai & gáy uốn lơi buông nhẹ sau vai */}
              <path d="M208,106 Q218,140 216,175 Q220,198 215,214" stroke={hairDark} strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M209,112 Q217,142 216,177" stroke={hairSoft} strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 6. NỬA ĐẦU TIỂU THƯ (Tóc dài uốn sóng lượn tự nhiên bồng bềnh) */}
          {hairstyle === 'half-up-princess' && (
            <g id="back-hair-half-up">
              {/* Lớp nền sóng tóc uốn lơi bồng bềnh */}
              <path
                d="M156,76 C144,105 136,150 142,190 Q136,225 142,255 L150,266 L158,258 L168,268 L176,259 L184,269 L192,260 L202,268 L210,258 Q218,225 214,190 C220,150 214,105 204,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Đường uốn sóng S-wave bồng bềnh */}
              <path d="M142,120 Q135,160 146,195 Q138,230 152,262" stroke={hairSoft} strokeWidth="1.5" fill="none" />
              <path d="M216,120 Q223,160 212,195 Q220,230 206,262" stroke={hairSoft} strokeWidth="1.5" fill="none" />
              <path d="M160,140 Q152,190 166,230 L168,266" stroke={hairSheen} strokeWidth="1" fill="none" />
              <path d="M198,140 Q206,190 192,230 L190,266" stroke={hairSheen} strokeWidth="1" fill="none" />
            </g>
          )}

          {/* Các kiểu phụ: Sóng băng đô, Đuôi ngựa, Bob cụp, Búi cao */}
          {hairstyle === 'wavy-headband' && (
            <path
              d="M156,76 C144,110 138,165 138,248 C150,260 174,262 180,262 C186,262 210,260 222,248 C220,165 216,110 204,76 Z"
              fill="url(#hairBackGrad)"
            />
          )}

          {hairstyle === 'side-ponytail-wavy' && (
            <g>
              <ellipse cx="180" cy="74" rx="22" ry="20" fill="url(#hairBackGrad)" />
              <ellipse cx="216" cy="110" rx="14" ry="16" fill="url(#hairBackGrad)" />
            </g>
          )}

          {hairstyle === 'short-curly-bows' && (
            <path
              d="M156,80 C148,105 144,125 142,148 C158,154 202,154 218,148 C216,125 212,105 204,80 Z"
              fill="url(#hairBackGrad)"
            />
          )}

          {(hairstyle === 'high-artistic-bun' || hairstyle === 'traditional-bun') && (
            <g>
              <ellipse cx="180" cy="45" rx="21" ry="17" fill="url(#hairBackGrad)" />
              <path d="M164,48 Q180,31 196,48" stroke={hairSheen} strokeWidth="2.5" fill="none" />
              <path d="M169,54 Q180,39 191,54" stroke={hairSheen} strokeWidth="1.8" fill="none" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* LAYER 2: ANATOMICAL BODY BASE (Feminine, proportioned)         */}
        {/* ============================================================== */}
        <g id="model-body-foundation">
          {/* Legs base (tapered ankles) */}
          <path d="M158,380 L174,380 L171,432 L159,432 Z" fill={skinColor} />
          <path d="M186,380 L202,380 L201,432 L189,432 Z" fill={skinColor} />

          {/* Slender neck (centered at x=180, y=104 to 126) */}
          <path d="M173,104 L187,104 L188,126 L172,126 Z" fill={skinColor} />
          <path d="M176,120 Q180,123 184,120" stroke={skinShade} strokeWidth="1" fill="none" />

          {/* Shoulders & Feminine Arms: Hai tay cong nhẹ nhàng đan trước eo/bụng */}
          <path
            d="M172,126 Q155,127 138,134 Q131,145 134,165 Q138,186 148,198 Q158,210 173,214 L174,206 Q158,202 150,188 Q144,175 144,152 L154,146 L172,126 Z"
            fill={skinColor}
          />
          <path
            d="M188,126 Q205,127 222,134 Q229,145 226,165 Q222,186 212,198 Q202,210 187,214 L186,206 Q202,202 210,188 Q216,175 216,152 L206,146 L188,126 Z"
            fill={skinColor}
          />

          {/* Hai tay đan khéo léo trước eo/bụng theo phong thái trang nhã thiếu nữ Việt */}
          <g id="clasped-hands-base">
            <path
              d="M171,210 Q178,206 186,209 Q190,214 186,220 Q178,223 171,217 Z"
              fill={skinColor}
              stroke={skinShade}
              strokeWidth="0.8"
            />
            <path d="M174,213 Q181,216 186,213" stroke={skinShade} strokeWidth="0.75" fill="none" />
            <path d="M175,216 Q181,219 185,216" stroke={skinShade} strokeWidth="0.75" fill="none" />
            <path d="M173,217 Q180,221 187,218" stroke={skinShade} strokeWidth="0.75" fill="none" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* LAYER 3: BOTTOM GARMENT (Quần Lụa / Chân Váy - Vừa Khít Cạp Eo)*/}
        {/* ============================================================== */}
        <g id="model-bottom-garment">
          {bottom.bottomId === 'bot-chan-vay-midi-xep-ly' ? (
            <g>
              <path
                d="M160,204 L200,204 L226,388 L134,388 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <line x1="166" y1="204" x2="150" y2="388" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" />
              <line x1="174" y1="204" x2="168" y2="388" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" />
              <line x1="180" y1="204" x2="180" y2="388" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" />
              <line x1="186" y1="204" x2="192" y2="388" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" />
              <line x1="194" y1="204" x2="210" y2="388" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" />
            </g>
          ) : (
            <g>
              {/* Left leg */}
              <path
                d="M160,204 L180,204 L176,260 L174,426 L144,426 L149,260 L160,204 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              {/* Right leg */}
              <path
                d="M180,204 L200,204 L211,260 L216,426 L186,426 L184,260 L180,204 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              {/* Crotch line */}
              <line x1="180" y1="204" x2="180" y2="280" stroke="#000000" strokeOpacity="0.18" strokeWidth="1" />
              {/* Silk flowing highlights */}
              <path d="M152,218 Q156,320 150,420" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1.5" fill="none" />
              <path d="M208,218 Q204,320 210,420" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1.5" fill="none" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* LAYER 4: SHOES & FOOTWEAR                                      */}
        {/* ============================================================== */}
        <g id="model-shoes">
          {shoesId === 'shoes-guoc-moc-nhung' && (
            <g>
              <rect x="145" y="428" width="26" height="8" rx="2" fill="#8B4513" />
              <path d="M147,428 Q157,420 169,428" fill="none" stroke="#B91C1C" strokeWidth="3.5" />
              <rect x="148" y="436" width="6" height="5" fill="#5C2E0B" />
              <rect x="164" y="436" width="5" height="5" fill="#5C2E0B" />
              <rect x="187" y="428" width="26" height="8" rx="2" fill="#8B4513" />
              <path d="M189,428 Q199,420 211,428" fill="none" stroke="#B91C1C" strokeWidth="3.5" />
              <rect x="190" y="436" width="6" height="5" fill="#5C2E0B" />
              <rect x="206" y="436" width="5" height="5" fill="#5C2E0B" />
            </g>
          )}

          {shoesId === 'shoes-guoc-got-tru-cham' && (
            <g>
              <rect x="145" y="428" width="26" height="7" rx="1" fill="#A0522D" />
              <rect x="148" y="435" width="7" height="9" fill="#6B3410" />
              <path d="M147,428 Q158,419 169,428" fill="none" stroke="#0F766E" strokeWidth="3" />
              <rect x="187" y="428" width="26" height="7" rx="1" fill="#A0522D" />
              <rect x="190" y="435" width="7" height="9" fill="#6B3410" />
              <path d="M189,428 Q200,419 211,428" fill="none" stroke="#0F766E" strokeWidth="3" />
            </g>
          )}

          {shoesId === 'shoes-mary-jane-vintage' && (
            <g>
              <rect x="149" y="416" width="20" height="12" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <rect x="191" y="416" width="20" height="12" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <ellipse cx="158" cy="431" rx="13" ry="7" fill="#18181B" />
              <ellipse cx="202" cy="431" rx="13" ry="7" fill="#18181B" />
              <line x1="148" y1="429" x2="168" y2="429" stroke="#3F3F46" strokeWidth="2" />
              <line x1="192" y1="429" x2="212" y2="429" stroke="#3F3F46" strokeWidth="2" />
              <circle cx="158" cy="429" r="1.5" fill="#FBBF24" />
              <circle cx="202" cy="429" r="1.5" fill="#FBBF24" />
            </g>
          )}

          {shoesId === 'shoes-sneaker-canvas-theu' && (
            <g>
              <path d="M144,430 Q146,422 158,422 Q171,422 172,432 L172,438 L144,438 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              <rect x="143" y="436" width="30" height="4" rx="1" fill="#E2E8F0" />
              <circle cx="158" cy="428" r="2.5" fill="#F43F5E" />
              <path d="M186,430 Q188,422 200,422 Q213,422 214,432 L214,438 L186,438 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              <rect x="185" y="436" width="30" height="4" rx="1" fill="#E2E8F0" />
              <circle cx="200" cy="428" r="2.5" fill="#F43F5E" />
            </g>
          )}

          {shoesId === 'shoes-sandal-quai-manh' && (
            <g>
              <rect x="146" y="433" width="24" height="4" rx="2" fill="#D4AF37" />
              <line x1="148" y1="430" x2="168" y2="430" stroke="#B45309" strokeWidth="2" />
              <rect x="188" y="433" width="24" height="4" rx="2" fill="#D4AF37" />
              <line x1="190" y1="430" x2="210" y2="430" stroke="#B45309" strokeWidth="2" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* LAYER 5: TAILORED FITTED TOP GARMENT (May đo vừa vặn thân hình)*/}
        {/* ============================================================== */}

        {/* 5A. ÁO TỨ THÂN (Fitted to female student proportions) */}
        {outfit.rootId === 'tu-than' && (
          <g id="ao-tu-than-fitted">
            {/* Fitted Sleeves along arms curving towards clasped hands */}
            <path d="M138,134 Q132,165 140,188 Q152,208 172,214" stroke="url(#topGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M222,134 Q228,165 220,188 Q208,208 188,214" stroke="url(#topGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <line x1="168" y1="210" x2="173" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
            <line x1="192" y1="210" x2="187" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />

            {/* Dây yếm đào luồn ôm cổ thon thả (Neck strap halter loop of Yếm Đào) */}
            <path
              d="M172,122 Q172,112 178,109 Q180,108.5 182,109 Q188,112 188,122"
              stroke={top.innerYemColor || '#DB2777'}
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Inner Yếm đào (Snug chest fit from collarbones down to waist, tucked into sash) */}
            <path
              d="M168,122 L192,122 L198,206 L162,206 Z"
              fill={top.innerYemColor || '#DB2777'}
            />
            {/* Yếm sweetheart neck curve viền mềm mại */}
            <path d="M168,122 Q180,126 192,122" stroke="#9D174D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M172,160 Q180,166 188,160" stroke="#000000" strokeOpacity="0.1" strokeWidth="1" fill="none" />

            {/* Hai thân áo tứ thân khoác ngoài ôm sát vai, ngực và sườn */}
            <path
              d="M138,134 Q155,127 168,122 L164,204 L152,285 L144,204 Q140,165 138,134 Z"
              fill="url(#topGradient)"
            />
            <path
              d="M222,134 Q205,127 192,122 L196,204 L208,285 L216,204 Q220,165 222,134 Z"
              fill="url(#topGradient)"
            />

            {/* Lotus pattern on fabric */}
            {top.patternId !== 'pat-tron-dui-to' && (
              <g>
                <path d="M138,134 Q155,127 168,122 L164,204 L152,285 L144,204 Z" fill="url(#lotusPattern)" />
                <path d="M222,134 Q205,127 192,122 L196,204 L208,285 L216,204 Z" fill="url(#lotusPattern)" />
              </g>
            )}

            {/* Buộc vạt trước (2 vạt buộc thắt mềm mại ngay chính giữa eo) */}
            <path
              d="M174,206 Q178,225 174,255 L168,285"
              stroke={top.primaryColor}
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M186,206 Q182,225 186,255 L192,285"
              stroke={top.primaryColor}
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Dải thắt lưng bao (Sash) */}
            <g id="sash-belt-fitted">
              <rect
                x="159"
                y="199"
                width="42"
                height="12"
                rx="3"
                fill={top.sashColor || '#0F766E'}
              />
              <circle cx="180" cy="205" r="3.2" fill={top.sashColor || '#0F766E'} />
              <path
                d="M178,205 Q174,228 172,255"
                stroke={top.sashColor || '#0F766E'}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M182,205 Q186,228 188,255"
                stroke={top.sashColor || '#0F766E'}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Hai bàn tay búp măng đan đoan trang trước eo */}
            <g id="tu-than-clasped-hands">
              <path
                d="M171,210 Q178,206 186,209 Q190,214 186,220 Q178,223 171,217 Z"
                fill={skinColor}
                stroke={skinShade}
                strokeWidth="0.8"
              />
              <path d="M174,213 Q181,216 186,213" stroke={skinShade} strokeWidth="0.75" fill="none" />
              <path d="M175,216 Q181,219 185,216" stroke={skinShade} strokeWidth="0.75" fill="none" />
            </g>
          </g>
        )}

        {/* 5B. ÁO NGŨ THÂN (May đo chữ A thanh nhã & cổ lập lĩnh ôm khít) */}
        {outfit.rootId === 'ngu-than' && (
          <g id="ao-ngu-than-fitted">
            {top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? (
              <g>
                <path d="M138,134 Q130,165 138,195 Q150,218 172,216" stroke="url(#topGradient)" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M222,134 Q230,165 222,195 Q210,218 188,216" stroke="url(#topGradient)" strokeWidth="18" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              <g>
                <path d="M138,134 Q132,165 140,188 Q152,208 172,214" stroke="url(#topGradient)" strokeWidth="13" strokeLinecap="round" fill="none" />
                <path d="M222,134 Q228,165 220,188 Q208,208 188,214" stroke="url(#topGradient)" strokeWidth="13" strokeLinecap="round" fill="none" />
                <line x1="168" y1="210" x2="173" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
                <line x1="192" y1="210" x2="187" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
              </g>
            )}

            <path
              d="M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L214,185 L201,206 L216,345 L144,345 L159,206 L146,185 Z"
              fill="url(#topGradient)"
            />

            {top.patternId !== 'pat-to-sen-mong-tron' && (
              <path
                d="M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L214,185 L201,206 L216,345 L144,345 L159,206 L146,185 Z"
                fill="url(#lotusPattern)"
              />
            )}

            <path
              d="M180,124 Q193,136 197,155 L195,180 L194,206 L194,345"
              stroke="#000000"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Cổ Lập Lĩnh */}
            <rect
              x="173"
              y="108"
              width="14"
              height="16"
              rx="2"
              fill="url(#topGradient)"
              stroke="#000000"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <line x1="173" y1="116" x2="187" y2="116" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />

            {/* Bộ 5 Khuy Áo Ngũ Thân chuẩn mực */}
            <g id="ngu-than-5-buttons-fitted">
              <circle cx="180" cy="116" r="2.2" fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth="0.5" />
              <circle cx="192" cy="134" r="2.2" fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth="0.5" />
              <circle cx="197" cy="156" r="2.2" fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth="0.5" />
              <circle cx="196" cy="180" r="2.2" fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth="0.5" />
              <circle cx="194" cy="204" r="2.2" fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth="0.5" />
            </g>

            <line x1="158" y1="215" x2="146" y2="345" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />
            <line x1="202" y1="215" x2="214" y2="345" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />

            {/* Đôi bàn tay đan trước tà áo ngũ thân */}
            <g id="ngu-than-clasped-hands">
              <path
                d="M171,210 Q178,206 186,209 Q190,214 186,220 Q178,223 171,217 Z"
                fill={skinColor}
                stroke={skinShade}
                strokeWidth="0.8"
              />
              <path d="M174,213 Q181,216 186,213" stroke={skinShade} strokeWidth="0.75" fill="none" />
              <path d="M175,216 Q181,219 185,216" stroke={skinShade} strokeWidth="0.75" fill="none" />
            </g>
          </g>
        )}

        {/* 5C. ÁO BÀ BA (Chiết eo thắt đáy lưng ong & xẻ tà hông duyên dáng) */}
        {outfit.rootId === 'ba-ba' && (
          <g id="ao-ba-ba-fitted">
            <path d="M138,134 Q132,165 140,188 Q152,208 172,214" stroke="url(#topGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M222,134 Q228,165 220,188 Q208,208 188,214" stroke="url(#topGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <line x1="168" y1="210" x2="173" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
            <line x1="192" y1="210" x2="187" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />

            <path
              d="M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q200,202 214,248 Q197,254 180,250 Q163,254 146,248 Q160,202 148,180 Z"
              fill="url(#topGradient)"
            />

            {top.patternId !== 'pat-lua-gam-tron-sang' && (
              <path
                d="M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q200,202 214,248 Q197,254 180,250 Q163,254 146,248 Q160,202 148,180 Z"
                fill="url(#lotusPattern)"
              />
            )}

            <line x1="172" y1="124" x2="146" y2="152" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />
            <line x1="188" y1="124" x2="214" y2="152" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />

            {top.necklineId === 'neck-co-la-sen-retro' ? (
              <g>
                <path d="M166,124 Q173,134 180,126 Q174,120 166,124 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                <path d="M194,124 Q187,134 180,126 Q186,120 194,124 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              </g>
            ) : top.necklineId === 'neck-co-thuyen-xinh' ? (
              <path d="M164,123 Q180,132 196,123" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
            ) : (
              <path d="M170,122 Q180,130 190,122" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
            )}

            <line x1="180" y1="126" x2="180" y2="248" stroke="#000000" strokeOpacity="0.18" strokeWidth="1" />
            <circle cx="180" cy="136" r="1.8" fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth="0.5" />
            <circle cx="180" cy="158" r="1.8" fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth="0.5" />
            <circle cx="180" cy="180" r="1.8" fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth="0.5" />
            <circle cx="180" cy="202" r="1.8" fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth="0.5" />
            <circle cx="180" cy="224" r="1.8" fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth="0.5" />
            <circle cx="180" cy="242" r="1.8" fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth="0.5" />

            <rect x="156" y="218" width="16" height="18" rx="2" fill="none" stroke="#000000" strokeOpacity="0.18" strokeWidth="1" />
            <rect x="188" y="218" width="16" height="18" rx="2" fill="none" stroke="#000000" strokeOpacity="0.18" strokeWidth="1" />

            {/* Đôi bàn tay đan dịu dàng trước vạt áo bà ba */}
            <g id="ba-ba-clasped-hands">
              <path
                d="M171,210 Q178,206 186,209 Q190,214 186,220 Q178,223 171,217 Z"
                fill={skinColor}
                stroke={skinShade}
                strokeWidth="0.8"
              />
              <path d="M174,213 Q181,216 186,213" stroke={skinShade} strokeWidth="0.75" fill="none" />
              <path d="M175,216 Q181,219 185,216" stroke={skinShade} strokeWidth="0.75" fill="none" />
            </g>
          </g>
        )}

        {/* Kiềng Bạc Ta Chạm Khắc Hoa Sen Truyền Thống Đeo Cổ */}
        {hasKiengBac && (
          <g id="kieng-bac" className="transition-all duration-300">
            {/* Đổ bóng tự nhiên của kiềng bạc lên phần cổ và ngực áo */}
            <ellipse
              cx="180"
              cy="126"
              rx="16.5"
              ry="11"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.14"
              strokeWidth="5"
            />
            {/* Thân kiềng bạc ta dày dặn, đúc tròn uốn lượn ôm khít vòng cổ thanh thoát */}
            <ellipse
              cx="180"
              cy="125"
              rx="16.5"
              ry="10.8"
              fill="none"
              stroke="url(#silverKiengGrad)"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            {/* Vệt ánh kim lấp lánh (light reflection highlight) trên sống kiềng bạc */}
            <path
              d="M166,124 Q180,135 194,124"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              strokeOpacity="0.95"
            />
            {/* Vệt bóng dưới đáy vòng kim loại */}
            <path
              d="M169,127 Q180,137 191,127"
              stroke="#94A3B8"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              strokeOpacity="0.6"
            />

            {/* Mối nối cài kiềng bạc và mặt hoa sen chạm khắc tinh xảo ngay chính giữa cổ */}
            {/* Vòng khoen nhỏ treo mặt kiềng */}
            <circle cx="180" cy="134.8" r="1.3" fill="url(#silverKieng)" stroke="#94A3B8" strokeWidth="0.4" />
            
            {/* Mặt chạm khắc hoa sen bạc ta (Lotus Charm / Medal) */}
            <g id="kieng-lotus-charm">
              {/* Viên ngọc nụ sen / hạt bạc trung tâm */}
              <circle cx="180" cy="137.2" r="3.2" fill="url(#silverGleam)" stroke="#94A3B8" strokeWidth="0.6" />
              {/* Cánh sen chạm khắc viền ngoài */}
              <path
                d="M180,134.5 C178.5,135.8 177,137.5 178,139.5 C179.2,140.5 180.8,140.5 182,139.5 C183,137.5 181.5,135.8 180,134.5 Z"
                fill="none"
                stroke="#64748B"
                strokeWidth="0.6"
              />
              {/* Điểm sáng kim cương / ánh bạc lấp lánh nụ sen */}
              <circle cx="179.2" cy="136.2" r="0.7" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* Wristband */}
        {hasWristband && (
          <g id="wristband">
            <line x1="168" y1="211" x2="173" y2="216" stroke="#E11D48" strokeWidth="2.5" />
            <line x1="169" y1="213" x2="174" y2="218" stroke="#F59E0B" strokeWidth="2" />
            <line x1="170" y1="215" x2="175" y2="220" stroke="#10B981" strokeWidth="1.5" />
          </g>
        )}

        {/* ============================================================== */}
        {/* LAYER 6: HEAD & FACE SHAPE (Mặt Trái Xoan Hoặc Mặt Tròn)       */}
        {/* ============================================================== */}
        <g id="model-head-face">
          {avatar.customPhotoUrl ? (
            <g>
              <clipPath id="customFaceClip">
                <circle cx="180" cy="80" r="24" />
              </clipPath>
              <image
                href={avatar.customPhotoUrl}
                x="156"
                y="56"
                width="48"
                height="48"
                clipPath="url(#customFaceClip)"
                preserveAspectRatio="xMidYMid slice"
              />
              <circle cx="180" cy="80" r="24" fill="none" stroke="#C8B39B" strokeWidth="2" />
            </g>
          ) : (
            <g>
              {faceShape === 'round' ? (
                // MẶT TRÒN STUDIO GHIBLI (Dáng mặt tròn hồn hậu, trong trẻo như Chihiro / Kiki)
                <g id="face-round-ghibli">
                  <path
                    d="M180,56 C198,56 203,68 203,83 C203,98 194,103.5 180,103.5 C166,103.5 157,98 157,83 C157,68 162,56 180,56 Z"
                    fill={skinColor}
                  />

                  {/* Má hồng màu nước Ghibli & nét phết cọ mộc mạc */}
                  <circle cx="167" cy="87" r="6.5" fill="url(#animeBlushGrad)" />
                  <circle cx="193" cy="87" r="6.5" fill="url(#animeBlushGrad)" />
                  <line x1="164" y1="88" x2="168" y2="86" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />
                  <line x1="166" y1="90" x2="170" y2="88" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />
                  <line x1="190" y1="88" x2="194" y2="86" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />
                  <line x1="192" y1="90" x2="196" y2="88" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />

                  {/* Chân mày Ghibli nét vẽ tay hiền hòa */}
                  <path d="M165.5,70.5 Q171.5,67 177,70.5" stroke="#3A281D" strokeWidth="1.25" strokeLinecap="round" fill="none" />
                  <path d="M183,70.5 Q188.5,67 194.5,70.5" stroke="#3A281D" strokeWidth="1.25" strokeLinecap="round" fill="none" />

                  {/* Mắt trái Ghibli tròn to, hổ phách ấm, trong veo */}
                  <g id="ghibli-round-left-eye">
                    {/* Nếp mí đôi tự nhiên đặc trưng Ghibli */}
                    <path d="M168,72 Q173,70 177.5,72.5" stroke="#78553F" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                    {/* Tròng mắt màu nâu trà hổ phách ấm */}
                    <ellipse cx="172.8" cy="76.8" rx="3.3" ry="3.7" fill="url(#animeIrisGrad)" />
                    {/* Con ngươi đen sâu thẳm */}
                    <circle cx="172.8" cy="76.5" r="1.6" fill="#140D08" />
                    {/* Vầng sáng hổ phách dưới đáy mắt */}
                    <path d="M170.8,78.5 Q172.8,79.8 174.8,78.5" stroke="#C48E60" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    {/* Đốm sáng tinh khôi tròn trắng đặc trưng Ghibli */}
                    <circle cx="171.3" cy="74.5" r="1.25" fill="#FFFFFF" />
                    <circle cx="174.4" cy="78" r="0.6" fill="#FFFFFF" fillOpacity="0.85" />
                    {/* Mí trên nét mực vẽ tay mực sepia */}
                    <path d="M167,76 Q173,71.5 178.5,75.8" stroke="#261A13" strokeWidth="1.65" strokeLinecap="round" fill="none" />
                    {/* Mí dưới mềm mại */}
                    <path d="M169.5,79.5 Q173,80.5 176.5,79.5" stroke="#5A3E2D" strokeWidth="0.7" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Mắt phải Ghibli tròn to, hổ phách ấm, trong veo */}
                  <g id="ghibli-round-right-eye">
                    {/* Nếp mí đôi tự nhiên */}
                    <path d="M182.5,72.5 Q187,70 192,72" stroke="#78553F" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                    {/* Tròng mắt màu nâu trà hổ phách ấm */}
                    <ellipse cx="187.2" cy="76.8" rx="3.3" ry="3.7" fill="url(#animeIrisGrad)" />
                    {/* Con ngươi đen sâu thẳm */}
                    <circle cx="187.2" cy="76.5" r="1.6" fill="#140D08" />
                    {/* Vầng sáng hổ phách dưới đáy mắt */}
                    <path d="M185.2,78.5 Q187.2,79.8 189.2,78.5" stroke="#C48E60" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    {/* Đốm sáng tinh khôi tròn trắng */}
                    <circle cx="185.7" cy="74.5" r="1.25" fill="#FFFFFF" />
                    <circle cx="188.8" cy="78" r="0.6" fill="#FFFFFF" fillOpacity="0.85" />
                    {/* Mí trên nét mực vẽ tay mực sepia */}
                    <path d="M181.5,75.8 Q187,71.5 193,76" stroke="#261A13" strokeWidth="1.65" strokeLinecap="round" fill="none" />
                    {/* Mí dưới mềm mại */}
                    <path d="M183.5,79.5 Q187,80.5 190.5,79.5" stroke="#5A3E2D" strokeWidth="0.7" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Sống mũi Ghibli thanh tú mộc mạc */}
                  <path d="M180,78.5 L180,81.5 Q180.8,82.8 181.6,82.2" stroke="#BA7A54" strokeWidth="0.85" fill="none" />

                  {/* Nụ cười Ghibli hiền hậu, đáng yêu */}
                  <g id="ghibli-round-smile">
                    <path d="M176.5,89 Q180,92.5 183.5,89" stroke="#D93856" strokeWidth="1.65" strokeLinecap="round" fill="none" />
                    <circle cx="180" cy="90" r="0.8" fill="#FDA4AF" fillOpacity="0.7" />
                  </g>
                </g>
              ) : (
                // MẶT TRÁI XOAN STUDIO GHIBLI (Thanh tú, đoan trang, dịu dàng như Sophie / Sheeta)
                <g id="face-oval-ghibli">
                  {/* Khuôn mặt trái xoan thanh tú, đường cong mềm mại tự nhiên */}
                  <path
                    d="M180,55 C195,55 199.5,67 199.5,82 C199.5,96 190,105 180,105.5 C170,105 160.5,96 160.5,82 C160.5,67 165,55 180,55 Z"
                    fill={skinColor}
                  />

                  {/* Phấn má màu nước Ghibli phớt hồng đào */}
                  <circle cx="168" cy="85" r="6.5" fill="url(#animeBlushGrad)" />
                  <circle cx="192" cy="85" r="6.5" fill="url(#animeBlushGrad)" />
                  <line x1="165" y1="86" x2="169" y2="84" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />
                  <line x1="167" y1="88" x2="171" y2="86" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />
                  <line x1="189" y1="86" x2="193" y2="84" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />
                  <line x1="191" y1="88" x2="195" y2="86" stroke="#F43F5E" strokeWidth="0.65" strokeOpacity="0.4" strokeLinecap="round" />

                  {/* Chân mày thanh tú nét vẽ tay mềm */}
                  <path d="M166,68 Q171.5,64.5 177,68" stroke="#3A281D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M183,68 Q188.5,64.5 194,68" stroke="#3A281D" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                  {/* MẮT TRÁI GHIBLI HẠNH NHÂN TO TRÒN, ẤM ÁP & CÓ HỒN */}
                  <g id="ghibli-oval-left-eye">
                    {/* Nếp mí đôi tự nhiên */}
                    <path d="M168,71 Q173,69 178,71.5" stroke="#78553F" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                    {/* Tròng mắt màu hổ phách ấm */}
                    <ellipse cx="173" cy="76" rx="3.3" ry="3.7" fill="url(#animeIrisGrad)" />
                    {/* Con ngươi đen sâu */}
                    <circle cx="173" cy="75.8" r="1.6" fill="#140D08" />
                    {/* Vầng sáng hổ phách đáy mắt */}
                    <path d="M171,77.8 Q173,79.2 175,77.8" stroke="#C48E60" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    {/* Đốm sáng tinh khôi tròn trắng Ghibli */}
                    <circle cx="171.5" cy="73.8" r="1.3" fill="#FFFFFF" />
                    <circle cx="174.6" cy="77.3" r="0.6" fill="#FFFFFF" fillOpacity="0.85" />
                    {/* Đường mí trên vẽ tay mực sepia sắc nét mà mềm mại */}
                    <path d="M167,75.5 Q173,70.8 179,75" stroke="#261A13" strokeWidth="1.7" strokeLinecap="round" fill="none" />
                    {/* Mí dưới mềm nhẹ */}
                    <path d="M169.5,78.8 Q173,80 176.5,78.8" stroke="#5A3E2D" strokeWidth="0.7" strokeLinecap="round" fill="none" />
                  </g>

                  {/* MẮT PHẢI GHIBLI HẠNH NHÂN TO TRÒN, ẤM ÁP & CÓ HỒN */}
                  <g id="ghibli-oval-right-eye">
                    {/* Nếp mí đôi tự nhiên */}
                    <path d="M182,71.5 Q187,69 192,71" stroke="#78553F" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                    {/* Tròng mắt màu hổ phách ấm */}
                    <ellipse cx="187" cy="76" rx="3.3" ry="3.7" fill="url(#animeIrisGrad)" />
                    {/* Con ngươi đen sâu */}
                    <circle cx="187" cy="75.8" r="1.6" fill="#140D08" />
                    {/* Vầng sáng hổ phách đáy mắt */}
                    <path d="M185,77.8 Q187,79.2 189,77.8" stroke="#C48E60" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    {/* Đốm sáng tinh khôi tròn trắng Ghibli */}
                    <circle cx="185.5" cy="73.8" r="1.3" fill="#FFFFFF" />
                    <circle cx="188.6" cy="77.3" r="0.6" fill="#FFFFFF" fillOpacity="0.85" />
                    {/* Đường mí trên vẽ tay mực sepia */}
                    <path d="M181,75 Q187,70.8 193,75.5" stroke="#261A13" strokeWidth="1.7" strokeLinecap="round" fill="none" />
                    {/* Mí dưới mềm nhẹ */}
                    <path d="M183.5,78.8 Q187,80 190.5,78.8" stroke="#5A3E2D" strokeWidth="0.7" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Sống mũi thanh thoát chuẩn Ghibli */}
                  <path d="M180,78 L180,81.5 Q180.8,82.8 181.6,82" stroke="#BA7A54" strokeWidth="0.85" fill="none" />

                  {/* Bờ môi chúm chím phớt hồng đào duyên dáng */}
                  <g id="ghibli-oval-smile">
                    <path d="M176.5,88.5 Q180,91.8 183.5,88.5" stroke="#D93856" strokeWidth="1.65" strokeLinecap="round" fill="none" />
                    <circle cx="180" cy="89.5" r="0.8" fill="#FDA4AF" fillOpacity="0.7" />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* Retro Glasses */}
          {hasGlasses && (
            <g id="retro-glasses">
              <ellipse cx="171" cy="76" rx="6.5" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
              <ellipse cx="189" cy="76" rx="6.5" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="177.5" y1="76" x2="182.5" y2="76" stroke="#D4AF37" strokeWidth="1.2" />
            </g>
          )}

          {/* Pearl earrings */}
          {hasPearlEarring && (
            <g id="pearl-earrings">
              <circle cx="158.5" cy="84" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
              <circle cx="201.5" cy="84" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* LAYER 7: 6 KIỂU TÓC NGHỆ THUẬT 2D ANIME/WEBTOON TẢ CHI TIẾT    */}
        {/* ============================================================== */}
        <g id="front-hair-layer">

          {/* ------------------------------------------------------------ */}
          {/* 1. DÀI THẲNG EO                                              */}
          {/* Suôn mượt qua eo, tơi thành từng lọn mảnh nhỏ ở đuôi,        */}
          {/* mái ôm nhẹ gò má, sợi tóc con lơ thơ (wispy strands) trước   */}
          {/* trán và mai, rẽ ngôi tự nhiên ở đỉnh đầu.                    */}
          {/* ------------------------------------------------------------ */}
          {(hairstyle === 'long-straight-waist' || hairstyle === 'long-flowing') && (
            <g id="hair-model-1-long-straight">
              {/* Khối tóc đỉnh đầu & nếp rẽ ngôi tự nhiên */}
              <path
                d="M161,74 C160,52 173,46 179,46 C182,46 198,50 199,74 C193,60 185,55 181,55 L178,55 C173,55 166,60 161,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M179,46 Q180,50 179,55" stroke={hairDark} strokeWidth="1" fill="none" />
              <ellipse cx="180" cy="53" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Sợi tóc con lơ thơ (wispy strands) trước trán */}
              <path d="M178,54 Q175,65 177,74" stroke={hairDark} strokeWidth="0.85" strokeLinecap="round" fill="none" />
              <path d="M182,54 Q185,64 183,73" stroke={hairDark} strokeWidth="0.85" strokeLinecap="round" fill="none" />
              <path d="M176,57 Q173,66 175,71" stroke={hairSoft} strokeWidth="0.65" strokeLinecap="round" fill="none" />

              {/* Tóc mai hai bên dài ôm nhẹ lấy gò má */}
              {/* Mái trái */}
              <path
                d="M179,48 Q171,60 165,78 Q163,90 165,104 C166,104 167,96 168,88 Q171,68 178,55 Z"
                fill={hairMid}
              />
              <path d="M179,48 Q171,60 165,78 Q163,90 165,104" stroke={hairDark} strokeWidth="0.9" fill="none" />
              {/* Sợi tóc mai lơ thơ bay bên má trái */}
              <path d="M162,78 Q159,92 162,108" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Mái phải */}
              <path
                d="M180,48 Q189,60 195,78 Q197,90 195,104 C194,104 193,96 192,88 Q189,68 181,55 Z"
                fill={hairMid}
              />
              <path d="M180,48 Q189,60 195,78 Q197,90 195,104" stroke={hairDark} strokeWidth="0.9" fill="none" />
              {/* Sợi tóc mai lơ thơ bay bên má phải */}
              <path d="M198,78 Q201,92 198,108" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Hai dải tóc trước suôn mượt buông qua vai xuống eo */}
              {/* Dải tóc trái trước ngực */}
              <path
                d="M164,80 C159,105 152,150 150,205 C149,235 151,255 153,266 L156,260 L158,268 L160,258 C158,245 157,215 158,185 C160,150 166,108 168,85 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M164,80 C159,105 152,150 150,205 C149,235 151,255 153,266" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M153,105 Q151,165 153,225" stroke={hairSheen} strokeWidth="1.2" fill="none" />
              <line x1="156" y1="230" x2="157" y2="265" stroke={hairHalo} strokeWidth="0.8" />

              {/* Dải tóc phải trước ngực */}
              <path
                d="M196,80 C201,105 208,150 210,205 C211,235 209,255 207,266 L204,260 L202,268 L200,258 C202,245 203,215 202,185 C200,150 194,108 192,85 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M196,80 C201,105 208,150 210,205 C211,235 209,255 207,266" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M207,105 Q209,165 207,225" stroke={hairSheen} strokeWidth="1.2" fill="none" />
              <line x1="204" y1="230" x2="203" y2="265" stroke={hairHalo} strokeWidth="0.8" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 2. NGẮN NGANG VAI                                            */}
          {/* Tóc lob chạm ngang vai, cúp nhẹ ôm mặt. Mái bay chia ngôi    */}
          {/* giữa, phồng chân tóc uốn nhẹ ra sau, đuôi tỉa layer so le.  */}
          {/* ------------------------------------------------------------ */}
          {(hairstyle === 'short-bob-straight' || hairstyle === 'short-shoulder-length' || hairstyle === 'short-modern') && (
            <g id="hair-model-2-short-bob">
              {/* Đỉnh đầu bồng bềnh rẽ ngôi giữa */}
              <path
                d="M160,74 C158,50 172,45 180,45 C188,45 202,50 200,74 C194,60 186,54 180,54 C174,54 166,60 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <line x1="180" y1="45" x2="180" y2="54" stroke={hairDark} strokeWidth="1" />
              <ellipse cx="180" cy="51" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Mái bay (Curtain bangs) uốn nhẹ ra sau hai bên thái dương */}
              {/* Mái bay trái */}
              <path
                d="M180,47 Q170,55 164,72 Q160,86 166,98 C166,96 167,88 168,80 Q172,62 179,52 Z"
                fill={hairMid}
              />
              <path d="M180,47 Q170,55 164,72 Q160,86 166,98" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M162,75 Q164,88 169,96" stroke={hairSheen} strokeWidth="1" fill="none" />

              {/* Mái bay phải */}
              <path
                d="M180,47 Q190,55 196,72 Q200,86 194,98 C194,96 193,88 192,80 Q188,62 181,52 Z"
                fill={hairMid}
              />
              <path d="M180,47 Q190,55 196,72 Q200,86 194,98" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M198,75 Q196,88 191,96" stroke={hairSheen} strokeWidth="1" fill="none" />

              {/* Lọn tóc cúp nhẹ ôm cằm & xương quai xanh (layer so le ở đuôi) */}
              {/* Cúp trái */}
              <path
                d="M162,74 C156,92 148,116 150,144 C154,148 160,144 164,138 L166,144 L170,136 C168,124 164,104 166,84 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M162,74 C156,92 148,116 150,144" stroke={hairDark} strokeWidth="1" fill="none" />
              <path d="M153,92 Q150,120 158,140" stroke={hairSheen} strokeWidth="1.2" fill="none" />

              {/* Cúp phải */}
              <path
                d="M198,74 C204,92 212,116 210,144 C206,148 200,144 196,138 L194,144 L190,136 C192,124 196,104 194,84 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M198,74 C204,92 212,116 210,144" stroke={hairDark} strokeWidth="1" fill="none" />
              <path d="M207,92 Q210,120 202,140" stroke={hairSheen} strokeWidth="1.2" fill="none" />

              {/* Sợi tóc tơ lơ thơ trước trán */}
              <path d="M178,54 Q177,63 179,70" stroke={hairDark} strokeWidth="0.75" strokeLinecap="round" fill="none" />
              <path d="M182,54 Q183,63 181,70" stroke={hairDark} strokeWidth="0.75" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 3. TẾT 2 BÍM                                                 */}
          {/* Chia ngôi giữa tự nhiên ở đỉnh đầu, 2 bên tết gọn gàng lỏng  */}
          {/* tay buông dài xuống ngực, chun nhỏ, thừa đoạn thẳng tự nhiên */}
          {/* ------------------------------------------------------------ */}
          {(hairstyle === 'braided-twin-waist' || hairstyle === 'braided-twin') && (
            <g id="hair-model-3-twin-braids">
              {/* Đỉnh đầu chia ngôi giữa tự nhiên */}
              <path
                d="M161,74 C160,50 172,46 179,46 C182,46 198,50 199,74 C193,60 185,55 181,55 L178,55 C173,55 166,60 161,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <line x1="179.5" y1="46" x2="180" y2="55" stroke={hairDark} strokeWidth="1" />
              <ellipse cx="180" cy="52" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Tóc mai nhẹ nhàng ôm hai bên má */}
              <path d="M179,50 Q168,60 162,78 Q158,94 161,110" stroke={hairDark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M181,50 Q192,60 198,78 Q202,94 199,110" stroke={hairDark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M160,82 Q157,96 160,114" stroke={hairSheen} strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <path d="M200,82 Q203,96 200,114" stroke={hairSheen} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Bím tết trái: Lỏng tay vừa phải, có độ phồng buông xuống ngực */}
              <g id="left-braid-clumps">
                <path d="M162,80 Q150,96 153,114 Q146,128 152,142 Q147,156 151,170 Q146,184 150,198 Q146,212 149,226 Q146,238 148,248" stroke={hairDark} strokeWidth="1" fill="none" />
                {/* Các mắt bím lồng đan 3D mềm mại */}
                <ellipse cx="154" cy="98" rx="6" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="152" cy="112" rx="6.5" ry="7.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="153" cy="127" rx="6.2" ry="7.5" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="151" cy="142" rx="5.8" ry="7.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="152" cy="157" rx="5.5" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="150" cy="172" rx="5.2" ry="6.8" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="151" cy="187" rx="4.8" ry="6.5" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="149" cy="202" rx="4.5" ry="6.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="150" cy="216" rx="4.2" ry="6" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="148" cy="230" rx="3.8" ry="5.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="149" cy="242" rx="3.4" ry="5" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                {/* Chun buộc nhỏ */}
                <rect x="146" y="246" width="6" height="3" rx="1.5" fill="#D4AF37" stroke="#78350F" strokeWidth="0.6" />
                {/* Đoạn tóc thẳng tự nhiên nhỏ ở đuôi */}
                <path d="M148,249 L146,263 L149,261 L151,264 L150,249 Z" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.7" />
                <line x1="148" y1="250" x2="148" y2="262" stroke={hairSheen} strokeWidth="0.8" />
              </g>

              {/* Bím tết phải: Lỏng tay vừa phải, có độ phồng buông xuống ngực */}
              <g id="right-braid-clumps">
                <path d="M198,80 Q210,96 207,114 Q214,128 208,142 Q213,156 209,170 Q214,184 210,198 Q214,212 211,226 Q214,238 212,248" stroke={hairDark} strokeWidth="1" fill="none" />
                {/* Các mắt bím lồng đan 3D mềm mại */}
                <ellipse cx="206" cy="98" rx="6" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="208" cy="112" rx="6.5" ry="7.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="207" cy="127" rx="6.2" ry="7.5" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="209" cy="142" rx="5.8" ry="7.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="208" cy="157" rx="5.5" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="210" cy="172" rx="5.2" ry="6.8" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="209" cy="187" rx="4.8" ry="6.5" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="211" cy="202" rx="4.5" ry="6.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="210" cy="216" rx="4.2" ry="6" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="212" cy="230" rx="3.8" ry="5.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.8" />
                <ellipse cx="211" cy="242" rx="3.4" ry="5" fill={hairMid} stroke={hairDark} strokeWidth="0.8" />
                {/* Chun buộc nhỏ */}
                <rect x="208" y="246" width="6" height="3" rx="1.5" fill="#D4AF37" stroke="#78350F" strokeWidth="0.6" />
                {/* Đoạn tóc thẳng tự nhiên nhỏ ở đuôi */}
                <path d="M211,249 L209,263 L212,261 L214,264 L213,249 Z" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.7" />
                <line x1="211" y1="250" x2="211" y2="262" stroke={hairSheen} strokeWidth="0.8" />
              </g>
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 4. TẾT 1 BÍM VAI PHẢI                                        */}
          {/* Mái xéo/mái thưa nhẹ nhàng che một phần trán, ôm gọn má      */}
          {/* trái. Bím tết dày, phồng nhẹ buông lơi lệch sang vai phải.   */}
          {/* ------------------------------------------------------------ */}
          {hairstyle === 'braided-single-side' && (
            <g id="hair-model-4-single-side-braid">
              {/* Đỉnh đầu gạt tóc mềm sang phải */}
              <path
                d="M161,74 C160,50 174,45 182,45 C190,45 202,50 200,74 C193,58 185,53 178,54 C172,55 166,62 161,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="182" cy="52" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Mái thưa búp bê nhẹ nhàng trước trán */}
              <path d="M174,54 L174,68" stroke={hairDark} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M178,54 L178,70" stroke={hairDark} strokeWidth="1.6" strokeLinecap="round" />
              <path d="M182,53 L182,71" stroke={hairDark} strokeWidth="1.6" strokeLinecap="round" />
              <path d="M186,54 L186,69" stroke={hairDark} strokeWidth="1.5" strokeLinecap="round" />

              {/* Mái xéo ôm gọn gò má bên trái */}
              <path
                d="M170,52 Q164,66 163,85 Q162,100 166,112 C167,112 168,102 167,92 Q167,72 174,58 Z"
                fill={hairMid}
              />
              <path d="M170,52 Q164,66 163,85 Q162,100 166,112" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M161,84 Q159,98 162,115" stroke={hairSheen} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Tóc gạt cuộn mềm mại từ đỉnh đầu qua vai phải */}
              <path
                d="M182,46 Q198,58 208,76 Q215,92 216,110 C214,106 208,88 198,72 Q188,60 182,46 Z"
                fill={hairMid}
              />
              <path d="M182,46 Q198,58 208,76 Q215,92 216,110" stroke={hairDark} strokeWidth="1" fill="none" />

              {/* Bím tết dày, phồng nhẹ tự nhiên buông lơi lệch vai phải */}
              <g id="thick-right-side-braid">
                <ellipse cx="214" cy="114" rx="7.5" ry="8.5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="216" cy="128" rx="8" ry="9" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="215" cy="144" rx="7.8" ry="8.8" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="217" cy="160" rx="7.5" ry="8.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="216" cy="177" rx="7.2" ry="8.2" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="218" cy="194" rx="6.8" ry="8" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="217" cy="211" rx="6.4" ry="7.6" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="218" cy="227" rx="5.8" ry="7.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="217" cy="242" rx="5.2" ry="6.6" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="218" cy="254" rx="4.5" ry="6" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />

                {/* Sợi tóc nhỏ hơi buông lơi ở rìa bím (flyaway wisps) */}
                <path d="M222,126 Q227,136 223,148" stroke={hairDark} strokeWidth="0.8" fill="none" />
                <path d="M208,142 Q205,152 208,162" stroke={hairDark} strokeWidth="0.8" fill="none" />
                <path d="M223,174 Q228,184 224,196" stroke={hairDark} strokeWidth="0.8" fill="none" />

                {/* Chun cột nhỏ xinh */}
                <rect x="215" y="258" width="6.5" height="3.2" rx="1.6" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="0.6" />
                {/* Phần đuôi bím để xõa tự nhiên */}
                <path d="M218,261 L215,274 L218,272 L221,275 L220,261 Z" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.7" />
                <line x1="218" y1="262" x2="218" y2="274" stroke={hairHalo} strokeWidth="0.8" />
              </g>
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 5. BÚI LỆCH PHẢI                                             */}
          {/* Búi lớn tròn có độ phồng và nếp uốn mềm mại (búi lỏng trễ    */}
          {/* tự nhiên) lệch nhẹ sang phải. Mai và gáy có lọn xoăn nhẹ lơi */}
          {/* ------------------------------------------------------------ */}
          {hairstyle === 'side-bun-right' && (
            <g id="hair-model-5-side-bun-right">
              {/* Đỉnh đầu bồng bềnh gom chéo nhẹ sang phải */}
              <path
                d="M161,74 C160,48 174,44 182,44 C192,44 202,48 200,74 C194,58 186,52 178,54 C172,55 166,62 161,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="182" cy="51" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Mái bay mềm mại rẽ lệch sang hai bên */}
              <path
                d="M176,52 Q168,64 164,82 Q162,96 166,108 C167,108 168,98 167,88 Q169,70 178,56 Z"
                fill={hairMid}
              />
              <path d="M176,52 Q168,64 164,82 Q162,96 166,108" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M161,86 Q158,102 162,118" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Lọn tóc mái phải lượn mềm vào khối búi */}
              <path
                d="M182,50 Q194,62 206,78 Q214,90 216,98"
                stroke={hairDark}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M182,50 Q194,62 206,78" stroke={hairSheen} strokeWidth="1.2" fill="none" />

              {/* Mặt trước của khối búi to tròn lỏng trễ */}
              <g id="side-bun-front-accent">
                {/* Các cánh hoa tóc xếp nếp xoắn ốc phồng tự nhiên */}
                <path d="M208,86 Q220,80 228,88 Q234,100 226,108 Q214,112 208,102 Z" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <path d="M212,90 Q222,86 226,94 Q228,104 218,106" stroke={hairSheen} strokeWidth="1.8" fill="none" />
                <path d="M214,94 Q220,90 224,96" stroke={hairHalo} strokeWidth="1.2" fill="none" />
                {/* Trâm cài ngọc / kẹp hoa nhỏ xinh xắn */}
                <circle cx="217" cy="95" r="3.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
                <circle cx="217" cy="95" r="1.4" fill="#F43F5E" />
              </g>

              {/* Lọn tóc mai & gáy uốn xoăn nhẹ lơi buông lơi trước vai phải */}
              <path
                d="M214,106 Q222,130 216,155 Q212,180 218,205 Q220,218 215,225"
                stroke={hairDark}
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M215,110 Q222,132 217,157 Q213,182 218,207"
                stroke={hairSheen}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sợi tóc tơ bay lơ thơ ở cằm trái */}
              <path d="M165,95 Q168,110 166,124" stroke={hairSoft} strokeWidth="0.75" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 6. NỬA ĐẦU TIỂU THƯ                                          */}
          {/* Tóc dài uốn sóng lượn bồng bềnh. Đỉnh đầu kẹp/cột nửa đầu    */}
          {/* phồng nhẹ, băng đô nhỏ tối màu tự nhiên, lọn mái bay dài     */}
          {/* ------------------------------------------------------------ */}
          {hairstyle === 'half-up-princess' && (
            <g id="hair-model-6-half-up">
              {/* Khối tóc buộc nửa đầu phồng nhẹ ở đỉnh (pouf volume) */}
              <ellipse cx="180" cy="47" rx="18" ry="11" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.8" />
              <path d="M170,45 Q180,39 190,45" stroke={hairSheen} strokeWidth="1.4" fill="none" />
              <path d="M173,48 Q180,43 187,48" stroke={hairHalo} strokeWidth="1" fill="none" />

              {/* Chiếc băng đô (headband) nhỏ tối màu tự nhiên thanh lịch */}
              <path
                d="M162,56 Q180,46 198,56"
                stroke="#2D241E"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Đường chỉ thêu vàng nhạt tinh tế trên băng đô */}
              <path
                d="M163,56 Q180,47 197,56"
                stroke="#C5A059"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />

              {/* Kẹp nơ / kẹp tăm nhỏ phía sau mối buộc nửa đầu */}
              <rect x="176" y="52" width="8" height="3" rx="1.5" fill="#1C1917" stroke="#9B2C2C" strokeWidth="0.8" />

              {/* Lọn mái bay dài uốn nhẹ ôm hai bên gò má */}
              {/* Mái bay trái */}
              <path
                d="M172,56 Q165,66 163,82 Q162,98 167,112 C168,112 169,102 168,90 Q168,72 176,60 Z"
                fill={hairMid}
              />
              <path d="M172,56 Q165,66 163,82 Q162,98 167,112" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M161,84 Q159,100 163,116" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <path d="M164,80 Q163,94 167,108" stroke={hairSheen} strokeWidth="1.1" fill="none" />

              {/* Mái bay phải */}
              <path
                d="M188,56 Q195,66 197,82 Q198,98 193,112 C192,112 191,102 192,90 Q192,72 184,60 Z"
                fill={hairMid}
              />
              <path d="M188,56 Q195,66 197,82 Q198,98 193,112" stroke={hairDark} strokeWidth="0.9" fill="none" />
              <path d="M199,84 Q201,100 197,116" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <path d="M196,80 Q197,94 193,108" stroke={hairSheen} strokeWidth="1.1" fill="none" />

              {/* Sóng tóc uốn lượn tự nhiên buông lơi trước hai bên vai */}
              {/* Lọn sóng trái */}
              <path
                d="M162,85 Q154,120 160,155 Q152,190 158,225 Q154,248 156,260"
                stroke={hairDark}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M162,85 Q154,120 160,155 Q152,190 158,225"
                stroke={hairSheen}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Lọn sóng phải */}
              <path
                d="M198,85 Q206,120 200,155 Q208,190 202,225 Q206,248 204,260"
                stroke={hairDark}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M198,85 Q206,120 200,155 Q208,190 202,225"
                stroke={hairSheen}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Các kiểu tóc phụ khác */}
          {hairstyle === 'wavy-headband' && (
            <g id="hair-model-wavy-headband">
              <path d="M160,65 Q180,48 200,65" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M162,78 Q152,110 158,140 Q152,170 156,200 Q152,225 154,245" stroke={hairDark} strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M198,78 Q208,110 202,140 Q208,170 204,200 Q208,225 206,245" stroke={hairDark} strokeWidth="8" strokeLinecap="round" fill="none" />
            </g>
          )}

          {hairstyle === 'side-ponytail-wavy' && (
            <g id="hair-model-side-ponytail">
              <path d="M161,76 C160,50 180,46 180,46 C180,46 200,50 199,76 C194,62 186,56 180,56 C174,56 166,62 161,76 Z" fill={hairMid} />
              <path d="M180,54 Q170,68 165,88 Q163,100 168,110" stroke={hairDark} strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <ellipse cx="218" cy="115" rx="12" ry="14" fill={hairMid} />
              <path d="M218,124 Q230,145 226,170 Q222,190 228,215 Q224,228 218,225" stroke={hairDark} strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>
          )}

          {hairstyle === 'short-curly-bows' && (
            <g id="hair-model-curly-bows">
              <path d="M161,76 C160,52 180,48 180,48 C180,48 200,52 199,76 C194,60 186,56 180,56 C174,56 166,60 161,76 Z" fill={hairMid} />
              <path d="M163,76 Q150,105 148,135 Q152,142 160,138" stroke={hairDark} strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d="M197,76 Q210,105 212,135 Q208,142 200,138" stroke={hairDark} strokeWidth="9" strokeLinecap="round" fill="none" />
              <rect x="148" y="95" width="6" height="4" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              <rect x="206" y="95" width="6" height="4" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
            </g>
          )}

          {(hairstyle === 'high-artistic-bun' || hairstyle === 'traditional-bun') && (
            <g id="hair-model-artistic-bun">
              <path d="M162,78 C160,56 180,50 180,50 C180,50 200,56 198,78 C194,62 186,58 180,58 C174,58 166,62 162,78 Z" fill={hairMid} />
              <path d="M164,78 Q160,95 163,112 Q166,122 162,130" stroke={hairDark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M196,78 Q200,95 197,112 Q194,122 198,130" stroke={hairDark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* LAYER 8: HEAD & HAIR ACCESSORIES                               */}
        {/* ============================================================== */}
        <g id="model-head-accessories">
          {hairAcc === 'hair-non-quai-thao' && (
            <g>
              <ellipse cx="180" cy="40" rx="46" ry="14" fill="#D97706" stroke="#92400E" strokeWidth="2" />
              <ellipse cx="180" cy="40" rx="42" ry="12" fill="#FDE68A" />
              <path d="M142,46 Q130,120 128,210" stroke="#F43F5E" strokeWidth="3" fill="none" />
              <path d="M218,46 Q230,120 232,210" stroke="#F43F5E" strokeWidth="3" fill="none" />
            </g>
          )}

          {hairAcc === 'hair-man-khuon-nhung' && (
            <g>
              <path
                d="M158,66 Q180,48 202,66 Q180,42 158,66 Z"
                fill="#7E22CE"
                stroke="#581C87"
                strokeWidth="2"
              />
              <circle cx="180" cy="53" r="3" fill="#D4AF37" />
            </g>
          )}

          {hairAcc === 'hair-khan-ran-nam-bo' && (
            <g>
              <path
                d="M152,126 Q146,160 142,220"
                stroke="#18181B"
                strokeWidth="7"
                strokeDasharray="4 3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {hairAcc === 'hair-non-la-bai-tho' && (
            <g>
              <polygon points="180,24 136,56 224,56" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
              <line x1="180" y1="24" x2="180" y2="56" stroke="#F59E0B" strokeWidth="0.8" />
              <path d="M148,56 Q180,95 212,56" stroke="#EC4899" strokeWidth="2.5" fill="none" />
            </g>
          )}

          {hairAcc === 'hair-tram-cai-toc-bac' && (
            <g>
              <line x1="168" y1="46" x2="198" y2="38" stroke="#CBD5E1" strokeWidth="2.5" />
              <circle cx="166" cy="47" r="4.5" fill="#F43F5E" />
              <circle cx="166" cy="47" r="2" fill="#FEF08A" />
            </g>
          )}

          {hairAcc === 'hair-bang-do-lua-sen' && (
            <path d="M162,64 Q180,50 198,64" stroke="#DB2777" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          )}

          {hairAcc === 'hair-hoa-sen-cai-tai' && (
            <g>
              <circle cx="199" cy="80" r="4.5" fill="#F43F5E" />
              <circle cx="200" cy="80" r="2" fill="#FEF08A" />
            </g>
          )}
        </g>
        </g> {/* End mannequin-scalable-figure */}
      </svg>

      {/* Bottom Bar: 6 Thẻ Card Bo Tròn (Thumbnail Cards) Hiển Thị Ma-nơ-canh Đầu Mini */}
      <div className="w-full z-20 px-3 pb-3 space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#4A3B32] flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#9B2C2C]" />
            Chọn Kiểu Tóc Anime / Manhwa
          </span>
          <span className="text-[10px] text-[#8C7A6B]">
            6 mẫu ma-nơ-canh mini
          </span>
        </div>

        {/* 6 Thumbnail Cards Row */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 bg-white/90 backdrop-blur-md rounded-2xl border border-[#D8C7B0] shadow-xs scrollbar-none">
          {[
            { id: 'long-straight-waist' as Hairstyle, name: '1. Dài thẳng', sub: 'Suôn tơi lọn' },
            { id: 'short-bob-straight' as Hairstyle, name: '2. Ngắn vai', sub: 'Lob mái bay' },
            { id: 'braided-twin-waist' as Hairstyle, name: '3. Tết 2 bím', sub: 'Lỏng tự nhiên' },
            { id: 'braided-single-side' as Hairstyle, name: '4. Bím vai phải', sub: 'Phồng buông lơi' },
            { id: 'side-bun-right' as Hairstyle, name: '5. Búi lệch phải', sub: 'Mai xoăn lơi' },
            { id: 'half-up-princess' as Hairstyle, name: '6. Nửa đầu', sub: 'Sóng tiểu thư' },
          ].map((item) => (
            <HairThumbnailCard
              key={item.id}
              id={item.id}
              name={item.name}
              sub={item.sub}
              isSelected={hairstyle === item.id}
              onSelect={() => handleHairstyleChange(item.id)}
            />
          ))}
        </div>

        {/* Outfit Swatch Indicator */}
        <div className="flex items-center justify-between text-xs text-[#6B5A4B] bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#D8C7B0]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#4A3B32]">Áo:</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs"
              style={{ backgroundColor: top.primaryColor }}
              title={`Màu áo: ${top.primaryColor}`}
            />
            <span className="text-[11px] font-medium text-[#4A3B32] ml-1.5">Quần:</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs"
              style={{ backgroundColor: bottom.color }}
              title={`Màu quần: ${bottom.color}`}
            />
          </div>

          <div className="flex items-center gap-2 text-[10px] font-medium text-[#7A3E2D]">
            <span>Mặt: <strong className="text-[#9B2C2C]">{faceShape === 'oval' ? 'Trái xoan' : 'Mặt tròn'}</strong></span>
            <span className="text-[#D8C7B0]">|</span>
            <span className="flex items-center gap-1 text-amber-800">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              <span>Ghibli: <strong className="text-amber-900">{
                ghibliFilter === 'ghibli-warm' ? 'Pastel Ấm' :
                ghibliFilter === 'ghibli-sunlit' ? 'Nắng Chiều' :
                ghibliFilter === 'ghibli-watercolor' ? 'Màu Nước' : 'Nguyên Bản'
              }</strong></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarMannequin;
