import React, { useState } from 'react';
import { CostumeOutfitState, CostumeRootId } from './types/costume';
import { COSTUME_ROOTS, FESTIVAL_EVENTS, WEATHER_CONDITIONS } from './data/costumeData';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { AvatarMannequin } from './components/AvatarMannequin';
import { Step1CostumeSelection } from './components/Step1CostumeSelection';
import { Step2TopCustomization } from './components/Step2TopCustomization';
import { Step3BottomCustomization } from './components/Step3BottomCustomization';
import { Step4AccessoriesAlbum } from './components/Step4AccessoriesAlbum';
import { Step5LookbookReview } from './components/Step5LookbookReview';
import { CulturalEtiquetteModal } from './components/CulturalEtiquetteModal';
import { WeatherEventRecommender } from './components/WeatherEventRecommender';
import { ColorHarmonyAnalyzer } from './components/ColorHarmonyAnalyzer';
import { CompareOutfitsModal } from './components/CompareOutfitsModal';
import { CulturalKnowledgeDrawer } from './components/CulturalKnowledgeDrawer';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { SavedOutfitsArchiveModal } from './components/SavedOutfitsArchiveModal';
import { LandingIntroPage } from './components/LandingIntroPage';
import { Atelier3DGarmentShowroomModal, Nguthantype } from './components/Atelier3DGarmentShowroomModal';
import { evaluateCulturalEtiquette, evaluateColorHarmony } from './utils/costumeEvaluation';
import { ShieldCheck, Palette, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  // Page View Mode: 'intro' (Trang Giới Thiệu & Trưng Bày) or 'atelier' (Phòng Phối Đồ)
  const [pageView, setPageView] = useState<'intro' | 'atelier'>('intro');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Active Outfit State
  const [outfit, setOutfit] = useState<CostumeOutfitState>({
    rootId: 'tu-than',
    top: {
      silhouetteId: 'tu-than-truyen-thong',
      necklineId: 'neck-co-xay-yem',
      buttonId: 'btn-buoc-vat-lua',
      patternId: 'pat-sen-theu-chim',
      primaryColor: '#7DD3FC',
      innerYemColor: '#FFF1F2',
      sashColor: '#0D9488',
    },
    bottom: {
      bottomId: 'bot-quan-lua-ong-rong-hong',
      color: '#FBCFE8',
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
      height: 160,
      weight: 52,
    },
    outfitName: 'Tứ Thân Kinh Bắc Phối Xanh Nhẹ & Lụa Hồng',
    designerNote: 'Áo tứ thân phối xanh nhẹ, quần lụa ống rộng hồng nhạt cách tân, dép cói quai lụa và nón quai thao.',
    selectedEventId: 'event-hoi-lim',
    selectedWeatherId: 'weather-spring-breeze',
  });

  // Alternative Outfit for A/B Comparison
  const [optionBOutfit, setOptionBOutfit] = useState<CostumeOutfitState>({
    rootId: 'ngu-than',
    top: {
      silhouetteId: 'ngu-than-tay-thung-trang-trong',
      necklineId: 'neck-lap-linh-chuan',
      buttonId: 'btn-5-khuy-bac-cham',
      patternId: 'pat-may-song-thuy-ba',
      primaryColor: '#B91C1C',
      innerYemColor: '#FFFFFF',
      sashColor: '#B91C1C',
    },
    bottom: {
      bottomId: 'bot-quan-lua-trang-ngoc',
      color: '#FFFFFF',
    },
    accessories: {
      shoesId: 'shoes-guoc-moc-nhung',
      jewelryIds: ['jewel-khuyen-tai-nu-sen-ngoc', 'jewel-nhan-bac-men-lam'],
      hairAccessoryId: 'hair-non-la-bai-tho',
    },
    avatar: {
      hairstyle: 'half-up-princess',
      skinTone: 'fair',
      faceShape: 'oval',
      height: 160,
      weight: 52,
    },
    outfitName: 'Ngũ Thân Tay Thụng Đỏ Chu Sa Cố Đô',
    designerNote: 'Áo ngũ thân tay thụng đỏ chu sa thêu mây nước cung đình chỉ vàng, quần lụa trắng, guốc mộc nhung đỏ và nón bài thơ.',
    selectedEventId: 'event-festival-hue',
    selectedWeatherId: 'weather-spring-breeze',
  });

  // Modals state
  const [isEtiquetteOpen, setIsEtiquetteOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAtelier3DOpen, setIsAtelier3DOpen] = useState(false);
  const [initialAtelierType, setInitialAtelierType] = useState<Nguthantype>('tay-chen');
  const [showWeatherDrawer, setShowWeatherDrawer] = useState(false);
  const [showHarmonyDrawer, setShowHarmonyDrawer] = useState(false);

  // When changing root costume, safely update default top and bottom
  const handleSelectRoot = (rootId: CostumeRootId) => {
    const rootData = COSTUME_ROOTS[rootId];
    setOutfit((prev) => ({
      ...prev,
      rootId,
      top: {
        ...prev.top,
        silhouetteId: rootData.recommendedSilhouettes[0].id,
        necklineId: rootData.necklines[0].id,
        buttonId: rootData.buttonTypes[0].id,
        patternId: rootData.patterns[0].id,
        primaryColor: rootData.defaultPrimaryColor,
        sashColor: rootId === 'tu-than' ? '#0F766E' : prev.top.sashColor,
      },
      bottom: {
        ...prev.bottom,
        bottomId: rootData.recommendedBottoms[0].id,
        color: rootData.defaultBottomColor,
      },
      accessories: {
        ...prev.accessories,
        hairAccessoryId: rootId === 'tu-than' ? 'hair-non-quai-thao' : rootId === 'ngu-than' ? 'hair-man-khuon-nhung' : 'hair-khan-ran-nam-bo',
      },
      outfitName: rootId === 'tu-than' ? 'Dáng Xưa Kinh Bắc' : rootId === 'ngu-than' ? 'Cố Đô Đoan Trang' : 'Duyên Dáng Nam Bộ',
    }));
  };

  const handleUpdateTop = (updated: Partial<CostumeOutfitState['top']>) => {
    setOutfit((prev) => ({
      ...prev,
      top: { ...prev.top, ...updated },
    }));
  };

  const handleUpdateBottom = (updated: Partial<CostumeOutfitState['bottom']>) => {
    setOutfit((prev) => ({
      ...prev,
      bottom: { ...prev.bottom, ...updated },
    }));
  };

  const handleUpdateAccessories = (updated: Partial<CostumeOutfitState['accessories']>) => {
    setOutfit((prev) => ({
      ...prev,
      accessories: { ...prev.accessories, ...updated },
    }));
  };

  const handleUpdateAvatar = (updated: Partial<CostumeOutfitState['avatar']>) => {
    setOutfit((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, ...updated },
    }));
  };

  // Helper to load preset or saved look and transition into Atelier room
  const handleLoadAndEnterStudio = (chosenOutfit: CostumeOutfitState) => {
    setOutfit(chosenOutfit);
    setPageView('atelier');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const etiquette = evaluateCulturalEtiquette(outfit);
  const harmony = evaluateColorHarmony(outfit);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#8B1E1E]/20 selection:text-[#7A1C1C]">
      {/* 1. Global Header with View Navigation */}
      <Header
        pageView={pageView}
        currentStep={currentStep}
        onGoToIntro={() => {
          setPageView('intro');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToStudio={() => {
          setPageView('atelier');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenKnowledge={() => setIsKnowledgeOpen(true)}
        onOpenEtiquette={() => setIsEtiquetteOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenAtelier3D={() => {
          const targetType = 
            outfit.rootId === 'tu-than' ? 'tu-than' :
            outfit.rootId === 'ba-ba' ? 'ba-ba' :
            outfit.top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? 'tay-thung' : 'tay-chen';
          setInitialAtelierType(targetType);
          setIsAtelier3DOpen(true);
        }}
        onGoToStep={(step) => {
          setPageView('atelier');
          setCurrentStep(step);
        }}
      />

      {/* 2. PAGE VIEW ROUTER */}
      {pageView === 'intro' ? (
        // ==============================================================
        // VIEW A: TRANG MỞ ĐẦU & CỬA HÀNG TRƯNG BÀY PHỐI SẴN
        // ==============================================================
        <main className="flex-1 w-full">
          <LandingIntroPage
            onGoToStudio={() => {
              setPageView('atelier');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenKnowledge={() => setIsKnowledgeOpen(true)}
            onOpenArchive={() => setIsArchiveOpen(true)}
            onSelectAndApplyOutfit={handleLoadAndEnterStudio}
          />
        </main>
      ) : (
        // ==============================================================
        // VIEW B: PHÒNG PHỐI ĐỒ CHÍNH (ATELIER STYLING STUDIO)
        // ==============================================================
        <>
          {/* Step Indicator */}
          <StepIndicator
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />

          {/* Main Studio Dual-Pane Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
            {currentStep === 5 ? (
              // STEP 5: FULL-WIDTH LOOKBOOK REVIEW
              <Step5LookbookReview
                outfit={outfit}
                onChangeOutfit={(updated) => setOutfit((prev) => ({ ...prev, ...updated }))}
                onGoToStep={(step) => setCurrentStep(step)}
                onOpenCompare={() => setIsCompareOpen(true)}
                onOpenEtiquette={() => setIsEtiquetteOpen(true)}
              />
            ) : (
              // STEPS 1 TO 4: DUAL-PANE ATELIER (Live Mannequin on left, Step controls on right)
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT COLUMN: LIVE AVATAR MANNEQUIN & COMPANION WIDGETS (5 COLS) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                  {/* The Live Interactive Mannequin */}
                  <div className="bg-white p-4 rounded-3xl border border-[#D8C7B0] shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E1E] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Phác Thảo Trực Tiếp
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsArchiveOpen(true)}
                        className="text-[11px] text-[#8C7A6B] hover:text-[#8B1E1E] font-medium transition-colors"
                      >
                        Lưu vào kho →
                      </button>
                    </div>

                    {/* Mannequin component */}
                    <AvatarMannequin
                      outfit={outfit}
                      heightClass="h-[460px]"
                      showDetailsOverlay={true}
                      onEditAvatar={() => setIsAvatarOpen(true)}
                      onQuickUpdateAvatar={handleUpdateAvatar}
                    />
                  </div>

                  {/* Quick Status Companion Bar: Cultural Etiquette & Color Harmony */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setIsEtiquetteOpen(true)}
                      className="p-3 bg-white hover:bg-emerald-50/50 rounded-2xl border border-emerald-200/80 shadow-2xs transition-all text-left flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase text-[#15803D] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Quy Chuẩn
                        </span>
                        <span className="text-xs font-bold text-[#15803D]">
                          {etiquette.score}/100
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2C241E] font-medium truncate">
                        {etiquette.title}
                      </p>
                      <span className="text-[10px] text-[#8C7A6B] group-hover:text-[#15803D] transition-colors mt-1">
                        Xem cảnh báo & nếp xưa →
                      </span>
                    </button>

                    <button
                      onClick={() => setShowHarmonyDrawer(!showHarmonyDrawer)}
                      className="p-3 bg-white hover:bg-amber-50/50 rounded-2xl border border-amber-200/80 shadow-2xs transition-all text-left flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1">
                          <Palette className="w-3.5 h-3.5" />
                          Màu Sắc
                        </span>
                        <span className="text-xs font-bold text-amber-800">
                          {harmony.score}/100
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2C241E] font-medium truncate">
                        {harmony.harmonyType}
                      </p>
                      <span className="text-[10px] text-[#8C7A6B] group-hover:text-amber-800 transition-colors mt-1">
                        Kiểm tra 60-30-10 →
                      </span>
                    </button>
                  </div>

                  {/* Weather & Event Bar Toggle */}
                  <button
                    onClick={() => setShowWeatherDrawer(!showWeatherDrawer)}
                    className="w-full p-3 bg-white hover:bg-[#FAF7F2] rounded-2xl border border-[#D8C7B0] shadow-2xs transition-all text-left flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2C241E]">
                          {FESTIVAL_EVENTS.find((e) => e.id === outfit.selectedEventId)?.name}
                        </div>
                        <div className="text-[10px] text-[#8C7A6B]">
                          {WEATHER_CONDITIONS.find((w) => w.id === outfit.selectedWeatherId)?.title}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#8B1E1E]">
                      {showWeatherDrawer ? 'Đóng' : 'Đổi sự kiện & thời tiết'}
                    </span>
                  </button>

                  {/* Collapsible Weather / Event Recommender */}
                  {showWeatherDrawer && (
                    <WeatherEventRecommender
                      selectedEventId={outfit.selectedEventId}
                      selectedWeatherId={outfit.selectedWeatherId}
                      onSelectEvent={(eventId, recRoot) => {
                        setOutfit((prev) => ({
                          ...prev,
                          selectedEventId: eventId,
                          ...(recRoot && recRoot !== outfit.rootId ? { rootId: recRoot } : {}),
                        }));
                      }}
                      onSelectWeather={(weatherId) => {
                        setOutfit((prev) => ({ ...prev, selectedWeatherId: weatherId }));
                      }}
                    />
                  )}

                  {/* Collapsible Color Harmony Analyzer */}
                  {showHarmonyDrawer && <ColorHarmonyAnalyzer outfit={outfit} />}
                </div>

                {/* RIGHT COLUMN: ACTIVE STEP WORKSPACE (7 COLS) */}
                <div className="lg:col-span-7 bg-white p-6 lg:p-8 rounded-3xl border border-[#D8C7B0] shadow-sm">
                  {currentStep === 1 && (
                    <Step1CostumeSelection
                      selectedRootId={outfit.rootId}
                      onSelectRoot={handleSelectRoot}
                      onNext={() => setCurrentStep(2)}
                    />
                  )}

                  {currentStep === 2 && (
                    <Step2TopCustomization
                      outfit={outfit}
                      onChangeTop={handleUpdateTop}
                      onPrev={() => setCurrentStep(1)}
                      onNext={() => setCurrentStep(3)}
                      onOpenAtelier3D={() => {
                        const targetType = 
                          outfit.rootId === 'tu-than' ? 'tu-than' :
                          outfit.rootId === 'ba-ba' ? 'ba-ba' :
                          outfit.top.silhouetteId === 'ngu-than-tay-thung-trang-trong' ? 'tay-thung' : 'tay-chen';
                        setInitialAtelierType(targetType);
                        setIsAtelier3DOpen(true);
                      }}
                    />
                  )}

                  {currentStep === 3 && (
                    <Step3BottomCustomization
                      outfit={outfit}
                      onChangeBottom={handleUpdateBottom}
                      onPrev={() => setCurrentStep(2)}
                      onNext={() => setCurrentStep(4)}
                      onOpenAtelier3D={(bottomType) => {
                        setInitialAtelierType(bottomType || 'quan-ong-xeo');
                        setIsAtelier3DOpen(true);
                      }}
                    />
                  )}

                  {currentStep === 4 && (
                    <Step4AccessoriesAlbum
                      outfit={outfit}
                      onUpdateAccessories={handleUpdateAccessories}
                      onPrev={() => setCurrentStep(3)}
                      onNext={() => setCurrentStep(5)}
                    />
                  )}
                </div>
              </div>
            )}
          </main>
        </>
      )}

      {/* Global Footer */}
      <footer className="mt-12 border-t border-[#E8DEC8] bg-[#F5EFE6] py-8 px-4 text-center text-xs text-[#8C7A6B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#2C241E]">Giao Thoa</span>
            <span>—</span>
            <span>Không gian phối Việt phục cách tân đoan trang cho học sinh, sinh viên</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                setPageView('intro');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Trang Giới Thiệu
            </button>
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Kho Lưu Trữ
            </button>
            <button
              onClick={() => setIsKnowledgeOpen(true)}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Nguồn Gốc & Ý Nghĩa
            </button>
            <button
              onClick={() => setIsEtiquetteOpen(true)}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Chuẩn Mực Đoan Trang
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              So Sánh Bộ Đồ
            </button>
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals */}
      <CulturalEtiquetteModal
        isOpen={isEtiquetteOpen}
        onClose={() => setIsEtiquetteOpen(false)}
        assessment={etiquette}
      />

      <CulturalKnowledgeDrawer
        isOpen={isKnowledgeOpen}
        onClose={() => setIsKnowledgeOpen(false)}
        onSelectRootFromDrawer={(newRootId) => {
          handleSelectRoot(newRootId);
          setPageView('atelier');
          setCurrentStep(2);
        }}
      />

      <SavedOutfitsArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        currentOutfit={outfit}
        onLoadOutfit={handleLoadAndEnterStudio}
      />

      <CompareOutfitsModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        outfitA={outfit}
        outfitB={optionBOutfit}
        onApplyOutfit={(chosen) => setOutfit(chosen)}
      />

      <AvatarCustomizerModal
        isOpen={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        avatar={outfit.avatar}
        onUpdateAvatar={handleUpdateAvatar}
      />

      {/* Phòng Trưng Bày 3D Chiếc Áo Riêng Biệt (Haute Couture 3D Atelier 360°) */}
      <Atelier3DGarmentShowroomModal
        isOpen={isAtelier3DOpen}
        onClose={() => setIsAtelier3DOpen(false)}
        initialType={initialAtelierType}
        onApplyToStudio={(chosenType, chosenPatternId) => {
          if (chosenType === 'vay-xep-ly-dai') {
            setOutfit(prev => ({
              ...prev,
              bottom: {
                ...prev.bottom,
                bottomId: 'bot-vay-xep-ly-dai',
                color: '#FAF7F2',
              },
            }));
            setPageView('atelier');
            setCurrentStep(3);
          } else if (chosenType === 'vay-lua-bong') {
            setOutfit(prev => ({
              ...prev,
              bottom: {
                ...prev.bottom,
                bottomId: 'bot-vay-lua-bong-cat-xeo',
                color: '#FAF7F2',
              },
            }));
            setPageView('atelier');
            setCurrentStep(3);
          } else if (chosenType === 'quan-ong-xeo') {
            setOutfit(prev => ({
              ...prev,
              bottom: {
                ...prev.bottom,
                bottomId: 'bot-quan-ong-xeo-lua-trang-nga',
                color: '#FAF7F2',
              },
            }));
            setPageView('atelier');
            setCurrentStep(3);
          } else if (chosenType === 'vay-dup-trang') {
            setOutfit(prev => ({
              ...prev,
              bottom: {
                ...prev.bottom,
                bottomId: 'bot-vay-dup-lua-trang-xoe-rong',
                color: '#FAF7F2',
              },
            }));
            setPageView('atelier');
            setCurrentStep(3);
          } else if (chosenType === 'ngu-than-cach-tan') {
            handleSelectRoot('ngu-than');
            setOutfit(prev => ({
              ...prev,
              rootId: 'ngu-than',
              top: {
                ...prev.top,
                silhouetteId: 'ngu-than-cach-tan-hoa-3d',
                buttonTypeId: 'btn-hoa-vai-3d-dinh-noi',
                necklineId: 'neck-lap-linh-chuan',
                primaryColor: '#D8B4E2',
                accentColor: '#0D9488',
                innerYemColor: '#FB7185',
                patternId: chosenPatternId,
              },
              bottom: {
                ...prev.bottom,
                bottomId: 'bot-quan-ong-xeo-lua-trang-nga',
                color: '#FAF7F2',
              },
              outfitName: 'Áo Ngũ Thân Cách Tân Hoa 3D & Ombre Khúc Xạ',
            }));
            setPageView('atelier');
            setCurrentStep(2);
          } else if (chosenType === 'tu-than') {
            handleSelectRoot('tu-than');
            setOutfit(prev => ({
              ...prev,
              rootId: 'tu-than',
              top: {
                ...prev.top,
                silhouetteId: 'tu-than-buoc-vat-truoc',
                primaryColor: '#FFFFFF',
                innerYemColor: '#FFFDF5',
                sashColor: '#0D9488',
                patternId: chosenPatternId,
              },
              bottom: {
                ...prev.bottom,
                color: '#18181B',
              },
              outfitName: 'Áo Tứ Thân Trắng Kinh Bắc Đoan Trang',
            }));
            setPageView('atelier');
            setCurrentStep(2);
          } else if (chosenType === 'ba-ba') {
            handleSelectRoot('ba-ba');
            setOutfit(prev => ({
              ...prev,
              rootId: 'ba-ba',
              top: {
                ...prev.top,
                silhouetteId: 'ba-ba-nu-chit-eo',
                necklineId: 'neck-co-tim-la-trau',
                primaryColor: '#FFFFFF',
                patternId: chosenPatternId,
              },
              bottom: {
                ...prev.bottom,
                color: '#18181B',
              },
              outfitName: 'Áo Bà Ba Trắng Duyên Dáng Nam Bộ',
            }));
            setPageView('atelier');
            setCurrentStep(2);
          } else {
            handleSelectRoot('ngu-than');
            setOutfit(prev => ({
              ...prev,
              rootId: 'ngu-than',
              top: {
                ...prev.top,
                silhouetteId: chosenType === 'tay-thung' ? 'ngu-than-tay-thung-trang-trong' : 'ngu-than-tay-chen',
                primaryColor: '#FFFFFF',
                patternId: chosenPatternId,
              },
              bottom: {
                ...prev.bottom,
                color: '#FFFFFF',
              },
              outfitName: chosenType === 'tay-thung' ? 'Áo Ngũ Thân Tay Thụng Trắng Đoan Trang' : 'Áo Ngũ Thân Tay Chẽn Trắng Thanh Lịch',
            }));
            setPageView('atelier');
            setCurrentStep(2);
          }
        }}
      />
    </div>
  );
}
