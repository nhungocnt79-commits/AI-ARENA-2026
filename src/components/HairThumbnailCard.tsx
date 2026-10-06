import React from 'react';
import { Hairstyle } from '../types/costume';

interface HairThumbnailCardProps {
  id: Hairstyle;
  name: string;
  sub: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const HairThumbnailCard: React.FC<HairThumbnailCardProps> = ({
  id,
  name,
  sub,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-center justify-between p-2 rounded-2xl border transition-all cursor-pointer shrink-0 w-[84px] sm:w-[94px] h-[106px] text-center select-none ${
        isSelected
          ? 'bg-gradient-to-b from-white to-[#FDF4EE] border-[#9B2C2C] ring-2 ring-[#9B2C2C]/30 shadow-md'
          : 'bg-[#FAF7F2]/90 hover:bg-white border-[#E4D7C5] hover:border-[#CBB59C] shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Active Indicator Pip */}
      {isSelected && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#9B2C2C] animate-pulse" />
      )}

      {/* Mini Mannequin Head with Hairstyle SVG */}
      <div className="w-[54px] h-[58px] flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#F9F5F0] to-[#EFE8DE] border border-[#E5DACB]/80 shadow-inner group-hover:scale-105 transition-transform duration-200">
        <svg viewBox="0 0 100 110" className="w-full h-full">
          <defs>
            <linearGradient id={`thumbHairGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E241E" />
              <stop offset="50%" stopColor="#221A15" />
              <stop offset="100%" stopColor="#14100D" />
            </linearGradient>
            <linearGradient id={`thumbHalo-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E5C4E" stopOpacity="0" />
              <stop offset="50%" stopColor="#A8927E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6E5C4E" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Mini Neck & Shoulders */}
          <path d="M44,68 L56,68 L58,84 L42,84 Z" fill="#FDEDEC" />
          <path d="M30,88 Q50,80 70,88 L74,106 L26,106 Z" fill="#F0ECE4" stroke="#D8C7B0" strokeWidth="0.8" />

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
          <circle cx="40" cy="56" r="3" fill="#F5B7B1" fillOpacity="0.4" />
          <circle cx="60" cy="56" r="3" fill="#F5B7B1" fillOpacity="0.4" />
          <path d="M47,59 Q50,61.5 53,59" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* HAIRSTYLE SPECIFIC MINI DRAWINGS */}
          {id === 'long-straight-waist' && (
            <g>
              {/* Back long hair */}
              <path d="M30,42 C24,60 22,85 24,106 L34,103 L40,106 L48,103 L54,106 L62,103 L68,106 L76,103 C78,85 76,60 70,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Front crown & curtain bangs */}
              <path d="M31,44 C30,24 43,18 50,18 C57,18 70,24 69,44 C64,32 55,27 50,27 C45,27 36,32 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              <ellipse cx="50" cy="24" rx="14" ry="2" fill={`url(#thumbHalo-${id})`} />
              <path d="M49,20 Q42,32 37,50" stroke="#14100D" strokeWidth="1" fill="none" />
              <path d="M51,20 Q58,32 63,50" stroke="#14100D" strokeWidth="1" fill="none" />
              <path d="M36,52 Q32,74 34,95" stroke="#14100D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M64,52 Q68,74 66,95" stroke="#14100D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {id === 'short-bob-straight' && (
            <g>
              <path d="M28,42 C25,58 26,72 32,80 L40,78 L50,80 L60,78 L68,80 C74,72 75,58 72,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              <path d="M31,44 C30,22 43,18 50,18 C57,18 70,22 69,44 C64,30 55,26 50,26 C45,26 36,30 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              <ellipse cx="50" cy="23" rx="14" ry="2" fill={`url(#thumbHalo-${id})`} />
              {/* Curved bob tips */}
              <path d="M32,46 Q26,62 33,76 Q38,78 40,72" fill="#221A15" stroke="#14100D" strokeWidth="0.8" />
              <path d="M68,46 Q74,62 67,76 Q62,78 60,72" fill="#221A15" stroke="#14100D" strokeWidth="0.8" />
              <path d="M49,20 Q44,28 39,44" stroke="#14100D" strokeWidth="0.9" fill="none" />
              <path d="M51,20 Q56,28 61,44" stroke="#14100D" strokeWidth="0.9" fill="none" />
            </g>
          )}

          {id === 'braided-twin-waist' && (
            <g>
              <path d="M31,44 C30,22 43,18 50,18 C57,18 70,22 69,44 C64,30 55,26 50,26 C45,26 36,30 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              <line x1="50" y1="18" x2="50" y2="28" stroke="#14100D" strokeWidth="0.8" />
              {/* Twin braids */}
              <ellipse cx="28" cy="56" rx="4" ry="5" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="27" cy="65" rx="3.8" ry="4.8" fill="#2E241E" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="28" cy="74" rx="3.5" ry="4.5" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="27" cy="83" rx="3.2" ry="4.2" fill="#2E241E" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="28" cy="91" rx="2.8" ry="3.8" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <rect x="26" y="94" width="4" height="2" rx="1" fill="#D4AF37" />
              <line x1="28" y1="96" x2="28" y2="103" stroke="#221A15" strokeWidth="1.5" />

              <ellipse cx="72" cy="56" rx="4" ry="5" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="73" cy="65" rx="3.8" ry="4.8" fill="#2E241E" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="72" cy="74" rx="3.5" ry="4.5" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="73" cy="83" rx="3.2" ry="4.2" fill="#2E241E" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="72" cy="91" rx="2.8" ry="3.8" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <rect x="70" y="94" width="4" height="2" rx="1" fill="#D4AF37" />
              <line x1="72" y1="96" x2="72" y2="103" stroke="#221A15" strokeWidth="1.5" />
            </g>
          )}

          {id === 'braided-single-side' && (
            <g>
              <path d="M31,44 C30,22 43,18 52,18 C60,18 70,22 69,44 C64,30 56,26 50,26 C44,26 36,30 31,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Wispy bangs */}
              <line x1="46" y1="26" x2="46" y2="38" stroke="#14100D" strokeWidth="1" />
              <line x1="50" y1="26" x2="50" y2="39" stroke="#14100D" strokeWidth="1" />
              <line x1="54" y1="26" x2="54" y2="38" stroke="#14100D" strokeWidth="1" />
              <path d="M42,26 Q36,36 36,52" stroke="#14100D" strokeWidth="1.8" fill="none" />
              {/* Sweeping into right thick braid */}
              <path d="M52,18 Q66,28 72,45" stroke="#14100D" strokeWidth="2.5" fill="none" />
              <ellipse cx="73" cy="50" rx="5" ry="5.5" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="75" cy="59" rx="5.5" ry="6" fill="#2E241E" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="74" cy="69" rx="5.2" ry="5.8" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="75" cy="79" rx="4.8" ry="5.4" fill="#2E241E" stroke="#14100D" strokeWidth="0.6" />
              <ellipse cx="74" cy="89" rx="4.2" ry="5" fill="#221A15" stroke="#14100D" strokeWidth="0.6" />
              <rect x="72" y="93" width="4.5" height="2" rx="1" fill="#B91C1C" />
              <line x1="74" y1="95" x2="74" y2="104" stroke="#221A15" strokeWidth="1.5" />
            </g>
          )}

          {id === 'side-bun-right' && (
            <g>
              <ellipse cx="50" cy="40" rx="20" ry="18" fill={`url(#thumbHairGrad-${id})`} />
              {/* Voluminous side bun on right */}
              <circle cx="76" cy="52" r="13" fill={`url(#thumbHairGrad-${id})`} stroke="#14100D" strokeWidth="0.8" />
              <path d="M70,48 Q78,42 84,49 Q88,58 78,61 Q70,58 70,50" stroke="#736050" strokeWidth="1.2" fill="none" />
              <circle cx="77" cy="51" r="2" fill="#FFFFFF" />
              {/* Wispy loose curls on right */}
              <path d="M74,60 Q79,76 75,90" stroke="#14100D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M34,44 Q32,58 35,68" stroke="#14100D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {id === 'half-up-princess' && (
            <g>
              {/* Back wavy hair */}
              <path d="M30,44 Q22,65 28,85 Q24,98 32,106 L44,103 L50,105 L60,103 L68,106 Q76,98 72,85 Q78,65 70,44 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Half up crown pouf */}
              <ellipse cx="50" cy="22" rx="13" ry="8" fill="#2E241E" stroke="#14100D" strokeWidth="0.8" />
              {/* Elegant headband */}
              <path d="M36,28 Q50,20 64,28" stroke="#261E19" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M37,28 Q50,21 63,28" stroke="#D4AF37" strokeWidth="0.6" strokeLinecap="round" fill="none" />
              {/* Curtain side bangs */}
              <path d="M36,36 Q30,52 35,70" stroke="#14100D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M64,36 Q70,52 65,70" stroke="#14100D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* MALE HAIRSTYLE THUMBNAILS */}
          {id === 'male-short-part' && (
            <g>
              {/* Short back & sides */}
              <path d="M30,38 C30,22 42,16 50,16 C60,16 70,22 70,38 C68,48 64,52 64,52 C60,42 58,32 50,32 C42,32 40,42 36,52 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Parting 7/3 */}
              <path d="M43,18 Q41,28 35,38" stroke="#14100D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M45,18 Q55,26 65,36" stroke="#14100D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M46,24 Q56,30 63,38" stroke="#736050" strokeWidth="1.2" fill="none" />
            </g>
          )}

          {id === 'male-topknot-bun' && (
            <g>
              {/* Neat undercut slicked up */}
              <path d="M32,40 C32,24 40,20 50,20 C60,20 68,24 68,40 C66,48 62,44 50,30 C38,44 34,48 32,40 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Topknot bun on crown with wooden hair pin */}
              <ellipse cx="50" cy="14" rx="8" ry="7" fill="#2E241E" stroke="#14100D" strokeWidth="0.8" />
              <line x1="42" y1="12" x2="58" y2="16" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />
              {/* Sideburns */}
              <line x1="33" y1="40" x2="33" y2="48" stroke="#14100D" strokeWidth="1.5" />
              <line x1="67" y1="40" x2="67" y2="48" stroke="#14100D" strokeWidth="1.5" />
            </g>
          )}

          {id === 'male-curtain-layers' && (
            <g>
              {/* Natural flow layers */}
              <path d="M29,42 C28,24 40,17 50,17 C60,17 72,24 71,42 C68,48 63,42 50,34 C37,42 32,48 29,42 Z" fill={`url(#thumbHairGrad-${id})`} />
              {/* Curtain bangs parted gently */}
              <path d="M48,22 Q40,32 34,46" stroke="#14100D" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M52,22 Q60,32 66,46" stroke="#14100D" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M50,24 Q44,34 38,44" stroke="#736050" strokeWidth="1" fill="none" />
              <path d="M50,24 Q56,34 62,44" stroke="#736050" strokeWidth="1" fill="none" />
            </g>
          )}

          {id === 'male-short-neat' && (
            <g>
              {/* Clean tapered crop */}
              <path d="M32,38 C32,22 42,16 50,16 C58,16 68,22 68,38 C64,46 62,34 50,28 C38,34 36,46 32,38 Z" fill={`url(#thumbHairGrad-${id})`} />
              <path d="M40,24 Q48,22 56,25" stroke="#736050" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M42,28 Q50,26 58,29" stroke="#14100D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          )}
        </svg>
      </div>

      {/* Label and Subtitle */}
      <div className="w-full text-center">
        <p className={`text-[10px] leading-tight font-bold truncate ${isSelected ? 'text-[#9B2C2C]' : 'text-[#2C241E]'}`}>
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
