import { 
  CostumeRootId, 
  ColorPreset, 
  NecklineOption, 
  ButtonOption, 
  PatternOption, 
  GarmentSilhouette, 
  BottomOption, 
  AccessoryItem 
} from '../types/costume';

export interface CostumeRootInfo {
  id: CostumeRootId;
  name: string;
  region: string;
  regionalTag: string;
  epoch: string;
  festivalContext: string;
  meaning: string;
  philosophy: string;
  modestyRules: string[];
  recommendedSilhouettes: GarmentSilhouette[];
  necklines: NecklineOption[];
  buttonTypes: ButtonOption[];
  patterns: PatternOption[];
  recommendedBottoms: BottomOption[];
  defaultPrimaryColor: string;
  defaultBottomColor: string;
  colorRecommendations: {
    title: string;
    description: string;
    topColor: string;
    bottomColor: string;
    accentColor: string;
  }[];
}

export const VIETNAMESE_PALETTES: ColorPreset[] = [
  { name: 'Đỏ Chu Sa', hex: '#B91C1C', meaning: 'Sắc đỏ son đại diện cho hỷ sự, may mắn, xua tà khí trong lễ hội', region: 'Toàn quốc' },
  { name: 'Hoàng Yến (Vàng Tươi)', hex: '#D97706', meaning: 'Sắc vàng tươi sáng của nắng xuân, phú quý và sức sống căng tràn', region: 'Bắc' },
  { name: 'Vàng Cốm Non', hex: '#A3B14B', meaning: 'Hương vị mùa thu Bắc Bộ, thanh tao, dịu mắt và trẻ trung', region: 'Bắc' },
  { name: 'Xanh Thủy Lục', hex: '#0F766E', meaning: 'Màu ngọc bích của mặt nước sông hồ, biểu trưng cho sự an yên sâu lắng', region: 'Trung' },
  { name: 'Xanh Chàm Dân Tộc', hex: '#1E3A8A', meaning: 'Màu chàm nhuộm mộc mạc, bền bỉ, gắn liền với văn hóa dệt thủ công', region: 'Bắc' },
  { name: 'Hồng Sen Bách Diệp', hex: '#DB2777', meaning: 'Sắc sen thơm ngát, biểu tượng quốc hoa thuần khiết và thanh tân', region: 'Toàn quốc' },
  { name: 'Tím Hoa Cà Huế', hex: '#7E22CE', meaning: 'Nốt trầm duyên dáng, e ấp, đoan trang mang đậm hồn xứ Huế', region: 'Trung' },
  { name: 'Trắng Ngọc Trai', hex: '#F8FAFC', meaning: 'Trong trẻo, thanh bạch, thường làm lớp lót và quần lụa đoan trang', region: 'Toàn quốc' },
  { name: 'Đen Tuyền Óng (Hạt Mun)', hex: '#18181B', meaning: 'Nền nã, cổ điển, giúp tôn vinh các dải màu vạt áo rực rỡ', region: 'Toàn quốc' },
  { name: 'Cam Đất Phù Sa', hex: '#EA580C', meaning: 'Sắc đất màu mỡ phù sa sông Cửu Long, ấm áp và gần gũi', region: 'Nam' },
  { name: 'Xanh Bạc Hà Cách Tân', hex: '#2DD4BF', meaning: 'Gam màu pastel hiện đại được bạn trẻ GenZ yêu thích vì sự tươi mới', region: 'Toàn quốc' },
  { name: 'Nâu Sồng Mộc Mạc', hex: '#78350F', meaning: 'Màu áo bà ba xưa, nhuộm vỏ cây dà, gắn với vẻ đẹp chân chất Nam Bộ', region: 'Nam' }
];

