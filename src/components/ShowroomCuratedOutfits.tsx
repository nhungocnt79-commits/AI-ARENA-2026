import React, { useState } from 'react';
import { CostumeOutfitState } from '../types/costume';
import { AvatarMannequin } from './AvatarMannequin';
import { 
  Sparkles, 
  ArrowRight, 
  Info, 
  Tag, 
  CheckCircle2, 
  Heart,
  Palette,
  Eye
} from 'lucide-react';

export interface CuratedShowroomItem {
  id: string;
  title: string;
  subtitle: string;
  regionBadge: string;
  regionColor: string;
  paletteBadge: string[];
  description: string;
  modernTwist: string;
  culturalHarmony: string;
  occasion: string;
  annotations: {
    top: string;
    bottom: string;
    shoes: string;
    jewelry: string[];
    headwear: string;
  };
  outfitState: CostumeOutfitState;
}

interface ShowroomCuratedOutfitsProps {
  onSelectAndApplyOutfit: (outfit: CostumeOutfitState) => void;
}

export const SHOWROOM_PRESETS: CuratedShowroomItem[] = [
  // 1. ÁO TỨ THÂN PHỐI XANH NHẸ & QUẦN LỤA HỒNG NHẠT
  {
    id: 'showroom-tu-than-xanh-hong',
    title: 'Áo Tứ Thân Kinh Bắc Cách Tân',
    subtitle: 'Thơ Ngây Sắc Xuân Mớ Ba Mớ Bảy',
    regionBadge: 'Miền Bắc • Lễ Hội Lim',
    regionColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    paletteBadge: ['#7DD3FC', '#FBCFE8', '#0F766E', '#E2E8F0'],
    description:
      'Áo tứ thân phối xanh nhẹ phối với quần lụa ống rộng màu hồng nhạt được cách tân nhẹ nhàng cùng dép cói quai lụa tơ tằm và kiềng bạc chạm khắc hoa sen thêm 1 chiếc nón quai thao để tô sắc.',
    modernTwist:
      'Biến tấu từ gam màu mớ ba mớ bảy truyền thống sang dải màu pastel đương đại ngọt ngào. Quần lụa ống rộng cách tân thoáng khí giúp nữ sinh dễ dàng di chuyển, năng động trẩy hội.',
    culturalHarmony:
      'Đoan trang 100%: Cổ yếm kín khít phối dải bao ngọc bích, giữ trọn nếp duyên Kinh Bắc mà không vướng víu.',
    occasion: 'Hội Lim Bắc Ninh, Chụp kỷ yếu xuân, Giao lưu văn hóa thanh niên',
    annotations: {
      top: 'Áo Tứ Thân xanh nhẹ pastel (lụa tơ mềm, dải bao xanh ngọc bích)',
      bottom: 'Quần lụa ống rộng màu hồng nhạt cách tân bay bổng',
      shoes: 'Dép cói quai lụa tơ tằm êm ái, nâng niu bàn chân',
      jewelry: ['Kiềng bạc ta chạm khắc hoa sen', 'Khuyên tai ngọc trai nước ngọt'],
      headwear: 'Nón quai thao (nón ba tầm) tròn đầy đặn tô sắc với dải thao tơ hồng',
    },
    outfitState: {
      rootId: 'tu-than',
      top: {
        silhouetteId: 'tu-than-truyen-thong',
        necklineId: 'neck-co-xay-yem',
        buttonId: 'btn-buoc-vat-lua',
        patternId: 'pat-sen-theu-chim',
        primaryColor: '#7DD3FC', // Xanh nhẹ
        innerYemColor: '#FFF1F2', // Yếm trắng kem viền hồng
        sashColor: '#0D9488',    // Dải bao xanh ngọc
      },
      bottom: {
        bottomId: 'bot-quan-lua-ong-rong-hong',
        color: '#FBCFE8',        // Hồng nhạt
      },
      accessories: {
        shoesId: 'shoes-dep-coi-lua',
        jewelryIds: ['jewel-kieng-bac-cham-sen', 'jewel-khuyen-tai-ngoc-trai'],
        hairAccessoryId: 'hair-non-quai-thao',
      },
      avatar: {
        hairstyle: 'braided-twin-waist',
        skinTone: 'fair',
        faceShape: 'oval',
      },
      outfitName: 'Tứ Thân Kinh Bắc Xanh Pastel & Quần Lụa Hồng',
      designerNote:
        'Phối màu xanh nhẹ và quần lụa hồng nhạt cách tân, kết hợp dép cói quai lụa, kiềng bạc chạm sen và nón quai thao duyên dáng.',
      selectedEventId: 'event-hoi-lim',
      selectedWeatherId: 'weather-spring-breeze',
    },
  },

  // 2. ÁO NGŨ THÂN TAY THỤNG MÀU VÀNG MỠ GÀ DỊU
  {
    id: 'showroom-ngu-than-vang-mo-ga',
    title: 'Áo Ngũ Thân Cố Đô Đài Các',
    subtitle: 'Nét Cung Đình Thanh Quý Xứ Huế',
    regionBadge: 'Miền Trung • Festival Huế',
    regionColor: 'bg-amber-100 text-amber-800 border-amber-300',
    paletteBadge: ['#FEF08A', '#FFFFFF', '#DC2626', '#E2E8F0'],
    description:
      'Áo ngũ thân tay thụng màu vàng mỡ gà dịu có thêu họa tiếc mây nước phối với quần lụa trắng nhẹ nhàng cùng guốc mộc quai nhung đỏ và khuyên tai nụ sen bạc đính ngọc và đội nón lá bài thơ xứ Huế.',
    modernTwist:
      'Chất liệu lụa tơ dệt thưa thoáng khí màu vàng mỡ gà quý phái nhưng không chói mắt, tay thụng bay bổng tôn dáng thanh thoát mà vẫn cực kỳ thoải mái khi dự lễ hội mùa hè.',
    culturalHarmony:
      'Quy chuẩn cổ phục triều Nguyễn: 5 thân áo kín kẽ tượng trưng tứ thân phụ mẫu và chính mình, 5 cúc khuy ngay ngắn.',
    occasion: 'Festival Huế, Lễ dâng hương Đền Hùng, Hội nghị thanh niên ASEAN',
    annotations: {
      top: 'Áo Ngũ Thân tay thụng vàng mỡ gà thêu họa tiết mây nước sóng vỗ',
      bottom: 'Quần lụa trắng nhẹ nhàng, suông dài thanh nhã',
      shoes: 'Guốc mộc quai nhung đỏ thêu chỉ vàng truyền thống',
      jewelry: ['Khuyên tai nụ sen bạc đính ngọc', 'Nhẫn bạc đính họa tiết pháp lam'],
      headwear: 'Nón lá bài thơ xứ Huế quai lụa hồng e ấp',
    },
    outfitState: {
      rootId: 'ngu-than',
      top: {
        silhouetteId: 'ngu-than-tay-thung-trang-trong',
        necklineId: 'neck-lap-linh-chuan',
        buttonId: 'btn-5-khuy-bac-cham',
        patternId: 'pat-may-song-thuy-ba',
        primaryColor: '#FEF08A', // Vàng mỡ gà dịu
        innerYemColor: '#FFFFFF',
        sashColor: '#FEF08A',
      },
      bottom: {
        bottomId: 'bot-quan-lua-trang-ngoc',
        color: '#FFFFFF',        // Quần lụa trắng nhẹ nhàng
      },
      accessories: {
        shoesId: 'shoes-guoc-moc-nhung', // Guốc mộc quai nhung đỏ
        jewelryIds: ['jewel-khuyen-tai-nu-sen-ngoc', 'jewel-nhan-bac-men-lam'],
        hairAccessoryId: 'hair-non-la-bai-tho', // Nón lá bài thơ
      },
      avatar: {
        hairstyle: 'half-up-princess',
        skinTone: 'fair',
        faceShape: 'oval',
      },
      outfitName: 'Ngũ Thân Tay Thụng Vàng Mỡ Gà & Nón Bài Thơ',
      designerNote:
        'Áo ngũ thân tay thụng vàng mỡ gà họa tiết mây nước, quần lụa trắng, guốc mộc nhung đỏ, khuyên nụ sen ngọc và nón lá bài thơ xứ Huế.',
      selectedEventId: 'event-festival-hue',
      selectedWeatherId: 'weather-warm-sun',
    },
  },

  // 3. ÁO BÀ BA MÀU XANH MATCHA DỊU & QUẦN LINEN ĐEN ỐNG ĐỨNG
  {
    id: 'showroom-ba-ba-matcha-linen',
    title: 'Áo Bà Ba Nam Bộ Năng Động',
    subtitle: 'Hơi Thở Street-Style Phù Sa Đương Đại',
    regionBadge: 'Miền Nam • Lễ Hội Sông Nước',
    regionColor: 'bg-teal-100 text-teal-800 border-teal-300',
    paletteBadge: ['#86EFAC', '#18181B', '#FFFFFF', '#059669'],
    description:
      'Áo bà ba màu xanh matcha dịu ôm eo duyên dáng phối với quần suông linen màu đen tuyền ống đứng cách tân cùng sneaker trắng năng thêm 1 chiếc vòng tay cẩm thạch và chiếc túi cói đan tay thêu cánh sen yêu kiều.',
    modernTwist:
      'Phối kết phá cách GenZ giữa nét đằm thắm mộc mạc Nam Bộ cùng sneaker trắng và túi cói bảo vệ môi trường. Siêu năng động cho các bạn nữ sinh viên di chuyển khắp khuôn viên lễ hội!',
    culturalHarmony:
      'Vạt xẻ hông tỷ lệ vàng chuẩn mực, kín đáo đoan trang mà tôn trọn nét thắt đáy lưng ong.',
    occasion: 'Lễ hội Chùa Bà Tây Ninh, Hội hoa xuân Sa Đéc, Street-style dạo phố cuối tuần',
    annotations: {
      top: 'Áo Bà Ba màu xanh matcha dịu ôm eo duyên dáng, xẻ tà 2 bên',
      bottom: 'Quần suông linen đen tuyền ống đứng cách tân tôn chiều cao',
      shoes: 'Sneaker vải canvas trắng năng động, hiện đại',
      jewelry: ['Vòng tay cẩm thạch xanh dịu may mắn', 'Túi cói đan tay thêu cánh sen yêu kiều'],
      headwear: 'Khăn rằn lụa Nam Bộ dệt mảnh vắt hờ trên vai / băng đô',
    },
    outfitState: {
      rootId: 'ba-ba',
      top: {
        silhouetteId: 'ba-ba-truyen-thong-xe-ta',
        necklineId: 'neck-co-tron-ba-ba',
        buttonId: 'btn-cuc-boc-vai-cung-mau',
        patternId: 'pat-lua-gam-tron-sang',
        primaryColor: '#86EFAC', // Xanh matcha dịu
        innerYemColor: '#FFFFFF',
        sashColor: '#86EFAC',
      },
      bottom: {
        bottomId: 'bot-quan-linen-den-ong-dung',
        color: '#18181B',        // Quần linen đen tuyền
      },
      accessories: {
        shoesId: 'shoes-sneaker-canvas-theu', // Sneaker trắng năng động
        jewelryIds: ['jewel-vong-tay-cam-thach', 'jewel-tui-coi-theu-sen'],
        hairAccessoryId: 'hair-khan-ran-nam-bo',
      },
      avatar: {
        hairstyle: 'braided-single-side',
        skinTone: 'fair',
        faceShape: 'oval',
      },
      outfitName: 'Bà Ba Xanh Matcha Năng Động & Sneaker Trắng',
      designerNote:
        'Áo bà ba xanh matcha ôm eo duyên dáng, quần suông linen đen ống đứng, sneaker trắng, vòng tay cẩm thạch và túi cói đan tay thêu sen.',
      selectedEventId: 'event-hoi-song-nuoc',
      selectedWeatherId: 'weather-cool-autumn',
    },
  },
];

