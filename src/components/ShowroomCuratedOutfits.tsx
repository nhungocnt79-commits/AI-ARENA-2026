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
  Eye,
  X,
  Compass,
  Lightbulb,
  Feather,
  MapPin,
  Layers
} from 'lucide-react';

export interface CuratedShowroomItem {
  id: string;
  title: string;
  subtitle: string;
  regionBadge: string;
  regionColor: string;
  paletteBadge: string[];
  description: string;
  accessoriesText: string;
  shortMeaning: string;
  materialDetails: string;
  originDetails: string;
  stylingIdeaDetails: string;
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
  // 1. BỘ 1 - ÁO TỨ THÂN BẮC BỘ
  {
    id: 'showroom-tu-than-xanh-hong',
    title: 'Bộ 1 - Áo Tứ Thân Bắc Bộ',
    subtitle: 'Duyên Dáng Kinh Bắc, Phóng Khoáng Mà Kín Đáo',
    regionBadge: 'Bắc Bộ • Hội Lim',
    regionColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    paletteBadge: ['#7DD3FC', '#FBCFE8', '#0F766E', '#E2E8F0'],
    description:
      'Áo tứ thân sắc xanh dương nhạt phối cùng quần lụa ống rộng màu hồng nhạt cách tân nhẹ nhàng.',
    accessoriesText:
      'Dép cói quai lụa tơ tằm, kiềng bạc chạm khắc hoa sen, điểm xuyết nón quai thao thanh tú.',
    shortMeaning:
      'Duyên dáng Kinh Bắc, phóng khoáng mà kín đáo.',
    materialDetails:
      'Lụa tơ tằm dệt mềm rủ, tơ voan mỏng dệt thoáng khí, cói thiên nhiên Kim Sơn, bạc ta nguyên chất 99% chạm nổi hoa sen.',
    originDetails:
      'Vùng đồng bằng sông Hồng, cái nôi Kinh Bắc với câu ca quan họ ngọt ngào và các hội đình mùa xuân ngàn năm văn hiến.',
    stylingIdeaDetails:
      'Biến tấu từ kỹ thuật "mớ ba mớ bảy" sang dải màu pastel đương đại (xanh dương nhạt + hồng phấn), kết hợp quần lụa ống rộng cách tân bay bổng giúp Gen Z vừa duyên dáng vừa năng động trẩy hội.',
    modernTwist:
      'Quần lụa ống rộng cách tân thoáng khí, phối màu pastel ngọt ngào tươi sáng.',
    culturalHarmony:
      'Cổ yếm khép kín trang nghiêm, dải bao xanh thắt eo mềm mại chuẩn mực di sản.',
    occasion: 'Hội Lim Bắc Ninh, Chụp kỷ yếu xuân, Ngày hội văn hóa trẻ',
    annotations: {
      top: 'Áo Tứ Thân sắc xanh dương nhạt (lụa tơ mềm, dải bao xanh ngọc)',
      bottom: 'Quần lụa ống rộng màu hồng nhạt cách tân nhẹ nhàng',
      shoes: 'Dép cói quai lụa tơ tằm êm ái, nâng niu bước chân',
      jewelry: ['Kiềng bạc ta chạm khắc hoa sen', 'Khuyên tai ngọc trai thanh tú'],
      headwear: 'Nón quai thao tròn đầy đặn điểm xuyết dải thao tơ hồng',
    },
    outfitState: {
      rootId: 'tu-than',
      top: {
        silhouetteId: 'tu-than-truyen-thong',
        necklineId: 'neck-co-xay-yem',
        buttonId: 'btn-buoc-vat-lua',
        patternId: 'pat-sen-theu-chim',
        primaryColor: '#7DD3FC', // Xanh dương nhạt
        innerYemColor: '#FFF1F2',
        sashColor: '#0D9488',
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
      outfitName: 'Bộ 1 - Áo Tứ Thân Bắc Bộ',
      designerNote:
        'Áo tứ thân sắc xanh dương nhạt phối cùng quần lụa ống rộng màu hồng nhạt cách tân, dép cói quai lụa, kiềng bạc chạm sen và nón quai thao thanh tú.',
      selectedEventId: 'event-hoi-lim',
      selectedWeatherId: 'weather-spring-breeze',
    },
  },

  // 2. BỘ 2 - ÁO NGŨ THÂN TRUNG BỘ
  {
    id: 'showroom-ngu-than-vang-mo-ga',
    title: 'Bộ 2 - Áo Ngũ Thân Trung Bộ',
    subtitle: 'Tôn Nghiêm Ngũ Thường, Khí Chất Nhã Nhặn Chốn Thần Kinh',
    regionBadge: 'Trung Bộ • Cố Đô Huế',
    regionColor: 'bg-amber-100 text-amber-800 border-amber-300',
    paletteBadge: ['#FEF08A', '#FFFFFF', '#DC2626', '#E2E8F0'],
    description:
      'Áo ngũ thân tay thụng màu vàng mỡ gà dịu, thêu họa tiết mây nước cung đình; phối cùng quần lụa trắng nhẹ nhàng.',
    accessoriesText:
      'Guốc mộc quai nhung đỏ, khuyên tai nụ sen bạc đính ngọc, nón lá bài thơ xứ Huế.',
    shortMeaning:
      'Tôn nghiêm ngũ thường, khí chất nhã nhặn chốn thần kinh.',
    materialDetails:
      'Tơ tằm dệt gân chìm mỡ gà cung đình thoáng mát, lụa trắng Hà Đông mềm mại, gỗ mộc tiện tròn quai nhung đỏ, nón lá bài thơ chằm sợi giang dẻo dai xứ Huế.',
    originDetails:
      'Trang phục quốc phục cung đình và thị dân triều Nguyễn (xứ kinh kỳ Thừa Thiên Huế), đại diện cho tư tưởng đạo đức ngũ thường và cốt cách nho nhã.',
    stylingIdeaDetails:
      'Màu vàng mỡ gà dịu mắt thanh tao tôn da Á Đông, kết hợp phom tay thụng bay bổng và nón lá bài thơ e ấp, tạo tổng thể đài các quý phái nhưng vô cùng gần gũi với giới trẻ.',
    modernTwist:
      'Tay thụng bay bổng thoáng mát, màu vàng mỡ gà dịu mắt hiện đại.',
    culturalHarmony:
      'Năm thân áo đoan trang, 5 cúc khuy cài kín đáo tôn vinh nề nếp truyền thống.',
    occasion: 'Festival Huế, Lễ dâng hương Đền Hùng, Giao lưu học thuật',
    annotations: {
      top: 'Áo Ngũ Thân tay thụng màu vàng mỡ gà dịu thêu họa tiết mây nước',
      bottom: 'Quần lụa trắng nhẹ nhàng, suông dài thanh khiết',
      shoes: 'Guốc mộc quai nhung đỏ thêu chỉ vàng truyền thống',
      jewelry: ['Khuyên tai nụ sen bạc đính ngọc', 'Nhẫn bạc họa tiết cung đình'],
      headwear: 'Nón lá bài thơ xứ Huế quai lụa hồng duyên dáng',
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
        color: '#FFFFFF',        // Lụa trắng nhẹ nhàng
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
      outfitName: 'Bộ 2 - Áo Ngũ Thân Trung Bộ',
      designerNote:
        'Áo ngũ thân tay thụng màu vàng mỡ gà dịu thêu mây nước, quần lụa trắng nhẹ nhàng, guốc mộc quai nhung đỏ, khuyên nụ sen ngọc và nón lá bài thơ xứ Huế.',
      selectedEventId: 'event-festival-hue',
      selectedWeatherId: 'weather-warm-sun',
    },
  },

  // 3. BỘ 3 - ÁO BÀ BA NAM BỘ
  {
    id: 'showroom-ba-ba-tim-linen',
    title: 'Bộ 3 - Áo Bà Ba Nam Bộ',
    subtitle: 'Hồn Hậu Sông Nước Trong Phong Thái Hiện Đại Của Gen Z',
    regionBadge: 'Nam Bộ • Miền Sông Nước',
    regionColor: 'bg-purple-100 text-purple-800 border-purple-300',
    paletteBadge: ['#D8B4E2', '#18181B', '#FFFFFF', '#059669'],
    description:
      'Áo bà ba màu tím nhạt dịu ôm eo duyên dáng, phối cùng quần suông linen đen tuyền ống đứng cách tân.',
    accessoriesText:
      'Sneaker trắng năng động, vòng tay cẩm thạch, túi cói đan tay thêu cánh sen yêu kiều.',
    shortMeaning:
      'Hồn hậu sông nước trong phong thái hiện đại của Gen Z.',
    materialDetails:
      'Lụa mềm nhuộm sắc tím hoa cà pastel dịu mát, vải linen tự nhiên dệt sợi thô thoáng khí, canvas thêu hoa sen, cẩm thạch thiên nhiên và sợi cói Nam Bộ đan tay.',
    originDetails:
      'Đồng bằng sông Cửu Long phương Nam trù phú, biểu trưng cho sự đôn hậu, nghĩa khí và vẻ đẹp chân chất của con người Nam Bộ.',
    stylingIdeaDetails:
      'Sự giao thoa bất ngờ giữa nét đằm thắm của áo bà ba chiết eo màu tím nhạt cùng phong cách street-style của quần ống đứng linen và sneaker trắng - tạo nên tuyên ngôn thời trang "Heritage-Core" đầy cuốn hút.',
    modernTwist:
      'Phối cùng quần suông linen đen ống đứng và sneaker trắng cực kỳ năng động.',
    culturalHarmony:
      'Phom dáng ôm eo duyên dáng, xẻ tà hông tôn nét đẹp thắt đáy lưng ong mộc mạc.',
    occasion: 'Lễ hội Sông Nước Nam Bộ, Chợ nổi Cái Răng, Dạo phố kỷ niệm cuối tuần',
    annotations: {
      top: 'Áo Bà Ba màu tím nhạt dịu ôm eo duyên dáng, xẻ tà hai bên',
      bottom: 'Quần suông linen đen tuyền ống đứng cách tân tôn dáng',
      shoes: 'Sneaker trắng năng động, trẻ trung phong cách Gen Z',
      jewelry: ['Vòng tay cẩm thạch ngọc bích may mắn', 'Túi cói đan tay thêu cánh sen yêu kiều'],
      headwear: 'Khăn rằn lụa Nam Bộ dệt mảnh vắt hờ trên vai duyên dáng',
    },
    outfitState: {
      rootId: 'ba-ba',
      top: {
        silhouetteId: 'ba-ba-truyen-thong-xe-ta',
        necklineId: 'neck-co-tron-ba-ba',
        buttonId: 'btn-cuc-boc-vai-cung-mau',
        patternId: 'pat-lua-gam-tron-sang',
        primaryColor: '#D8B4E2', // Tím nhạt dịu
        innerYemColor: '#FFFFFF',
        sashColor: '#D8B4E2',
      },
      bottom: {
        bottomId: 'bot-quan-linen-den-ong-dung',
        color: '#18181B',        // Quần suông linen đen tuyền
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
      outfitName: 'Bộ 3 - Áo Bà Ba Nam Bộ',
      designerNote:
        'Áo bà ba màu tím nhạt dịu ôm eo duyên dáng, quần suông linen đen tuyền ống đứng cách tân, sneaker trắng, vòng tay cẩm thạch và túi cói đan tay thêu sen.',
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
  const [modalOutfit, setModalOutfit] = useState<CuratedShowroomItem | null>(null);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="showroom-section" className="w-full py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            Cửa Hàng Trưng Bày Phối Sẵn
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#2C241E] tracking-tight">
            Bộ Sưu Tập Tiêu Biểu Cho 3 Miền Bắc - Trung - Nam
          </h2>

          <p className="text-sm sm:text-base text-[#6B5A4B] leading-relaxed">
            Khám phá 3 phong cách Việt phục tiêu biểu được phối sẵn bắt mắt. 
            <span className="font-semibold text-[#8B1E1E]"> Rê chuột vào từng bộ</span> để card tự động nổi lên và bung chú thích chi tiết về <strong className="text-[#3E2723]">chất liệu, nguồn gốc và ý tưởng phối đồ</strong>!
          </p>
        </div>

        {/* 3 Showcase Outfit Cards Grid (Grid 3 Cột) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SHOWROOM_PRESETS.map((preset, index) => {
            const isHovered = hoveredId === preset.id;
            const isLiked = !!likedMap[preset.id];

            return (
              <div
                key={preset.id}
                onMouseEnter={() => setHoveredId(preset.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
                }}
                className={`group relative flex flex-col justify-between bg-white rounded-3xl border cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'shadow-2xl shadow-[#8B1E1E]/15 border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20'
                    : 'shadow-md border-[#E8DEC8] hover:border-[#D8C7B0]'
                }`}
              >
                {/* Top Card Badge Header */}
                <div className="p-5 pb-2 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#8B1E1E] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${preset.regionColor}`}
                    >
                      {preset.regionBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalOutfit(preset);
                      }}
                      className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#8C7A6B] hover:text-[#8B1E1E] transition-colors"
                      title="Mở bảng chú thích chi tiết"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => toggleLike(preset.id, e)}
                      className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#8C7A6B] hover:text-[#8B1E1E] transition-colors"
                      title="Yêu thích bộ này"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Interactive Mannequin Preview Container (Làm nổi bật ảnh khi hover) */}
                <div className={`relative mx-4 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FBF8F3] to-[#F2EADB] border border-[#E8DEC8]/80 flex items-center justify-center p-2 transition-all duration-300 ${
                  isHovered ? 'scale-[1.02] brightness-[1.02] ring-2 ring-[#8B1E1E]/30 shadow-inner' : ''
                }`}>
                  <div className="w-full max-w-[260px] h-[350px] flex items-center justify-center">
                    <AvatarMannequin
                      outfit={preset.outfitState}
                      heightClass="h-[340px]"
                      showDetailsOverlay={false}
                    />
                  </div>

                  {/* Floating Color Palette Dots */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D8C7B0]/80 shadow-xs z-10">
                    <Palette className="w-3 h-3 text-[#78350F]" />
                    {preset.paletteBadge.map((hex, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>

                  {/* Floating Action Button */}
                  <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 gap-3 transition-opacity duration-200 z-20 ${
                      isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <span className="text-white text-xs font-semibold tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FDE047]" />
                      Trang phục phối sẵn chuẩn mực
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectAndApplyOutfit(preset.outfitState)}
                      className="px-5 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-white text-xs font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
                    >
                      <span>Thử Bộ Này Trong Phòng Phối Đồ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalOutfit(preset);
                      }}
                      className="text-[11px] text-[#FAF7F2] hover:text-[#FDE047] underline cursor-pointer"
                    >
                      Xem chi tiết văn hóa & nguồn gốc
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#2C241E] group-hover:text-[#8B1E1E] transition-colors">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-[#8B1E1E] font-medium mt-0.5">
                      {preset.shortMeaning}
                    </p>

                    <p className="text-xs text-[#4A3525] leading-relaxed mt-2.5">
                      <strong className="text-[#2C241E]">Chi tiết: </strong>
                      {preset.description}
                    </p>

                    <p className="text-[11px] text-[#6B5A4B] leading-relaxed mt-1.5">
                      <strong className="text-[#2C241E]">Phụ kiện: </strong>
                      {preset.accessoriesText}
                    </p>
                  </div>

                  {/* TỰ ĐỘNG BUNG TOOLTIP/MODAL CHÚ THÍCH CHI TIẾT VỀ CHẤT LIỆU, NGUỒN GỐC VÀ Ý TƯỞNG PHỐI ĐỒ */}
                  <div className="pt-3 border-t border-[#F0E6D8] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#3E2723]">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#8B1E1E]" />
                        <span>Chú Thích Chi Tiết Trang Phục:</span>
                      </span>
                      <span className="text-[10px] text-[#8B1E1E] font-medium">
                        {isHovered ? '✓ Đang bung chi tiết' : 'Rê chuột để mở rộng'}
                      </span>
                    </div>

                    {/* Bung Tooltip Panel Chi Tiết */}
                    <div className={`p-3 rounded-2xl bg-gradient-to-b from-[#FAF7F2] to-[#F5EFEB] border transition-all duration-300 space-y-2 ${
                      isHovered ? 'border-[#8B1E1E]/50 shadow-sm ring-1 ring-[#8B1E1E]/15' : 'border-[#EFE5D8]'
                    }`}>
                      {/* 1. Chất liệu */}
                      <div className="text-[11px] text-[#3E2723] leading-relaxed flex items-start gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#8B1E1E] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#8B1E1E]">Chất liệu: </strong>
                          <span>{preset.materialDetails}</span>
                        </div>
                      </div>

                      {/* 2. Nguồn gốc */}
                      <div className="text-[11px] text-[#3E2723] leading-relaxed flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#0F766E]">Nguồn gốc: </strong>
                          <span>{preset.originDetails}</span>
                        </div>
                      </div>

                      {/* 3. Ý tưởng phối đồ (Bung đầy đủ khi hover) */}
                      <div className={`text-[11px] text-[#3E2723] leading-relaxed flex items-start gap-1.5 transition-all duration-200 ${
                        isHovered ? 'opacity-100' : 'opacity-80'
                      }`}>
                        <Lightbulb className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#D97706]">Ý tưởng phối đồ: </strong>
                          <span>{preset.stylingIdeaDetails}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Card Button */}
                  <button
                    type="button"
                    onClick={() => onSelectAndApplyOutfit(preset.outfitState)}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#8B1E1E] text-[#2C241E] hover:text-[#FAF7F2] border border-[#D8C7B0] hover:border-[#8B1E1E] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-md group-hover:bg-[#8B1E1E] group-hover:text-white group-hover:border-[#8B1E1E]"
                  >
                    <span>Thử Bộ Này Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL CHI TIẾT KHI NGƯỜI DÙNG BẤM XEM THÊM */}
        {modalOutfit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B0] shadow-2xl p-6 lg:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setModalOutfit(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${modalOutfit.regionColor}`}>
                  {modalOutfit.regionBadge}
                </span>
                <span className="text-xs font-semibold text-[#8B1E1E]">
                  {modalOutfit.shortMeaning}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-black text-[#8B1E1E]">
                  {modalOutfit.title}
                </h3>
                <p className="text-sm text-[#4A3525] mt-1 italic font-['Lora',serif]">
                  {modalOutfit.subtitle}
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#3E2723]">
                <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] space-y-1.5">
                  <h4 className="font-bold text-[#8B1E1E] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8B1E1E]" />
                    Chất Liệu Truyền Thống & Hiện Đại
                  </h4>
                  <p className="leading-relaxed text-xs sm:text-sm text-[#4A3525]">
                    {modalOutfit.materialDetails}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] space-y-1.5">
                  <h4 className="font-bold text-[#0F766E] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0F766E]" />
                    Nguồn Gốc Lịch Sử & Không Gian Văn Hóa
                  </h4>
                  <p className="leading-relaxed text-xs sm:text-sm text-[#4A3525]">
                    {modalOutfit.originDetails}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] space-y-1.5">
                  <h4 className="font-bold text-[#D97706] flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#D97706]" />
                    Ý Tưởng Phối Đồ Cho Thế Hệ Gen Z
                  </h4>
                  <p className="leading-relaxed text-xs sm:text-sm text-[#4A3525]">
                    {modalOutfit.stylingIdeaDetails}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const chosen = modalOutfit.outfitState;
                    setModalOutfit(null);
                    onSelectAndApplyOutfit(chosen);
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#8B1E1E] hover:bg-[#7A1C1C] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#FDE047]" />
                  <span>Nạp Bộ Này Vào Phòng Phối Đồ Ngay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalOutfit(null)}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl border border-[#D8C7B0] hover:bg-[#EFE7DC] text-[#4A3525] font-semibold text-sm transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowroomCuratedOutfits;