export const COSTUME_ROOTS: Record<CostumeRootId, CostumeRootInfo> = {
  'tu-than': {
    id: 'tu-than',
    name: 'Áo Tứ Thân',
    region: 'Đồng Bằng Bắc Bộ',
    regionalTag: 'Miền Bắc',
    epoch: 'Từ thế kỷ 17 đến đầu thế kỷ 20',
    festivalContext: 'Hội Lim (Bắc Ninh), Hội Đền Hùng (Phú Thọ), Hội Chùa Hương, Lễ hội rước Mẫu mùa xuân',
    meaning: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ người bạn đời). Hai vạt trước buộc lại trước bụng biểu thị tình cảm vợ chồng son sắt keo sơn.',
    philosophy: 'Thiết kế tôn vinh nét dịu dàng, kín đáo và duyên thầm của phụ nữ Kinh Bắc qua kỹ thuật mặc "mớ ba mớ bảy" (nhiều lớp áo màu xếp đan xen kỳ diệu).',
    modestyRules: [
      'Áo yếm đào bên trong phải luôn có áo tứ thân khoác ngoài khi xuất hiện tại không gian lễ hội, đình đền trang nghiêm.',
      'Hai vạt trước buộc thắt ngang eo vừa vặn, không kéo xệ làm lộ nội y hay hở bụng.',
      'Dải thắt lưng bao (lụa hồng, xanh cốm) thắt mềm mại làm điểm phân tầng hài hòa.'
    ],
    defaultPrimaryColor: '#B91C1C',
    defaultBottomColor: '#18181B',
    recommendedSilhouettes: [
      {
        id: 'tu-than-truyen-thong',
        name: 'Tứ Thân Buông Vạt Lễ Hội',
        description: 'Vạt áo dài thướt tha chạm mắt cá chân, hai vạt trước buộc lơi thanh thoát, kết hợp thắt lưng bao kép.',
        modernTwist: 'Lược bớt độ dày nặng bằng vải tơ tằm mềm rủ, phom gọn gàng di chuyển nhanh giữa biển người lễ hội.'
      },
      {
        id: 'tu-than-cach-tan-lung',
        name: 'Tứ Thân Vạt Lửng Năng Động',
        description: 'Vạt trước ngắn ngang hông, tà sau dài vừa phải, phối cùng quần suông cạp cao hoặc chân váy.',
        modernTwist: 'Phom dáng hiện đại dành cho học sinh - sinh viên GenZ thích chụp ảnh kỷ yếu, năng động leo đồi hội Lim.'
      },
      {
        id: 'tu-than-mo-ba-layer',
        name: 'Tứ Thân Layer Đa Sắc (Mớ Ba)',
        description: 'Phối 2-3 lớp vạt mỏng với các gam màu tương phản nhẹ ló ra ở viền cổ và vạt tà.',
        modernTwist: 'Ứng dụng chất liệu voan tơ hoặc organza mềm cao cấp giúp tạo hiệu ứng thị giác chuyển sắc gradient trendy.'
      }
    ],
    necklines: [
      {
        id: 'neck-co-xay-yem',
        name: 'Cổ Xây Phối Yếm Đào',
        description: 'Cổ áo tứ thân mở chữ V thanh nhã để lộ bờ viền yếm đào kín đáo bên trong.',
        isModest: true
      },
      {
        id: 'neck-giao-linh-cach-tan',
        name: 'Cổ Giao Lĩnh Vắt Chéo',
        description: 'Hai mép cổ áo vắt chéo nhẹ nhàng, cổ khép kín đoan trang mang âm hưởng phục trang cổ truyền.',
        isModest: true
      },
      {
        id: 'neck-co-thuyen-thoang',
        name: 'Cổ Thuyền Lượn Mềm',
        description: 'Cắt võng nhẹ ngang xương quai xanh, thanh thoát cho ngày hè nhưng vẫn che chắn an toàn.',
        isModest: true
      }
    ],
    buttonTypes: [
      {
        id: 'btn-buoc-vat-lua',
        name: 'Buộc Vạt Lụa & Dải Bao Tơ',
        material: 'Tơ tằm tự nhiên',
        description: 'Hai dải vạt trước buộc thắt lơi tự nhiên, kết hợp dải bao xanh hoặc hồng sen quấn ngang eo.'
      },
      {
        id: 'btn-cuc-ngoc-trai',
        name: 'Cúc Ngọc Trai Nước Ngọt',
        material: 'Xà cừ tự nhiên',
        description: 'Điểm xuyết những hạt ngọc óng ánh giữ mép áo cố định thanh tao.'
      },
      {
        id: 'btn-cuc-bam-an',
        name: 'Khuy Bấm Tàng Hình Hiện Đại',
        material: 'Hợp kim phủ bạc',
        description: 'Tiện lợi, giúp vạt áo phẳng phiu tuyệt đối khi vận động mạnh.'
      }
    ],
    patterns: [
      {
        id: 'pat-sen-theu-chim',
        name: 'Hoa Sen Thêu Chìm Thủ Công',
        description: 'Họa tiết búp sen và đài sen uốn lượn thêu tay tinh tế dọc theo mép vạt.',
        symbolism: 'Biểu trưng cho cốt cách thanh bạch, gần bùn mà chẳng hôi tanh mùi bùn.'
      },
      {
        id: 'pat-may-song-thuy-ba',
        name: 'Mây Cuộn Thủy Ba Thần Thoại',
        description: 'Vân mây bồng bềnh và sóng nước phong cách mỹ thuật cổ Đại Việt.',
        symbolism: 'Cầu mong mưa thuận gió hòa, hanh thông may mắn trọn vẹn cả năm.'
      },
      {
        id: 'pat-tron-dui-to',
        name: 'Dệt Mộc Trơn Tối Giản',
        description: 'Không họa tiết, tập trung hoàn toàn vào độ óng ả và vân sợi dệt tự nhiên của lụa.',
        symbolism: 'Phong cách Quiet Luxury mộc mạc, tôn trọng chất liệu nguyên bản.'
      }
    ],
    recommendedBottoms: [
      {
        id: 'bot-quan-den-truyen-thong',
        name: 'Quần Lụa Đen Ống Rộng Truyền Thống',
        category: 'quan-suong',
        description: 'Ống suông rộng rãi may bằng lụa đũi đen, tạo nền tương phản hoàn hảo cho dải bao và vạt áo đỏ thắm.',
        appropriateFor: 'Lễ hội truyền thống, tôn nét cổ kính nguyên bản'
      },
      {
        id: 'bot-quan-lua-ong-rong-hong',
        name: 'Quần Lụa Ống Rộng Hồng Nhạt Cách Tân',
        category: 'quan-cach-tan',
        description: 'Chất lụa mềm mại màu hồng phấn dịu mát, dáng ống rộng cách tân bay bổng, cực kỳ tôn nét trẻ trung nữ sinh.',
        appropriateFor: 'Lễ hội mùa xuân, phong cách nữ sinh ngọt ngào'
      },
      {
        id: 'bot-quan-cap-cao-trang',
        name: 'Quần Lụa Trắng Ống Suông Cạp Cao',
        category: 'quan-cach-tan',
        description: 'Thiết kế cạp cao tôn dáng cho học sinh sinh viên, chất lụa trắng ngà không nhăn, thoải mái di chuyển.',
        appropriateFor: 'Festival giới trẻ, chụp ảnh dạo xuân'
      },
      {
        id: 'bot-chan-vay-midi-xep-ly',
        name: 'Chân Váy Lụa Xếp Ly Midi Kín Đáo',
        category: 'chan-vay',
        description: 'Dài qua gối, xếp ly nhẹ nhàng thướt tha tạo phong cách học đường duyên dáng.',
        appropriateFor: 'Giao lưu văn hóa trường học, dạo phố lễ hội'
      }
    ],
    colorRecommendations: [
      {
        title: 'Kinh Bắc Tứ Thân Cổ Điển',
        description: 'Áo đỏ chu sa + Quần đen tuyền + Yếm trong hồng sen + Dải bao xanh thủy lục. Đây là bảng màu lễ hội chuẩn mực lưu danh trong ca dao dân ca.',
        topColor: '#B91C1C',
        bottomColor: '#18181B',
        accentColor: '#0F766E'
      },
      {
        title: 'Thanh Tân Nắng Xuân (GenZ Pastel)',
        description: 'Áo vàng hoàng yến + Quần trắng ngọc + Yếm xanh cốm non. Tươi trẻ rạng rỡ hòa cùng nắng xuân lễ hội.',
        topColor: '#D97706',
        bottomColor: '#F8FAFC',
        accentColor: '#A3B14B'
      }
    ]
  },

  'ngu-than': {
    id: 'ngu-than',
    name: 'Áo Ngũ Thân',
    region: 'Cố Đô Huế & Miền Trung',
    regionalTag: 'Miền Trung',
    epoch: 'Được chúa Nguyễn Phúc Khoát định chế (1744) & vua Minh Mạng chuẩn hóa toàn quốc',
    festivalContext: 'Festival Huế, Đại Lễ Dâng Hương Đền Miếu, Lễ hội Áo Dài, Nghi thức cưới hỏi truyền thống',
    meaning: 'Năm thân áo tượng trưng cho tứ thân phụ mẫu + chính bản thân người mặc (thân con ở giữa được che chở). Năm chiếc khuy áo đại diện cho "Ngũ Thường": Nhân, Lễ, Nghĩa, Trí, Tín.',
    philosophy: 'Đỉnh cao của lễ nghi và đạo làm người: dáng đứng thẳng thớm, cổ lập lĩnh đoan trang ôm khít gáy, tà áo cân đối kín đáo từ cổ tới gót chân, thể hiện phong thái trí thức đài các.',
    modestyRules: [
      'Cổ lập lĩnh (cổ đứng) phải cài kín khuy cổ trên cùng khi bước vào không gian cúng tế, đình chùa.',
      'Hai bên sườn xẻ tà vừa phải từ dưới eo, tuyệt đối không xẻ cao quá hông làm hở da thịt.',
      'Áo ngũ thân luôn mặc kèm quần lụa dài qua mắt cá chân, không phối với quần short ngắn.'
    ],
    defaultPrimaryColor: '#0F766E',
    defaultBottomColor: '#F8FAFC',
    recommendedSilhouettes: [
      {
        id: 'ngu-than-tay-chen',
        name: 'Ngũ Thân Tay Chẽn Thanh Lịch',
        description: 'Ống tay áo ôm vừa vặn từ cùi chỏ đến cổ tay, gọn gàng, tôn dáng thanh mảnh của nữ sinh viên.',
        modernTwist: 'Cổ đứng hạ thấp còn 3.5cm tạo cảm giác dễ thở, cử động thoải mái trong tiết trời nóng bức.'
      },
      {
        id: 'ngu-than-tay-thung-trang-trong',
        name: 'Ngũ Thân Tay Thụng (Áo Tấc)',
        description: 'Ống tay áo thụng rộng uy nghi, hai tay khi chắp trước ngực tạo thành chữ "Nhân" tôn kính.',
        modernTwist: 'Lược bớt độ rủ bằng tơ organza nhẹ bay, thích hợp chụp ảnh nghệ thuật hoặc tham gia diễu hành.'
      },
      {
        id: 'ngu-than-lung-genz',
        name: 'Ngũ Thân Dáng Lửng Hiện Đại',
        description: 'Tà áo dài ngang bắp chân thay vì chạm đất, giúp bước đi nhanh nhẹn mà không lo vướng víu.',
        modernTwist: 'Phom suông chữ A nhẹ nhàng, giấu khuyết điểm vóc dáng, cực kỳ được học sinh yêu thích.'
      }
    ],
    necklines: [
      {
        id: 'neck-lap-linh-chuan',
        name: 'Cổ Lập Lĩnh Đoan Trang (Cổ Đứng)',
        description: 'Cổ đứng thẳng cao 3.5 - 4cm, vuông góc ở góc khép, tôn chiếc cổ cao thanh tao của người phụ nữ.',
        isModest: true
      },
      {
        id: 'neck-lap-linh-ren-nhe',
        name: 'Cổ Đứng Viền Tơ Tằm Cách Tân',
        description: 'Viền cổ mỏng hơn 1cm phối chất liệu tơ trong suốt tạo nét trẻ trung thanh khiết.',
        isModest: true
      },
      {
        id: 'neck-co-dung-thap-co-dien',
        name: 'Cổ Đứng Thấp (Tiêu Chuẩn Học Đường)',
        description: 'Cao 2.5cm, không gò bó cổ họng, cực kỳ thoải mái khi học tập và sinh hoạt ngoài trời.',
        isModest: true
      }
    ],
    buttonTypes: [
      {
        id: 'btn-5-khuy-ngoc-bich',
        name: 'Bộ 5 Khuy Ngọc Bích Xanh',
        material: 'Đá ngọc bích chạm khắc',
        description: '5 chiếc khuy đại diện cho Nhân - Lễ - Nghĩa - Trí - Tín, sáng bóng quý phái.'
      },
      {
        id: 'btn-5-khuy-bac-cham',
        name: 'Bộ 5 Khuy Bạc Hoa Mai',
        material: 'Bạc ta đúc nổi hoa mai',
        description: 'Đặc trưng mỹ nghệ xứ Huế, phát ra ánh kim loại tinh xảo khi ra nắng.'
      },
      {
        id: 'btn-khuy-vai-tet-thu-cong',
        name: 'Khuy Bện Vải Tơ Tằm Cùng Màu',
        material: 'Vải lụa thắt bím hoa cúc',
        description: 'Mềm mại, không cấn vào da thịt khi cử động cúi gập người.'
      }
    ],
    patterns: [
      {
        id: 'pat-gam-hoa-cung-dinh',
        name: 'Gấm Hoa Cúc & Chữ Vạn Cung Đình',
        description: 'Họa tiết hoa cúc đan chữ Vạn dệt chìm sang trọng theo phong cách triều Nguyễn.',
        symbolism: 'Đại diện cho sự trường thọ, may mắn và phúc lộc dồi dào.'
      },
      {
        id: 'pat-gam-thuy-ba-phuong-hoang',
        name: 'Thủy Ba Loan Phượng Thêu Tơ',
        description: 'Hình tượng chim loan phượng múa lượn trên ngọn sóng bạc.',
        symbolism: 'Sự duyên dáng uyển chuyển, đức hạnh và vẻ đẹp cao quý của người thiếu nữ.'
      },
      {
        id: 'pat-to-sen-mong-tron',
        name: 'Lụa Tơ Sen Trơn Óng',
        description: 'Bề mặt óng ánh ánh ngọc tự nhiên, mềm rủ như làn sương mỏng sớm mai.',
        symbolism: 'Vẻ đẹp thanh tịnh, giản dị mà vô cùng sang trọng.'
      }
    ],
    recommendedBottoms: [
      {
        id: 'bot-quan-lua-trang-ngoc',
        name: 'Quần Lụa Trắng Ngà Rủ Suông',
        category: 'quan-suong',
        description: 'Đặc trưng chuẩn mực của áo ngũ thân xứ Huế: tà áo màu sắc bên trên, quần lụa trắng thanh tao bên dưới.',
        appropriateFor: 'Mọi không gian lễ hội, cúng tế, dự lễ bế giảng'
      },
      {
        id: 'bot-quan-lua-den-bong',
        name: 'Quần Lụa Satin Đen Óng',
        category: 'quan-suong',
        description: 'Dành cho phong cách cổ điển quyền quý, tôn vinh các gam màu áo nóng rực rỡ.',
        appropriateFor: 'Nghi lễ trang trọng ban tối, chụp ảnh nghệ thuật'
      },
      {
        id: 'bot-quan-ong-rong-pastel',
        name: 'Quần Lụa Pastel Đồng Điệu',
        category: 'quan-cach-tan',
        description: 'Màu sắc cùng tông nhạt hơn áo một bậc (Tone-sur-tone), tạo hiệu ứng kéo dài đôi chân.',
        appropriateFor: 'Hội nghị văn hóa, sự kiện kỷ yếu hiện đại'
      }
    ],
    colorRecommendations: [
      {
        title: 'Cố Đô Thủy Lục Trang Nhã',
        description: 'Áo xanh thủy lục + Quần lụa trắng ngà + Khuy bạc chạm mai. Nét đài các dịu dàng của thiếu nữ sông Hương.',
        topColor: '#0F766E',
        bottomColor: '#F8FAFC',
        accentColor: '#DB2777'
      },
      {
        title: 'Tím Huế Mộng Mơ Truyền Thống',
        description: 'Áo tím hoa cà + Quần trắng ngọc + Kiềng bạc ta. Hình ảnh kinh điển của người con gái đất kinh kỳ.',
        topColor: '#7E22CE',
        bottomColor: '#F8FAFC',
        accentColor: '#D97706'
      }
    ]
  },

  'ba-ba': {
    id: 'ba-ba',
    name: 'Áo Bà Ba',
    region: 'Đồng Bằng Sông Cửu Long',
    regionalTag: 'Miền Nam',
    epoch: 'Đầu thế kỷ 19, hoàn thiện cùng công cuộc mở cõi phương Nam',
    festivalContext: 'Lễ Hội Sông Nước Miền Tây, Hội Chùa Bà Chúa Xứ (An Giang), Hội Hoa Xuân Đồng Tháp, Festival Trái Cây',
    meaning: 'Biểu tượng của đức tính chịu thương chịu khó, hào sảng, chất phác và hiếu khách của người dân Nam Bộ. Vạt áo xẻ tà hai bên hông tạo đường cong thắt đáy lưng ong mềm mại.',
    philosophy: 'Đề cao sự tự do, gần gũi với thiên nhiên sông nước, dễ dàng vận động lao động cũng như tham gia chèo xuồng, trẩy hội miệt vườn.',
    modestyRules: [
      'Đường xẻ tà hai bên hông vừa phải ngang hông, áo luôn có hai túi trước duyên dáng.',
      'Cổ áo có thể chọn cổ tròn hoặc cổ lá sen nhưng không khoét sâu quá tầm ngực.',
      'Chất liệu lụa hoặc đũi cần có độ dày dặn vừa phải hoặc có lớp lót mịn bên trong.'
    ],
    defaultPrimaryColor: '#DB2777',
    defaultBottomColor: '#18181B',
    recommendedSilhouettes: [
      {
        id: 'ba-ba-truyen-thong-xe-ta',
        name: 'Bà Ba Thắt Eo Xẻ Tà Duyên Dáng',
        description: 'Chiết eo nhẹ hai bên hông, tà áo dài ngang mông xẻ cao vừa vặn, hai túi vuông nhỏ phía trước.',
        modernTwist: 'Sử dụng lụa satin co giãn nhẹ giúp nữ sinh viên cử động tự do suốt ngày dài năng động.'
      },
      {
        id: 'ba-ba-dang-suong-hien-dai',
        name: 'Bà Ba Suông Rộng Oversize Trẻ Trung',
        description: 'Thân áo thả suông thoải mái, không chiết eo gò bó, mang hơi thở thời trang street-style GenZ.',
        modernTwist: 'Có thể sơ vin vạt trước hoặc buông tự nhiên với quần ống rộng, phá cách nhưng không hở hang.'
      },
      {
        id: 'ba-ba-tay-loe-cach-tan',
        name: 'Bà Ba Tay Lửng Loe Nhẹ Tơ Tằm',
        description: 'Ống tay lửng qua cùi chỏ loe nhẹ bồng bềnh, tạo nét tiểu thư ngọt ngào.',
        modernTwist: 'Rất hợp phối cùng kính mát retro và giày Mary Jane dạo phố hoa xuân.'
      }
    ],
    necklines: [
      {
        id: 'neck-co-tron-ba-ba',
        name: 'Cổ Tròn Đằm Thắm Nguyên Bản',
        description: 'Cổ tròn ôm sát chân cổ, đơn giản mà mộc mạc, đậm chất dịu hiền gái miền Tây.',
        isModest: true
      },
      {
        id: 'neck-co-la-sen-retro',
        name: 'Cổ Lá Sen Retro Nữ Sinh',
        description: 'Ve cổ bẻ tròn nhỏ như cánh sen, mang phong cách đồng phục nữ sinh Sài Gòn thập niên 60.',
        isModest: true
      },
      {
        id: 'neck-co-thuyen-xinh',
        name: 'Cổ Thuyền Tôn Xương Quai Xanh',
        description: 'Võng nhẹ sang hai vai, thoáng mát khi trẩy hội miền Tây mùa nắng ấm.',
        isModest: true
      }
    ],
    buttonTypes: [
      {
        id: 'btn-cuc-boc-vai-cung-mau',
        name: 'Hàng Cúc Bọc Vải Cùng Màu',
        material: 'Vải lụa ép khung kim loại',
        description: 'Chuỗi cúc dọc chính giữa thân áo tạo đường chỉ dọc ngay ngắn, nền nã.'
      },
      {
        id: 'btn-cuc-xa-cu-nam-bo',
        name: 'Cúc Xà Cừ Ốc Biển Kiên Giang',
        material: 'Vỏ xà cừ thiên nhiên',
        description: 'Ánh lên bảy sắc cầu vồng lấp lánh khi có nắng rọi vào.'
      },
      {
        id: 'btn-cuc-go-dua-ben-tre',
        name: 'Cúc Gỗ Dừa Thủ Công Mỹ Nghệ',
        material: 'Gỗ thân dừa lâu năm',
        description: 'Mộc mạc, gần gũi, tôn vinh sản vật trù phú của miền Nam.'
      }
    ],
    patterns: [
      {
        id: 'pat-hoa-nhi-vintage',
        name: 'Họa Tiết Hoa Nhí Đồng Nội',
        description: 'Những cánh hoa li ti màu pastel tươi sáng trên nền vải tơ mềm mại.',
        symbolism: 'Sự trẻ trung, tươi tắn như những vườn hoa trái trĩu quả Sa Đéc.'
      },
      {
        id: 'pat-ke-caro-khan-ran',
        name: 'Họa Tiết Kẻ Ô Khăn Rằn Cách Điệu',
        description: 'Biến tấu những đường kẻ caro đen trắng hoặc hồng phấn đặc trưng Nam Bộ.',
        symbolism: 'Biểu tượng của tinh thần nghĩa khí và lòng can trường miền sông nước.'
      },
      {
        id: 'pat-lua-gam-tron-sang',
        name: 'Lụa Tơ Tằm Trơn Dệt Gân',
        description: 'Mặt vải dệt gân chìm tinh tế, mát rượi khi chạm vào da thịt.',
        symbolism: 'Nét duyên ngầm sang trọng không phô trương.'
      }
    ],
    recommendedBottoms: [
      {
        id: 'bot-quan-lua-den-ba-ba',
        name: 'Quần Lụa Đen Ống Suông Thẳng',
        category: 'quan-suong',
        description: 'Bộ đôi kinh điển "áo bà ba - quần lụa đen" trường tồn cùng năm tháng, bất chấp bùn lầy sông nước.',
        appropriateFor: 'Lễ hội miền sông nước, chợ nổi, hội đình'
      },
      {
        id: 'bot-quan-linen-den-ong-dung',
        name: 'Quần Suông Linen Đen Tuyền Ống Đứng Cách Tân',
        category: 'quan-cach-tan',
        description: 'Chất liệu linen tự nhiên thoáng mát, phom ống đứng hiện đại trẻ trung, cực kỳ tôn dáng khi phối cùng sneaker.',
        appropriateFor: 'Dạo phố, chụp kỷ yếu, festival văn hóa sinh viên'
      },
      {
        id: 'bot-quan-ong-rong-cap-cao-trang',
        name: 'Quần Suông Cạp Cao Trắng Sữa',
        category: 'quan-cach-tan',
        description: 'Biến tấu hiện đại giúp outfit trông như một set đồ dạo phố cao cấp của các IT-Girl GenZ.',
        appropriateFor: 'Festival ẩm thực đường phố, cà phê cuối tuần'
      },
      {
        id: 'bot-quan-dui-lung-tre-trung',
        name: 'Quần Đũi Lửng Chạm Mắt Cá',
        category: 'quan-cach-tan',
        description: 'Ống lửng thoáng đãng phối cùng sneaker vải hoặc dép quai đan mây tre.',
        appropriateFor: 'Trải nghiệm du lịch cộng đồng, hội làng hè'
      }
    ],
    colorRecommendations: [
      {
        title: 'Hồng Sen Đồng Tháp Rực Rỡ',
        description: 'Áo hồng sen bách diệp + Quần lụa đen óng + Khăn rằn đen trắng. Hình ảnh cô Ba duyên dáng ngọt ngào bên mạn thuyền.',
        topColor: '#DB2777',
        bottomColor: '#18181B',
        accentColor: '#F8FAFC'
      },
      {
        title: 'Phù Sa Mộc Mạc Nam Bộ',
        description: 'Áo nâu sồng hoặc cam phù sa + Quần lụa đen + Cúc gỗ dừa. Trầm ấm, chân tình và thân thuộc.',
        topColor: '#EA580C',
        bottomColor: '#18181B',
        accentColor: '#A3B14B'
      }
    ]
  }
};

