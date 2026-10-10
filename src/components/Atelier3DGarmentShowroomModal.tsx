import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Rotate3d, 
  Sparkles, 
  Layers, 
  SunMedium, 
  Play, 
  Pause, 
  Check, 
  Info,
  Palette,
  Compass,
  Scissors,
  Shirt,
  Flower2
} from 'lucide-react';

export type Atelier3DGarmentType = 
  | 'ngu-than-cach-tan' 
  | 'tay-chen' 
  | 'tay-thung' 
  | 'tu-than' 
  | 'ba-ba' 
  | 'vay-xep-ly-dai'
  | 'vay-lua-bong'
  | 'quan-ong-xeo' 
  | 'vay-dup-trang';

export type Nguthantype = Atelier3DGarmentType; // For backward compatibility
export type FabricType = 'nhu-bong' | 'to-van-may' | 'gam-det-chim' | 'sa-xuyen-thau' | 'lua-to-tam' | 'dui-tho-moc';
export type PairedBottomType = 
  | 'none' 
  | 'vay-xep-ly-dai'
  | 'vay-lua-bong'
  | 'quan-ong-xeo' 
  | 'vay-dup-trang' 
  | 'quan-den';

interface Atelier3DGarmentShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: Atelier3DGarmentType;
  onApplyToStudio?: (type: Atelier3DGarmentType, fabricId: string) => void;
}

