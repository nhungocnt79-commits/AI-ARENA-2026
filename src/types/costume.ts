export type CostumeRootId = 'tu-than' | 'ngu-than' | 'ba-ba';

export type Gender = 'female' | 'male';

export type FaceShape = 'oval' | 'round';

export type Hairstyle = 
  | 'long-straight-waist'    // 1. Dài thẳng eo (suôn mượt tơi lọn, mái ôm má, wispy strands)
  | 'short-bob-straight'     // 2. Ngắn ngang vai (lob cúp ôm mặt, mái bay curtain bangs)
  | 'braided-twin-waist'     // 3. Tết 2 bím (ngôi giữa, 2 bím tết lỏng tay buông ngực, chun nhỏ)
  | 'braided-single-side'    // 4. Tết 1 bím vai phải (mái xéo/thưa, bím dày phồng lệch vai phải)
  | 'side-bun-right'         // 5. Búi lệch phải (búi phồng tròn lỏng trễ, lọn mai uốn lơi)
  | 'half-up-princess'       // 6. Nửa đầu tiểu thư (uốn sóng lơi bồng bềnh, kẹp nửa đầu, băng đô)
  // Kiểu tóc nam (Male hairstyles - Thư sinh & Lãng tử phong trần)
  | 'male-short-part'         // Nam 1: Tóc rẽ ngôi 7/3 thư sinh lãng tử (Anime/Webtoon Male)
  | 'male-topknot-bun'       // Nam 2: Tóc búi củ tỏi cổ trang / Búi đỉnh đầu nam
  | 'male-curtain-layers'     // Nam 3: Tóc layer mái rủ tự nhiên chuẩn nam chính Ghibli
  | 'male-short-neat'         // Nam 4: Tóc ngắn gọn gàng hiện đại tân thời
  | 'wavy-headband'          // Tóc uốn sóng lơi bồng bềnh cài băng đô
  | 'side-ponytail-wavy'     // Tóc buộc đuôi ngựa lệch vai phải bồng bềnh
  | 'short-curly-bows'       // Tóc ngắn uốn cụp mái thưa thắt bím nơ
  | 'high-artistic-bun'      // Tóc búi cao xoắn đài các
  | 'short-shoulder-length'
  | 'long-flowing'
  | 'traditional-bun'
  | 'short-modern'
  | 'braided-twin';
export type SkinTone = 'fair' | 'natural' | 'warm-honey';

export interface ColorPreset {
  name: string;
  hex: string;
  meaning: string;
  region: 'Bắc' | 'Trung' | 'Nam' | 'Toàn quốc';
}

export interface NecklineOption {
  id: string;
  name: string;
  description: string;
  isModest: boolean;
}

export interface ButtonOption {
  id: string;
  name: string;
  material: string;
  description: string;
}

export interface PatternOption {
  id: string;
  name: string;
  description: string;
  symbolism: string;
}

export interface GarmentSilhouette {
  id: string;
  name: string;
  description: string;
  modernTwist: string;
}

export interface BottomOption {
  id: string;
  name: string;
  category: 'quan-suong' | 'quan-cach-tan' | 'chan-vay';
  description: string;
  appropriateFor: string;
}

export interface AccessoryItem {
  id: string;
  name: string;
  type: 'shoes' | 'jewelry' | 'hair';
  culturalOrigin: string;
  meaning: string;
  styleAdvice: string;
  imageIcon: string;
  accentColor?: string;
}

export interface CostumeOutfitState {
  rootId: CostumeRootId;
  top: {
    silhouetteId: string;
    necklineId: string;
    buttonId: string;
    patternId: string;
    primaryColor: string; // Hex
    innerYemColor: string; // for tu-than
    sashColor: string; // dải bao for tu-than
  };
  bottom: {
    bottomId: string;
    color: string; // Hex
  };
  accessories: {
    shoesId: string;
    jewelryIds: string[];
    hairAccessoryId: string;
  };
  avatar: {
    gender?: Gender; // 'female' | 'male' (mặc định 'female')
    hairstyle: Hairstyle;
    skinTone: SkinTone;
    faceShape?: FaceShape;
    customPhotoUrl?: string;
    height?: number; // Chiều cao: 140 - 200 cm (mặc định nữ: 160 cm, nam: 172 cm)
    weight?: number; // Cân nặng: 40 - 100 kg (mặc định nữ: 52 kg, nam: 64 kg)
  };
  outfitName: string;
  designerNote: string;
  selectedEventId: string;
  selectedWeatherId: string;
}

export interface CulturalAssessment {
  score: number; // 0 - 100
  status: 'excellent' | 'warning' | 'alert';
  title: string;
  message: string;
  advice: string[];
  historicalQuote: string;
}