export const ACCESSORIES_DATABASE: AccessoryItem[] = [
  // GIÀY DÉP
  {
    id: 'shoes-guoc-moc-nhung',
    name: 'Guốc Mộc Quai Nhung Đỏ Thêu Chỉ',
    type: 'shoes',
    culturalOrigin: 'Làng nghề guốc mộc Yên Xá (Hà Nội) & Lái Thiêu (Bình Dương)',
    meaning: 'Tiếng lách cách gõ nhịp trên thềm gạch cổ là thanh âm thân thương của phụ nữ Việt xưa qua bao thế hệ.',
    styleAdvice: 'Tuyệt đẹp khi phối với Áo Tứ Thân và Ngũ Thân, quai nhung đỏ thắm tôn chân trắng ngọc.',
    imageIcon: 'Footprints'
  },
  {
    id: 'shoes-dep-coi-lua',
    name: 'Dép Cói Quai Lụa Tơ Tằm',
    type: 'shoes',
    culturalOrigin: 'Làng cói Kim Sơn & lụa tơ tằm Vạn Phúc',
    meaning: 'Chất liệu thiên nhiên mộc mạc kết hợp lụa óng mềm mại, nâng niu từng bước chân trẩy hội.',
    styleAdvice: 'Rất hợp với Áo Tứ Thân cách tân, thoải mái dạo chơi cả ngày dài.',
    imageIcon: 'Footprints'
  },
  {
    id: 'shoes-guoc-got-tru-cham',
    name: 'Guốc Gỗ Gót Trụ Chạm Khắc Sen',
    type: 'shoes',
    culturalOrigin: 'Thủ công mỹ nghệ cung đình Huế',
    meaning: 'Gót gỗ tiện tròn chạm nổi búp sen biểu thị sự đoan trang, vững chãi trong từng bước đi.',
    styleAdvice: 'Rất hợp với Áo Ngũ Thân tay chẽn, giữ thăng bằng tốt khi di chuyển nhiều trong sân đình.',
    imageIcon: 'Sparkles'
  },
  {
    id: 'shoes-mary-jane-vintage',
    name: 'Giày Mary Jane Da Đen Quai Ngang',
    type: 'shoes',
    culturalOrigin: 'Phong cách thời trang nữ sinh đầu thế kỷ 20',
    meaning: 'Sự giao thoa thanh lịch giữa thẩm mỹ phương Tây cổ điển và nét dịu dàng Á Đông của nữ sinh viện.',
    styleAdvice: 'Bảo bối của GenZ: đi cùng tất ren trắng cổ ngắn phối cùng Áo Bà Ba hoặc Tứ Thân vạt lửng cực trendy!',
    imageIcon: 'Compass'
  },
  {
    id: 'shoes-sneaker-canvas-theu',
    name: 'Sneaker Vải Canvas Trắng Thêu Sen',
    type: 'shoes',
    culturalOrigin: 'Cải cách thời trang thể thao năng động đương đại',
    meaning: 'Biểu trưng cho tinh thần trẻ trung, dám bứt phá và tự do trải nghiệm lễ hội của sinh viên hiện đại.',
    styleAdvice: 'Phù hợp khi phải đi bộ leo núi hội Đền Hùng hoặc dạo bộ cả ngày trong không gian lễ hội lớn.',
    imageIcon: 'Zap'
  },
  {
    id: 'shoes-sandal-quai-manh',
    name: 'Sandal Lụa Quai Mảnh Tơ Tằm',
    type: 'shoes',
    culturalOrigin: 'Đan tơ thủ công Hội An',
    meaning: 'Nhẹ nhàng, mộc mạc và thanh thoát, mang lại cảm giác giải phóng đôi chân.',
    styleAdvice: 'Thích hợp cho ngày hè tham gia lễ hội sông nước miền Nam hoặc phố cổ.',
    imageIcon: 'Sun'
  },

  // TRANG SỨC
  {
    id: 'jewel-kieng-bac-cham-sen',
    name: 'Kiềng Bạc Ta Chạm Khắc Hoa Sen',
    type: 'jewelry',
    culturalOrigin: 'Làng nghề kim hoàn Định Công (Hà Nội) & Kế Môn (Huế)',
    meaning: 'Chiếc kiềng tròn ôm vòng cổ tượng trưng cho sự viên mãn trọn vẹn, tính đoan chính và thuần khiết.',
    styleAdvice: 'Món phụ kiện "linh hồn" khi mặc Áo Ngũ Thân hoặc Tứ Thân cổ xây, tạo điểm sáng rạng rỡ cho gương mặt.',
    imageIcon: 'Shield'
  },
  {
    id: 'jewel-khuyen-tai-ngoc-trai',
    name: 'Khuyên Tai Ngọc Trai Nước Ngọt',
    type: 'jewelry',
    culturalOrigin: 'Nuôi cấy ngọc trai Phú Quốc & Cô Tô',
    meaning: 'Hạt ngọc tròn trắng đại diện cho vẻ đẹp khiêm nhường, thanh lịch và tấm lòng trong sáng của thiếu nữ.',
    styleAdvice: 'Thiết kế hạt tròn nụ tối giản, hợp với mọi gương mặt và không bao giờ lỗi mốt.',
    imageIcon: 'CircleDot'
  },
  {
    id: 'jewel-khuyen-tai-nu-sen-ngoc',
    name: 'Khuyên Tai Nụ Sen Bạc Đính Ngọc',
    type: 'jewelry',
    culturalOrigin: 'Chạm khắc kim hoàn truyền thống Huế',
    meaning: 'Búp sen ngậm ngọc biểu trưng cho nét đoan trang, thanh tao và cốt cách thanh cao của thiếu nữ.',
    styleAdvice: 'Tạo điểm nhấn trang nhã tuyệt đối khi diện Áo Ngũ Thân và đội nón bài thơ.',
    imageIcon: 'Sparkles'
  },
  {
    id: 'jewel-vong-tay-cam-thach',
    name: 'Vòng Tay Cẩm Thạch Xanh Dịu',
    type: 'jewelry',
    culturalOrigin: 'Ngọc cẩm thạch Nam Bộ truyền thống',
    meaning: 'Tượng trưng cho sự an lành, vượng khí và nét duyên dáng bình dị của người con gái phương Nam.',
    styleAdvice: 'Đeo ở cổ tay mềm mại, hòa hợp tuyệt vời với sắc xanh matcha của Áo Bà Ba.',
    imageIcon: 'CircleDot'
  },
  {
    id: 'jewel-tui-coi-theu-sen',
    name: 'Túi Cói Đan Tay Thêu Cánh Sen',
    type: 'jewelry',
    culturalOrigin: 'Làng nghề đan lục bình & cói Tây Nam Bộ',
    meaning: 'Chiếc túi thủ công mộc mạc mang theo nét thơ ngây và ý thức bảo vệ môi trường của thế hệ trẻ.',
    styleAdvice: 'Phụ kiện cầm tay lý tưởng cho set đồ Áo Bà Ba năng động cùng sneaker trắng.',
    imageIcon: 'HeartHandshake'
  },
  {
    id: 'jewel-vong-tay-ngu-sac',
    name: 'Vòng Tay Chỉ Dệt Ngũ Sắc May Mắn',
    type: 'jewelry',
    culturalOrigin: 'Tập tục lễ hội Tết Đoan Ngọ và hội xuân Bắc Bộ',
    meaning: 'Năm sợi chỉ xanh, đỏ, vàng, trắng, đen tượng trưng cho ngũ hành, trừ tà và mang lại may mắn, bình an.',
    styleAdvice: 'Điểm nhấn rực rỡ vui tươi nơi cổ tay, đậm chất sinh viên và tinh thần trẩy hội dân gian.',
    imageIcon: 'HeartHandshake'
  },
  {
    id: 'jewel-kinh-mat-retro-oval',
    name: 'Mắt Kính Retro Gọng Kim Loại Mảnh',
    type: 'jewelry',
    culturalOrigin: 'Phong cách tri thức tân thời Thập niên 1930s',
    meaning: 'Biểu thị tinh thần cầu tiến, trí tuệ và nét cá tính thông minh của nữ sinh viên thời đại mới.',
    styleAdvice: 'Tạo nét độc đáo cho bức ảnh lookbook: vừa cổ kính vừa mang đậm chất học thức hiện đại.',
    imageIcon: 'Glasses'
  },
  {
    id: 'jewel-nhan-bac-men-lam',
    name: 'Nhẫn Bạc Đính Họa Tiết Men Lam Cổ',
    type: 'jewelry',
    culturalOrigin: 'Nghệ thuật pháp lam triều Nguyễn',
    meaning: 'Nghệ thuật phủ men trên cốt kim loại tinh xảo, thể hiện gu thẩm mỹ văn hóa sâu sắc.',
    styleAdvice: 'Đeo ở ngón trỏ hoặc ngón giữa, tạo vẻ tinh tế khi cầm quạt hoặc chắp tay cầu an.',
    imageIcon: 'Gem'
  },

  // PHỤ KIỆN TÓC & ĐẦU
  {
    id: 'hair-non-quai-thao',
    name: 'Nón Quai Thao (Nón Ba Tầm)',
    type: 'hair',
    culturalOrigin: 'Làng nón Chuông & cái nôi dân ca Quan họ Bắc Ninh',
    meaning: 'Biểu tượng tối thượng của thiếu nữ trẩy hội Lim: chiếc nón tròn phẳng như mặt trăng rằm, dải thao tơ hồng buông lơi.',
    styleAdvice: 'Bắt buộc phải có khi chụp lookbook Áo Tứ Thân! Cầm tay hoặc đeo hờ hững sau lưng tạo dáng chụp ảnh cực nghệ thuật.',
    imageIcon: 'Disc'
  },
  {
    id: 'hair-man-khuon-nhung',
    name: 'Mấn Nhung Khăn Đóng Đài Các',
    type: 'hair',
    culturalOrigin: 'Nghi lễ cung đình và trang phục thị dân miền Trung - Bắc',
    meaning: 'Chiếc mấn quấn nhiều nếp đều tăm tắp tượng trưng cho sự tề gia, mực thước và nề nếp gia phong.',
    styleAdvice: 'Phối chuẩn mực nhất với Áo Ngũ Thân tay chẽn, làm sáng bừng vầng trán thông minh.',
    imageIcon: 'Crown'
  },
  {
    id: 'hair-khan-ran-nam-bo',
    name: 'Khăn Rằn Lụa Nam Bộ Dệt Mảnh',
    type: 'hair',
    culturalOrigin: 'Văn hóa sông nước Tây Nam Bộ',
    meaning: 'Chiếc khăn đồng hành qua bao thăng trầm, biểu hiện cho đức tính thủy chung và hào sảng phương Nam.',
    styleAdvice: 'Quấn hờ trên tóc như băng đô, hoặc vắt chéo qua vai khi diện Áo Bà Ba mang nét khỏe khoắn, phóng khoáng.',
    imageIcon: 'Flag'
  },
  {
    id: 'hair-non-la-bai-tho',
    name: 'Nón Lá Bài Thơ Xứ Huế Quai Lụa',
    type: 'hair',
    culturalOrigin: 'Làng nón Dạ Lê & Phủ Cam (Thừa Thiên Huế)',
    meaning: 'Soi dưới ánh nắng hiện lên câu thơ và hình ảnh chùa Thiên Mụ, đại diện cho nét e ấp duyên dáng.',
    styleAdvice: 'Quai nón bằng dải lụa mềm màu hồng phấn hoặc tím nhạt thắt nơ dưới cằm, che nắng hữu hiệu khi đi hội hè.',
    imageIcon: 'Triangle'
  },
  {
    id: 'hair-tram-cai-toc-bac',
    name: 'Trâm Cài Tóc Bạc Hoa Mẫu Đơn',
    type: 'hair',
    culturalOrigin: 'Trâm cài tóc truyền thống phụ nữ Việt qua các triều đại',
    meaning: 'Giữ búi tóc gọn gàng thanh thoát, hoa mẫu đơn tượng trưng cho sự viên mãn và thanh xuân rực rỡ.',
    styleAdvice: 'Rất hợp với kiểu tóc búi thấp đài các hoặc búi củ tỏi cách tân trẻ trung.',
    imageIcon: 'Wand2'
  },
  {
    id: 'hair-bang-do-lua-sen',
    name: 'Băng Đô Lụa Tơ Tằm Thêu Sen',
    type: 'hair',
    culturalOrigin: 'Cải tiến hiện đại dành cho nữ sinh tóc ngắn / tóc lỡ',
    meaning: 'Giải pháp hoàn hảo giúp các bạn trẻ không cần nuôi tóc quá dài vẫn diện Việt phục vô cùng duyên dáng.',
    styleAdvice: 'Dễ đeo, êm đầu, tạo điểm nhấn ngọt ngào cho các bạn sinh viên GenZ tóc ngắn cá tính.',
    imageIcon: 'Smile'
  },
  {
    id: 'hair-hoa-sen-cai-tai',
    name: 'Bông Sen Tươi / Hoa Nhài Cài Tai',
    type: 'hair',
    culturalOrigin: 'Văn hóa cài hoa thơm ngày hội xuân dân gian',
    meaning: 'Hương thơm tự nhiên thanh khiết, gần gũi cỏ cây mộc mạc.',
    styleAdvice: 'Cài nghiêng một bên vành tai, mang lại sự tươi tắn ngọt ngào không cần phụ kiện đắt tiền.',
    imageIcon: 'Flower'
  }
];

