import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroArtworkBanner: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D8C7B0] bg-[#F7F2E7] select-none">
      {/* Aspect Ratio Container (approx 4:3 / 16:10 for wide poster feel) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[640px]">
        <svg
          viewBox="0 0 1000 750"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Parchment Gradient */}
            <radialGradient id="parchmentBg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#F9F4EA" />
              <stop offset="45%" stopColor="#F2E9D8" />
              <stop offset="85%" stopColor="#E5D6BF" />
              <stop offset="100%" stopColor="#D8C3A5" />
            </radialGradient>

            {/* Bronze Drum Gold Gradient */}
            <linearGradient id="bronzeDrumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C49B5A" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#A47A3A" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#875E26" stopOpacity="0.22" />
            </linearGradient>

            {/* Red Flag Silks */}
            <linearGradient id="flagRedGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A82828" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#C93232" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8A1C1C" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="flagRedGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B82C2C" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#D93838" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#961F1F" stopOpacity="0.95" />
            </linearGradient>

            {/* Center Royal Ngũ Thân Red Silk */}
            <linearGradient id="royalNguThanRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B2626" />
              <stop offset="40%" stopColor="#B32B2B" />
              <stop offset="80%" stopColor="#8C1F1F" />
              <stop offset="100%" stopColor="#6E1515" />
            </linearGradient>

            {/* Left Tứ Thân Robe Red */}
            <linearGradient id="tuThanRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BD3333" />
              <stop offset="50%" stopColor="#A42727" />
              <stop offset="100%" stopColor="#7E1A1A" />
            </linearGradient>

            {/* Right Bà Ba Warm Brown */}
            <linearGradient id="baBaBrown" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#946545" />
              <stop offset="50%" stopColor="#7C5235" />
              <stop offset="100%" stopColor="#5E3B22" />
            </linearGradient>

            {/* Lotus Blossom Gradients */}
            <linearGradient id="lotusPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
            <linearGradient id="lotusLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E8B7E" />
              <stop offset="100%" stopColor="#3B5B52" />
            </linearGradient>

            {/* Hair Color Gradients */}
            <linearGradient id="hairAnimeDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#302621" />
              <stop offset="60%" stopColor="#221A15" />
              <stop offset="100%" stopColor="#14100D" />
            </linearGradient>

            {/* Face Skin Tone */}
            <linearGradient id="skinToneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF7F3" />
              <stop offset="100%" stopColor="#FDEDE6" />
            </linearGradient>

            {/* Paper Texture Filter Pattern */}
            <filter id="parchmentNoise" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.8  0 0 0 0 0.7  0 0 0 0 0.6  0 0 0 0.05 0" />
              <feBlend mode="multiply" in="SourceGraphic" result="blend" />
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* 1. BACKGROUND & PARCHMENT TEXTURE */}
          {/* ========================================================= */}
          <rect width="1000" height="750" fill="url(#parchmentBg)" />

          {/* Clouds / Vintage parchment billows at top */}
          <g opacity="0.4" fill="#E8DBC6">
            <path d="M-50,80 Q30,50 120,70 Q210,90 280,60 Q340,30 420,50 Q480,70 540,40 Q620,20 720,60 Q800,80 900,50 Q960,30 1050,70 L1050,-20 L-50,-20 Z" />
            <path d="M-20,130 Q80,100 180,120 Q280,140 370,110 Q450,80 550,110 Q660,130 760,100 Q860,70 1020,110 L1020,-10 L-20,-10 Z" opacity="0.5" />
          </g>

          {/* ========================================================= */}
          {/* 2. DONG SON BRONZE DRUM (TRỐNG ĐỒNG ĐÔNG SƠN) RADIATING MOTIF */}
          {/* ========================================================= */}
          <g id="dong-son-drum" transform="translate(500, 310)" stroke="#B38947" strokeOpacity="0.38" fill="none">
            {/* Center Sun with 14 Rays */}
            <circle cx="0" cy="0" r="16" fill="#C49B5A" fillOpacity="0.28" stroke="#B38947" strokeWidth="1.5" />
            {[...Array(14)].map((_, i) => {
              const angle = (i * 360) / 14;
              return (
                <line
                  key={`ray-${i}`}
                  x1="0"
                  y1="0"
                  x2={Math.cos((angle * Math.PI) / 180) * 48}
                  y2={Math.sin((angle * Math.PI) / 180) * 48}
                  stroke="#A47A3A"
                  strokeWidth="2.5"
                  strokeOpacity="0.45"
                />
              );
            })}

            {/* Concentric Decorative Rings */}
            <circle cx="0" cy="0" r="50" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="62" strokeWidth="2.4" strokeDasharray="3,3" />
            <circle cx="0" cy="0" r="95" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="118" strokeWidth="1.8" strokeDasharray="5,4" />
            <circle cx="0" cy="0" r="150" strokeWidth="2" />
            <circle cx="0" cy="0" r="185" strokeWidth="1.5" strokeDasharray="7,4" />
            <circle cx="0" cy="0" r="230" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="275" strokeWidth="1.8" strokeDasharray="8,6" />
            <circle cx="0" cy="0" r="325" strokeWidth="2" />
            <circle cx="0" cy="0" r="375" strokeWidth="1.2" strokeDasharray="10,6" />

            {/* Traditional Bird Motifs (Chim Lạc bay ngược chiều kim đồng hồ) */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={`bird-${deg}`} transform={`rotate(${deg}) translate(168, 0)`}>
                <path
                  d="M0,-3 Q15,-10 32,-4 Q18,2 8,8 Q0,6 -8,12 Q-4,2 0,-3 Z"
                  fill="#B38947"
                  fillOpacity="0.28"
                  stroke="#946C30"
                  strokeWidth="0.8"
                />
              </g>
            ))}
          </g>

          {/* ========================================================= */}
          {/* 3. RED VIETNAMESE FLAG SILK CURTAINS & GOLDEN STAR */}
          {/* ========================================================= */}
          {/* Left Ribbon / Flag Wave */}
          <path
            d="M-40,240 Q60,330 110,480 Q145,580 180,760 L-40,760 Z"
            fill="url(#flagRedGradLeft)"
          />
          <path
            d="M-20,280 Q70,360 120,490 Q150,580 170,760 L-20,760 Z"
            fill="#7C1818"
            opacity="0.3"
          />

          {/* Right Ribbon / Flag Wave with Golden Star */}
          <path
            d="M1040,270 Q940,360 880,510 Q830,620 810,760 L1040,760 Z"
            fill="url(#flagRedGradRight)"
          />
          <path
            d="M1020,310 Q930,390 870,530 Q830,630 815,760 L1020,760 Z"
            fill="#6E1515"
            opacity="0.3"
          />

          {/* Golden 5-pointed Star on Right Flag Wave */}
          <g transform="translate(935, 690) rotate(12)">
            <polygon
              points="0,-45 13,-13 47,-13 19,8 29,40 0,20 -29,40 -19,8 -47,-13 -13,-13"
              fill="#FACC15"
              stroke="#EAB308"
              strokeWidth="2"
            />
            <polygon
              points="0,-45 13,-13 47,-13 19,8 29,40 0,20 -29,40 -19,8 -47,-13 -13,-13"
              fill="#FDE047"
              fillOpacity="0.6"
            />
          </g>

          {/* ========================================================= */}
          {/* 4. POSTER TITLE AT TOP WITH ORNAMENTS */}
          {/* ========================================================= */}
          <g id="poster-title-group" transform="translate(500, 105)">
            {/* Top Ornamental Line with Diamond Star */}
            <line x1="-380" y1="0" x2="-35" y2="0" stroke="#9B2C2C" strokeWidth="2.5" />
            <polygon points="0,-7 7,0 0,7 -7,0" fill="#9B2C2C" />
            <circle cx="0" cy="0" r="2.5" fill="#FAF7F2" />
            <line x1="35" y1="0" x2="380" y2="0" stroke="#9B2C2C" strokeWidth="2.5" />

            {/* Main Title Row 1: GIAO THOA: */}
            <text
              x="0"
              y="44"
              textAnchor="middle"
              className="font-serif font-black tracking-[0.14em]"
              fill="#851D1D"
              fontSize="48"
              fontWeight="900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              GIAO THOA:
            </text>

            {/* Main Title Row 2: XƯỞNG VIỆT PHỤC GENZ */}
            <text
              x="0"
              y="98"
              textAnchor="middle"
              className="font-serif font-black tracking-[0.12em]"
              fill="#851D1D"
              fontSize="52"
              fontWeight="900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              XƯỞNG VIỆT PHỤC GENZ
            </text>
          </g>

          {/* ========================================================= */}
          {/* 5. THREE CHARACTERS IN 2D ANIME / MANHWA AESTHETIC */}
          {/* ========================================================= */}

          {/* --------------------------------------------------------- */}
          {/* 5A. CENTER GIRL: ÁO NGŨ THÂN QUÝ PHÁI (RED ROYAL ROBE)    */}
          {/* --------------------------------------------------------- */}
          <g id="character-center" transform="translate(500, 215)">
            {/* Khăn Vấn / Mấn Tròn Nhung Đen Đài Các */}
            <g id="center-khan-van">
              <ellipse cx="0" cy="20" rx="64" ry="72" fill="#1F1A17" stroke="#120E0C" strokeWidth="2" />
              <ellipse cx="0" cy="22" rx="55" ry="62" fill="#2E2520" />
              {/* Inner fold of Khan Van */}
              <ellipse cx="0" cy="26" rx="46" ry="50" fill="#14100D" />
            </g>

            {/* Back Hair */}
            <path d="M-36,50 Q-48,110 -35,160 L35,160 Q48,110 36,50 Z" fill="url(#hairAnimeDark)" />

            {/* Center Girl Head & Face (Thanh tú trái xoan) */}
            <g id="center-face">
              {/* Neck */}
              <path d="M-15,65 L15,65 L17,110 L-17,110 Z" fill="url(#skinToneGrad)" />
              {/* Face contour */}
              <path
                d="M0,0 C32,0 44,22 44,52 C44,78 24,96 0,98 C-24,96 -44,78 -44,52 C-44,22 -32,0 0,0 Z"
                fill="url(#skinToneGrad)"
                stroke="#E4BBA5"
                strokeWidth="1.2"
              />
              {/* Cheek Blush */}
              <circle cx="-25" cy="58" r="10" fill="#FDA4AF" fillOpacity="0.45" />
              <circle cx="25" cy="58" r="10" fill="#FDA4AF" fillOpacity="0.45" />

              {/* Eyebrows */}
              <path d="M-28,32 Q-17,27 -7,33" stroke="#2E241E" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M7,33 Q17,27 28,32" stroke="#2E241E" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Anime Sparkling Eyes */}
              <g id="center-left-eye">
                <ellipse cx="-18" cy="42" rx="6.5" ry="7.5" fill="#1F1A29" />
                <ellipse cx="-18" cy="42" rx="3.5" ry="4" fill="#0C0A10" />
                <circle cx="-20" cy="38" r="2.4" fill="#FFFFFF" />
                <circle cx="-15" cy="44" r="1.2" fill="#FFFFFF" />
                <path d="M-28,39 Q-18,32 -8,38" stroke="#14100D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <path d="M-24,48 Q-18,51 -12,48" stroke="#D97706" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
              </g>

              <g id="center-right-eye">
                <ellipse cx="18" cy="42" rx="6.5" ry="7.5" fill="#1F1A29" />
                <ellipse cx="18" cy="42" rx="3.5" ry="4" fill="#0C0A10" />
                <circle cx="16" cy="38" r="2.4" fill="#FFFFFF" />
                <circle cx="21" cy="44" r="1.2" fill="#FFFFFF" />
                <path d="M8,38 Q18,32 28,39" stroke="#14100D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <path d="M12,48 Q18,51 24,48" stroke="#D97706" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
              </g>

              {/* Dainty Nose */}
              <path d="M-1,49 L0,55 Q1.5,57 3,55" stroke="#E0835D" strokeWidth="1.2" fill="none" />

              {/* Gentle Smile / Cherry Lips */}
              <path d="M-9,70 Q0,76 9,70" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M-6,71 Q0,74 6,71" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="-1" cy="72" r="0.8" fill="#FFFFFF" />

              {/* Front Bangs & Side Tendrils */}
              <path d="M-38,20 Q-20,38 -14,18 Q-5,35 6,18 Q18,38 38,20 Q44,48 40,70 Q34,42 22,26 Q0,26 -22,26 Q-34,42 -40,70 Q-44,48 -38,20 Z" fill="url(#hairAnimeDark)" />
              {/* Delicate side wisps */}
              <path d="M-38,62 Q-44,88 -42,112" stroke="#221A15" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M38,62 Q44,88 42,112" stroke="#221A15" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Regal Red Áo Ngũ Thân Body */}
            <g id="center-ngu-than-robe" transform="translate(0, 105)">
              {/* Stand Collar (Cổ đứng lập lĩnh chuẩn mực triều Nguyễn) */}
              <path
                d="M-22,0 L22,0 L24,18 L-24,18 Z"
                fill="#8A1C1C"
                stroke="#6B1313"
                strokeWidth="1.5"
              />
              <line x1="-22" y1="9" x2="22" y2="9" stroke="#EAB308" strokeWidth="0.9" />

              {/* Sleeves Flowing Wide (Tay Thụng Cung Đình) */}
              {/* Left Sleeve */}
              <path
                d="M-45,15 Q-115,70 -130,220 Q-120,340 -90,380 L-50,380 Q-55,240 -35,160 Z"
                fill="url(#royalNguThanRed)"
                stroke="#691414"
                strokeWidth="1.5"
              />
              {/* Right Sleeve */}
              <path
                d="M45,15 Q115,70 130,220 Q120,340 90,380 L50,380 Q55,240 35,160 Z"
                fill="url(#royalNguThanRed)"
                stroke="#691414"
                strokeWidth="1.5"
              />

              {/* Main Robe Torso and Flowing Gown to Bottom */}
              <path
                d="M-45,15 Q-65,95 -75,220 L-95,430 L95,430 L75,220 Q65,95 45,15 Z"
                fill="url(#royalNguThanRed)"
                stroke="#691414"
                strokeWidth="2"
              />

              {/* Side Button Line (Vạt Hò Áo Ngũ Thân với 5 khuy) */}
              <path
                d="M4,15 Q28,24 38,45 Q44,70 38,105 Q30,150 20,230 L0,430"
                stroke="#691414"
                strokeWidth="2.2"
                fill="none"
              />
              {/* 5 Traditional Gold Buttons */}
              {[
                { x: 12, y: 22 },
                { x: 34, y: 38 },
                { x: 40, y: 65 },
                { x: 36, y: 95 },
                { x: 28, y: 135 },
              ].map((btn, idx) => (
                <g key={`ngu-btn-${idx}`} transform={`translate(${btn.x}, ${btn.y})`}>
                  <circle cx="0" cy="0" r="3.6" fill="#FACC15" stroke="#854D0E" strokeWidth="1" />
                  <circle cx="-0.8" cy="-0.8" r="1.2" fill="#FEF08A" />
                </g>
              ))}

              {/* Center Girl Hands Holding Traditional Folding Fan (Quạt Xếp Gỗ & Tua Rua Đỏ) */}
              <g id="center-fan-and-hands" transform="translate(0, 165)">
                {/* Elegant Hands clasped */}
                <ellipse cx="-14" cy="18" rx="14" ry="10" fill="url(#skinToneGrad)" stroke="#E4BBA5" strokeWidth="1" />
                <ellipse cx="14" cy="18" rx="14" ry="10" fill="url(#skinToneGrad)" stroke="#E4BBA5" strokeWidth="1" />

                {/* Wooden Folding Fan Ribs */}
                <g transform="rotate(-32)">
                  <rect x="-10" y="-35" width="20" height="75" rx="3" fill="#F5EFE6" stroke="#C4A482" strokeWidth="1.2" />
                  <line x1="-5" y1="-30" x2="-5" y2="35" stroke="#D4AF37" strokeWidth="0.8" />
                  <line x1="0" y1="-30" x2="0" y2="35" stroke="#C4A482" strokeWidth="1" />
                  <line x1="5" y1="-30" x2="5" y2="35" stroke="#D4AF37" strokeWidth="0.8" />
                  {/* Fan Pivot & Red Tassel */}
                  <circle cx="0" cy="36" r="3" fill="#B91C1C" />
                  {/* Flowing Red Silk Tassel */}
                  <path d="M0,39 Q-2,58 -3,80 L3,80 Q2,58 0,39 Z" fill="#DC2626" />
                  <rect x="-4" y="52" width="8" height="4" rx="1" fill="#F59E0B" />
                </g>
              </g>
            </g>
          </g>

          {/* --------------------------------------------------------- */}
          {/* 5B. LEFT GIRL: ÁO TỨ THÂN KINH BẮC CÙNG NÓN QUAI THAO     */}
          {/* --------------------------------------------------------- */}
          <g id="character-left" transform="translate(295, 275)">
            {/* Hair Bun & White Flower Accent */}
            <g id="left-hair-back">
              <ellipse cx="-52" cy="12" rx="20" ry="18" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="1.5" />
              {/* White Blossom in hair */}
              <circle cx="-56" cy="6" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              <circle cx="-56" cy="6" r="2.2" fill="#FBBF24" />
            </g>

            {/* Left Girl Head & Face */}
            <g id="left-face">
              <path d="M-10,40 L16,40 L17,80 L-12,80 Z" fill="url(#skinToneGrad)" />
              <path
                d="M0,0 C28,0 38,18 38,44 C38,68 20,84 0,86 C-20,84 -38,68 -38,44 C-38,18 -28,0 0,0 Z"
                fill="url(#skinToneGrad)"
                stroke="#E4BBA5"
                strokeWidth="1.2"
              />
              <circle cx="-20" cy="50" r="9" fill="#FDA4AF" fillOpacity="0.45" />
              <circle cx="20" cy="50" r="9" fill="#FDA4AF" fillOpacity="0.45" />

              {/* Eyebrows */}
              <path d="M-24,26 Q-14,21 -6,27" stroke="#2E241E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M6,27 Q14,21 24,26" stroke="#2E241E" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Eyes looking cheerfully slightly towards right */}
              <g id="left-girl-eye-left">
                <ellipse cx="-15" cy="36" rx="5.5" ry="6.5" fill="#1F1A29" />
                <circle cx="-16.5" cy="33" r="2" fill="#FFFFFF" />
                <circle cx="-13" cy="38" r="1" fill="#FFFFFF" />
                <path d="M-23,34 Q-15,28 -7,33" stroke="#14100D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>
              <g id="left-girl-eye-right">
                <ellipse cx="15" cy="36" rx="5.5" ry="6.5" fill="#1F1A29" />
                <circle cx="13.5" cy="33" r="2" fill="#FFFFFF" />
                <circle cx="17" cy="38" r="1" fill="#FFFFFF" />
                <path d="M7,33 Q15,28 23,34" stroke="#14100D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>

              {/* Sweet smile with open cheerful expression */}
              <path d="M-8,58 Q0,68 10,59" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M-4,60 Q0,66 6,60" fill="#FDA4AF" />

              {/* Hair strands & bangs */}
              <path d="M-36,15 Q-15,30 -8,12 Q5,32 30,14 Q36,45 32,60 Q26,30 14,18 Q-5,22 -20,20 Q-32,38 -36,58 Z" fill="url(#hairAnimeDark)" />
            </g>

            {/* Áo Tứ Thân Attire */}
            <g id="left-tu-than-attire" transform="translate(0, 78)">
              {/* Inner Cream Yếm Đào (Cổ xây yếm đào) */}
              <path
                d="M-15,6 Q0,14 15,6 L22,70 L-22,70 Z"
                fill="#FFFDF7"
                stroke="#E2D9C8"
                strokeWidth="1"
              />
              <line x1="-15" y1="6" x2="15" y2="6" stroke="#D4AF37" strokeWidth="1" />

              {/* Red Outer Robe (Áo Tứ Thân vạt mở khoác ngoài) */}
              {/* Left flowing sleeve */}
              <path
                d="M-36,10 Q-90,65 -95,190 Q-80,260 -50,280 L-25,260 Q-50,170 -26,110 Z"
                fill="url(#tuThanRed)"
                stroke="#6B1313"
                strokeWidth="1.5"
              />
              {/* Right sleeve extending towards center girl */}
              <path
                d="M36,10 Q80,60 95,140 Q85,210 60,250 L35,230 Q50,150 26,100 Z"
                fill="url(#tuThanRed)"
                stroke="#6B1313"
                strokeWidth="1.5"
              />

              {/* Torso Robe Side Flaps */}
              <path
                d="M-36,10 L-20,70 L-35,370 L-65,370 Q-55,200 -36,10 Z"
                fill="url(#tuThanRed)"
                stroke="#6B1313"
                strokeWidth="1.5"
              />
              <path
                d="M36,10 L20,70 L40,370 L65,370 Q55,200 36,10 Z"
                fill="url(#tuThanRed)"
                stroke="#6B1313"
                strokeWidth="1.5"
              />

              {/* Green Silk Sash (Dải Bao Xanh Thủy Lục Thắt Eo) */}
              <g id="green-sash">
                <rect x="-24" y="66" width="48" height="22" rx="4" fill="#0F766E" stroke="#042F2C" strokeWidth="1.2" />
                {/* Hanging ribbon tails */}
                <path d="M-12,88 Q-16,140 -20,240 L-4,240 Q-2,140 -2,88 Z" fill="#0D9488" stroke="#042F2C" strokeWidth="1" />
                <path d="M-2,88 Q4,130 6,220 L18,220 Q12,130 8,88 Z" fill="#115E59" stroke="#042F2C" strokeWidth="1" />
              </g>

              {/* Dark Traditional Skirt (Váy Lụa Đen Phủ Gót) */}
              <path
                d="M-28,88 L28,88 L45,370 L-45,370 Z"
                fill="#1E1B18"
                stroke="#120E0C"
                strokeWidth="1.5"
              />

              {/* Holding Large Nón Quai Thao (Nón Ba Tầm Tròn Đầy Đặn) */}
              <g id="holding-non-quai-thao" transform="translate(-70, 190) rotate(16)">
                {/* Circular Straw Hat with fine radiating weave */}
                <ellipse cx="0" cy="0" rx="66" ry="66" fill="#E8D5B5" stroke="#C4A882" strokeWidth="2.5" />
                {/* Concentric rings */}
                <circle cx="0" cy="0" r="54" stroke="#B89B72" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                <circle cx="0" cy="0" r="40" stroke="#C4A882" strokeWidth="1.2" fill="none" />
                <circle cx="0" cy="0" r="24" stroke="#B89B72" strokeWidth="0.8" fill="none" />
                <circle cx="0" cy="0" r="8" fill="#A88B62" />
                {/* Red Silk Ribbon Tassel Hanging Down (Dải Thao Hồng/Đỏ) */}
                <path d="M0,66 Q-2,100 -4,150 L4,150 Q2,100 0,66 Z" fill="#E11D48" />
                <circle cx="0" cy="74" r="5" fill="#BE123C" />

                {/* Left hand delicately grasping edge of hat */}
                <g transform="translate(48, -10)">
                  <ellipse cx="0" cy="0" rx="10" ry="7" fill="url(#skinToneGrad)" stroke="#E4BBA5" strokeWidth="1" />
                </g>
              </g>
            </g>
          </g>

          {/* --------------------------------------------------------- */}
          {/* 5C. RIGHT GIRL: ÁO BÀ BA NAM BỘ & KHĂN RẰN, NÓN LÁ       */}
          {/* --------------------------------------------------------- */}
          <g id="character-right" transform="translate(710, 290)">
            {/* Long Side Braid Cascading to the Front Shoulder */}
            <g id="right-braid">
              {/* White flower in hair */}
              <circle cx="34" cy="20" r="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              <circle cx="34" cy="20" r="2.4" fill="#FBBF24" />

              {/* Braid links curving over right shoulder down chest */}
              <g transform="translate(-20, 75)">
                <ellipse cx="0" cy="10" rx="8" ry="11" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                <ellipse cx="-2" cy="28" rx="8" ry="11" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                <ellipse cx="1" cy="46" rx="7.5" ry="10" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                <ellipse cx="-1" cy="64" rx="7" ry="9.5" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                <ellipse cx="0" cy="82" rx="6.5" ry="9" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                <ellipse cx="-1" cy="99" rx="6" ry="8" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                <ellipse cx="0" cy="115" rx="5" ry="7.5" fill="url(#hairAnimeDark)" stroke="#120E0C" strokeWidth="0.8" />
                {/* Hair tie and tail */}
                <rect x="-4" y="122" width="8" height="4" rx="1" fill="#DC2626" />
                <path d="M-3,126 Q0,142 2,152 Q-2,142 -3,126 Z" fill="#221A15" />
              </g>
            </g>

            {/* Right Girl Head & Face */}
            <g id="right-face">
              <path d="M-12,40 L14,40 L15,75 L-14,75 Z" fill="url(#skinToneGrad)" />
              <path
                d="M0,0 C28,0 38,18 38,44 C38,68 20,84 0,86 C-20,84 -38,68 -38,44 C-38,18 -28,0 0,0 Z"
                fill="url(#skinToneGrad)"
                stroke="#E4BBA5"
                strokeWidth="1.2"
              />
              <circle cx="-20" cy="50" r="9" fill="#FDA4AF" fillOpacity="0.45" />
              <circle cx="20" cy="50" r="9" fill="#FDA4AF" fillOpacity="0.45" />

              {/* Eyebrows */}
              <path d="M-24,26 Q-14,21 -6,27" stroke="#2E241E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M6,27 Q14,21 24,26" stroke="#2E241E" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Anime Eyes looking affectionately to left */}
              <g id="right-girl-eye-left">
                <ellipse cx="-15" cy="36" rx="5.5" ry="6.5" fill="#1F1A29" />
                <circle cx="-17" cy="33" r="2" fill="#FFFFFF" />
                <circle cx="-13" cy="38" r="1" fill="#FFFFFF" />
                <path d="M-23,34 Q-15,28 -7,33" stroke="#14100D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>
              <g id="right-girl-eye-right">
                <ellipse cx="15" cy="36" rx="5.5" ry="6.5" fill="#1F1A29" />
                <circle cx="13" cy="33" r="2" fill="#FFFFFF" />
                <circle cx="17" cy="38" r="1" fill="#FFFFFF" />
                <path d="M7,33 Q15,28 23,34" stroke="#14100D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>

              {/* Gentle smile */}
              <path d="M-8,58 Q0,66 9,58" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* Hair strands */}
              <path d="M-36,15 Q-15,30 -6,14 Q8,30 32,15 Q36,45 32,60 Q26,30 14,18 Q-5,22 -20,20 Q-32,38 -36,58 Z" fill="url(#hairAnimeDark)" />
            </g>

            {/* Áo Bà Ba Attire (Rustic Brown with Center Buttons) */}
            <g id="right-ba-ba-attire" transform="translate(0, 75)">
              {/* Modest Round Neckline (Cổ tròn đằm thắm) */}
              <path
                d="M-18,6 Q0,16 18,6 L26,55 Q16,80 24,150 Q-10,160 -24,150 Q-16,80 -26,55 Z"
                fill="url(#baBaBrown)"
                stroke="#4A2E1B"
                strokeWidth="1.5"
              />

              {/* Center Button Row */}
              <line x1="0" y1="12" x2="0" y2="150" stroke="#4A2E1B" strokeWidth="1.8" />
              {[22, 44, 66, 88, 110, 132].map((yVal, i) => (
                <circle key={`baba-btn-${i}`} cx="0" cy={yVal} r="2.8" fill="#FDE68A" stroke="#4A2E1B" strokeWidth="0.8" />
              ))}

              {/* Checkered Khăn Rằn (Gingham scarf draped over neck/shoulder) */}
              <g id="khan-ran">
                <path
                  d="M-18,6 Q-28,30 -26,80 L-10,80 Q-10,35 -6,10 Z"
                  fill="#F8FAFC"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <path
                  d="M10,8 Q24,35 26,90 L42,90 Q40,30 18,6 Z"
                  fill="#F8FAFC"
                  stroke="#334155"
                  strokeWidth="1"
                />
                {/* Black Checkered Stripes */}
                {[-24, -20, -16, -12].map((xP, i) => (
                  <line key={`kr-l-${i}`} x1={xP} y1="20" x2={xP + 10} y2="80" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3,3" />
                ))}
                {[14, 18, 22, 28].map((xP, i) => (
                  <line key={`kr-r-${i}`} x1={xP} y1="20" x2={xP + 8} y2="90" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3,3" />
                ))}
              </g>

              {/* Bà Ba Sleeves */}
              <path
                d="M-30,10 Q-65,45 -85,120 Q-75,180 -55,230 L-35,210 Q-50,140 -26,70 Z"
                fill="url(#baBaBrown)"
                stroke="#4A2E1B"
                strokeWidth="1.5"
              />
              <path
                d="M30,10 Q65,45 80,120 Q70,180 50,230 L30,210 Q45,140 24,70 Z"
                fill="url(#baBaBrown)"
                stroke="#4A2E1B"
                strokeWidth="1.5"
              />

              {/* Black Pants (Quần Lụa Đen Ống Suông Nam Bộ) */}
              <path
                d="M-26,148 L26,148 L35,370 L-35,370 Z"
                fill="#18181B"
                stroke="#09090B"
                strokeWidth="1.5"
              />

              {/* Right Hand Holding Conical Nón Lá (Nón Lá Bài Thơ Xứ Huế) */}
              <g id="holding-non-la" transform="translate(68, 160) rotate(-15)">
                {/* Conical Shape */}
                <polygon
                  points="0,-45 48,55 -48,55"
                  fill="#F7EEDD"
                  stroke="#D4C3A3"
                  strokeWidth="2"
                />
                {/* Concentric Bamboo Rings */}
                {[-25, -10, 5, 20, 35, 48].map((yL, i) => (
                  <line key={`leaf-ring-${i}`} x1={-yL * 0.8 - 5} y1={yL} x2={yL * 0.8 + 5} y2={yL} stroke="#CBB48C" strokeWidth="0.8" />
                ))}
                {/* Pink Silk Chinstrap */}
                <path d="M-20,55 Q0,75 20,55" stroke="#F472B6" strokeWidth="2.5" fill="none" />

                {/* Hand holding hat brim */}
                <ellipse cx="-20" cy="50" rx="9" ry="6" fill="url(#skinToneGrad)" stroke="#E4BBA5" strokeWidth="1" />
              </g>
            </g>
          </g>

          {/* ========================================================= */}
          {/* 6. BLOOMING LOTUS FLOWERS & LEAVES AT BOTTOM CORNERS      */}
          {/* ========================================================= */}
          {/* Bottom Left Lotus Cluster */}
          <g id="lotus-cluster-left" transform="translate(45, 690)">
            {/* Green Lotus Pad */}
            <ellipse cx="-10" cy="20" rx="55" ry="24" fill="url(#lotusLeafGrad)" stroke="#2D4A41" strokeWidth="1.5" />
            <path d="M-10,20 L35,28" stroke="#79A89B" strokeWidth="1" />
            <path d="M-10,20 L-50,15" stroke="#79A89B" strokeWidth="1" />

            {/* Pink Blooming Lotus Petals */}
            <g transform="translate(10, 0)">
              <path d="M-30,10 Q-35,-25 -18,-45 Q-15,-20 -5,10 Z" fill="url(#lotusPetalGrad)" stroke="#E879F9" strokeWidth="0.8" />
              <path d="M30,10 Q35,-25 18,-45 Q15,-20 5,10 Z" fill="url(#lotusPetalGrad)" stroke="#E879F9" strokeWidth="0.8" />
              <path d="M-18,10 Q-22,-35 0,-55 Q22,-35 18,10 Z" fill="url(#lotusPetalGrad)" stroke="#F472B6" strokeWidth="1" />
              <ellipse cx="0" cy="-5" rx="9" ry="14" fill="#FDF2F8" />
              <circle cx="0" cy="-22" r="3.5" fill="#FACC15" />
            </g>
          </g>

          {/* Bottom Right Lotus Cluster */}
          <g id="lotus-cluster-right" transform="translate(945, 700)">
            {/* Lotus Pad */}
            <ellipse cx="10" cy="18" rx="52" ry="22" fill="url(#lotusLeafGrad)" stroke="#2D4A41" strokeWidth="1.5" />
            {/* Pink Blooming Lotus */}
            <g transform="translate(-15, 0)">
              <path d="M-28,10 Q-32,-22 -15,-42 Q-12,-18 -4,10 Z" fill="url(#lotusPetalGrad)" stroke="#E879F9" strokeWidth="0.8" />
              <path d="M28,10 Q32,-22 15,-42 Q12,-18 4,10 Z" fill="url(#lotusPetalGrad)" stroke="#E879F9" strokeWidth="0.8" />
              <path d="M-16,10 Q-18,-32 0,-50 Q18,-32 16,10 Z" fill="url(#lotusPetalGrad)" stroke="#F472B6" strokeWidth="1" />
              <circle cx="0" cy="-18" r="3" fill="#FACC15" />
            </g>
          </g>

          {/* Subtle Outer Border Inset */}
          <rect
            x="12"
            y="12"
            width="976"
            height="726"
            rx="18"
            fill="none"
            stroke="#946C30"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <rect
            x="18"
            y="18"
            width="964"
            height="714"
            rx="14"
            fill="none"
            stroke="#946C30"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
        </svg>

        {/* Floating Badge Tag in Bottom Center */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#FAF7F2]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D8C7B0] shadow-sm flex items-center gap-2 text-[11px] font-medium text-[#78350F]">
          <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
          <span>Họa phẩm 3 Miền: Tứ Thân (Bắc) • Ngũ Thân (Trung) • Bà Ba (Nam)</span>
        </div>
      </div>
    </div>
  );
};

export default HeroArtworkBanner;
