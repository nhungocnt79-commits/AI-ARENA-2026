import React, { useRef, useState } from 'react';
import { CostumeOutfitState, Hairstyle, SkinTone, FaceShape, Gender } from '../types/costume';
import { X, Upload, Trash2, Smile, Check, Sparkles, Ruler, RotateCcw, User } from 'lucide-react';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: CostumeOutfitState['avatar'];
  onUpdateAvatar: (updated: Partial<CostumeOutfitState['avatar']>) => void;
}

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  avatar,
  onUpdateAvatar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hairCategoryTab, setHairCategoryTab] = useState<'recommended' | 'all'>('recommended');

  if (!isOpen) return null;

  const currentGender: Gender = avatar.gender || 'female';
  const isMale = currentGender === 'male';

  const defaultStandardHeight = isMale ? 172 : 160;
  const defaultStandardWeight = isMale ? 64 : 52;

  const height = avatar.height ?? defaultStandardHeight;
  const weight = avatar.weight ?? defaultStandardWeight;
  const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(1));
  const getBmiStatus = (val: number) => {
    if (val < 18.5) return 'Mảnh mai';
    if (val <= 22.9) return 'Cân đối chuẩn mực';
    if (val <= 24.9) return 'Đầy đặn phong độ';
    return 'Phúc hậu tròn trịa';
  };

  // Male hairstyles (Thư sinh, Hiệp khách, Nam chính Ghibli)
  const maleHairstyles: { id: Hairstyle; name: string; desc: string; tag: string }[] = [
    {
      id: 'male-short-part',
      name: '1. Rẽ Ngôi 7/3 Thư Sinh',
      desc: 'Tóc rẽ ngôi 7/3 lãng tử, lọn mái phồng nhẹ buông lơi tự nhiên che một phần trán, mai ôm gọn gàng thanh nhã chuẩn nam chính anime/webtoon.',
      tag: 'Nam 1'
    },
    {
      id: 'male-topknot-bun',
      name: '2. Búi Củ Tỏi Cổ Trang',
      desc: 'Tóc búi gọn trên đỉnh đầu cài trâm gỗ hoặc đai buộc, tóc mai buông lơi hai bên tai, toát lên phong thái nam nhi tuấn tú, khí phách hiệp khách Việt.',
      tag: 'Nam 2'
    },
    {
      id: 'male-curtain-layers',
      name: '3. Layer Mái Rủ Ghibli',
      desc: 'Mái curtain rủ tự nhiên hai bên mắt, các tầng tóc layer bồng bềnh trong gió như Haku hay Howl, lãng mạn và trong trẻo đậm chất điện ảnh.',
      tag: 'Nam 3'
    },
    {
      id: 'male-short-neat',
      name: '4. Tóc Ngắn Tân Thời',
      desc: 'Tóc ngắn cắt tỉa cao ráo, vầng trán sáng sủa, phong thái thư sinh hiện đại, đĩnh đạc và thanh lịch khi diện trang phục truyền thống.',
      tag: 'Nam 4'
    }
  ];

  // Female hairstyles (Thiếu nữ dịu dàng, tiểu thư Kinh Bắc)
  const femaleHairstyles: { id: Hairstyle; name: string; desc: string; tag: string }[] = [
    { 
      id: 'long-straight-waist', 
      name: '1. Dài Thẳng Eo', 
      desc: 'Tóc dài qua eo tự nhiên, suôn mượt và tơi thành từng lọn mảnh nhỏ ở đuôi, mái ôm nhẹ gò má, sợi tóc con lơ thơ trước trán, rẽ ngôi tự nhiên.',
      tag: 'Nữ 1'
    },
    { 
      id: 'short-bob-straight', 
      name: '2. Ngắn Ngang Vai', 
      desc: 'Tóc lob chạm ngang vai, cúp nhẹ ôm lấy khuôn mặt. Mái bay (curtain bangs) rẽ ngôi giữa có độ phồng chân tóc, đuôi tỉa layer so le tự nhiên.',
      tag: 'Nữ 2'
    },
    { 
      id: 'braided-twin-waist', 
      name: '3. Tết 2 Bím', 
      desc: 'Chia ngôi giữa tự nhiên ở đỉnh đầu, 2 bên tết lỏng tay vừa phải buông dài xuống ngực, đuôi cột chun nhỏ, vài sợi tóc mai ôm hai bên má.',
      tag: 'Nữ 3'
    },
    { 
      id: 'braided-single-side', 
      name: '4. Tết 1 Bím Vai Phải', 
      desc: 'Mái xéo/thưa nhẹ nhàng che một phần trán, tóc gạt và tết lệch sang vai phải, bím dày phồng nhẹ buông lơi tự nhiên đậm chất duyên thầm.',
      tag: 'Nữ 4'
    },
    { 
      id: 'side-bun-right', 
      name: '5. Búi Lệch Phải', 
      desc: 'Tóc gom cao búi tròn lớn có độ phồng lỏng trễ lệch sang phải, hai bên mai và gáy có lọn uốn xoăn nhẹ buông lơi thanh thoát.',
      tag: 'Nữ 5'
    },
    { 
      id: 'half-up-princess', 
      name: '6. Nửa Đầu Tiểu Thư', 
      desc: 'Tóc dài uốn sóng lơi bồng bềnh, đỉnh đầu kẹp nửa đầu phồng nhẹ kết hợp băng đô nhỏ, lọn mái bay dài ôm nhẹ hai bên má.',
      tag: 'Nữ 6'
    },
    { 
      id: 'wavy-headband', 
      name: 'Sóng Lơi Cài Băng Đô Lụa', 
      desc: 'Băng đô thanh xuân, lọn tóc mái uốn cong chữ C, sóng tóc bồng bềnh nữ tính',
      tag: 'Thêm'
    },
    { 
      id: 'side-ponytail-wavy', 
      name: 'Đuôi Ngựa Lệch Bồng Bềnh', 
      desc: 'Mái rủ bồng bềnh kiểu Hàn Quốc, đuôi tóc uốn sóng lơi lệch sang bờ vai phải',
      tag: 'Thêm'
    },
    { 
      id: 'short-curly-bows', 
      name: 'Bob Ngắn Uốn Cụp Đính Nơ', 
      desc: 'Tóc bob ngắn ngang cằm uốn vểnh nhẹ, mái bằng thưa, hai bím nhỏ đính nơ xinh xắn',
      tag: 'Thêm'
    },
    { 
      id: 'high-artistic-bun', 
      name: 'Búi Cao Xoắn Cố Đô', 
      desc: 'Búi xoắn to quý phái đỉnh đầu, lọn tóc mai uốn sóng nhẹ tôn kiềng bạc và cổ cao',
      tag: 'Thêm'
    },
  ];

  // Active list based on gender and tab
  const activeHairstyles = 
    hairCategoryTab === 'all'
      ? [...maleHairstyles, ...femaleHairstyles]
      : isMale
        ? [...maleHairstyles, ...femaleHairstyles.slice(0, 2)]
        : [...femaleHairstyles, ...maleHairstyles.slice(0, 2)];

  const faceShapes: { id: FaceShape; name: string; desc: string; iconLabel: string }[] = isMale ? [
    {
      id: 'oval',
      name: 'Mặt Chữ Điền / Thư Sinh Thanh Tú',
      desc: 'Góc hàm nam tính gọn gàng, cằm thanh thoát, phong thái khôi ngô nho nhã của chàng thư sinh Kinh Bắc',
      iconLabel: '⬭ Thư Sinh'
    },
    {
      id: 'round',
      name: 'Mặt Bầu Tròn / Thiếu Niên Hồn Hậu',
      desc: 'Đường nét trẻ trung, trong trẻo, ánh mắt sáng và cằm tròn hiền hậu chuẩn nam chính hoạt hình Ghibli',
      iconLabel: '◯ Thiếu Niên'
    }
  ] : [
    {
      id: 'oval',
      name: 'Mặt Trái Xoan (Thanh Tú)',
      desc: 'Khuôn mặt thon gọn, cằm V-line mềm mại, nét đẹp đoan trang đài các truyền thống',
      iconLabel: '⬭ Trái Xoan'
    },
    {
      id: 'round',
      name: 'Mặt Tròn (Bầu Bĩnh)',
      desc: 'Má phính phúc hậu, cằm tròn ngây thơ, đáng yêu đậm chất nữ sinh học đường',
      iconLabel: '◯ Mặt Tròn'
    }
  ];

  const skinTones: { id: SkinTone; name: string; hex: string }[] = [
    { id: 'fair', name: 'Da Sáng Thanh Bạch', hex: '#FDEDEC' },
    { id: 'natural', name: 'Da Tự Nhiên Hồng Hào', hex: '#FADBD8' },
    { id: 'warm-honey', name: 'Da Mật Ong Khỏe Khoắn', hex: '#EDBB99' },
  ];

  const currentFaceShape = avatar.faceShape || 'oval';

  const handleGenderChange = (newGender: Gender) => {
    if (newGender === currentGender) return;

    if (newGender === 'male') {
      const newHeight = (avatar.height === 160 || !avatar.height) ? 172 : avatar.height;
      const newWeight = (avatar.weight === 52 || !avatar.weight) ? 64 : avatar.weight;
      const isFemaleOnlyHair = femaleHairstyles.some(h => h.id === avatar.hairstyle);
      onUpdateAvatar({
        gender: 'male',
        height: newHeight,
        weight: newWeight,
        hairstyle: isFemaleOnlyHair ? 'male-short-part' : avatar.hairstyle
      });
    } else {
      const newHeight = (avatar.height === 172 || !avatar.height) ? 160 : avatar.height;
      const newWeight = (avatar.weight === 64 || !avatar.weight) ? 52 : avatar.weight;
      const isMaleOnlyHair = maleHairstyles.some(h => h.id === avatar.hairstyle);
      onUpdateAvatar({
        gender: 'female',
        height: newHeight,
        weight: newWeight,
        hairstyle: isMaleOnlyHair ? 'long-straight-waist' : avatar.hairstyle
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdateAvatar({ customPhotoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onUpdateAvatar({ customPhotoUrl: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B0] shadow-2xl p-6 lg:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE7DC] text-[#6B5A4B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center border border-rose-200">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-800">
              Nhân Vật Đại Diện
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2C241E]">
              Tùy Chỉnh Giới Tính, Vóc Dáng & Khuôn Mặt
            </h3>
          </div>
        </div>

        {/* 1. Chọn Giới Tính Nhân Vật: Nữ (Thiếu Nữ Đài Các) & Nam (Thư Sinh Khôi Ngô) */}
        <div className="space-y-3 p-4 bg-white rounded-2xl border border-[#D8C7B0] shadow-2xs">
          <div className="flex items-center justify-between pb-1 border-b border-[#F0E6D8]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#9B2C2C]" />
              1. Giới Tính Nhân Vật (Nam / Nữ Tự Do Tùy Chỉnh)
            </label>
            <span className="text-[11px] text-[#8C7A6B]">
              Đang chọn: <strong className="text-[#9B2C2C]">{isMale ? '♂ Nhân Vật Nam' : '♀ Nhân Vật Nữ'}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Thẻ Nữ */}
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                !isMale
                  ? 'bg-rose-50/70 border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-xs'
                  : 'bg-[#FAF7F2]/60 hover:bg-white border-[#E8DEC8]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                    ♀
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C241E]">Nhân Vật Nữ</h4>
                    <span className="text-[10px] text-rose-700 font-medium">Thiếu Nữ Đoan Trang · Duyên Thầm</span>
                  </div>
                </div>
                {!isMale && <Check className="w-4 h-4 text-[#9B2C2C]" />}
              </div>
              <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                Đường nét mềm mại, dịu dàng, vóc dáng uyển chuyển, kiềng bạc hoa sen và các kiểu tóc thướt tha Kinh Bắc. Chuẩn dáng: <strong>160 cm · 52 kg</strong>.
              </p>
            </button>

            {/* Thẻ Nam */}
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isMale
                  ? 'bg-amber-50/70 border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-xs'
                  : 'bg-[#FAF7F2]/60 hover:bg-white border-[#E8DEC8]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                    ♂
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#2C241E]">Nhân Vật Nam</h4>
                    <span className="text-[10px] text-amber-800 font-medium">Thư Sinh Khôi Ngô · Khí Phách</span>
                  </div>
                </div>
                {isMale && <Check className="w-4 h-4 text-[#9B2C2C]" />}
              </div>
              <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                Bờ vai rộng đĩnh đạc, ngũ quan khôi ngô, phong thái nho nhã chuẩn nam chính anime/Ghibli, hợp diện Áo Ngũ Thân & Áo Bà Ba nam. Chuẩn dáng: <strong>172 cm · 64 kg</strong>.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Vóc Dáng Nhân Vật: Chiều Cao (140-200 cm) & Cân Nặng (40-100 kg) */}
        <div className="space-y-3.5 p-4 bg-white rounded-2xl border border-[#D8C7B0] shadow-2xs">
          <div className="flex items-center justify-between pb-1 border-b border-[#F0E6D8]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-[#9B2C2C]" />
              2. Tùy Chỉnh Vóc Dáng ({isMale ? 'Chuẩn Nam 172cm/64kg' : 'Chuẩn Nữ 160cm/52kg'})
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8C7A6B]">
                BMI: <strong className="text-[#9B2C2C]">{bmi}</strong> ({getBmiStatus(bmi)})
              </span>
              {(height !== defaultStandardHeight || weight !== defaultStandardWeight) && (
                <button
                  type="button"
                  onClick={() => onUpdateAvatar({ height: defaultStandardHeight, weight: defaultStandardWeight })}
                  className="text-[10px] text-[#9B2C2C] hover:underline font-bold flex items-center gap-0.5"
                  title={`Đặt lại dáng chuẩn: ${defaultStandardHeight} cm và ${defaultStandardWeight} kg`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Chuẩn {defaultStandardHeight}cm/{defaultStandardWeight}kg</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Slider: Chiều cao */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF7F2]/80 border border-[#E8DEC8]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#4A3B32]">Chiều cao:</span>
                <span className="font-bold text-[#9B2C2C] bg-white px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                  {height} cm
                </span>
              </div>
              <input
                type="range"
                min={140}
                max={200}
                step={1}
                value={height}
                onChange={(e) => onUpdateAvatar({ height: Number(e.target.value) })}
                className="w-full accent-[#9B2C2C] cursor-pointer h-2 bg-[#E8DEC8] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#8C7A6B]">
                <span>140 cm</span>
                <span className="font-bold text-[#78350F]">{defaultStandardHeight} cm (chuẩn {isMale ? 'nam' : 'nữ'})</span>
                <span>200 cm</span>
              </div>
            </div>

            {/* Slider: Cân nặng */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF7F2]/80 border border-[#E8DEC8]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#4A3B32]">Cân nặng:</span>
                <span className="font-bold text-[#9B2C2C] bg-white px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                  {weight} kg
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={100}
                step={1}
                value={weight}
                onChange={(e) => onUpdateAvatar({ weight: Number(e.target.value) })}
                className="w-full accent-[#9B2C2C] cursor-pointer h-2 bg-[#E8DEC8] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#8C7A6B]">
                <span>40 kg</span>
                <span className="font-bold text-[#78350F]">{defaultStandardWeight} kg (chuẩn {isMale ? 'nam' : 'nữ'})</span>
                <span>100 kg</span>
              </div>
            </div>
          </div>

          {/* Quick presets tailored to gender */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-[10px] text-[#8C7A6B] font-medium">Gợi ý vóc dáng nhanh:</span>
            {(isMale
              ? [
                  { h: 172, w: 64, label: 'Chuẩn Nam Nhi (172cm/64kg)' },
                  { h: 168, w: 58, label: 'Thư sinh thanh mảnh (168cm/58kg)' },
                  { h: 180, w: 70, label: 'Cao ráo khôi ngô (180cm/70kg)' },
                  { h: 176, w: 78, label: 'Vạm vỡ phong độ (176cm/78kg)' },
                ]
              : [
                  { h: 160, w: 52, label: 'Chuẩn Á Đông (160cm/52kg)' },
                  { h: 152, w: 44, label: 'Mảnh mai nhỏ nhắn (152cm/44kg)' },
                  { h: 172, w: 54, label: 'Người mẫu cao ráo (172cm/54kg)' },
                  { h: 162, w: 66, label: 'Đầy đặn phúc hậu (162cm/66kg)' },
                ]
            ).map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onUpdateAvatar({ height: preset.h, weight: preset.w })}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer border ${
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

        {/* 3. Dáng Mặt Nhân Vật */}
        <div className="space-y-3 p-4 bg-white rounded-2xl border border-[#D8C7B0] shadow-2xs">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9B2C2C]" />
              3. Chọn Dáng Mặt ({isMale ? 'Mặt Chữ Điền Hoặc Thiếu Niên' : 'Mặt Trái Xoan Hoặc Mặt Tròn'})
            </label>
            <span className="text-[11px] text-[#8C7A6B]">
              Đang chọn: <strong className="text-[#9B2C2C]">{
                isMale 
                  ? (currentFaceShape === 'oval' ? 'Mặt Thư Sinh' : 'Mặt Thiếu Niên')
                  : (currentFaceShape === 'oval' ? 'Mặt Trái Xoan' : 'Mặt Tròn')
              }</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {faceShapes.map((shape) => {
              const isSelected = currentFaceShape === shape.id;
              return (
                <button
                  key={shape.id}
                  onClick={() => onUpdateAvatar({ faceShape: shape.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? 'bg-amber-50/60 border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-xs'
                      : 'bg-[#FAF7F2]/60 hover:bg-white border-[#E8DEC8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                      <span className="text-sm">{shape.iconLabel.split(' ')[0]}</span>
                      {shape.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#9B2C2C]" />}
                  </div>
                  <p className="text-[11px] text-[#6B5A4B] leading-relaxed">
                    {shape.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Bộ Sưu Tập Kiểu Tóc */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] block">
              4. Bộ Sưu Tập Kiểu Tóc 2D Webtoon/Anime/Ghibli
            </label>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-[#D8C7B0] text-[10px]">
              <button
                type="button"
                onClick={() => setHairCategoryTab('recommended')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  hairCategoryTab === 'recommended'
                    ? 'bg-[#9B2C2C] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                Gợi ý cho {isMale ? 'Nam ♂' : 'Nữ ♀'}
              </button>
              <button
                type="button"
                onClick={() => setHairCategoryTab('all')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  hairCategoryTab === 'all'
                    ? 'bg-[#9B2C2C] text-white shadow-2xs'
                    : 'text-[#6B5A4B] hover:bg-[#FAF7F2]'
                }`}
              >
                Tất cả kiểu tóc
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeHairstyles.map((style) => {
              const isSelected = avatar.hairstyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => onUpdateAvatar({ hairstyle: style.id })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? 'bg-white border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-xs'
                      : 'bg-white/70 hover:bg-white border-[#E8DEC8]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1 gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          style.tag.startsWith('Nam')
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-[#EFE7DC] text-[#78350F]'
                        }`}>
                          {style.tag}
                        </span>
                        <span className="text-xs font-bold text-[#2C241E] truncate max-w-[170px]">
                          {style.name}
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#9B2C2C] shrink-0" />}
                    </div>
                    <p className="text-[10px] text-[#8C7A6B] leading-relaxed">
                      {style.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Tông Da */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] block">
            5. Tông Da Nhân Vật
          </label>
          <div className="flex items-center gap-3">
            {skinTones.map((skin) => {
              const isSelected = avatar.skinTone === skin.id;
              return (
                <button
                  key={skin.id}
                  onClick={() => onUpdateAvatar({ skinTone: skin.id })}
                  className={`flex-1 p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white border-[#9B2C2C] ring-2 ring-[#9B2C2C]/20 shadow-2xs'
                      : 'bg-white/70 hover:bg-white border-[#E8DEC8]'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: skin.hex }}
                  />
                  <span className="text-[11px] font-medium text-[#2C241E]">
                    {skin.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Tùy Chọn Tải Ảnh Chân Dung Riêng */}
        <div className="p-4 bg-white rounded-2xl border border-[#D8C7B0] space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B32] block">
            4. Tùy Chọn: Tải Ảnh Chân Dung Của Bạn
          </label>
          <p className="text-[11px] text-[#6B5A4B]">
            Bạn có thể tải ảnh chân dung khuôn mặt thực tế của mình để ghép vào avatar mannequin.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải Ảnh Của Bạn</span>
            </button>

            {avatar.customPhotoUrl && (
              <button
                onClick={handleRemovePhoto}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Gỡ ảnh để dùng mặt vẽ</span>
              </button>
            )}
          </div>

          {avatar.customPhotoUrl && (
            <div className="flex items-center gap-3 pt-2">
              <img
                src={avatar.customPhotoUrl}
                alt="Avatar uploaded"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#9B2C2C] shadow-xs"
              />
              <span className="text-xs text-[#15803D] font-medium">
                ✓ Đang áp dụng khuôn mặt tải lên!
              </span>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs font-semibold text-white bg-[#9B2C2C] hover:bg-[#781818] rounded-xl transition-colors cursor-pointer"
        >
          Hoàn Tất & Áp Dụng Lên Nhân Vật
        </button>
      </div>
    </div>
  );
};

export default AvatarCustomizerModal;