export interface FestivalEventPreset {
  id: string;
  name: string;
  venue: string;
  atmosphere: string;
  advice: string;
  recommendedRoot: CostumeRootId;
}

export const FESTIVAL_EVENTS: FestivalEventPreset[] = [
  {
    id: 'event-hoi-lim',
    name: 'Hội Lim & Giao Duyên Quan Họ',
    venue: 'Đồi Lim, Tiên Du, Bắc Ninh',
    atmosphere: 'Tràn ngập tiếng hát giao duyên trữ tình, sắc màu rực rỡ giữa đồi xuân bao la',
    advice: 'Lựa chọn Áo Tứ Thân mớ ba mớ bảy cùng Nón Quai Thao và Thắt lưng bao xanh - hồng để hòa mình trọn vẹn vào không khí Kinh Bắc!',
    recommendedRoot: 'tu-than'
  },
  {
    id: 'event-den-hung',
    name: 'Đại Lễ Dâng Hương Đền Hùng',
    venue: 'Khu Di Tích Lịch Sử Đền Hùng, Phú Thọ',
    atmosphere: 'Không gian cội nguồn linh thiêng, tôn nghiêm, dòng người hành hương trật tự',
    advice: 'Ưu tiên phom dáng Áo Ngũ Thân hoặc Tứ Thân cổ cao đoan trang, khép kín tà áo, phối cùng sneaker vải để leo các bậc thang đá dễ dàng.',
    recommendedRoot: 'ngu-than'
  },
  {
    id: 'event-festival-hue',
    name: 'Festival Văn Hóa Nghệ Thuật Cố Đô Huế',
    venue: 'Đại Nội Huế & Cầu Trường Tiền',
    atmosphere: 'Trang trọng, thi vị, âm vang nhã nhạc cung đình và ánh đèn hoa đăng sông Hương',
    advice: 'Áo Ngũ Thân lập lĩnh tay chẽn phối mấn nhung và kiềng bạc sẽ giúp bạn hóa thân thành thiếu nữ đài các xứ kinh kỳ.',
    recommendedRoot: 'ngu-than'
  },
  {
    id: 'event-song-nuoc-nam-bo',
    name: 'Lễ Hội Sông Nước & Trái Cây Miệt Vườn',
    venue: 'Chợ nổi Cái Răng & Vườn hoa Sa Đéc, miền Tây',
    atmosphere: 'Hào sảng, rộn ràng tiếng đờn ca tài tử, nhộn nhịp ghe xuồng trên sông nước',
    advice: 'Áo Bà Ba màu sắc tươi tắn phối khăn rằn Nam Bộ và nón lá, chất liệu nhẹ mát, thấm hút mồ hôi tốt khi sinh hoạt ngoài trời.',
    recommendedRoot: 'ba-ba'
  },
  {
    id: 'event-genz-street-festival',
    name: 'Ngày Hội Việt Phục Trẻ (Youth Heritage Fest)',
    venue: 'Phố đi bộ Hồ Gươm / Nguyễn Huệ',
    atmosphere: 'Năng động, giao lưu học sinh sinh viên, sàn diễn lookbook thời trang đường phố',
    advice: 'Thỏa sức phối cách tân: Tứ Thân hoặc Ngũ Thân lửng cùng giày Mary Jane, kính retro, băng đô lụa, thể hiện cá tính không giới hạn!',
    recommendedRoot: 'tu-than'
  }
];

