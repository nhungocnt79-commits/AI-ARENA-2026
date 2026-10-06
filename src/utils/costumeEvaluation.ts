import { CostumeOutfitState, CulturalAssessment } from '../types/costume';
import { COSTUME_ROOTS, ACCESSORIES_DATABASE } from '../data/costumeData';

// Helper to convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6 && cleanHex.length !== 3) return null;
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split('').map(c => c + c).join('') 
    : cleanHex;
  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Helper to calculate relative luminance
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  const a = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate color contrast ratio between two hex colors
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export interface ColorHarmonyResult {
  score: number; // 0 - 100
  ratioMessage: string;
  harmonyType: string;
  designerVerdict: string;
  contrastRatio: number;
  paletteBreakdown: {
    role: string;
    name: string;
    color: string;
    percentage: number;
    description: string;
  }[];
}

export function evaluateColorHarmony(outfit: CostumeOutfitState): ColorHarmonyResult {
  const topColor = outfit.top.primaryColor;
  const bottomColor = outfit.bottom.color;
  const contrast = getContrastRatio(topColor, bottomColor);

  let harmonyType = 'Phối Tương Phản Truyền Thống';
  let score = 88;
  let verdict = 'Bản phối có sự phân tách rõ rệt giữa thân trên và thân dưới, giúp tà áo nổi bật trang nhã.';

  if (contrast < 1.4) {
    harmonyType = 'Tone-sur-tone Đồng Điệu (Monochrome)';
    score = 92;
    verdict = 'Phối cùng tông màu tạo cảm giác kéo dài vóc dáng, vẻ đẹp thanh tao, dịu dàng đậm chất tiểu thư hiện đại.';
  } else if (contrast > 4.5) {
    harmonyType = 'Tương Phản Kinh Điển (Kinh Bắc & Nam Bộ)';
    score = 96;
    verdict = 'Độ tương phản cao gợi nhớ trang phục lễ hội cổ truyền: áo đỏ thắm phối quần đen tuyền hoặc quần trắng thanh bạch. Thị giác cực kỳ cuốn hút!';
  } else {
    harmonyType = 'Phối Màu Bổ Trợ Dịu Mắt';
    score = 90;
    verdict = 'Sự kết hợp cân bằng thị giác, không chói gắt, rất phù hợp với bối cảnh lễ hội ngoài trời ban ngày.';
  }

  const breakdown = [
    {
      role: 'Chủ đạo (60%)',
      name: 'Thân Áo & Tà Áo',
      color: topColor,
      percentage: 60,
      description: 'Quyết định thần thái tổng thể và sự trang trọng của bộ trang phục lễ hội.'
    },
    {
      role: 'Nền phụ (30%)',
      name: 'Quần / Chân Váy Lụa',
      color: bottomColor,
      percentage: 30,
      description: 'Làm bệ đỡ nâng tầm vạt áo, tạo độ thướt tha uyển chuyển khi bước đi.'
    },
    {
      role: 'Điểm xuyết (10%)',
      name: 'Phụ Kiện & Thắt Lưng',
      color: outfit.rootId === 'tu-than' ? outfit.top.sashColor : '#D4AF37',
      percentage: 10,
      description: 'Điểm nhấn tinh xảo từ kiềng bạc, dải bao lụa, trâm cài hoặc nón quai thao.'
    }
  ];

  return {
    score,
    ratioMessage: 'Áp dụng hoàn hảo nguyên tắc 60-30-10 trong mỹ thuật thị giác thời trang',
    harmonyType,
    designerVerdict: verdict,
    contrastRatio: Number(contrast.toFixed(2)),
    paletteBreakdown: breakdown
  };
}

export function evaluateCulturalEtiquette(outfit: CostumeOutfitState): CulturalAssessment {
  const rootInfo = COSTUME_ROOTS[outfit.rootId];
  const adviceList: string[] = [];

  // Check specific cultural and etiquette factors
  let score = 96;
  let status: 'excellent' | 'warning' | 'alert' = 'excellent';
  let title = 'Trang Phục Chuẩn Mực & Đoan Trang';
  let message = `Bộ ${rootInfo.name} của bạn phối hợp hài hòa, thể hiện sự am hiểu sâu sắc về văn hóa mà vẫn toát lên nét tươi trẻ thanh xuân!`;

  // Specific check: Tu Than & Yem
  if (outfit.rootId === 'tu-than') {
    adviceList.push('Vạt áo tứ thân che chắn khéo léo phần yếm đào bên trong, đảm bảo sự kín đáo khi tham gia lễ hội.');
    adviceList.push('Dải thắt lưng bao quấn ngang eo giữ cho tà áo gọn gàng khi di chuyển giữa dòng người đông đúc.');
  }

  // Specific check: Ngu Than modesty
  if (outfit.rootId === 'ngu-than') {
    adviceList.push('Cổ lập lĩnh (cổ đứng) mang trọn vẹn tinh thần "ngũ thường": nhân, lễ, nghĩa, trí, tín của tiền nhân.');
    adviceList.push('Năm thân áo tượng trưng cho sự gắn kết thiêng liêng giữa phụ mẫu và con cái.');
  }

  // Specific check: Ba Ba
  if (outfit.rootId === 'ba-ba') {
    adviceList.push('Tà áo xẻ ngang hông duyên dáng nhưng không phô trương, tôn nét đẹp tự nhiên mộc mạc Nam Bộ.');
  }

  // Shoes etiquette check
  if (outfit.accessories.shoesId === 'shoes-sneaker-canvas-theu') {
    adviceList.push('Lưu ý hiện đại: Sneaker vải là nét biến tấu năng động cho GenZ leo núi hội đền, nhưng khi vào gian chính điện dâng hương nên giữ bước đi thật êm ái, từ tốn.');
  }

  // Historical quote based on root
  let quote = '';
  if (outfit.rootId === 'tu-than') {
    quote = '“Nào đâu cái yếm lụa sồi / Cái dây lưng đũi nhuộm hồi sang xuân / Khăn nhung quai thao buông chùng...” — Nguyễn Bính';
  } else if (outfit.rootId === 'ngu-than') {
    quote = '“Y phục đoan trang, phong thái đài các; ngắm áo ngũ thân là thấy trọn nếp nhà gia phong Đại Việt.”';
  } else {
    quote = '“Chiếc áo bà ba trên dòng sông xanh thẳm / Thấp thoáng con xuồng bé nhỏ lướt qua nhanh...” — Trần Thiện Thanh';
  }

  return {
    score,
    status,
    title,
    message,
    advice: adviceList,
    historicalQuote: quote
  };
}
