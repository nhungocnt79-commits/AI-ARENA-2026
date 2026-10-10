export type CostumeRootId = 'tu-than' | 'ngu-than' | 'ba-ba';

export type Gender = 'female' | 'male';

export type FaceShape = 'oval' | 'round';

export type Hairstyle = 
  // 6 Kiểu tóc Nữ chính thức
  | 'long-straight-waist'      // Nữ 1: Dài thẳng tự nhiên (Long Sleek Natural)
  | 'short-bob-straight'       // Nữ 2: Ngắn ngang vai uốn cụp nhẹ (Soft Bob Collarbone)
  | 'braided-twin-waist'       // Nữ 3: Tết hai bím năng động (Playful Twin Braids)
  | 'braided-single-side'      // Nữ 4: Tết 1 bím lệch vai phải (Side-Swept Braid)
  | 'side-bun-right'           // Nữ 5: Búi lệch về phía bên phải (Asymmetrical Side Low Bun)
  | 'half-up-princess'         // Nữ 6: Gợn sóng dài nửa lưng (Mid-Back Soft Mermaid Waves)
  // 6 Kiểu tóc Nam chính thức
  | 'male-short-part'           // Nam 1: Rẽ ngôi 7/3 thư sinh (Classic 7/3 Side Part)
  | 'male-topknot-bun'         // Nam 2: Búi củ tỏi cổ trang cách tân (Heritage Topknot / Man Bun)
  | 'male-curtain-layers'       // Nam 3: Layer mái rủ Ghibli (Shaggy Ghibli Flow)
  | 'male-short-neat'           // Nam 4: Tóc ngắn tân thời (Modern Short Taper / Crew Cut)
  | 'male-middle-curtain-55'   // Nam 5: Bổ luống 5/5 lãng tử (Retro Middle Part Curtain)
  | 'male-textured-undercut'   // Nam 6: Tóc vuốt Slicked-back Quiff thanh lịch (Slicked-Back Quiff)
  | 'male-slicked-back-quiff'  // Nam 6 alias
  // Backward compatibility aliases
  | 'long-straight-natural'
  | 'soft-bob-collarbone'
  | 'playful-twin-braids'
  | 'side-swept-braid'
  | 'asymmetrical-side-bun'
  | 'mid-back-mermaid-waves'
  | 'classic-side-part-73'
  | 'heritage-topknot-bun'
  | 'shaggy-ghibli-flow'
  | 'modern-short-taper'
  | 'retro-middle-part-55'
  | 'modern-textured-fade'
  | 'wavy-headband'
  | 'side-ponytail-wavy'
  | 'short-curly-bows'
  | 'high-artistic-bun'
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
    hairColor?: string; // Hex color: '#1A1A1A' | '#2E2E32' | '#4A3728' | '#5C4033'
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