export interface WeatherCondition {
  id: string;
  title: string;
  temp: string;
  icon: string;
  tip: string;
}

export const WEATHER_CONDITIONS: WeatherCondition[] = [
  {
    id: 'weather-spring-breeze',
    title: 'Nắng Ấm Đầu Xuân',
    temp: '22°C - 26°C',
    icon: 'Sun',
    tip: 'Thời tiết lý tưởng nhất! Thỏa sức diện lụa tơ tằm hai lớp, áo tứ thân mớ ba mớ bảy buông vạt lãng mạn.'
  },
  {
    id: 'weather-summer-sun',
    title: 'Nắng Nóng Hội Hè',
    temp: '29°C - 34°C',
    icon: 'Flame',
    tip: 'Ưu tiên chất liệu đũi mộc, lanh tơ tằm thoáng khí. Chọn cổ thuyền hoặc bà ba mát mẻ, đừng quên nón quai thao hoặc nón lá che nắng.'
  },
  {
    id: 'weather-autumn-chill',
    title: 'Se Lạnh Thu Đông',
    temp: '17°C - 21°C',
    icon: 'CloudFog',
    tip: 'Áo Ngũ Thân gấm chần bông mỏng hoặc phối khăn quàng lụa tơ tằm to bản, mang lại vẻ ấm áp, quý phái.'
  },
  {
    id: 'weather-spring-rain',
    title: 'Mưa Phùn Mùa Lễ',
    temp: '19°C - 23°C',
    icon: 'CloudRain',
    tip: 'Nên chọn phom vạt lửng cách tân ngang bắp chân để vạt áo không quệt nước bẩn. Mang guốc mộc cao hoặc giày da chống thấm.'
  }
];