export const ShowroomCuratedOutfits: React.FC<ShowroomCuratedOutfitsProps> = ({
  onSelectAndApplyOutfit,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="showroom-section" className="w-full py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            Cửa Hàng Trưng Bày Phối Sẵn
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#2C241E] tracking-tight">
            Bộ Sưu Tập Tiêu Biểu Dành Riêng Cho GenZ
          </h2>

          <p className="text-sm sm:text-base text-[#6B5A4B] leading-relaxed">
            Khám phá 3 phong cách Việt phục tiêu biểu được may đo và phối sẵn chuẩn mực theo từng vùng miền. 
            <span className="font-semibold text-[#9B2C2C]"> Di chuột vào từng bộ trang phục</span> để xem chi tiết chú thích văn hóa và bấm thử ngay trong phòng phối đồ!
          </p>
        </div>

        {/* 3 Showcase Outfit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOWROOM_PRESETS.map((preset, index) => {
            const isHovered = hoveredId === preset.id;
            const isLiked = !!likedMap[preset.id];

            return (
              <div
                key={preset.id}
                onMouseEnter={() => setHoveredId(preset.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative flex flex-col justify-between bg-white rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHovered
                    ? '-translate-y-3 shadow-2xl border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20'
                    : 'shadow-md border-[#E8DEC8] hover:border-[#D8C7B0]'
                }`}
              >
                {/* Top Card Badge Header */}
                <div className="p-5 pb-2 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#2C241E] text-white text-xs font-bold flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${preset.regionColor}`}
                    >
                      {preset.regionBadge}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleLike(preset.id, e)}
                    className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#8C7A6B] hover:text-[#9B2C2C] transition-colors"
                    title="Yêu thích bộ này"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
                  </button>
                </div>

                {/* Interactive Mannequin Preview Container */}
                <div className="relative mx-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FBF8F3] to-[#F2EADB] border border-[#E8DEC8]/80 flex items-center justify-center p-2">
                  <div className="w-full max-w-[260px] h-[360px] flex items-center justify-center">
                    <AvatarMannequin
                      outfit={preset.outfitState}
                      heightClass="h-[350px]"
                      showDetailsOverlay={false}
                    />
                  </div>

                  {/* Floating Color Palette Dots */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D8C7B0]/80 shadow-xs">
                    <Palette className="w-3 h-3 text-[#78350F]" />
                    {preset.paletteBadge.map((hex, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>

                  {/* Floating Quick Action Overlay on Hover */}
                  <div
                    className={`absolute inset-0 bg-black/35 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 gap-3 transition-opacity duration-200 ${
                      isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <span className="text-white text-xs font-medium tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FDE047]" />
                      Trang phục phối sẵn chuẩn mực
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectAndApplyOutfit(preset.outfitState)}
                      className="px-5 py-2.5 rounded-xl bg-[#9B2C2C] hover:bg-[#7F1D1D] text-white text-xs font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
                    >
                      <span>Thử Bộ Này Trong Phòng Phối Đồ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content & Annotations Area */}
                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#2C241E] group-hover:text-[#9B2C2C] transition-colors">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-[#9B2C2C] font-medium">
                      {preset.subtitle}
                    </p>

                    <p className="text-xs text-[#524438] leading-relaxed mt-2 line-clamp-3">
                      {preset.description}
                    </p>
                  </div>

                  {/* ALWAYS ACCESSIBLE / EXPANDED ON HOVER: DETAILED ANNOTATIONS */}
                  <div className="space-y-2 pt-2 border-t border-[#F0E6D8]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#78350F]">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#B45309]" />
                        Chi tiết các món đồ phối:
                      </span>
                      <span className="text-[10px] text-[#8C7A6B]">
                        {isHovered ? 'Đang mở chi tiết' : 'Rê chuột để ghim'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-[#4A3B32]">
                      <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE5D8] flex items-start gap-1.5">
                        <span className="font-semibold text-[#9B2C2C] shrink-0">Áo:</span>
                        <span className="leading-tight">{preset.annotations.top}</span>
                      </div>

                      <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE5D8] flex items-start gap-1.5">
                        <span className="font-semibold text-[#0F766E] shrink-0">Quần:</span>
                        <span className="leading-tight">{preset.annotations.bottom}</span>
                      </div>

                      {/* Extra details highlighted when hovered */}
                      {isHovered && (
                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE5D8] flex items-start gap-1.5">
                            <span className="font-semibold text-[#B45309] shrink-0">Giày:</span>
                            <span className="leading-tight">{preset.annotations.shoes}</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE5D8] flex items-start gap-1.5">
                            <span className="font-semibold text-[#6D28D9] shrink-0">Trang sức:</span>
                            <span className="leading-tight">{preset.annotations.jewelry.join(' • ')}</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EFE5D8] flex items-start gap-1.5">
                            <span className="font-semibold text-[#BE123C] shrink-0">Đầu / Nón:</span>
                            <span className="leading-tight">{preset.annotations.headwear}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[10px] text-amber-900 leading-normal">
                            <span className="font-bold">✨ Nét cách tân GenZ: </span>
                            {preset.modernTwist}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Card Button */}
                  <button
                    type="button"
                    onClick={() => onSelectAndApplyOutfit(preset.outfitState)}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#9B2C2C] text-[#2C241E] hover:text-white border border-[#D8C7B0] hover:border-[#9B2C2C] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs group-hover:shadow-sm"
                  >
                    <span>Thử Bộ Này Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowroomCuratedOutfits;