export const Atelier3DGarmentShowroomModal: React.FC<Atelier3DGarmentShowroomModalProps> = ({
  isOpen,
  onClose,
  initialType = 'ngu-than-cach-tan',
  onApplyToStudio,
}) => {
  const [selectedType, setSelectedType] = useState<Atelier3DGarmentType>(initialType);
  const [selectedFabric, setSelectedFabric] = useState<FabricType>('to-van-may');
  
  // 360 Degree Continuous Rotation (0 - 360°)
  const [rotationAngle, setRotationAngle] = useState<number>(15);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [lightingMode, setLightingMode] = useState<'studio-white' | 'golden-warm' | 'moonlit-pearl'>('studio-white');
  const [showTechnicalMarkers, setShowTechnicalMarkers] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);

  // Pairing Bottom in 3D Showroom (Tùy chọn phối quần/váy cùng áo)
  const [pairedBottom, setPairedBottom] = useState<PairedBottomType>('quan-ong-xeo');

  // Áo Tứ Thân Customizations:
  const [tuThanWearingStyle, setTuThanWearingStyle] = useState<'buoc-vat' | 'buong-tha'>('buoc-vat');
  const [tuThanShowInnerYem, setTuThanShowInnerYem] = useState<boolean>(true);
  const [tuThanShowSash, setTuThanShowSash] = useState<boolean>(true);

  // Áo Bà Ba Customizations:
  const [baBaNeckline, setBaBaNeckline] = useState<'co-tron' | 'co-tim' | 'co-vuong'>('co-tim');
  const [baBaGenderCut, setBaBaGenderCut] = useState<'nu' | 'nam'>('nu');
  const [baBaPocketStyle, setBaBaPocketStyle] = useState<'tui-to' | 'tui-nho' | 'khong-tui'>('tui-nho');

  // Drag-to-rotate interactive state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initialType when modal opens
  useEffect(() => {
    if (initialType) {
      setSelectedType(initialType);
      if (initialType === 'tu-than') {
        setPairedBottom('vay-dup-trang');
      } else if (
        initialType === 'quan-ong-xeo' || 
        initialType === 'vay-dup-trang' ||
        initialType === 'vay-xep-ly-dai' ||
        initialType === 'vay-lua-bong'
      ) {
        setPairedBottom('none');
      } else {
        setPairedBottom('quan-ong-xeo');
      }
    }
  }, [initialType]);

  // Auto-rotation 360° turntable effect
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateIntervalRef.current = setInterval(() => {
        setRotationAngle(prev => (prev + 1.2) % 360);
      }, 30);
    } else {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    }
    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [isAutoRotating]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = rotationAngle;
    if (isAutoRotating) setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    let newAngle = (startAngleRef.current + deltaX * 0.6) % 360;
    if (newAngle < 0) newAngle += 360;
    setRotationAngle(newAngle);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      startAngleRef.current = rotationAngle;
      if (isAutoRotating) setIsAutoRotating(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    let newAngle = (startAngleRef.current + deltaX * 0.6) % 360;
    if (newAngle < 0) newAngle += 360;
    setRotationAngle(newAngle);
  };

  const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
  const isBackView = normalizedAngle >= 115 && normalizedAngle <= 245;

  // Fabric Catalog Profiles
  const FABRIC_CATALOG: Record<FabricType, {
    name: string;
    label: string;
    desc: string;
    sheen: string;
    badge: string;
  }> = {
    'nhu-bong': {
      name: 'Vải Nhũ Bóng Kim Sa',
      label: 'Nhũ Bóng (Glitter Luster)',
      desc: 'Sợi tơ dệt xen tinh thể bắt sáng lóng lánh, phản quang ánh kim sa kiêu sa dưới đèn rọi sàn diễn thời trang.',
      sheen: 'Cao · Phản quang lấp lánh',
      badge: 'Bắt sáng lộng lẫy'
    },
    'to-van-may': {
      name: 'Vải Tơ Vân Mây Cổ Truyền',
      label: 'Tơ Vân Mây (Cloud Jacquard)',
      desc: 'Lụa tơ dệt hoa văn vân mây truyền thống Đại Việt uốn lượn bồng bềnh, tạo chiều sâu thị giác thanh thoát thoát tục.',
      sheen: 'Dịu nhẹ · Óng ánh vân sóng',
      badge: 'Hoa văn di sản'
    },
    'gam-det-chim': {
      name: 'Vải Gấm Dệt Họa Tiết Chìm',
      label: 'Gấm Dệt Chìm (Imperial Damask)',
      desc: 'Gấm dệt chìm hoa cúc chữ Vạn và thủy ba, hoa văn ẩn hiện quý phái khi ánh sáng rọi góc nghiêng.',
      sheen: 'Sang trọng · Quý phái mực thước',
      badge: 'Quý phái đoan trang'
    },
    'sa-xuyen-thau': {
      name: 'Vải Sa Tơ Mỏng Xuyên Thấu (2 Lớp)',
      label: 'Sa Tơ Xuyên Thấu (Sheer Silk)',
      desc: 'Chất vải sa tơ siêu mỏng nhẹ như khói lam chiều, tạo hiệu ứng 2 lớp áo bồng bềnh huyền ảo.',
      sheen: 'Mờ ảo · Xuyên thấu đa tầng',
      badge: 'Hiệu ứng 2 lớp áo'
    },
    'lua-to-tam': {
      name: 'Lụa Tơ Tằm Trắng Ngà Trơn',
      label: 'Tơ Tằm Trắng Ngà (Mulberry Silk)',
      desc: 'Lụa tơ tằm thượng hạng màu trắng ngà tự nhiên, bề mặt trơn mịn óng ả, rủ mềm thướt tha.',
      sheen: 'Óng ánh ngọc trai tự nhiên',
      badge: 'Nguyên bản thanh lịch'
    },
    'dui-tho-moc': {
      name: 'Vải Đũi Tơ Tằm Thô Mộc',
      label: 'Đũi Thô Mộc (Raw Dupioni)',
      desc: 'Sợi đũi tự nhiên với thớ sợi dệt gân thô mộc mạc, nền nã, thoáng khí và đượm hồn dân tộc.',
      sheen: 'Mờ mộc mạc · Nền nã thanh tao',
      badge: 'Phong thái nho nhã'
    }
  };

  const getGarmentTitle = () => {
    switch (selectedType) {
      case 'ngu-than-cach-tan':
        return 'Áo Ngũ Thân Cách Tân (Hoa Vải 3D Đính Nổi · Viền Nẹp Xanh Ngọc · Ombre Khúc Xạ)';
      case 'tay-chen':
        return 'Áo Ngũ Thân Tay Chẽn (Màu Trắng · Phom Suông Cân Bằng · 5 Khuy Lệch Phải)';
      case 'tay-thung':
        return 'Áo Ngũ Thân Tay Thụng (Màu Trắng · 2 Lớp Xuyên Thấu · Khoanh Tay)';
      case 'tu-than':
        return 'Áo Tứ Thân (Màu Trắng · 2 Thân Sau May Liền Sống Lưng · Không Khuy Cài)';
      case 'ba-ba':
        return 'Áo Bà Ba (Màu Trắng · Thân Sau Một Mảnh Vải Nguyên · Dải Khuy Dọc Giữa)';
      case 'vay-xep-ly-dai':
        return 'Chân Váy Xếp Ly Dài Phom Chữ A (Trắng Kem/Trắng Ngà Mờ Lì · Cạp Phẳng Đứng Dáng · Nếp Ly Bản Lớn Chạm Đất · Gấu Lượn Sóng)';
      case 'vay-lua-bong':
        return 'Chân Váy Lụa Satin Cắt Xéo Bias Cut (Trắng Ngà Trơn Mịn · Bóng Mờ Sang Trọng · Ôm Hông Rủ Sóng Bay Bổng · Xòe Nhẹ Gấu)';
      case 'quan-ong-xeo':
        return 'Quần Lụa Trắng Ngà Ống Xéo Cổ Phục (Suông Rộng Thướt Tha · Dài Chạm Đất)';
      case 'vay-dup-trang':
        return 'Váy Đụp Lụa Trắng Xòe Rộng Kinh Bắc (Xòe Tròn Thênh Thang · Chấm Gót)';
    }
  };

  const isBottomModel = 
    selectedType === 'vay-xep-ly-dai' ||
    selectedType === 'vay-lua-bong' ||
    selectedType === 'quan-ong-xeo' || 
    selectedType === 'vay-dup-trang';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className="bg-[#FAF7F2] w-full max-w-6xl h-[94vh] max-h-[880px] rounded-3xl shadow-2xl border border-[#D8C7B0] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#F0E6D8] px-4 lg:px-6 py-3 border-b border-[#D8C7B0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B1E1E] text-amber-100 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#8B1E1E]">
                  Haute Couture 3D Studio
                </span>
                <span className="text-[#8C7A6B]">·</span>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Rotate3d className="w-3 h-3" />
                  Mô Hình 3D Xoay 360° Toàn Cảnh
                </span>
              </div>
              <h2 className="text-base lg:text-lg font-serif font-bold text-[#2C241E] truncate max-w-[280px] sm:max-w-md lg:max-w-xl">
                {getGarmentTitle()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
              title="Đóng phòng trưng bày"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Garment Selector Tabs */}
        <div className="bg-[#F4ECE1] px-4 lg:px-6 py-2 border-b border-[#E2D5C3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
            {/* Tops group */}
            <span className="text-[10px] font-bold uppercase text-[#8C7A6B] bg-[#EAE0D2] px-2 py-1 rounded-md shrink-0">
              Áo:
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedType('ngu-than-cach-tan');
                setPairedBottom('quan-ong-xeo');
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedType === 'ngu-than-cach-tan'
                  ? 'bg-[#0D9488] text-white shadow-xs ring-2 ring-teal-400/40'
                  : 'bg-white/70 text-[#4A3B32] hover:bg-white border border-[#D8C7B0]'
              }`}
            >
              <Flower2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ngũ Thân Cách Tân</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('tay-chen')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'tay-chen'
                  ? 'bg-[#8B1E1E] text-white shadow-xs'
                  : 'bg-white/70 text-[#4A3B32] hover:bg-white border border-[#D8C7B0]'
              }`}
            >
              Tay Chẽn
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('tay-thung')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'tay-thung'
                  ? 'bg-[#8B1E1E] text-white shadow-xs'
                  : 'bg-white/70 text-[#4A3B32] hover:bg-white border border-[#D8C7B0]'
              }`}
            >
              Tay Thụng
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('tu-than')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'tu-than'
                  ? 'bg-[#8B1E1E] text-white shadow-xs'
                  : 'bg-white/70 text-[#4A3B32] hover:bg-white border border-[#D8C7B0]'
              }`}
            >
              Áo Tứ Thân
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('ba-ba')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'ba-ba'
                  ? 'bg-[#8B1E1E] text-white shadow-xs'
                  : 'bg-white/70 text-[#4A3B32] hover:bg-white border border-[#D8C7B0]'
              }`}
            >
              Áo Bà Ba
            </button>

            {/* Divider */}
            <span className="w-px h-5 bg-[#D8C7B0] shrink-0 mx-1" />

            {/* Bottoms group */}
            <span className="text-[10px] font-bold uppercase text-amber-900 bg-amber-100 px-2 py-1 rounded-md shrink-0">
              Quần & Váy:
            </span>
            <button
              type="button"
              onClick={() => setSelectedType('vay-xep-ly-dai')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedType === 'vay-xep-ly-dai'
                  ? 'bg-[#B45309] text-white shadow-xs ring-2 ring-amber-400/40'
                  : 'bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <span>Váy Xếp Ly Dài</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('vay-lua-bong')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedType === 'vay-lua-bong'
                  ? 'bg-[#B45309] text-white shadow-xs ring-2 ring-amber-400/40'
                  : 'bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <span>Váy Lụa Satin</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('quan-ong-xeo')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedType === 'quan-ong-xeo'
                  ? 'bg-[#B45309] text-white shadow-xs ring-2 ring-amber-400/40'
                  : 'bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <span>Quần Ống Xéo</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('vay-dup-trang')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedType === 'vay-dup-trang'
                  ? 'bg-[#B45309] text-white shadow-xs ring-2 ring-amber-400/40'
                  : 'bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <span>Váy Đụp Lụa</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#7A6757] shrink-0 font-medium">
            <span>Góc nhìn:</span>
            <span className="font-bold text-[#8B1E1E]">
              {isBackView ? 'Mặt Sau Lưng (180°)' : 'Mặt Trước (Chính Diện)'}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: 3D Studio Canvas with 360 Rotation (7 cols on lg) */}
          <div 
            className={`lg:col-span-7 relative flex flex-col items-center justify-center p-3 lg:p-4 overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-700 ${
              lightingMode === 'studio-white'
                ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F8F9FA] to-[#E9ECEF]'
                : lightingMode === 'moonlit-pearl'
                ? 'bg-gradient-to-b from-[#090F1E] via-[#0E172E] to-[#060A16]'
                : 'bg-gradient-to-b from-[#2B170C] via-[#3A2111] to-[#1A0C05]'
            }`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Ambient Lighting Backdrop */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                lightingMode === 'golden-warm' 
                  ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/35 via-orange-950/45 to-[#1A0C05]/95' 
                  : lightingMode === 'moonlit-pearl'
                  ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/25 via-indigo-950/45 to-[#060A16]/95'
                  : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-zinc-100/70 to-zinc-300/40'
              }`}
            />

            {/* Studio Floor Soft Pedestal Shadow */}
            <div 
              className={`absolute bottom-6 w-80 h-9 rounded-full blur-xl pointer-events-none transition-all duration-700 ${
                lightingMode === 'studio-white'
                  ? 'bg-zinc-400/30'
                  : lightingMode === 'moonlit-pearl'
                  ? 'bg-sky-400/25'
                  : 'bg-amber-500/30'
              }`}
            />

            {/* Top Turntable Angle & Lighting Indicators */}
            <div className="absolute top-3 inset-x-3 sm:inset-x-4 flex items-center justify-between z-20 pointer-events-auto">
              <div className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 shadow-md flex items-center gap-2 text-white text-xs">
                <Rotate3d className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-amber-300 font-bold">{normalizedAngle.toFixed(0)}°</span>
                <span className="text-white/60">·</span>
                <span className="text-[11px] text-zinc-300">
                  {isBackView ? 'Góc Sau Lưng (180°)' : 'Góc Trước (0°/360°)'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    isAutoRotating ? 'bg-amber-500 text-black' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title="Tự động xoay 360 độ"
                >
                  {isAutoRotating ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                  <span>{isAutoRotating ? 'Dừng' : 'Xoay 360°'}</span>
                </button>
              </div>

              {/* Lighting Preset Buttons */}
              <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-md">
                <SunMedium className="w-3.5 h-3.5 text-amber-300 ml-1.5 mr-0.5" />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLightingMode('studio-white')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                      lightingMode === 'studio-white' ? 'bg-white text-black font-bold shadow-xs' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Studio Trắng
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('moonlit-pearl')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                      lightingMode === 'moonlit-pearl' ? 'bg-sky-200 text-black font-bold shadow-xs' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Ánh Trăng
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('golden-warm')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                      lightingMode === 'golden-warm' ? 'bg-amber-300 text-black font-bold shadow-xs' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Nắng Ấm
                  </button>
                </div>
              </div>
            </div>

            {/* Standalone 3D SVG Garment Viewer with Real 3D Perspective */}
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `scale(${zoomLevel}) perspective(900px) rotateY(${Math.sin((normalizedAngle * Math.PI) / 180) * 35}deg)`
              }}
            >
              <svg
                viewBox="0 0 400 520"
                className={`w-full h-full max-h-[480px] object-contain transition-all duration-500 ${
                  lightingMode === 'studio-white'
                    ? 'drop-shadow-[0_16px_32px_rgba(30,41,59,0.18)]'
                    : lightingMode === 'moonlit-pearl'
                    ? 'drop-shadow-[0_22px_45px_rgba(56,189,248,0.3)]'
                    : 'drop-shadow-[0_22px_45px_rgba(245,158,11,0.35)]'
                }`}
              >
                <defs>
                  {/* Studio Lighting Gradients for White Silk */}
                  <linearGradient id="studioWhiteSilk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor={lightingMode === 'golden-warm' ? '#FFFBEB' : lightingMode === 'moonlit-pearl' ? '#F0F9FF' : '#FDFBF7'} />
                    <stop offset="70%" stopColor={lightingMode === 'golden-warm' ? '#FEF3C7' : lightingMode === 'moonlit-pearl' ? '#E0F2FE' : '#F0F2F5'} />
                    <stop offset="100%" stopColor={lightingMode === 'golden-warm' ? '#FDE68A' : lightingMode === 'moonlit-pearl' ? '#BAE6FD' : '#DEE2E6'} />
                  </linearGradient>

                  {/* Quần Lụa Trắng Ngà Rủ Suông */}
                  <linearGradient id="whiteSilkPantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor={lightingMode === 'golden-warm' ? '#FFFBEB' : lightingMode === 'moonlit-pearl' ? '#F0F9FF' : '#FBF8F2'} />
                    <stop offset="80%" stopColor={lightingMode === 'golden-warm' ? '#FEF3C7' : lightingMode === 'moonlit-pearl' ? '#E0F2FE' : '#ECE5DA'} />
                    <stop offset="100%" stopColor={lightingMode === 'golden-warm' ? '#FDE68A' : lightingMode === 'moonlit-pearl' ? '#BAE6FD' : '#DDD2C3'} />
                  </linearGradient>

                  {/* Váy Đụp Lụa Trắng Xòe Rộng Kinh Bắc */}
                  <linearGradient id="whiteSilkWideSkirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor={lightingMode === 'golden-warm' ? '#FFFBEB' : lightingMode === 'moonlit-pearl' ? '#F0F9FF' : '#FDFBF7'} />
                    <stop offset="70%" stopColor={lightingMode === 'golden-warm' ? '#FEF3C7' : lightingMode === 'moonlit-pearl' ? '#E0F2FE' : '#EFE9DE'} />
                    <stop offset="100%" stopColor={lightingMode === 'golden-warm' ? '#FDE68A' : lightingMode === 'moonlit-pearl' ? '#BAE6FD' : '#E2D8C8'} />
                  </linearGradient>

                  {/* Inner Layer Ivory Silk */}
                  <linearGradient id="innerIvorySilk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF5" />
                    <stop offset="50%" stopColor="#F9F4E6" />
                    <stop offset="100%" stopColor="#EADEC5" />
                  </linearGradient>

                  {/* Outer Translucent Sheer Silk (2 Lớp Mỏng) */}
                  <linearGradient id="outerTranslucentSilk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
                    <stop offset="50%" stopColor="#FDFBF7" stopOpacity="0.68" />
                    <stop offset="100%" stopColor="#F2ECE0" stopOpacity="0.55" />
                  </linearGradient>

                  {/* Hiệu ứng khúc xạ màu Iridescent / Ombre (Ánh tím lavender - ánh xanh ngọc) */}
                  <linearGradient id="iridescentLavenderJade3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.88" />
                    <stop offset="35%" stopColor="#C4B5FD" stopOpacity="0.80" />
                    <stop offset="70%" stopColor="#A7F3D0" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.88" />
                  </linearGradient>

                  {/* Đầm hai dây màu hồng san hô bên trong (Coral Pink Slip Dress) */}
                  <linearGradient id="coralPinkSlip3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FECDD3" />
                    <stop offset="50%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>

                  {/* 1. Họa tiết Vân Mây */}
                  <pattern id="patternCloudJacquard" width="44" height="44" patternUnits="userSpaceOnUse">
                    <path
                      d="M10,22 Q14,14 22,18 Q28,12 34,18 Q40,16 38,24 Q42,30 34,32 Q26,34 20,28 Q14,30 10,22 Z"
                      fill="none"
                      stroke="#C8B39B"
                      strokeWidth="0.85"
                      strokeOpacity="0.5"
                    />
                    <path
                      d="M14,23 Q18,18 24,21 Q28,17 32,21"
                      fill="none"
                      stroke="#E5D6C3"
                      strokeWidth="0.6"
                      strokeOpacity="0.7"
                    />
                  </pattern>

                  {/* 2. Họa tiết Gấm Dệt Chìm */}
                  <pattern id="patternDamaskBrocade" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path
                      d="M12,10 L24,10 L24,18 L12,18 L12,26 L24,26"
                      fill="none"
                      stroke="#BFA992"
                      strokeWidth="0.85"
                      strokeOpacity="0.4"
                    />
                    <circle cx="18" cy="18" r="4.5" fill="none" stroke="#A89278" strokeWidth="0.75" strokeOpacity="0.45" />
                    <circle cx="18" cy="18" r="1.5" fill="#CBB59C" fillOpacity="0.5" />
                  </pattern>

                  {/* 3. Họa tiết Nhũ Bóng */}
                  <pattern id="patternGlitterShimmer" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M8,8 L9,5 L10,8 L13,9 L10,10 L9,13 L8,10 L5,9 Z" fill="#FACC15" fillOpacity="0.6" />
                    <path d="M24,22 L24.8,19.5 L25.6,22 L28,22.8 L25.6,23.6 L24.8,26 L24,23.6 L21.6,22.8 Z" fill="#FFFFFF" fillOpacity="0.85" />
                  </pattern>

                  {/* 4. Họa tiết Đũi Thô Mộc */}
                  <pattern id="patternRawDupioni" width="28" height="28" patternUnits="userSpaceOnUse">
                    <line x1="2" y1="6" x2="16" y2="6" stroke="#9C826A" strokeWidth="0.9" strokeOpacity="0.28" />
                    <line x1="10" y1="14" x2="26" y2="14" stroke="#9C826A" strokeWidth="1.1" strokeOpacity="0.32" />
                  </pattern>

                  {/* Lacquer Stand */}
                  <linearGradient id="lacquerStand" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2A1B12" />
                    <stop offset="50%" stopColor="#4A3324" />
                    <stop offset="100%" stopColor="#2A1B12" />
                  </linearGradient>
                </defs>

                {/* Atelier Stand */}
                <g id="atelier-stand" opacity="0.85">
                  <rect x="196" y="24" width="8" height="85" fill="url(#lacquerStand)" rx="1.5" />
                  <circle cx="200" cy="22" r="7" fill="#C5A059" stroke="#78531A" strokeWidth="1" />
                  <ellipse cx="200" cy="495" rx="65" ry="12" fill="#140E0A" stroke="#C5A059" strokeWidth="1" />
                  <ellipse cx="200" cy="492" rx="58" ry="9" fill="url(#lacquerStand)" />
                  <rect x="197" y="420" width="6" height="75" fill="#C5A059" />
                </g>

                {/* 3D GARMENT CANVAS */}
                <g id="standalone-3d-garment" transform="translate(20, 0)">
                  
                  {/* PAIRED BOTTOM UNDERNEATH THE TOP GARMENT */}
                  {!isBottomModel && pairedBottom === 'quan-ong-xeo' && (
                    <g id="paired-quan-ong-xeo" opacity="0.95">
                      <path
                        d="M156,204 L180,204 L174,260 L168,435 L124,435 L146,260 Z"
                        fill="url(#whiteSilkPantsGrad)"
                        stroke="#C8B39B"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M180,204 L204,204 L214,260 L236,435 L192,435 L186,260 Z"
                        fill="url(#whiteSilkPantsGrad)"
                        stroke="#C8B39B"
                        strokeWidth="1.2"
                      />
                      <line x1="180" y1="204" x2="180" y2="280" stroke="#BFA992" strokeWidth="1.2" />
                      <path d="M146,220 Q148,330 142,435" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity="0.6" />
                      <path d="M214,220 Q212,330 218,435" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity="0.6" />
                    </g>
                  )}

                  {!isBottomModel && pairedBottom === 'vay-xep-ly-dai' && (
                    <g id="paired-vay-xep-ly-dai" opacity="0.95">
                      <path d="M158,204 L202,204 L244,435 Q180,442 116,435 Z" fill="url(#whiteSilkWideSkirtGrad)" stroke="#C8B39B" strokeWidth="1.2" />
                      <path d="M164,210 L134,435" stroke="#BFA992" strokeWidth="1" />
                      <path d="M166,210 L142,436" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.8" />
                      <path d="M172,210 L156,437" stroke="#BFA992" strokeWidth="1" />
                      <path d="M174,210 L164,438" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.8" />
                      <path d="M180,210 L180,439" stroke="#BFA992" strokeWidth="1.2" />
                      <path d="M181,210 L182,439" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.85" />
                      <path d="M188,210 L196,438" stroke="#BFA992" strokeWidth="1" />
                      <path d="M186,210 L204,437" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.8" />
                      <path d="M196,210 L226,435" stroke="#BFA992" strokeWidth="1" />
                      <path d="M194,210 L218,436" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.8" />
                    </g>
                  )}

                  {!isBottomModel && pairedBottom === 'vay-lua-bong' && (
                    <g id="paired-vay-lua-bong" opacity="0.95">
                      <path d="M158,204 L202,204 Q212,240 208,275 Q214,360 234,434 Q180,440 126,434 Q146,360 152,275 Q148,240 158,204 Z" fill="url(#whiteSilkWideSkirtGrad)" stroke="#C8B39B" strokeWidth="1.2" />
                      <path d="M166,225 Q158,320 148,434" stroke="#FFFFFF" strokeWidth="2.4" fill="none" opacity="0.85" />
                      <path d="M186,225 Q192,320 204,435" stroke="#FFFFFF" strokeWidth="2.4" fill="none" opacity="0.85" />
                      <path d="M178,212 Q180,310 182,438" stroke="#FFFFFF" strokeWidth="2.8" fill="none" opacity="0.9" />
                    </g>
                  )}

                  {!isBottomModel && pairedBottom === 'vay-dup-trang' && (
                    <g id="paired-vay-dup-trang" opacity="0.95">
                      <path
                        d="M156,204 L204,204 L240,435 Q180,442 120,435 Z"
                        fill="url(#whiteSilkWideSkirtGrad)"
                        stroke="#C8B39B"
                        strokeWidth="1.3"
                      />
                      <path d="M164,204 Q152,320 140,435" stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.7" />
                      <path d="M180,204 Q180,320 180,438" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
                      <path d="M196,204 Q208,320 220,435" stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.7" />
                    </g>
                  )}

                  {!isBottomModel && pairedBottom === 'quan-den' && (
                    <g id="paired-quan-den" opacity="0.95">
                      <path
                        d="M156,204 L180,204 L174,260 L168,435 L124,435 L146,260 Z"
                        fill="#18181B"
                        stroke="#09090B"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M180,204 L204,204 L214,260 L236,435 L192,435 L186,260 Z"
                        fill="#18181B"
                        stroke="#09090B"
                        strokeWidth="1.2"
                      />
                      <line x1="180" y1="204" x2="180" y2="280" stroke="#27272A" strokeWidth="1.2" />
                      <path d="M146,220 Q148,330 142,435" stroke="#52525B" strokeWidth="1.4" fill="none" opacity="0.6" />
                      <path d="M214,220 Q212,330 218,435" stroke="#52525B" strokeWidth="1.4" fill="none" opacity="0.6" />
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 1. ÁO NGŨ THÂN CÁCH TÂN: HOA 3D & OMBRE KHÚC XẠ                */}
                  {/* ============================================================== */}
                  {selectedType === 'ngu-than-cach-tan' && (
                    <g id="3d-ngu-than-cach-tan">
                      {!isBackView && (
                        <g id="3d-coral-inner-slip">
                          <line x1="164" y1="126" x2="164" y2="140" stroke="#FB7185" strokeWidth="1.8" />
                          <line x1="196" y1="126" x2="196" y2="140" stroke="#FB7185" strokeWidth="1.8" />
                          <path d="M158,138 Q180,146 202,138 L208,285 L152,285 Z" fill="url(#coralPinkSlip3D)" stroke="#F43F5E" strokeWidth="0.8" />
                        </g>
                      )}

                      {/* Tay áo lỡ / rộng với đường may can ngang nhẹ ở bắp tay */}
                      <g id="3d-cach-tan-sleeves">
                        <path
                          d="M138,134 Q124,165 128,198 Q136,220 162,228 L166,218 Q148,212 144,192 Q138,165 148,142 Z"
                          fill="url(#iridescentLavenderJade3D)"
                          stroke="#0D9488"
                          strokeWidth="1.5"
                        />
                        <line x1="131" y1="168" x2="146" y2="171" stroke="#0D9488" strokeWidth="1.3" strokeDasharray="1.5 1.5" />
                        <ellipse cx="164" cy="223" rx="3.5" ry="5.5" fill="none" stroke="#0D9488" strokeWidth="2" />

                        <path
                          d="M222,134 Q236,165 232,198 Q224,220 198,228 L194,218 Q212,212 216,192 Q222,165 212,142 Z"
                          fill="url(#iridescentLavenderJade3D)"
                          stroke="#0D9488"
                          strokeWidth="1.5"
                        />
                        <line x1="229" y1="168" x2="214" y2="171" stroke="#0D9488" strokeWidth="1.3" strokeDasharray="1.5 1.5" />
                        <ellipse cx="196" cy="223" rx="3.5" ry="5.5" fill="none" stroke="#0D9488" strokeWidth="2" />
                      </g>

                      {/* Thân áo ngũ thân tơ organza ánh sắc tím lavender - xanh ngọc */}
                      <path
                        d="M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L215,190 L224,365 L136,365 L145,190 Z"
                        fill="url(#iridescentLavenderJade3D)"
                        stroke="#0D9488"
                        strokeWidth="1.6"
                      />

                      {/* Đường Trung Phùng chính giữa viền xanh ngọc */}
                      <line x1="180" y1="124" x2="180" y2="365" stroke="#0D9488" strokeWidth="1.4" opacity="0.85" />
                      <line x1="136" y1="365" x2="224" y2="365" stroke="#0D9488" strokeWidth="2.5" />
                      <line x1="145" y1="190" x2="136" y2="365" stroke="#0D9488" strokeWidth="1.6" />
                      <line x1="215" y1="190" x2="224" y2="365" stroke="#0D9488" strokeWidth="1.6" />

                      {/* Front View: Vạt chéo, cổ nẹp xanh ngọc và DẢI KHUY HOA VẢI 3D */}
                      {!isBackView ? (
                        <>
                          <path
                            d="M180,124 Q194,136 199,160 L198,206 L196,365"
                            stroke="#0D9488"
                            strokeWidth="2"
                            fill="none"
                          />
                          <rect x="172" y="106" width="16" height="19" rx="2" fill="url(#iridescentLavenderJade3D)" stroke="#0D9488" strokeWidth="2" />
                          <circle cx="180" cy="115" r="3" fill="#0D9488" stroke="#042F2E" strokeWidth="1" />
                          <circle cx="179.3" cy="114.3" r="1.1" fill="#A7F3D0" />

                          {/* DẢI KHUY HOA VẢI 3D ĐÍNH NỔI */}
                          <g id="3d-flowers-row">
                            {[
                              { cx: 184, cy: 126 },
                              { cx: 191, cy: 140 },
                              { cx: 197, cy: 156 },
                              { cx: 199, cy: 173 },
                              { cx: 198, cy: 191 },
                              { cx: 197, cy: 208 },
                            ].map((pos, idx) => (
                              <g key={idx} transform={`translate(${pos.cx}, ${pos.cy})`}>
                                {[0, 72, 144, 216, 288].map((deg) => (
                                  <ellipse
                                    key={deg}
                                    cx="0"
                                    cy="-3.4"
                                    rx="1.7"
                                    ry="2.6"
                                    fill="#FFFFFF"
                                    fillOpacity="0.96"
                                    stroke="#E2E8F0"
                                    strokeWidth="0.4"
                                    transform={`rotate(${deg})`}
                                    filter="drop-shadow(0 1px 1px rgba(0,0,0,0.15))"
                                  />
                                ))}
                                <circle cx="0" cy="0" r="1.2" fill="#0D9488" stroke="#042F2E" strokeWidth="0.4" />
                              </g>
                            ))}
                          </g>
                        </>
                      ) : (
                        <g id="3d-back-view-cach-tan">
                          <rect x="172" y="106" width="16" height="19" rx="2" fill="url(#iridescentLavenderJade3D)" stroke="#0D9488" strokeWidth="2" />
                          <line x1="180" y1="124" x2="180" y2="365" stroke="#0D9488" strokeWidth="1.6" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 2. ÁO NGŨ THÂN TAY CHẼN & TAY THỤNG                           */}
                  {/* ============================================================== */}
                  {(selectedType === 'tay-chen' || selectedType === 'tay-thung') && (
                    <g id="ngu-than-traditional">
                      {selectedType === 'tay-chen' ? (
                        <g id="tay-chen-sleeves">
                          <path d="M138,134 Q128,165 132,195 Q136,215 158,222 L162,212 Q146,206 142,190 Q138,165 148,142 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.2" />
                          <path d="M222,134 Q232,165 228,195 Q224,215 202,222 L198,212 Q214,206 218,190 Q222,165 212,142 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.2" />
                        </g>
                      ) : (
                        <g id="tay-thung-sleeves">
                          <path d="M138,134 Q116,165 110,215 Q106,245 142,260 L146,244 Q124,234 128,210 Q132,168 148,142 Z" fill="url(#innerIvorySilk)" stroke="#C8B39B" strokeWidth="1.2" />
                          <path d="M222,134 Q244,165 250,215 Q254,245 218,260 L214,244 Q236,234 232,210 Q228,168 212,142 Z" fill="url(#innerIvorySilk)" stroke="#C8B39B" strokeWidth="1.2" />
                          <path d="M136,134 Q114,165 106,218 Q102,250 144,264 L146,244 Q124,234 128,210 Q132,168 148,142 Z" fill="url(#outerTranslucentSilk)" stroke="#C8B39B" strokeWidth="1" />
                          <path d="M224,134 Q246,165 254,218 Q258,250 216,264 L214,244 Q236,234 232,210 Q228,168 212,142 Z" fill="url(#outerTranslucentSilk)" stroke="#C8B39B" strokeWidth="1" />
                          <path d="M142,246 Q180,268 218,246 L214,258 Q180,278 146,258 Z" fill="url(#innerIvorySilk)" stroke="#C8B39B" strokeWidth="1.2" />
                        </g>
                      )}

                      <path
                        d={selectedType === 'tay-thung'
                          ? "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L216,190 L228,410 L132,410 L144,190 Z"
                          : "M138,134 Q155,127 173,124 L187,124 Q205,127 222,134 L215,190 L222,355 L138,355 L145,190 Z"
                        }
                        fill="url(#studioWhiteSilk)"
                        stroke="#C8B39B"
                        strokeWidth="1.4"
                      />

                      <line x1="180" y1="124" x2="180" y2={selectedType === 'tay-thung' ? '410' : '355'} stroke="#C8B39B" strokeWidth="1.2" />

                      {!isBackView ? (
                        <>
                          <path d="M180,124 Q194,136 199,160 L198,206 L196,355" stroke="#C8B39B" strokeWidth="1.4" fill="none" />
                          <rect x="172" y="106" width="16" height="19" rx="2" fill="url(#studioWhiteSilk)" stroke="#8C735A" strokeWidth="1.4" />
                          {selectedType === 'tay-chen' && (
                            <g id="khuy-ngu-than">
                              <circle cx="180" cy="115" r="2.5" fill="#FAF5EC" stroke="#78531A" strokeWidth="0.8" />
                              <circle cx="185" cy="128" r="2.5" fill="#FAF5EC" stroke="#78531A" strokeWidth="0.8" />
                              <circle cx="192" cy="142" r="2.5" fill="#FAF5EC" stroke="#78531A" strokeWidth="0.8" />
                              <circle cx="198" cy="160" r="2.5" fill="#FAF5EC" stroke="#78531A" strokeWidth="0.8" />
                              <circle cx="198" cy="190" r="2.5" fill="#FAF5EC" stroke="#78531A" strokeWidth="0.8" />
                            </g>
                          )}
                        </>
                      ) : (
                        <g id="back-view-lap-linh">
                          <rect x="172" y="106" width="16" height="19" rx="2" fill="url(#studioWhiteSilk)" stroke="#8C735A" strokeWidth="1.4" />
                          <line x1="180" y1="124" x2="180" y2={selectedType === 'tay-thung' ? '410' : '355'} stroke="#8C735A" strokeWidth="1.5" />
                        </g>
                      )}
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 3. ÁO TỨ THÂN                                                  */}
                  {/* ============================================================== */}
                  {selectedType === 'tu-than' && (
                    <g id="tu-than-standalone">
                      {tuThanShowInnerYem && (
                        <g id="yem-lot-trong">
                          <path d="M168,135 L192,135 L204,195 L156,195 Z" fill="#FFFDF5" stroke="#C8B39B" strokeWidth="1.2" />
                          <circle cx="180" cy="146" r="3.5" fill="none" stroke="#D97706" strokeWidth="0.8" />
                        </g>
                      )}

                      <g id="tu-than-sleeves">
                        <path d="M138,134 Q128,165 130,200 Q136,224 160,230 L164,220 Q146,214 142,196 Q138,165 148,142 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.2" />
                        <path d="M222,134 Q232,165 230,200 Q224,224 200,230 L196,220 Q214,214 218,196 Q222,165 212,142 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.2" />
                      </g>

                      {isBackView ? (
                        <g id="tu-than-back-view">
                          <path d="M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L214,190 L226,420 L134,420 L146,190 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.4" />
                          <line x1="180" y1="124" x2="180" y2="420" stroke="#8C735A" strokeWidth="2.2" />
                        </g>
                      ) : (
                        <g id="tu-than-front-view">
                          {tuThanWearingStyle === 'buong-tha' ? (
                            <>
                              <path d="M138,134 Q146,155 146,198 L138,420 L122,420 L132,198 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.4" />
                              <path d="M222,134 Q214,155 214,198 L222,420 L238,420 L228,198 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.4" />
                            </>
                          ) : (
                            <>
                              <path d="M138,134 Q148,155 152,198 L168,220 L166,420 L142,420 L146,198 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.4" />
                              <path d="M222,134 Q212,155 208,198 L192,220 L194,420 L218,420 L214,198 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.4" />
                              <path d="M174,204 Q178,225 174,265 L168,300" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
                              <path d="M186,204 Q182,225 186,265 L192,300" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
                            </>
                          )}
                          {tuThanShowSash && (
                            <g id="dai-that-lung-lua">
                              <rect x="156" y="198" width="48" height="13" rx="3" fill="#0D9488" stroke="#042F2E" strokeWidth="0.8" />
                              <path d="M177,204 Q172,232 170,265" stroke="#0D9488" strokeWidth="3.8" strokeLinecap="round" fill="none" />
                              <path d="M183,204 Q188,232 190,265" stroke="#0D9488" strokeWidth="3.8" strokeLinecap="round" fill="none" />
                            </g>
                          )}
                        </g>
                      )}
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 4. ÁO BÀ BA                                                    */}
                  {/* ============================================================== */}
                  {selectedType === 'ba-ba' && (
                    <g id="ba-ba-standalone">
                      <g id="ba-ba-sleeves">
                        <path d="M138,136 Q130,170 134,208 Q140,230 160,238 L165,228 Q148,222 144,200 Q142,170 148,142 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.2" />
                        <path d="M222,136 Q230,170 226,208 Q220,230 200,238 L195,228 Q212,222 216,200 Q218,170 212,142 Z" fill="url(#studioWhiteSilk)" stroke="#C8B39B" strokeWidth="1.2" />
                      </g>

                      {isBackView ? (
                        <g id="ba-ba-back-view-seamless">
                          <path
                            d={baBaGenderCut === 'nam'
                              ? "M136,134 Q155,127 172,124 L188,124 Q205,127 224,134 L218,180 L222,268 Q180,272 138,268 L142,180 Z"
                              : "M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q196,202 216,268 Q197,273 180,270 Q163,273 144,268 Q164,202 148,180 Z"
                            }
                            fill="url(#studioWhiteSilk)"
                            stroke="#C8B39B"
                            strokeWidth="1.4"
                          />
                          {baBaGenderCut === 'nu' && (
                            <g id="chiet-eo-sau">
                              <path d="M166,175 Q164,200 166,225" stroke="#BFA992" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                              <path d="M194,175 Q196,200 194,225" stroke="#BFA992" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                            </g>
                          )}
                          <path d="M144,242 L138,268" stroke="#8C735A" strokeWidth="1.8" fill="none" />
                          <path d="M216,242 L222,268" stroke="#8C735A" strokeWidth="1.8" fill="none" />
                        </g>
                      ) : (
                        <g id="ba-ba-front-view">
                          <path
                            d={baBaGenderCut === 'nam'
                              ? "M136,134 Q155,127 172,124 L188,124 Q205,127 224,134 L218,180 L222,268 Q180,272 138,268 L142,180 Z"
                              : "M138,134 Q155,127 172,124 L188,124 Q205,127 222,134 L212,180 Q196,202 216,268 Q197,273 180,270 Q163,273 144,268 Q164,202 148,180 Z"
                            }
                            fill="url(#studioWhiteSilk)"
                            stroke="#C8B39B"
                            strokeWidth="1.4"
                          />
                          <path d="M148,238 L144,268" stroke="#8C735A" strokeWidth="1.6" fill="none" />
                          <path d="M212,238 L216,268" stroke="#8C735A" strokeWidth="1.6" fill="none" />

                          {baBaNeckline === 'co-tim' ? (
                            <path d="M170,122 Q177,132 180,136 Q183,132 190,122" stroke="#8C735A" strokeWidth="1.6" fill="none" />
                          ) : baBaNeckline === 'co-vuong' ? (
                            <path d="M172,122 L172,131 L188,131 L188,122" stroke="#8C735A" strokeWidth="1.6" fill="none" />
                          ) : (
                            <path d="M170,122 Q180,130 190,122" stroke="#8C735A" strokeWidth="1.6" fill="none" />
                          )}

                          <line x1="180" y1="130" x2="180" y2="268" stroke="#8C735A" strokeWidth="1.4" opacity="0.85" />
                          <g id="cuc-doc-giua">
                            {[140, 162, 184, 206, 228, 250].map((cy, i) => (
                              <circle key={i} cx="180" cy={cy} r="2.2" fill="#FAF5EC" stroke="#78531A" strokeWidth="0.8" />
                            ))}
                          </g>

                          {baBaPocketStyle === 'tui-to' ? (
                            <g id="tui-to">
                              <rect x="150" y="222" width="22" height="24" rx="2.5" fill="none" stroke="#8C735A" strokeWidth="1.3" />
                              <rect x="188" y="222" width="22" height="24" rx="2.5" fill="none" stroke="#8C735A" strokeWidth="1.3" />
                            </g>
                          ) : baBaPocketStyle === 'tui-nho' ? (
                            <g id="tui-nho">
                              <rect x="156" y="228" width="16" height="18" rx="2" fill="none" stroke="#8C735A" strokeWidth="1.1" />
                              <rect x="188" y="228" width="16" height="18" rx="2" fill="none" stroke="#8C735A" strokeWidth="1.1" />
                            </g>
                          ) : null}
                        </g>
                      )}
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 5. MÔ HÌNH 3D RIÊNG: CHÂN VÁY XẾP LY DÀI PHOM CHỮ A CHẠM ĐẤT   */}
                  {/* ============================================================== */}
                  {selectedType === 'vay-xep-ly-dai' && (
                    <g id="3d-standalone-vay-xep-ly-dai">
                      {/* Cạp cao bản vừa phẳng phiu đứng dáng */}
                      <rect x="156" y="154" width="48" height="15" rx="1.5" fill="url(#whiteSilkWideSkirtGrad)" stroke="#8C735A" strokeWidth="1.3" />
                      <line x1="156" y1="169" x2="204" y2="169" stroke="#8C735A" strokeWidth="1.2" opacity="0.8" />

                      {/* Thân váy phom chữ A dày dặn đứng dáng không rũ gãy */}
                      <path d="M156,169 L204,169 L262,444 Q180,454 98,444 Z" fill="url(#whiteSilkWideSkirtGrad)" stroke="#8C735A" strokeWidth="1.5" />

                      {/* Các nếp xếp ly bản lớn đối xứng mở rộng dần về phía gấu */}
                      <path d="M160,169 L104,444" stroke="#8C735A" strokeWidth="1.2" />
                      <path d="M162,169 L114,445" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.85" />

                      <path d="M168,169 L132,446" stroke="#8C735A" strokeWidth="1.2" />
                      <path d="M170,169 L142,447" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.85" />

                      <path d="M174,169 L158,448" stroke="#8C735A" strokeWidth="1.2" />
                      <path d="M176,169 L168,449" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.85" />

                      {/* Nếp chính giữa */}
                      <path d="M180,169 L180,450" stroke="#8C735A" strokeWidth="1.5" />
                      <path d="M181,169 L182,450" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />

                      <path d="M186,169 L202,448" stroke="#8C735A" strokeWidth="1.2" />
                      <path d="M184,169 L192,449" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.85" />

                      <path d="M192,169 L228,446" stroke="#8C735A" strokeWidth="1.2" />
                      <path d="M190,169 L218,447" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.85" />

                      <path d="M200,169 L256,444" stroke="#8C735A" strokeWidth="1.2" />
                      <path d="M198,169 L246,445" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.85" />

                      {/* Gấu lượn sóng tự nhiên theo nếp gấp mí phẳng */}
                      <path
                        d="M98,444 Q116,448 132,446 Q146,450 158,448 Q170,452 180,450 Q190,452 202,448 Q216,450 228,446 Q244,448 262,444"
                        stroke="#8C735A"
                        strokeWidth="1.6"
                        fill="none"
                      />
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 8. MÔ HÌNH 3D RIÊNG: CHÂN VÁY LỤA SATIN CẮT XÉO BIAS CUT        */}
                  {/* ============================================================== */}
                  {selectedType === 'vay-lua-bong' && (
                    <g id="3d-standalone-vay-lua-bong">
                      {/* Cạp phẳng phiu ôm gọn vòng eo */}
                      <rect x="156" y="156" width="48" height="12" rx="1.5" fill="url(#whiteSilkWideSkirtGrad)" stroke="#8C735A" strokeWidth="1.2" />

                      {/* Phom cắt xéo bias cut: ôm nhẹ hông rồi buông rủ xòe nhẹ gấu */}
                      <path
                        d="M156,168 L204,168 Q216,210 212,255 Q218,350 242,442 Q180,450 118,442 Q142,350 148,255 Q144,210 156,168 Z"
                        fill="url(#whiteSilkWideSkirtGrad)"
                        stroke="#8C735A"
                        strokeWidth="1.4"
                      />

                      {/* Các dải sóng mềm mại dọc thân theo đường cắt xéo của lụa satin */}
                      <path d="M164,185 Q152,310 138,442" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
                      <path d="M174,195 Q164,325 156,444" stroke="#BFA992" strokeWidth="1.4" fill="none" opacity="0.5" />
                      <path d="M188,185 Q196,310 218,442" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
                      <path d="M198,195 Q208,325 228,444" stroke="#BFA992" strokeWidth="1.4" fill="none" opacity="0.5" />
                      <path d="M180,175 Q180,310 180,446" stroke="#FFFFFF" strokeWidth="3.2" fill="none" opacity="0.95" />

                      {/* Gấu váy lượn sóng bay bổng uyển chuyển */}
                      <path d="M118,442 Q180,450 242,442" stroke="#8C735A" strokeWidth="1.5" fill="none" />
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 9. MÔ HÌNH 3D RIÊNG: QUẦN LỤA TRẮNG ỐNG XÉO CỔ PHỤC             */}
                  {/* ============================================================== */}
                  {selectedType === 'quan-ong-xeo' && (
                    <g id="3d-standalone-quan-ong-xeo">
                      <rect x="154" y="160" width="52" height="14" rx="2.5" fill="#FAF7F2" stroke="#8C735A" strokeWidth="1.2" />
                      <path
                        d="M154,174 L180,174 L174,250 L166,442 L116,442 L142,250 Z"
                        fill="url(#whiteSilkPantsGrad)"
                        stroke="#8C735A"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M180,174 L206,174 L218,250 L244,442 L194,442 L186,250 Z"
                        fill="url(#whiteSilkPantsGrad)"
                        stroke="#8C735A"
                        strokeWidth="1.4"
                      />
                      <line x1="180" y1="174" x2="180" y2="265" stroke="#8C735A" strokeWidth="1.4" />
                      <path d="M142,190 Q146,310 136,440" stroke="#FFFFFF" strokeWidth="2.2" fill="none" opacity="0.8" />
                      <path d="M160,250 Q156,340 152,440" stroke="#BFA992" strokeWidth="1.2" fill="none" opacity="0.6" />
                      <path d="M218,190 Q214,310 224,440" stroke="#FFFFFF" strokeWidth="2.2" fill="none" opacity="0.8" />
                      <path d="M200,250 Q204,340 208,440" stroke="#BFA992" strokeWidth="1.2" fill="none" opacity="0.6" />
                    </g>
                  )}

                  {/* ============================================================== */}
                  {/* 10. MÔ HÌNH 3D RIÊNG: VÁY ĐỤP LỤA TRẮNG XÒE RỘNG KINH BẮC       */}
                  {/* ============================================================== */}
                  {selectedType === 'vay-dup-trang' && (
                    <g id="3d-standalone-vay-dup-trang">
                      <path
                        d="M152,156 L208,156 L212,174 L148,174 Z"
                        fill="#FAF7F2"
                        stroke="#8C735A"
                        strokeWidth="1.3"
                      />
                      <line x1="162" y1="156" x2="160" y2="174" stroke="#8C735A" strokeWidth="0.8" opacity="0.5" />
                      <line x1="180" y1="156" x2="180" y2="174" stroke="#8C735A" strokeWidth="0.8" opacity="0.5" />
                      <line x1="198" y1="156" x2="200" y2="174" stroke="#8C735A" strokeWidth="0.8" opacity="0.5" />

                      <path
                        d="M148,174 L212,174 L258,445 Q180,455 102,445 Z"
                        fill="url(#whiteSilkWideSkirtGrad)"
                        stroke="#8C735A"
                        strokeWidth="1.5"
                      />
                      <path d="M158,174 Q142,310 122,445" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.85" />
                      <path d="M168,174 Q160,310 148,448" stroke="#BFA992" strokeWidth="1.4" fill="none" opacity="0.5" />
                      <path d="M180,174 Q180,310 180,452" stroke="#FFFFFF" strokeWidth="2.8" fill="none" opacity="0.9" />
                      <path d="M192,174 Q200,310 212,448" stroke="#BFA992" strokeWidth="1.4" fill="none" opacity="0.5" />
                      <path d="M202,174 Q218,310 238,445" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.85" />
                      <path d="M102,445 Q180,455 258,445" stroke="#8C735A" strokeWidth="1.6" fill="none" />
                    </g>
                  )}
                </g>

                {/* Technical Haute Couture Markers & Annotations */}
                {showTechnicalMarkers && (
                  <g id="technical-couture-markers" opacity="0.95" className="transition-all duration-300 pointer-events-none">
                    {/* Markers for Ngũ Thân Cách Tân */}
                    {selectedType === 'ngu-than-cach-tan' && (
                      <>
                        {!isBackView ? (
                          <>
                            <line x1="198" y1="165" x2="305" y2="155" stroke="#0D9488" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="198" cy="165" r="3.5" fill="#0D9488" />
                            <rect x="290" y="142" width="105" height="30" rx="4" fill="#1C1917" stroke="#0D9488" strokeWidth="0.8" />
                            <text x="342" y="154" fill="#5EEAD4" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                              Hoa Vải 3D Đính Nổi
                            </text>
                            <text x="342" y="165" fill="#A7F3D0" fontSize="6.5" textAnchor="middle">
                              (5 cánh thủ công dọc vạt chéo)
                            </text>

                            <line x1="180" y1="112" x2="70" y2="95" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="180" cy="112" r="3" fill="#10B981" />
                            <rect x="15" y="85" width="95" height="28" rx="4" fill="#1C1917" stroke="#10B981" strokeWidth="0.8" />
                            <text x="62" y="97" fill="#6EE7B7" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                              Viền Nẹp Xanh Ngọc
                            </text>
                            <text x="62" y="107" fill="#A7F3D0" fontSize="6.5" textAnchor="middle">
                              (Khuy tết vải xanh đỉnh cổ)
                            </text>

                            <line x1="180" y1="260" x2="70" y2="280" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="180" cy="260" r="3.5" fill="#C084FC" />
                            <rect x="10" y="268" width="105" height="32" rx="4" fill="#1C1917" stroke="#C084FC" strokeWidth="0.8" />
                            <text x="62" y="280" fill="#E9D5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                              Khúc Xạ Màu Ombre
                            </text>
                            <text x="62" y="291" fill="#DDD6FE" fontSize="6.5" textAnchor="middle">
                              (Tơ tím/ngọc phủ slip hồng)
                            </text>
                          </>
                        ) : null}
                      </>
                    )}

                    {/* Markers for Váy Xếp Ly Dài */}
                    {selectedType === 'vay-xep-ly-dai' && (
                      <>
                        <line x1="180" y1="162" x2="65" y2="155" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="180" cy="162" r="3" fill="#F59E0B" />
                        <rect x="10" y="142" width="105" height="30" rx="4" fill="#1C1917" stroke="#F59E0B" strokeWidth="0.8" />
                        <text x="62" y="154" fill="#FEF08A" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          Cạp Cao Phẳng Đứng Dáng
                        </text>
                        <text x="62" y="165" fill="#FDE047" fontSize="6.5" textAnchor="middle">
                          (Phân chia tỷ lệ chuẩn mực)
                        </text>

                        <line x1="142" y1="310" x2="65" y2="300" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="142" cy="310" r="3" fill="#F59E0B" />
                        <rect x="10" y="288" width="105" height="30" rx="4" fill="#1C1917" stroke="#F59E0B" strokeWidth="0.8" />
                        <text x="62" y="300" fill="#FEF08A" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          Nếp Ly Bản Lớn Đối Xứng
                        </text>
                        <text x="62" y="311" fill="#FDE047" fontSize="6.5" textAnchor="middle">
                          (Mở rộng dần, thẳng tắp như sọc)
                        </text>

                        <line x1="180" y1="450" x2="305" y2="435" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="180" cy="450" r="3" fill="#F59E0B" />
                        <rect x="280" y="420" width="115" height="30" rx="4" fill="#1C1917" stroke="#F59E0B" strokeWidth="0.8" />
                        <text x="337" y="432" fill="#FEF08A" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          Gấu Lượn Sóng Chạm Đất
                        </text>
                        <text x="337" y="443" fill="#FDE047" fontSize="6.5" textAnchor="middle">
                          (Gấp mí phẳng, phồng chữ A)
                        </text>
                      </>
                    )}

                    {/* Markers for Váy Lụa Satin */}
                    {selectedType === 'vay-lua-bong' && (
                      <>
                        <line x1="180" y1="162" x2="65" y2="155" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="180" cy="162" r="3" fill="#F59E0B" />
                        <rect x="10" y="142" width="105" height="30" rx="4" fill="#1C1917" stroke="#F59E0B" strokeWidth="0.8" />
                        <text x="62" y="154" fill="#FEF08A" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          Lụa Satin Bóng Mờ
                        </text>
                        <text x="62" y="165" fill="#FDE047" fontSize="6.5" textAnchor="middle">
                          (Trắng ngà trơn mịn tối giản)
                        </text>

                        <line x1="160" y1="300" x2="65" y2="290" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="160" cy="300" r="3" fill="#F59E0B" />
                        <rect x="10" y="278" width="105" height="30" rx="4" fill="#1C1917" stroke="#F59E0B" strokeWidth="0.8" />
                        <text x="62" y="290" fill="#FEF08A" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          Kỹ Thuật Cắt Xéo Bias Cut
                        </text>
                        <text x="62" y="301" fill="#FDE047" fontSize="6.5" textAnchor="middle">
                          (Ôm nhẹ hông rồi buông dải sóng)
                        </text>

                        <line x1="180" y1="445" x2="305" y2="435" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="180" cy="445" r="3" fill="#F59E0B" />
                        <rect x="280" y="420" width="115" height="30" rx="4" fill="#1C1917" stroke="#F59E0B" strokeWidth="0.8" />
                        <text x="337" y="432" fill="#FEF08A" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          Gấu Xòe Lượn Sóng Nhẹ
                        </text>
                        <text x="337" y="443" fill="#FDE047" fontSize="6.5" textAnchor="middle">
                          (Uyển chuyển theo từng bước đi)
                        </text>
                      </>
                    )}
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom 360 Degree Rotation Slider Bar & Zoom Tools */}
            <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between z-20 pointer-events-auto gap-2">
              <div className="bg-black/75 backdrop-blur-md px-2 py-1 rounded-xl border border-white/15 flex items-center gap-1.5 text-white text-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.1))}
                  className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 cursor-pointer font-bold"
                  title="Thu nhỏ"
                >
                  -
                </button>
                <span className="text-[11px] font-mono px-1">{(zoomLevel * 100).toFixed(0)}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(1.35, prev + 0.1))}
                  className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 cursor-pointer font-bold"
                  title="Phóng to"
                >
                  +
                </button>
              </div>

              {/* Interactive 360 Rotation Slider */}
              <div className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 flex items-center gap-2 max-w-xs flex-1">
                <Rotate3d className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={normalizedAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  title="Kéo trượt để xoay 360 độ"
                />
                <span className="text-[11px] font-mono text-amber-300 font-bold shrink-0">
                  {normalizedAngle.toFixed(0)}°
                </span>
              </div>

              {/* Technical Blueprint Toggle */}
              <button
                type="button"
                onClick={() => setShowTechnicalMarkers(!showTechnicalMarkers)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  showTechnicalMarkers 
                    ? 'bg-amber-500/90 text-black border-amber-300 shadow-xs' 
                    : 'bg-black/70 text-white/80 border-white/15 hover:bg-black/85'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{showTechnicalMarkers ? 'Ẩn thông số' : 'Hiện thông số'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Haute Couture Designer Material Palette & Controls (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white p-4 lg:p-6 overflow-y-auto space-y-4 scrollbar-thin">
            {/* Atelier Introduction Box */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E1E]">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>BẢN VẼ CHI TIẾT CỦA NHÀ THIẾT KẾ</span>
              </div>
              <p className="text-xs text-[#5A4A3E] leading-relaxed">
                {selectedType === 'ngu-than-cach-tan' && (
                  'Áo Ngũ Thân Cách Tân: Điểm nhấn nổi bật với hàng khuy hoa vải 3D đính nổi 5 cánh màu trắng mờ dọc theo đường vạt chéo. Viền nẹp màu xanh ngọc định hình quanh cổ, vạt chéo, cửa tay và tà áo; khuy tết xanh ngọc ở đỉnh cổ. Lớp tơ organza ánh tím lavender phối ánh xanh ngọc phủ lên đầm hai dây hồng san hô tạo hiệu ứng khúc xạ màu đa tầng kỳ ảo.'
                )}
                {selectedType === 'vay-xep-ly-dai' && (
                  'Chân Váy Xếp Ly Dài: Phong cách cổ điển tối giản hoàn toàn trơn màu trắng kem/trắng ngà mờ lì trang nhã. Chất vải dày dặn giữ phom tốt, giữ độ phồng chữ A tự nhiên không bị rũ gãy. Cạp cao bản vừa phẳng phiu đứng dáng, ngay dưới cạp là các đường xếp ly bản lớn đối xứng mở rộng dần về gấu chạy thẳng tắp như đường kẻ sọc tự nhiên kéo dài tỷ lệ cơ thể. Chân váy dài chạm đất, viền gấp mí phẳng chỉn chu, gấu lượn sóng mềm mại theo bước đi.'
                )}
                {selectedType === 'vay-lua-bong' && (
                  'Chân Váy Lụa Satin Cắt Xéo: Phong cách tối giản thanh lịch trơn màu hoàn toàn, sắc trắng ngà trang nhã cùng độ bóng mờ sang trọng của lụa satin mượt mà. Cạp váy phẳng phiu ôm gọn eo kết hợp kỹ thuật cắt xéo vải (bias cut) tinh tế giúp thân váy ôm nhẹ phần hông rồi buông rủ thành những dải sóng mềm mại dọc thân, xòe nhẹ duyên dáng về phía gấu lượn sóng uyển chuyển.'
                )}
                {selectedType === 'quan-ong-xeo' && (
                  'Quần Lụa Trắng Ngà Ống Xéo: Thiết kế ống rộng (ống xéo) xòe nhẹ tự nhiên ở gấu của cổ phục Việt Nam, suông thẳng từ hông, rủ dài chạm đất phủ mắt cá chân. Chất liệu lụa tự nhiên bóng mờ sang trọng, cạp cao phẳng phiu phối chuẩn mực cùng áo ngũ thân và tứ thân.'
                )}
                {selectedType === 'vay-dup-trang' && (
                  'Váy Đụp Lụa Trắng Xòe Rộng: Phom dáng xòe tròn rộng thênh thang từ hông xuống chấm gót của phụ nữ Kinh Bắc xưa. Chất lụa tơ tự nhiên màu trắng ngà bắt sáng nhũ mờ dịu dàng, sóng vải xếp nếp rủ bay bổng, cạp quây cao phẳng dồn nếp khéo léo bên dưới áo yếm.'
                )}
                {selectedType === 'tu-than' && (
                  'Áo Tứ Thân: Thân sau gồm 2 thân may liền nhau ở sống lưng, 2 vạt trước rời nhau KHÔNG CÓ KHUY CÀI. Tùy biến cách mặc: buộc thắt gọn gàng trước bụng hoặc buông thả mềm mại, phối yếm lót trong và dải thắt lưng lụa mềm buông thả ở eo.'
                )}
                {selectedType === 'ba-ba' && (
                  'Áo Bà Ba: Thân sau may bằng một mảnh vải nguyên vẹn không chắp nối; thân trước gồm 2 tà với một dải khuy cúc cài dọc ở giữa. Áo dài trùm mông, xẻ tà 2 bên hông; nữ chít eo tôn dáng, nam suông rộng.'
                )}
                {selectedType === 'tay-chen' && (
                  'Áo Ngũ Thân Tay Chẽn: Phom suông đoan chính, thẳng thớm không chiết eo. Cấu trúc 5 thân ghép qua đường trung phùng và vạt hò ẩn; tay chẽn ôm gọn tới cổ tay, 5 khuy cài lệch phải đại diện cho Ngũ Thường.'
                )}
                {selectedType === 'tay-thung' && (
                  'Áo Ngũ Thân Tay Thụng (Áo Tấc): Ống tay rộng 25cm tạo dáng khoanh tay lồng nhau trang nhã; bỏ cúc khuy cài; may 2 lớp áo mỏng; dài phủ gần mắt cá chân, không chiết eo.'
                )}
              </p>
            </div>

            {/* PAIRED BOTTOM TOGGLES (Khi đang xem các mẫu áo) */}
            {!isBottomModel && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <label className="text-xs font-bold text-[#78350F] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-700" />
                    Phối Đồ Cùng Quần / Váy Trong 3D:
                  </span>
                  <span className="text-[10px] text-amber-800 font-normal">Xoay 360° cả set</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPairedBottom('vay-xep-ly-dai')}
                    className={`p-1.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      pairedBottom === 'vay-xep-ly-dai'
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-xs'
                        : 'bg-white text-[#78350F] border-amber-200 hover:bg-amber-100/50'
                    }`}
                  >
                    Váy Xếp Ly Dài
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairedBottom('vay-lua-bong')}
                    className={`p-1.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      pairedBottom === 'vay-lua-bong'
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-xs'
                        : 'bg-white text-[#78350F] border-amber-200 hover:bg-amber-100/50'
                    }`}
                  >
                    Váy Lụa Satin
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairedBottom('quan-ong-xeo')}
                    className={`p-1.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      pairedBottom === 'quan-ong-xeo'
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-xs'
                        : 'bg-white text-[#78350F] border-amber-200 hover:bg-amber-100/50'
                    }`}
                  >
                    Quần Ống Xéo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairedBottom('vay-dup-trang')}
                    className={`p-1.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      pairedBottom === 'vay-dup-trang'
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-xs'
                        : 'bg-white text-[#78350F] border-amber-200 hover:bg-amber-100/50'
                    }`}
                  >
                    Váy Đụp Lụa
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairedBottom('quan-den')}
                    className={`p-1.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      pairedBottom === 'quan-den'
                        ? 'bg-[#18181B] text-white border-black shadow-xs'
                        : 'bg-white text-[#18181B] border-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    Quần Lụa Đen
                  </button>
                  <button
                    type="button"
                    onClick={() => setPairedBottom('none')}
                    className={`p-1.5 rounded-xl border text-center font-medium cursor-pointer transition-all ${
                      pairedBottom === 'none'
                        ? 'bg-[#1C1917] text-white border-black shadow-xs'
                        : 'bg-white text-[#5A4A3E] border-amber-200 hover:bg-amber-100/50'
                    }`}
                  >
                    Chỉ Xem Áo
                  </button>
                </div>
              </div>
            )}

            {/* Customizer for Tứ Thân */}
            {selectedType === 'tu-than' && (
              <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2.5">
                <h4 className="text-xs font-bold text-[#92400E] flex items-center gap-1.5 uppercase tracking-wide">
                  <Shirt className="w-3.5 h-3.5" />
                  Cách Mặc Áo Tứ Thân (Không Khuy Cài)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTuThanWearingStyle('buoc-vat')}
                    className={`p-2 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      tuThanWearingStyle === 'buoc-vat'
                        ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-2xs'
                        : 'bg-white text-[#4A3B32] border-[#D8C7B0] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    ✓ Buộc Thắt Trước Bụng
                  </button>
                  <button
                    type="button"
                    onClick={() => setTuThanWearingStyle('buong-tha')}
                    className={`p-2 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      tuThanWearingStyle === 'buong-tha'
                        ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-2xs'
                        : 'bg-white text-[#4A3B32] border-[#D8C7B0] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    ✓ Buông Thả Mềm Mại
                  </button>
                </div>
              </div>
            )}

            {/* Customizer for Bà Ba */}
            {selectedType === 'ba-ba' && (
              <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-2.5">
                <h4 className="text-xs font-bold text-[#065F46] flex items-center gap-1.5 uppercase tracking-wide">
                  <Shirt className="w-3.5 h-3.5" />
                  Biến Tấu Áo Bà Ba Nam Bộ
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setBaBaNeckline('co-tron')}
                    className={`p-1.5 rounded-lg border text-center font-bold cursor-pointer ${
                      baBaNeckline === 'co-tron' ? 'bg-[#065F46] text-white' : 'bg-white text-[#065F46]'
                    }`}
                  >
                    Cổ Tròn
                  </button>
                  <button
                    type="button"
                    onClick={() => setBaBaNeckline('co-tim')}
                    className={`p-1.5 rounded-lg border text-center font-bold cursor-pointer ${
                      baBaNeckline === 'co-tim' ? 'bg-[#065F46] text-white' : 'bg-white text-[#065F46]'
                    }`}
                  >
                    Cổ Tim (Lá Trầu)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBaBaNeckline('co-vuong')}
                    className={`p-1.5 rounded-lg border text-center font-bold cursor-pointer ${
                      baBaNeckline === 'co-vuong' ? 'bg-[#065F46] text-white' : 'bg-white text-[#065F46]'
                    }`}
                  >
                    Cổ Vuông
                  </button>
                </div>
              </div>
            )}

            {/* Fabric Material Selection */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#F0E6D8]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#8B1E1E]" />
                  {selectedType === 'ngu-than-cach-tan' 
                    ? 'Chất Liệu: Tơ Organza Khúc Xạ Ombre' 
                    : 'Chất Liệu Vải Trắng Cao Cấp (6 Loại Hiệu Ứng)'}
                </label>
                <span className="text-[11px] font-semibold text-[#8B1E1E]">
                  {FABRIC_CATALOG[selectedFabric].badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(FABRIC_CATALOG) as FabricType[]).map((fKey) => {
                  const fab = FABRIC_CATALOG[fKey];
                  const isSelected = selectedFabric === fKey;
                  return (
                    <button
                      key={fKey}
                      type="button"
                      onClick={() => setSelectedFabric(fKey)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                        isSelected
                          ? 'bg-[#FAF5EC] border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20 shadow-xs'
                          : 'bg-white hover:bg-[#FAF7F2] border-[#E8DEC8]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2C241E]">{fab.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                      </div>
                      <p className="text-[11px] text-[#6B5A4B] line-clamp-2 leading-relaxed">
                        {fab.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Couture Specification Details */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-white border border-[#E8DEC8] text-xs">
              <h4 className="font-bold text-[#2C241E] flex items-center gap-2 pb-1.5 border-b border-[#F0E6D8]">
                <Compass className="w-4 h-4 text-[#8B1E1E]" />
                <span>Quy Chuẩn Cắt May & Chi Tiết Độc Bản</span>
              </h4>

              <div className="space-y-1.5 text-[#5A4A3E]">
                {selectedType === 'vay-xep-ly-dai' && (
                  <>
                    <p>• <strong>Phom chữ A đứng dáng:</strong> Chất vải trắng ngà/kem mờ lì dày dặn, giữ phom phồng tự nhiên không bị rũ gãy.</p>
                    <p>• <strong>Xếp ly bản lớn đối xứng:</strong> Nếp ly mở rộng dần về phía gấu, chạy thẳng tắp như đường sọc tự nhiên kéo dài vóc dáng.</p>
                    <p>• <strong>Gấu lượn sóng chạm đất:</strong> Viền gấu gấp mí phẳng chỉn chu, lượn sóng mềm mại theo từng bước di chuyển.</p>
                  </>
                )}
                {selectedType === 'vay-lua-bong' && (
                  <>
                    <p>• <strong>Lụa satin bóng mờ:</strong> Sắc trắng ngà trang nhã, bề mặt bóng mờ sang trọng đổi chiều theo góc sáng.</p>
                    <p>• <strong>Cắt xéo bias cut:</strong> Ôm nhẹ hông rồi buông rủ thành những dải sóng mềm mại dọc thân.</p>
                    <p>• <strong>Gấu xòe bay bổng:</strong> Xòe nhẹ duyên dáng về phía gấu, uyển chuyển theo từng bước chuyển động.</p>
                  </>
                )}
                {selectedType === 'ngu-than-cach-tan' && (
                  <>
                    <p>• <strong>Dải khuy hoa vải 3D đính nổi:</strong> Dọc đường xẻ vạt chéo là hàng hoa trắng 5 cánh thủ công nổi bật trên nền tơ tím.</p>
                    <p>• <strong>Viền nẹp xanh ngọc:</strong> Bo quanh cổ, mép vạt chéo, cửa tay, xẻ tà và gấu áo; khuy tết xanh ngọc đỉnh cổ.</p>
                    <p>• <strong>Khúc xạ màu đa tầng:</strong> Tơ organza tím lavender phối xanh ngọc phủ lên đầm hai dây hồng san hô bên trong.</p>
                  </>
                )}
                {selectedType === 'tay-chen' && (
                  <>
                    <p>• <strong>Cấu trúc 5 thân:</strong> 4 thân lớn ghép đường trung phùng và 1 vạt hò ẩn bên dưới.</p>
                    <p>• <strong>Tay chẽn:</strong> Ống tay nhỏ ôm gọn vừa vặn tới cổ tay, thuận tiện cho sinh hoạt.</p>
                    <p>• <strong>Hàng khuy:</strong> 5 cúc cài lệch bên phải (Nhân, Lễ, Nghĩa, Trí, Tín).</p>
                  </>
                )}
                {selectedType === 'tay-thung' && (
                  <>
                    <p>• <strong>Tay thụng 25cm:</strong> Ống tay áo thụng rộng, dài phủ bàn tay, tạo dáng khoanh tay cung kính.</p>
                    <p>• <strong>Cổ lập lĩnh cao:</strong> Ôm khít cổ đoan chính, mực thước cung đình.</p>
                    <p>• <strong>2 lớp xuyên thấu:</strong> Lớp trong trắng đục, lớp ngoài sa tơ mỏng nhẹ bay bổng.</p>
                  </>
                )}
                {selectedType === 'tu-than' && (
                  <>
                    <p>• <strong>Sống lưng may liền:</strong> 2 thân sau ghép sống lưng, 2 vạt trước thả rời không cài cúc.</p>
                    <p>• <strong>Buộc vạt trước bụng:</strong> Thắt nút mềm mại trước bụng hoặc buông thả tự do thướt tha.</p>
                    <p>• <strong>Yếm lót trong & Dải thắt lưng:</strong> Che ngực kín đáo và dải lụa mềm buông thả eo.</p>
                  </>
                )}
                {selectedType === 'ba-ba' && (
                  <>
                    <p>• <strong>Thân sau nguyên mảnh:</strong> Không chắp nối giữa lưng; 2 tà trước cài khuy dọc giữa.</p>
                    <p>• <strong>Độ dài & Xẻ tà:</strong> Trùm qua mông, xẻ tà 2 bên hông; nữ chiết eo lưng ong, nam suông rộng.</p>
                    <p>• <strong>Cổ áo:</strong> Biến tấu cổ tim (lá trầu), cổ tròn hoặc cổ vuông thanh thoát.</p>
                  </>
                )}
                {selectedType === 'quan-ong-xeo' && (
                  <>
                    <p>• <strong>Phom ống xéo rộng:</strong> Suông thẳng từ hông, xòe nhẹ tự nhiên ở gấu thướt tha.</p>
                    <p>• <strong>Chất lụa trắng ngà:</strong> Độ bóng mờ sang trọng, nếp rủ mềm mại phủ qua mắt cá chân.</p>
                  </>
                )}
                {selectedType === 'vay-dup-trang' && (
                  <>
                    <p>• <strong>Xòe tròn Kinh Bắc:</strong> Phom váy đụp xòe rộng thênh thang tròn tự nhiên từ hông xuống chấm gót.</p>
                    <p>• <strong>Cạp quây phẳng dồn nếp:</strong> Ôm khít dưới áo yếm, sóng váy bồng bềnh bay bổng.</p>
                  </>
                )}
              </div>
            </div>

            {/* Apply Button */}
            {onApplyToStudio && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const patternId = 
                      selectedFabric === 'to-van-may' ? 'pat-to-van-may' :
                      selectedFabric === 'gam-det-chim' ? 'pat-gam-det-chim' :
                      selectedFabric === 'nhu-bong' ? 'pat-v-nhu-bong' :
                      selectedFabric === 'dui-tho-moc' ? 'pat-dui-tho-moc' :
                      selectedFabric === 'sa-xuyen-thau' ? 'pat-sa-xuyen-thau' : 'pat-lua-to-tam';
                    onApplyToStudio(selectedType, patternId);
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#6E1414] hover:from-[#731919] hover:to-[#570F0F] text-white font-bold text-xs lg:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {isBottomModel 
                      ? 'Áp Dụng Mẫu Quần / Váy 3D Này Vào Studio' 
                      : 'Áp Dụng Thiết Kế 3D Này Vào Studio'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
