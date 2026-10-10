import React from 'react';
import { CEREMONIAL_HERITAGE_DATA_URI } from '../assets/ceremonialHeritageDataUri';

interface HeroPosterDisplayProps {
  defaultAlt?: string;
}

export const HeroPosterDisplay: React.FC<HeroPosterDisplayProps> = ({
  defaultAlt = 'GIAO THOA: XƯỞNG VIỆT PHỤC GENZ - Ceremonial Vietnamese Heritage Trio (Ảnh gốc chính thức 100% nguyên bản)',
}) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D8C7B0] bg-[#FAF5EC] select-none">
      <div className="relative w-full flex items-center justify-center bg-[#F7F2E7] overflow-hidden">
        <img
          src={CEREMONIAL_HERITAGE_DATA_URI}
          alt={defaultAlt}
          className="w-full h-auto max-h-[850px] object-contain block mx-auto"
          style={{ filter: 'none' }}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default HeroPosterDisplay;
