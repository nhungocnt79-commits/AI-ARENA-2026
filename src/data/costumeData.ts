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
        id: 'tu-than-buoc-vat-truoc',
        name: 'Tứ Thân Buộc Thắt Vạt Trước Bụng',
        description: 'Hai vạt trước không cài cúc mà được buộc thắt gọn gàng trước bụng duyên dáng, thân sau may liền ở sống lưng, dài chấm gót.',
        modernTwist: 'Kiểu mặc chuẩn mực Kinh Bắc: thắt nơ vạt trước kết hợp áo yếm lót trong và dải bao lụa mềm buông thả ở eo.'
      },
      {
        id: 'tu-than-buong-tha-mem',
        name: 'Tứ Thân Buông Thả Mềm Mại',
        description: 'Hai vạt trước buông lơi tự do thướt tha hai bên tà không cài cúc, khoe trọn vẹn áo yếm và dải lụa thắt eo bên trong.',
        modernTwist: 'Phong thái thanh thoát, phóng khoáng, tà áo bay bổng khi bước đi.'
      },
      {
        id: 'tu-than-mo-ba-layer',
        name: 'Tứ Thân Mớ Ba Mớ Bảy Đa Lớp',
        description: 'Phối nhiều lớp tơ mỏng lồng ghép tạo hiệu ứng chuyển sắc và chiều sâu huyền ảo.',
        modernTwist: 'Ứng dụng chất liệu sa tơ hoặc lụa tơ tằm thượng hạng nhẹ như mây bay.'
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
        name: 'Không Khuy Cài (Buộc Vạt Trước Bụng)',
        material: 'Tự thắt vạt lụa tự nhiên',
        description: 'Đặc trưng cốt lõi của Áo Tứ Thân: tuyệt đối không có khuy cài, hai vạt trước buộc thắt gọn gàng hoặc buông thả.'
      },
      {
        id: 'btn-cuc-ngoc-trai',
        name: 'Dải Bao Lụa Mềm Thắt Eo',
        material: 'Lụa tơ tằm ruột tượng',
        description: 'Dải thắt lưng mềm mại quấn eo buông lơi hai đầu dải thướt tha.'
      }
    ],
    patterns: [
      {
        id: 'pat-to-van-may',
        name: 'Vải Tơ Vân Mây Cổ Truyền',
        description: 'Vải lụa tơ dệt hoa văn vân mây Đại Việt cuộn tròn bồng bềnh, tạo chiều sâu thị giác thanh tao thoát tục.',
        symbolism: 'Mây cuộn hanh thông, cầu chúc sự thanh nhã và bình an.'
      },
      {
        id: 'pat-gam-det-chim',
        name: 'Vải Gấm Dệt Họa Tiết Chìm',
        description: 'Gấm dệt chìm hoa cúc chữ Vạn và thủy ba, hoa văn ẩn hiện quý phái dưới ánh sáng nghiêng.',
        symbolism: 'Sự mực thước, thanh cao và quyền quý triều đình.'
      },
      {
        id: 'pat-v-nhu-bong',
        name: 'Vải Nhũ Bóng Kim Sa Lộng Lẫy',
        description: 'Sợi dệt pha tinh thể bắt sáng nhũ bóng kiêu sa, phản xạ ánh sáng nổi bật trên nền trắng.',
        symbolism: 'Hào quang tỏa sáng rực rỡ và sức sống thanh xuân.'
      },
      {
        id: 'pat-sa-xuyen-thau',
        name: 'Sa Tơ Xuyên Thấu 2 Lớp',
        description: 'Sa tơ mỏng nhẹ như khói phủ lên lớp yếm và lớp lót bên trong, tạo chiều sâu huyền ảo.',
        symbolism: 'Nét duyên thầm kín đáo, e ấp của thiếu nữ Kinh Bắc.'
      },
      {
        id: 'pat-dui-tho-moc',
        name: 'Vải Đũi Tơ Tằm Thô Mộc',
        description: 'Chất vải đũi tơ tằm dệt tay thô mộc, nền nã, thấm hút mồ hôi và đậm hồn dân tộc.',
        symbolism: 'Nét mộc mạc, chất phác và bình dị chốn làng quê.'
      }
    ],
    recommendedBottoms: [
      {
        id: 'bot-vay-dup-lua-trang-xoe-rong',
        name: 'Váy Đụp Lụa Trắng Xòe Rộng Kinh Bắc',
        category: 'chan-vay',
        description: 'Phom dáng váy đụp xòe rộng thênh thang tròn tự nhiên từ hông xuống chấm gót Kinh Bắc xưa, chất lụa tơ tự nhiên màu trắng ngà bắt sáng dịu dàng, nhiều nếp sóng rủ mềm bay bổng, cạp quấn/quây cao phẳng phiu dồn nếp khéo léo dưới áo yếm.',
        appropriateFor: 'Phối thướt tha kinh điển cùng Áo Tứ Thân Kinh Bắc và yếm lót'
      },
      {
        id: 'bot-quan-ong-xeo-lua-trang-nga',
        name: 'Quần Lụa Trắng Ngà Ống Xéo Cổ Phục',
        category: 'quan-suong',
        description: 'Ống rộng (ống xéo) xòe nhẹ tự nhiên ở gấu tạo bước đi uyển chuyển, lụa tự nhiên màu trắng ngà bóng mờ sang trọng, cạp cao phẳng phiu, dài chạm đất phủ qua mắt cá chân.',
        appropriateFor: 'Phối chuẩn mực cùng áo Tứ Thân và áo Ngũ Thân'
      },

      {
        id: 'bot-vay-xep-ly-dai',
        name: 'Chân Váy Xếp Ly Dài Phom Chữ A Chạm Đất',
        category: 'chan-vay',
        description: 'Phong cách cổ điển tối giản hoàn toàn trơn màu trắng kem/trắng ngà mờ lì trang nhã. Chất vải dày dặn giữ phom phồng chữ A tự nhiên không rũ gãy. Cạp cao bản vừa phẳng phiu đứng dáng, dưới cạp là các nếp xếp ly bản lớn đối xứng mở rộng dần về phía gấu, chạy thẳng tắp kéo dài tỷ lệ cơ thể. Chân váy dài chạm đất, viền gấp mí phẳng chỉn chu, gấu lượn sóng mềm mại theo bước đi.',
        appropriateFor: 'Phối mực thước thanh tao cùng Áo Tứ Thân, Áo Ngũ Thân, Áo Bà Ba'
      },
      {
        id: 'bot-vay-lua-bong-cat-xeo',
        name: 'Chân Váy Lụa Satin Cắt Xéo Bay Bổng',
        category: 'chan-vay',
        description: 'Phong cách tối giản thanh lịch trơn màu hoàn toàn, sắc trắng ngà trang nhã cùng độ bóng mờ sang trọng của lụa satin mượt mà. Cạp phẳng phiu ôm gọn eo kết hợp kỹ thuật cắt xéo vải (bias cut) ôm nhẹ phần hông rồi buông rủ thành những dải sóng mềm mại dọc thân, xòe nhẹ duyên dáng về phía gấu lượn sóng uyển chuyển.',
        appropriateFor: 'Phối thanh lịch cùng Áo Tứ Thân, Áo Ngũ Thân, Áo Bà Ba'
      },
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
        id: 'ngu-than-cach-tan-hoa-3d',
        name: 'Ngũ Thân Cách Tân Hoa 3D & Ombre Khúc Xạ',
        description: 'Dải khuy hoa vải 3D đính nổi 5 cánh dọc vạt chéo, viền nẹp xanh ngọc định hình phom, chất tơ organza ánh sắc tím lavender phủ đầm hai dây hồng san hô khúc xạ màu huyền ảo, can ngang bắp tay.',
        modernTwist: 'Đỉnh cao sáng tạo Haute Couture: kết hợp cấu trúc ngũ thân truyền thống với nghệ thuật chuyển màu khúc xạ và dải hoa vải đính nổi thủ công.'
      },
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
        id: 'btn-hoa-vai-3d-dinh-noi',
        name: 'Dải Khuy Hoa Vải 3D Đính Nổi & Nút Tết Xanh Ngọc',
        material: 'Hoa vải trắng mờ 5 cánh thủ công & nút tết ngọc bích',
        description: 'Dọc đường xẻ vạt chéo từ xương quai xanh xuống mạn sườn là hàng hoa trắng 5 cánh đính nổi 3D, đỉnh cổ có nút khuy tết bằng sợi vải màu xanh ngọc đồng bộ.'
      },
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
        id: 'pat-may-song-thuy-ba',
        name: 'Vải Tơ Vân Mây Cổ Truyền',
        description: 'Vải lụa tơ dệt hoa văn vân mây Đại Việt cuộn tròn bồng bềnh, tạo chiều sâu thị giác thanh thoát thoát tục.',
        symbolism: 'Mây lành phúc khí, trường thọ và cầu mong thuận hòa thanh bạch.'
      },
      {
        id: 'pat-gam-hoa-cung-dinh',
        name: 'Vải Gấm Dệt Họa Tiết Chìm',
        description: 'Gấm dệt chìm hoa cúc đan chữ Vạn theo chuẩn mực triều Nguyễn, sang trọng quý phái ẩn hiện theo góc nghiêng của ánh sáng.',
        symbolism: 'Đại diện cho sự trường thọ, may mắn và phong thái tôn nghiêm mực thước.'
      },
      {
        id: 'pat-v-nhu-bong',
        name: 'Vải Nhũ Bóng Kim Sa Cao Cấp',
        description: 'Sợi dệt xen tinh thể bắt sáng lóng lánh kiêu sa, tạo hiệu ứng nhũ phản quang lấp lánh như sương mai dưới ánh đèn.',
        symbolism: 'Tôn vinh vẻ đẹp rạng rỡ, hiện đại mà kiêu sa của thiếu nữ tân thời.'
      },
      {
        id: 'pat-to-sen-mong-tron',
        name: 'Lụa Tơ Tằm Trắng Ngà Trơn Mịn',
        description: 'Bề mặt óng ả ánh ngọc trai tự nhiên, dệt thủ công mềm rủ, nguyên bản vẻ đoan trang mực thước.',
        symbolism: 'Vẻ đẹp thanh tịnh, mực thước, khiêm cung và trang nhã.'
      }
    ],
    recommendedBottoms: [
      {
        id: 'bot-quan-ong-xeo-lua-trang-nga',
        name: 'Quần Lụa Trắng Ngà Ống Xéo Cổ Phục',
        category: 'quan-suong',
        description: 'Ống rộng (ống xéo) xòe nhẹ tự nhiên ở gấu tạo bước đi uyển chuyển, lụa tự nhiên màu trắng ngà bóng mờ sang trọng, cạp cao phẳng phiu, dài chạm đất phủ qua mắt cá chân.',
        appropriateFor: 'Phối chuẩn mực đoan chính cùng Áo ngũ thân tay chẽn, tay thụng và ngũ thân cách tân'
      },
      {
        id: 'bot-vay-dup-lua-trang-xoe-rong',
        name: 'Váy Đụp Lụa Trắng Xòe Rộng Kinh Bắc',
        category: 'chan-vay',
        description: 'Phom dáng váy đụp xòe rộng thênh thang tròn tự nhiên từ hông xuống chấm gót, giữ nguyên nét xưa, lụa tơ mềm rủ bay bổng.',
        appropriateFor: 'Phối cách tân bay bổng cùng Áo ngũ thân và áo tứ thân'
      },

      {
        id: 'bot-vay-xep-ly-dai',
        name: 'Chân Váy Xếp Ly Dài Phom Chữ A Chạm Đất',
        category: 'chan-vay',
        description: 'Phong cách cổ điển tối giản hoàn toàn trơn màu trắng kem/trắng ngà mờ lì trang nhã. Chất vải dày dặn giữ phom phồng chữ A tự nhiên không rũ gãy. Cạp cao bản vừa phẳng phiu đứng dáng, dưới cạp là các nếp xếp ly bản lớn đối xứng mở rộng dần về phía gấu, chạy thẳng tắp kéo dài tỷ lệ cơ thể. Chân váy dài chạm đất, viền gấp mí phẳng chỉn chu, gấu lượn sóng mềm mại theo bước đi.',
        appropriateFor: 'Phối mực thước thanh tao cùng Áo Ngũ Thân tay chẽn, Áo Ngũ Thân tay thụng'
      },
      {
        id: 'bot-vay-lua-bong-cat-xeo',
        name: 'Chân Váy Lụa Satin Cắt Xéo Bay Bổng',
        category: 'chan-vay',
        description: 'Phong cách tối giản thanh lịch trơn màu hoàn toàn, sắc trắng ngà trang nhã cùng độ bóng mờ sang trọng của lụa satin mượt mà. Cạp phẳng phiu ôm gọn eo kết hợp kỹ thuật cắt xéo vải (bias cut) ôm nhẹ phần hông rồi buông rủ thành những dải sóng mềm mại dọc thân, xòe nhẹ duyên dáng về phía gấu lượn sóng uyển chuyển.',
        appropriateFor: 'Phối thanh lịch cùng Áo Ngũ Thân cách tân, Áo Ngũ Thân tay chẽn'
      },
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
        id: 'ba-ba-nu-chit-eo',
        name: 'Bà Ba Nữ Chít Eo Duyên Dáng',
        description: 'Chít eo mềm mại tôn đường cong thắt đáy lưng ong, dài trùm mông, xẻ tà hai bên hông thanh thoát.',
        modernTwist: 'Phom dáng may đo ôm nhẹ đường cong tôn dáng thiếu nữ, kết hợp túi nhỏ hoặc trơn thanh tao.'
      },
      {
        id: 'ba-ba-nam-dang-suong',
        name: 'Bà Ba Nam Dáng Suông Phóng Khoáng',
        description: 'Dáng áo suông rộng rãi thoải mái, không chít eo, hai túi to ở vạt trước đặc trưng truyền thống.',
        modernTwist: 'Phong thái đĩnh đạc, hào sảng, cử động cực kỳ dễ chịu trong mọi hoạt động.'
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
        name: 'Cổ Tròn Đằm Thắm (Không Cổ)',
        description: 'Cổ áo không có chân cổ, khoét tròn ôm nhẹ chân cổ nền nã, mộc mạc dịu hiền.',
        isModest: true
      },
      {
        id: 'neck-co-tim-la-trau',
        name: 'Cổ Tim (Cổ Lá Trầu) Duyên Dáng',
        description: 'Biến tấu cổ tim khẽ uốn cong như cánh lá trầu, nét duyên trứ danh của phụ nữ Nam Bộ.',
        isModest: true
      },
      {
        id: 'neck-co-vuong-thanh-thoat',
        name: 'Cổ Vuông Thanh Thoát',
        description: 'Khoét vuông nhẹ góc mềm, khoe khéo bờ vai thon mà vẫn kín đáo đoan trang.',
        isModest: true
      },
      {
        id: 'neck-co-la-sen-retro',
        name: 'Cổ Lá Sen Retro Nữ Sinh',
        description: 'Ve cổ bẻ tròn nhỏ như cánh sen, phong cách nữ sinh Sài Gòn thập niên 60.',
        isModest: true
      }
    ],
    buttonTypes: [
      {
        id: 'btn-cuc-boc-vai-cung-mau',
        name: 'Dải Cúc Cài Dọc Giữa (Cùng Màu)',
        material: 'Khuy bọc lụa cùng màu',
        description: 'Dải khuy cài dọc chính giữa từ cổ xuống vạt áo thẳng tắp ngay ngắn.'
      },
      {
        id: 'btn-cuc-xa-cu-nam-bo',
        name: 'Dải Cúc Xà Cừ Ánh Trai',
        material: 'Xà cừ ốc biển Kiên Giang',
        description: 'Chuỗi cúc dọc bắt sáng lấp lánh như giọt sương mai trên tà áo.'
      },
      {
        id: 'btn-cuc-bam-an',
        name: 'Dải Khuy Bấm Ẩn Hiện Đại',
        material: 'Khuy bấm tàng hình',
        description: 'Giữ hai tà áo phẳng phiu tuyệt đối, tiện lợi khi mặc.'
      }
    ],
    patterns: [
      {
        id: 'pat-to-van-may',
        name: 'Vải Tơ Vân Mây Cổ Truyền',
        description: 'Lụa tơ dệt hoa văn vân mây uốn lượn bồng bềnh, tạo chiều sâu thị giác thanh tao.',
        symbolism: 'Sự hanh thông, mềm mại như dòng phù sa sông Cửu Long.'
      },
      {
        id: 'pat-gam-det-chim',
        name: 'Vải Gấm Dệt Họa Tiết Chìm',
        description: 'Gấm dệt chìm hoa cúc chữ Vạn tinh xảo, hiện lên quý phái khi có ánh sáng rọi vào.',
        symbolism: 'Nét quý phái, đài các ngầm của phụ nữ gia giáo.'
      },
      {
        id: 'pat-v-nhu-bong',
        name: 'Vải Nhũ Bóng Kim Sa Lộng Lẫy',
        description: 'Sợi dệt kim sa bắt sáng lóng lánh kiêu sa dưới ánh đèn trình diễn thời trang.',
        symbolism: 'Sức sống rực rỡ, tươi trẻ và kiêu sa.'
      },
      {
        id: 'pat-dui-tho-moc',
        name: 'Vải Đũi Tơ Tằm Thô Mộc',
        description: 'Thớ sợi đũi dệt gân tự nhiên mộc mạc, thấm hút mồ hôi tối ưu trên nền vải trắng.',
        symbolism: 'Tâm hồn chân chất, hào sảng, chịu thương chịu khó.'
      },
      {
        id: 'pat-sa-xuyen-thau',
        name: 'Sa Tơ Xuyên Thấu Mềm Mại',
        description: 'Vải sa tơ mỏng rủ thướt tha, bay bổng theo từng bước đi.',
        symbolism: 'Nét duyên thầm dịu ngọt miền sông nước.'
      }
    ],
    recommendedBottoms: [
      {
        id: 'bot-quan-ong-xeo-lua-trang-nga',
        name: 'Quần Lụa Trắng Ngà Ống Xéo Cổ Phục',
        category: 'quan-suong',
        description: 'Ống rộng xòe nhẹ tự nhiên ở gấu, lụa tự nhiên màu trắng ngà rủ mềm mại, cạp phẳng phiu, dài chạm đất.',
        appropriateFor: 'Phối thanh lịch cùng áo bà ba'
      },

      {
        id: 'bot-vay-xep-ly-dai',
        name: 'Chân Váy Xếp Ly Dài Phom Chữ A Chạm Đất',
        category: 'chan-vay',
        description: 'Phong cách cổ điển tối giản hoàn toàn trơn màu trắng kem/trắng ngà mờ lì trang nhã. Chất vải dày dặn giữ phom phồng chữ A tự nhiên không rũ gãy. Cạp cao bản vừa phẳng phiu đứng dáng, dưới cạp là các nếp xếp ly bản lớn đối xứng mở rộng dần về phía gấu, chạy thẳng tắp kéo dài tỷ lệ cơ thể. Chân váy dài chạm đất, viền gấp mí phẳng chỉn chu, gấu lượn sóng mềm mại theo bước đi.',
        appropriateFor: 'Phối thanh tao quý phái cùng Áo Bà Ba truyền thống'
      },
      {
        id: 'bot-vay-lua-bong-cat-xeo',
        name: 'Chân Váy Lụa Satin Cắt Xéo Bay Bổng',
        category: 'chan-vay',
        description: 'Phong cách tối giản thanh lịch trơn màu hoàn toàn, sắc trắng ngà trang nhã cùng độ bóng mờ sang trọng của lụa satin mượt mà. Cạp phẳng phiu ôm gọn eo kết hợp kỹ thuật cắt xéo vải (bias cut) ôm nhẹ phần hông rồi buông rủ thành những dải sóng mềm mại dọc thân, xòe nhẹ duyên dáng về phía gấu lượn sóng uyển chuyển.',
        appropriateFor: 'Phối thanh lịch cùng Áo Bà Ba dạo phố'
      },
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
