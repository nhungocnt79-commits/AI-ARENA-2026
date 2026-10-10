import React, { useState } from 'react';
import { CostumeOutfitState, Hairstyle, FaceShape, Gender } from '../types/costume';
import { COSTUME_ROOTS } from '../data/costumeData';
import { Smile, Sparkles, Ruler, RotateCcw, Palette, Sliders, SunMedium, User, Layers, Eye, EyeOff } from 'lucide-react';
import { HairThumbnailCard } from './HairThumbnailCard';

interface AvatarMannequinProps {
  outfit: CostumeOutfitState;
  showDetailsOverlay?: boolean;
  onEditAvatar?: () => void;
  onQuickUpdateAvatar?: (updated: Partial<CostumeOutfitState['avatar']>) => void;
  heightClass?: string;
  forceExplodedLayers?: boolean;
  isThumbnail?: boolean;
}

export const AvatarMannequin: React.FC<AvatarMannequinProps> = ({
  outfit,
  showDetailsOverlay = true,
  onEditAvatar,
  onQuickUpdateAvatar,
  heightClass = 'h-[520px]',
  forceExplodedLayers = false,
  isThumbnail = false,
}) => {
  const root = COSTUME_ROOTS[outfit.rootId];
  const { top, bottom, accessories, avatar } = outfit;

  // Gender: 'female' (mặc định) hoặc 'male' (nhân vật nam)
  const gender: Gender = avatar.gender || 'female';
  const isMale = gender === 'male';

  // Face shape: oval (trái xoan) or round (mặt tròn)
  const faceShape = avatar.faceShape || 'oval';

  // Skin Tone: Nữ tông sáng/hồng đào pastel, Nam tông da ấm/ngăm nhẹ tự nhiên (warm sand / sun-kissed)
  const skinColor = isMale
    ? (avatar.skinTone === 'fair' ? '#F7E7D7' : avatar.skinTone === 'natural' ? '#EED7C1' : '#DFBEA1')
    : (avatar.skinTone === 'fair' ? '#FFF6EE' : avatar.skinTone === 'natural' ? '#FDF0E6' : '#F6DFCE');
  const skinShade = isMale
    ? (avatar.skinTone === 'fair' ? '#DEC0A7' : avatar.skinTone === 'natural' ? '#CFAB8D' : '#BF9473')
    : (avatar.skinTone === 'fair' ? '#F7C6B6' : avatar.skinTone === 'natural' ? '#ECA98D' : '#D88A60');

  // User customized physique: Height (140 - 200 cm) and Weight (40 - 100 kg)
  // Chuẩn nhân trắc học: Nam 7.5 - 8 đầu (178cm, 68kg), Nữ (160cm, 52kg)
  const defaultStandardHeight = isMale ? 178 : 160;
  const defaultStandardWeight = isMale ? 68 : 52;

  const height = avatar.height ?? defaultStandardHeight;
  const weight = avatar.weight ?? defaultStandardWeight;
  const [showPhysiqueControls, setShowPhysiqueControls] = useState(false);
  const [showLayerExplodedView, setShowLayerExplodedView] = useState(forceExplodedLayers);
  // Cầm quạt xếp truyền thống tua rua đỏ tương đương hình mẫu trong poster
  const [isHoldingFan, setIsHoldingFan] = useState(false);

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
  // Base standard reference: Female 160cm/52kg, Male 178cm/68kg (tỉ lệ 7.5 - 8 đầu)
  // Biến thiên hình thể rõ rệt: chiều cao từ 140cm đến 200cm, cân nặng từ 40kg đến 100kg
  const baseRefHeight = isMale ? 178 : 160;
  const baseRefWeight = isMale ? 68 : 52;
  const heightRatio = (height - baseRefHeight) / (height >= baseRefHeight ? 40 : 20);
  const weightRatio = (weight - baseRefWeight) / (weight >= baseRefWeight ? 48 : 12);
  // Nam có tỷ lệ cao ráo, vai ngang vững chãi (scale nhẹ theo nhân trắc học 7.8 đầu)
  const scaleY = (1 + heightRatio * 0.16) * (isMale ? 1.05 : 1.0);
  const scaleX = (1 + weightRatio * 0.22) * (isMale ? 1.05 : 1.0);

  // Center is x=180, vertical anchor is feet/ground at y=435
  const mannequinTransform = `translate(180, 435) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)}) translate(-180, -435)`;

  // Công thức BMI: cân nặng (kg) chia cho chiều cao bình phương (m^2)
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

  // Dynamic Hair Color Palette & Clean Line-Art Tones
  const hairColorHex = avatar.hairColor || '#1A1A1A';
  const colorTone = 
    hairColorHex === '#2E2E32' ? { dark: '#18181B', mid: '#2E2E32', soft: '#3F3F46', light: '#52525B', sheen: '#71717A', halo: '#A1A1AA' } :
    hairColorHex === '#4A3728' ? { dark: '#24160E', mid: '#4A3728', soft: '#5E4532', light: '#785A41', sheen: '#967253', halo: '#C4A482' } :
    hairColorHex === '#5C4033' ? { dark: '#2B1A13', mid: '#5C4033', soft: '#714F3F', light: '#8B624E', sheen: '#A97A63', halo: '#D2A68D' } :
    { dark: '#141210', mid: '#1E1A17', soft: '#2D2723', light: '#443D37', sheen: '#5E544C', halo: '#9E9287' };

  const hairDark = colorTone.dark;
  const hairMid = colorTone.mid;
  const hairSoft = colorTone.soft;
  const hairSheen = colorTone.sheen;
  const hairHalo = colorTone.halo;

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

  // Dáng tay búp măng đoan trang & Cầm quạt xếp truyền thống tua rua đỏ (tương đương ảnh poster mẫu)
  const renderHandsAndFan = () => {
    if (isHoldingFan) {
      return (
        <g id="traditional-fan-and-hands" className="transition-all duration-300">
          {/* Quạt xếp gỗ và tua rua đỏ truyền thống cầm chéo trước eo/ngực */}
          <g id="wooden-folding-fan-cluster" transform="translate(180, 212) rotate(-28)">
            {/* Thân nan quạt gỗ xếp (Folding fan ribs) */}
            <rect x="-10" y="-38" width="20" height="74" rx="3.5" fill="url(#fanRibGrad)" stroke="#B89772" strokeWidth="1.2" />
            <line x1="-5" y1="-32" x2="-5" y2="30" stroke="#D4AF37" strokeWidth="0.8" />
            <line x1="0" y1="-34" x2="0" y2="32" stroke="#B89772" strokeWidth="1" />
            <line x1="5" y1="-32" x2="5" y2="30" stroke="#D4AF37" strokeWidth="0.8" />
            
            {/* Viền vàng nẹp quạt */}
            <path d="M-10,-35 Q0,-38 10,-35" stroke="#F59E0B" strokeWidth="1.5" fill="none" />

            {/* Chốt tán quạt đồng thau */}
            <circle cx="0" cy="33" r="3.2" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
            <circle cx="0" cy="33" r="1.4" fill="#FEF08A" />

            {/* Khuyên treo tua rua */}
            <ellipse cx="0" cy="37.5" rx="2.5" ry="2" fill="none" stroke="#D97706" strokeWidth="1" />

            {/* Nút thắt cát tường & hạt ngọc bích phong thủy */}
            <circle cx="0" cy="41" r="2.2" fill="#10B981" stroke="#065F46" strokeWidth="0.6" />
            <rect x="-3" y="44" width="6" height="3" rx="1" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />

            {/* Dải tua rua đỏ thướt tha buông rủ dài */}
            <path
              d="M-3.5,47 Q-5,68 -4,92 L4,92 Q5,68 3.5,47 Z"
              fill="url(#tasselSilkGrad)"
              stroke="#7F1D1D"
              strokeWidth="0.6"
            />
            <line x1="-2" y1="50" x2="-2.5" y2="90" stroke="#EF4444" strokeWidth="0.6" />
            <line x1="0" y1="50" x2="0" y2="91" stroke="#F87171" strokeWidth="0.7" />
            <line x1="2" y1="50" x2="2.5" y2="90" stroke="#EF4444" strokeWidth="0.6" />
          </g>

          {/* Hai bàn tay búp măng cầm quạt duyên dáng */}
          {/* Tay trái đỡ cạnh dưới quạt */}
          <path
            d="M166,212 Q173,207 179,211 Q182,216 177,222 Q170,224 165,218 Z"
            fill={skinColor}
            stroke={skinShade}
            strokeWidth="0.8"
          />
          <path d="M170,214 Q176,217 180,214" stroke={skinShade} strokeWidth="0.75" fill="none" />
          <path d="M171,217 Q177,220 180,217" stroke={skinShade} strokeWidth="0.75" fill="none" />

          {/* Tay phải ôm chốt quạt */}
          <path
            d="M178,210 Q186,206 193,211 Q196,218 191,223 Q184,225 178,218 Z"
            fill={skinColor}
            stroke={skinShade}
            strokeWidth="0.8"
          />
          <path d="M182,213 Q188,217 192,214" stroke={skinShade} strokeWidth="0.75" fill="none" />
          <path d="M183,216 Q189,220 192,217" stroke={skinShade} strokeWidth="0.75" fill="none" />
          <path d="M179,211 Q184,213 186,210" stroke={skinShade} strokeWidth="0.75" fill="none" />
        </g>
      );
    }

    // Khi mặc áo ngũ thân tay thụng, phần ống tay thụng đã may lồng chéo vào nhau ngang bụng (khoanh tay).
    // Nếu không cầm quạt, bàn tay ẩn trang nhã bên trong ống tay áo thụng đúng chuẩn phong tục xưa.
    if (outfit.rootId === 'ngu-than' && top.silhouetteId === 'ngu-than-tay-thung-trang-trong') {
      return null;
    }

    if (isMale) {
      return (
        <g id="male-hands-firm" className="transition-all duration-300">
          {/* Bàn tay nam: Khỏe khoắn, gân guốc, một tay nắm nhẹ đai áo/đặt hông đĩnh đạc */}
          {/* Tay trái giữ nhẹ mép đai áo */}
          <path
            d="M152,212 Q160,208 168,210 Q170,218 162,224 Q154,222 152,212 Z"
            fill={skinColor}
            stroke={skinShade}
            strokeWidth="1.1"
          />
          <path d="M156,214 L164,216" stroke={skinShade} strokeWidth="1" fill="none" />
          <path d="M156,218 L163,220" stroke={skinShade} strokeWidth="0.9" fill="none" />

          {/* Tay phải buông thẳng hoặc nắm nhẹ tự nhiên bên hông */}
          <path
            d="M208,212 Q200,208 192,210 Q190,218 198,224 Q206,222 208,212 Z"
            fill={skinColor}
            stroke={skinShade}
            strokeWidth="1.1"
          />
          <path d="M204,214 L196,216" stroke={skinShade} strokeWidth="1" fill="none" />
          <path d="M204,218 L197,220" stroke={skinShade} strokeWidth="0.9" fill="none" />
        </g>
      );
    }

    return (
      <g id="clasped-hands-graceful" className="transition-all duration-300">
        {/* Đôi bàn tay búp măng đan đoan trang trước eo */}
        <path
          d="M169,209 Q177,204 185,208 Q190,214 186,221 Q177,225 169,218 Z"
          fill={skinColor}
          stroke={skinShade}
          strokeWidth="0.85"
        />
        {/* Các ngón tay thon thả đan xếp lớp thanh tao */}
        <path d="M173,212 Q180,215 186,212" stroke={skinShade} strokeWidth="0.8" fill="none" />
        <path d="M174,215 Q181,218 186,215" stroke={skinShade} strokeWidth="0.8" fill="none" />
        <path d="M173,218 Q180,221 185,218" stroke={skinShade} strokeWidth="0.75" fill="none" />
        <path d="M172,221 Q178,223 183,221" stroke={skinShade} strokeWidth="0.7" fill="none" />
        <path d="M171,208 Q176,210 180,207" stroke={skinShade} strokeWidth="0.8" fill="none" />
        {/* Ánh bóng móng tay nhẹ */}
        <circle cx="185" cy="212" r="0.45" fill="#FFFFFF" fillOpacity="0.75" />
        <circle cx="185" cy="215" r="0.45" fill="#FFFFFF" fillOpacity="0.75" />
      </g>
    );
  };

  const effectiveShowDetails = !isThumbnail && showDetailsOverlay;

  return (
    <div className={`relative w-full ${heightClass} flex flex-col items-center justify-between overflow-hidden select-none transition-all duration-300 ${
      isThumbnail 
        ? '!rounded-none !border-0 !shadow-none !bg-transparent p-0 justify-center'
        : 'rounded-3xl bg-gradient-to-b from-[#FDF8F2] via-[#F6EDE1] to-[#EBE0D0] border border-[#D8C7B0]/90 shadow-inner'
    }`}>
      {/* Subtle Ghibli sky & clouds / cultural architectural backdrop */}
      {!isThumbnail && (
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
      )}

      {/* Top Floating Info Bar */}
      {effectiveShowDetails && (
        <div className="w-full z-20 px-3.5 pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 rounded-xl border border-[#D8C7B0] shadow-2xs text-[11px] flex items-center gap-1.5">
              <span className="font-serif font-bold text-[#2C241E]">{root.name}</span>
              <span className="text-[#8C7A6B]">·</span>
              <span className="text-[#8C7A6B]">{root.regionalTag}</span>
            </div>

            {/* Quick Controls: Tách Lớp + Vóc Dáng (Chiều cao & Cân nặng) + Dáng Mặt */}
            <div className="bg-white/95 backdrop-blur-md px-1.5 py-1 rounded-xl border border-[#D8C7B0] shadow-2xs flex items-center gap-1">
              {/* Nút Bóc Tách Từng Lớp / Ẩn Lớp Hiển Thị theo yêu cầu */}
              <button
                type="button"
                onClick={() => setShowLayerExplodedView(!showLayerExplodedView)}
                title={showLayerExplodedView ? "Bấm để ẩn lớp hiển thị và khép trang phục lại đúng vị trí" : "Bóc tách từng lớp trang phục (Áo yếm lót trong, áo khoác ngoài, dải bao, quần lụa) hiển thị phía bên tay trái"}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  showLayerExplodedView
                    ? 'bg-[#8B1E1E] text-white shadow-2xs ring-1 ring-[#8B1E1E]'
                    : 'text-[#4A3525] bg-[#FAF7F2] hover:bg-white border border-[#D8C7B0]'
                }`}
              >
                <Layers className="w-3 h-3 text-current" />
                <span>{showLayerExplodedView ? 'Ẩn lớp hiển thị' : 'Tách lớp hiển thị'}</span>
              </button>

              {/* Nút bật thanh trượt vóc dáng */}
              <button
                type="button"
                onClick={() => setShowPhysiqueControls(!showPhysiqueControls)}
                title="Tùy chỉnh chiều cao (140-200cm) và cân nặng (40-100kg)"
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  showPhysiqueControls || height !== 160 || weight !== 52
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
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
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
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
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                ◯ Mặt Tròn
              </button>

              {/* Nút Cầm Quạt Xếp Truyền Thống Tua Rua Đỏ (tương đương ảnh poster mẫu) */}
              <button
                type="button"
                onClick={() => setIsHoldingFan(!isHoldingFan)}
                title="Cầm quạt xếp truyền thống tua rua đỏ (tương đương hình mẫu trong tranh poster)"
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  isHoldingFan
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>🪭 {isHoldingFan ? 'Cầm quạt' : 'Quạt xếp'}</span>
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
                  className="ml-0.5 p-1 text-[#6B5A4B] hover:text-[#8B1E1E] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
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
                  <Ruler className="w-3.5 h-3.5 text-[#8B1E1E]" />
                  <span className="text-[11px] font-bold text-[#2C241E] uppercase tracking-wide">
                    Vóc Dáng Nhân Vật
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#8C7A6B]">
                    BMI: <strong className="text-[#8B1E1E]">{bmi}</strong> ({getBmiStatus(bmi)})
                  </span>
                  {(height !== 160 || weight !== 52) && (
                    <button
                      type="button"
                      onClick={() => handlePhysiqueChange(160, 52)}
                      className="text-[9px] text-[#8B1E1E] hover:underline font-bold flex items-center gap-0.5"
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
                  <span className="font-bold text-[#8B1E1E] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
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
                  className="w-full accent-[#8B1E1E] cursor-pointer h-1.5 bg-[#E8DEC8] rounded-lg"
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
                  <span className="font-bold text-[#8B1E1E] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
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
                  className="w-full accent-[#8B1E1E] cursor-pointer h-1.5 bg-[#E8DEC8] rounded-lg"
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
                        ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
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

      {/* Floating Exploded Layers Rack on Left of Character (Hiển thị các lớp trang phục phía bên tay trái nhân vật) */}
      {showLayerExplodedView && (
        <div className="absolute top-16 left-3 z-30 w-48 sm:w-56 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#8B1E1E]/40 shadow-xl p-3 space-y-2 animate-in fade-in slide-in-from-left-2 duration-200">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#F0E6D8]">
            <span className="text-[11px] font-bold text-[#8B1E1E] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8B1E1E]" />
              Tách Lớp Trang Phục
            </span>
            <button
              type="button"
              onClick={() => setShowLayerExplodedView(false)}
              className="text-[10px] text-[#8C7A6B] hover:text-[#8B1E1E] font-bold px-1.5 py-0.5 rounded-md hover:bg-rose-50 cursor-pointer"
              title="Ẩn lớp hiển thị và lồng ghép trang phục đúng chuẩn"
            >
              Ẩn ✕
            </button>
          </div>

          <p className="text-[9px] text-[#6B5A4B] leading-tight">
            Hiển thị riêng từng lớp để người dùng dễ cảm nhận độ hòa hợp màu sắc & phom dáng:
          </p>

          <div className="space-y-1.5 text-[10px]">
            {/* Lớp 1: Yếm Lót Trong */}
            <div className="p-1.5 rounded-xl bg-[#FFF1F2] border border-rose-200 flex items-center gap-2 shadow-2xs">
              <span
                className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                style={{ backgroundColor: top.innerYemColor || '#DB2777' }}
              />
              <div className="overflow-hidden">
                <p className="font-bold text-rose-950 truncate">Lớp 1: Áo Yếm Lót Trong</p>
                <p className="text-[9px] text-rose-700 truncate">Sắc yếm đào: {top.innerYemColor || '#DB2777'}</p>
              </div>
            </div>

            {/* Lớp 2: Áo Khoác Ngoài */}
            <div className="p-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center gap-2 shadow-2xs">
              <span
                className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                style={{ backgroundColor: top.primaryColor }}
              />
              <div className="overflow-hidden">
                <p className="font-bold text-[#2C241E] truncate">Lớp 2: {root.name}</p>
                <p className="text-[9px] text-[#8C7A6B] truncate">Sắc áo: {top.primaryColor}</p>
              </div>
            </div>

            {/* Lớp 3: Dải Thắt Lưng / Cúc */}
            <div className="p-1.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2 shadow-2xs">
              <span
                className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                style={{ backgroundColor: top.sashColor || '#0D9488' }}
              />
              <div className="overflow-hidden">
                <p className="font-bold text-teal-950 truncate">Lớp 3: Dải Bao / Cúc Khuy</p>
                <p className="text-[9px] text-teal-700 truncate">
                  {outfit.rootId === 'tu-than' ? 'Dải bao thắt eo xanh' : 'Hàng khuy cài trang nhã'}
                </p>
              </div>
            </div>

            {/* Lớp 4: Quần Lụa Bên Dưới */}
            <div className="p-1.5 rounded-xl bg-[#F4F4F5] border border-zinc-200 flex items-center gap-2 shadow-2xs">
              <span
                className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                style={{ backgroundColor: bottom.color }}
              />
              <div className="overflow-hidden">
                <p className="font-bold text-zinc-950 truncate">Lớp 4: Quần Lụa Bên Dưới</p>
                <p className="text-[9px] text-zinc-600 truncate">Màu quần: {bottom.color}</p>
              </div>
            </div>

            {/* Lớp 5: Phụ Kiện Đi Kèm */}
            <div className="p-1.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="overflow-hidden">
                <p className="font-bold text-amber-950 truncate">Lớp 5: Phụ Kiện Đã Phối</p>
                <p className="text-[9px] text-amber-700 truncate">
                  {accessories.jewelryIds.length > 0 ? `${accessories.jewelryIds.length} món trang sức` : 'Giày & Điểm xuyết'}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLayerExplodedView(false)}
            className="w-full py-1.5 text-[10px] font-bold text-white bg-[#8B1E1E] hover:bg-[#7A1C1C] rounded-xl transition-colors cursor-pointer text-center shadow-xs"
          >
            Ẩn lớp hiển thị (Khép lại chuẩn)
          </button>
        </div>
      )}

      {/* SVG Canvas for Model + Fitted Clothing Layers */}
      <svg
        id="mannequin-svg-canvas"
        viewBox={isThumbnail ? "95 12 170 432" : "0 -25 360 515"}
        preserveAspectRatio="xMidYMid meet"
        className={isThumbnail ? "w-full h-full max-h-full object-contain z-10 drop-shadow-xs my-auto" : "w-full flex-1 max-h-[460px] z-10 drop-shadow-md my-auto"}
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

          {/* Hiệu ứng khúc xạ màu Iridescent / Ombre (Ánh tím lavender - ánh xanh ngọc) */}
          <linearGradient id="iridescentLavenderJadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.82" />
            <stop offset="45%" stopColor="#D8B4FE" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#A7F3D0" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.85" />
          </linearGradient>

          {/* Đầm hai dây màu hồng san hô bên trong */}
          <linearGradient id="coralPinkSlipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>

          {/* Porcelain & Peach Skin Tone Gradients (Chuẩn tranh vẽ poster) */}
          <linearGradient id="skinToneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={avatar.skinTone === 'fair' ? '#FFF9F5' : avatar.skinTone === 'natural' ? '#FDF3EB' : '#F8E7D8'} />
            <stop offset="100%" stopColor={skinColor} />
          </linearGradient>

          <linearGradient id="lipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BE185D" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>

          {/* Traditional Wooden Folding Fan & Crimson Tassel Gradients */}
          <linearGradient id="fanRibGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FAF5EE" />
            <stop offset="50%" stopColor="#EFE5D5" />
            <stop offset="100%" stopColor="#E2D4BF" />
          </linearGradient>

          <linearGradient id="tasselSilkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="60%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#991B1B" />
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
            <stop offset="0%" stopColor={hairDark} />
            <stop offset="35%" stopColor={hairMid} />
            <stop offset="75%" stopColor={hairSoft} />
            <stop offset="100%" stopColor={hairDark} />
          </linearGradient>

          <linearGradient id="hairFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorTone.soft} />
            <stop offset="30%" stopColor={hairMid} />
            <stop offset="70%" stopColor={hairDark} />
            <stop offset="100%" stopColor={hairDark} />
          </linearGradient>

          <linearGradient id="animeHalo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={hairSheen} stopOpacity="0" />
            <stop offset="30%" stopColor={hairHalo} stopOpacity="0.45" />
            <stop offset="50%" stopColor={colorTone.light} stopOpacity="0.85" />
            <stop offset="70%" stopColor={hairHalo} stopOpacity="0.45" />
            <stop offset="100%" stopColor={hairSheen} stopOpacity="0" />
          </linearGradient>

          <linearGradient id="strandGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hairHalo} stopOpacity="0.8" />
            <stop offset="50%" stopColor={hairSheen} stopOpacity="0.5" />
            <stop offset="100%" stopColor={hairDark} stopOpacity="0" />
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

          {/* 1. Họa tiết Tơ Vân Mây Cổ Truyền (Cloud Jacquard Pattern) */}
          <pattern id="mannequinCloudJacquard" width="44" height="44" patternUnits="userSpaceOnUse">
            <path
              d="M10,22 Q14,14 22,18 Q28,12 34,18 Q40,16 38,24 Q42,30 34,32 Q26,34 20,28 Q14,30 10,22 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <path
              d="M14,23 Q18,18 24,21 Q28,17 32,21"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
            <path
              d="M26,38 Q32,34 38,38"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              strokeOpacity="0.25"
            />
          </pattern>

          {/* 2. Họa tiết Gấm Dệt Chìm Cung Đình (Imperial Damask Brocade) */}
          <pattern id="mannequinDamaskBrocade" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M12,10 L24,10 L24,18 L12,18 L12,26 L24,26"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeOpacity="0.28"
            />
            <circle cx="18" cy="18" r="4" fill="none" stroke="#FFFFFF" strokeWidth="0.65" strokeOpacity="0.32" />
            <circle cx="18" cy="18" r="1.3" fill="#FFFFFF" fillOpacity="0.4" />
            <path d="M18,11 L18,8 M18,25 L18,28 M11,18 L8,18 M25,18 L28,18" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.28" />
          </pattern>

          {/* 3. Họa tiết Vải Nhũ Bóng Kim Sa (Glitter Luster Shimmer) */}
          <pattern id="mannequinGlitterShimmer" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M8,8 L9,5 L10,8 L13,9 L10,10 L9,13 L8,10 L5,9 Z" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M22,20 L22.8,17.5 L23.6,20 L26,20.8 L23.6,21.6 L22.8,24 L22,21.6 L19.6,20.8 Z" fill="#FEF08A" fillOpacity="0.65" />
            <circle cx="16" cy="8" r="0.7" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="6" cy="22" r="0.6" fill="#FDE047" fillOpacity="0.5" />
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
          {/* ============================================================== */}
          {/* HỆ TÓC NAM (6 KIỂU) - LAYER 1: BACK HAIR                       */}
          {/* ============================================================== */}

          {/* 1. Nam: Rẽ ngôi 7/3 thư sinh (Classic 7/3 Side Part) */}
          {(hairstyle === 'male-short-part' || hairstyle === 'classic-side-part-73') && (
            <g id="back-hair-male-73">
              <path
                d="M165,78 C160,85 162,94 168,96 L192,96 C198,94 200,85 195,78 Z"
                fill="url(#hairBackGrad)"
              />
            </g>
          )}

          {/* 2. Nam: Búi củ tỏi cổ trang cách tân (Heritage Topknot / Man Bun) */}
          {(hairstyle === 'male-topknot-bun' || hairstyle === 'heritage-topknot-bun') && (
            <g id="back-hair-male-topknot">
              <ellipse cx="180" cy="52" rx="14" ry="12" fill="url(#hairBackGrad)" />
              {/* Búi tóc củ tỏi đỉnh đầu tròn trịa */}
              <circle cx="180" cy="36" r="11" fill="url(#hairBackGrad)" stroke={hairDark} strokeWidth="1.2" />
              <ellipse cx="180" cy="35" rx="8" ry="4" fill={hairMid} />
              {/* Trâm gỗ cổ trang cài ngang búi tóc */}
              <line x1="164" y1="34" x2="196" y2="38" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="165" cy="34" r="2.2" fill="#D97706" />
            </g>
          )}

          {/* 3. Nam: Layer mái rũ Ghibli (Shaggy Ghibli Flow) */}
          {(hairstyle === 'male-curtain-layers' || hairstyle === 'shaggy-ghibli-flow') && (
            <g id="back-hair-male-layers">
              <path
                d="M162,76 C155,95 152,110 150,122 Q165,128 180,128 Q195,128 210,122 C208,110 205,95 198,76 Z"
                fill="url(#hairBackGrad)"
              />
              <path d="M152,120 L156,128 L163,122 L171,129 L180,123 L189,129 L197,122 L204,128 L208,120" stroke={hairSoft} strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* 4. Nam: Tóc ngắn tân thời (Modern Short Taper / Crew Cut) */}
          {(hairstyle === 'male-short-neat' || hairstyle === 'modern-short-taper') && (
            <g id="back-hair-male-short-neat">
              <path
                d="M166,78 C162,84 164,94 170,95 L190,95 C196,94 198,84 194,78 Z"
                fill="url(#hairBackGrad)"
              />
            </g>
          )}

          {/* 5. Nam: Bổ luống 5/5 lãng tử (Retro Middle Part Curtain) */}
          {(hairstyle === 'male-middle-curtain-55' || hairstyle === 'retro-middle-part-55') && (
            <g id="back-hair-male-middle-55">
              <path
                d="M163,78 C158,92 156,106 160,115 Q170,118 180,118 Q190,118 200,115 C204,106 202,92 197,78 Z"
                fill="url(#hairBackGrad)"
              />
              <path d="M161,113 L166,118 L174,115 L180,118 L186,115 L194,118 L199,113" stroke={hairSoft} strokeWidth="1" fill="none" />
            </g>
          )}

          {/* 6. Nam: Tóc vuốt Slicked-back Quiff thanh lịch (Slicked-Back Quiff) */}
          {(hairstyle === 'male-textured-undercut' || hairstyle === 'male-slicked-back-quiff' || hairstyle === 'modern-textured-fade') && (
            <g id="back-hair-male-quiff">
              <path
                d="M166,78 C162,84 163,94 170,95 L190,95 C197,94 198,84 194,78 Z"
                fill="url(#hairBackGrad)"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* HỆ TÓC NỮ (6 KIỂU) - LAYER 1: BACK HAIR                         */}
          {/* ============================================================== */}

          {/* 1. Nữ: Dài thẳng tự nhiên (Long Sleek Natural) */}
          {(hairstyle === 'long-straight-waist' || hairstyle === 'long-straight-natural' || hairstyle === 'long-flowing') && (
            <g id="back-hair-long-straight">
              {/* Lớp suôn mượt phía sau lưng buông qua eo */}
              <path
                d="M156,76 C144,105 138,160 137,240 C138,258 143,268 148,272 L154,264 L161,275 L169,267 L177,276 L183,276 L191,267 L199,275 L206,264 L212,272 C217,268 222,258 223,240 C222,160 216,105 204,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Đuôi tóc tỉa layer vát nhọn tự nhiên, không cứng đơ */}
              <path
                d="M142,210 Q146,245 152,267 L158,260 Q164,250 168,270 L174,262 Q180,250 186,270 L192,262 Q196,250 202,267 L208,260 Q214,245 218,210"
                stroke={hairSoft}
                strokeWidth="1.2"
                fill="none"
              />
              {/* Sợi suôn mượt thanh thoát */}
              <line x1="154" y1="240" x2="153" y2="271" stroke={hairSheen} strokeWidth="0.8" />
              <line x1="166" y1="235" x2="165" y2="272" stroke={hairSheen} strokeWidth="0.8" />
              <line x1="180" y1="230" x2="180" y2="274" stroke={hairSheen} strokeWidth="0.9" />
              <line x1="194" y1="235" x2="195" y2="272" stroke={hairSheen} strokeWidth="0.8" />
              <line x1="206" y1="240" x2="207" y2="271" stroke={hairSheen} strokeWidth="0.8" />
            </g>
          )}

          {/* 2. Nữ: Ngắn ngang vai uốn cụp nhẹ (Soft Bob Collarbone) */}
          {(hairstyle === 'short-bob-straight' || hairstyle === 'soft-bob-collarbone' || hairstyle === 'short-shoulder-length' || hairstyle === 'short-modern') && (
            <g id="back-hair-short-bob">
              <path
                d="M154,76 C146,98 141,118 141,138 C146,146 156,148 165,144 L170,140 L180,142 L190,140 L195,144 C204,148 214,146 219,138 C219,118 214,98 206,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Tỉa layer đuôi cúp nhẹ */}
              <path
                d="M143,132 Q152,144 162,140 Q172,145 180,140 Q188,145 198,140 Q208,144 217,132"
                stroke={hairSoft}
                strokeWidth="1.2"
                fill="none"
              />
              <path d="M152,122 Q156,140 160,142" stroke={hairSheen} strokeWidth="0.8" fill="none" />
              <path d="M208,122 Q204,140 200,142" stroke={hairSheen} strokeWidth="0.8" fill="none" />
            </g>
          )}

          {/* 3. Nữ: Tết hai bím năng động (Playful Twin Braids) */}
          {(hairstyle === 'braided-twin-waist' || hairstyle === 'playful-twin-braids' || hairstyle === 'braided-twin') && (
            <g id="back-hair-twin-braids">
              <path
                d="M158,78 C152,94 148,112 148,130 C160,132 176,128 178,118 L180,105 L182,118 C184,128 200,132 212,130 C212,112 208,94 202,78 Z"
                fill="url(#hairBackGrad)"
              />
              <line x1="180" y1="85" x2="180" y2="115" stroke={hairDark} strokeWidth="1.2" />
            </g>
          )}

          {/* 4. Nữ: Tết 1 bím lệch vai phải (Side-Swept Braid - Right Shoulder) */}
          {(hairstyle === 'braided-single-side' || hairstyle === 'side-swept-braid') && (
            <g id="back-hair-single-side-braid">
              <path
                d="M156,76 C148,96 146,116 148,135 C156,140 170,136 182,130 C194,124 208,118 216,110 C218,98 214,86 204,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Chải xuôi mềm từ gáy sang vai phải */}
              <path d="M152,105 Q174,128 204,118" stroke={hairSoft} strokeWidth="1.2" fill="none" />
              <path d="M156,90 Q178,115 208,105" stroke={hairSoft} strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* 5. Nữ: Búi lệch về phía bên phải (Asymmetrical Side Low Bun) */}
          {(hairstyle === 'side-bun-right' || hairstyle === 'asymmetrical-side-bun') && (
            <g id="back-hair-side-bun">
              {/* Tóc sau đầu gom sang phải */}
              <ellipse cx="180" cy="74" rx="22" ry="20" fill="url(#hairBackGrad)" />
              {/* Khối búi tròn hoa thanh tú trễ sau tai phải */}
              <circle cx="216" cy="96" r="16" fill="url(#hairBackGrad)" />
              <ellipse cx="218" cy="94" rx="14" ry="14" fill={hairMid} />
              {/* Nếp xoắn tròn cánh hoa mềm mại */}
              <path d="M206,94 Q216,83 226,92 Q230,104 218,108 Q208,104 208,95" stroke={hairSheen} strokeWidth="1.8" fill="none" />
              <path d="M210,98 Q216,92 222,96 Q224,103 216,104" stroke={hairHalo} strokeWidth="1.2" fill="none" />
              {/* Lọn tóc buông nhẹ sau vai */}
              <path d="M208,106 Q218,140 216,175 Q220,198 215,214" stroke={hairDark} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M209,112 Q217,142 216,177" stroke={hairSoft} strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 6. Nữ: Gợn sóng dài nửa lưng (Mid-Back Soft Mermaid Waves) */}
          {(hairstyle === 'half-up-princess' || hairstyle === 'mid-back-mermaid-waves') && (
            <g id="back-hair-half-up">
              {/* Sóng nước lượn sóng mềm mại soft S-curl */}
              <path
                d="M156,76 C144,105 136,150 142,190 Q136,225 142,255 L150,266 L158,258 L168,268 L176,259 L184,269 L192,260 L202,268 L210,258 Q218,225 214,190 C220,150 214,105 204,76 Z"
                fill="url(#hairBackGrad)"
              />
              {/* Đường uốn sóng mềm mại */}
              <path d="M142,120 Q135,160 146,195 Q138,230 152,262" stroke={hairSoft} strokeWidth="1.5" fill="none" />
              <path d="M216,120 Q223,160 212,195 Q220,230 206,262" stroke={hairSoft} strokeWidth="1.5" fill="none" />
              <path d="M160,140 Q152,190 166,230 L168,266" stroke={hairSheen} strokeWidth="1" fill="none" />
              <path d="M198,140 Q206,190 192,230 L190,266" stroke={hairSheen} strokeWidth="1" fill="none" />
            </g>
          )}

          {/* Các kiểu phụ tương thích ngược */}
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

          {/* Neck base: Nữ thon thả thanh tao, Nam cổ to dày thẳng vững chãi */}
          {isMale ? (
            <g id="male-neck-firm">
              {/* Cổ nam to, dày, thẳng, vững chãi (x=166 đến 194) */}
              <path d="M166,98 L164,126 L196,126 L194,98 Z" fill="url(#skinToneGrad)" />
              {/* Bóng cơ ức đòn chũm và khối cổ nam cel-shaded */}
              <path d="M168,102 Q180,111 192,102" stroke={skinShade} strokeWidth="1.8" strokeOpacity="0.45" fill="none" />
              <line x1="174" y1="102" x2="178" y2="124" stroke={skinShade} strokeWidth="1.2" strokeOpacity="0.35" />
              <line x1="186" y1="102" x2="182" y2="124" stroke={skinShade} strokeWidth="1.2" strokeOpacity="0.35" />
              {/* Xương quai xanh nam ngang, rõ nét, góc cạnh */}
              <path d="M162,125 Q178,127 180,126 Q182,127 198,125" stroke={skinShade} strokeWidth="1.6" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g id="female-neck-slender">
              {/* Slender neck (centered at x=180, y=96 to 126) */}
              <path d="M172,96 C172,108 170,118 168,126 L192,126 C190,118 188,108 188,96 Z" fill="url(#skinToneGrad)" />
              {/* Neck shadow under chin */}
              <path d="M172,103 Q180,113 188,103" stroke={skinShade} strokeWidth="1.6" strokeOpacity="0.35" fill="none" />
              {/* Clavicle / Collarbone indentation */}
              <path d="M171,124 Q180,128 189,124" stroke={skinShade} strokeWidth="1.1" strokeOpacity="0.5" fill="none" />
            </g>
          )}

          {/* Shoulders & Arms:
              - Nữ: Vai thon mềm, tay cong nhẹ nhàng đan trước bụng
              - Nam: Khung vai rộng, ngang, vuông vức (boxy), bắp tay đanh thép, đứng đĩnh đạc
          */}
          <path
            d={isMale 
              ? "M164,126 L136,127 Q118,131 116,146 Q114,166 122,192 Q132,208 152,216 L154,206 Q138,198 132,184 Q128,168 132,148 L146,140 L164,126 Z"
              : "M168,126 Q150,128 135,136 Q128,148 132,168 Q136,190 148,204 Q158,214 172,217 L173,209 Q158,206 150,194 Q142,180 142,156 L152,148 L168,126 Z"
            }
            fill={skinColor}
            stroke={isMale ? skinShade : undefined}
            strokeWidth={isMale ? 0.9 : 0}
          />
          <path
            d={isMale
              ? "M196,126 L224,127 Q242,131 244,146 Q246,166 238,192 Q228,208 208,216 L206,206 Q222,198 228,184 Q232,168 228,148 L214,140 L196,126 Z"
              : "M192,126 Q210,128 225,136 Q232,148 228,168 Q224,190 212,204 Q202,214 188,217 L187,209 Q202,206 210,194 Q218,180 218,156 L208,148 L192,126 Z"
            }
            fill={skinColor}
            stroke={isMale ? skinShade : undefined}
            strokeWidth={isMale ? 0.9 : 0}
          />
        </g>

        {/* ============================================================== */}
        {/* LAYER 3: BOTTOM GARMENT (Quần Lụa / Chân Váy - Vừa Khít Cạp Eo)*/}
        {/* ============================================================== */}
        <g id="model-bottom-garment">
          {bottom.bottomId === 'bot-vay-dup-lua-trang-xoe-rong' ? (
            /* Váy Đụp Lụa Trắng Xòe Rộng Kinh Bắc: Xòe tròn thênh thang từ hông xuống chấm gót, nếp rủ bay bổng */
            <g id="vay-dup-xoe-rong-kinh-bac">
              <path
                d="M158,204 L202,204 L238,432 Q180,438 122,432 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.1"
                strokeWidth="1.2"
              />
              {/* Nếp sóng lụa mềm xếp nếp tự nhiên xòe tròn */}
              <path d="M166,204 Q154,320 142,432" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
              <path d="M174,204 Q170,320 164,434" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" fill="none" />
              <path d="M180,204 Q180,320 180,436" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.8" fill="none" />
              <path d="M186,204 Q190,320 196,434" stroke="#000000" strokeOpacity="0.12" strokeWidth="1" fill="none" />
              <path d="M194,204 Q206,320 218,432" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
              {/* Gấu váy viền mềm mại */}
              <path d="M122,432 Q180,438 238,432" stroke="#000000" strokeOpacity="0.15" strokeWidth="1.2" fill="none" />
            </g>
          ) : bottom.bottomId === 'bot-quan-ong-xeo-lua-trang-nga' ? (
            /* Quần Lụa Trắng Ống Xéo Cổ Phục: Suông rộng từ hông, xòe nhẹ tự nhiên ở gấu, dài chạm đất phủ mắt cá */
            <g id="quan-ong-xeo-co-phuc">
              {/* Ống quần trái xòe xéo thướt tha */}
              <path
                d="M158,204 L180,204 L174,260 L168,432 L126,432 L146,260 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              {/* Ống quần phải xòe xéo thướt tha */}
              <path
                d="M180,204 L202,204 L214,260 L234,432 L192,432 L186,260 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <line x1="180" y1="204" x2="180" y2="280" stroke="#000000" strokeOpacity="0.16" strokeWidth="1" />
              {/* Nếp gấp rủ mềm mại tự nhiên của lụa tơ bóng mờ */}
              <path d="M148,220 Q150,330 144,430" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.6" fill="none" />
              <path d="M162,260 Q160,340 156,430" stroke="#000000" strokeOpacity="0.1" strokeWidth="1" fill="none" />
              <path d="M212,220 Q210,330 216,430" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.6" fill="none" />
              <path d="M198,260 Q200,340 204,430" stroke="#000000" strokeOpacity="0.1" strokeWidth="1" fill="none" />
            </g>

          ) : bottom.bottomId === 'bot-vay-xep-ly-dai' ? (
            /* Chân Váy Xếp Ly Dài Phom Chữ A: Cạp cao phẳng đứng dáng, các nếp ly bản lớn đối xứng mở rộng dần về gấu, chạm đất, gấu lượn sóng */
            <g id="vay-xep-ly-dai-a-line">
              {/* Phom váy chữ A đứng dáng */}
              <path
                d="M160,204 L200,204 L244,435 Q180,442 116,435 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.12"
                strokeWidth="1.2"
              />
              {/* Cạp cao bản vừa phẳng phiu đứng dáng */}
              <rect x="160" y="200" width="40" height="10" rx="1.5" fill="url(#bottomGradient)" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />
              <line x1="160" y1="210" x2="200" y2="210" stroke="#000000" strokeOpacity="0.2" strokeWidth="1" />

              {/* Các đường xếp ly bản lớn đối xứng chạy thẳng tắp từ cạp mở rộng dần về gấu */}
              <path d="M164,210 L134,435" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.2" />
              <path d="M166,210 L142,436" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
              <path d="M172,210 L156,437" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.2" />
              <path d="M174,210 L164,438" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
              <path d="M180,210 L180,439" stroke="#000000" strokeOpacity="0.22" strokeWidth="1.4" />
              <path d="M181,210 L182,439" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.6" />
              <path d="M188,210 L196,438" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.2" />
              <path d="M186,210 L204,437" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
              <path d="M196,210 L226,435" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.2" />
              <path d="M194,210 L218,436" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />

              {/* Gấu lượn sóng tự nhiên theo nếp gấp mí phẳng */}
              <path
                d="M116,435 Q125,438 134,435 Q145,438 156,437 Q168,440 180,439 Q192,440 204,437 Q215,438 226,435 Q235,438 244,435"
                stroke="#000000"
                strokeOpacity="0.2"
                strokeWidth="1.4"
                fill="none"
              />
            </g>
          ) : bottom.bottomId === 'bot-vay-lua-bong-cat-xeo' ? (
            /* Chân Váy Lụa Satin Cắt Xéo (Bias Cut): Cạp phẳng ôm eo, ôm nhẹ hông rồi buông rủ thành dải sóng mềm mại, xòe nhẹ ở gấu */
            <g id="vay-lua-satin-cat-xeo">
              {/* Phom váy cắt xéo bias cut ôm nhẹ hông và xòe gấu */}
              <path
                d="M160,204 L200,204 Q210,240 206,275 Q212,360 234,434 Q180,440 126,434 Q148,360 154,275 Q150,240 160,204 Z"
                fill="url(#bottomGradient)"
                stroke="#000000"
                strokeOpacity="0.1"
                strokeWidth="1.2"
              />
              {/* Cạp váy phẳng phiu ôm gọn vòng eo */}
              <rect x="160" y="202" width="40" height="7" rx="1.5" fill="url(#bottomGradient)" stroke="#000000" strokeOpacity="0.12" strokeWidth="0.8" />

              {/* Các dải sóng mềm mại dọc thân tạo bởi đường cắt xéo lụa satin */}
              <path d="M166,225 Q158,320 148,434" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2.2" fill="none" />
              <path d="M176,235 Q170,335 168,436" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.2" fill="none" />
              <path d="M186,225 Q192,320 204,435" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2.2" fill="none" />
              <path d="M194,235 Q200,335 218,434" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.2" fill="none" />

              {/* Độ bóng mờ sang trọng của lụa satin */}
              <path d="M178,212 Q180,310 182,438" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2.5" fill="none" />
              <path d="M126,434 Q180,440 234,434" stroke="#000000" strokeOpacity="0.15" strokeWidth="1.2" fill="none" />
            </g>
          ) : bottom.bottomId === 'bot-chan-vay-midi-xep-ly' ? (
            <g id="chan-vay-midi">
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
            <g id="quan-suong-tieu-chuan">
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
            {/* Exploded indicators when showLayerExplodedView is active */}
            {showLayerExplodedView && (
              <g id="exploded-tu-than-layers-svg" className="transition-all duration-300">
                {/* 1. Exploded Yếm Indicator on Left */}
                <line x1="168" y1="150" x2="68" y2="150" stroke={top.innerYemColor || '#DB2777'} strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="168" cy="150" r="2.5" fill={top.innerYemColor || '#DB2777'} />
                <circle cx="68" cy="150" r="3" fill={top.innerYemColor || '#DB2777'} />
                <path
                  d="M58,126 Q68,130 78,126 L81,172 L55,172 Z"
                  fill={top.innerYemColor || '#DB2777'}
                  stroke="#9D174D"
                  strokeWidth="0.8"
                />
                <text x="68" y="184" textAnchor="middle" fontSize="6.5" fill="#8B1E1E" fontWeight="bold">Lớp 1: Yếm Trong</text>

                {/* 2. Exploded Outer Robe Indicator on Right */}
                <line x1="222" y1="150" x2="295" y2="150" stroke={top.primaryColor} strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="222" cy="150" r="2.5" fill={top.primaryColor} />
                <circle cx="295" cy="150" r="3" fill={top.primaryColor} />
                <text x="295" y="165" textAnchor="middle" fontSize="6.5" fill="#8B1E1E" fontWeight="bold">Lớp 2: Áo Tứ Thân</text>
              </g>
            )}

            {/* Fitted Sleeves along arms */}
            <path
              d={isMale
                ? "M136,128 Q120,155 128,184 Q138,206 156,214"
                : "M138,134 Q132,165 140,188 Q152,208 172,214"
              }
              stroke="url(#topGradient)"
              strokeWidth={isMale ? 14 : 12}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={isMale
                ? "M224,128 Q240,155 232,184 Q222,206 204,214"
                : "M222,134 Q228,165 220,188 Q208,208 188,214"
              }
              stroke="url(#topGradient)"
              strokeWidth={isMale ? 14 : 12}
              strokeLinecap="round"
              fill="none"
            />
            <line x1={isMale ? "154" : "168"} y1="210" x2={isMale ? "159" : "173"} y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
            <line x1={isMale ? "206" : "192"} y1="210" x2={isMale ? "201" : "187"} y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />

            {/* Lớp áo trong: Nữ mặc Yếm đào, Nam mặc áo lót/áo cánh nam cổ tròn/thẳng đĩnh đạc */}
            {isMale ? (
              <g id="male-inner-robe">
                {/* Áo lót cánh nam mộc mạc bên trong tứ thân cách tân */}
                <path d="M164,124 L196,124 L200,206 L160,206 Z" fill={top.innerYemColor || '#F5F5F4'} />
                <path d="M164,124 Q180,128 196,124" stroke="#D6D3D1" strokeWidth="1.5" fill="none" />
              </g>
            ) : (
              <g id="female-inner-yem">
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
                <path d="M168,122 Q180,126 192,122" stroke="#9D174D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M172,160 Q180,166 188,160" stroke="#000000" strokeOpacity="0.1" strokeWidth="1" fill="none" />
              </g>
            )}

            {/* Hai thân áo tứ thân khoác ngoài */}
            <path
              d={isMale
                ? "M134,128 L164,124 L160,204 L148,295 L138,204 Z"
                : "M138,134 Q155,127 168,122 L164,204 L152,285 L144,204 Q140,165 138,134 Z"
              }
              fill="url(#topGradient)"
            />
            <path
              d={isMale
                ? "M226,128 L196,124 L200,204 L212,295 L222,204 Z"
                : "M222,134 Q205,127 192,122 L196,204 L208,285 L216,204 Q220,165 222,134 Z"
              }
              fill="url(#topGradient)"
            />

            {/* Lotus pattern on fabric */}
            {top.patternId !== 'pat-tron-dui-to' && (
              <g>
                <path d="M138,134 Q155,127 168,122 L164,204 L152,285 L144,204 Z" fill="url(#lotusPattern)" />
                <path d="M222,134 Q205,127 192,122 L196,204 L208,285 L216,204 Z" fill="url(#lotusPattern)" />
              </g>
            )}

            {/* Buộc vạt trước hoặc buông thả mềm mại theo phong cách may */}
            {top.silhouetteId === 'tu-than-buong-tha-mem' ? (
              /* Buông thả mềm mại: hai vạt trước buông tự do thướt tha hai bên tà */
              <g id="tu-than-buong-tha-vat-hai-ben">
                <path
                  d="M164,204 Q156,250 150,335 Q148,355 142,370"
                  stroke={top.primaryColor}
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M196,204 Q204,250 210,335 Q212,355 218,370"
                  stroke={top.primaryColor}
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            ) : (
              /* Buộc thắt gọn gàng trước bụng duyên dáng */
              <g id="tu-than-buoc-vat-truoc-bung">
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
                {/* Nút thắt nơ mềm mại giữa hai vạt áo */}
                <ellipse cx="180" cy="207" rx="3.5" ry="2.5" fill={top.primaryColor} />
              </g>
            )}

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

          </g>
        )}

        {/* 5B. ÁO NGŨ THÂN: Cấu trúc 5 thân, phom suông đoan chính KHÔNG CHIẾT EO */}
        {outfit.rootId === 'ngu-than' && (
          <g id="ao-ngu-than-authentic">
            {/* Lớp áo lót bên trong (Inner layer trắng ngà) - Lộ rõ khi mặc áo lớp Áo Ngũ Thân Tay Thụng */}
            {top.silhouetteId === 'ngu-than-tay-thung-trang-trong' && (
              <g id="ngu-than-inner-layer-robe">
                {/* Thân áo lót trắng ngà bên trong phom suông */}
                <path
                  d="M138,135 L173,124 L187,124 L222,135 L215,195 L224,378 L136,378 L145,195 Z"
                  fill="#FFFDF7"
                  stroke="#E8DEC8"
                  strokeWidth="1.2"
                />
                {/* Viền cổ áo lót bên trong trắng ngọc hé lộ thanh tao */}
                <rect x="173" y="106" width="14" height="18" rx="2" fill="#FFFDF7" stroke="#D8C7B0" strokeWidth="0.8" />
              </g>
            )}

            {/* ============================================================== */}
            {/* THIẾT KẾ CÁCH TÂN ĐẶC BIỆT: NGŨ THÂN HOA 3D & OMBRE KHÚC XẠ     */}
            {/* ============================================================== */}
            {top.silhouetteId === 'ngu-than-cach-tan-hoa-3d' ? (
              <g id="ngu-than-cach-tan-couture">
                {/* 1. Đầm hai dây màu hồng san hô bên trong (Coral Pink Slip Dress) */}
                <g id="coral-pink-inner-slip">
                  {/* Hai dây vai mảnh */}
                  <line x1="164" y1="126" x2="164" y2="140" stroke="#FB7185" strokeWidth="1.8" />
                  <line x1="196" y1="126" x2="196" y2="140" stroke="#FB7185" strokeWidth="1.8" />
                  {/* Cổ tim nhẹ của đầm hai dây */}
                  <path d="M160,138 Q180,146 200,138 L206,285 L154,285 Z" fill="url(#coralPinkSlipGrad)" stroke="#F43F5E" strokeWidth="0.8" />
                </g>

                {/* 2. Lớp tơ ngoài khúc xạ màu (Iridescent Lavender & Jade Green Ombre) */}
                {/* Tay áo lỡ / rộng với đường may can ngang nhẹ ở bắp tay */}
                <g id="cach-tan-sleeves">
                  <path
                    d="M138,134 Q128,165 132,192 Q138,214 162,222 L166,212 Q148,206 144,188 Q140,165 148,142 Z"
                    fill="url(#iridescentLavenderJadeGrad)"
                    stroke="#0D9488"
                    strokeWidth="1.4"
                  />
                  {/* Can ngang nhẹ ở bắp tay trái */}
                  <line x1="133" y1="168" x2="147" y2="171" stroke="#0D9488" strokeWidth="1.2" strokeDasharray="1 1" />
                  {/* Viền cửa tay màu xanh ngọc */}
                  <ellipse cx="164" cy="217" rx="3.5" ry="5.5" fill="none" stroke="#0D9488" strokeWidth="1.8" />

                  <path
                    d="M222,134 Q232,165 228,192 Q222,214 198,222 L194,212 Q212,206 216,188 Q220,165 212,142 Z"
                    fill="url(#iridescentLavenderJadeGrad)"
                    stroke="#0D9488"
                    strokeWidth="1.4"
                  />
                  {/* Can ngang nhẹ ở bắp tay phải */}
                  <line x1="227" y1="168" x2="213" y2="171" stroke="#0D9488" strokeWidth="1.2" strokeDasharray="1 1" />
                  {/* Viền cửa tay màu xanh ngọc */}
                  <ellipse cx="196" cy="217" rx="3.5" ry="5.5" fill="none" stroke="#0D9488" strokeWidth="1.8" />
                </g>

                {/* Thân áo ngũ thân dáng suông phom đoan chính tơ mỏng khúc xạ */}
                <path
                  d="M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L215,190 L222,355 L138,355 L145,190 Z"
                  fill="url(#iridescentLavenderJadeGrad)"
                  stroke="#0D9488"
                  strokeWidth="1.5"
                />

                {/* Đường Trung Phùng chính giữa viền xanh ngọc thanh thoát */}
                <line x1="180" y1="124" x2="180" y2="355" stroke="#0D9488" strokeWidth="1.3" opacity="0.8" />

                {/* Mép vạt chéo từ xương quai xanh xuống mạn sườn viền xanh ngọc */}
                <path
                  d="M180,124 Q194,136 198,160 L197,204 L196,355"
                  stroke="#0D9488"
                  strokeWidth="1.8"
                  fill="none"
                />

                {/* Đường viền nẹp màu xanh ngọc ở gấu áo và xẻ tà */}
                <line x1="138" y1="355" x2="222" y2="355" stroke="#0D9488" strokeWidth="2.2" />
                <line x1="145" y1="190" x2="138" y2="355" stroke="#0D9488" strokeWidth="1.5" />
                <line x1="215" y1="190" x2="222" y2="355" stroke="#0D9488" strokeWidth="1.5" />

                {/* Cổ áo viền nẹp màu xanh ngọc & Nút khuy tết bằng sợi vải xanh ngọc tại đỉnh cổ */}
                <g id="cach-tan-collar">
                  <rect x="173" y="108" width="14" height="16" rx="2" fill="url(#iridescentLavenderJadeGrad)" stroke="#0D9488" strokeWidth="1.8" />
                  {/* Nút khuy tết bằng sợi vải màu xanh ngọc ở đỉnh cổ áo */}
                  <circle cx="180" cy="114" r="2.8" fill="#0D9488" stroke="#042F2E" strokeWidth="0.8" />
                  <circle cx="179.3" cy="113.3" r="1" fill="#A7F3D0" />
                </g>

                {/* DẢI KHUY HOA VẢI 3D ĐÍNH NỔI (ĐIỂM NHẤN CHÍNH): Hàng hoa trắng 5 cánh đính nổi */}
                <g id="dai-khuy-hoa-vai-3d">
                  {[
                    { cx: 184, cy: 126 },
                    { cx: 191, cy: 140 },
                    { cx: 196, cy: 156 },
                    { cx: 198, cy: 173 },
                    { cx: 197, cy: 190 },
                    { cx: 196, cy: 206 },
                  ].map((pos, idx) => (
                    <g key={idx} transform={`translate(${pos.cx}, ${pos.cy})`}>
                      {/* 5 cánh hoa vải trắng mờ 3D */}
                      {[0, 72, 144, 216, 288].map((deg) => (
                        <ellipse
                          key={deg}
                          cx="0"
                          cy="-3.2"
                          rx="1.6"
                          ry="2.4"
                          fill="#FFFFFF"
                          fillOpacity="0.95"
                          stroke="#E2E8F0"
                          strokeWidth="0.4"
                          transform={`rotate(${deg})`}
                        />
                      ))}
                      {/* Nhụy hoa ngọc xanh ngọc tâm điểm */}
                      <circle cx="0" cy="0" r="1.1" fill="#0D9488" stroke="#042F2E" strokeWidth="0.4" />
                      <circle cx="-0.3" cy="-0.3" r="0.4" fill="#A7F3D0" />
                    </g>
                  ))}
                </g>
              </g>
            ) : (
              /* ÁO NGŨ THÂN NGUYÊN BẢN (TAY CHẼN HOẶC TAY THỤNG KHOANH TAY) */
              <g id="ngu-than-traditional-cuts">
                {/* Tay áo: Tay Chẽn vs Tay Thụng Khoanh Tay */}
                {top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? (
                  <g id="ngu-than-tay-thung-khoanh-tay">
                    <path
                      d="M138,134 Q116,165 112,205 Q110,248 136,260 L224,260 Q250,248 248,205 Q244,165 222,134 L210,140 Q226,170 220,205 L140,205 Q134,170 150,140 Z"
                      fill="url(#topGradient)"
                      opacity="0.92"
                      stroke="#000000"
                      strokeOpacity="0.18"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M125,216 Q180,230 235,216 L232,246 Q180,258 128,246 Z"
                      fill="url(#topGradient)"
                      stroke="#000000"
                      strokeOpacity="0.22"
                      strokeWidth="1.2"
                    />
                    <path d="M130,230 Q180,242 230,230" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.4" fill="none" />
                    <path d="M112,205 Q106,230 118,255" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />
                    <path d="M248,205 Q254,230 242,255" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />
                  </g>
                ) : (
                  <g id="ngu-than-tay-chen-om-gon">
                    <path d="M138,134 Q132,165 140,188 Q152,208 172,214" stroke="url(#topGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
                    <path d="M222,134 Q228,165 220,188 Q208,208 188,214" stroke="url(#topGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
                    <line x1="168" y1="210" x2="173" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
                    <line x1="192" y1="210" x2="187" y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
                  </g>
                )}

                {/* Thân áo chính: Phom suông thẳng từ nách xuống gấu (không có bất kỳ chi tiết chiết eo hay bó sát nào) */}
                <path
                  id="ngu-than-main-body"
                  d={top.silhouetteId === 'ngu-than-tay-thung-trang-trong'
                    ? (isMale 
                        ? "M134,128 L170,122 L190,122 L226,128 L222,195 L234,375 L126,375 L138,195 Z"
                        : "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L216,195 L226,375 L134,375 L144,195 Z")
                    : (isMale
                        ? "M134,128 L170,122 L190,122 L226,128 L220,190 L228,350 L132,350 L140,190 Z"
                        : "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L214,190 L220,350 L140,350 L146,190 Z")
                  }
                  fill="url(#topGradient)"
                  opacity={top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? 0.94 : 1}
                  stroke="#000000"
                  strokeOpacity="0.25"
                  strokeWidth={isMale ? 1.5 : 1.2}
                />

                {/* Hoa văn dệt chìm / vân mây / nhũ bóng / tơ sen trên nền vải áo ngũ thân */}
                {top.patternId === 'pat-may-song-thuy-ba' && (
                  <path
                    d={top.silhouetteId === 'ngu-than-tay-thung-trang-trong'
                      ? "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L216,195 L226,375 L134,375 L144,195 Z"
                      : "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L214,190 L220,350 L140,350 L146,190 Z"
                    }
                    fill="url(#mannequinCloudJacquard)"
                  />
                )}
                {top.patternId === 'pat-gam-hoa-cung-dinh' && (
                  <path
                    d={top.silhouetteId === 'ngu-than-tay-thung-trang-trong'
                      ? "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L216,195 L226,375 L134,375 L144,195 Z"
                      : "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L214,190 L220,350 L140,350 L146,190 Z"
                    }
                    fill="url(#mannequinDamaskBrocade)"
                  />
                )}
                {(top.patternId === 'pat-v-nhu-bong' || top.patternId === 'pat-sen-theu-chim') && (
                  <path
                    d={top.silhouetteId === 'ngu-than-tay-thung-trang-trong'
                      ? "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L216,195 L226,375 L134,375 L144,195 Z"
                      : "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L214,190 L220,350 L140,350 L146,190 Z"
                    }
                    fill="url(#mannequinGlitterShimmer)"
                  />
                )}

                {/* Đường "Trung Phùng" ở chính giữa - Dấu ấn đặc trưng bất biến của Áo Ngũ Thân */}
                <line
                  x1="180"
                  y1={isMale ? "120" : "124"}
                  x2="180"
                  y2={top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? "375" : "350"}
                  stroke="#000000"
                  strokeOpacity="0.28"
                  strokeWidth={isMale ? 1.6 : 1.4}
                />

                {/* Đường cắt vạt hò */}
                <path
                  d={top.silhouetteId === 'ngu-than-tay-thung-trang-trong'
                    ? "M180,124 Q194,136 198,160 L196,195 L196,375"
                    : "M180,124 Q194,136 198,160 L196,195 L196,350"
                  }
                  stroke="#000000"
                  strokeOpacity="0.25"
                  strokeWidth={isMale ? 1.8 : 1.5}
                  fill="none"
                />

                {/* Cổ Lập Lĩnh: Cổ đứng của áo ngũ thân nam to, cao, ôm sát cổ nam tính */}
                <rect
                  x={isMale ? "170" : "173"}
                  y={isMale ? "102" : "108"}
                  width={isMale ? "20" : "14"}
                  height={isMale ? "22" : "16"}
                  rx="2"
                  fill="url(#topGradient)"
                  stroke="#000000"
                  strokeOpacity="0.28"
                  strokeWidth={isMale ? 1.4 : 1}
                />
                <line
                  x1={isMale ? "170" : "173"}
                  y1={isMale ? "112" : "116"}
                  x2={isMale ? "190" : "187"}
                  y2={isMale ? "112" : "116"}
                  stroke="#FFFFFF"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                />

                {/* 5 Khuy Cài Lệch Phải: To bản, đanh thép, cúc gỗ/đồng/bạc chắc chắn */}
                {top.silhouetteId !== 'ngu-than-tay-thung-trang-trong' && (
                  <g id="ngu-than-5-buttons-tay-chen">
                    <circle cx="180" cy={isMale ? 112 : 116} r={isMale ? 2.8 : 2.2} fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth={isMale ? 0.8 : 0.5} />
                    <circle cx={isMale ? 193 : 192} cy={isMale ? 132 : 134} r={isMale ? 2.8 : 2.2} fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth={isMale ? 0.8 : 0.5} />
                    <circle cx={isMale ? 198 : 197} cy={isMale ? 154 : 156} r={isMale ? 2.8 : 2.2} fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth={isMale ? 0.8 : 0.5} />
                    <circle cx={isMale ? 197 : 196} cy={isMale ? 178 : 180} r={isMale ? 2.8 : 2.2} fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth={isMale ? 0.8 : 0.5} />
                    <circle cx={isMale ? 195 : 194} cy={isMale ? 202 : 204} r={isMale ? 2.8 : 2.2} fill={top.buttonId === 'btn-5-khuy-bac-cham' ? '#E2E8F0' : '#10B981'} stroke="#000000" strokeWidth={isMale ? 0.8 : 0.5} />
                  </g>
                )}

                {/* Nếp rủ tà áo thẳng thớm đoan chính */}
                <line x1="158" y1="215" x2="146" y2={top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? "375" : "350"} stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />
                <line x1="202" y1="215" x2="214" y2={top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? "375" : "350"} stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />
              </g>
            )}
          </g>
        )}

        {/* 5C. ÁO BÀ BA (Chiết eo thắt đáy lưng ong & xẻ tà hông duyên dáng) */}
        {outfit.rootId === 'ba-ba' && (
          <g id="ao-ba-ba-fitted">
            {/* Tay áo Bà Ba: Nam tay rộng rãi can thẳng, Nữ tay ôm duyên dáng */}
            <path
              d={isMale
                ? "M136,128 Q120,155 128,184 Q138,206 156,214"
                : "M138,134 Q132,165 140,188 Q152,208 172,214"
              }
              stroke="url(#topGradient)"
              strokeWidth={isMale ? 14 : 12}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={isMale
                ? "M224,128 Q240,155 232,184 Q222,206 204,214"
                : "M222,134 Q228,165 220,188 Q208,208 188,214"
              }
              stroke="url(#topGradient)"
              strokeWidth={isMale ? 14 : 12}
              strokeLinecap="round"
              fill="none"
            />
            <line x1={isMale ? "154" : "168"} y1="210" x2={isMale ? "159" : "173"} y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
            <line x1={isMale ? "206" : "192"} y1="210" x2={isMale ? "201" : "187"} y2="216" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />

            {/* Thân áo Bà Ba:
                - Nam (hoặc silhouette ba-ba-nam-dang-suong): BẮT BUỘC phom dáng suông thẳng từ nách xuống gấu (không có bất kỳ chi tiết chiết eo hay bó sát nào)
                - Nữ: Dáng chít eo thắt đáy lưng ong uốn lượn
            */}
            {(isMale || top.silhouetteId === 'ba-ba-nam-dang-suong') ? (
              /* Dáng nam suông rộng rãi phóng khoáng, đường cắt thẳng đĩnh đạc */
              <path
                d="M134,128 L170,122 L190,122 L226,128 L220,180 L224,250 Q180,252 136,250 L140,180 Z"
                fill="url(#topGradient)"
                stroke="#000000"
                strokeOpacity="0.25"
                strokeWidth="1.3"
              />
            ) : (
              /* Dáng nữ chít eo uốn lượn tôn đường cong duyên dáng */
              <path
                d="M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q198,202 214,248 Q197,254 180,250 Q163,254 146,248 Q162,202 148,180 Z"
                fill="url(#topGradient)"
              />
            )}

            {/* Pattern Overlay cho vải cao cấp */}
            {top.patternId === 'pat-to-van-may' && (
              <path
                d={top.silhouetteId === 'ba-ba-nam-dang-suong'
                  ? "M136,134 Q155,127 172,124 L188,124 Q205,127 224,134 L216,180 L220,250 Q180,252 140,250 L144,180 Z"
                  : "M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q198,202 214,248 Q197,254 180,250 Q163,254 146,248 Q162,202 148,180 Z"
                }
                fill="url(#patternCloudJacquard)"
              />
            )}
            {top.patternId === 'pat-gam-det-chim' && (
              <path
                d={top.silhouetteId === 'ba-ba-nam-dang-suong'
                  ? "M136,134 Q155,127 172,124 L188,124 Q205,127 224,134 L216,180 L220,250 Q180,252 140,250 L144,180 Z"
                  : "M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q198,202 214,248 Q197,254 180,250 Q163,254 146,248 Q162,202 148,180 Z"
                }
                fill="url(#patternDamaskBrocade)"
              />
            )}
            {top.patternId === 'pat-v-nhu-bong' && (
              <path
                d={top.silhouetteId === 'ba-ba-nam-dang-suong'
                  ? "M136,134 Q155,127 172,124 L188,124 Q205,127 224,134 L216,180 L220,250 Q180,252 140,250 L144,180 Z"
                  : "M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q198,202 214,248 Q197,254 180,250 Q163,254 146,248 Q162,202 148,180 Z"
                }
                fill="url(#patternGlitterShimmer)"
              />
            )}
            {top.patternId === 'pat-dui-tho-moc' && (
              <path
                d={top.silhouetteId === 'ba-ba-nam-dang-suong'
                  ? "M136,134 Q155,127 172,124 L188,124 Q205,127 224,134 L216,180 L220,250 Q180,252 140,250 L144,180 Z"
                  : "M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q198,202 214,248 Q197,254 180,250 Q163,254 146,248 Q162,202 148,180 Z"
                }
                fill="url(#patternRawDupioni)"
              />
            )}

            {/* Xẻ tà hai bên hông */}
            <line x1="148" y1="225" x2="144" y2="250" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
            <line x1="212" y1="225" x2="216" y2="250" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />

            {/* Đường nẹp ráp vai raglan tinh tế */}
            <line x1="172" y1="124" x2="146" y2="152" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />
            <line x1="188" y1="124" x2="214" y2="152" stroke="#000000" strokeOpacity="0.15" strokeWidth="1" />

            {/* Cổ áo Bà Ba biến tấu: Cổ tròn / Cổ tim lá trầu / Cổ vuông / Cổ lá sen */}
            {top.necklineId === 'neck-co-tim-la-trau' ? (
              /* Cổ tim lá trầu trứ danh Nam Bộ */
              <path d="M171,122 Q177,132 180,136 Q183,132 189,122" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.5" />
            ) : top.necklineId === 'neck-co-vuong-thanh-thoat' ? (
              /* Cổ vuông thanh thoát */
              <path d="M172,122 L172,130 L188,130 L188,122" fill="none" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.5" />
            ) : top.necklineId === 'neck-co-la-sen-retro' ? (
              /* Cổ lá sen retro */
              <g>
                <path d="M166,124 Q173,134 180,126 Q174,120 166,124 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                <path d="M194,124 Q187,134 180,126 Q186,120 194,124 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              </g>
            ) : (
              /* Cổ tròn đằm thắm (không cổ) */
              <path d="M170,122 Q180,130 190,122" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
            )}

            {/* Dải khuy cúc cài dọc ở chính giữa áo: Cúc áo nam to bản, đanh thép */}
            <line x1="180" y1="128" x2="180" y2="248" stroke="#000000" strokeOpacity="0.25" strokeWidth={isMale ? 1.5 : 1.2} />
            <circle cx="180" cy="136" r={isMale ? 2.5 : 1.8} fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth={isMale ? 0.7 : 0.5} />
            <circle cx="180" cy="158" r={isMale ? 2.5 : 1.8} fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth={isMale ? 0.7 : 0.5} />
            <circle cx="180" cy="180" r={isMale ? 2.5 : 1.8} fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth={isMale ? 0.7 : 0.5} />
            <circle cx="180" cy="202" r={isMale ? 2.5 : 1.8} fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth={isMale ? 0.7 : 0.5} />
            <circle cx="180" cy="224" r={isMale ? 2.5 : 1.8} fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth={isMale ? 0.7 : 0.5} />
            <circle cx="180" cy="242" r={isMale ? 2.5 : 1.8} fill={top.buttonId === 'btn-cuc-xa-cu-nam-bo' ? '#F8FAFC' : '#78350F'} stroke="#000000" strokeWidth={isMale ? 0.7 : 0.5} />

            {/* Túi áo: Dáng nam có hai túi to đĩnh đạc, dáng nữ có hai túi nhỏ thanh nhã */}
            {(isMale || top.silhouetteId === 'ba-ba-nam-dang-suong') ? (
              /* Hai túi to phía trước đặc trưng áo nam */
              <g id="tui-ao-ba-ba-nam">
                <rect x="150" y="214" width="22" height="24" rx="2.5" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.3" />
                <rect x="188" y="214" width="22" height="24" rx="2.5" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.3" />
              </g>
            ) : (
              /* Túi nhỏ tinh tế của áo nữ */
              <g id="tui-ao-ba-ba-nu">
                <rect x="157" y="218" width="15" height="17" rx="2" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="1" />
                <rect x="188" y="218" width="15" height="17" rx="2" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="1" />
              </g>
            )}

          </g>
        )}

        {/* ============================================================== */}
        {/* LAYER 5.5: HANDS & ACCESSORY (Đôi Bàn Tay Búp Măng & Quạt Xếp) */}
        {/* ============================================================== */}
        {renderHandsAndFan()}

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
            <g id="anatomical-anime-face-poster-grade">
              {/* Vành tai hai bên ôm sát đầu tự nhiên */}
              {/* Tai trái */}
              <path
                d="M161,72 C158,72 155.5,76 156,82 C156.5,87 159.5,90.5 162.5,90.5"
                fill={skinColor}
                stroke={skinShade}
                strokeWidth="0.8"
              />
              <path d="M158,76 Q156.5,81 158.5,85" stroke={skinShade} strokeWidth="0.75" fill="none" />

              {/* Tai phải */}
              <path
                d="M199,72 C202,72 204.5,76 204,82 C203.5,87 200.5,90.5 197.5,90.5"
                fill={skinColor}
                stroke={skinShade}
                strokeWidth="0.8"
              />
              <path d="M202,76 Q203.5,81 201.5,85" stroke={skinShade} strokeWidth="0.75" fill="none" />

              {/* KHUÔN MẶT:
                  - Nữ (Trái xoan / Tròn): V-line mềm mại hoặc trăng rằm, má hồng đào duyên dáng
                  - Nam: Xương quai hàm góc cạnh, cằm vuông nam tính, gò má đanh thép, tuyệt đối không vạt nhọn V-line, không má hồng phấn
              */}
              {faceShape === 'round' && !isMale ? (
                // 1. MẶT TRÒN NỮ (Trăng rằm hồn hậu, bầu bĩnh ngây thơ)
                <path
                  id="face-contour-round"
                  d="M180,54 C199,54 203.5,67 202.5,84 C201.5,96 193,103 180,103.5 C167,103 158.5,96 157.5,84 C156.5,67 161,54 180,54 Z"
                  fill="url(#skinToneGrad)"
                  stroke={skinShade}
                  strokeWidth="0.9"
                />
              ) : isMale ? (
                // 2. MẶT NAM THẬT SỰ NAM TÍNH: Quai hàm vuông góc cạnh, cằm phẳng đĩnh đạc, xương gò má rõ
                <g id="male-head-sculpt">
                  {/* Đường nét khuôn mặt nam: Trán rộng, gò má góc cạnh, xương hàm bạnh nam tính, cằm vuông */}
                  <path
                    id="face-contour-male"
                    d="M180,50 C201,50 205,62 203.5,78 L201,89 L194,99 L186,104.5 L174,104.5 L166,99 L159,89 L156.5,78 C155,62 159,50 180,50 Z"
                    fill="url(#skinToneGrad)"
                    stroke="#5A4333"
                    strokeWidth="1.2"
                  />
                  {/* Đổ bóng Cel-shading mảng khối xương hàm & cằm dưới nam */}
                  <path
                    d="M166,99 L174,104.5 L186,104.5 L194,99 L188,103 L172,103 Z"
                    fill={skinShade}
                    opacity="0.75"
                  />
                  {/* Khối đổ bóng nhẹ góc hàm trái & phải */}
                  <path d="M159,89 L166,99 L163,94 Z" fill={skinShade} opacity="0.6" />
                  <path d="M201,89 L194,99 L197,94 Z" fill={skinShade} opacity="0.6" />
                  {/* Đường line góc hàm nam tính dứt khoát */}
                  <path d="M159,88 L166,99 L174,104.5" stroke="#6B4C38" strokeWidth="1" fill="none" opacity="0.7" />
                  <path d="M201,88 L194,99 L186,104.5" stroke="#6B4C38" strokeWidth="1" fill="none" opacity="0.7" />
                </g>
              ) : (
                // 3. MẶT TRÁI XOAN NỮ (Thanh tú, cằm V-line đoan trang như hoa khôi áo dài)
                <path
                  id="face-contour-oval"
                  d="M180,54 C198,54 201,66 200,82 C199,94 191,104.5 180,105 C169,104.5 161,94 160,82 C159,66 162,54 180,54 Z"
                  fill="url(#skinToneGrad)"
                  stroke={skinShade}
                  strokeWidth="0.9"
                />
              )}

              {/* Phấn má: CHỈ DÀNH CHO NỮ (Tuyệt đối không trang điểm má hồng cho nhân vật nam) */}
              {!isMale && (
                <g id="female-makeup-blush">
                  <circle cx="167" cy="85" r="7.5" fill="url(#animeBlushGrad)" />
                  <circle cx="193" cy="85" r="7.5" fill="url(#animeBlushGrad)" />
                  <line x1="163" y1="86" x2="167" y2="84" stroke="#F43F5E" strokeWidth="0.7" strokeOpacity="0.45" strokeLinecap="round" />
                  <line x1="165" y1="88" x2="169" y2="86" stroke="#F43F5E" strokeWidth="0.7" strokeOpacity="0.45" strokeLinecap="round" />
                  <line x1="191" y1="86" x2="195" y2="84" stroke="#F43F5E" strokeWidth="0.7" strokeOpacity="0.45" strokeLinecap="round" />
                  <line x1="193" y1="88" x2="197" y2="86" stroke="#F43F5E" strokeWidth="0.7" strokeOpacity="0.45" strokeLinecap="round" />
                </g>
              )}

              {/* CHÂN MÀY:
                  - Nữ: Chân mày lá liễu thanh mảnh, cong vút nhẹ nhàng
                  - Nam: Chân mày kiếm dày, sẫm màu, rậm tự nhiên, hơi dốc nhẹ nam tính, nằm gần mắt
              */}
              {isMale ? (
                <g id="male-sword-eyebrows">
                  {/* Mày kiếm rậm bên trái: Đậm, góc cạnh, đuôi xếch nhẹ */}
                  <polygon points="163,69 171,64 179,66 179,68.5 171,67 163,71" fill="#1C140E" />
                  {/* Mày kiếm rậm bên phải: Đối xứng đanh thép */}
                  <polygon points="197,69 189,64 181,66 181,68.5 189,67 197,71" fill="#1C140E" />
                </g>
              ) : (
                <g id="female-eyebrows">
                  <path d="M165,68 Q171.5,64 177.5,67.5" stroke="#3A281D" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                  <path d="M182.5,67.5 Q188.5,64 195,68" stroke="#3A281D" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* ======================================================= */}
              {/* ĐÔI MẮT:
                  - Nữ: To tròn, long lanh, hai mí cong vút, đốm sáng lấp lánh poster
                  - Nam: Dáng mắt kiếm ngang, hẹp và nhỏ hơn nữ, không mi cong dài, không lấp lánh nhũ, ánh nhìn tự tin đĩnh đạc
              */}
              {/* ======================================================= */}
              {isMale ? (
                <g id="male-eyes-confident">
                  {/* MẮT TRÁI NAM (Mắt kiếm hẹp, cương nghị) */}
                  <g id="male-left-eye">
                    {/* Tròng trắng mắt ngang thanh lịch */}
                    <path d="M166,76.5 Q172.5,73.5 178.5,76.5 Q172.5,80 166,76.5 Z" fill="#F8FAFC" />
                    {/* Tròng đen/nâu hổ phách trầm lắng */}
                    <ellipse cx="172.5" cy="76.6" rx="3.0" ry="3.2" fill="#201610" />
                    <ellipse cx="172.5" cy="76.6" rx="1.6" ry="1.8" fill="#0C0704" />
                    {/* Điểm sáng tự nhiên tối giản (không lấp lánh như nữ) */}
                    <circle cx="171.6" cy="75.6" r="0.75" fill="#FFFFFF" fillOpacity="0.85" />
                    {/* Mí trên dứt khoát, góc cạnh */}
                    <path d="M165.5,76.2 Q172,73.2 179,76" stroke="#1C140E" strokeWidth="2.0" strokeLinecap="round" fill="none" />
                    {/* Mí dưới mảnh nam tính */}
                    <path d="M167,77.5 Q172.5,80.2 178,77.5" stroke="#5A3E2D" strokeWidth="0.85" strokeOpacity="0.7" strokeLinecap="round" fill="none" />
                    {/* Nếp mí gấp nhẹ nam tính */}
                    <path d="M167.5,73.8 Q172.5,72.2 177,73.8" stroke="#7A5641" strokeWidth="0.75" strokeOpacity="0.5" fill="none" />
                  </g>

                  {/* MẮT PHẢI NAM */}
                  <g id="male-right-eye">
                    {/* Tròng trắng mắt */}
                    <path d="M181.5,76.5 Q187.5,73.5 194,76.5 Q187.5,80 181.5,76.5 Z" fill="#F8FAFC" />
                    {/* Tròng mắt */}
                    <ellipse cx="187.5" cy="76.6" rx="3.0" ry="3.2" fill="#201610" />
                    <ellipse cx="187.5" cy="76.6" rx="1.6" ry="1.8" fill="#0C0704" />
                    {/* Điểm sáng tự nhiên */}
                    <circle cx="186.6" cy="75.6" r="0.75" fill="#FFFFFF" fillOpacity="0.85" />
                    {/* Mí trên dứt khoát */}
                    <path d="M181,76 Q188,73.2 194.5,76.2" stroke="#1C140E" strokeWidth="2.0" strokeLinecap="round" fill="none" />
                    {/* Mí dưới */}
                    <path d="M182,77.5 Q187.5,80.2 193,77.5" stroke="#5A3E2D" strokeWidth="0.85" strokeOpacity="0.7" strokeLinecap="round" fill="none" />
                    {/* Nếp mí */}
                    <path d="M183,73.8 Q187.5,72.2 192.5,73.8" stroke="#7A5641" strokeWidth="0.75" strokeOpacity="0.5" fill="none" />
                  </g>
                </g>
              ) : (
                <g id="female-eyes-anime">
                  {/* MẮT TRÁI NỮ */}
                  <g id="poster-left-eye">
                    <ellipse cx="172.5" cy="76.5" rx="5.2" ry="4.5" fill="#FFFDFB" />
                    <path d="M167.5,71.5 Q172.5,69.5 177.5,71.8" stroke="#7A5641" strokeWidth="0.85" strokeOpacity="0.65" strokeLinecap="round" fill="none" />
                    <ellipse cx="172.5" cy="76.5" rx="4.0" ry="4.8" fill="url(#animeIrisGrad)" />
                    <ellipse cx="172.5" cy="75.8" rx="2.2" ry="2.6" fill="#120B07" />
                    <path d="M170,78.5 Q172.5,80.5 175,78.5" stroke="#D97706" strokeWidth="1" strokeOpacity="0.75" fill="none" strokeLinecap="round" />
                    <circle cx="170.8" cy="74.4" r="1.55" fill="#FFFFFF" />
                    <circle cx="174.2" cy="78.2" r="0.85" fill="#FFFFFF" fillOpacity="0.9" />
                    <circle cx="169.8" cy="77.8" r="0.45" fill="#FFFFFF" fillOpacity="0.75" />
                    <path d="M166.5,75.8 Q172.5,70.5 178.5,75.2" stroke="#140D09" strokeWidth="2.3" strokeLinecap="round" fill="none" />
                    <path d="M166.8,75.6 Q165.2,74.6 164.2,75.2" stroke="#140D09" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M168.5,79.5 Q172.5,81.2 176.5,79.5" stroke="#5A3E2D" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                  </g>

                  {/* MẮT PHẢI NỮ */}
                  <g id="poster-right-eye">
                    <ellipse cx="187.5" cy="76.5" rx="5.2" ry="4.5" fill="#FFFDFB" />
                    <path d="M182.5,71.8 Q187.5,69.5 192.5,71.5" stroke="#7A5641" strokeWidth="0.85" strokeOpacity="0.65" strokeLinecap="round" fill="none" />
                    <ellipse cx="187.5" cy="76.5" rx="4.0" ry="4.8" fill="url(#animeIrisGrad)" />
                    <ellipse cx="187.5" cy="75.8" rx="2.2" ry="2.6" fill="#120B07" />
                    <path d="M185,78.5 Q187.5,80.5 190,78.5" stroke="#D97706" strokeWidth="1" strokeOpacity="0.75" fill="none" strokeLinecap="round" />
                    <circle cx="185.8" cy="74.4" r="1.55" fill="#FFFFFF" />
                    <circle cx="189.2" cy="78.2" r="0.85" fill="#FFFFFF" fillOpacity="0.9" />
                    <circle cx="184.8" cy="77.8" r="0.45" fill="#FFFFFF" fillOpacity="0.75" />
                    <path d="M181.5,75.2 Q187.5,70.5 193.5,75.8" stroke="#140D09" strokeWidth="2.3" strokeLinecap="round" fill="none" />
                    <path d="M193.2,75.6 Q194.8,74.6 195.8,75.2" stroke="#140D09" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M183.5,79.5 Q187.5,81.2 191.5,79.5" stroke="#5A3E2D" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" fill="none" />
                  </g>
                </g>
              )}

              {/* SỐNG MŨI:
                  - Nữ: Nhỏ gọn, thanh tú, có chấm sáng giọt nước
                  - Nam: Sống mũi cao, thẳng tắp, có góc cạnh nam tính, cánh mũi rõ nét
              */}
              {isMale ? (
                <g id="male-nose-sharp">
                  {/* Sống mũi cao thẳng dứt khoát */}
                  <line x1="180" y1="72" x2="180" y2="84.5" stroke="#7A5641" strokeWidth="1.3" />
                  {/* Đổ bóng góc cạnh sống mũi */}
                  <path d="M178.5,74 L180,72 L180,84.5 L177.5,85.5 Z" fill={skinShade} opacity="0.45" />
                  {/* Cánh mũi và chóp mũi nam rõ ràng */}
                  <path d="M176.5,85.5 Q180,86.8 183.5,85.5" stroke="#5C3B27" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M175.5,84.5 Q176.5,86 178,86" stroke="#7A5641" strokeWidth="0.9" fill="none" />
                  <path d="M184.5,84.5 Q183.5,86 182,86" stroke="#7A5641" strokeWidth="0.9" fill="none" />
                </g>
              ) : (
                <g id="female-nose-delicate">
                  <path d="M180,77 L180,81.5 Q181,83.2 182,82.4" stroke="#BA7A54" strokeWidth="0.95" fill="none" />
                  <circle cx="179.6" cy="80.6" r="0.65" fill="#FFFFFF" fillOpacity="0.6" />
                </g>
              )}

              {/* BỜ MÔI:
                  - Nữ: Cánh cung Cupid, căng mọng, phớt hồng đào, bắt sáng lip gloss
                  - Nam: Môi mỏng vừa, dáng ngang tự nhiên hoặc hơi mím nhẹ, màu da khỏe khoắn (không hồng đào nữ tính, không bóng son)
              */}
              {isMale ? (
                <g id="male-lips-natural">
                  {/* Đường phân môi ngang kiên nghị, tự tin */}
                  <path d="M174,92.5 Q180,92.8 186,92.5" stroke="#633C29" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  {/* Môi dưới tự nhiên, màu da ấm nhẹ */}
                  <path d="M176,93 Q180,95.5 184,93" stroke="#8C5E45" strokeWidth="1.1" strokeLinecap="round" fill="none" />
                  {/* Khối đổ bóng dưới môi dưới tạo cằm nam tính */}
                  <path d="M177,96.5 Q180,97.5 183,96.5" stroke={skinShade} strokeWidth="1.2" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
                </g>
              ) : (
                <g id="poster-cherry-smile">
                  {/* Môi dưới phớt hồng đào */}
                  <path d="M176.2,88.2 Q180,92.6 183.8,88.2" fill="url(#lipGrad)" />
                  {/* Đường viền môi cánh cung Cupid tươi cười */}
                  <path d="M175.5,87.8 Q180,90.2 184.5,87.8" stroke="#BE185D" strokeWidth="1.9" strokeLinecap="round" fill="none" />
                  {/* Điểm bắt sáng lip gloss */}
                  <ellipse cx="180" cy="89.8" rx="1.3" ry="0.6" fill="#FFFFFF" fillOpacity="0.8" />
                </g>
              )}
            </g>
          )}

          {/* Retro Glasses */}
          {hasGlasses && (
            <g id="retro-glasses">
              <ellipse cx="171" cy="76.5" rx="6.5" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
              <ellipse cx="189" cy="76.5" rx="6.5" ry="5" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="177.5" y1="76.5" x2="182.5" y2="76.5" stroke="#D4AF37" strokeWidth="1.2" />
            </g>
          )}

          {/* Pearl earrings (Treo đúng dái tai tự nhiên) */}
          {hasPearlEarring && (
            <g id="pearl-earrings">
              <circle cx="157.5" cy="86" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
              <circle cx="202.5" cy="86" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* LAYER 7: 6 KIỂU TÓC NGHỆ THUẬT 2D ANIME/WEBTOON TẢ CHI TIẾT    */}
        {/* ============================================================== */}
        <g id="front-hair-layer">
          {/* ============================================================== */}
          {/* HỆ TÓC NỮ (6 KIỂU CHÍNH THỨC)                                  */}
          {/* ============================================================== */}

          {/* 1. Nữ: Dài thẳng tự nhiên (Long Sleek Natural) */}
          {(hairstyle === 'long-straight-waist' || hairstyle === 'long-straight-natural' || hairstyle === 'long-flowing') && (
            <g id="front-hair-female-long-straight">
              {/* Crown volume overhead & nếp rẽ ngôi nhẹ */}
              <path
                d="M160,74 C158,50 172,44 179,44 C182,44 198,48 200,74 C194,58 186,52 181,52 L179,52 C174,52 166,58 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M179,44 Q180,48 179,52" stroke={hairDark} strokeWidth="1.2" fill="none" />
              <ellipse cx="180" cy="50" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Sợi tóc con lơ thơ (wisps) bay nhẹ trước trán */}
              <path d="M178,52 Q175,60 177,68" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <path d="M182,52 Q185,59 183,67" stroke={hairDark} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Mái vén hờ sau tai, vài sợi tóc mai mảnh buông dọc gò má, lộ rõ khuyên tai & kiềng */}
              <path d="M178,50 Q168,58 164,74 Q162,88 164,102" stroke={hairDark} strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M161,76 Q159,90 162,106" stroke={hairSoft} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              <path d="M182,50 Q192,58 196,74 Q198,88 196,102" stroke={hairDark} strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M199,76 Q201,90 198,106" stroke={hairSoft} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Dải tóc suôn mượt buông ngoài bờ vai (không che cổ áo hay kiềng bạc) */}
              <path
                d="M158,82 C154,108 148,155 146,205 C145,235 147,255 149,266 L152,260 L154,268 L156,258 C154,245 153,215 154,185 C156,150 162,108 164,85 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M158,82 C154,108 148,155 146,205 C145,235 147,255 149,266" stroke={hairDark} strokeWidth="1.2" fill="none" />
              <path d="M149,105 Q147,165 149,225" stroke={hairSheen} strokeWidth="1" fill="none" />

              <path
                d="M202,82 C206,108 212,155 214,205 C215,235 213,255 211,266 L208,260 L206,268 L204,258 C206,245 207,215 206,185 C204,150 198,108 196,85 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M202,82 C206,108 212,155 214,205 C215,235 213,255 211,266" stroke={hairDark} strokeWidth="1.2" fill="none" />
              <path d="M211,105 Q213,165 211,225" stroke={hairSheen} strokeWidth="1" fill="none" />
            </g>
          )}

          {/* 2. Nữ: Ngắn ngang vai uốn cụp nhẹ (Soft Bob Collarbone) */}
          {(hairstyle === 'short-bob-straight' || hairstyle === 'soft-bob-collarbone' || hairstyle === 'short-shoulder-length' || hairstyle === 'short-modern') && (
            <g id="front-hair-female-short-bob">
              {/* Đỉnh đầu bồng bềnh tự nhiên */}
              <path
                d="M160,74 C158,48 172,44 180,44 C188,44 202,48 200,74 C194,58 186,52 180,52 C174,52 166,58 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <line x1="180" y1="44" x2="180" y2="52" stroke={hairDark} strokeWidth="1.2" />
              <ellipse cx="180" cy="50" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Mái thưa kiểu Hàn nhẹ nhàng (Air bangs) */}
              <path d="M174,52 Q173,60 174,68" stroke={hairDark} strokeWidth="1" strokeLinecap="round" fill="none" />
              <path d="M178,52 Q178,61 178,70" stroke={hairDark} strokeWidth="1.1" strokeLinecap="round" fill="none" />
              <path d="M182,52 Q182,61 182,70" stroke={hairDark} strokeWidth="1.1" strokeLinecap="round" fill="none" />
              <path d="M186,52 Q187,60 186,68" stroke={hairDark} strokeWidth="1" strokeLinecap="round" fill="none" />

              {/* Mái ôm nhẹ lấy xương hàm giúp khuôn mặt thon gọn, đuôi cúp nhẹ chạm xương quai xanh */}
              <path
                d="M162,74 C156,92 152,112 154,134 C158,138 163,134 165,128 C163,116 161,98 165,80 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M162,74 C156,92 152,112 154,134" stroke={hairDark} strokeWidth="1.2" fill="none" />
              <path d="M156,92 Q154,115 160,130" stroke={hairSheen} strokeWidth="1.1" fill="none" />

              <path
                d="M198,74 C204,92 208,112 206,134 C202,138 197,134 195,128 C197,116 199,98 195,80 Z"
                fill="url(#hairFrontGrad)"
              />
              <path d="M198,74 C204,92 208,112 206,134" stroke={hairDark} strokeWidth="1.2" fill="none" />
              <path d="M204,92 Q206,115 200,130" stroke={hairSheen} strokeWidth="1.1" fill="none" />
            </g>
          )}

          {/* 3. Nữ: Tết hai bím năng động (Playful Twin Braids) */}
          {(hairstyle === 'braided-twin-waist' || hairstyle === 'playful-twin-braids' || hairstyle === 'braided-twin') && (
            <g id="front-hair-female-twin-braids">
              {/* Đỉnh đầu chia ngôi giữa tự nhiên & volume overhead */}
              <path
                d="M160,74 C159,48 172,44 179,44 C182,44 198,48 200,74 C194,58 186,52 181,52 L179,52 C174,52 166,58 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <line x1="179.5" y1="44" x2="180" y2="52" stroke={hairDark} strokeWidth="1.2" />
              <ellipse cx="180" cy="50" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Mái rẽ nhẹ, hai dải tóc mai uốn lơi buông trước tai */}
              <path d="M178,50 Q168,58 162,72 Q158,88 161,104" stroke={hairDark} strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M182,50 Q192,58 198,72 Q202,88 199,104" stroke={hairDark} strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M160,78 Q157,92 160,108" stroke={hairSheen} strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <path d="M200,78 Q203,92 200,108" stroke={hairSheen} strokeWidth="0.8" strokeLinecap="round" fill="none" />

              {/* Bím tết đuôi sam trái buông thả trước ngực (độ nới lỏng kiểu Gen Z, ngoài cổ áo) */}
              <g id="left-braid-clumps">
                <path d="M158,80 Q148,96 150,114 Q144,128 149,142 Q144,156 148,170 Q143,184 147,198 Q143,212 146,226 Q143,238 145,248" stroke={hairDark} strokeWidth="1.2" fill="none" />
                <ellipse cx="151" cy="98" rx="6" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="149" cy="112" rx="6.5" ry="7.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="150" cy="127" rx="6.2" ry="7.5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="148" cy="142" rx="5.8" ry="7.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="149" cy="157" rx="5.5" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="147" cy="172" rx="5.2" ry="6.8" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="148" cy="187" rx="4.8" ry="6.5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="146" cy="202" rx="4.5" ry="6.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="147" cy="216" rx="4.2" ry="6" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="145" cy="230" rx="3.8" ry="5.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="146" cy="242" rx="3.4" ry="5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                {/* Nơ vải mảnh buộc đuôi bím */}
                <ellipse cx="145" cy="248" rx="5" ry="2.5" fill="#E11D48" stroke="#9F1239" strokeWidth="0.6" />
                <circle cx="145" cy="248" r="1.5" fill="#FFE4E6" />
                <path d="M145,250 L143,263 L146,261 L148,264 L147,250 Z" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.8" />
              </g>

              {/* Bím tết đuôi sam phải buông thả trước ngực (độ nới lỏng kiểu Gen Z, ngoài cổ áo) */}
              <g id="right-braid-clumps">
                <path d="M202,80 Q212,96 210,114 Q216,128 211,142 Q216,156 212,170 Q217,184 213,198 Q217,212 214,226 Q217,238 215,248" stroke={hairDark} strokeWidth="1.2" fill="none" />
                <ellipse cx="209" cy="98" rx="6" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="211" cy="112" rx="6.5" ry="7.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="210" cy="127" rx="6.2" ry="7.5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="212" cy="142" rx="5.8" ry="7.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="211" cy="157" rx="5.5" ry="7" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="213" cy="172" rx="5.2" ry="6.8" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="212" cy="187" rx="4.8" ry="6.5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="214" cy="202" rx="4.5" ry="6.2" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="213" cy="216" rx="4.2" ry="6" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="215" cy="230" rx="3.8" ry="5.5" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
                <ellipse cx="214" cy="242" rx="3.4" ry="5" fill={hairMid} stroke={hairDark} strokeWidth="0.9" />
                {/* Nơ vải mảnh buộc đuôi bím */}
                <ellipse cx="215" cy="248" rx="5" ry="2.5" fill="#E11D48" stroke="#9F1239" strokeWidth="0.6" />
                <circle cx="215" cy="248" r="1.5" fill="#FFE4E6" />
                <path d="M215,250 L213,263 L216,261 L218,264 L217,250 Z" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.8" />
              </g>
            </g>
          )}

          {/* 4. Nữ: Tết 1 bím lệch vai phải (Side-Swept Braid - Right Shoulder) */}
          {(hairstyle === 'braided-single-side' || hairstyle === 'side-swept-braid') && (
            <g id="front-hair-female-side-braid">
              {/* Đỉnh đầu gạt tóc mềm sang phải */}
              <path
                d="M160,74 C159,48 174,44 182,44 C190,44 202,48 200,74 C193,58 185,52 178,53 C172,54 166,60 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="182" cy="50" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Vài sợi buông lơi tự nhiên bên vai trái tạo nét e ấp duyên dáng */}
              <path d="M165,58 Q161,72 162,90 Q160,105 164,118" stroke={hairDark} strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M168,64 Q164,80 166,96" stroke={hairSoft} strokeWidth="0.9" strokeLinecap="round" fill="none" />

              {/* Tóc gom lệch vắt sang vai phải */}
              <path
                d="M182,45 Q198,56 208,74 Q215,90 216,108 C214,104 208,86 198,70 Q188,58 182,45 Z"
                fill={hairMid}
              />
              <path d="M182,45 Q198,56 208,74 Q215,90 216,108" stroke={hairDark} strokeWidth="1.2" fill="none" />

              {/* Bím tết lơi kiểu đuôi cá mềm mại bên vai phải */}
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
                {/* Sợi tóc flyaways */}
                <path d="M223,126 Q228,136 224,148" stroke={hairDark} strokeWidth="0.8" fill="none" />
                <path d="M207,142 Q204,152 207,162" stroke={hairDark} strokeWidth="0.8" fill="none" />
                {/* Nơ vải mảnh đuôi bím */}
                <ellipse cx="218" cy="258" rx="5.5" ry="2.6" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="0.6" />
                <circle cx="218" cy="258" r="1.5" fill="#FCA5A5" />
                <path d="M218,261 L215,274 L218,272 L221,275 L220,261 Z" fill="url(#hairFrontGrad)" stroke={hairDark} strokeWidth="0.8" />
              </g>
            </g>
          )}

          {/* 5. Nữ: Búi lệch về phía bên phải (Asymmetrical Side Low Bun) */}
          {(hairstyle === 'side-bun-right' || hairstyle === 'asymmetrical-side-bun') && (
            <g id="front-hair-female-side-bun">
              {/* Đỉnh đầu bồng bềnh gom chéo nhẹ sang phải */}
              <path
                d="M160,74 C159,48 174,44 182,44 C192,44 202,48 200,74 C194,58 186,52 178,53 C172,54 166,60 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="182" cy="50" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Để rủ một lọn tóc mai uốn nhẹ bên tai đối diện (tai trái) */}
              <path d="M164,68 Q158,84 162,102 Q159,118 163,128" stroke={hairDark} strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M166,74 Q162,90 164,106" stroke={hairSoft} strokeWidth="0.9" strokeLinecap="round" fill="none" />

              {/* Lọn tóc mái phải lượn mềm vào khối búi */}
              <path d="M182,50 Q194,62 206,78 Q214,90 216,98" stroke={hairDark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M182,50 Q194,62 206,78" stroke={hairSheen} strokeWidth="1.2" fill="none" />

              {/* Khối búi cuộn hình hoa tròn thanh tú */}
              <g id="side-bun-front-flower">
                <path d="M208,86 Q220,80 228,88 Q234,100 226,108 Q214,112 208,102 Z" fill={hairMid} stroke={hairDark} strokeWidth="1" />
                <path d="M212,90 Q222,86 226,94 Q228,104 218,106" stroke={hairSheen} strokeWidth="1.6" fill="none" />
                <path d="M214,94 Q220,90 224,96" stroke={hairHalo} strokeWidth="1.2" fill="none" />
                {/* Khe cài trâm gỗ hoặc hoa cài nhỏ thanh nhã */}
                <line x1="206" y1="84" x2="228" y2="108" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
                <circle cx="217" cy="95" r="3.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
                <circle cx="217" cy="95" r="1.4" fill="#F43F5E" />
              </g>
            </g>
          )}

          {/* 6. Nữ: Gợn sóng dài nửa lưng (Mid-Back Soft Mermaid Waves) */}
          {(hairstyle === 'half-up-princess' || hairstyle === 'mid-back-mermaid-waves') && (
            <g id="front-hair-female-mermaid-waves">
              {/* Đỉnh đầu bồng bềnh volume overhead, không dính bết */}
              <path
                d="M160,74 C158,46 172,42 180,42 C188,42 202,46 200,74 C194,58 186,52 180,52 C174,52 166,58 160,74 Z"
                fill="url(#hairFrontGrad)"
              />
              <line x1="180" y1="42" x2="180" y2="52" stroke={hairDark} strokeWidth="1" />
              <ellipse cx="180" cy="48" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Lọn mái bay uốn sóng mềm mại ôm hai bên gò má */}
              <path d="M174,52 Q166,64 164,80 Q162,96 166,110" stroke={hairDark} strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M186,52 Q194,64 196,80 Q198,96 194,110" stroke={hairDark} strokeWidth="1.3" strokeLinecap="round" fill="none" />

              {/* Các lọn sóng ôm lấy bờ vai mà không che mất cổ áo hay kiềng bạc (nằm ở rìa ngoài) */}
              <path
                d="M160,82 Q152,115 158,150 Q150,185 156,220 Q152,245 154,258"
                stroke={hairDark}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M160,82 Q152,115 158,150 Q150,185 156,220"
                stroke={hairSheen}
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M200,82 Q208,115 202,150 Q210,185 204,220 Q208,245 206,258"
                stroke={hairDark}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M200,82 Q208,115 202,150 Q210,185 204,220"
                stroke={hairSheen}
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* HỆ TÓC NAM (6 KIỂU CHÍNH THỨC)                                  */}
          {/* ============================================================== */}

          {/* 1. Nam: Rẽ ngôi 7/3 thư sinh (Classic 7/3 Side Part) */}
          {(hairstyle === 'male-short-part' || hairstyle === 'classic-side-part-73') && (
            <g id="front-hair-male-73">
              {/* Đỉnh đầu & khối tóc sấy phồng rẽ ngôi 7/3 (ngôi tại x=173) */}
              <path
                d="M161,72 C160,50 170,44 173,44 C174,44 199,46 200,72 C196,56 188,52 174,52 L172,52 C168,52 163,58 161,72 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="186" cy="49" rx="10" ry="2" fill="url(#animeHalo)" />

              {/* Đường ngôi 7/3 sắc nét */}
              <line x1="173" y1="44" x2="173" y2="53" stroke={hairDark} strokeWidth="1.5" />

              {/* Phần mái 7 sấy phồng vuốt cong hình dấu phẩy (comma hair) */}
              <path
                d="M174,46 Q186,52 195,62 Q194,70 186,68 Q182,65 184,56 Z"
                fill={hairMid}
                stroke={hairDark}
                strokeWidth="1.2"
              />
              <path d="M175,50 Q186,57 194,64" stroke={hairSheen} strokeWidth="1.2" fill="none" />
              <path d="M178,54 Q186,60 190,66" stroke={hairHalo} strokeWidth="0.9" fill="none" />

              {/* Phần mái 3 bên trái vén gọn */}
              <path
                d="M172,46 Q166,54 163,64 C164,66 167,62 171,54 Z"
                fill={hairSoft}
                stroke={hairDark}
                strokeWidth="1"
              />

              {/* Hai bên mai tỉa gọn gàng khoe góc hàm nam tính */}
              <path d="M161,70 L161,84" stroke={hairDark} strokeWidth="2" strokeLinecap="round" />
              <path d="M199,70 L199,84" stroke={hairDark} strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* 2. Nam: Búi củ tỏi cổ trang cách tân (Heritage Topknot / Man Bun) */}
          {(hairstyle === 'male-topknot-bun' || hairstyle === 'heritage-topknot-bun') && (
            <g id="front-hair-male-topknot">
              {/* Chân tóc trán cong sạch sẽ, để lộ trán cao sáng sủa, nét phong trần chốn kinh kỳ xưa */}
              <path
                d="M161,72 C160,54 170,48 180,48 C190,48 200,54 199,72 C196,62 188,58 180,58 C172,58 164,62 161,72 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="180" cy="52" rx="14" ry="2" fill="url(#animeHalo)" />

              {/* Đường chân tóc sạch sẽ lộ trán */}
              <path d="M165,66 C170,60 175,58 180,58 C185,58 190,60 195,66" stroke={hairDark} strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* Tóc mai gọn gàng hai bên */}
              <line x1="162" y1="72" x2="162" y2="82" stroke={hairDark} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="198" y1="72" x2="198" y2="82" stroke={hairDark} strokeWidth="1.8" strokeLinecap="round" />
              {/* Vài sợi tóc mai tơ mảnh */}
              <path d="M163,80 Q161,86 163,90" stroke={hairSoft} strokeWidth="0.8" fill="none" />
              <path d="M197,80 Q199,86 197,90" stroke={hairSoft} strokeWidth="0.8" fill="none" />
            </g>
          )}

          {/* 3. Nam: Layer mái rũ Ghibli (Shaggy Ghibli Flow) */}
          {(hairstyle === 'male-curtain-layers' || hairstyle === 'shaggy-ghibli-flow') && (
            <g id="front-hair-male-ghibli">
              {/* Đỉnh đầu bồng bềnh volume overhead */}
              <path
                d="M159,72 C158,46 170,42 180,42 C190,42 202,46 201,72 C196,56 188,50 180,50 C172,50 164,56 159,72 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="180" cy="48" rx="16" ry="2.2" fill="url(#animeHalo)" />

              {/* Các thớ tóc layer mái rủ chạm nhẹ lông mày với các thớ tóc tơi xốp, đánh rối nhẹ lãng mạn Ghibli */}
              <path
                d="M162,60 L166,72 L171,64 L175,73 L180,63 L185,74 L190,64 L195,73 L198,60"
                stroke={hairDark}
                strokeWidth="1.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cel-shading từng lọn layer */}
              <path d="M172,52 L175,71 L178,64" fill={hairMid} stroke={hairDark} strokeWidth="1" />
              <path d="M181,52 L185,72 L188,64" fill={hairMid} stroke={hairDark} strokeWidth="1" />
              <path d="M166,54 L169,68 L171,62" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />
              <path d="M189,54 L192,69 L195,62" fill={hairSoft} stroke={hairDark} strokeWidth="0.9" />

              {/* Hai bên mai tỉa layer ôm nhẹ mang tai */}
              <path d="M160,70 Q158,82 161,92" stroke={hairDark} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M200,70 Q202,82 199,92" stroke={hairDark} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 4. Nam: Tóc ngắn tân thời (Modern Short Taper / Crew Cut) */}
          {(hairstyle === 'male-short-neat' || hairstyle === 'modern-short-taper') && (
            <g id="front-hair-male-short-neat">
              {/* Đỉnh đầu chải phồng nhẹ tự nhiên 4-5cm gọn gàng đĩnh đạc */}
              <path
                d="M162,68 C161,48 171,44 180,44 C189,44 199,48 198,68 C195,54 188,50 180,50 C172,50 165,54 162,68 Z"
                fill="url(#hairFrontGrad)"
              />
              <ellipse cx="180" cy="49" rx="14" ry="2" fill="url(#animeHalo)" />

              {/* Nếp chải texture gọn gàng thanh lịch */}
              <path d="M170,52 Q175,48 180,52" stroke={hairSheen} strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M180,52 Q185,48 190,52" stroke={hairSheen} strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M174,56 Q180,53 186,56" stroke={hairDark} strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Chân tóc trán sạch sẽ */}
              <path d="M166,64 C171,58 176,56 180,56 C184,56 189,58 194,64" stroke={hairDark} strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* Mai và gáy tỉa mờ thanh lịch (tapered fade) khoe góc hàm */}
              <line x1="162" y1="68" x2="162" y2="80" stroke={hairDark} strokeWidth="1.8" opacity="0.8" />
              <line x1="198" y1="68" x2="198" y2="80" stroke={hairDark} strokeWidth="1.8" opacity="0.8" />
            </g>
          )}

          {/* 5. Nam: Bổ luống 5/5 lãng tử (Retro Middle Part Curtain) */}
          {(hairstyle === 'male-middle-curtain-55' || hairstyle === 'retro-middle-part-55') && (
            <g id="front-hair-male-curtain-55">
              {/* Rẽ ngôi chính giữa 5/5 rõ nét tại x=180 */}
              <path
                d="M160,72 C159,48 170,44 179,44 L181,44 C190,44 201,48 200,72 C195,58 188,52 181,52 L179,52 C172,52 165,58 160,72 Z"
                fill="url(#hairFrontGrad)"
              />
              <line x1="180" y1="44" x2="180" y2="53" stroke={hairDark} strokeWidth="1.5" />
              <ellipse cx="180" cy="49" rx="16" ry="2" fill="url(#animeHalo)" />

              {/* Cánh rèm chữ C trái: uốn cong sang trái ôm trọn gò má */}
              <path
                d="M179,48 C172,52 165,62 166,76 C168,76 170,70 172,64 C175,56 178,52 179,48 Z"
                fill={hairMid}
                stroke={hairDark}
                strokeWidth="1.2"
              />
              <path d="M178,50 C171,55 167,64 167,74" stroke={hairSheen} strokeWidth="1.1" fill="none" />

              {/* Cánh rèm chữ C phải: uốn cong sang phải ôm trọn gò má */}
              <path
                d="M181,48 C188,52 195,62 194,76 C192,76 190,70 188,64 C185,56 182,52 181,48 Z"
                fill={hairMid}
                stroke={hairDark}
                strokeWidth="1.2"
              />
              <path d="M182,50 C189,55 193,64 193,74" stroke={hairSheen} strokeWidth="1.1" fill="none" />

              {/* Hai bên mai tỉa gọn gàng */}
              <line x1="161" y1="72" x2="161" y2="82" stroke={hairDark} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="199" y1="72" x2="199" y2="82" stroke={hairDark} strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}

          {/* 6. Nam: Tóc vuốt Slicked-back Quiff thanh lịch (Slicked-Back Quiff) */}
          {(hairstyle === 'male-textured-undercut' || hairstyle === 'male-slicked-back-quiff' || hairstyle === 'modern-textured-fade') && (
            <g id="front-hair-male-slicked-quiff">
              {/* Vuốt ngược ra sau nhẹ nhàng giữ độ phồng tự nhiên (không bóng nhẫy keo) */}
              <path
                d="M162,68 C161,46 170,40 180,40 C190,40 199,46 198,68 C195,54 188,48 180,48 C172,48 165,54 162,68 Z"
                fill="url(#hairFrontGrad)"
              />
              {/* Khối quiff vuốt ngược trên đỉnh đầu */}
              <path
                d="M167,56 C167,42 173,38 180,38 C187,38 193,42 193,56 C190,50 185,46 180,46 C175,46 170,50 167,56 Z"
                fill={hairMid}
                stroke={hairDark}
                strokeWidth="1.2"
              />
              {/* Nếp chải vuốt ngược ra sau mượt mà */}
              <path d="M172,54 Q176,42 180,42 Q184,42 188,54" stroke={hairSheen} strokeWidth="1.3" fill="none" />
              <path d="M175,52 Q178,44 180,44 Q182,44 185,52" stroke={hairHalo} strokeWidth="1.1" fill="none" />
              <ellipse cx="180" cy="45" rx="10" ry="2" fill="url(#animeHalo)" />

              {/* Chân tóc trán vuốt ngược sạch sẽ, tôn trọn vầng trán cao sáng sủa */}
              <path d="M166,62 C171,54 176,52 180,52 C184,52 189,54 194,62" stroke={hairDark} strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Hai bên mai tỉa mờ thanh lịch khoe góc hàm */}
              <line x1="162" y1="66" x2="162" y2="80" stroke={hairDark} strokeWidth="1.8" opacity="0.8" />
              <line x1="198" y1="66" x2="198" y2="80" stroke={hairDark} strokeWidth="1.8" opacity="0.8" />
            </g>
          )}

          {/* Các kiểu phụ tương thích ngược */}
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
      {effectiveShowDetails && (
        <div className="w-full z-20 px-3 pb-3 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-[#4A3B32] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#8B1E1E]" />
              {isMale ? 'Kiểu Tóc Nam Đĩnh Đạc (6 Kiểu)' : 'Kiểu Tóc Nữ Anime (6 Kiểu)'}
            </span>
            <span className="text-[10px] text-[#8C7A6B]">
              {isMale ? '6 kiểu tóc nam tính Gen Z' : '6 mẫu ma-nơ-canh mini'}
            </span>
          </div>

          {/* 6 Thumbnail Cards Row */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 bg-white/90 backdrop-blur-md rounded-2xl border border-[#D8C7B0] shadow-xs scrollbar-none">
            {(isMale ? [
              { id: 'male-short-part' as Hairstyle, name: '1. Rẽ ngôi 7/3', sub: 'Thư sinh comma' },
              { id: 'male-topknot-bun' as Hairstyle, name: '2. Búi củ tỏi', sub: 'Cổ trang trâm gỗ' },
              { id: 'male-curtain-layers' as Hairstyle, name: '3. Layer Ghibli', sub: 'Mái rủ lãng tử' },
              { id: 'male-short-neat' as Hairstyle, name: '4. Ngắn tân thời', sub: 'Tapered đĩnh đạc' },
              { id: 'male-middle-curtain-55' as Hairstyle, name: '5. Bổ luống 5/5', sub: 'Lãng tử chữ C' },
              { id: 'male-textured-undercut' as Hairstyle, name: '6. Slicked Quiff', sub: 'Vuốt ngược đĩnh đạc' },
            ] : [
              { id: 'long-straight-waist' as Hairstyle, name: '1. Dài thẳng', sub: 'Suôn tơi layer' },
              { id: 'short-bob-straight' as Hairstyle, name: '2. Ngắn vai', sub: 'Cúp nhẹ air-bangs' },
              { id: 'braided-twin-waist' as Hairstyle, name: '3. Tết 2 bím', sub: 'Phồng lơi Gen Z' },
              { id: 'braided-single-side' as Hairstyle, name: '4. Bím vai phải', sub: 'Đuôi cá lệch e ấp' },
              { id: 'side-bun-right' as Hairstyle, name: '5. Búi lệch phải', sub: 'Búi hoa mai lơi' },
              { id: 'half-up-princess' as Hairstyle, name: '6. Sóng nửa lưng', sub: 'Mermaid mềm mại' },
            ]).map((item) => (
              <HairThumbnailCard
                key={item.id}
                id={item.id}
                name={item.name}
                sub={item.sub}
                hairColor={hairColorHex}
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
              <span>Mặt: <strong className="text-[#8B1E1E]">{faceShape === 'oval' ? 'Trái xoan' : 'Mặt tròn'}</strong></span>
              {isHoldingFan && (
                <>
                  <span className="text-[#D8C7B0]">|</span>
                  <span className="text-[#8B1E1E] font-bold">🪭 Quạt xếp mẫu</span>
                </>
              )}
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
      )}
    </div>
  );
};

export default AvatarMannequin;
