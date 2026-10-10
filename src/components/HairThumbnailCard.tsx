import React from 'react';
import { Hairstyle } from '../types/costume';

interface HairThumbnailCardProps {
  id: Hairstyle;
  name: string;
  sub: string;
  isSelected: boolean;
  onSelect: () => void;
  hairColor?: string;
}

export const HairThumbnailCard: React.FC<HairThumbnailCardProps> = ({
  id,
  name,
  sub,
  isSelected,
  onSelect,
  hairColor = '#1A1A1A',
}) => {
  // Determine gradient tones based on chosen hair color
  const colorTone = 
    hairColor === '#2E2E32' ? { dark: '#1A1A1D', mid: '#2E2E32', light: '#4E4E58', halo: '#9696A8' } :
    hairColor === '#4A3728' ? { dark: '#281C13', mid: '#4A3728', light: '#6F533D', halo: '#BA9776' } :
    hairColor === '#5C4033' ? { dark: '#322018', mid: '#5C4033', light: '#865F4D', halo: '#C89E86' } :
    { dark: '#111111', mid: '#1A1A1A', light: '#333333', halo: '#777777' };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-center justify-between p-2 rounded-2xl border transition-all cursor-pointer shrink-0 w-[90px] sm:w-[98px] h-[116px] text-center select-none ${
        isSelected
          ? 'bg-gradient-to-b from-white to-[#FDF4EE] border-[#8B1E1E] ring-2 ring-[#8B1E1E]/30 shadow-md scale-[1.02]'
          : 'bg-[#FAF7F2]/95 hover:bg-white border-[#E4D7C5] hover:border-[#CBB59C] shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Active Indicator Pip */}
      {isSelected && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B1E1E] animate-pulse" />
      )}

      {/* Mini Mannequin Head with Hairstyle SVG */}
      <div className="w-[58px] h-[64px] flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#F9F5F0] to-[#EFE8DE] border border-[#E5DACB]/80 shadow-inner group-hover:scale-105 transition-transform duration-200">
        <svg viewBox="0 0 100 110" className="w-full h-full">
          <defs>
            <linearGradient id={`thumbHairGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colorTone.dark} />
              <stop offset="50%" stopColor={colorTone.mid} />
              <stop offset="100%" stopColor={colorTone.light} />
            </linearGradient>
            <linearGradient id={`thumbHalo-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorTone.light} stopOpacity="0" />
              <stop offset="50%" stopColor={colorTone.halo} stopOpacity="0.85" />
              <stop offset="100%" stopColor={colorTone.light} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Mini Neck & Shoulders with Vietnamese Collar outline */}
          <path d="M44,68 L56,68 L58,84 L42,84 Z" fill="#FDEDEC" />
          {/* Collar Stand */}
          <path d="M41,74 Q50,71 59,74 L58,82 Q50,79 42,82 Z" fill="#FFFFFF" stroke="#D8C7B0" strokeWidth="0.8" />
          <path d="M30,84 Q50,78 70,84 L74,106 L26,106 Z" fill="#F4EFE6" stroke="#D8C7B0" strokeWidth="0.8" />

          {/* Mini Head (Mặt trái xoan anime) */}
          <path
            d="M50,28 C64,28 68,39 68,52 C68,64 60,72 50,73 C40,72 32,64 32,52 C32,39 36,28 50,28 Z"
            fill="#FDEDEC"
          />
          {/* Mini anime eyes & blush */}
          <ellipse cx="43" cy="50" rx="2" ry="1.4" fill="#18181B" />
          <ellipse cx="57" cy="50" rx="2" ry="1.4" fill="#18181B" />
          <circle cx="43.5" cy="49.5" r="0.6" fill="#FFFFFF" />
          <circle cx="57.5" cy="49.5" r="0.6" fill="#FFFFFF" />
          <circle cx="40" cy="56" r="3" fill="#F5B7B1" fillOpacity="0.45" />
          <circle cx="60" cy="56" r="3" fill="#F5B7B1" fillOpacity="0.45" />
          <path d="M47,59 Q50,61.5 53,59" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* ============================================================== */}
          {/* HỆ TÓC NỮ (6 KIỂU)                                             */}
          {/* ============================================================== */}

          {/* 1. DÀI THẲNG TỰ NHIÊN (Long Sleek Natural) */}
          {(id === 'long-straight-waist' || id === 'long-straight-natural' || id === 'long-flowing') && (
            <g>
              {/* Back long hair suôn mượt vát nhọn layer */}
              <path d="M30,42 C24,60 22,85 24,106 L34,101 L40,105 L48,102 L54,106 L62,102 L68,105 L76,101 C78,85 76,60 70,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Crown with soft volume overhead & halo */}
              <path d="M31,44 C30,22 43,17 50,17 C57,17 70,22 69,44 C64,32 55,27 50,27 C45,27 36,32 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              <ellipse cx="50" cy="23" rx="14" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Wispy hairline & side strands */}
              <path d="M49,20 Q44,30 38,48" stroke={colorTone.dark} strokeWidth="1" fill="none" />
              <path d="M51,20 Q56,30 62,48" stroke={colorTone.dark} strokeWidth="1" fill="none" />
              <path d="M36,50 Q31,70 33,96" stroke={colorTone.dark} strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M64,50 Q69,70 67,96" stroke={colorTone.dark} strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 2. NGẮN NGANG VAI UỐN CỤP NHẸ (Soft Bob Collarbone) */}
          {(id === 'short-bob-straight' || id === 'soft-bob-collarbone' || id === 'short-shoulder-length' || id === 'short-modern') && (
            <g>
              {/* Back hair bob cúp nhẹ */}
              <path d="M28,42 C25,58 26,72 32,80 L40,78 L50,80 L60,78 L68,80 C74,72 75,58 72,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Crown overhead volume */}
              <path d="M31,44 C30,22 43,18 50,18 C57,18 70,22 69,44 C64,30 55,26 50,26 C45,26 36,30 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              <ellipse cx="50" cy="23" rx="14" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Air bangs mái thưa nhẹ nhàng */}
              <line x1="46" y1="26" x2="46" y2="38" stroke={colorTone.dark} strokeWidth="0.9" />
              <line x1="50" y1="26" x2="50" y2="39" stroke={colorTone.dark} strokeWidth="0.9" />
              <line x1="54" y1="26" x2="54" y2="38" stroke={colorTone.dark} strokeWidth="0.9" />
              {/* Curved soft bob tips ôm xương hàm */}
              <path d="M32,46 Q26,62 33,76 Q38,78 40,72" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.8" />
              <path d="M68,46 Q74,62 67,76 Q62,78 60,72" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.8" />
            </g>
          )}

          {/* 3. TẾT HAI BÍM NĂNG ĐỘNG (Playful Twin Braids) */}
          {(id === 'braided-twin-waist' || id === 'playful-twin-braids' || id === 'braided-twin') && (
            <g>
              <path d="M31,44 C30,22 43,18 50,18 C57,18 70,22 69,44 C64,30 55,26 50,26 C45,26 36,30 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              <line x1="50" y1="18" x2="50" y2="28" stroke={colorTone.dark} strokeWidth="0.8" />
              <ellipse cx="50" cy="22" rx="13" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Wisps */}
              <path d="M42,26 Q36,36 36,52" stroke={colorTone.dark} strokeWidth="1.2" fill="none" />
              <path d="M58,26 Q64,36 64,52" stroke={colorTone.dark} strokeWidth="1.2" fill="none" />
              {/* Left Braid */}
              <ellipse cx="28" cy="56" rx="4" ry="5" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="27" cy="65" rx="3.8" ry="4.8" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="28" cy="74" rx="3.5" ry="4.5" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="27" cy="83" rx="3.2" ry="4.2" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="28" cy="91" rx="2.8" ry="3.8" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <rect x="26" y="94" width="4" height="2" rx="1" fill="#DC2626" />
              <line x1="28" y1="96" x2="28" y2="103" stroke={colorTone.dark} strokeWidth="1.5" />
              {/* Right Braid */}
              <ellipse cx="72" cy="56" rx="4" ry="5" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="73" cy="65" rx="3.8" ry="4.8" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="72" cy="74" rx="3.5" ry="4.5" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="73" cy="83" rx="3.2" ry="4.2" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="72" cy="91" rx="2.8" ry="3.8" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <rect x="70" y="94" width="4" height="2" rx="1" fill="#DC2626" />
              <line x1="72" y1="96" x2="72" y2="103" stroke={colorTone.dark} strokeWidth="1.5" />
            </g>
          )}

          {/* 4. TẾT 1 BÍM LỆCH VAI PHẢI (Side-Swept Braid) */}
          {(id === 'braided-single-side' || id === 'side-swept-braid') && (
            <g>
              <path d="M31,44 C30,22 43,18 52,18 C60,18 70,22 69,44 C64,30 56,26 50,26 C44,26 36,30 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Wispy bangs */}
              <line x1="46" y1="26" x2="46" y2="38" stroke={colorTone.dark} strokeWidth="0.9" />
              <line x1="50" y1="26" x2="50" y2="39" stroke={colorTone.dark} strokeWidth="0.9" />
              {/* Left loose wisp */}
              <path d="M35,42 Q31,58 35,70" stroke={colorTone.dark} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Sweeping into right thick braid */}
              <path d="M52,18 Q66,28 72,45" stroke={colorTone.dark} strokeWidth="2.5" fill="none" />
              <ellipse cx="73" cy="50" rx="5" ry="5.5" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="75" cy="59" rx="5.5" ry="6" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="74" cy="69" rx="5.2" ry="5.8" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="75" cy="79" rx="4.8" ry="5.4" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.6" />
              <ellipse cx="74" cy="89" rx="4.2" ry="5" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.6" />
              <rect x="72" y="93" width="4.5" height="2" rx="1" fill="#B91C1C" />
              <line x1="74" y1="95" x2="74" y2="104" stroke={colorTone.dark} strokeWidth="1.5" />
            </g>
          )}

          {/* 5. BÚI LỆCH VỀ PHÍA BÊN PHẢI (Asymmetrical Side Low Bun) */}
          {(id === 'side-bun-right' || id === 'asymmetrical-side-bun') && (
            <g>
              <ellipse cx="50" cy="38" rx="20" ry="18" fill={`url(#thumbHairGrad-${id})`} />
              <ellipse cx="50" cy="22" rx="13" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Voluminous asymmetrical side bun on right */}
              <circle cx="76" cy="52" r="14" fill={`url(#thumbHairGrad-${id})`} stroke={colorTone.dark} strokeWidth="0.8" />
              <path d="M70,48 Q78,42 84,49 Q88,58 78,61 Q70,58 70,50" stroke={colorTone.light} strokeWidth="1.2" fill="none" />
              {/* Trâm cài gỗ */}
              <line x1="68" y1="38" x2="84" y2="66" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="68" cy="38" r="2" fill="#EAB308" />
              {/* Wispy loose curls on left ear */}
              <path d="M34,44 Q30,60 34,74" stroke={colorTone.dark} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 6. GỢN SÓNG DÀI NỬA LƯNG (Mid-Back Soft Mermaid Waves) */}
          {(id === 'half-up-princess' || id === 'mid-back-mermaid-waves' || id === 'wavy-headband') && (
            <g>
              {/* Back wavy hair S-curve */}
              <path d="M30,44 Q22,65 28,85 Q24,98 32,106 L44,103 L50,105 L60,103 L68,106 Q76,98 72,85 Q78,65 70,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Crown pouf */}
              <ellipse cx="50" cy="22" rx="14" ry="8" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="0.8" />
              <ellipse cx="50" cy="23" rx="13" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Mermaid S-waves falling gently on shoulders */}
              <path d="M36,36 Q30,52 35,70 Q31,85 36,96" stroke={colorTone.dark} strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M64,36 Q70,52 65,70 Q69,85 64,96" stroke={colorTone.dark} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ============================================================== */}
          {/* HỆ TÓC NAM (6 KIỂU)                                             */}
          {/* ============================================================== */}

          {/* 1. RẼ NGÔI 7/3 THƯ SINH (Classic 7/3 Side Part) */}
          {(id === 'male-short-part' || id === 'classic-side-part-73') && (
            <g>
              <path d="M30,38 C30,22 42,16 50,16 C60,16 70,22 70,38 C68,48 64,52 64,52 C60,42 58,32 50,32 C42,32 40,42 36,52 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Parting 7/3 rõ nét */}
              <path d="M43,18 Q41,28 35,38" stroke={colorTone.dark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Comma hair curve */}
              <path d="M45,18 Q55,24 64,34 Q58,38 52,36" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="1.2" />
              <path d="M46,24 Q56,30 63,38" stroke={colorTone.light} strokeWidth="1.2" fill="none" />
              <ellipse cx="56" cy="20" rx="8" ry="1.8" fill={`url(#thumbHalo-${id})`} />
            </g>
          )}

          {/* 2. BÚI CỦ TỎI CỔ TRANG CÁCH TÂN (Heritage Topknot / Man Bun) */}
          {(id === 'male-topknot-bun' || id === 'heritage-topknot-bun') && (
            <g>
              {/* Slicked up hairline */}
              <path d="M32,40 C32,24 40,20 50,20 C60,20 68,24 68,40 C66,48 62,44 50,30 C38,44 34,48 32,40 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Topknot bun on crown with wooden hair pin */}
              <ellipse cx="50" cy="13" rx="9" ry="8" fill={colorTone.dark} stroke={colorTone.dark} strokeWidth="0.8" />
              <line x1="40" y1="11" x2="60" y2="15" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
              {/* Clean sideburns */}
              <line x1="33" y1="40" x2="33" y2="48" stroke={colorTone.dark} strokeWidth="1.5" />
              <line x1="67" y1="40" x2="67" y2="48" stroke={colorTone.dark} strokeWidth="1.5" />
            </g>
          )}

          {/* 3. LAYER MÁI RŨ GHIBLI (Shaggy Ghibli Flow) */}
          {(id === 'male-curtain-layers' || id === 'shaggy-ghibli-flow') && (
            <g>
              {/* Shaggy flow layers */}
              <path d="M29,42 C28,24 40,17 50,17 C60,17 72,24 71,42 C68,48 63,42 50,34 C37,42 32,48 29,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Messy anime tufts touching eyebrows */}
              <path d="M47,18 L43,36 L48,32 L53,38 L56,32 L60,37 L65,30" stroke={colorTone.dark} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
              <path d="M48,22 Q40,32 34,46" stroke={colorTone.dark} strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M52,22 Q60,32 66,46" stroke={colorTone.dark} strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 4. TÓC NGẮN TÂN THỜI (Modern Short Taper / Crew Cut) */}
          {(id === 'male-short-neat' || id === 'modern-short-taper') && (
            <g>
              {/* Clean tapered crop */}
              <path d="M32,38 C32,22 42,16 50,16 C58,16 68,22 68,38 C64,46 62,34 50,28 C38,34 36,46 32,38 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Top texture lines */}
              <path d="M40,24 Q48,21 56,24" stroke={colorTone.light} strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M42,27 Q50,24 58,28" stroke={colorTone.dark} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Fade gradient on sideburns */}
              <rect x="31" y="38" width="3" height="10" fill={colorTone.light} opacity="0.6" />
              <rect x="66" y="38" width="3" height="10" fill={colorTone.light} opacity="0.6" />
            </g>
          )}

          {/* 5. BỔ LUỐNG 5/5 LÃNG TỬ (Retro Middle Part Curtain) */}
          {(id === 'male-middle-curtain-55' || id === 'retro-middle-part-55') && (
            <g>
              <path d="M30,40 C30,22 41,17 50,17 C59,17 70,22 70,40 C67,48 64,44 50,32 C36,44 33,48 30,40 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Middle parting line */}
              <line x1="50" y1="17" x2="50" y2="28" stroke={colorTone.dark} strokeWidth="1" />
              <ellipse cx="50" cy="22" rx="14" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Left C-curve curtain */}
              <path d="M50,22 C42,25 36,36 37,50" stroke={colorTone.dark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M49,24 C43,28 38,38 39,48" stroke={colorTone.light} strokeWidth="1.2" fill="none" />
              {/* Right C-curve curtain */}
              <path d="M50,22 C58,25 64,36 63,50" stroke={colorTone.dark} strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M51,24 C57,28 62,38 61,48" stroke={colorTone.light} strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* 6. TÓC VUỐT SLICKED-BACK QUIFF THANH LỊCH (Slicked-Back Quiff) */}
          {(id === 'male-textured-undercut' || id === 'male-slicked-back-quiff' || id === 'modern-textured-fade') && (
            <g>
              {/* Back & side tapered base */}
              <path d="M33,42 C33,24 40,18 50,16 C60,18 67,24 67,42 C65,46 62,38 50,32 C38,38 35,46 33,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Voluminous pompadour/quiff swept back */}
              <path d="M38,28 C38,16 46,12 52,12 C60,12 64,16 64,28 C61,23 57,20 51,20 C45,20 41,23 38,28 Z" fill={colorTone.mid} stroke={colorTone.dark} strokeWidth="1" />
              {/* Brushback hair sweep lines */}
              <path d="M43,26 Q47,15 53,15 Q59,15 61,26" stroke={colorTone.light} strokeWidth="1.2" fill="none" />
              <path d="M47,24 Q50,17 54,17" stroke={colorTone.halo} strokeWidth="1" fill="none" />
              <ellipse cx="52" cy="18" rx="8" ry="1.8" fill={`url(#thumbHalo-${id})`} />
              {/* Clean hairline and exposed forehead */}
              <path d="M37,34 C41,30 46,28 50,28 C54,28 59,30 63,34" stroke={colorTone.dark} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Clean fade sideburns */}
              <line x1="33" y1="36" x2="33" y2="48" stroke={colorTone.dark} strokeWidth="1.2" opacity="0.6" />
              <line x1="67" y1="36" x2="67" y2="48" stroke={colorTone.dark} strokeWidth="1.2" opacity="0.6" />
            </g>
          )}
        </svg>
      </div>

      {/* Label and Subtitle */}
      <div className="w-full text-center px-0.5">
        <p className={`text-[10px] leading-tight font-bold truncate ${isSelected ? 'text-[#8B1E1E]' : 'text-[#2C241E]'}`}>
          {name}
        </p>
        <p className="text-[9px] text-[#8C7A6B] leading-tight truncate">
          {sub}
        </p>
      </div>
    </button>
  );
};

export default HairThumbnailCard;
